import type { ProjectData } from "../objects/project";

/**
 * Loads all JSON files under src/data/projects at build time.
 * The keys look like: "/src/data/projects/trembling-steppes.json" (Vite-style)
 */
const modules = import.meta.glob("/src/data/projects/*.json", { eager: true }) as Record<
  string,
  { default: ProjectData }
>;

// Normalize to: { "trembling-steppes": ProjectData, "/src/data/projects/xxx.json": ProjectData }
const bySlug = new Map<string, ProjectData>();
const byPath = new Map<string, ProjectData>();

for (const [path, mod] of Object.entries(modules)) {
  const data = mod.default;
  byPath.set(path.replaceAll("\\", "/"), data);
  bySlug.set(data.slug, data);
}
console.log(modules)

/** Accepts either a Vite path ("/src/data/projects/xxx.json"), a filename ("xxx.json"), or a slug ("xxx"). */
export function getProjectData(key: string): ProjectData | undefined {
  const normalized = key.replaceAll("\\", "/");

  if (byPath.has(normalized)) return byPath.get(normalized);
  // try filename
  for (const [p, d] of byPath.entries()) {
    if (p.endsWith("/" + normalized)) return d;
  }
  // try slug
  if (bySlug.has(normalized)) return bySlug.get(normalized);

  return undefined;
}

/** Returns all projects, newest first. */
export function getAllProjectData(): ProjectData[] {
  return Array.from(bySlug.values()).sort((a, b) => (b.year ?? 0) - (a.year ?? 0));
}


export function getProjectDataKeys(): string[] {
  return Array.from(bySlug.keys());
}