import { useState } from "react";
import { Mail, Link2, Copy, X, UserPlus, Shield, Eye } from "lucide-react";
import Layout from "@/components/Layout";
import { showToast } from "@/components/Toast";

interface Convidado {
  id: string;
  email: string;
  papel: "editor" | "visualizador";
  status: "pendente" | "aceito";
}

const initialConvidados: Convidado[] = [
  { id: "c1", email: "carlos.matos@escritorio.com", papel: "editor", status: "aceito" },
  { id: "c2", email: "cliente@techcorp.com.br", papel: "visualizador", status: "pendente" },
];

export default function Compartilhar() {
  const [convidados, setConvidados] = useState<Convidado[]>(initialConvidados);
  const [novoEmail, setNovoEmail] = useState("");
  const [novoPapel, setNovoPapel] = useState<"editor" | "visualizador">("visualizador");
  const [showModal, setShowModal] = useState(false);

  function convidar(e: React.FormEvent) {
    e.preventDefault();
    if (!novoEmail.includes("@")) {
      showToast("E-mail inválido.", "error");
      return;
    }
    if (convidados.some((c) => c.email === novoEmail)) {
      showToast("Usuário já convidado.", "error");
      return;
    }
    setConvidados((prev) => [
      ...prev,
      { id: Date.now().toString(), email: novoEmail, papel: novoPapel, status: "pendente" },
    ]);
    setNovoEmail("");
    showToast(`Convite enviado para ${novoEmail}!`);
  }

  function remover(id: string) {
    setConvidados((prev) => prev.filter((c) => c.id !== id));
    showToast("Acesso removido.");
  }

  function copiarLink() {
    const link = `https://app.scripta.adv.br/m/contrato-techcorp?token=abc123`;
    navigator.clipboard.writeText(link).then(() => {
      showToast("Link copiado!");
    }).catch(() => {
      showToast("Erro ao copiar.", "error");
    });
  }

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold scripta-title text-foreground">Compartilhar Minuta</h1>
          <p className="text-muted-foreground text-sm mt-0.5">
            Contrato de Prestação de Serviços — TechCorp
          </p>
        </div>

        {/* Invite form */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <UserPlus size={16} className="text-primary" /> Convidar pessoas
          </h2>
          <form onSubmit={convidar} className="flex gap-2 flex-wrap">
            <input
              type="email"
              placeholder="email@exemplo.com"
              value={novoEmail}
              onChange={(e) => setNovoEmail(e.target.value)}
              className="flex-1 min-w-40 px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              data-testid="input-email-convidar"
            />
            <select
              value={novoPapel}
              onChange={(e) => setNovoPapel(e.target.value as "editor" | "visualizador")}
              className="px-3 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              data-testid="select-papel"
            >
              <option value="visualizador">Visualizador</option>
              <option value="editor">Editor</option>
            </select>
            <button
              type="submit"
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition"
              data-testid="btn-convidar"
            >
              <Mail size={14} /> Convidar
            </button>
          </form>

          <div className="mt-4 p-3 bg-muted/30 rounded-lg text-xs text-muted-foreground flex gap-2">
            <span>
              <strong>Editor</strong> — pode editar e comentar a minuta.{" "}
              <strong>Visualizador</strong> — acesso de leitura apenas.
            </span>
          </div>
        </div>

        {/* Current access */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm mb-6">
          <h2 className="text-base font-semibold text-foreground mb-4">Pessoas com acesso</h2>
          {convidados.length === 0 ? (
            <p className="text-sm text-muted-foreground text-center py-4">Nenhum convidado ainda.</p>
          ) : (
            <div className="space-y-3">
              {convidados.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-3 p-3 bg-background rounded-lg border border-border"
                  data-testid={`row-convidado-${c.id}`}
                >
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary text-sm font-bold shrink-0">
                    {c.email[0].toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-foreground truncate">{c.email}</p>
                    <p className="text-xs text-muted-foreground">
                      {c.status === "pendente" ? "Convite pendente" : "Aceito"}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    <span className={`flex items-center gap-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      c.papel === "editor"
                        ? "bg-primary/10 text-primary"
                        : "bg-muted text-muted-foreground"
                    }`}>
                      {c.papel === "editor" ? <Shield size={10} /> : <Eye size={10} />}
                      {c.papel}
                    </span>
                    <button
                      onClick={() => remover(c.id)}
                      className="text-muted-foreground hover:text-destructive transition p-1"
                      data-testid={`btn-remover-${c.id}`}
                    >
                      <X size={14} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Share link */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-base font-semibold text-foreground mb-4 flex items-center gap-2">
            <Link2 size={16} className="text-primary" /> Link de acesso
          </h2>
          <div className="flex gap-2">
            <input
              readOnly
              value="https://app.scripta.adv.br/m/contrato-techcorp?token=abc123"
              className="flex-1 px-4 py-2.5 rounded-lg border border-input bg-muted text-sm text-muted-foreground"
              data-testid="input-link"
            />
            <button
              onClick={copiarLink}
              className="flex items-center gap-2 px-4 py-2.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition"
              data-testid="btn-copiar-link"
            >
              <Copy size={14} /> Copiar
            </button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            Qualquer pessoa com este link pode visualizar a minuta (sem edição).
          </p>
        </div>
      </div>
    </Layout>
  );
}
