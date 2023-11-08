
import { writable } from "svelte/store";
import type { Folder } from "$lib/dtos/folder.dto";
export const folderStore = writable<Folder[]>([])
export const selectedFolder = writable<Folder | null>(null);