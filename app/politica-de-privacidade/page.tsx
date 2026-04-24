import type { Metadata } from "next";
import { TopBar, SiteFooter } from "@/site/components/shared/SiteShell";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: "Política de privacidade do Nuance Studio.",
};

export default function PoliticaDePrivacidade() {
  return (
    <div className="legal-page">
      <TopBar />
      <main className="legal-content" id="main">
        <h1 className="serif">Política de Privacidade</h1>
        <p>
          Esta Política de Privacidade explica como a Nuance Studio trata dados
          pessoais no contexto do diagnóstico de imagem, atendimento comercial e
          entrega de ensaios fotográficos profissionais sem ensaio presencial.
        </p>
        <h2>Compromisso Expresso Com As Fotos Enviadas</h2>
        <p>
          As fotos encaminhadas pelos clientes não são usadas em portfólio, anúncios,
          redes sociais, exemplos, estudos de caso ou qualquer outro material de
          divulgação sem autorização prévia, expressa e específica do titular. Esse
          compromisso vale também para comparativos antes e depois.
        </p>
        <h2>1. Quem Controla Os Dados</h2>
        <p>
          A Nuance Studio atua como controladora dos dados pessoais tratados no
          contexto do serviço, nos termos da Lei Geral de Proteção de Dados Pessoais,
          Lei nº 13.709/2018.
        </p>
        <h2>Dados Tratados</h2>
        <p>
          Podemos tratar dados fornecidos diretamente pelo titular, incluindo nome,
          telefone, mensagens trocadas no atendimento, informações sobre preferências
          de uso da imagem e as fotos enviadas para análise, criação de prévia,
          ajustes e entrega final.
        </p>
        <h2>3. Finalidades Do Tratamento</h2>
        <ul>
          <li>avaliar a viabilidade do serviço e orientar o cliente no atendimento comercial;</li>
          <li>produzir prévias, ajustes e arquivos finais contratados;</li>
          <li>manter comunicação operacional, de suporte e de acompanhamento do pedido;</li>
          <li>cumprir obrigações legais, regulatórias e exercer direitos;</li>
          <li>medir acesso ao site e desempenho das páginas por ferramentas de analytics.</li>
        </ul>
        <h2>4. Bases Legais</h2>
        <p>
          O tratamento pode ocorrer, conforme o caso, com fundamento em procedimentos
          preliminares relacionados a contrato, execução contratual, cumprimento de
          obrigação legal, exercício regular de direitos e, quando necessário para uso
          público de imagem, mediante consentimento específico.
        </p>
        <h2>5. Uso Das Fotos E Da Imagem</h2>
        <p>
          As fotos enviadas são tratadas exclusivamente para avaliação, criação de
          prévia, ajustes e entrega do serviço. Não publicamos, vendemos, licenciamos,
          compartilhamos para marketing nem reutilizamos essas imagens para fins
          promocionais sem autorização expressa e destacada do titular.
        </p>
        <h2>6. Compartilhamento De Dados</h2>
        <p>
          Os dados podem ser compartilhados apenas com fornecedores estritamente
          necessários para hospedagem, analytics, operação técnica e processamento do
          serviço, sempre na medida adequada para a execução da atividade. Não
          compartilhamos fotos para divulgação comercial sem autorização do titular.
        </p>
        <h2>7. Retenção E Descarte</h2>
        <p>
          Os dados são mantidos pelo tempo necessário para atendimento, execução do
          serviço, eventual suporte posterior e cumprimento de obrigações legais.
          Quando não houver mais necessidade legítima ou obrigação de guarda, os dados
          são eliminados ou anonimizados, observadas as limitações técnicas e jurídicas
          aplicáveis.
        </p>
        <h2>8. Direitos Do Titular Na LGPD</h2>
        <p>
          Nos termos da LGPD, o titular pode solicitar confirmação do tratamento,
          acesso, correção, anonimização, bloqueio, eliminação quando cabível,
          informação sobre compartilhamento, portabilidade quando aplicável e revisão
          de pedidos relacionados a dados pessoais.
        </p>
        <h2>9. Segurança</h2>
        <p>
          Adotamos medidas técnicas e organizacionais razoáveis para reduzir risco de
          acesso não autorizado, vazamento, perda ou uso indevido. Ainda assim, nenhum
          ambiente digital é absolutamente invulnerável.
        </p>
        <h2>10. Analytics E Cookies</h2>
        <p>
          O site pode utilizar ferramentas de analytics para medir acessos, páginas
          visitadas e interações gerais. Esses recursos ajudam a melhorar a experiência
          e o desempenho comercial das páginas.
        </p>
        <h2>11. Contato E Solicitações</h2>
        <p>
          Para dúvidas sobre privacidade, exercício de direitos previstos na LGPD ou
          solicitações relacionadas a fotos e dados pessoais, o titular pode entrar em
          contato pelos canais oficiais da Nuance Studio, inclusive pelo WhatsApp
          exibido nas páginas do projeto.
        </p>
        <p>Última atualização: 22 de abril de 2026.</p>
      </main>
      <SiteFooter />
    </div>
  );
}
