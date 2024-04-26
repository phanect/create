import { readdir } from "node:fs/promises";

export const lastElementOf = <T>(arr: T[]): T => arr[arr.length - 1];

export const isDirEmpty = async (path: string): Promise<boolean> => (await readdir(path)).length <= 0;
