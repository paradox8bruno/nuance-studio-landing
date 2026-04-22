from reportlab.lib.pagesizes import A4
from reportlab.lib.units import cm, mm
from reportlab.lib import colors
from reportlab.lib.styles import ParagraphStyle
from reportlab.lib.enums import TA_CENTER, TA_LEFT, TA_JUSTIFY, TA_RIGHT
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, HRFlowable,
    Table, TableStyle, KeepTogether, Flowable
)
from reportlab.pdfgen import canvas as pdfcanvas
from reportlab.pdfbase.acroform import AcroForm

OUTPUT = "/Users/brunonikel/AgentPhotos/CONTRATO_NUANCE_STUDIO.pdf"

# ── PALETA ───────────────────────────────────────────────────────────────────
BLACK   = colors.HexColor("#111111")
DARK    = colors.HexColor("#1C1C1C")
GRAY    = colors.HexColor("#666666")
LGRAY   = colors.HexColor("#999999")
FIELD_BG = colors.HexColor("#F7F7F7")
FIELD_BD = colors.HexColor("#BBBBBB")
ACCENT  = colors.HexColor("#1C1C1C")
LINE    = colors.HexColor("#DDDDDD")
WHITE   = colors.white

# ── CAMPO PREENCHÍVEL ────────────────────────────────────────────────────────
class TextField(Flowable):
    """Campo de texto preenchível digitalmente via AcroForm."""
    def __init__(self, name, label, width, height=22, multiline=False):
        Flowable.__init__(self)
        self.name = name
        self.label = label
        self.width = width
        self.height = height
        self.multiline = multiline

    def draw(self):
        c = self.canv
        form = c.acroForm
        form.textfield(
            name=self.name,
            tooltip=self.label,
            x=0, y=0,
            width=self.width,
            height=self.height,
            fontName="Helvetica",
            fontSize=10,
            borderColor=FIELD_BD,
            fillColor=FIELD_BG,
            textColor=BLACK,
            borderWidth=0.5,
            borderStyle="inset",
            forceBorder=True,
        )

    def wrap(self, availW, availH):
        return self.width, self.height


class LabeledField(Flowable):
    """Label à esquerda + campo preenchível à direita."""
    def __init__(self, name, label, label_width, field_width, height=20):
        Flowable.__init__(self)
        self.name = name
        self.label = label
        self.label_width = label_width
        self.field_width = field_width
        self.height = height
        self.total_width = label_width + field_width + 6

    def draw(self):
        c = self.canv
        # Label
        c.setFont("Helvetica-Bold", 9.5)
        c.setFillColor(DARK)
        c.drawString(0, 4, self.label + ":")
        # Campo
        form = c.acroForm
        form.textfield(
            name=self.name,
            tooltip=self.label,
            x=self.label_width + 6,
            y=0,
            width=self.field_width,
            height=self.height,
            fontName="Helvetica",
            fontSize=10,
            borderColor=FIELD_BD,
            fillColor=FIELD_BG,
            textColor=BLACK,
            borderWidth=0.5,
            borderStyle="inset",
            forceBorder=True,
        )

    def wrap(self, availW, availH):
        return self.total_width, self.height + 4


