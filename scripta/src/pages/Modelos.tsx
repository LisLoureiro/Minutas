import { useState } from "react";
import { useLocation } from "wouter";
import { Search, Star, ChevronRight } from "lucide-react";
import Layout from "@/components/Layout";
import { mockModelos, categorias } from "@/data/mock";

export default function Modelos() {
  const [, setLocation] = useLocation();
  const [search, setSearch] = useState("");
  const [categoriaAtiva, setCategoriaAtiva] = useState<string>("Todos");

  const allCats = ["Todos", ...categorias];

  const filtered = mockModelos.filter((m) => {
    const matchSearch = m.nome.toLowerCase().includes(search.toLowerCase()) ||
      m.descricao.toLowerCase().includes(search.toLowerCase());
    const matchCat = categoriaAtiva === "Todos" || m.categoria === categoriaAtiva;
    return matchSearch && matchCat;
  });

  return (
    <Layout>
      <div className="p-6 max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold scripta-title text-foreground">Modelos de Contratos</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Selecione um modelo para iniciar a geração da sua minuta
          </p>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar modelos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full sm:w-96 pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
            data-testid="input-busca-modelos"
          />
        </div>

        {/* Category tabs */}
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
              data-testid={`tab-cat-${cat}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Grid */}
        {filtered.length === 0 ? (
          <p className="text-center py-12 text-muted-foreground">Nenhum modelo encontrado.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((m) => (
              <div
                key={m.id}
                className="bg-card border border-border rounded-xl p-5 shadow-sm hover:shadow-md hover:border-primary/40 transition-all cursor-pointer group"
                onClick={() => setLocation("/questionario")}
                data-testid={`card-modelo-${m.id}`}
              >
                <div className="flex items-start justify-between mb-3">
                  <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-accent text-accent-foreground">
                    {m.categoria}
                  </span>
                  {m.popular && (
                    <div className="flex items-center gap-1 text-amber-500">
                      <Star size={12} fill="currentColor" />
                      <span className="text-xs font-medium">Popular</span>
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {m.nome}
                </h3>
                <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{m.descricao}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">{m.campos} campos</span>
                  <span className="flex items-center gap-1 text-primary text-xs font-medium group-hover:gap-2 transition-all">
                    Usar modelo <ChevronRight size={12} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
}
