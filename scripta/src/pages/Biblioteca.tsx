import { useState } from "react";
import { Search, Check, Copy, Filter } from "lucide-react";
import Layout from "@/components/Layout";
import { mockClausulas, categorias } from "@/data/mock";
import { showToast } from "@/components/Toast";

export default function Biblioteca() {
  const [search, setSearch] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState("Todas");
  const [apenasAprovadas, setApenasAprovadas] = useState(false);

  const allCats = ["Todas", ...Array.from(new Set(mockClausulas.map((c) => c.categoria)))];

  const filtered = mockClausulas.filter((c) => {
    const matchSearch =
      c.titulo.toLowerCase().includes(search.toLowerCase()) ||
      c.texto.toLowerCase().includes(search.toLowerCase()) ||
      c.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const matchCat = categoriaAtiva === "Todas" || c.categoria === categoriaAtiva;
    const matchAprov = !apenasAprovadas || c.aprovada;
    return matchSearch && matchCat && matchAprov;
  });

  function copiar(texto: string) {
    navigator.clipboard.writeText(texto).then(() => {
      showToast("Cláusula copiada!");
    }).catch(() => {
      showToast("Não foi possível copiar.", "error");
    });
  }

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold scripta-title text-foreground">Biblioteca de Cláusulas</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Cláusulas aprovadas e prontas para uso nas suas minutas
          </p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1">
            <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <input
              type="search"
              placeholder="Buscar cláusulas, tags..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              data-testid="input-busca-biblioteca"
            />
          </div>
          <button
            onClick={() => setApenasAprovadas(!apenasAprovadas)}
            className={`flex items-center gap-2 px-3 py-2.5 rounded-lg border text-sm font-medium transition ${
              apenasAprovadas
                ? "bg-emerald-100 border-emerald-300 text-emerald-700"
                : "bg-card border-border text-foreground hover:bg-muted"
            }`}
            data-testid="btn-filtro-aprovadas"
          >
            <Filter size={14} />
            Só aprovadas
          </button>
        </div>

        {/* Category pills */}
        <div className="flex gap-2 flex-wrap mb-6">
          {allCats.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoriaAtiva(cat)}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium transition ${
                categoriaAtiva === cat
                  ? "bg-primary text-white"
                  : "bg-card border border-border text-foreground hover:bg-accent"
              }`}
              data-testid={`tab-biblioteca-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground">Nenhuma cláusula encontrada.</p>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map((cl) => (
              <div
                key={cl.id}
                className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md transition"
                data-testid={`card-clausula-${cl.id}`}
              >
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{cl.titulo}</h3>
                    <span className="text-xs text-muted-foreground">{cl.categoria}</span>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {cl.aprovada && (
                      <span className="flex items-center gap-1 text-xs text-emerald-600 font-medium">
                        <Check size={12} /> Aprovada
                      </span>
                    )}
                  </div>
                </div>

                <p className="text-sm text-foreground leading-relaxed mb-4 font-serif line-clamp-4">
                  {cl.texto}
                </p>

                <div className="flex items-center justify-between">
                  <div className="flex flex-wrap gap-1">
                    {cl.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2 py-0.5 bg-accent text-accent-foreground rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <button
                    onClick={() => copiar(cl.texto)}
                    className="flex items-center gap-1.5 text-xs text-primary font-medium hover:bg-accent px-2 py-1 rounded transition"
                    data-testid={`btn-copiar-${cl.id}`}
                  >
                    <Copy size={12} /> Copiar
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
