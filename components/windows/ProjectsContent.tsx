"use client";

import { projectsData } from "@/data/projects";

export default function ProjectsContent() {
  return (
    <div className="p-4" style={{ fontFamily: "var(--font-segoe)" }}>
      <div className="d-flex flex-column gap-3">
        {projectsData.map((project) => (
          <div
            key={project.id}
            className="border rounded p-3"
            style={{ backgroundColor: "#fafafa" }}
          >
            <div className="d-flex gap-3">
              {project.image && (
                <img
                  src={project.image}
                  alt=""
                  width={80}
                  height={60}
                  style={{ objectFit: "cover", borderRadius: 4 }}
                />
              )}
              <div className="flex-grow-1 min-w-0">
                <h6 className="mb-1">
                  {project.link ? (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-decoration-none"
                    >
                      {project.title}
                    </a>
                  ) : (
                    project.title
                  )}
                </h6>
                <p className="small text-muted mb-1">{project.description}</p>
                {project.tech?.length ? (
                  <span className="small text-secondary">
                    {project.tech.join(" · ")}
                  </span>
                ) : null}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
