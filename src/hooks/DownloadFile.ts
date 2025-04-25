import { useState } from "react";

interface DownloadOptions {
  method?: string;
  headers?: Record<string, any>;
  body?: Record<string, any> | FormData;
  customFilename?: string;
  fileExtension?: string;
  onSuccess?: () => void;
  onError?: (error: Error) => void;
  forceProxy?: boolean;
}

const downloadFile = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  /**
   * Get filename from URL, content disposition, or custom name
   */
  const getFilename = (
    url: string,
    contentDisposition?: string | null,
    customFilename?: string,
    fileExtension?: string
  ): string => {
    // First priority: custom filename
    let filename = customFilename;
    
    // Second priority: Content-Disposition header
    if (!filename && contentDisposition && contentDisposition.includes("filename")) {
      const filenameRegex = /filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/;
      const matches = filenameRegex.exec(contentDisposition);
      if (matches != null && matches[1]) {
        filename = matches[1].replace(/['"]/g, "");
      }
    }
    
    // Third priority: URL parsing
    if (!filename) {
      const urlFilename = url.split('/').pop()?.split('?')[0];
      filename = urlFilename || "downloaded_file";
    }
    
    // Add file extension if provided and not already present
    if (fileExtension && !filename.endsWith(`.${fileExtension}`)) {
      filename = `${filename}.${fileExtension}`;
    }
    
    return filename;
  };

  /**
   * Trigger browser download from blob URL
   */
  const triggerDownload = (blobUrl: string, filename: string): void => {
    const a = document.createElement("a");
    a.href = blobUrl;
    a.download = filename;
    a.style.display = "none";
    document.body.appendChild(a);
    a.click();
    setTimeout(() => {
      document.body.removeChild(a);
      window.URL.revokeObjectURL(blobUrl);
    }, 100);
  };

  /**
   * Try to download a file with CORS support first
   * Falls back to direct download if CORS fails
   */
  const download = async (
    url: string,
    options: DownloadOptions = {}
  ) => {
    const {
      method = "GET",
      headers = {},
      body,
      customFilename,
      fileExtension,
      onSuccess,
      onError,
      forceProxy = false
    } = options;

    setIsLoading(true);
    setError(null);

    // Try fetch with CORS first
    if (!forceProxy) {
      try {
        // Normal CORS request 
        const requestOptions: RequestInit = {
          method,
          headers: {
            ...headers,
          },
          mode: 'cors',
          credentials: 'include',
        };

        if (body) {
          if (body instanceof FormData) {
            requestOptions.body = body;
          } else {
            requestOptions.body = JSON.stringify(body);
            requestOptions.headers = {
              ...requestOptions.headers,
              'Content-Type': 'application/json',
            };
          }
        }

        const response = await fetch(url, requestOptions);

        if (!response.ok) {
          throw new Error(`Download failed: ${response.status} ${response.statusText}`);
        }

        const blob = await response.blob();
        const downloadUrl = window.URL.createObjectURL(blob);
        const filename = getFilename(
          url, 
          response.headers.get("Content-Disposition"),
          customFilename,
          fileExtension
        );

        triggerDownload(downloadUrl, filename);
        
        if (onSuccess) {
          onSuccess();
        }
        
        setIsLoading(false);
        return;
      } catch (error) {
        console.warn("CORS download failed, trying fallback methods:", error);
        // Continue to fallback methods
      }
    }

    // Fallback 1: Try direct download
    try {
      // For some URLs, simply opening in a new tab works for download
      const directDownloadable = /\.(pdf|jpg|jpeg|png|gif|doc|docx|xls|xlsx|txt|csv|zip)$/i.test(url);
      
      if (directDownloadable) {
        const filename = getFilename(url, null, customFilename, fileExtension);
        downloadDirectFile(url, filename);
        
        if (onSuccess) {
          onSuccess();
        }
        
        setIsLoading(false);
        return;
      }
    } catch (directError) {
      console.warn("Direct download failed:", directError);
    }

    // Fallback 2: Try with no-cors mode (limited, but might work for same-origin or properly configured CORS)
    try {
      const response = await fetch(url, {
        method: "GET",
        mode: "no-cors",
      });
      
      // With no-cors, we can't actually read the response properly,
      // but we can try to trigger a download anyway
      const blob = new Blob([await response.blob()], { 
        type: response.headers.get("Content-Type") || "application/octet-stream" 
      });
      
      const downloadUrl = window.URL.createObjectURL(blob);
      const filename = getFilename(url, null, customFilename, fileExtension);
      
      triggerDownload(downloadUrl, filename);
      
      if (onSuccess) {
        onSuccess();
      }
    } catch (noCorsError) {
      console.error("All download methods failed:", noCorsError);
      const finalError = new Error("Download failed: CORS restrictions prevented download");
      setError(finalError);
      
      if (onError) {
        onError(finalError);
      }
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Simple direct file download from URL with custom filename
   * @param url URL of the file to download
   * @param filename Optional custom filename
   */
  const downloadDirectFile = (url: string, filename?: string): void => {
    const a = document.createElement('a');
    a.href = url;
    a.download = filename || url.split('/').pop() || 'download';
    a.target = '_blank'; // Open in new tab if download doesn't work
    a.rel = 'noopener noreferrer';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  /**
   * Download through a proxy if your backend supports it
   * This assumes your backend has an endpoint like /api/proxy-download?url=...
   */
  const downloadViaProxy = async (
    fileUrl: string, 
    proxyUrl: string = '/api/proxy-download',
    filename?: string
  ): Promise<void> => {
    setIsLoading(true);
    try {
      // Construct proxy URL with the target file URL as a parameter
      const url = `${proxyUrl}?url=${encodeURIComponent(fileUrl)}`;
      
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`Proxy download failed: ${response.status} ${response.statusText}`);
      }
      
      const blob = await response.blob();
      const downloadUrl = window.URL.createObjectURL(blob);
      
      let finalFilename = filename;
      if (!finalFilename) {
        const disposition = response.headers.get("Content-Disposition");
        finalFilename = getFilename(fileUrl, disposition);
      }
      
      triggerDownload(downloadUrl, finalFilename);
    } catch (error) {
      console.error("Proxy download failed:", error);
      setError(error instanceof Error ? error : new Error(String(error)));
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    download, 
    downloadDirectFile, 
    downloadViaProxy,
    isLoading, 
    error 
  };
};

export default downloadFile;
