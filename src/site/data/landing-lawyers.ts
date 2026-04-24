import { whatsappUrl } from "@/site/config/brand";

export type LandingData = {
  audience: string;
  hero: {
    eyebrow: string;
    titlePrefix: string;
    titleHighlight: string;
    titleSuffix: string;
    subtitle: string;
    image: string;
    cta: { label: string; href: string; source: string };
    stats: Array<{ value: string; label: string }>;
  };
  proofStrip: string[];
  beforeAfter: Array<{
    before: string;
    after: string;
    name: string;
    usage: string;
  }>;
  gallery: string[];
  pains: string[];
  steps: Array<{ title: string; text: string }>;
  guide: {
    ok: string[];
    avoid: string[];
  };
  pricing: Array<{
    tag: string;
    title: string;
    subtitle: string;
    priceLabel: string;
    price: string;
    cents: string;
    helper: string;
    features: string[];
    cta: { label: string; href: string; source: string };
    featured?: boolean;
  }>;
  faqs: Array<{ q: string; a: string }>;
};

export const lawyerLanding: LandingData = {
  audience: "advogados",
  hero: {
    eyebrow: "Nuance Studio · Para Advogados",
    titlePrefix: "A foto do seu perfil precisa sustentar a",
    titleHighlight: "autoridade",
    titleSuffix: "do seu nome.",
    subtitle:
      "Você envia 1 ou 2 fotos comuns, recebe a prévia do ensaio em até 24h e só paga se aprovar. Sem ensaio presencial, sem deslocamento e sem expor suas fotos sem autorização.",
    image: "/fotos/hero-principal.jpg",
    cta: {
      label: "Quero ver minha prévia",
      href: whatsappUrl("Olá, quero fazer meu ensaio profissional"),
      source: "hero_whatsapp_click",
    },
    stats: [
      { value: "24h", label: "Prazo da prévia" },
      { value: "1º", label: "Você analisa, depois decide" },
      { value: "LGPD", label: "Sem uso das fotos sem autorização" },
    ],
  },
  proofStrip: [
    "Prévia antes do pagamento",
    "Entrega em até 24h",
    "Fotos privadas e protegidas por LGPD",
  ],
  beforeAfter: [
    {
      before: "/fotos/antes-1.jpg",
      after: "/fotos/depois-1.jpg",
      name: "Mesma pessoa, nova leitura de autoridade",
      usage: "WhatsApp Business · Instagram profissional · site do escritório",
    },
    {
      before: "/fotos/antes-2.jpg",
      after: "/fotos/depois-2.jpg",
      name: "Imagem refinada sem perder autenticidade",
      usage: "perfil profissional · apresentações · materiais institucionais",
    },
    {
      before: "/fotos/antes-3.jpg",
      after: "/fotos/depois-3.jpg",
      name: "Presença profissional com leitura natural e convincente",
      usage: "WhatsApp Business · Instagram profissional · contato inicial com clientes",
    },
    {
      before: "/fotos/antes-4.jpg",
      after: "/fotos/depois-4.jpg",
      name: "Imagem alinhada ao nível do escritório e da sua atuação",
      usage: "site do escritório · assinatura profissional · materiais institucionais",
    },
  ],
  gallery: [
    "/fotos/galeria-1.jpg",
    "/fotos/galeria-2.jpg",
    "/fotos/galeria-4.jpg",
    "/fotos/galeria-6.jpg",
    "/fotos/galeria-7.jpeg",
    "/fotos/galeria-8.jpeg",
  ],
  pains: [
    "Sua foto atual pode até funcionar como lembrança pessoal, mas não sustenta a percepção de seriedade que um escritório precisa transmitir.",
    "O ensaio presencial costuma exigir agenda, deslocamento, produção e um investimento alto demais para uma necessidade que você quer resolver rápido.",
    "Muitos advogados evitam ensaio porque não gostam de posar ou sentem que ficam artificiais. O problema é que continuar adiando também custa percepção.",
    "Usar a mesma foto antiga em WhatsApp, Instagram, site e perfil profissional faz sua imagem parecer parada no tempo, mesmo quando sua atuação já está em outro nível.",
    "Se o escritório comunica preparo, mas sua foto não acompanha, nasce uma incoerência sutil. E incoerência reduz confiança antes mesmo do primeiro contato.",
  ],
  steps: [
    {
      title: "Você envia 1 ou 2 fotos",
      text: "Selfie ou foto comum, desde que o rosto esteja nítido.",
    },
    {
      title: "Você recebe a prévia",
      text: "Em até 24h, com marca d'água e leitura profissional pronta para avaliar.",
    },
    {
      title: "Aprova ou pede ajuste",
      text: "Se quiser refinar expressão, pose ou direção visual, ajustamos antes da cobrança.",
    },
    {
      title: "Paga e recebe em alta",
      text: "PIX ou cartão. A versão final sai pronta para WhatsApp, site, Instagram e perfil profissional.",
    },
  ],
  guide: {
    ok: [
      "Foto do rosto com boa iluminação natural",
      "Selfie frontal com rosto bem visível",
      "Uma foto sorrindo e outra com expressão neutra",
      "Óculos de grau, se fizerem parte da sua imagem profissional",
      "Foto de meio corpo ou corpo inteiro, se tiver disponível",
    ],
    avoid: [
      "Boné, chapéu ou gorro cobrindo a cabeça",
      "Óculos escuros ou de sol",
      "Rosto muito escuro ou contra a luz",
      "Foto desfocada ou de muito baixa qualidade",
      "Rosto cortado ou virado de lado",
    ],
  },
  pricing: [
    {
      tag: "Opção 1",
      title: "Por foto",
      subtitle:
        "Para quem quer aprovar a prévia e liberar apenas as imagens que realmente vai usar.",
      priceLabel: "Preço por foto",
      price: "9",
      cents: ",90",
      helper: "Você analisa a prévia completa e paga apenas pelas imagens aprovadas.",
      features: [
        "Prévia completa antes de qualquer cobrança",
        "Escolha individual das fotos aprovadas",
        "Entrega final em alta resolução, sem marca d'água",
        "Liberação após aprovação pelo WhatsApp",
      ],
      cta: {
        label: "Quero escolher as fotos",
        href: whatsappUrl("Quero ver meu ensaio e escolher as fotos"),
        source: "pricing_whatsapp_click",
      },
    },
    {
      tag: "Opção 2",
      title: "Ensaio completo",
      subtitle:
        "Para quem quer sair com um conjunto completo de imagens profissionais para os principais canais.",
      priceLabel: "Preço único",
      price: "89",
      cents: ",90",
      helper: "Você libera o pacote completo de variações aprovadas em um único pagamento.",
      features: [
        "Dezenas de fotos finais em alta resolução",
        "Múltiplas poses, enquadramentos e fundos profissionais",
        "Material pronto para WhatsApp, Instagram, LinkedIn, site e apresentações",
        "Prévia, revisão e liberação final só após aprovação",
      ],
      cta: {
        label: "Quero o ensaio completo",
        href: whatsappUrl("Quero o ensaio completo por R$89,90"),
        source: "pricing_whatsapp_click",
      },
      featured: true,
    },
  ],
  faqs: [
    {
      q: "Realmente parece uma foto de estúdio profissional?",
      a: "Sim. O objetivo não é gerar um efeito chamativo, e sim um retrato profissional convincente, pronto para uso real em canais jurídicos e institucionais.",
    },
    {
      q: "Como vejo o resultado antes de pagar?",
      a: "Enviamos a prévia com marca d'água pelo WhatsApp. Você analisa, pede ajuste se necessário e só aprova o pagamento quando o material estiver no ponto certo.",
    },
    {
      q: "Qual foto eu preciso enviar?",
      a: "Uma selfie boa já resolve. O ideal é ter boa iluminação, nitidez e rosto bem visível. O fundo não importa, porque nós cuidamos da direção visual e do acabamento.",
    },
    {
      q: "Posso pedir ajuste antes de pagar?",
      a: "Sim. Se a prévia não estiver no ponto certo, você pede ajuste antes de aprovar a liberação final. A revisão faz parte do processo.",
    },
    {
      q: "Quanto tempo demora para receber?",
      a: "As prévias chegam em até 24 horas após o envio das fotos. Depois da aprovação e do pagamento, as versões finais em alta resolução são liberadas no mesmo dia.",
    },
    {
      q: "Minhas fotos ficam privadas?",
      a: "Sim. As fotos enviadas não são usadas em portfólio, anúncios, exemplos ou divulgação sem autorização prévia, expressa e específica.",
    },
  ],
};
