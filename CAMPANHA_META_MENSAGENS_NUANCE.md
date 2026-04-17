# Campanha Meta de Mensagens para WhatsApp

## Objetivo deste arquivo

Este documento traduz a logica oficial de campanhas "click to message" da Meta para uma estrutura pratica e operacional do Nuance Studio.

Referencia-base:

- Meta for Business - Click to message ads
- Artigo de ajuda da Meta referenciado pelo usuario: `facebook.com/business/help/1816962591668838`

Assuncao operacional:

- o destino principal da campanha sera o WhatsApp
- o funil comercial acontece na conversa
- a compra final nao acontece em checkout direto no site
- por isso a campanha sera estruturada para gerar conversas qualificadas, e nao compras diretas no inicio

---

## 1. Tipo de campanha recomendado

### Campanha principal

Objetivo:

- `Engagement`

Subtipo / foco:

- `Messages`

Destino da conversa:

- `WhatsApp`

Por que essa configuracao faz sentido:

- a Meta consegue otimizar com clareza para iniciar conversa
- o seu funil real acontece dentro do WhatsApp
- se a venda ainda nao esta sendo devolvida para a Meta como evento final, otimizar para compra cedo demais tende a enfraquecer entrega

Meta logica:

- o algoritmo vai buscar pessoas com maior probabilidade de iniciar conversa
- depois sua operacao comercial precisa filtrar, converter e devolver sinal de venda quando isso estiver estruturado

---

## 2. Estrutura recomendada da conta

## Fase 1: estrutura inicial enxuta

### Campanha 1

Nome sugerido:

`META_MSGS_WA_PROSPECCAO_NUANCE_2026`

Objetivo:

- Engagement

Resultado desejado:

- Messages / Conversations

Destino:

- WhatsApp

Orcamento:

- iniciar com ABO, ou seja, budget no ad set

Por que:

- voce ainda esta em fase de validacao
- precisa controlar o teste por conjunto
- evita que a Meta concentre tudo cedo demais em apenas uma linha

### Ad sets iniciais

#### Ad set 1

Nome sugerido:

`AS_BROAD_GERAL`

Uso:

- publico aberto
- sem excesso de interesses
- foco em criativos fortes

Por que:

- em 2026, broad com criativo bom e sinal bom costuma ser melhor ponto de partida do que hiperfragmentacao

#### Ad set 2

Nome sugerido:

`AS_REMARKETING_30D`

Uso:

- pessoas que engajaram com Instagram/Facebook
- pessoas que visitaram site, se houver
- pessoas que clicaram ou iniciaram interacao anterior, se o volume permitir

Por que:

- remarketing precisa mensagem diferente
- essas pessoas ja conhecem parte da proposta

#### Ad set 3

Nome sugerido:

`AS_NICHO_ADVOGADOS`

Uso:

- somente se voce ja tiver criativos, portfolio e copy especificos para advogado

Por que:

- nicho so vale ad set proprio quando o criativo e a promessa mudam de verdade

---

## 3. Configuracao da campanha

No nivel de campanha, configure assim:

- Objective: `Engagement`
- Conversion location / destination: `Messaging apps`
- Messaging app: `WhatsApp`
- Budget strategy inicial: `ABO`
- Attribution: manter o padrao mais adequado disponivel na conta

Recomendacao:

- nao complique com muitos experimentos no dia 1
- primeiro valide estrutura, criativo e qualidade de conversa

---

## 4. Configuracao dos ad sets

## 4.1 Ad set `AS_BROAD_GERAL`

Configuracao recomendada:

- audiencia ampla
- limitar apenas por geografia real de atendimento
- idioma portugues, se fizer sentido operacional
- idade ampla, salvo restricao comercial
- Advantage+ audience ligado, se a conta trouxer isso por padrao
- Advantage+ placements ligados
- otimizar para `Conversations`, se a conta mostrar essa opcao para WhatsApp

Por que:

- a Meta precisa liberdade suficiente para explorar
- seu diferencial esta mais no criativo e na oferta do que em interesses finos

O que evitar:

- 10 interesses pequenos
- exclusoes em excesso
- restringir placement sem motivo real

## 4.2 Ad set `AS_REMARKETING_30D`

Audiências recomendadas:

- engajados no Instagram 30 dias
- engajados no Facebook 30 dias
- visitantes do site 30 dias, se houver site
- video viewers, se houver volume
- pessoas que iniciaram conversa e nao fecharam, se voce conseguir montar essa audiencia

Mensagem recomendada:

- reforco de prova
- reforco de prazo
- reforco de "so paga se aprovar"
- incentivo para enviar a foto

Por que:

- remarketing nao precisa reapresentar tudo do zero
- precisa reduzir objecao e empurrar para a acao

## 4.3 Ad set `AS_NICHO_ADVOGADOS`

Configuracao recomendada:

- broad ou sem excesso de interesse
- criativos e copys especificos do nicho
- portfolio visual juridico
- copy com foco em autoridade, confianca e postura profissional

Por que:

- o maior filtro do nicho sera a mensagem
- em Meta atual, o criativo muitas vezes segmenta melhor do que o interesse

---

## 5. Quantos anuncios por ad set

Quantidade recomendada:

- `4 a 6 anuncios por ad set`

Por que:

- da diversidade real para o algoritmo
- nao fragmenta demais o gasto
- permite testar angulos diferentes

Nao fazer:

- 10 anuncios quase iguais
- 3 anuncios com mesma imagem e copy levemente mexida

Fazer:

- anuncios com angulos realmente diferentes

---

## 6. Estrutura dos anuncios

Cada anuncio deve testar um angulo, nao apenas uma frase nova.

