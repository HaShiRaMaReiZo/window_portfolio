"use client";

import React, { useCallback, useState } from "react";
import type { WindowState } from "@/store/windowStore";
import { useWindowStore } from "@/store/windowStore";

interface WindowProps {
  win: WindowState;
  children: React.ReactNode;
}

export default function Window({ win, children }: WindowProps) {
  const {
    focusWindow,
    closeWindow,
    minimizeWindow,
    maximizeWindow,
    setWindowPosition,
    setWindowSize,
  } = useWindowStore.getState();

  const [dragStart, setDragStart] = useState<{
    startClientX: number;
    startClientY: number;
    startX: number;
    startY: number;
  } | null>(null);
  const [resizeStart, setResizeStart] = useState<{
    startClientX: number;
    startClientY: number;
    startX: number;
    startY: number;
    startW: number;
    startH: number;
    anchor: string;
  } | null>(null);

  const handleMouseDownTitle = useCallback(
    (e: React.MouseEvent) => {
      if ((e.target as HTMLElement).closest(".win10-title-btn")) return;
      e.preventDefault();
      focusWindow(win.id);
      setDragStart({
        startClientX: e.clientX,
        startClientY: e.clientY,
        startX: win.x,
        startY: win.y,
      });
    },
    [win.id, win.x, win.y, focusWindow]
  );

  const handleMouseDownResize = useCallback(
    (e: React.MouseEvent, anchor: string) => {
      e.stopPropagation();
      e.preventDefault();
      focusWindow(win.id);
      setResizeStart({
        startClientX: e.clientX,
        startClientY: e.clientY,
        startX: win.x,
        startY: win.y,
        startW: win.width,
        startH: win.height,
        anchor,
      });
    },
    [win.id, win.x, win.y, win.width, win.height, focusWindow]
  );

  React.useEffect(() => {
    if (!dragStart) return;
    const onMove = (e: MouseEvent) => {
      const newX = dragStart.startX + (e.clientX - dragStart.startClientX);
      const newY = dragStart.startY + (e.clientY - dragStart.startClientY);
      setWindowPosition(win.id, newX, newY);
    };
    const onUp = () => setDragStart(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [dragStart, win.id, setWindowPosition]);

  React.useEffect(() => {
    if (!resizeStart) return;
    const onMove = (e: MouseEvent) => {
      const { startClientX, startClientY, startX, startY, startW, startH, anchor } = resizeStart;
      const dX = e.clientX - startClientX;
      const dY = e.clientY - startClientY;
      let x = startX;
      let y = startY;
      let width = startW;
      let height = startH;
      if (anchor.includes("e")) width = Math.max(320, startW + dX);
      if (anchor.includes("w")) {
        const nw = Math.max(320, startW - dX);
        x = startX + startW - nw;
        width = nw;
      }
      if (anchor.includes("s")) height = Math.max(200, startH + dY);
      if (anchor.includes("n")) {
        const nh = Math.max(200, startH - dY);
        y = startY + startH - nh;
        height = nh;
      }
      setWindowPosition(win.id, x, y);
      setWindowSize(win.id, width, height);
    };
    const onUp = () => setResizeStart(null);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mouseup", onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseup", onUp);
    };
  }, [resizeStart, win.id, setWindowPosition, setWindowSize]);

  const onTitleBarClick = () => focusWindow(win.id);

  if (win.minimized) return null;

  return (
    <div
      className={`win10-window ${win.maximized ? "maximized" : ""}`}
      style={{
        left: win.x,
        top: win.y,
        width: win.width,
        height: win.height,
        zIndex: win.zIndex,
      }}
      onClick={onTitleBarClick}
    >
      <div
        className="win10-title-bar"
        onMouseDown={handleMouseDownTitle}
      >
        <img
          className="win10-title-bar-icon"
          src={win.icon}
          alt=""
          width={16}
          height={16}
        />
        <span className="win10-title-bar-title">{win.title}</span>
        <div className="win10-title-bar-buttons">
          <button
            type="button"
            className="win10-title-btn minimize"
            onClick={(e) => {
              e.stopPropagation();
              minimizeWindow(win.id);
            }}
            aria-label="Minimize"
          >
            &#x2013;
          </button>
          <button
            type="button"
            className="win10-title-btn maximize"
            onClick={(e) => {
              e.stopPropagation();
              maximizeWindow(win.id);
            }}
            aria-label={win.maximized ? "Restore" : "Maximize"}
          >
            {win.maximized ? "\u25A1" : "\u25A0"}
          </button>
          <button
            type="button"
            className="win10-title-btn close"
            onClick={(e) => {
              e.stopPropagation();
              closeWindow(win.id);
            }}
            aria-label="Close"
          >
            &#x2715;
          </button>
        </div>
      </div>
      <div className="win10-window-content">{children}</div>

      {!win.maximized && (
        <>
          <div className="win10-resize-handle n" onMouseDown={(e) => handleMouseDownResize(e, "n")} />
          <div className="win10-resize-handle s" onMouseDown={(e) => handleMouseDownResize(e, "s")} />
          <div className="win10-resize-handle e" onMouseDown={(e) => handleMouseDownResize(e, "e")} />
          <div className="win10-resize-handle w" onMouseDown={(e) => handleMouseDownResize(e, "w")} />
          <div className="win10-resize-handle ne" onMouseDown={(e) => handleMouseDownResize(e, "ne")} />
          <div className="win10-resize-handle nw" onMouseDown={(e) => handleMouseDownResize(e, "nw")} />
          <div className="win10-resize-handle se" onMouseDown={(e) => handleMouseDownResize(e, "se")} />
          <div className="win10-resize-handle sw" onMouseDown={(e) => handleMouseDownResize(e, "sw")} />
        </>
      )}
    </div>
  );
}
