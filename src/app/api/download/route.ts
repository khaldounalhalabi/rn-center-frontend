import { getToken } from "@/actions/HelperActions";
import { getServerCookie } from "@/actions/ServerCookies";
import { NextRequest } from "next/server";

export async function POST(request: NextRequest): Promise<Response> {
  let url = request.nextUrl.searchParams.get("url");
  const method = request.nextUrl.searchParams.get("method");

  let data;
  let headers = {};
  if (request.body) {
    const body = await request.text(); // Read stream as text
    try {
      data = JSON.parse(body); // Parse text as JSON if needed
      headers = headers ?? {};
    } catch {
      data = body; // If not JSON, keep as text
    }
  }

  if (!url || !method) {
    return Response.json(
      {
        message: "Failed to download the file",
      },
      {
        status: 500,
      },
    );
  }

  if ((method == "POST" || method == "PUT") && !data) {
    return Response.json(
      {
        message: "Failed to download the file",
      },
      {
        status: 500,
      },
    );
  }

  const formData = data ? JSON.stringify(data) : JSON.stringify({});
  let baseUrl = process.env.localApi;
  baseUrl = baseUrl?.endsWith("/") ? baseUrl : baseUrl + "/";
  url = url.startsWith("/") ? url.replace("/", "") : url;

  const searchParams = new URLSearchParams(data?.params);
  const api = `${baseUrl}${url}?${searchParams}`;
  if (method == "POST" || method == "PUT") {
    return await fetch(api, {
      method: method,
      body: formData,
      headers: {
        Authorization: `Bearer ${await getToken()}`,
        "Accept-Language": (await getServerCookie("NEXT_LOCALE")) ?? "en",
        "Access-Control-Allow-Origin": "*",
      },
    });
  }
  return await fetch(api, {
    method: method,
    headers: {
      Authorization: `Bearer ${await getToken()}`,
      "Accept-Language": (await getServerCookie("NEXT_LOCALE")) ?? "en",
      "Access-Control-Allow-Origin": "*",
    },
  });
}
