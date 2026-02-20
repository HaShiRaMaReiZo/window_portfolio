"use client";

import { useWindowStore } from "@/store/windowStore";
import Window from "@/components/Window";
import AboutMeContent from "@/components/windows/AboutMeContent";
import ProjectsContent from "@/components/windows/ProjectsContent";
import ResumeContent from "@/components/windows/ResumeContent";
import SkillsContent from "@/components/windows/SkillsContent";
import ContactContent from "@/components/windows/ContactContent";
import ThisPCContent from "@/components/windows/ThisPCContent";

export default function WindowsLayer() {
  const windows = useWindowStore((s) => s.windows);

  return (
    <>
      {windows.map((win) => (
        <Window key={win.id} win={win}>
          {win.contentKey === "about" && <AboutMeContent />}
          {win.contentKey === "projects" && <ProjectsContent />}
          {win.contentKey === "resume" && <ResumeContent />}
          {win.contentKey === "skills" && <SkillsContent />}
          {win.contentKey === "contact" && <ContactContent />}
          {win.contentKey === "thispc" && <ThisPCContent />}
        </Window>
      ))}
    </>
  );
}
