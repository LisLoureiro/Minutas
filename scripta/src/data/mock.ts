export type MinutaStatus = "rascunho" | "revisao" | "aprovada" | "assinada";

export interface Minuta {
  id: string;
  titulo: string;
  modelo: string;
  categoria: string;
  status: MinutaStatus;
  criadaEm: string;
  atualizadaEm: string;
  autor: string;
  partes: string[];
  versoes: number;
}

export interface Modelo {
  id: string;
  nome: string;
  categoria: string;
  descricao: string;
  campos: number;
  popular: boolean;
}

export interface Clausula {
  id: string;
  titulo: string;
  texto: string;
  categoria: string;
  aprovada: boolean;
  tags: string[];
}

export interface Versao {
  id: string;
  minutaId: string;
  numero: number;
  descricao: string;
  criadaEm: string;
  autor: string;
  alteracoes: number;
}

export interface Plano {
  id: string;
  nome: string;
  preco: number;
  periodo: "mensal" | "anual";
  minutas: number | "ilimitado";
  usuarios: number | "ilimitado";
  modelos: number | "ilimitado";
  exportacoes: boolean;
  api: boolean;
  suporte: string;
  atual: boolean;
  destaque: boolean;
}

export const mockMinutas: Minuta[] = [
  {
    id: "m1",
    titulo: "Contrato de Prestação de Serviços — TechCorp",
    modelo: "Prestação de Serviços",
    categoria: "Contratos Comerciais",
    status: "aprovada",
    criadaEm: "2025-03-10",
    atualizadaEm: "2025-04-15",
    autor: "Dr. Ana Lima",
    partes: ["TechCorp Ltda.", "Inova Soluções S.A."],
    versoes: 3,
  },
  {
    id: "m2",
    titulo: "Contrato de Locação Comercial — Galeria 23",
    modelo: "Locação Comercial",
    categoria: "Imobiliário",
    status: "revisao",
    criadaEm: "2025-04-01",
    atualizadaEm: "2025-04-18",
    autor: "Dr. Ana Lima",
    partes: ["Galeria 23 Empreendimentos", "Moda & Cia EIRELI"],
    versoes: 2,
  },
  {
    id: "m3",
    titulo: "NDA — Projeto Athena",
    modelo: "Acordo de Confidencialidade",
    categoria: "Propriedade Intelectual",
    status: "assinada",
    criadaEm: "2025-02-20",
    atualizadaEm: "2025-03-05",
    autor: "Dr. Ana Lima",
    partes: ["Athena Ventures", "Carlos Ferreira ME"],
    versoes: 1,
  },
  {
    id: "m4",
    titulo: "Contrato de Trabalho — Engenheiro Sênior",
    modelo: "Contrato CLT",
    categoria: "Trabalhista",
    status: "rascunho",
    criadaEm: "2025-04-19",
    atualizadaEm: "2025-04-19",
    autor: "Dr. Ana Lima",
    partes: ["Omega Digital Ltda.", "Pedro Henrique Alves"],
    versoes: 1,
  },
  {
    id: "m5",
    titulo: "Acordo de Parceria Estratégica — BlueOcean",
    modelo: "Parceria Empresarial",
    categoria: "Contratos Comerciais",
    status: "revisao",
    criadaEm: "2025-03-28",
    atualizadaEm: "2025-04-10",
    autor: "Dr. Ana Lima",
    partes: ["BlueOcean Consulting", "Meridian Corp"],
    versoes: 4,
  },
  {
    id: "m6",
    titulo: "Contrato de Cessão de Direitos Autorais",
    modelo: "Cessão de Direitos",
    categoria: "Propriedade Intelectual",
    status: "aprovada",
    criadaEm: "2025-03-15",
    atualizadaEm: "2025-04-02",
    autor: "Dr. Ana Lima",
    partes: ["Editora Luz Ltda.", "Marina Oliveira"],
    versoes: 2,
  },
];

