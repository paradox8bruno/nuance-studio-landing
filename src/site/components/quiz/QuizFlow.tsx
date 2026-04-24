"use client";

import { useMemo, useState } from "react";
import { brand } from "@/site/config/brand";

type Answers = {
  state: string;
  channels: string[];
  pain: string;
  blocker: string;
  fit: string;
  offer: string;
};

type Option = {
  value: string;
  label: string;
  desc?: string;
  tag?: string;
};

const initialAnswers: Answers = {
  state: "",
  channels: [],
  pain: "",
  blocker: "",
  fit: "",
  offer: "",
};

const labels: Record<string, string> = {
  improve: "Já ajuda, mas não acompanha meu nível atual",
  neutral: "Neutra. Não ajuda, mas também não atrapalha",
  amateur: "Passa improviso ou amadorismo",
  avoid: "Evito usar porque não me representa",
  linkedin: "redes sociais profissionais",
  site: "site ou página",
  whatsapp: "WhatsApp Business",
  instagram: "Instagram profissional",
  materials: "bio, propostas ou apresentações",
  casual: "Parece casual demais para meu nível",
  authority: "Ela não passa autoridade",
  best: "Não me mostra na minha melhor versão profissional",
  everything: "A mesma foto em tudo e ela já não sustenta meu posicionamento",
  time: "falta de tempo para ensaio presencial",
  cost: "custo alto de fotógrafo e produção",
  fake: "receio de ficar artificial ou com cara de IA",
  photogenic: "desconforto em frente à câmera",
  ready: "Quero ver minha prévia agora",
  natural: "Consideraria, se parecer realmente natural",
  proof: "Preciso ver mais exemplos antes de decidir",
  single: "Focar em 1 ou 2 necessidades urgentes",
  complete: "Ver variedade de estilos para múltiplos canais",
  examples: "Ainda não sei, quero conversar primeiro",
};

