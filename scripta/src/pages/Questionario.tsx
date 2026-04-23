import { useState } from "react";
import { useLocation } from "wouter";
import { ChevronLeft, ChevronRight, Check } from "lucide-react";
import Layout from "@/components/Layout";
import { showToast } from "@/components/Toast";

interface Campo {
  id: string;
  label: string;
  tipo: "text" | "textarea" | "select" | "date" | "number";
  placeholder?: string;
  opcoes?: string[];
  obrigatorio: boolean;
}

const etapas: { titulo: string; campos: Campo[] }[] = [
  {
    titulo: "Identificação das Partes",
    campos: [
      { id: "contratante_nome", label: "Nome do Contratante", tipo: "text", placeholder: "Razão social ou nome completo", obrigatorio: true },
      { id: "contratante_cnpj", label: "CNPJ / CPF do Contratante", tipo: "text", placeholder: "00.000.000/0001-00", obrigatorio: true },
      { id: "contratante_endereco", label: "Endereço do Contratante", tipo: "text", placeholder: "Rua, número, cidade/UF", obrigatorio: true },
      { id: "contratada_nome", label: "Nome da Contratada", tipo: "text", placeholder: "Razão social ou nome completo", obrigatorio: true },
      { id: "contratada_cnpj", label: "CNPJ / CPF da Contratada", tipo: "text", placeholder: "00.000.000/0001-00", obrigatorio: true },
    ],
  },
  {
    titulo: "Objeto e Escopo",
    campos: [
      { id: "objeto", label: "Objeto do Contrato", tipo: "textarea", placeholder: "Descreva o serviço, produto ou obrigação contratada...", obrigatorio: true },
      { id: "categoria", label: "Categoria", tipo: "select", opcoes: ["Tecnologia", "Consultoria", "Construção", "Saúde", "Educação", "Outro"], obrigatorio: true },
      { id: "escopo", label: "Escopo Detalhado", tipo: "textarea", placeholder: "Inclua especificações técnicas, entregas e exclusões de escopo...", obrigatorio: false },
    ],
  },
  {
    titulo: "Prazo e Vigência",
    campos: [
      { id: "data_inicio", label: "Data de Início", tipo: "date", obrigatorio: true },
      { id: "prazo_meses", label: "Duração (meses)", tipo: "number", placeholder: "12", obrigatorio: true },
      { id: "renovacao", label: "Renovação Automática", tipo: "select", opcoes: ["Sim — por igual período", "Não", "Com aviso prévio de 30 dias"], obrigatorio: true },
    ],
  },
  {
    titulo: "Valor e Pagamento",
    campos: [
      { id: "valor", label: "Valor Total (R$)", tipo: "number", placeholder: "0,00", obrigatorio: true },
      { id: "forma_pagamento", label: "Forma de Pagamento", tipo: "select", opcoes: ["Mensal", "Parcelado", "À vista", "Por etapa"], obrigatorio: true },
      { id: "vencimento", label: "Dia de Vencimento", tipo: "number", placeholder: "5", obrigatorio: false },
      { id: "instrumento", label: "Instrumento de Pagamento", tipo: "select", opcoes: ["Transferência bancária", "PIX", "Boleto", "Cheque"], obrigatorio: true },
    ],
  },
  {
    titulo: "Cláusulas Especiais",
    campos: [
      { id: "foro", label: "Cidade do Foro", tipo: "text", placeholder: "São Paulo", obrigatorio: true },
      { id: "estado_foro", label: "Estado do Foro", tipo: "text", placeholder: "SP", obrigatorio: true },
      { id: "observacoes", label: "Observações Adicionais", tipo: "textarea", placeholder: "Cláusulas, condições ou acordos especiais...", obrigatorio: false },
    ],
  },
];