# ── ESTILOS ───────────────────────────────────────────────────────────────────
def make_styles():
    base = dict(fontName="Helvetica", textColor=DARK)
    return {
        "cover_title": ParagraphStyle("cover_title",
            fontName="Helvetica-Bold", fontSize=20, textColor=BLACK,
            spaceAfter=4, alignment=TA_CENTER, leading=26),
        "cover_sub": ParagraphStyle("cover_sub",
            fontName="Helvetica", fontSize=10, textColor=GRAY,
            spaceAfter=2, alignment=TA_CENTER),
        "doc_title": ParagraphStyle("doc_title",
            fontName="Helvetica-Bold", fontSize=13, textColor=BLACK,
            spaceAfter=2, spaceBefore=8, alignment=TA_CENTER, leading=18),
        "h1": ParagraphStyle("h1",
            fontName="Helvetica-Bold", fontSize=10.5, textColor=BLACK,
            spaceBefore=14, spaceAfter=5, leading=14),
        "body": ParagraphStyle("body",
            fontName="Helvetica", fontSize=9.5, textColor=DARK,
            leading=15, spaceAfter=5, alignment=TA_JUSTIFY),
        "body_bold": ParagraphStyle("body_bold",
            fontName="Helvetica-Bold", fontSize=9.5, textColor=DARK,
            leading=15, spaceAfter=3),
        "footer": ParagraphStyle("footer",
            fontName="Helvetica", fontSize=7.5, textColor=LGRAY,
            alignment=TA_CENTER),
        "sign_name": ParagraphStyle("sign_name",
            fontName="Helvetica-Bold", fontSize=9, textColor=DARK,
            alignment=TA_CENTER),
        "sign_info": ParagraphStyle("sign_info",
            fontName="Helvetica", fontSize=8.5, textColor=GRAY,
            alignment=TA_CENTER),
        "date_label": ParagraphStyle("date_label",
            fontName="Helvetica", fontSize=10, textColor=DARK,
            spaceAfter=2),
        "small": ParagraphStyle("small",
            fontName="Helvetica", fontSize=8.5, textColor=GRAY,
            leading=13, alignment=TA_JUSTIFY),
    }

S = make_styles()

def hr(color=LINE, thickness=0.5, sb=4, sa=4):
    return HRFlowable(width="100%", thickness=thickness, color=color,
                      spaceAfter=sa, spaceBefore=sb)

def sp(h=6):
    return Spacer(1, h)

def h1(text):
    num, *rest = text.split(" ", 1)
    label = rest[0] if rest else ""
    return Paragraph(f"<font color='#111111'>{num}</font>  {label}", S["h1"])

def body(text):
    return Paragraph(text, S["body"])

def clause(num, text):
    return body(f"<b>{num}</b>&nbsp;&nbsp;{text}")

W_PAGE = A4[0] - 5*cm  # largura útil


# ── DOCUMENTO ─────────────────────────────────────────────────────────────────
doc = SimpleDocTemplate(
    OUTPUT,
    pagesize=A4,
    rightMargin=2.5*cm,
    leftMargin=2.5*cm,
    topMargin=2.2*cm,
    bottomMargin=2.2*cm,
    title="Contrato de Prestação de Serviços – Nuance Studio",
    author="Paradox8",
    subject="Ensaio Fotográfico Digital com IA",
)

story = []

# ═══════════════════════════════════════════════════════════════════════════════
# CABEÇALHO
# ═══════════════════════════════════════════════════════════════════════════════
story.append(Paragraph("NUANCE STUDIO", S["cover_title"]))
story.append(Paragraph(
    "by <b>Paradox8</b> · PARADOX PRODUÇÃO CINEMATOGRÁFICA LTDA · CNPJ 52.152.084/0001-82",
    S["cover_sub"]))
story.append(Paragraph(
    "Alameda Rio Negro, 503, Sala 2020 – Alphaville, Barueri-SP · paradox8.media",
    S["cover_sub"]))
story.append(sp(8))
story.append(hr(BLACK, 1.5, 0, 6))
story.append(Paragraph(
    "CONTRATO DE PRESTAÇÃO DE SERVIÇOS<br/>"
    "<font size=11>Ensaio Fotográfico Digital com Inteligência Artificial</font>",
    S["doc_title"]))
story.append(hr(BLACK, 1.5, 6, 10))
story.append(sp(2))

# ═══════════════════════════════════════════════════════════════════════════════
# 1. PARTES
# ═══════════════════════════════════════════════════════════════════════════════
story.append(h1("1. PARTES"))
story.append(hr())