const steps: Array<{
  key: keyof Answers;
  eyebrow: string;
  title: string;
  copy: string;
  multiple?: boolean;
  options: Option[];
}> = [
  {
    key: "state",
    eyebrow: "Pergunta 1 de 6",
    title: "Quando alguém vê sua foto hoje, qual leitura vem primeiro?",
    copy:
      "Não pense no que você gostaria de transmitir. Pense no que ela comunica em segundos para alguém que ainda não te conhece.",
    options: [
      { value: "improve", label: labels.improve },
      { value: "neutral", label: labels.neutral },
      { value: "amateur", label: labels.amateur },
      { value: "avoid", label: labels.avoid },
    ],
  },
  {
    key: "channels",
    eyebrow: "Pergunta 2 de 6",
    title: "Em quais canais sua imagem precisa trabalhar por você?",
    copy:
      "Selecione todos os lugares onde sua foto influencia confiança, percepção ou decisão de contato.",
    multiple: true,
    options: [
      {
        value: "linkedin",
        label: "Redes sociais profissionais",
        desc: "Imagem que sustenta presença quando pesquisam seu nome ou perfil.",
      },
      {
        value: "site",
        label: "Site ou página",
        desc: "Credibilidade institucional e presença profissional.",
      },
      {
        value: "whatsapp",
        label: "WhatsApp Business",
        desc: "A conversa começa com sua foto ao lado do nome.",
      },
      {
        value: "instagram",
        label: "Instagram profissional",
        desc: "Imagem atual, coerente com o posicionamento.",
      },
      {
        value: "materials",
        label: "Bio, propostas ou apresentações",
        desc: "Material institucional, palestra, proposta comercial.",
      },
    ],
  },
  {
    key: "pain",
    eyebrow: "Pergunta 3 de 6",
    title: "O que mais te incomoda quando você pensa nisso?",
    copy:
      "Existe um ponto central que concentra a dor. Qual desses ressoa mais com o que você sente hoje?",
    options: [
      {
        value: "casual",
        label: "Parece casual demais para o meu nível",
        desc: "Não conversa com a seriedade do meu trabalho. Parece tirada sem intenção.",
        tag: "a imagem diminui a percepção",
      },
      {
        value: "authority",
        label: "Ela não passa autoridade",
        desc: "Quem vê a foto não sente o mesmo peso que sente ao me conhecer pessoalmente.",
        tag: "imagem abaixo da competência",
      },
      {
        value: "best",
        label: "Não me mostra na minha melhor versão",
        desc: "A imagem não me representa com presença, enquadramento e acabamento à altura do que entrego.",
        tag: "problema de representação",
      },
      {
        value: "everything",
        label: "Uso a mesma foto em tudo - e ela ficou para trás",
        desc: "Virou a imagem oficial, mas hoje está abaixo do padrão que preciso sustentar.",
        tag: "o custo da repetição aumentou",
      },
    ],
  },
  {
    key: "blocker",
    eyebrow: "Pergunta 4 de 6",
    title: "O que mais tem te impedido de resolver isso agora?",
    copy:
      "Quase sempre o atraso não é falta de prioridade - é falta de um caminho claro para decidir com segurança.",
    options: [
      {
        value: "time",
        label: "Falta de tempo para ensaio presencial",
        desc: "Agendar, deslocar, separar roupa e parar a rotina parece fricção demais para agora.",
        tag: "objeção de praticidade",
      },
      {
        value: "cost",
        label: "Custo alto de fotógrafo e produção",
        desc: "O investimento parece pesado demais comparado ao que quero resolver neste momento.",
        tag: "objeção de investimento",
      },
      {
        value: "fake",
        label: "Receio de ficar artificial ou com cara de IA",
        desc: "Não quero uma imagem com filtro, montagem ou um rosto que não parece o meu.",
        tag: "objeção de fidelidade",
      },
      {
        value: "photogenic",
        label: "Não me sinto fotogênico ou confortável na câmera",
        desc: "Posar e sair bem em foto sempre foi um ponto de desconforto pessoal.",
        tag: "objeção de exposição",
      },
    ],
  },
  {
    key: "fit",
    eyebrow: "Pergunta 5 de 6",
    title: "Se você pudesse ver o resultado antes de pagar - e só decidir depois - você...",
    copy: "Não é sobre comprar agora. É sobre entender se o formato certo já reduz a sua resistência.",
    options: [
      {
        value: "ready",
        label: "Quero ver minha prévia agora",
        desc: "Se eu puder ver antes de pagar, isso já faz sentido para mim.",
        tag: "prontidão alta",
      },
      {
        value: "natural",
        label: "Consideraria, se parecer realmente natural",
        desc: "Meu critério principal é fidelidade. Se for crível e profissional, eu sigo.",
        tag: "foco em naturalidade",
      },
      {
        value: "proof",
        label: "Preciso ver mais exemplos antes de decidir",
        desc: "Ainda estou reduzindo resistência e quero mais prova antes de agir.",
        tag: "falta prova antes da ação",
      },
    ],
  },
  {
    key: "offer",
    eyebrow: "Última pergunta · 6 de 6",
    title: "Como você prefere receber e avaliar sua prévia gratuita?",
    copy: "Lembrando: você só decide se vai liberar as imagens depois de ver o resultado.",
    options: [
      {
        value: "single",
        label: "Focar em 1 ou 2 necessidades urgentes",
        desc: "Quero ver a prévia direcionada para resolver um canal específico agora.",
        tag: "entrada mais direta",
      },
      {
        value: "complete",
        label: "Ver variedade de estilos para múltiplos canais",
        desc: "Quero receber uma visão de ensaio completo para padronizar toda a minha presença online.",
        tag: "foco em padronização",
      },
      {
        value: "examples",
        label: "Ainda não sei, quero conversar primeiro",
        desc: "Gostaria de ver exemplos da minha área ou tirar dúvidas antes de enviar a foto.",
        tag: "decisão guiada",
      },
    ],
  },
];

