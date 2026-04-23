import { useState } from "react";
import { Save, User, CreditCard, Bell, Lock } from "lucide-react";
import Layout from "@/components/Layout";
import { mockUsuario } from "@/data/mock";
import { showToast } from "@/components/Toast";

type Tab = "perfil" | "assinatura" | "notificacoes" | "seguranca";

export default function Configuracoes() {
  const [tab, setTab] = useState<Tab>("perfil");
  const [nome, setNome] = useState(mockUsuario.nome);
  const [email, setEmail] = useState(mockUsuario.email);
  const [oab, setOab] = useState(mockUsuario.oab);
  const [escritorio, setEscritorio] = useState(mockUsuario.escritorio);
  const [notifEmail, setNotifEmail] = useState(true);
  const [notifWhatsapp, setNotifWhatsapp] = useState(false);
  const [notifRevisao, setNotifRevisao] = useState(true);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [senhaNova, setSenhaNova] = useState("");
  const [senhaConfirm, setSenhaConfirm] = useState("");

  const tabs = [
    { id: "perfil" as Tab, label: "Perfil", icon: User },
    { id: "assinatura" as Tab, label: "Assinatura", icon: CreditCard },
    { id: "notificacoes" as Tab, label: "Notificações", icon: Bell },
    { id: "seguranca" as Tab, label: "Segurança", icon: Lock },
  ];

  function salvarPerfil(e: React.FormEvent) {
    e.preventDefault();
    showToast("Perfil atualizado com sucesso!");
  }

  function alterarSenha(e: React.FormEvent) {
    e.preventDefault();
    if (senhaNova !== senhaConfirm) {
      showToast("As senhas não coincidem.", "error");
      return;
    }
    if (senhaNova.length < 8) {
      showToast("A nova senha deve ter no mínimo 8 caracteres.", "error");
      return;
    }
    showToast("Senha alterada com sucesso!");
    setSenhaAtual(""); setSenhaNova(""); setSenhaConfirm("");
  }

  return (
    <Layout>
      <div className="p-6 max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold scripta-title text-foreground">Configurações</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Gerencie sua conta e preferências</p>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Sidebar tabs */}
          <div className="w-full md:w-48 shrink-0">
            <nav className="space-y-1">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  onClick={() => setTab(id)}
                  className={`w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition text-left ${
                    tab === id
                      ? "bg-accent text-foreground"
                      : "text-muted-foreground hover:bg-accent/50"
                  }`}
                  data-testid={`tab-config-${id}`}
                >
                  <Icon size={15} /> {label}
                </button>
              ))}
            </nav>
          </div>

          {/* Content */}
          <div className="flex-1">
            {tab === "perfil" && (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-semibold text-foreground mb-5">Dados do Perfil</h2>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6 pb-6 border-b border-border">
                  <div className="w-16 h-16 rounded-full bg-primary flex items-center justify-center text-white text-2xl font-bold">
                    {mockUsuario.avatar}
                  </div>
                  <div>
                    <button
                      className="text-sm text-primary font-medium hover:underline"
                      onClick={() => showToast("Upload de foto disponível no plano Profissional.", "info")}
                      data-testid="btn-alterar-foto"
                    >
                      Alterar foto
                    </button>
                    <p className="text-xs text-muted-foreground mt-0.5">JPG ou PNG, máx. 2MB</p>
                  </div>
                </div>

                <form onSubmit={salvarPerfil} className="space-y-4">
                  {[
                    { id: "nome", label: "Nome completo", value: nome, setter: setNome },
                    { id: "email", label: "E-mail", value: email, setter: setEmail },
                    { id: "oab", label: "OAB", value: oab, setter: setOab },
                    { id: "escritorio", label: "Nome do escritório", value: escritorio, setter: setEscritorio },
                  ].map(({ id, label, value, setter }) => (
                    <div key={id}>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
                      <input
                        type="text"
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                        data-testid={`input-${id}`}
                      />
                    </div>
                  ))}

                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                    data-testid="btn-salvar-perfil"
                  >
                    <Save size={14} /> Salvar alterações
                  </button>
                </form>
              </div>
            )}

            {tab === "assinatura" && (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-semibold text-foreground mb-5">Assinatura</h2>
                <div className="p-4 bg-primary/5 border border-primary/20 rounded-xl mb-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="font-semibold text-foreground">Plano Profissional</span>
                    <span className="text-xs bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full font-medium">Ativo</span>
                  </div>
                  <p className="text-sm text-muted-foreground">R$ 149,00/mês · Renova em 20/05/2026</p>
                  <p className="text-xs text-muted-foreground mt-1">50 minutas · 3 usuários · Exportação PDF/DOCX</p>
                </div>
                <div className="space-y-3">
                  <button
                    onClick={() => showToast("Redirecionando para upgrade...", "info")}
                    className="w-full border border-primary text-primary py-2.5 rounded-lg text-sm font-medium hover:bg-accent transition"
                    data-testid="btn-upgrade"
                  >
                    Fazer upgrade para Escritório
                  </button>
                  <button
                    onClick={() => showToast("Cancelamento processado. Plano ativo até 20/05/2026.", "info")}
                    className="w-full border border-destructive/30 text-destructive py-2.5 rounded-lg text-sm font-medium hover:bg-destructive/5 transition"
                    data-testid="btn-cancelar"
                  >
                    Cancelar assinatura
                  </button>
                </div>
              </div>
            )}

            {tab === "notificacoes" && (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-semibold text-foreground mb-5">Preferências de Notificação</h2>
                <div className="space-y-4">
                  {[
                    { label: "Notificações por e-mail", desc: "Receba atualizações sobre suas minutas", value: notifEmail, setter: setNotifEmail, id: "email" },
                    { label: "Notificações por WhatsApp", desc: "Alertas importantes direto no WhatsApp", value: notifWhatsapp, setter: setNotifWhatsapp, id: "whatsapp" },
                    { label: "Avisos de revisão", desc: "Quando uma minuta precisar de sua atenção", value: notifRevisao, setter: setNotifRevisao, id: "revisao" },
                  ].map(({ label, desc, value, setter, id }) => (
                    <div key={id} className="flex items-center justify-between p-4 bg-background rounded-xl border border-border">
                      <div>
                        <p className="text-sm font-medium text-foreground">{label}</p>
                        <p className="text-xs text-muted-foreground">{desc}</p>
                      </div>
                      <button
                        onClick={() => { setter(!value); showToast(value ? "Notificação desativada." : "Notificação ativada."); }}
                        className={`relative w-11 h-6 rounded-full transition ${value ? "bg-primary" : "bg-muted"}`}
                        data-testid={`toggle-notif-${id}`}
                      >
                        <span className={`absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-all ${value ? "left-6" : "left-1"}`} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === "seguranca" && (
              <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
                <h2 className="text-base font-semibold text-foreground mb-5">Segurança da Conta</h2>
                <form onSubmit={alterarSenha} className="space-y-4">
                  {[
                    { id: "senha-atual", label: "Senha atual", value: senhaAtual, setter: setSenhaAtual },
                    { id: "senha-nova", label: "Nova senha", value: senhaNova, setter: setSenhaNova },
                    { id: "senha-confirm", label: "Confirmar nova senha", value: senhaConfirm, setter: setSenhaConfirm },
                  ].map(({ id, label, value, setter }) => (
                    <div key={id}>
                      <label className="block text-sm font-medium text-foreground mb-1.5">{label}</label>
                      <input
                        type="password"
                        value={value}
                        onChange={(e) => setter(e.target.value)}
                        className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                        data-testid={`input-${id}`}
                      />
                    </div>
                  ))}
                  <button
                    type="submit"
                    className="flex items-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                    data-testid="btn-alterar-senha"
                  >
                    <Lock size={14} /> Alterar senha
                  </button>
                </form>

                <div className="mt-6 pt-6 border-t border-border">
                  <h3 className="text-sm font-semibold text-foreground mb-3">Sessões ativas</h3>
                  <div className="p-3 bg-background rounded-lg border border-border text-sm">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground">Chrome — São Paulo, BR</p>
                        <p className="text-xs text-muted-foreground">Sessão atual · Hoje às 09:12</p>
                      </div>
                      <span className="text-xs text-emerald-600 font-medium">Ativo</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
