"use server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function Revalidate(path?: string): Promise<void> {
  revalidatePath(path ?? headers().get("referer") ?? "");
}
