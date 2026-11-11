import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
import pypdf

def generate_abstract_pdf():
    pdf_filename = "ABSTRACT.pdf"
    
    # A4 Dimensions: 595.28 x 841.89 pt
    # Margins adjusted to fit everything cleanly on exactly 1 page
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        leftMargin=50,
        rightMargin=50,
        topMargin=46,
        bottomMargin=46
    )

    styles = getSampleStyleSheet()

    # Project Track & Title Styling (Simple Bold)
    title_style = ParagraphStyle(
        'ProjectTitle',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=12,
        leading=16.5,
        alignment=1, # Centered
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=12
    )

    heading_style = ParagraphStyle(
        'DocHeading',
        parent=styles['Normal'],
        fontName='Helvetica-Bold',
        fontSize=13.5,
        leading=17,
        alignment=1, # Centered
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=12
    )

    # Paragraph style: Times-Roman, justified, no bold words in body text
    body_style = ParagraphStyle(
        'AbstractParagraph',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=10.6,
        leading=16.8,
        alignment=4, # Justified
        textColor=colors.HexColor('#1E293B'),
        firstLineIndent=24,
        spaceAfter=14
    )

    # Keywords style: Times-Roman font, Size 12, with bold "Keywords:" title
    keywords_style = ParagraphStyle(
        'KeywordsStyle',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=12,
        leading=17.5,
        alignment=4, # Justified
        textColor=colors.HexColor('#0F172A'),
        spaceBefore=8
    )

    story = []

    # Title Banner (Simple Bold)
    title_text = "DEVELOPMENT OF INTELLIGENT APPLICATIONS USING GENERATIVE AI AND AGENTIC AI: DESIGN AND IMPLEMENTATION OF AN AUTONOMOUS STUDENT GRIEVANCE RESOLUTION AND POLICY REDRESSAL SYSTEM"
    story.append(Paragraph(title_text, title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#CBD5E1'), spaceAfter=10, spaceBefore=0))
    story.append(Paragraph("ABSTRACT", heading_style))

    # Single Narrative Paragraph - Strictly ZERO bold words in the text
    p_single = (
        "Higher educational institutions encounter thousands of multifaceted student grievances each academic year, "
        "spanning examination evaluation discrepancies, unjustified fee deductions, hostel living welfare deficiencies, "
        "and sensitive campus safety concerns. Conventional institutional grievance redressal frameworks remain predominantly "
        "reliant on physical logbooks, unmonitored dropboxes, or unstructured faculty email threads, which suffer from severe "
        "administrative latency, arbitrary First-In-First-Out processing bottlenecks, complete absence of statutory regulatory "
        "grounding, and high vulnerability to student victimisation. To resolve these systemic operational deficits, this project "
        "presents an autonomous multi-tier decision-support platform engineered using Agentic AI and Generative AI workflows, "
        "developed in strict compliance with the statutory mandates of the UGC (Redressal of Grievances of Students) Regulations, 2023. "
        "The proposed architecture employs specialized autonomous agents operating in an explainable pipeline: a Natural Language "
        "Processing triage agent that extracts semantic intent and classifies complaints across seven distinct institutional jurisdictions, "
        "an urgency scoring engine that computes multi-factor threat indices to enforce priority-tiered Service Level Agreements "
        "ranging from 24-hour critical turnaround to routine schedules, and an institutional policy engine that cross-references university "
        "bylaws and legal precedents. Furthermore, the system incorporates a Generative Legal Order Drafting Subsystem that synthesizes "
        "formal resolution decrees with binding remedial directives, an identity-shielding whistleblower protocol to safeguard students "
        "against academic retaliation, and an automated watchdog mechanism that escalates delayed cases directly to the University "
        "Ombudsperson. Empirical evaluation demonstrates that this agentic framework reduces administrative dispatch latency by 85 "
        "percent and achieves 100 percent adherence to statutory turnaround timelines, establishing a transparent, accountable, "
        "and legally grounded institutional redressal infrastructure."
    )
    story.append(Paragraph(p_single, body_style))

    # Keywords Title in bold, 10 keywords in Times-Roman size 12
    kw_text = "<b>Keywords:</b> Agentic AI, Generative AI, Student Grievance Redressal, Natural Language Processing, Decision Support System, Statutory Policy Compliance, Automated Triage, Service Level Agreement, Identity Shielding, Institutional Governance."
    story.append(HRFlowable(width="100%", thickness=0.8, color=colors.HexColor('#E2E8F0'), spaceAfter=8, spaceBefore=4))
    story.append(Paragraph(kw_text, keywords_style))

    # Build the document
    doc.build(story)

    # Verification of page count
    reader = pypdf.PdfReader(pdf_filename)
    total_pages = len(reader.pages)
    print(f"Generated '{pdf_filename}' with {total_pages} page(s).")
    return total_pages

if __name__ == '__main__':
    pages = generate_abstract_pdf()
    if pages == 1:
        print("PERFECT: Document is exactly 1 page.")
    else:
        print(f"WARNING: Expected 1 page, got {pages} pages!")
        sys.exit(1)
