import { useState } from "react";
import { useLocation } from "wouter";
import { Plus, Search, FileText, Clock, CheckCircle, PenLine } from "lucide-react";
import Layout from "@/components/Layout";
import StatusBadge from "@/components/StatusBadge";
import { mockMinutas } from "@/data/mock";
import type { MinutaStatus } from "@/data/mock";

const stats = [
  { label: "Total de Minutas", value: 6, icon: FileText, color: "text-primary" },
  { label: "Em Revisão", value: 2, icon: Clock, color: "text-amber-600" },
  { label: "Aprovadas", value: 2, icon: CheckCircle, color: "text-emerald-600" },
  { label: "Rascunhos", value: 1, icon: PenLine, color: "text-muted-foreground" },
];

export default function Dashboard() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [filtroStatus, setFiltroStatus] = useState<MinutaStatus | "todas">("todas");

  const filtered = mockMinutas.filter((m) => {
    const matchSearch =
      m.titulo.toLowerCase().includes(search.toLowerCase()) ||
      m.partes.some((p) => p.toLowerCase().includes(search.toLowerCase()));
    const matchStatus = filtroStatus === "todas" || m.status === filtroStatus;
    return matchSearch && matchStatus;
  });

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold scripta-title text-foreground">Dashboard</h1>
            <p className="text-muted-foreground text-sm mt-0.5">Gerencie suas minutas jurídicas</p>
          </div>
          <button
            onClick={() => setLocation("/modelos")}
            className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition shadow-sm"
            data-testid="btn-nova-minuta"
          >
            <Plus size={16} />
            Nova Minuta
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => (
            <div key={stat.label} className="bg-card border border-border rounded-xl p-4 shadow-sm">
              <div className="flex items-center gap-3">
                <stat.icon size={20} className={stat.color} />
                <div>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar minutas ou partes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              data-testid="input-busca"
            />
          </div>
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value as MinutaStatus | "todas")}
            className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            data-testid="select-status"
          >
            <option value="todas">Todos os status</option>
            <option value="rascunho">Rascunho</option>
            <option value="revisao">Em Revisão</option>
            <option value="aprovada">Aprovada</option>
            <option value="assinada">Assinada</option>
          </select>
        </div>

        {/* List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-muted-foreground">
              <FileText size={40} className="mx-auto mb-3 opacity-30" />
              <p>Nenhuma minuta encontrada.</p>
            </div>
          ) : (
            filtered.map((m) => (
              <div
                key={m.id}
                className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setLocation("/editor")}
                data-testid={`card-minuta-${m.id}`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-3">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <h3 className="font-semibold text-foreground text-sm group-hover:text-primary transition-colors truncate">
                        {m.titulo}
                      </h3>
                      <StatusBadge status={m.status} />
                    </div>
                    <p className="text-xs text-muted-foreground">
                      {m.partes.join(" · ")} &nbsp;·&nbsp; {m.modelo}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-muted-foreground shrink-0">
                    <span>{m.versoes} {m.versoes === 1 ? "versão" : "versões"}</span>
                    <span>Atualizado {m.atualizadaEm}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