function listChannels(answers: Answers) {
  if (!answers.channels.length) return "múltiplos pontos de contato profissional";
  const items = answers.channels.map((value) => labels[value]);
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} e ${items[1]}`;
  return `${items.slice(0, -1).join(", ")} e ${items[items.length - 1]}`;
}

function getScore(answers: Answers) {
  let score = 50;
  if (answers.state === "amateur" || answers.state === "avoid") score += 14;
  else if (answers.state === "neutral") score += 9;
  else score += 7;
  score += Math.min(answers.channels.length * 4, 16);
  if (answers.fit === "ready") score += 14;
  else if (answers.fit === "natural") score += 9;
  else score += 4;
  if (answers.offer === "complete") score += 10;
  else if (answers.offer === "single") score += 7;
  else score += 3;
  return Math.max(60, Math.min(96, score));
}

function buildWhatsappUrl(answers: Answers) {
  const stateMap: Record<string, string> = {
    improve: "Minha imagem já ajuda, mas ainda deixa autoridade na mesa.",
    neutral: "Minha foto atual não está trabalhando a meu favor como poderia.",
    amateur: "Minha imagem hoje está abaixo do nível que o meu trabalho sustenta.",
    avoid: "Evito usar minha foto porque ela não me representa.",
  };
  const msg = [
    "Olá, acabei de finalizar o *Diagnóstico de Imagem* da Nuance Studio.",
    "",
    `_${stateMap[answers.state] || ""}_`,
    "",
    `*Onde pesa mais:* ${listChannels(answers)}`,
    `*Dor principal:* ${labels[answers.pain] || "—"}`,
    `*Principal bloqueio:* ${labels[answers.blocker] || "—"}`,
    `*Nível de Prontidão:* ${getScore(answers)}/100`,
    `*Formato preferido:* ${labels[answers.offer] || "—"}`,
    "",
    "Quero liberar minha prévia gratuita.",
  ].join("\n");
  return `https://wa.me/${brand.whatsappNumber}?text=${encodeURIComponent(msg)}`;
}

