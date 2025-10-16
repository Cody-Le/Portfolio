import { Badge } from "./badge";
import type { BadgeData } from "./badge";
import { getProjectData } from "../loaders/project_registry";

export interface ProjectData {
  slug: string;
  title: string;
  summary: string;
  year: number;
  engine?: string;
  type?: "game" | "jam" | "plugin" | "shader" | "blender" | "ssrl";
  links?: { play?: string | null; repo?: string | null; caseStudy?: string | null };
  media?: { cover?: string; video?: string; images?: string[] };
  badges?: BadgeData[];
  featured?: boolean;
}

export class Project {
  slug: string;
  title: string;
  summary: string;
  year: number;
  engine?: string;
  type?: ProjectData["type"];
  links: NonNullable<ProjectData["links"]>;
  media: NonNullable<ProjectData["media"]>;
  badges: Badge[];

  constructor(d: ProjectData) {
    this.slug = d.slug;
    this.title = d.title;
    this.summary = d.summary;
    this.year = d.year;
    this.engine = d.engine;
    this.type = d.type;
    this.links = d.links ?? {};
    this.media = d.media ?? {};
    this.badges = (d.badges ?? []).map(b => new Badge(b));
  }

  get href() {
    // prefer case study if provided, else dynamic project page
    return this.links.caseStudy ?? `/projects/${this.slug}`;
  }

  toCardProps() {
    return {
      href: this.href,
      title: this.title,
      summary: this.summary,
      cover: this.media.cover ?? "",
      video: this.media.video,      // optional
      badges: this.badges.map(b => ({ label: b.label, variant: b.variant }))
    };
  }

  static fromKey(key: string): Project {
    const data = getProjectData(key);
    if (!data) throw new Error(`Project JSON not found for key: ${key}`);
    return new Project(data);
  }

  static manyFromKeys(keys: string[]): Project[] {
    return keys.map(k => Project.fromKey(k));
  }

  static all(): Project[] {
    // uses registry
    const { getAllProjectData } = require("../loaders/projectRegistry");
    return (getAllProjectData() as ProjectData[]).map(d => new Project(d));
  }
}