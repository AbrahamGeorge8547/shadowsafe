import { writable } from "svelte/store";

export const activeTab = writable("secrets");
export const isEditing = writable(false);
export const selectedNodeChildren = writable([]);
export const navigationHistory = writable([]);
export const currentParentNode = writable(null);
export const treeStore = writable({});
export const breadCrumbs = writable([]);