export const mockModelos: Modelo[] = [
  {
    id: "mod1",
    nome: "Prestação de Serviços",
    categoria: "Contratos Comerciais",
    descricao: "Contrato padrão para serviços profissionais com cláusulas de prazo, pagamento e responsabilidade.",
    campos: 12,
    popular: true,
  },
  {
    id: "mod2",
    nome: "Compra e Venda",
    categoria: "Contratos Comerciais",
    descricao: "Contrato de compra e venda de bens móveis com garantia e entrega.",
    campos: 10,
    popular: false,
  },
  {
    id: "mod3",
    nome: "Parceria Empresarial",
    categoria: "Contratos Comerciais",
    descricao: "Acordo de parceria estratégica entre empresas com cláusulas de exclusividade.",
    campos: 15,
    popular: true,
  },
  {
    id: "mod4",
    nome: "Locação Residencial",
    categoria: "Imobiliário",
    descricao: "Contrato de aluguel residencial conforme Lei 8.245/91.",
    campos: 14,
    popular: true,
  },
  {
    id: "mod5",
    nome: "Locação Comercial",
    categoria: "Imobiliário",
    descricao: "Contrato de locação para fins comerciais com cláusulas específicas.",
    campos: 16,
    popular: false,
  },
  {
    id: "mod6",
    nome: "Promessa de Compra e Venda",
    categoria: "Imobiliário",
    descricao: "Promessa de compra e venda de imóvel com cláusulas de financiamento.",
    campos: 18,
    popular: false,
  },
  {
    id: "mod7",
    nome: "Acordo de Confidencialidade (NDA)",
    categoria: "Propriedade Intelectual",
    descricao: "NDA unilateral ou bilateral para proteção de informações sensíveis.",
    campos: 8,
    popular: true,
  },
  {
    id: "mod8",
    nome: "Cessão de Direitos Autorais",
    categoria: "Propriedade Intelectual",
    descricao: "Cessão total ou parcial de direitos de obra intelectual.",
    campos: 9,
    popular: false,
  },
  {
    id: "mod9",
    nome: "Licença de Software",
    categoria: "Propriedade Intelectual",
    descricao: "Contrato de licenciamento de software com restrições de uso.",
    campos: 11,
    popular: false,
  },
  {
    id: "mod10",
    nome: "Contrato CLT",
    categoria: "Trabalhista",
    descricao: "Contrato de trabalho com registro em carteira conforme CLT.",
    campos: 13,
    popular: true,
  },
  {
    id: "mod11",
    nome: "Contrato de Estágio",
    categoria: "Trabalhista",
    descricao: "Termo de compromisso de estágio supervisionado.",
    campos: 10,
    popular: false,
  },
  {
    id: "mod12",
    nome: "Acordo de Rescisão",
    categoria: "Trabalhista",
    descricao: "Acordo para rescisão contratual com cláusulas indenizatórias.",
    campos: 8,
    popular: false,
  },
  {
    id: "mod13",
    nome: "Estatuto Social",
    categoria: "Societário",
    descricao: "Estatuto social para constituição de sociedade anônima.",
    campos: 20,
    popular: false,
  },
  {
    id: "mod14",
    nome: "Contrato Social",
    categoria: "Societário",
    descricao: "Contrato social para constituição de sociedade limitada.",
    campos: 18,
    popular: true,
  },
  {
    id: "mod15",
    nome: "Acordo de Sócios",
    categoria: "Societário",
    descricao: "Shareholders agreement com drag-along, tag-along e direito de preferência.",
    campos: 22,
    popular: false,
  },
];

