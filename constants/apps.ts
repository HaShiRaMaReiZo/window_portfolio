import type { ContentKey } from "@/store/windowStore";

export interface AppItem {
  contentKey: ContentKey;
  title: string;
  icon: string;
}

export const APP_LIST: AppItem[] = [
  { contentKey: "thispc", title: "This PC", icon: "/icons/thispc.ico" },
  { contentKey: "about", title: "About Me", icon: "/icons/about.ico" },
  { contentKey: "projects", title: "Projects", icon: "/icons/folder.ico" },
  { contentKey: "resume", title: "Resume", icon: "/icons/resume.ico" },
  { contentKey: "skills", title: "Skills", icon: "/icons/skills.ico" },
  { contentKey: "contact", title: "Contact", icon: "/icons/contact.ico" },
];
