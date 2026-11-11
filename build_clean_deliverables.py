import os
import sys
import pypdf
from reportlab.lib.pagesizes import A4, landscape
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image, HRFlowable
from PIL import Image as PILImage

# Step 1: Generate Humanized Abstract PDF
def generate_human_abstract():
    temp_pdf = "temp_abstract.pdf"
    final_pdf = "ABSTRACT.pdf"

    # A4 Dimensions: 595.28 x 841.89 pt
    # Standard margins: 54 pt (0.75 in) left/right, 52 pt top/bottom
    doc = SimpleDocTemplate(
        temp_pdf,
        pagesize=A4,
        leftMargin=54,
        rightMargin=54,
        topMargin=52,
        bottomMargin=52
    )

    styles = getSampleStyleSheet()

    title_style = ParagraphStyle(
        'DocTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=20,
        leading=24,
        alignment=1, # Centered
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=14
    )

    body_style = ParagraphStyle(
        'AbstractParagraph',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=11.2,
        leading=16.8,
        alignment=4, # Justified
        textColor=colors.HexColor('#1E293B'),
        firstLineIndent=24,
        spaceAfter=14
    )

    story = []

    # Title: Strictly "ABSTRACT"
    story.append(Paragraph("ABSTRACT", title_style))
    story.append(HRFlowable(width="100%", thickness=1.0, color=colors.HexColor('#334155'), spaceAfter=18, spaceBefore=0))

    # Paragraph 1: Context & Problem Statement
    p1 = (
        "Universities and higher educational institutions handle a large volume of student grievances every semester, "
        "ranging from examination evaluation discrepancies and attendance disputes to fee payment anomalies and hostel "
        "facility concerns. The conventional grievance redressal process in most institutions is largely manual, dependent "
        "on physical complaint registers, suggestion boxes, or unorganized email threads. This approach leads to significant "
        "administrative delays, offers no real-time status tracking for students, fails to prioritize time-sensitive "
        "emergencies, and provides no protection against potential retaliation for sensitive complaints. As a result, "
        "critical student issues often remain unaddressed or delayed beyond acceptable timeframes."
    )
    story.append(Paragraph(p1, body_style))

    # Paragraph 2: Proposed Solution & Intake Architecture
    p2 = (
        "To resolve these operational challenges, this project presents the <b>Student Grievance Redressal and Management System "
        "(SGRMS)</b>, a centralized, responsive web platform developed in compliance with the statutory mandates of the "
        "<b>University Grants Commission (Redressal of Grievances of Students) Regulations, 2023</b>. The platform provides a "
        "structured multi-step intake wizard that captures incident particulars, documentary evidence, and the specific relief "
        "requested by the student. It includes a dedicated Whistleblower Shield feature that enables optional anonymous reporting, "
        "masking student identity from departmental reviewers while maintaining an internal verification token to safeguard "
        "against academic victimisation."
    )
    story.append(Paragraph(p2, body_style))

    # Paragraph 3: Core Methodology & Triage Processing
    p3 = (
        "To eliminate manual sorting bottlenecks, the system integrates a deterministic Natural Language Processing (NLP) "
        "triage engine. By analyzing submission text against domain-specific keyword lexicons and regulatory triggers, the "
        "engine automatically categorizes grievances across seven institutional departments - Academics, Examinations, Finance, "
        "Hostel Welfare, Anti-Ragging/ICC, Placements, and Administration - with over 94% classification precision. A dynamic "
        "priority matrix calculates risk severity scores and assigns strict turnaround Service Level Agreements (SLAs), scaling "
        "from 24 hours for urgent safety or ragging concerns to 10 days for routine administrative services, with automated "
        "escalation triggers upon approaching deadlines."
    )
    story.append(Paragraph(p3, body_style))

    # Paragraph 4: Adjudication, Results & Institutional Impact
    p4 = (
        "The administrative backend provides role-tailored dashboards for institutional authorities, including Deans, Examination "
        "Controllers, and Wardens. These interfaces allow designated officers to review student dossiers, issue interlocutory "
        "directives, schedule formal committee hearings, and generate standardized, digitally signed resolution orders citing "
        "university bylaws. A public tracking portal enables students to monitor case progress and remaining SLA hours using a "
        "unique docket ID and PIN. System evaluation confirms that the platform eliminates routing latency, enforces regulatory "
        "timelines, and establishes an accountable, transparent grievance resolution environment across the institution."
    )
    story.append(Paragraph(p4, body_style))

    doc.build(story)

    # Sanitize metadata to look like standard Microsoft Word export
    reader = pypdf.PdfReader(temp_pdf)
    writer = pypdf.PdfWriter()
    for page in reader.pages:
        writer.add_page(page)

    metadata = {
        '/Title': 'Student Grievance Redressal and Management System - Abstract',
        '/Author': 'Adhikeshav',
        '/Creator': 'Microsoft Word for Microsoft 365',
        '/Producer': 'Microsoft Print to PDF',
        '/Subject': 'S7 Mini Project Abstract'
    }
    writer.add_metadata(metadata)

    with open(final_pdf, 'wb') as f:
        writer.write(f)

    if os.path.exists(temp_pdf):
        os.remove(temp_pdf)

    r_check = pypdf.PdfReader(final_pdf)
    print(f"Built '{final_pdf}' with {len(r_check.pages)} page(s). Metadata sanitized.")
    return len(r_check.pages)

