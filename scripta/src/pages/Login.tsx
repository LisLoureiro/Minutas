import { useState } from "react";
import { useLocation } from "wouter";
import { Eye, EyeOff, Lock, Mail, ArrowRight } from "lucide-react";
import { setSession } from "@/lib/auth";
import { showToast } from "@/components/Toast";

type View = "login" | "recuperar" | "confirmado";

export default function Login() {
  const [, setLocation] = useLocation();
  const [view, setView] = useState<View>("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [emailRecuperar, setEmailRecuperar] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    if (!email || !senha) {
      setError("Preencha todos os campos.");
      return;
    }
    if (!email.includes("@")) {
      setError("E-mail inválido.");
      return;
    }
    if (senha.length < 6) {
      setError("Senha muito curta (mín. 6 caracteres).");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setSession(email, "Dr. Ana Lima");
      showToast("Login realizado com sucesso!");
      setLocation("/dashboard");
      setLoading(false);
    }, 800);
  }

  function handleRecuperar(e: React.FormEvent) {
    e.preventDefault();
    if (!emailRecuperar.includes("@")) {
      setError("E-mail inválido.");
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setView("confirmado");
      setLoading(false);
    }, 800);
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-background px-4">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary shadow-lg mb-4">
            <span className="text-white font-bold text-2xl scripta-title">S</span>
          </div>
          <h1 className="text-3xl font-bold scripta-title text-foreground">Scripta</h1>
          <p className="text-muted-foreground text-sm mt-1">Gerador de Minutas Jurídicas</p>
        </div>

        {view === "login" && (
          <div className="bg-card border border-border rounded-2xl p-8 shadow-md">
            <h2 className="text-xl font-semibold text-foreground mb-6">Acesse sua conta</h2>

            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm flex items-center gap-2">
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">E-mail</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="seuemail@escritorio.com"
                    className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    data-testid="input-email"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">Senha</label>
                <div className="relative">
                  <Lock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type={showPassword ? "text" : "password"}
                    value={senha}
                    onChange={(e) => setSenha(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    data-testid="input-senha"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={() => { setView("recuperar"); setError(""); }}
                  className="text-sm text-primary hover:underline"
                  data-testid="link-recuperar"
                >
                  Esqueceu a senha?
                </button>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full flex items-center justify-center gap-2 bg-primary text-white py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition disabled:opacity-60"
                data-testid="btn-login"
              >
                {loading ? "Entrando..." : (
                  <>Entrar <ArrowRight size={16} /></>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-border">
              <button
                className="w-full flex items-center justify-center gap-2 border border-border text-foreground py-2.5 rounded-lg text-sm font-medium hover:bg-muted transition"
                data-testid="btn-sso"
                onClick={() => showToast("SSO disponível no plano Escritório.", "info")}
              >
                <span className="text-xs font-bold text-primary">SSO</span>
                Entrar com SSO corporativo
              </button>
            </div>
          </div>
        )}

        {view === "recuperar" && (
          <div className="bg-card border border-border rounded-2xl p-8 shadow-md">
            <button
              onClick={() => { setView("login"); setError(""); }}
              className="text-sm text-muted-foreground hover:text-foreground mb-6 flex items-center gap-1"
              data-testid="link-voltar-login"
            >
              ← Voltar ao login
            </button>
            <h2 className="text-xl font-semibold text-foreground mb-2">Recuperar senha</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Informe seu e-mail e enviaremos um link de recuperação.
            </p>
            {error && (
              <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                {error}
              </div>
            )}
            <form onSubmit={handleRecuperar} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-1.5">E-mail</label>
                <input
                  type="email"
                  value={emailRecuperar}
                  onChange={(e) => setEmailRecuperar(e.target.value)}
                  placeholder="seuemail@escritorio.com"
                  className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-foreground text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                  data-testid="input-email-recuperar"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary text-white py-2.5 rounded-lg font-medium text-sm hover:bg-primary/90 transition disabled:opacity-60"
                data-testid="btn-recuperar"
              >
                {loading ? "Enviando..." : "Enviar link de recuperação"}
              </button>
            </form>
          </div>
        )}

        {view === "confirmado" && (
          <div className="bg-card border border-border rounded-2xl p-8 shadow-md text-center">
            <div className="w-14 h-14 rounded-full bg-emerald-100 flex items-center justify-center mx-auto mb-4">
              <span className="text-2xl">✓</span>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">E-mail enviado!</h2>
            <p className="text-muted-foreground text-sm mb-6">
              Se houver uma conta associada a <strong>{emailRecuperar}</strong>, você receberá um link em instantes.
            </p>
            <button
              onClick={() => { setView("login"); setError(""); setEmailRecuperar(""); }}
              className="text-primary text-sm hover:underline"
              data-testid="link-voltar-login-confirmado"
            >
              Voltar ao login
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
