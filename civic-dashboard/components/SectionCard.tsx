import type { ReactNode } from "react";

type Props = {
  title: string;
  subtitle?: string;
  children: ReactNode;
};

export default function SectionCard({ title, subtitle, children }: Props) {
  return (
    <section className="rounded-xl border border-border p-4">
      <h2 className="font-semibold">{title}</h2>
      {subtitle && <p className="text-xs text-foreground/60">{subtitle}</p>}
      <div className="mt-2">{children}</div>
    </section>
  );
}