export function QuizFlow() {
  const [panel, setPanel] = useState<"intro" | "proof" | "how" | "result" | number>("intro");
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const stepIndex = typeof panel === "number" ? panel : panel === "proof" ? 3 : panel === "how" ? 5 : panel === "result" ? 6 : -1;
  const progress = panel === "intro" ? 0 : panel === "result" ? 100 : Math.round(((stepIndex + 1) / 8) * 100);
  const score = getScore(answers);
  const whatsappHref = useMemo(() => buildWhatsappUrl(answers), [answers]);

  function next() {
    if (typeof panel === "number") {
      if (panel === 2) setPanel("proof");
      else if (panel === 4) setPanel("how");
      else if (panel === 5) setPanel("result");
      else setPanel(panel + 1);
    } else if (panel === "intro") setPanel(0);
    else if (panel === "proof") setPanel(3);
    else if (panel === "how") setPanel(5);
  }

  function back() {
    if (typeof panel === "number") {
      if (panel === 0) setPanel("intro");
      else setPanel(panel - 1);
    } else if (panel === "proof") setPanel(2);
    else if (panel === "how") setPanel(4);
    else if (panel === "result") setPanel(5);
  }

  function select(step: (typeof steps)[number], value: string) {
    setAnswers((prev) => {
      if (step.multiple) {
        const current = prev.channels;
        return {
          ...prev,
          channels: current.includes(value)
            ? current.filter((item) => item !== value)
            : [...current, value],
        };
      }
      return { ...prev, [step.key]: value };
    });
    if (!step.multiple) window.setTimeout(next, 120);
  }

  function canContinue(step: (typeof steps)[number]) {
    if (step.multiple) return answers.channels.length > 0;
    return Boolean(answers[step.key]);
  }

  const scoreHeadline =
    score >= 82 ? "Nível de prontidão alto." : score >= 70 ? "Nível de prontidão bom." : "Consciência em aquecimento.";
  const scoreSub =
    score >= 82
      ? "Você já entendeu a dor, viu o mecanismo e está perto da decisão. O próximo passo natural é ver sua prévia."
      : score >= 70
        ? "Você enxerga a necessidade, mas ainda quer diminuir risco e ganhar mais prova antes de fechar."
        : "Você percebe o problema, mas ainda precisa de mais segurança para avançar sem hesitação.";

  return (
    <div className="quiz-page">
      <div className="quiz-progress" aria-hidden="true">
        <span style={{ width: `${progress}%` }} />
      </div>
      <header className="quiz-header">
        <a className="logo" href="/">NUANCE <span>STUDIO</span></a>
        <span className="quiz-kicker">{panel === "intro" ? "0 / 8" : panel === "result" ? "8 / 8" : `${progress ? Math.ceil((progress / 100) * 8) : 0} / 8`}</span>
      </header>
      <main className="quiz-main" id="main">
        {panel === "intro" && (
          <section className="quiz-panel">
            <span className="quiz-kicker">Diagnóstico de imagem profissional</span>
            <h1 className="quiz-title quiz-serif">
              Sua foto está <span className="gold-text">sabotando</span> oportunidades que você nem vê.
            </h1>
            <p className="quiz-copy">
              Em 2 minutos, descubra o que sua imagem comunica antes mesmo de você abrir
              a boca - e qual é o próximo passo mais inteligente para corrigir isso sem
              ensaio presencial.
            </p>
            <div className="results-meta" style={{ justifyContent: "flex-start" }}>
              <span>2 minutos</span><span>8 etapas</span><span>Resultado personalizado</span><span>Sem formulário longo</span>
            </div>
            <div className="quiz-nav-row">
              <button className="quiz-cta" type="button" onClick={next}>Iniciar Diagnóstico Gratuito →</button>
            </div>
            <p className="quiz-copy" style={{ textAlign: "center", fontSize: 13 }}>
              O resultado final abre o WhatsApp já com o resumo das suas respostas.
            </p>
          </section>
        )}

        {typeof panel === "number" && (() => {
          const step = steps[panel];
          return (
            <section className="quiz-panel">
              <span className="quiz-kicker">{step.eyebrow}</span>
              <h1 className="quiz-title quiz-serif">{step.title}</h1>
              <p className="quiz-copy">{step.copy}</p>
              <div className="quiz-options">
                {step.options.map((option) => {
                  const raw = answers[step.key];
                  const selected = Array.isArray(raw) ? raw.includes(option.value) : raw === option.value;
                  return (
                    <button
                      className={`quiz-option ${selected ? "selected" : ""}`}
                      type="button"
                      key={option.value}
                      onClick={() => select(step, option.value)}
                    >
                      <strong>{option.label}</strong>
                      {option.desc ? <span style={{ display: "block", color: "var(--text-dim)" }}>{option.desc}</span> : null}
                      {option.tag ? <span style={{ display: "inline-block", marginTop: 8, color: "var(--gold-2)", fontSize: 11, textTransform: "uppercase", letterSpacing: 1.2 }}>{option.tag}</span> : null}
                    </button>
                  );
                })}
              </div>
              {step.key === "channels" && answers.channels.length > 1 ? (
                <div className="guide-note">
                  <span className="ni">Atenção</span>
                  <span>
                    Quanto mais pontos de contato sua imagem ocupa, maior o custo
                    invisível de manter uma foto fraca como imagem oficial.
                  </span>
                </div>
              ) : null}
              <div className="quiz-nav-row">
                <button className="quiz-secondary" type="button" onClick={back}>← Voltar</button>
                {step.multiple ? (
                  <button className="quiz-cta" type="button" disabled={!canContinue(step)} onClick={next}>Continuar →</button>
                ) : null}
              </div>
            </section>
          );
        })()}

        {panel === "proof" && (
          <section className="quiz-panel">
            <span className="quiz-kicker">Virada de consciência</span>
            <h1 className="quiz-title quiz-serif">
              O problema não é ter uma foto. É ter uma foto que não sustenta o seu nível.
            </h1>
            <div className="ba-pair">
              <div className="ba-frame"><img src="/fotos/antes-3.jpg" alt="Foto antes do Nuance Studio" /><span className="ba-pill before">Antes</span></div>
              <div className="ba-arrow-col"><div className="ba-arrow-icon">→</div></div>
              <div className="ba-frame after-frame"><img src="/fotos/depois-3.jpg" alt="Resultado criado pelo Nuance Studio" /><span className="ba-pill after">Depois</span></div>
            </div>
            <p className="quiz-copy">
              O rosto é o mesmo. A leitura muda completamente. O objetivo não é parecer
              mais bonito. É parecer mais confiável, mais bem posicionado e mais pronto
              para ser escolhido.
            </p>
            <div className="quiz-nav-row">
              <button className="quiz-secondary" type="button" onClick={back}>← Voltar</button>
              <button className="quiz-cta" type="button" onClick={next}>Faz sentido, continuar →</button>
            </div>
          </section>
        )}

        {panel === "how" && (
          <section className="quiz-panel">
            <span className="quiz-kicker">Como funciona</span>
            <h1 className="quiz-title quiz-serif">Feito para facilitar a decisão, não para travar sua rotina.</h1>
            <p className="quiz-copy">
              Tudo acontece pelo WhatsApp. Você envia fotos comuns, recebe uma prévia
              real e só decide depois se faz sentido seguir.
            </p>
            <div className="cf-timeline">
              {[
                ["1", "Você envia 1 ou 2 fotos que já te representem bem", "Uma selfie com boa luz já basta. Sem produção complexa."],
                ["2", "Recebe a prévia em até 24 horas", "Mostramos uma amostra real no WhatsApp antes de qualquer cobrança."],
                ["3", "Você aprova, pede ajuste ou encerra", "Se não fizer sentido, você simplesmente não segue e não paga nada."],
                ["4", "Libera as fotos no formato que fizer mais sentido", "Por foto avulsa ou ensaio completo, pronto para seus canais."],
              ].map(([num, title, text]) => (
                <div className="cf-step" key={num}>
                  <span className="cf-num-n">{num}</span>
                  <div><span className="cf-title">{title}</span><span className="cf-sub">{text}</span></div>
                </div>
              ))}
            </div>
            <div className="quiz-nav-row">
              <button className="quiz-secondary" type="button" onClick={back}>← Voltar</button>
              <button className="quiz-cta" type="button" onClick={next}>Entendi, continuar →</button>
            </div>
          </section>
        )}

        {panel === "result" && (
          <section className="quiz-panel">
            <span className="quiz-kicker">Seu diagnóstico está pronto</span>
            <h1 className="quiz-title quiz-serif">{scoreHeadline}</h1>
            <p className="quiz-copy">{scoreSub}</p>
            <div className="score-ring" style={{ "--pct": score } as React.CSSProperties}>
              <div className="score-ring-inner"><span className="score-value">{score}</span><span className="score-label">prontidão</span></div>
            </div>
            <div className="quiz-summary">
              <div>Sua imagem pesa principalmente em {listChannels(answers)}.</div>
              <div>Principal bloqueio identificado: {labels[answers.blocker] || "risco e praticidade"}.</div>
              <div>Recomendação: {answers.offer === "complete" ? "visão completa para padronizar sua presença online" : answers.offer === "single" ? "focar nos canais mais críticos primeiro" : "conversa guiada com mais exemplos antes da decisão"}.</div>
              <div>Próximo passo: abrir o WhatsApp com este resumo e liberar sua prévia gratuita.</div>
            </div>
            <a className="quiz-cta" href={whatsappHref} data-wa-source="quiz-result" target="_blank" rel="noopener">
              Liberar minha prévia no WhatsApp →
            </a>
            <p className="quiz-copy" style={{ textAlign: "center", fontSize: 12, color: "var(--gold-2)" }}>
              Risco zero: só pague se aprovar.
            </p>
            <div className="quiz-nav-row">
              <button className="quiz-secondary" type="button" onClick={() => { setAnswers(initialAnswers); setPanel("intro"); }}>Refazer o quiz</button>
            </div>
          </section>
        )}
      </main>
    </div>
  );
}
