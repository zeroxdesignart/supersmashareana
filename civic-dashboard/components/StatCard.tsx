type Props = {
  label: string;
  value: string;
  helper?: string;
};

export default function StatCard({ label, value, helper }: Props) {
  return (
    <div className="rounded-xl border border-border p-4">
      <p className="text-xs text-foreground/60">{label}</p>
      <p className="text-xl font-semibold">{value}</p>
      {helper && <p className="text-xs text-foreground/40">{helper}</p>}
    </div>
  );
}
