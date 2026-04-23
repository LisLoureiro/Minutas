import { useLocation } from "wouter";
import { ArrowLeft, Download, Share2, Printer, CheckCircle } from "lucide-react";
import Layout from "@/components/Layout";
import { showToast } from "@/components/Toast";
import { editorConteudo, mockUsuario } from "@/data/mock";

export default function Preview() {
  const [, setLocation] = useLocation();

  function handleExportar(formato: string) {
    showToast(`Exportando como ${formato}...`, "info");
    setTimeout(() => showToast(`Arquivo ${formato} gerado!`), 1500);
  }

  return (
    <Layout>
      <div className="p-6 max-w-5xl mx-auto">
        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setLocation("/editor")}
              className="p-2 rounded-lg border border-border hover:bg-muted transition text-foreground"
              data-testid="btn-voltar-editor"
            >
              <ArrowLeft size={16} />
            </button>
            <div>
              <h1 className="text-xl font-bold scripta-title text-foreground">
                Visualização Final
              </h1>
              <p className="text-sm text-muted-foreground">Contrato de Prestação de Serviços — TechCorp</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => handleExportar("PDF")}
              className="flex items-center gap-2 px-3 py-2 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition"
              data-testid="btn-exportar-pdf"
            >
              <Download size={14} /> PDF
            </button>
            <button
              onClick={() => handleExportar("DOCX")}
              className="flex items-center gap-2 px-3 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition bg-card"
              data-testid="btn-exportar-docx"
            >
              <Download size={14} /> DOCX
            </button>
            <button
              onClick={() => window.print()}
              className="flex items-center gap-2 px-3 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition bg-card"
              data-testid="btn-imprimir"
            >
              <Printer size={14} /> Imprimir
            </button>
            <button
              onClick={() => setLocation("/compartilhar")}
              className="flex items-center gap-2 px-3 py-2 border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition bg-card"
              data-testid="btn-compartilhar"
            >
              <Share2 size={14} />
            </button>
          </div>
        </div>

        {/* Document */}
        <div className="bg-white rounded-2xl shadow-lg border border-border overflow-hidden">
          {/* Scripta header */}
          <div className="bg-primary px-8 py-6 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-white/20 flex items-center justify-center">
                <span className="text-white font-bold text-lg scripta-title">S</span>
              </div>
              <div>
                <p className="text-white font-bold scripta-title text-xl">Scripta</p>
                <p className="text-white/70 text-xs">Gerador de Minutas Jurídicas</p>
              </div>
            </div>
            <div className="text-right text-white/80 text-xs">
              <p className="font-medium">{mockUsuario.escritorio}</p>
              <p>{mockUsuario.oab}</p>
              <p>Gerado em {new Date().toLocaleDateString("pt-BR")}</p>
            </div>
          </div>

          {/* Status badge */}
          <div className="px-8 py-3 bg-emerald-50 border-b border-emerald-100 flex items-center gap-2">
            <CheckCircle size={14} className="text-emerald-600" />
            <span className="text-sm text-emerald-700 font-medium">Minuta aprovada · Versão 3</span>
          </div>

          {/* Document content */}
          <div
            className="p-10 prose prose-sm max-w-none"
            style={{ fontFamily: "Georgia, serif" }}
            dangerouslySetInnerHTML={{ __html: editorConteudo }}
            data-testid="preview-content"
          />

          {/* Signature area */}
          <div className="px-10 py-8 border-t border-border">
            <div className="grid grid-cols-2 gap-12">
              {["TechCorp Ltda.", "Inova Soluções S.A."].map((parte) => (
                <div key={parte} className="text-center">
                  <div className="h-16 border-b-2 border-foreground/20 mb-2" />
                  <p className="text-sm font-medium text-foreground">{parte}</p>
                  <p className="text-xs text-muted-foreground">Assinatura e Carimbo</p>
                </div>
              ))}
            </div>
            <div className="mt-6 grid grid-cols-2 gap-12">
              {["Testemunha 1", "Testemunha 2"].map((t) => (
                <div key={t} className="text-center">
                  <div className="h-12 border-b border-border mb-2" />
                  <p className="text-xs text-muted-foreground">{t}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Footer */}
          <div className="px-8 py-3 bg-muted/30 border-t border-border text-center">
            <p className="text-xs text-muted-foreground">
              Documento gerado pelo <strong>Scripta</strong> · {mockUsuario.escritorio} · Este documento possui valor jurídico conforme art. 10 da MP 2.200-2/2001
            </p>
          </div>
        </div>
      </div>
    </Layout>
  );
}
