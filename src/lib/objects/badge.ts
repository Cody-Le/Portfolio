export type BadgeVariant = "filled" | "outline";
export type BadgeKind = "achievement" | "role" | "tech" | "type";

export interface BadgeData {
  label: string;
  variant?: BadgeVariant;
  kind?: BadgeKind;
}

export class Badge {
  label: string;
  variant: BadgeVariant;
  kind: BadgeKind | undefined;

  constructor(data: BadgeData) {
    this.label = data.label;
    this.variant = data.variant ?? "outline";
    this.kind = data.kind;
  }
}