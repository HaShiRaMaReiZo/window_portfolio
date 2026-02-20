"use client";

import { useWindowStore } from "@/store/windowStore";
import Window from "@/components/Window";
import AboutMeContent from "@/components/windows/AboutMeContent";
import ProjectsContent from "@/components/windows/ProjectsContent";

export default function WindowsLayer() {
  const windows = useWindowStore((s) => s.windows);

  return (
    <>
      {windows.map((win) => (
        <Window key={win.id} win={win}>
          {win.contentKey === "about" && <AboutMeContent />}
          {win.contentKey === "projects" && <ProjectsContent />}
        </Window>
      ))}
    </>
  );
}