export const mockClausulas: Clausula[] = [
  {
    id: "cl1",
    titulo: "Prazo de Vigência",
    texto: "O presente contrato terá vigência pelo prazo de [PRAZO] meses, contados da data de sua assinatura, podendo ser prorrogado mediante acordo escrito entre as partes.",
    categoria: "Prazo",
    aprovada: true,
    tags: ["prazo", "vigência", "prorrogação"],
  },
  {
    id: "cl2",
    titulo: "Forma e Condições de Pagamento",
    texto: "O pagamento será efetuado mediante [FORMA_PAGAMENTO], no valor de R$ [VALOR], até o dia [DIA_VENCIMENTO] de cada mês, por meio de [INSTRUMENTO_PAGAMENTO].",
    categoria: "Pagamento",
    aprovada: true,
    tags: ["pagamento", "valor", "vencimento"],
  },
  {
    id: "cl3",
    titulo: "Multa por Atraso",
    texto: "Em caso de atraso no pagamento, incidirá multa de 2% (dois por cento) sobre o valor devido, acrescido de juros moratórios de 1% (um por cento) ao mês, calculados pro rata die.",
    categoria: "Penalidades",
    aprovada: true,
    tags: ["multa", "juros", "mora"],
  },
  {
    id: "cl4",
    titulo: "Confidencialidade",
    texto: "As partes comprometem-se a manter em sigilo absoluto todas as informações confidenciais a que tiverem acesso em razão do presente contrato, pelo prazo de [PRAZO_SIGILO] anos após o término da vigência.",
    categoria: "Confidencialidade",
    aprovada: true,
    tags: ["sigilo", "confidencialidade", "NDA"],
  },
  {
    id: "cl5",
    titulo: "Rescisão por Justa Causa",
    texto: "O presente contrato poderá ser rescindido por qualquer das partes mediante notificação escrita com antecedência mínima de [PRAZO_AVISO] dias, em caso de descumprimento das obrigações contratuais.",
    categoria: "Rescisão",
    aprovada: true,
    tags: ["rescisão", "justa causa", "notificação"],
  },
  {
    id: "cl6",
    titulo: "Foro de Eleição",
    texto: "Fica eleito o foro da Comarca de [CIDADE_FORO], Estado de [ESTADO_FORO], para dirimir quaisquer controvérsias decorrentes do presente instrumento, com renúncia expressa a qualquer outro.",
    categoria: "Jurisdição",
    aprovada: true,
    tags: ["foro", "jurisdição", "litígio"],
  },
  {
    id: "cl7",
    titulo: "Exclusividade",
    texto: "Durante a vigência do presente contrato, a CONTRATADA não poderá prestar serviços a empresas concorrentes da CONTRATANTE no segmento de [SEGMENTO], sob pena das sanções previstas neste instrumento.",
    categoria: "Exclusividade",
    aprovada: false,
    tags: ["exclusividade", "concorrência", "restrição"],
  },
  {
    id: "cl8",
    titulo: "Propriedade Intelectual",
    texto: "Todos os trabalhos, criações, invenções e desenvolvimentos realizados no âmbito do presente contrato são de propriedade exclusiva da CONTRATANTE, inclusive para fins de registro junto aos órgãos competentes.",
    categoria: "Propriedade Intelectual",
    aprovada: true,
    tags: ["propriedade intelectual", "autoria", "criação"],
  },
];

export const mockVersoes: Versao[] = [
  {
    id: "v1",
    minutaId: "m1",
    numero: 1,
    descricao: "Versão inicial gerada pelo Scripta",
    criadaEm: "2025-03-10 09:12",
    autor: "Dr. Ana Lima",
    alteracoes: 0,
  },
  {
    id: "v2",
    minutaId: "m1",
    numero: 2,
    descricao: "Ajuste nas cláusulas de pagamento e prazo",
    criadaEm: "2025-03-18 14:30",
    autor: "Dr. Ana Lima",
    alteracoes: 4,
  },
  {
    id: "v3",
    minutaId: "m1",
    numero: 3,
    descricao: "Revisão final — aprovada pelo cliente",
    criadaEm: "2025-04-15 11:00",
    autor: "Dr. Carlos Matos",
    alteracoes: 2,
  },
];

