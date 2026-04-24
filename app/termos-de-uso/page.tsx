import type { Metadata } from "next";
import { TopBar, SiteFooter } from "@/site/components/shared/SiteShell";

export const metadata: Metadata = {
  title: "Termos de Uso",
  description: "Termos de uso do Nuance Studio.",
};

export default function TermosDeUso() {
  return (
    <div className="legal-page">
      <TopBar />
      <main className="legal-content" id="main">
        <h1 className="serif">Termos de Uso</h1>
        <p>
          Estes Termos de Uso regulam o acesso e a utilização das páginas, do quiz, do
          atendimento e dos serviços oferecidos pela Nuance Studio no contexto de
          diagnóstico e produção de ensaios fotográficos profissionais sem ensaio
          presencial.
        </p>
        <h2>Regra Objetiva Sobre Fotos Dos Clientes</h2>
        <p>
          Fotos enviadas para análise, prévia ou entrega não são usadas em portfólio,
          anúncios, comparativos, redes sociais ou qualquer divulgação pública sem
          autorização prévia, expressa e específica do titular.
        </p>
        <h2>1. Aceitação</h2>
        <p>
          Ao acessar o site, utilizar o quiz, enviar mensagens ou encaminhar fotos para
          atendimento, o usuário declara estar ciente destes Termos de Uso e da Política
          de Privacidade da Nuance Studio.
        </p>
        <h2>2. Objeto Do Serviço</h2>
        <p>
          A Nuance Studio oferece diagnóstico, orientação comercial, criação de
          prévias, ajustes e entrega de imagens profissionais conforme a proposta
          comercial aceita pelo cliente.
        </p>
        <h2>3. Fluxo Comercial E Entrega</h2>
        <ul>
          <li>o cliente envia fotos e informações necessárias para avaliação;</li>
          <li>a Nuance Studio pode produzir prévia para aprovação comercial;</li>
          <li>o pagamento ocorre de acordo com a oferta apresentada e aprovada;</li>
          <li>a liberação final das imagens depende da aprovação e das condições combinadas no atendimento.</li>
        </ul>
        <h2>4. Responsabilidade Do Usuário</h2>
        <p>
          O usuário deve fornecer fotos e informações verdadeiras, possuir legitimidade
          para enviar a própria imagem e não encaminhar conteúdos ilícitos, ofensivos ou
          que violem direitos de terceiros.
        </p>
        <h2>5. Limites Técnicos Do Serviço</h2>
        <p>
          O resultado final depende da qualidade do material enviado, da coerência das
          referências e das limitações técnicas inerentes ao processo digital. Ajustes
          podem ser necessários para chegar ao padrão esperado.
        </p>
        <h2>6. Uso Das Fotos</h2>
        <p>
          As fotos encaminhadas pelo cliente são utilizadas para avaliação, criação de
          prévia, ajustes e entrega do serviço. Não há autorização automática para uso
          publicitário ou portfólio. Qualquer uso público depende de autorização
          separada, específica e expressa.
        </p>
        <h2>7. Propriedade Intelectual</h2>
        <p>
          Os elementos de marca, layout, textos, identidade visual e estrutura comercial
          da Nuance Studio permanecem protegidos. O cliente recebe os arquivos nas
          condições combinadas no atendimento, observados os limites legais e
          contratuais aplicáveis.
        </p>
        <h2>8. Privacidade, Dados Pessoais E LGPD</h2>
        <p>
          O tratamento de dados pessoais e das fotos encaminhadas segue a Política de
          Privacidade da Nuance Studio e a LGPD. O envio de imagem para atendimento não
          autoriza, por si só, publicação, reutilização promocional ou exposição do
          material.
        </p>
        <h2>9. Cancelamento E Atendimento</h2>
        <p>
          As condições comerciais, revisões, ajustes, reprovações e encerramento do
          atendimento seguem a oferta vigente e o que tiver sido combinado de forma
          objetiva no canal oficial de atendimento.
        </p>
        <h2>10. Limitação De Responsabilidade</h2>
        <p>
          A Nuance Studio não responde por danos decorrentes de uso inadequado dos
          arquivos pelo cliente, envio de material sem legitimidade ou indisponibilidades
          temporárias de ferramentas, plataformas e serviços de terceiros.
        </p>
        <h2>11. Atualizações Destes Termos</h2>
        <p>
          Estes Termos de Uso podem ser atualizados para refletir ajustes operacionais,
          legais ou comerciais. A versão vigente será sempre a publicada nesta página.
        </p>
        <p>Última atualização: 22 de abril de 2026.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
