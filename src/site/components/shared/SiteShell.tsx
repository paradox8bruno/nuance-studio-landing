import Link from "next/link";
import { brand, whatsappUrl } from "@/site/config/brand";
import { WhatsAppIcon } from "./Icons";

export function TopBar() {
  return (
    <>
      <a className="skip-link" href="#main">
        Pular para o conteúdo
      </a>
      <div className="progress-bar" id="progressBar" />
      <div className="topbar">
        <span>
          <strong>Prévia antes do pagamento</strong> · fotos privadas · tratamento sob
          diretrizes de LGPD
        </span>
      </div>
      <nav className="site-nav">
        <Link className="logo" href="/">
          NUANCE <span>STUDIO</span>
        </Link>
        <a
          href={whatsappUrl("Olá, quero saber mais sobre o ensaio profissional")}
          className="nav-wa"
          data-wa-source="nav_whatsapp_click"
          target="_blank"
          rel="noopener"
        >
          <WhatsAppIcon size={15} />
          Falar no WhatsApp
        </a>
      </nav>
    </>
  );
}

export function SiteFooter() {
  return (
    <footer>
      <p className="f-logo">NUANCE STUDIO</p>
      <p>Ensaio fotográfico profissional sem ensaio presencial, pensado para advogados.</p>
      <p className="footer-note">
        <strong>Privacidade e LGPD:</strong> as fotos enviadas pelos clientes não são
        usadas em portfólio, anúncios, exemplos ou qualquer divulgação sem autorização
        prévia, expressa e específica.
      </p>
      <div className="footer-links">
        <a
          href={whatsappUrl("Olá, quero fazer meu ensaio profissional")}
          data-wa-source="footer_whatsapp_click"
          target="_blank"
          rel="noopener"
        >
          Falar no WhatsApp
        </a>
        <span>·</span>
        <Link href="/politica-de-privacidade">Política de Privacidade</Link>
        <span>·</span>
        <Link href="/termos-de-uso">Termos de Uso</Link>
      </div>
      <p>© {new Date().getFullYear()} {brand.name}. Todos os direitos reservados.</p>
    </footer>
  );
}

export function FloatingWhatsApp() {
  return (
    <a
      href={whatsappUrl("Olá, quero fazer meu ensaio profissional")}
      className="float-wa"
      data-wa-source="float_whatsapp_click"
      target="_blank"
      rel="noopener"
      aria-label="Falar no WhatsApp"
      title="Falar no WhatsApp"
    >
      <WhatsAppIcon size={28} />
    </a>
  );
}
