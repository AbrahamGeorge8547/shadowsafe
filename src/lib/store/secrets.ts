import { writable } from "svelte/store";

export const secretsStore = writable([]);
export const selectedSecret = writable(null);