# Contratada – tabela fixa
story.append(body("<b>1.1 CONTRATADA</b>"))
info_rows = [
    ["Razão Social",  "PARADOX PRODUÇÃO CINEMATOGRÁFICA LTDA"],
    ["Nome Fantasia", "Nuance Studio"],
    ["CNPJ",          "52.152.084/0001-82"],
    ["Endereço",      "Alameda Rio Negro, 503, Sala 2020 – Alphaville, Barueri-SP · CEP 06454-000"],
    ["Site",          "paradox8.media"],
    ["WhatsApp",      "+55 (47) 99951-1282"],
]
t = Table(info_rows, colWidths=[3.2*cm, None])
t.setStyle(TableStyle([
    ("BACKGROUND",   (0, 0), (0, -1), FIELD_BG),
    ("FONTNAME",     (0, 0), (0, -1), "Helvetica-Bold"),
    ("FONTNAME",     (1, 0), (1, -1), "Helvetica"),
    ("FONTSIZE",     (0, 0), (-1, -1), 9.5),
    ("TEXTCOLOR",    (0, 0), (-1, -1), DARK),
    ("VALIGN",       (0, 0), (-1, -1), "MIDDLE"),
    ("TOPPADDING",   (0, 0), (-1, -1), 5),
    ("BOTTOMPADDING",(0, 0), (-1, -1), 5),
    ("LEFTPADDING",  (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("LINEABOVE",    (0, 0), (-1, 0), 0.4, LINE),
    ("LINEBELOW",    (0, -1), (-1, -1), 0.4, LINE),
    ("LINEAFTER",    (0, 0), (0, -1), 0.4, LINE),
    ("ROWBACKGROUNDS", (0, 0), (-1, -1), [WHITE, FIELD_BG]),
]))
story.append(t)
story.append(sp(10))

# Contratante – campos digitais
story.append(body("<b>1.2 CONTRATANTE</b> <font color='#999999'>(preencher digitalmente)</font>"))
story.append(sp(4))

fields_ct = [
    ("ct_nome",       "Nome completo",  3.2*cm, W_PAGE - 3.2*cm - 6),
    ("ct_cpf",        "CPF",            3.2*cm, W_PAGE - 3.2*cm - 6),
    ("ct_email",      "E-mail",         3.2*cm, W_PAGE - 3.2*cm - 6),
    ("ct_whatsapp",   "WhatsApp",       3.2*cm, W_PAGE - 3.2*cm - 6),
]
for name, label, lw, fw in fields_ct:
    story.append(LabeledField(name, label, lw, fw, height=21))
    story.append(sp(2))

story.append(sp(4))
story.append(body(
    "As partes acima identificadas celebram o presente Contrato de Prestação de Serviços, "
    "que se regerá pelas cláusulas e condições a seguir."
))

# ═══════════════════════════════════════════════════════════════════════════════
# 2. OBJETO
# ═══════════════════════════════════════════════════════════════════════════════
story.append(h1("2. OBJETO DO CONTRATO"))
story.append(hr())
story.append(clause("2.1",
    "O objeto deste contrato é a prestação de serviços de criação de <b>fotografias profissionais "
    "digitais geradas com Inteligência Artificial (IA)</b>, produzidas com base em foto(s) de referência "
    "enviadas pelo Contratante."))
story.append(clause("2.2",
    "As imagens são <b>criações digitais</b> e não constituem sessão fotográfica tradicional, "
    "não envolvendo fotógrafo presencial nem estúdio físico."))
story.append(clause("2.3",
    "O serviço destina-se à produção de imagens para perfis digitais, LinkedIn, redes sociais, "
    "sites, materiais de apresentação e demais aplicações profissionais ou pessoais."))

# ═══════════════════════════════════════════════════════════════════════════════
# 3. FLUXO
# ═══════════════════════════════════════════════════════════════════════════════
story.append(h1("3. FLUXO DE EXECUÇÃO DO SERVIÇO"))
story.append(hr())

steps = [
    ("3.1", "O Contratante envia uma ou mais foto(s) de referência via WhatsApp para a Contratada."),
    ("3.2", "A Contratada gera prévias com marca d'água protetora em até <b>24 horas úteis</b> após o recebimento."),
    ("3.3", "O Contratante analisa as prévias e decide se aprova o resultado."),
    ("3.4", "O pagamento é realizado <b>somente após a aprovação das prévias</b>."),
    ("3.5", "Após confirmação do pagamento, as fotos finais em alta resolução (sem marca d'água) "
            "são entregues em até <b>24 horas úteis</b>."),
    ("3.6", "<b>Se o Contratante não aprovar as prévias, não haverá qualquer cobrança.</b>"),
]
for num, txt in steps:
    story.append(clause(num, txt))

# ═══════════════════════════════════════════════════════════════════════════════
# 4. VALOR E PAGAMENTO
# ═══════════════════════════════════════════════════════════════════════════════
story.append(h1("4. VALOR E FORMA DE PAGAMENTO"))
story.append(hr())

# Campos de valor e pagamento
pay_fields = [
    ("pag_valor",  "Valor total (R$)",    3.8*cm, 6*cm),
    ("pag_forma",  "Forma de pagamento",  3.8*cm, W_PAGE - 3.8*cm - 6),
]
for name, label, lw, fw in pay_fields:
    story.append(LabeledField(name, label, lw, fw, height=21))
    story.append(sp(2))

story.append(sp(4))
story.append(clause("4.1",
    "O pagamento será realizado exclusivamente após aprovação das prévias, conforme Cláusula 3."))
story.append(clause("4.2",
    "O prazo de entrega das fotos finais inicia-se após a confirmação do pagamento pela Contratada."))

# ═══════════════════════════════════════════════════════════════════════════════
# 5. PRAZOS
# ═══════════════════════════════════════════════════════════════════════════════
story.append(h1("5. PRAZOS DE ENTREGA"))
story.append(hr())

prazo_rows = [
    ["Etapa", "Prazo"],
    ["Prévias com marca d'água",             "Até 24h úteis após recebimento das fotos"],
    ["Fotos finais sem marca d'água",         "Até 24h úteis após confirmação do pagamento"],
]
tp = Table(prazo_rows, colWidths=[8*cm, None])
tp.setStyle(TableStyle([
    ("BACKGROUND",   (0, 0), (-1, 0), DARK),
    ("TEXTCOLOR",    (0, 0), (-1, 0), WHITE),
    ("FONTNAME",     (0, 0), (-1, 0), "Helvetica-Bold"),
    ("FONTNAME",     (0, 1), (-1, -1), "Helvetica"),
    ("FONTSIZE",     (0, 0), (-1, -1), 9.5),
    ("TEXTCOLOR",    (0, 1), (-1, -1), DARK),
    ("VALIGN",       (0, 0), (-1, -1), "MIDDLE"),
    ("TOPPADDING",   (0, 0), (-1, -1), 6),
    ("BOTTOMPADDING",(0, 0), (-1, -1), 6),
    ("LEFTPADDING",  (0, 0), (-1, -1), 8),
    ("ROWBACKGROUNDS", (0, 1), (-1, -1), [WHITE, FIELD_BG]),
    ("LINEBELOW",    (0, 0), (-1, -1), 0.4, LINE),
    ("LINEAFTER",    (0, 0), (0, -1), 0.4, LINE),
]))
story.append(tp)
story.append(sp(6))
story.append(Paragraph(
    "Dias úteis: segunda a sexta-feira, excluídos feriados nacionais e municipais de Barueri-SP.",
    S["small"]))

# ═══════════════════════════════════════════════════════════════════════════════
# 6. DIREITOS DE IMAGEM
# ═══════════════════════════════════════════════════════════════════════════════
story.append(h1("6. DIREITOS SOBRE AS IMAGENS"))
story.append(hr())
story.append(clause("6.1",
    "As fotografias digitais entregues são de <b>uso exclusivo do Contratante</b> para fins pessoais "
    "e/ou profissionais."))

story.append(body("<b>6.2  A Contratada compromete-se expressamente a NÃO:</b>"))

proib = [
    "utilizar, divulgar, compartilhar, publicar ou exibir as imagens do Contratante em qualquer "
    "meio, plataforma, rede social ou veículo, sem autorização prévia e expressa por escrito;",
    "utilizar imagens do Contratante, de seus familiares ou de seus próprios clientes para portfólio, "
    "marketing, publicidade ou qualquer uso comercial;",
    "utilizar as fotos de referência para treinamento de modelos de IA, bases de dados ou qualquer "
    "finalidade além da execução do serviço.",
]
for i, txt in enumerate(proib, 1):
    roman = ["i", "ii", "iii"][i-1]
    story.append(Paragraph(f"&nbsp;&nbsp;&nbsp;&nbsp;<b>({roman})</b>&nbsp; {txt}", S["body"]))

story.append(clause("6.3",
    "Autorização de uso das imagens para portfólio somente mediante documento escrito separado."))

# ═══════════════════════════════════════════════════════════════════════════════
# 7. LGPD
# ═══════════════════════════════════════════════════════════════════════════════
story.append(KeepTogether([
    h1("7. PROTEÇÃO DE DADOS PESSOAIS – LGPD (Lei 13.709/2018)"),
    hr(),
]))

lgpd_rows = [
    ["Dados coletados",  "Nome, CPF, e-mail, WhatsApp e foto(s) de referência"],
    ["Finalidade",       "Exclusivamente para execução do serviço contratado"],
    ["Base legal",       "Art. 7.º, V da LGPD – execução de contrato"],
    ["Retenção",         "Fotos eliminadas após entrega; demais dados por 5 anos (prazo legal fiscal)"],
    ["Compartilhamento", "Não compartilhado com terceiros, salvo obrigação legal"],
    ["DPO / Contato",    "paradox8.media"],
]
tl = Table(lgpd_rows, colWidths=[3.6*cm, None])
tl.setStyle(TableStyle([
    ("FONTNAME",     (0, 0), (0, -1), "Helvetica-Bold"),
    ("FONTNAME",     (1, 0), (1, -1), "Helvetica"),
    ("FONTSIZE",     (0, 0), (-1, -1), 9.5),
    ("TEXTCOLOR",    (0, 0), (-1, -1), DARK),
    ("BACKGROUND",   (0, 0), (0, -1), FIELD_BG),
    ("VALIGN",       (0, 0), (-1, -1), "TOP"),
    ("TOPPADDING",   (0, 0), (-1, -1), 5),
    ("BOTTOMPADDING",(0, 0), (-1, -1), 5),
    ("LEFTPADDING",  (0, 0), (-1, -1), 7),
    ("RIGHTPADDING", (0, 0), (-1, -1), 7),
    ("LINEBELOW",    (0, 0), (-1, -1), 0.4, LINE),
    ("LINEAFTER",    (0, 0), (0, -1), 0.4, LINE),
    ("ROWBACKGROUNDS", (0, 0), (-1, -1), [WHITE, FIELD_BG]),
]))
story.append(tl)
story.append(sp(6))

story.append(clause("7.1",
    "O Contratante poderá solicitar acesso, correção, eliminação ou portabilidade de seus dados a "
    "qualquer momento pelo site <b>paradox8.media</b>. Prazo de resposta: até 15 dias úteis."))
story.append(clause("7.2",
    "A Contratada adota medidas técnicas e administrativas adequadas para proteger os dados pessoais "
    "contra acessos não autorizados, destruição ou tratamento inadequado."))

# ═══════════════════════════════════════════════════════════════════════════════
# 8. PRIVACIDADE E CONFIDENCIALIDADE
# ═══════════════════════════════════════════════════════════════════════════════
story.append(h1("8. PRIVACIDADE E CONFIDENCIALIDADE"))
story.append(hr())
story.append(clause("8.1",
    "A Contratada tratará com sigilo absoluto todas as informações e imagens recebidas, "
    "utilizando-as exclusivamente para execução deste serviço."))
story.append(clause("8.2",
    "É <b>expressamente proibido</b> o uso das imagens para portfólio, redes sociais, marketing ou "
    "apresentações comerciais sem autorização prévia e escrita do Contratante."))
story.append(clause("8.3",
    "Estas obrigações de confidencialidade permanecem em vigor por prazo indeterminado, "
    "mesmo após encerramento ou rescisão deste contrato."))

# ═══════════════════════════════════════════════════════════════════════════════
# 9. LIMITAÇÃO DE RESPONSABILIDADE
# ═══════════════════════════════════════════════════════════════════════════════
story.append(h1("9. LIMITAÇÃO DE RESPONSABILIDADE"))
story.append(hr())
story.append(clause("9.1",
    "O resultado final está diretamente relacionado à qualidade e nitidez das fotos de referência "
    "enviadas. A Contratada envidará seus melhores esforços, mas não garante resultado idêntico "
    "à aparência real do Contratante."))
story.append(clause("9.2",
    "As imagens geradas com IA são representações artísticas digitais e podem apresentar variações "
    "estéticas em relação à aparência do Contratante."))
story.append(clause("9.3",
    "A Contratada não se responsabiliza por uso indevido das imagens entregues pelo Contratante."))

# ═══════════════════════════════════════════════════════════════════════════════
# 10. RESCISÃO
# ═══════════════════════════════════════════════════════════════════════════════
story.append(h1("10. RESCISÃO"))
story.append(hr())
story.append(clause("10.1",
    "<b>Antes da aprovação das prévias:</b> o Contratante poderá desistir sem custo; a Contratada "
    "eliminará imediatamente as fotos de referência e os dados do Contratante."))
story.append(clause("10.2",
    "<b>Após aprovação e pagamento:</b> não haverá restituição do valor pago, salvo falha exclusiva "
    "comprovada da Contratada na prestação do serviço."))
story.append(clause("10.3",
    "O descumprimento de qualquer cláusula sujeita a parte infratora às sanções legais cabíveis, "
    "incluindo indenização por perdas e danos."))

# ═══════════════════════════════════════════════════════════════════════════════
# 11. DISPOSIÇÕES GERAIS
# ═══════════════════════════════════════════════════════════════════════════════
story.append(h1("11. DISPOSIÇÕES GERAIS"))
story.append(hr())
story.append(clause("11.1",
    "Este contrato representa o acordo integral entre as partes e substitui quaisquer entendimentos "
    "anteriores sobre o mesmo objeto."))
story.append(clause("11.2",
    "Alterações somente serão válidas se realizadas por escrito e acordadas por ambas as partes."))

# ═══════════════════════════════════════════════════════════════════════════════
# 12. FORO
# ═══════════════════════════════════════════════════════════════════════════════
story.append(h1("12. FORO"))
story.append(hr())
story.append(body(
    "As partes elegem o foro da Comarca de <b>Barueri – Estado de São Paulo</b> para dirimir "
    "quaisquer litígios decorrentes deste contrato, com renúncia a qualquer outro."))

# ═══════════════════════════════════════════════════════════════════════════════
# ASSINATURAS
# ═══════════════════════════════════════════════════════════════════════════════
story.append(sp(18))
story.append(hr(BLACK, 1))
story.append(sp(6))

# Data
story.append(Paragraph("Data de assinatura:", S["date_label"]))
story.append(LabeledField("data_contrato", "Data", 3.5*cm, 8*cm, height=21))
story.append(sp(24))

# Assinaturas lado a lado
def sig_col(title, lines):
    col = [Paragraph("_" * 46, S["sign_name"]), sp(4)]
    col.append(Paragraph(title, S["sign_name"]))
    for l in lines:
        col.append(Paragraph(l, S["sign_info"]))
    return col

left_col  = sig_col("CONTRATANTE", [])
right_col = sig_col("CONTRATADA", [
    "PARADOX PRODUÇÃO CINEMATOGRÁFICA LTDA",
    "CNPJ: 52.152.084/0001-82 · Nuance Studio",
])

# Campo nome do Contratante na assinatura
left_col.append(sp(4))
left_col.append(LabeledField("sig_nome", "Nome", 2.2*cm, 6.5*cm, height=20))

sig_table_data = [[left_col, right_col]]
sig_table = Table(sig_table_data, colWidths=[W_PAGE/2 - 0.5*cm, W_PAGE/2 - 0.5*cm])
sig_table.setStyle(TableStyle([
    ("VALIGN",  (0, 0), (-1, -1), "TOP"),
    ("ALIGN",   (0, 0), (-1, -1), "CENTER"),
    ("LEFTPADDING",  (0, 0), (-1, -1), 4),
    ("RIGHTPADDING", (0, 0), (-1, -1), 4),
]))
story.append(sig_table)

story.append(sp(16))
story.append(hr(LINE))
story.append(Paragraph(
    "Nuance Studio by Paradox8  ·  paradox8.media  ·  +55 (47) 99951-1282  ·  CNPJ 52.152.084/0001-82",
    S["footer"]))

# ── BUILD ─────────────────────────────────────────────────────────────────────
doc.build(story)
print("✓ PDF gerado:", OUTPUT)
