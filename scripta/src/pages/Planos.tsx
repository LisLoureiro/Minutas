import { Check, X, Zap } from "lucide-react";
import Layout from "@/components/Layout";
import { mockPlanos } from "@/data/mock";
import { showToast } from "@/components/Toast";

export default function Planos() {
  function handleUpgrade(nome: string) {
    showToast(`Redirecionando para contratação do plano ${nome}...`, "info");
  }

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-2xl font-bold scripta-title text-foreground mb-2">Planos e Preços</h1>
          <p className="text-muted-foreground">
            Escolha o plano ideal para seu escritório. Cancele quando quiser.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {mockPlanos.map((plano) => (
            <div
              key={plano.id}
              className={`relative bg-card border rounded-2xl p-6 shadow-sm flex flex-col transition ${
                plano.destaque
                  ? "border-primary shadow-md ring-2 ring-primary/20"
                  : "border-border"
              }`}
              data-testid={`card-plano-${plano.id}`}
            >
              {plano.destaque && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <span className="flex items-center gap-1 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                    <Zap size={10} /> MAIS POPULAR
                  </span>
                </div>
              )}

              {plano.atual && (
                <div className="absolute top-4 right-4">
                  <span className="text-xs bg-emerald-100 text-emerald-700 font-medium px-2 py-0.5 rounded-full">
                    Plano atual
                  </span>
                </div>
              )}

              <div className="mb-6">
                <h2 className="text-lg font-bold scripta-title text-foreground mb-1">{plano.nome}</h2>
                <div className="flex items-end gap-1">
                  {plano.preco === 0 ? (
                    <span className="text-3xl font-bold text-foreground">Grátis</span>
                  ) : (
                    <>
                      <span className="text-sm text-muted-foreground mt-auto mb-1">R$</span>
                      <span className="text-3xl font-bold text-foreground">{plano.preco}</span>
                      <span className="text-muted-foreground mb-1">/mês</span>
                    </>
                  )}
                </div>
              </div>

              <div className="space-y-3 flex-1 mb-6">
                {[
                  {
                    label: `${plano.minutas === "ilimitado" ? "Minutas ilimitadas" : `${plano.minutas} minutas/mês`}`,
                    ok: true,
                  },
                  {
                    label: `${plano.usuarios === "ilimitado" ? "Usuários ilimitados" : `${plano.usuarios} ${plano.usuarios === 1 ? "usuário" : "usuários"}`}`,
                    ok: true,
                  },
                  {
                    label: `${plano.modelos === "ilimitado" ? "Todos os modelos" : `${plano.modelos} modelos`}`,
                    ok: true,
                  },
                  { label: "Exportação PDF/DOCX", ok: plano.exportacoes },
                  { label: "Acesso à API", ok: plano.api },
                  { label: `Suporte: ${plano.suporte}`, ok: true },
                ].map(({ label, ok }) => (
                  <div key={label} className={`flex items-center gap-2 text-sm ${ok ? "text-foreground" : "text-muted-foreground"}`}>
                    {ok ? (
                      <Check size={14} className="text-emerald-500 shrink-0" />
                    ) : (
                      <X size={14} className="text-muted-foreground/40 shrink-0" />
                    )}
                    {label}
                  </div>
                ))}
              </div>

              <button
                onClick={() => {
                  if (plano.atual) showToast("Você já está neste plano.", "info");
                  else handleUpgrade(plano.nome);
                }}
                className={`w-full py-2.5 rounded-lg text-sm font-medium transition ${
                  plano.atual
                    ? "bg-muted text-muted-foreground cursor-default"
                    : plano.destaque
                    ? "bg-primary text-white hover:bg-primary/90"
                    : "border border-primary text-primary hover:bg-accent"
                }`}
                data-testid={`btn-plano-${plano.id}`}
              >
                {plano.atual ? "Plano atual" : plano.preco === 0 ? "Começar grátis" : `Assinar ${plano.nome}`}
              </button>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-8">
          Todos os planos incluem dados criptografados e backup automático. Preços em BRL. Cancele a qualquer momento.
        </p>
      </div>
    </Layout>
  );
}
