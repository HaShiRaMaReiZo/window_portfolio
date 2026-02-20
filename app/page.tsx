"use client";

import Desktop from "@/components/Desktop";
import Taskbar from "@/components/Taskbar";
import WindowsLayer from "@/components/WindowsLayer";

export default function Home() {
  return (
    <>
      <Desktop />
      <WindowsLayer />
      <Taskbar />
    </>
  );
}
