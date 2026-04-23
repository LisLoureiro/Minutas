import { useState } from "react";
import { useLocation } from "wouter";
import { Clock, User, GitBranch, Eye } from "lucide-react";
import Layout from "@/components/Layout";
import { mockVersoes } from "@/data/mock";
import { showToast } from "@/components/Toast";

const diffExemplo = [
  { tipo: "normal", texto: "O presente contrato terá vigência de" },
  { tipo: "removido", texto: " 6 (seis) meses" },
  { tipo: "adicionado", texto: " 12 (doze) meses" },
  { tipo: "normal", texto: ", contados da data de sua assinatura." },
];

const diff2 = [
  { tipo: "removido", texto: "O pagamento será efetuado até o dia 10" },
  { tipo: "adicionado", texto: "O pagamento será efetuado até o 5º (quinto) dia útil" },
  { tipo: "normal", texto: " de cada mês, mediante transferência bancária." },
];

export default function Versoes() {
  const [, setLocation] = useLocation();
  const [versaoSelecionada, setVersaoSelecionada] = useState<string>("v3");
  const [comparando, setComparando] = useState<string | null>("v2");

  function handleRestaurar(id: string) {
    showToast(`Versão ${id} restaurada como rascunho.`);
  }

  return (
    <Layout>
      <div className="p-6 max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold scripta-title text-foreground">Histórico de Versões</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Contrato de Prestação de Serviços — TechCorp
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Version list */}
          <div className="space-y-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Versões
            </h2>
            {mockVersoes.map((v) => (
              <div
                key={v.id}
                onClick={() => setVersaoSelecionada(v.id)}
                className={`bg-card border rounded-xl p-4 cursor-pointer transition-all ${
                  versaoSelecionada === v.id
                    ? "border-primary shadow-sm"
                    : "border-border hover:border-primary/30"
                }`}
                data-testid={`card-versao-${v.id}`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="flex items-center gap-2 font-semibold text-foreground text-sm">
                    <GitBranch size={14} className="text-primary" />
                    v{v.numero}
                  </span>
                  {v.alteracoes > 0 && (
                    <span className="text-xs text-emerald-600 font-medium">
                      +{v.alteracoes} alterações
                    </span>
                  )}
                </div>
                <p className="text-sm text-foreground mb-2">{v.descricao}</p>
                <div className="flex flex-col gap-1 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1">
                    <Clock size={10} /> {v.criadaEm}
                  </span>
                  <span className="flex items-center gap-1">
                    <User size={10} /> {v.autor}
                  </span>
                </div>
                <div className="flex gap-2 mt-3">
                  <button
                    onClick={(e) => { e.stopPropagation(); setComparando(v.id === comparando ? null : v.id); }}
                    className="flex-1 text-xs text-primary border border-primary/30 rounded py-1 hover:bg-primary/10 transition"
                    data-testid={`btn-comparar-${v.id}`}
                  >
                    Comparar
                  </button>
                  <button
                    onClick={(e) => { e.stopPropagation(); handleRestaurar(v.id); }}
                    className="flex-1 text-xs text-foreground border border-border rounded py-1 hover:bg-muted transition"
                    data-testid={`btn-restaurar-${v.id}`}
                  >
                    Restaurar
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Diff view */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
              Diferenças — v2 → v3
            </h2>
            <div className="bg-card border border-border rounded-xl overflow-hidden shadow-sm">
              <div className="flex items-center gap-3 px-4 py-3 bg-muted/30 border-b border-border">
                <Eye size={14} className="text-muted-foreground" />
                <span className="text-sm text-muted-foreground">Visualização de diferenças</span>
              </div>
              <div className="p-6 space-y-6">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    Cláusula Terceira — Prazo
                  </p>
                  <div className="font-serif text-sm leading-relaxed p-4 bg-background rounded-lg border border-border">
                    {diffExemplo.map((part, i) => (
                      <span
                        key={i}
                        className={
                          part.tipo === "adicionado"
                            ? "diff-added px-0.5 rounded"
                            : part.tipo === "removido"
                            ? "diff-removed px-0.5 rounded"
                            : ""
                        }
                      >
                        {part.texto}
                      </span>
                    ))}
                  </div>
                </div>

                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-2">
                    Cláusula Quarta — Pagamento
                  </p>
                  <div className="font-serif text-sm leading-relaxed p-4 bg-background rounded-lg border border-border">
                    {diff2.map((part, i) => (
                      <span
                        key={i}
                        className={
                          part.tipo === "adicionado"
                            ? "diff-added px-0.5 rounded"
                            : part.tipo === "removido"
                            ? "diff-removed px-0.5 rounded"
                            : ""
                        }
                      >
                        {part.texto}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-2 border-t border-border text-xs text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-emerald-100 border border-emerald-300 inline-block" />
                    Adicionado
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="w-3 h-3 rounded bg-red-100 border border-red-300 inline-block" />
                    Removido
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
