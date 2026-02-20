export type ContentKey = "about" | "projects";

export interface WindowState {
  id: string;
  title: string;
  icon: string;
  contentKey: ContentKey;
  x: number;
  y: number;
  width: number;
  height: number;
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
}

interface WindowStore {
  windows: WindowState[];
  nextZIndex: number;
  openWindow: (contentKey: ContentKey, title: string, icon: string) => void;
  closeWindow: (id: string) => void;
  minimizeWindow: (id: string) => void;
  restoreWindow: (id: string) => void;
  maximizeWindow: (id: string) => void;
  focusWindow: (id: string) => void;
  moveWindow: (id: string, dx: number, dy: number) => void;
  resizeWindow: (id: string, dWidth: number, dHeight: number, anchor: string) => void;
  setWindowPosition: (id: string, x: number, y: number) => void;
  setWindowSize: (id: string, width: number, height: number) => void;
}

const defaultSize: Record<ContentKey, { width: number; height: number }> = {
  about: { width: 480, height: 420 },
  projects: { width: 640, height: 500 },
};

import { create } from "zustand";

export const useWindowStore = create<WindowStore>((set, get) => ({
  windows: [],
  nextZIndex: 1000,

  openWindow: (contentKey, title, icon) => {
    const { windows, nextZIndex } = get();
    const existing = windows.find((w) => w.contentKey === contentKey);
    if (existing) {
      get().focusWindow(existing.id);
      if (existing.minimized) get().restoreWindow(existing.id);
      return;
    }
    const id = `win-${contentKey}-${Date.now()}`;
    const { width, height } = defaultSize[contentKey];
    const newWindow: WindowState = {
      id,
      title,
      icon,
      contentKey,
      x: 80 + windows.length * 24,
      y: 60 + windows.length * 24,
      width,
      height,
      zIndex: nextZIndex,
      minimized: false,
      maximized: false,
    };
    set({
      windows: [...windows, newWindow],
      nextZIndex: nextZIndex + 1,
    });
  },

  closeWindow: (id) => {
    set({ windows: get().windows.filter((w) => w.id !== id) });
  },

  minimizeWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, minimized: true } : w
      ),
    });
  },

  restoreWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, minimized: false } : w
      ),
    });
  },

  maximizeWindow: (id) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, maximized: !w.maximized } : w
      ),
    });
  },

  focusWindow: (id) => {
    const { windows, nextZIndex } = get();
    const maxZ = Math.max(...windows.map((w) => w.zIndex), nextZIndex - 1);
    const newZ = maxZ + 1;
    set({
      windows: windows.map((w) =>
        w.id === id ? { ...w, zIndex: newZ } : w
      ),
      nextZIndex: newZ + 1,
    });
  },

  moveWindow: (id, dx, dy) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, x: w.x + dx, y: w.y + dy } : w
      ),
    });
  },

  resizeWindow: (id, dWidth, dHeight, anchor) => {
    set({
      windows: get().windows.map((w) => {
        if (w.id !== id || w.maximized) return w;
        let { x, y, width, height } = w;
        if (anchor.includes("e")) width = Math.max(320, width + dWidth);
        if (anchor.includes("w")) {
          const nw = Math.max(320, width - dWidth);
          x += width - nw;
          width = nw;
        }
        if (anchor.includes("s")) height = Math.max(200, height + dHeight);
        if (anchor.includes("n")) {
          const nh = Math.max(200, height - dHeight);
          y += height - nh;
          height = nh;
        }
        return { ...w, x, y, width, height };
      }),
    });
  },

  setWindowPosition: (id, x, y) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, x, y } : w
      ),
    });
  },

  setWindowSize: (id, width, height) => {
    set({
      windows: get().windows.map((w) =>
        w.id === id ? { ...w, width: Math.max(320, width), height: Math.max(200, height) } : w
      ),
    });
  },
}));
