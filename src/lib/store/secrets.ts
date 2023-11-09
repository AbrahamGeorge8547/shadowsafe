import { writable } from "svelte/store";
import type { Secret } from "$lib/dtos/secret.dto";

export const secretsStore = writable<Secret[]>([]);
export const selectedSecret = writable<Secret | null>(null);
