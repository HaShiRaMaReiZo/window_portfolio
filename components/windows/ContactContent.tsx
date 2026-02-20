"use client";

import { contactData } from "@/data/contact";

export default function ContactContent() {
  const d = contactData;
  return (
    <div className="p-4" style={{ fontFamily: "var(--font-segoe)" }}>
      {d.email && (
        <p className="mb-2">
          <strong className="small">Email:</strong>{" "}
          <a href={`mailto:${d.email}`}>{d.email}</a>
        </p>
      )}
      {d.phone && (
        <p className="mb-2">
          <strong className="small">Phone:</strong>{" "}
          <a href={`tel:${d.phone}`}>{d.phone}</a>
        </p>
      )}
      {d.links?.length > 0 && (
        <>
          <h6 className="mt-3 mb-2">Links</h6>
          <ul className="list-unstyled mb-0">
            {d.links.map((link, i) => (
              <li key={i} className="mb-1">
                <a href={link.url} target="_blank" rel="noopener noreferrer">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
