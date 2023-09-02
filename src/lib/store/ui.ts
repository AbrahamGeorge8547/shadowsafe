import { writable } from "svelte/store";

export const activeTab = writable("secrets");
export const isEditing = writable(false);
export const selectedNodeChildren = writable([]);
