import { useState, useRef } from "react";
import { useLocation } from "wouter";
import {
  Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight,
  Plus, Eye, Save, Download, Share2, ChevronRight
} from "lucide-react";
import Layout from "@/components/Layout";
import { showToast } from "@/components/Toast";
import { mockClausulas, editorConteudo } from "@/data/mock";

export default function Editor() {
  const [, setLocation] = useLocation();
  const editorRef = useRef<HTMLDivElement>(null);
  const [clausulaSearch, setClausulaSearch] = useState("");
  const [unsaved, setUnsaved] = useState(false);

  const clausulasFiltradas = mockClausulas.filter(
    (c) =>
      c.titulo.toLowerCase().includes(clausulaSearch.toLowerCase()) ||
      c.categoria.toLowerCase().includes(clausulaSearch.toLowerCase())
  );

  function exec(command: string, value?: string) {
    document.execCommand(command, false, value);
    editorRef.current?.focus();
    setUnsaved(true);
  }

  function handleInput() {
    setUnsaved(true);
  }

  function insertarClausula(texto: string) {
    editorRef.current?.focus();
    const sel = window.getSelection();
    if (sel && sel.rangeCount > 0) {
      const range = sel.getRangeAt(0);
      range.deleteContents();
      const p = document.createElement("p");
      p.innerHTML = texto;
      range.insertNode(p);
    } else {
      if (editorRef.current) {
        editorRef.current.innerHTML += `<p>${texto}</p>`;
      }
    }
    setUnsaved(true);
    showToast("Cláusula inserida.");
  }

  function salvar() {
    setUnsaved(false);
    showToast("Minuta salva com sucesso!");
  }

  return (
    <Layout>
      <div className="flex h-full overflow-hidden">
        {/* Editor main */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Toolbar */}
          <div className="flex items-center gap-1 px-4 py-2 bg-card border-b border-border shadow-sm flex-wrap">
            <div className="flex items-center gap-1">
              {[
                { icon: Bold, cmd: "bold", label: "Negrito" },
                { icon: Italic, cmd: "italic", label: "Itálico" },
                { icon: Underline, cmd: "underline", label: "Sublinhado" },
              ].map(({ icon: Icon, cmd, label }) => (
                <button
                  key={cmd}
                  onClick={() => exec(cmd)}
                  title={label}
                  className="p-1.5 rounded hover:bg-muted transition text-foreground"
                  data-testid={`btn-${cmd}`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
            <div className="w-px h-5 bg-border mx-1" />
            <div className="flex items-center gap-1">
              {[
                { icon: AlignLeft, cmd: "justifyLeft", label: "Esq." },
                { icon: AlignCenter, cmd: "justifyCenter", label: "Centro" },
                { icon: AlignRight, cmd: "justifyRight", label: "Dir." },
              ].map(({ icon: Icon, cmd, label }) => (
                <button
                  key={cmd}
                  onClick={() => exec(cmd)}
                  title={label}
                  className="p-1.5 rounded hover:bg-muted transition text-foreground"
                  data-testid={`btn-${cmd}`}
                >
                  <Icon size={16} />
                </button>
              ))}
            </div>
            <div className="flex-1" />
            <div className="flex items-center gap-2">
              {unsaved && (
                <span className="text-xs text-amber-600 font-medium">Não salvo</span>
              )}
              <button
                onClick={salvar}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-primary text-white rounded-lg text-sm font-medium hover:bg-primary/90 transition"
                data-testid="btn-salvar"
              >
                <Save size={14} /> Salvar
              </button>
              <button
                onClick={() => setLocation("/preview")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition"
                data-testid="btn-preview"
              >
                <Eye size={14} /> Preview
              </button>
              <button
                onClick={() => showToast("Exportação disponível no plano Profissional.", "info")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition"
                data-testid="btn-exportar"
              >
                <Download size={14} /> Exportar
              </button>
              <button
                onClick={() => setLocation("/compartilhar")}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-card border border-border text-foreground rounded-lg text-sm font-medium hover:bg-muted transition"
                data-testid="btn-compartilhar"
              >
                <Share2 size={14} />
              </button>
            </div>
          </div>

          {/* Content editable */}
          <div className="flex-1 overflow-y-auto bg-background p-8">
            <div className="max-w-3xl mx-auto">
              <div
                ref={editorRef}
                contentEditable
                suppressContentEditableWarning
                onInput={handleInput}
                className="min-h-[600px] bg-white rounded-xl shadow-sm border border-border p-8 prose prose-sm max-w-none focus:outline-none focus:ring-2 focus:ring-primary/30"
                style={{ fontFamily: "Georgia, serif" }}
                data-placeholder="Comece a editar sua minuta..."
                dangerouslySetInnerHTML={{ __html: editorConteudo }}
                data-testid="editor-content"
              />
            </div>
          </div>
        </div>

        {/* Right panel — Cláusulas */}
        <div className="w-72 flex flex-col border-l border-border bg-card overflow-hidden">
          <div className="p-4 border-b border-border">
            <h3 className="font-semibold text-foreground text-sm mb-3">Inserir Cláusula</h3>
            <input
              type="search"
              placeholder="Buscar cláusulas..."
              value={clausulaSearch}
              onChange={(e) => setClausulaSearch(e.target.value)}
              className="w-full px-3 py-2 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
              data-testid="input-busca-clausulas"
            />
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {clausulasFiltradas.map((cl) => (
              <div
                key={cl.id}
                className="bg-background border border-border rounded-lg p-3 hover:border-primary/40 transition group"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-foreground">{cl.titulo}</span>
                  {cl.aprovada && (
                    <span className="text-xs text-emerald-600 font-medium">✓</span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground mb-2 line-clamp-2">{cl.texto}</p>
                <div className="flex flex-wrap gap-1 mb-2">
                  {cl.tags.slice(0, 2).map((tag) => (
                    <span key={tag} className="text-xs px-1.5 py-0.5 bg-accent text-accent-foreground rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                <button
                  onClick={() => insertarClausula(cl.texto)}
                  className="w-full flex items-center justify-center gap-1 text-xs text-primary font-medium hover:bg-accent rounded py-1 transition"
                  data-testid={`btn-inserir-clausula-${cl.id}`}
                >
                  <Plus size={12} /> Inserir
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
}
