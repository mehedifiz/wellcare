"use server";

import { revalidatePath } from "next/cache";

export const refreshUser = async () => {
  revalidatePath("/", "layout");
  revalidatePath("/dashboard", "page");
  return true;
};
