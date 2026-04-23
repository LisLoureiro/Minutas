import { useState } from "react";
import { Link, useLocation } from "wouter";
import {
  LayoutDashboard,
  FileText,
  Library,
  BookOpen,
  History,
  Share2,
  CreditCard,
  Settings,
  LogOut,
  Menu,
  X,
  ChevronRight,
} from "lucide-react";
import { clearSession } from "@/lib/auth";
import { mockUsuario } from "@/data/mock";
import { useToast } from "@/hooks/use-toast";

const navItems = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/modelos", label: "Modelos", icon: FileText },
  { href: "/biblioteca", label: "Biblioteca", icon: Library },
  { href: "/versoes", label: "Versões", icon: History },
  { href: "/compartilhar", label: "Compartilhar", icon: Share2 },
  { href: "/planos", label: "Planos", icon: CreditCard },
  { href: "/configuracoes", label: "Configurações", icon: Settings },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [location, setLocation] = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();

  function handleLogout() {
    clearSession();
    toast({ title: "Sessão encerrada", description: "Até logo!" });
    setLocation("/login");
  }

  const isActive = (href: string) => location.startsWith(href);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <aside
        className={`flex flex-col bg-sidebar text-sidebar-foreground transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        } shrink-0 overflow-hidden`}
        data-testid="sidebar"
      >
        {/* Logo */}
        <div className="flex items-center gap-3 px-4 py-5 border-b border-sidebar-border">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-primary shrink-0">
            <span className="text-white font-bold text-sm scripta-title">S</span>
          </div>
          {sidebarOpen && (
            <span className="text-xl font-bold scripta-title tracking-wide text-white">
              Scripta
            </span>
          )}
          <button
            className="ml-auto text-sidebar-foreground/60 hover:text-sidebar-foreground transition-colors"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            data-testid="toggle-sidebar"
            aria-label="Toggle sidebar"
          >
            {sidebarOpen ? <X size={16} /> : <Menu size={16} />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 py-4 space-y-1 px-2 overflow-y-auto">
          {navItems.map(({ href, label, icon: Icon }) => (
            <Link key={href} href={href}>
              <a
                data-testid={`nav-${label.toLowerCase()}`}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                  isActive(href)
                    ? "bg-sidebar-accent text-white"
                    : "text-sidebar-foreground/70 hover:bg-sidebar-accent/50 hover:text-sidebar-foreground"
                }`}
              >
                <Icon size={18} className="shrink-0" />
                {sidebarOpen && <span>{label}</span>}
                {sidebarOpen && isActive(href) && (
                  <ChevronRight size={14} className="ml-auto" />
                )}
              </a>
            </Link>
          ))}
        </nav>

        {/* User area */}
        <div className="border-t border-sidebar-border px-3 py-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold shrink-0">
              {mockUsuario.avatar}
            </div>
            {sidebarOpen && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">
                  {mockUsuario.nome}
                </p>
                <p className="text-xs text-sidebar-foreground/50 truncate">
                  {mockUsuario.plano}
                </p>
              </div>
            )}
            {sidebarOpen && (
              <button
                onClick={handleLogout}
                data-testid="btn-logout"
                className="text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors"
                aria-label="Sair"
              >
                <LogOut size={16} />
              </button>
            )}
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="flex items-center gap-4 px-6 py-4 bg-card border-b border-border shadow-sm">
          <div className="flex-1">
            {/* Breadcrumb could go here */}
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground hidden sm:block">
              {mockUsuario.escritorio}
            </span>
            <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white text-sm font-bold">
              {mockUsuario.avatar}
            </div>
          </div>
        </header>

        {/* Page */}
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
