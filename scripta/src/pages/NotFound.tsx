import { useLocation } from "wouter";
import { FileQuestion } from "lucide-react";

export default function NotFound() {
  const [, setLocation] = useLocation();
  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <FileQuestion size={48} className="mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold scripta-title text-foreground mb-2">Página não encontrada</h1>
        <p className="text-muted-foreground mb-6">A rota que você acessou não existe.</p>
        <button
          onClick={() => setLocation("/dashboard")}
          className="bg-primary text-white px-6 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
          data-testid="btn-ir-dashboard"
        >
          Ir ao Dashboard
        </button>
      </div>
    </div>
  );
}