export default function Questionario() {
  const [, setLocation] = useLocation();
  const [etapaAtual, setEtapaAtual] = useState(0);
  const [valores, setValores] = useState<Record<string, string>>({});

  const etapa = etapas[etapaAtual];
  const total = etapas.length;
  const progresso = ((etapaAtual) / total) * 100;

  function handleChange(id: string, value: string) {
    setValores((prev) => ({ ...prev, [id]: value }));
  }

  function validarEtapa() {
    const camposObrigatorios = etapa.campos.filter((c) => c.obrigatorio);
    return camposObrigatorios.every((c) => (valores[c.id] || "").trim() !== "");
  }

  function avancar() {
    if (!validarEtapa()) {
      showToast("Preencha os campos obrigatórios.", "error");
      return;
    }
    if (etapaAtual < total - 1) {
      setEtapaAtual(etapaAtual + 1);
    } else {
      showToast("Minuta gerada com sucesso!");
      setLocation("/editor");
    }
  }

  function voltar() {
    if (etapaAtual > 0) setEtapaAtual(etapaAtual - 1);
    else setLocation("/modelos");
  }

  return (
    <Layout>
      <div className="p-6 max-w-2xl mx-auto">
        <div className="mb-8">
          <h1 className="text-2xl font-bold scripta-title text-foreground">Novo Contrato</h1>
          <p className="text-muted-foreground text-sm mt-0.5">Prestação de Serviços</p>
        </div>

        {/* Progress */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">
              Etapa {etapaAtual + 1} de {total}
            </span>
            <span className="text-sm text-muted-foreground">{Math.round(progresso)}%</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full transition-all duration-500"
              style={{ width: `${((etapaAtual + 1) / total) * 100}%` }}
            />
          </div>
          {/* Step indicators */}
          <div className="flex gap-2 mt-3">
            {etapas.map((e, i) => (
              <div
                key={i}
                className={`flex-1 text-center ${i === etapaAtual ? "text-primary" : i < etapaAtual ? "text-emerald-600" : "text-muted-foreground"}`}
              >
                <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold mx-auto mb-1 ${
                  i < etapaAtual ? "bg-emerald-100 text-emerald-700" : i === etapaAtual ? "bg-primary text-white" : "bg-muted"
                }`}>
                  {i < etapaAtual ? <Check size={12} /> : i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Form */}
        <div className="bg-card border border-border rounded-2xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-foreground mb-5">{etapa.titulo}</h2>
          <div className="space-y-5">
            {etapa.campos.map((campo) => (
              <div key={campo.id}>
                <label className="block text-sm font-medium text-foreground mb-1.5">
                  {campo.label}
                  {campo.obrigatorio && <span className="text-destructive ml-1">*</span>}
                </label>
                {campo.tipo === "textarea" ? (
                  <textarea
                    rows={3}
                    placeholder={campo.placeholder}
                    value={valores[campo.id] || ""}
                    onChange={(e) => handleChange(campo.id, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition resize-none"
                    data-testid={`input-${campo.id}`}
                  />
                ) : campo.tipo === "select" ? (
                  <select
                    value={valores[campo.id] || ""}
                    onChange={(e) => handleChange(campo.id, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    data-testid={`select-${campo.id}`}
                  >
                    <option value="">Selecione...</option>
                    {campo.opcoes?.map((o) => (
                      <option key={o} value={o}>{o}</option>
                    ))}
                  </select>
                ) : (
                  <input
                    type={campo.tipo}
                    placeholder={campo.placeholder}
                    value={valores[campo.id] || ""}
                    onChange={(e) => handleChange(campo.id, e.target.value)}
                    className="w-full px-4 py-2.5 rounded-lg border border-input bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/50 transition"
                    data-testid={`input-${campo.id}`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Navigation */}
        <div className="flex gap-3 mt-6">
          <button
            onClick={voltar}
            className="flex items-center gap-2 px-4 py-2.5 border border-border rounded-lg text-sm font-medium text-foreground hover:bg-muted transition"
            data-testid="btn-voltar"
          >
            <ChevronLeft size={16} /> Voltar
          </button>
          <button
            onClick={avancar}
            className="flex-1 flex items-center justify-center gap-2 bg-primary text-white px-4 py-2.5 rounded-lg text-sm font-medium hover:bg-primary/90 transition"
            data-testid="btn-avancar"
          >
            {etapaAtual === total - 1 ? (
              <><Check size={16} /> Gerar Minuta</>
            ) : (
              <>Próximo <ChevronRight size={16} /></>
            )}
          </button>
        </div>
      </div>
    </Layout>
  );
}
