"use client";

import { useWindowStore } from "@/store/windowStore";
import type { ContentKey } from "@/store/windowStore";

interface DesktopIconConfig {
  id: string;
  label: string;
  icon: string;
  contentKey: ContentKey;
  title: string;
}

const desktopIcons: DesktopIconConfig[] = [
  { id: "thispc", label: "This PC", icon: "/icons/thispc.ico", contentKey: "thispc", title: "This PC" },
  { id: "about", label: "About Me", icon: "/icons/about.ico", contentKey: "about", title: "About Me" },
  { id: "projects", label: "Project", icon: "/icons/folder.ico", contentKey: "projects", title: "Projects" },
  { id: "resume", label: "Resume", icon: "/icons/resume.ico", contentKey: "resume", title: "Resume" },
  { id: "skills", label: "Skills", icon: "/icons/skills.ico", contentKey: "skills", title: "Skills" },
  { id: "contact", label: "Contact", icon: "/icons/contact.ico", contentKey: "contact", title: "Contact" },
];

export default function Desktop() {
  const openWindow = useWindowStore((s) => s.openWindow);

  const handleIconDoubleClick = (contentKey: ContentKey, title: string, icon: string) => {
    openWindow(contentKey, title, icon);
  };

  return (
    <div className="desktop">
      <div className="desktop-icons">
        {desktopIcons.map((item) => (
          <div
            key={item.id}
            className="desktop-icon"
            role="button"
            tabIndex={0}
            onDoubleClick={() =>
              handleIconDoubleClick(item.contentKey, item.title, item.icon)
            }
            onKeyDown={(e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                handleIconDoubleClick(item.contentKey, item.title, item.icon);
              }
            }}
          >
            <img
              className="desktop-icon-image"
              src={item.icon}
              alt=""
              width={48}
              height={48}
            />
            <span className="desktop-icon-label">{item.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