export const mockPlanos: Plano[] = [
  {
    id: "free",
    nome: "Básico",
    preco: 0,
    periodo: "mensal",
    minutas: 5,
    usuarios: 1,
    modelos: 10,
    exportacoes: false,
    api: false,
    suporte: "E-mail (48h)",
    atual: false,
    destaque: false,
  },
  {
    id: "pro",
    nome: "Profissional",
    preco: 149,
    periodo: "mensal",
    minutas: 50,
    usuarios: 3,
    modelos: "ilimitado",
    exportacoes: true,
    api: false,
    suporte: "E-mail (24h)",
    atual: true,
    destaque: true,
  },
  {
    id: "enterprise",
    nome: "Escritório",
    preco: 399,
    periodo: "mensal",
    minutas: "ilimitado",
    usuarios: "ilimitado",
    modelos: "ilimitado",
    exportacoes: true,
    api: true,
    suporte: "Prioritário + WhatsApp",
    atual: false,
    destaque: false,
  },
];

export const categorias = [
  "Contratos Comerciais",
  "Imobiliário",
  "Propriedade Intelectual",
  "Trabalhista",
  "Societário",
];

export const mockUsuario = {
  nome: "Dr. Ana Lima",
  email: "ana.lima@escritorio.adv.br",
  oab: "OAB/SP 123.456",
  escritorio: "Lima & Associados Advocacia",
  plano: "Profissional",
  avatar: "AL",
};

export const editorConteudo = `
<h2>CONTRATO DE PRESTAÇÃO DE SERVIÇOS</h2>

<p>Pelo presente instrumento particular e na melhor forma de direito, as partes a seguir qualificadas, doravante denominadas simplesmente <strong>CONTRATANTE</strong> e <strong>CONTRATADA</strong>, têm entre si justo e contratado o seguinte:</p>

<h3>CLÁUSULA PRIMEIRA — DAS PARTES</h3>
<p><strong>CONTRATANTE:</strong> TechCorp Ltda., pessoa jurídica de direito privado, inscrita no CNPJ sob nº 12.345.678/0001-90, com sede na Rua das Inovações, 500, São Paulo/SP.</p>
<p><strong>CONTRATADA:</strong> Inova Soluções S.A., pessoa jurídica de direito privado, inscrita no CNPJ sob nº 98.765.432/0001-10, com sede na Av. Tecnológica, 1000, São Paulo/SP.</p>

<h3>CLÁUSULA SEGUNDA — DO OBJETO</h3>
<p>O presente contrato tem por objeto a prestação de serviços de desenvolvimento de software, compreendendo análise, projeto, desenvolvimento e implantação de sistema de gestão empresarial, conforme especificações técnicas constantes no Anexo I.</p>

<h3>CLÁUSULA TERCEIRA — DO PRAZO</h3>
<p>O presente contrato terá vigência de 12 (doze) meses, contados da data de sua assinatura, podendo ser prorrogado mediante acordo escrito entre as partes.</p>

<h3>CLÁUSULA QUARTA — DO VALOR E FORMA DE PAGAMENTO</h3>
<p>Pelos serviços prestados, a CONTRATANTE pagará à CONTRATADA o valor mensal de R$ 25.000,00 (vinte e cinco mil reais), até o 5º (quinto) dia útil de cada mês.</p>

<h3>CLÁUSULA QUINTA — DA CONFIDENCIALIDADE</h3>
<p>As partes comprometem-se a manter em sigilo absoluto todas as informações confidenciais, pelo prazo de 5 (cinco) anos após o término deste contrato.</p>

<h3>CLÁUSULA SEXTA — DO FORO</h3>
<p>Fica eleito o foro da Comarca de São Paulo, Estado de São Paulo, para dirimir quaisquer controvérsias.</p>

<p>São Paulo, 10 de março de 2025.</p>
`;
