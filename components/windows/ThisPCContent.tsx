"use client";

import { useWindowStore } from "@/store/windowStore";
import { APP_LIST } from "@/constants/apps";

export default function ThisPCContent() {
  const openWindow = useWindowStore((s) => s.openWindow);

  return (
    <div className="p-4" style={{ fontFamily: "var(--font-segoe)" }}>
      <div className="thispc-grid">
        {APP_LIST.filter((app) => app.contentKey !== "thispc").map((app) => (
          <button
            key={app.contentKey}
            type="button"
            className="thispc-shortcut"
            onClick={() => openWindow(app.contentKey, app.title, app.icon)}
          >
            <img src={app.icon} alt="" width={48} height={48} />
            <span>{app.title}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
