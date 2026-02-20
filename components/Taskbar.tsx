"use client";

import { useState, useEffect } from "react";
import { useWindowStore } from "@/store/windowStore";

function useTime() {
  const [time, setTime] = useState({ date: "", time: "" });
  useEffect(() => {
    const format = () => {
      const n = new Date();
      setTime({
        date: n.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "numeric" }).replace(/\//g, "-"),
        time: n.toLocaleTimeString("en-GB", { hour: "2-digit", minute: "2-digit", hour12: false }),
      });
    };
    format();
    const id = setInterval(format, 1000);
    return () => clearInterval(id);
  }, []);
  return time;
}

export default function Taskbar() {
  const windows = useWindowStore((s) => s.windows);
  const focusWindow = useWindowStore((s) => s.focusWindow);
  const restoreWindow = useWindowStore((s) => s.restoreWindow);
  const focusedId = windows.length ? windows.reduce((a, b) => (a.zIndex >= b.zIndex ? a : b)).id : null;
  const { date, time } = useTime();

  const handleWindowBtnClick = (id: string, minimized: boolean) => {
    focusWindow(id);
    if (minimized) restoreWindow(id);
  };

  return (
    <div className="taskbar">
      <div className="taskbar-start" title="Start" aria-label="Start">
        <svg width="20" height="20" viewBox="0 0 20 20" fill="currentColor">
          <path d="M2 4h6v6H2V4zm0 8h6v6H2v-6zm8-8h8v2h-8V4zm0 4h8v2h-8V8zm0 4h8v6h-8v-6z" />
        </svg>
      </div>
      <input
        type="text"
        className="taskbar-search"
        placeholder="Ask me anything"
        readOnly
        aria-label="Search"
      />
      <div className="taskbar-pinned">
        <div className="taskbar-pinned-item" title="Task View" aria-label="Task View">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M4 6h4v4H4V6zm6 0h4v4h-4V6zm6 0h4v4h-4V6zM4 14h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z" />
          </svg>
        </div>
        <div className="taskbar-pinned-item" title="Microsoft Edge">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
          </svg>
        </div>
        <div className="taskbar-pinned-item" title="File Explorer">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M10 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2h-8l-2-2z" />
          </svg>
        </div>
        <div className="taskbar-pinned-item" title="Store">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18 6h-2c0-2.21-1.79-4-4-4S8 3.79 8 6H6c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-6-2c1.1 0 2 .9 2 2h-4c0-1.1.9-2 2-2zm6 16H6V8h2v2c0 .55.45 1 1 1s1-.45 1-1V8h4v2c0 .55.45 1 1 1s1-.45 1-1V8h2v12z" />
          </svg>
        </div>
        <div className="taskbar-pinned-item" title="Chrome">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
          </svg>
        </div>
      </div>
      <div className="taskbar-windows">
        {windows.map((win) => (
          <button
            key={win.id}
            type="button"
            className={`taskbar-window-btn ${win.id === focusedId && !win.minimized ? "active" : ""}`}
            onClick={() => handleWindowBtnClick(win.id, win.minimized)}
          >
            <img src={win.icon} alt="" width={16} height={16} />
            {win.title}
          </button>
        ))}
      </div>
      <div className="taskbar-tray">
        <span className="taskbar-tray-item" aria-hidden>&#x2191;</span>
        <span className="taskbar-tray-item">&#x1F4F6;</span>
        <span className="taskbar-tray-item">&#x1F4E1;</span>
        <span className="taskbar-tray-item">&#x1F50B;</span>
        <span className="taskbar-tray-item">&#x1F514;</span>
        <div className="taskbar-tray-item taskbar-time">
          <span>{time}</span>
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}
