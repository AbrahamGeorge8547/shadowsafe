import { writable } from "svelte/store";

export const activeTab = writable("secrets");
export const isEditing = writable(false);
export const selectedNodeChildren = writable([]);
export const navigationHistory = writable([]);
export const currentParentNode = writable(null);
export const treeStore = writable({});
export const breadCrumbs = writable([]);
export const expandedNodes = writable(new Set());
export const secretFields = writable([]);
export const editMembers = writable(false);
export const selectedGroup = writable('AllUsers');
export const selectedTab = writable('secrets');
export const droppedItem = writable({});
export const selectedPermission = writable(null);
