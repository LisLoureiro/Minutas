import type { MinutaStatus } from "@/data/mock";

const config: Record<MinutaStatus, { label: string; className: string }> = {
  rascunho: { label: "Rascunho", className: "bg-muted text-muted-foreground" },
  revisao: { label: "Em Revisão", className: "bg-amber-100 text-amber-800" },
  aprovada: { label: "Aprovada", className: "bg-emerald-100 text-emerald-800" },
  assinada: { label: "Assinada", className: "bg-blue-100 text-blue-800" },
};

export default function StatusBadge({ status }: { status: MinutaStatus }) {
  const { label, className } = config[status];
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
      data-testid={`badge-status-${status}`}
    >
      {label}
    </span>
  );
}
