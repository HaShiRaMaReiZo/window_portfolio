export interface ProjectItem {
  id: string;
  title: string;
  description: string;
  image?: string;
  link?: string;
  tech?: string[];
}

export const projectsData: ProjectItem[] = [
  {
    id: "1",
    title: "Project One",
    description: "Short description of your first project. Add more in data/projects.ts.",
    image: "/project-placeholder.png",
    link: "https://example.com",
    tech: ["React", "Next.js"],
  },
  {
    id: "2",
    title: "Project Two",
    description: "Another project description.",
    link: "https://example.com",
    tech: ["TypeScript", "Node.js"],
  },
];
