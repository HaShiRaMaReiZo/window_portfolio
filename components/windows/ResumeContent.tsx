"use client";

import { resumeData } from "@/data/resume";

export default function ResumeContent() {
  const d = resumeData;
  return (
    <div className="p-4" style={{ fontFamily: "var(--font-segoe)" }}>
      <h5 className="mb-2">{d.name}</h5>
      <p className="small text-muted mb-3">{d.summary}</p>
      {d.experience?.length > 0 && (
        <>
          <h6 className="mt-3 mb-2">Experience</h6>
          {d.experience.map((exp, i) => (
            <div key={i} className="mb-3">
              <strong className="small">{exp.role}</strong> at {exp.company}
              <span className="text-muted small"> ({exp.period})</span>
              {exp.points?.length ? (
                <ul className="small mb-0 mt-1">
                  {exp.points.map((p, j) => (
                    <li key={j}>{p}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))}
        </>
      )}
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
      {d.downloadUrl && (
        <a
          href={d.downloadUrl}
          download
          className="btn btn-primary btn-sm mt-3"
          target="_blank"
          rel="noopener noreferrer"
        >
          Download CV
        </a>
      )}
    </div>
  );
}
