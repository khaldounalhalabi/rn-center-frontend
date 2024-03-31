export interface Media {
  id: number;
  model_id: number;
  model_type: string;
  file_name: string;
  file_type: string;
  file_url: string;
  size: number;
  collection: string;
}

export function getMedia(media?: Media) {
  if (!media) {
    return "/no-image.png";
  }

  return media.file_url;
}
