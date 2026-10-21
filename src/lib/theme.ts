// Light is the default for every visitor. Dark is an explicit, remembered choice,
// applied as <html data-theme="dark">.
import { useSyncExternalStore } from "react";
import { THEME_STORAGE_KEY as STORAGE_KEY } from "./theme-script";

export type Theme = "light" | "dark";

const listeners = new Set<() => void>();

function apply(theme: Theme) {
  const root = document.documentElement;
  if (theme === "dark") root.dataset.theme = "dark";
  else delete root.dataset.theme;
}

function getTheme(): Theme {
  return document.documentElement.dataset.theme === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme) {
  apply(theme);
  try {
    if (theme === "dark") localStorage.setItem(STORAGE_KEY, "dark");
    else localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage can be unavailable (private mode); the choice still applies to this page.
  }
  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  // Keep tabs in sync when the choice changes in another one.
  const onStorage = (event: StorageEvent) => {
    if (event.key !== STORAGE_KEY) return;
    apply(event.newValue === "dark" ? "dark" : "light");
    listener();
  };
  listeners.add(listener);
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useTheme(): Theme {
  return useSyncExternalStore(subscribe, getTheme, () => "light");
}