### Angulos principais para o Nuance Studio

1. Antes e depois
2. So paga se aprovar
3. Sem sair de casa
4. Sem estudio caro
5. Sem precisar saber posar
6. Autoridade profissional

### Estrutura recomendada dentro do ad set broad

#### Ad 1

Nome:

`AD_ANTES_DEPOIS`

Funcao:

- chamar atencao visual
- provar a transformacao

#### Ad 2

Nome:

`AD_SO_PAGA_SE_APROVAR`

Funcao:

- reduzir risco
- aumentar taxa de mensagem

#### Ad 3

Nome:

`AD_SEM_SAIR_DE_CASA`

Funcao:

- explorar conveniencia

#### Ad 4

Nome:

`AD_SEM_SABER_POSAR`

Funcao:

- atacar objecao emocional

#### Ad 5

Nome:

`AD_AUTORIDADE_PROFISSIONAL`

Funcao:

- conectar imagem a resultado profissional

#### Ad 6

Nome:

`AD_PRECO_ENTRADA`

Funcao:

- explorar acessibilidade com `a partir de R$49,90`

---

## 7. Formato criativo principal

Formato base validado para este projeto:

- imagem do "antes" centralizada
- quatro imagens do "depois" nos cantos
- marca Nuance Studio
- preco inicial
- pouco texto na arte

Elementos recomendados na arte:

- `A partir de R$49,90`
- `So paga se aprovar`
- `Fotos profissionais sem sair de casa`

Cuidados:

- o antes nao deve parecer degradante
- o depois nao deve parecer fake demais
- a transformacao precisa ser forte, mas crivel

---

## 8. Copy recomendada para anuncios de mensagem

### Linha de copy 1 - Transformacao

Primary text:

`Transforme uma foto comum em fotos profissionais e realistas, sem sair de casa. Receba a previa primeiro e so pague se gostar.`

Headline:

`Fotos profissionais em 24h`

CTA:

- `Send Message`

### Linha de copy 2 - Risco invertido

Primary text:

`Envie sua foto, receba as previas com marca d'agua e so pague se aprovar o resultado. Simples, rapido e sem risco.`

Headline:

`So paga se aprovar`

### Linha de copy 3 - Conveniencia

Primary text:

`Sem estudio, sem fotografo caro e sem complicacao. Fotos profissionais prontas para perfil, Instagram e divulgacao.`

Headline:

`Sem sair de casa`

### Linha de copy 4 - Objecao emocional

Primary text:

`Nao precisa saber posar para ter fotos profissionais. A gente transforma sua foto em imagens com mais autoridade e presenca.`

Headline:

`Mais autoridade no seu perfil`

---

## 9. Mensagem inicial do WhatsApp

O anuncio sozinho nao fecha. O WhatsApp precisa continuar a venda.

Mensagem inicial recomendada:

`Oi! Funciona assim: voce envia uma foto sua, nos criamos previas profissionais com marca d'agua e voce so paga se aprovar o resultado. Temos opcoes a partir de R$49,90. Se quiser, ja posso te mostrar como enviar a foto e escolher o estilo.`

Objetivos dessa mensagem:

- explicar o processo
- reduzir incerteza
- reforcar o risco invertido
- puxar envio da foto

---

## 10. Budget inicial

Recomendacao de partida:

- com budget pequeno: 1 campanha, 1 ou 2 ad sets
- com budget moderado: 1 campanha, 2 ou 3 ad sets

Distribuicao sugerida:

- 70% no ad set broad
- 20% em remarketing, quando houver volume
- 10% em nicho especifico, quando houver criativo valido

Se a conta ainda estiver muito no inicio:

- concentre tudo no broad
- nao abra nicho cedo demais

---

## 11. O que medir

Na Meta:

- custo por conversa
- taxa de inicio de conversa
- CTR
- CPM
- frequencia

No WhatsApp / operacao:

- quantas conversas enviaram foto
- quantas receberam previa
- quantas aprovaram
- quantas pagaram
- ticket medio

Regra importante:

- conversa barata nao significa campanha boa
- campanha boa e a que gera aprovacao e pagamento

---

## 12. O que fazer depois da validacao

Quando houver historico suficiente:

- criar campanha separada por nicho
- advogados
- medicos
- engenheiros

Depois:

- integrar CRM / planilha / automacao para devolver venda ao Meta
- testar objetivo mais proximo de lead qualificado ou compra, se o sinal final estiver bem instrumentado

---

## 13. Estrutura resumida pronta para subir

### Campaign

`META_MSGS_WA_PROSPECCAO_NUANCE_2026`

### Ad sets

- `AS_BROAD_GERAL`
- `AS_REMARKETING_30D`
- `AS_NICHO_ADVOGADOS`

### Ads dentro de cada ad set

- `AD_ANTES_DEPOIS`
- `AD_SO_PAGA_SE_APROVAR`
- `AD_SEM_SAIR_DE_CASA`
- `AD_SEM_SABER_POSAR`
- `AD_AUTORIDADE_PROFISSIONAL`
- `AD_PRECO_ENTRADA`

---

## 14. Conclusao

Para o Nuance Studio, a melhor leitura da logica oficial de campanhas de mensagem da Meta e:

- usar `Engagement -> Messages -> WhatsApp` como ponto de partida
- manter estrutura simples
- usar poucos ad sets
- usar 4 a 6 anuncios por conjunto
- deixar o criativo fazer o trabalho pesado
- medir a campanha pelo que acontece no WhatsApp, nao apenas no Ads Manager

Quando a venda aprovada puder voltar como sinal para a Meta, a estrategia pode evoluir para uma otimizacao mais proxima de compra real.
