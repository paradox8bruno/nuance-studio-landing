import type { LandingData } from "@/site/data/landing-lawyers";
import { FloatingWhatsApp, SiteFooter, TopBar } from "@/site/components/shared/SiteShell";
import { WhatsAppIcon } from "@/site/components/shared/Icons";

function SectionHead({
  label,
  title,
  children,
}: {
  label: string;
  title: React.ReactNode;
  children?: React.ReactNode;
}) {
  return (
    <div className="sec-head reveal">
      <div className="gold-line" />
      <span className="label">{label}</span>
      <h2 className="serif">{title}</h2>
      {children ? <p>{children}</p> : null}
    </div>
  );
}

export function LandingPage({ data }: { data: LandingData }) {
  return (
    <>
      <TopBar />
      <main id="main">
        <section className="landing-hero">
          <div className="hero-text">
            <span className="label">{data.hero.eyebrow}</span>
            <h1 className="hero-h1 serif">
              {data.hero.titlePrefix}{" "}
              <span className="gold-text">{data.hero.titleHighlight}</span>{" "}
              {data.hero.titleSuffix}
            </h1>
            <p className="hero-sub">{data.hero.subtitle}</p>
            <div className="cta-stack">
              <a
                href={data.hero.cta.href}
                className="btn-wa"
                data-wa-source={data.hero.cta.source}
                target="_blank"
                rel="noopener"
              >
                <WhatsAppIcon />
                {data.hero.cta.label}
              </a>
              <div className="cta-micro">
                <span>Prévia antes do pagamento</span>
                <span>Entrega em até 24h</span>
                <span>Fotos privadas e protegidas</span>
              </div>
            </div>
            <div className="hero-stats">
              {data.hero.stats.map((stat) => (
                <div className="hero-stat" key={stat.value}>
                  <p className="hero-stat-num">{stat.value}</p>
                  <p className="hero-stat-label">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="hero-photo">
            <img
              src={data.hero.image}
              alt="Retrato profissional criado pelo Nuance Studio"
              width="896"
              height="1200"
              fetchPriority="high"
            />
            <div className="hero-badge">
              <div className="hb-dot" />
              <div className="hb-label">
                <strong>Resultado real</strong>
                Ensaio Nuance Studio
              </div>
            </div>
          </div>
        </section>

        <div className="proof-strip">
          {data.proofStrip.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>

        <section className="ba-section">
          <div className="container">
            <SectionHead label="Resultados reais" title={<>Mesma pessoa.<br />Outra leitura profissional.</>}>
              O que muda não é a sua identidade. O que muda é a forma como sua imagem
              sustenta confiança, preparo e presença profissional.
            </SectionHead>

            {data.beforeAfter.map((item, index) => (
              <div key={item.before}>
                <div className="ba-pair reveal">
                  <div className="ba-item">
                    <div className="ba-frame">
                      <img src={item.before} alt={`Foto original ${index + 1}`} width="896" height="1200" />
                      <span className="ba-pill before">Antes</span>
                    </div>
                  </div>
                  <div className="ba-arrow-col">
                    <div className="ba-arrow-icon">→</div>
                  </div>
                  <div className="ba-item">
                    <div className="ba-frame after-frame">
                      <img src={item.after} alt={`Resultado profissional ${index + 1}`} width="896" height="1200" />
                      <span className="ba-pill after">Depois</span>
                    </div>
                  </div>
                </div>
                <div className="ba-desc reveal">
                  <p className="name">{item.name}</p>
                  <p className="usage">{item.usage}</p>
                </div>
              </div>
            ))}

            <SectionHead
              label="Variações do ensaio"
              title={<>Um ensaio. Várias leituras profissionais.</>}
            >
              Você não recebe uma imagem isolada. Recebe um conjunto de variações
              pensadas para contextos jurídicos reais.
            </SectionHead>
            <div className="gallery-strip reveal">
              {data.gallery.map((src, index) => (
                <div className="gallery-frame" key={src}>
                  <img src={src} alt={`Variação ensaio ${index + 1}`} width="896" height="1200" loading="lazy" />
                </div>
              ))}
            </div>
            <div className="results-note reveal">
              <p className="results-quote">
                “Pareço eu, só que com a presença profissional que o meu escritório já
                transmite.”
              </p>
              <div className="results-meta">
                <span>Advocacia cível</span>
                <span>Uso em WhatsApp e site</span>
                <span>Percepção mais séria e atual</span>
              </div>
            </div>
          </div>
        </section>

        <section className="section pain-section">
          <div className="container">
            <SectionHead
              label="O problema"
              title={<>Quando a foto parece improvisada,<br />a autoridade perde força.</>}
            >
              Antes de ouvir sua argumentação, o cliente já leu sua apresentação. Em
              advocacia, imagem desalinhada transmite descuido, não competência.
            </SectionHead>
            <div className="pain-list">
              {data.pains.map((pain, index) => (
                <div className="pain-item reveal" key={pain}>
                  <span className="pain-ic">{String(index + 1).padStart(2, "0")}</span>
                  <p>{pain}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="section steps-section">
          <div className="container">
            <SectionHead label="Como funciona" title={<>Direto ao ponto.<br />Do envio à liberação final.</>}>
              Você resolve sua presença profissional sem marcar ensaio, sem deslocamento
              e sem assumir risco antes de ver o resultado.
            </SectionHead>
            <div className="cf-timeline reveal">
              {data.steps.map((step, index) => (
                <div className={`cf-step ${index === data.steps.length - 1 ? "accent" : ""}`} key={step.title}>
                  <div className="cf-num">
                    <span className="cf-num-n">{String(index + 1).padStart(2, "0")}</span>
                  </div>
                  <div className="cf-body">
                    <span className="cf-title">{step.title}</span>
                    <span className="cf-sub">{step.text}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className="cf-guarantee reveal">
              <span className="cf-guarantee-icon">04</span>
              <div className="cf-guarantee-text">
                <strong>Se não aprovar, não paga.</strong>
                <p>
                  Você vê a prévia antes de qualquer cobrança. Se o resultado não fizer
                  sentido para sua imagem profissional, o processo encerra ali.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section guide-section">
          <div className="container">
            <SectionHead label="Como enviar" title={<>O que funciona melhor<br />para começar.</>}>
              Você não precisa produzir uma foto perfeita. Precisa apenas enviar uma
              base suficientemente boa para preservar sua identidade e acelerar a
              aprovação.
            </SectionHead>
            <div className="guide-wrap reveal">
              <div className="guide-card ok">
                <p className="gl">Funciona melhor com</p>
                <ul>
                  {data.guide.ok.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div className="guide-card no">
                <p className="gl">Evite enviar</p>
                <ul>
                  {data.guide.avoid.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
            </div>
            <div className="guide-note reveal">
              <span className="ni">LGPD</span>
              <span>
                <strong style={{ color: "var(--gold-2)" }}>Privacidade:</strong> as
                fotos enviadas para criar sua prévia não entram em portfólio, anúncios
                ou divulgação sem autorização prévia, expressa e específica.
              </span>
            </div>
          </div>
        </section>

        <section className="section price-section">
          <div className="container">
            <SectionHead label="Investimento" title={<>Uma oferta simples,<br />sem cobrança no escuro.</>}>
              Você vê a prévia primeiro, entende o que vai receber e escolhe a forma de
              liberação que mais faz sentido para sua presença profissional.
            </SectionHead>
            <div className="pricing-grid reveal">
              {data.pricing.map((plan) => (
                <div className={`price-card ${plan.featured ? "featured" : "secondary"}`} key={plan.title}>
                  {plan.featured ? <div className="price-badge">Mais escolhido</div> : null}
                  <div className="price-head">
                    <p className="price-kicker">{plan.tag}</p>
                    <h3 className="price-title">{plan.title}</h3>
                    <p className="price-subtitle">{plan.subtitle}</p>
                  </div>
                  <div className="price-body">
                    <div>
                      <p className="price-meta-label">{plan.priceLabel}</p>
                      <p className="price-value">
                        <sup>R$</sup>
                        {plan.price}
                        <small>{plan.cents}</small>
                      </p>
                      <p className="price-helper">{plan.helper}</p>
                    </div>
                    <ul className="price-list">
                      {plan.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                    <a
                      href={plan.cta.href}
                      data-wa-source={plan.cta.source}
                      target="_blank"
                      rel="noopener"
                      className={plan.featured ? "btn-wa" : "btn-outline"}
                    >
                      {plan.featured ? <WhatsAppIcon size={18} /> : null}
                      {plan.cta.label}
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <p className="reveal price-footnote">
              <strong>Leitura prática:</strong> se você precisa atualizar WhatsApp, site,
              Instagram e perfil profissional de uma vez, o ensaio completo costuma ser
              a escolha mais eficiente.
            </p>
            <div className="guarantee-box reveal">
              <div className="gb-icon">LGPD</div>
              <div className="gb-body">
                <h4>Aprovação antes da cobrança</h4>
                <p>
                  Você recebe a prévia com marca d'água, avalia com calma, pode pedir
                  ajuste e só então decide pela liberação final. Se não aprovar, não
                  paga.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="section faq-section">
          <div className="container">
            <SectionHead label="Dúvidas" title="Perguntas frequentes." />
            <div className="faq-list">
              {data.faqs.map((faq) => (
                <details className="reveal" key={faq.q}>
                  <summary>{faq.q}</summary>
                  <div className="fb">{faq.a}</div>
                </details>
              ))}
            </div>
          </div>
        </section>

        <section className="final-section">
          <div className="final-bg" />
          <div className="final-content">
            <div className="gold-line reveal" />
            <span className="label reveal">Nuance Studio</span>
            <h2 className="serif reveal">
              Sua imagem precisa estar no nível{" "}
              <span className="gold-text">da advocacia que você representa.</span>
            </h2>
            <p className="reveal">
              Se faz sentido para você resolver isso com rapidez, discrição e clareza,
              envie sua foto no WhatsApp e veja a prévia antes de pagar.
            </p>
            <div className="cta-stack reveal">
              <a
                href={data.hero.cta.href}
                className="btn-wa"
                data-wa-source="final_whatsapp_click"
                target="_blank"
                rel="noopener"
              >
                <WhatsAppIcon size={22} />
                Quero receber minha prévia
              </a>
              <div className="cta-micro">
                <span>Para advogados</span>
                <span>Prévia antes do pagamento</span>
                <span>Fotos privadas e protegidas</span>
              </div>
            </div>
          </div>
        </section>
      </main>
      <SiteFooter />
      <FloatingWhatsApp />
    </>
  );
}
