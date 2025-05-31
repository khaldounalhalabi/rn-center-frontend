"use server";
import { revalidatePath } from "next/cache";
import { headers } from "next/headers";

export async function Revalidate(): Promise<void> {
  revalidatePath(headers().get("referer") ?? "");
}
