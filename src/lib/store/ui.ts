import { writable } from "svelte/store";

import { localStorageStore } from "@skeletonlabs/skeleton";
export const isEditing = writable(false);
export const selectedNodeChildren = writable([]);
export const navigationHistory = writable([]);
export const currentParentNode = localStorageStore("currentParentNode", null);;
export const treeStore = writable({});
export const breadCrumbs = writable([]);
export const expandedNodes = writable(new Set());
export const secretFields = writable([]);
export const editMembers = writable(false);
export const selectedGroup = localStorageStore("selectedGroup", 'AllUsers');
export const selectedTab = writable('secrets');
export const droppedItem = writable({});
export const selectedPermission = writable(null)
export const activeTab = localStorageStore("activeTab", {});