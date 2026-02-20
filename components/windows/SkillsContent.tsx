"use client";

import { skillsData } from "@/data/skills";

export default function SkillsContent() {
  return (
    <div className="p-4" style={{ fontFamily: "var(--font-segoe)" }}>
      <h6 className="mb-3">Technical Skills</h6>
      {skillsData.map((skill, i) => (
        <div key={i} className="mb-3">
          <div className="d-flex justify-content-between align-items-center mb-1">
            <span className="small">{skill.name}</span>
            <span className="small text-muted">{skill.percent}%</span>
          </div>
          <div
            className="rounded"
            style={{
              height: 8,
              backgroundColor: "#e0e0e0",
              overflow: "hidden",
            }}
          >
            <div
              className="h-100 rounded"
              style={{
                width: `${skill.percent}%`,
                backgroundColor: "#0078d4",
              }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
