
import { useSyncExternalStore } from "react";
import { assets as initialAssets } from "@/data/mock-data";
import type { Asset } from "@/types/marketplace";

const STORAGE_KEY = "n5deal-assets";

let cachedRaw: string | null = null;
let cachedAssets: Asset[] = initialAssets;

function getSnapshot(): Asset[] {
  if (typeof window === "undefined") {
    return initialAssets;
  }

  const raw = localStorage.getItem(STORAGE_KEY);

  if (raw === cachedRaw) {
    return cachedAssets;
  }

  cachedRaw = raw;

  if (!raw) {
    cachedAssets = initialAssets;
    return cachedAssets;
  }

  try {
    const parsed = JSON.parse(raw);

    if (!Array.isArray(parsed)) {
      cachedAssets = initialAssets;
      return cachedAssets;
    }

    cachedAssets = parsed as Asset[];

    return cachedAssets;
  } catch {
    cachedAssets = initialAssets;
    return cachedAssets;
  }
}

function getServerSnapshot(): Asset[] {
  return initialAssets;
}

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("n5deal-assets-updated", callback);

  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener(
      "n5deal-assets-updated",
      callback
    );
  };
}

export function useAssets() {
  return useSyncExternalStore(
    subscribe,
    getSnapshot,
    getServerSnapshot
  );
}

export function saveAssets(assets: Asset[]) {
  const raw = JSON.stringify(assets);

  localStorage.setItem(STORAGE_KEY, raw);

  cachedRaw = raw;
  cachedAssets = assets;

  window.dispatchEvent(
    new Event("n5deal-assets-updated")
  );
}
