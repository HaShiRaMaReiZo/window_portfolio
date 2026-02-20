"use client";

import { aboutData } from "@/data/about";
import Image from "next/image";

export default function AboutMeContent() {
  const d = aboutData;
  return (
    <div className="p-4" style={{ fontFamily: "var(--font-segoe)" }}>
      <div className="d-flex gap-3 mb-3">
        {d.photo && (
          <img
            src={d.photo}
            alt={d.name}
            width={80}
            height={80}
            style={{ objectFit: "cover", borderRadius: 4 }}
          />
        )}
        <div>
          <h5 className="mb-1">{d.name}</h5>
          <p className="text-muted small mb-0">{d.title}</p>
        </div>
      </div>
      <p className="small">{d.bio}</p>
      {d.education?.length > 0 && (
        <>
          <h6 className="mt-3 mb-2">Education</h6>
          <ul className="small mb-0">
            {d.education.map((edu, i) => (
              <li key={i}>
                {edu.degree} – {edu.institution} ({edu.year})
              </li>
            ))}
          </ul>
        </>
      )}
      {d.experience?.length > 0 && (
        <>
          <h6 className="mt-3 mb-2">Experience</h6>
          <ul className="small mb-0">
            {d.experience.map((exp, i) => (
              <li key={i}>
                {exp.role} at {exp.company} ({exp.period})
              </li>
            ))}
          </ul>
        </>
      )}
      {d.interests?.length > 0 && (
        <>
          <h6 className="mt-3 mb-2">Interests</h6>
          <p className="small mb-0">{d.interests.join(", ")}</p>
        </>
      )}
    </div>
  );
}
