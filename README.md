# Gerador de Prévias com Marca d'Água

Este projeto agora gera prévias com marca d'água para envio ao cliente, mantendo as fotos completas separadas para a entrega final.

## Estrutura recomendada

Crie uma pasta `ensaios/` no projeto. Dentro dela, use uma pasta por cliente:

```text
ensaios/
  cliente-ana/
    originais/
      foto-001.jpg
      foto-002.jpg
    previas/
  cliente-carlos/
    foto-001.jpg
    foto-002.jpg
    previas/
```

Regras do script:

- Se existir `originais/`, `completas/` ou `full/`, essa pasta vira a origem das imagens.
- Se nao existir uma dessas subpastas, o script usa as imagens que estiverem direto na pasta do cliente.
- As prévias sempre sao geradas em `previas/`.
- Os arquivos de saída sao renomeados em sequencia: `foto1`, `foto2`, `foto3`...
- A prévia nao altera a foto original: ela cria uma copia separada com marca d'agua.

## Como gerar as prévias

Processar todos os clientes:

```bash
python3 scripts/gerar_previas.py
```

Processar apenas um cliente:

```bash
python3 scripts/gerar_previas.py --cliente cliente-ana
```

Regerar tudo sobrescrevendo as prévias:

```bash
python3 scripts/gerar_previas.py --overwrite
```

## O que a prévia faz

- por padrao, mantem o mesmo tamanho da imagem original
- reduz o tamanho apenas se voce usar `--max-dimension`
- aplica varias marcas d'agua com o texto `NUANCE STUDIO` por toda a foto
- adiciona uma marca central reforçada
- preserva o arquivo original intacto em `originais/`

## Ajustes úteis

Texto da marca d'água:

```bash
python3 scripts/gerar_previas.py --watermark "NUANCE STUDIO"
```

Reduzir opcionalmente o tamanho da prévia:

```bash
python3 scripts/gerar_previas.py --max-dimension 1600
```

Qualidade JPEG:

```bash
python3 scripts/gerar_previas.py --quality 78
```