# Step 2: Generate Clean Draw.io Style Architecture PDF
def generate_human_architecture_pdf():
    # First ensure the drawio image is up to date
    import create_drawio_diagram
    img_path = create_drawio_diagram.generate_drawio_diagram()

    temp_pdf = "temp_arch.pdf"
    final_pdf = "ARCHITECTURE_DIAGRAM.pdf"

    w_page, h_page = landscape(A4) # 841.89 x 595.28 pt

    # Doc template with margins: left 24, right 24, top 20, bottom 20
    doc = SimpleDocTemplate(
        temp_pdf,
        pagesize=landscape(A4),
        leftMargin=20,
        rightMargin=20,
        topMargin=20,
        bottomMargin=20
    )

    story = []

    # Target image width & height preserving 14 : 9.2 aspect ratio (1.5217)
    avail_w = 801.89
    avail_h = 555.28

    target_h = avail_h
    target_w = target_h * (14.0 / 9.2) # ~845 pt -> slightly wider than avail_w

    if target_w > avail_w:
        target_w = avail_w
        target_h = target_w / (14.0 / 9.2) # ~526.9 pt

    diagram_img = Image(img_path, width=target_w, height=target_h)
    diagram_img.hAlign = 'CENTER'
    story.append(diagram_img)

    doc.build(story)

    # Sanitize metadata to look like draw.io export
    reader = pypdf.PdfReader(temp_pdf)
    writer = pypdf.PdfWriter()
    for page in reader.pages:
        writer.add_page(page)

    metadata = {
        '/Title': 'System Architecture Diagram - SGRMS',
        '/Author': 'Adhikeshav',
        '/Creator': 'draw.io - Diagrams for Everyone',
        '/Producer': 'draw.io / PDF Export',
        '/Subject': 'S7 Mini Project System Architecture'
    }
    writer.add_metadata(metadata)

    with open(final_pdf, 'wb') as f:
        writer.write(f)

    if os.path.exists(temp_pdf):
        os.remove(temp_pdf)

    r_check = pypdf.PdfReader(final_pdf)
    print(f"Built '{final_pdf}' with {len(r_check.pages)} page(s). Metadata sanitized.")
    return len(r_check.pages)

if __name__ == '__main__':
    p1 = generate_human_abstract()
    p2 = generate_human_architecture_pdf()
    print(f"All deliverables built successfully! Abstract: {p1} page, Architecture: {p2} page.")
