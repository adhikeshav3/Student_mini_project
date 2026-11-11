import os
import sys
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, HRFlowable
import pypdf

def generate_introduction_pdf():
    pdf_filename = "INTRODUCTION.pdf"
    
    # A4 Dimensions: 595.28 x 841.89 pt
    # Margins tuned to ensure the content occupies exactly 2 pages
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=A4,
        leftMargin=54,
        rightMargin=54,
        topMargin=54,
        bottomMargin=54
    )

    styles = getSampleStyleSheet()

    # Title: Times New Roman, Size 14, Centered
    title_style = ParagraphStyle(
        'IntroTitle',
        parent=styles['Normal'],
        fontName='Times-Bold',
        fontSize=14,
        leading=18,
        alignment=1, # Centered
        textColor=colors.HexColor('#0F172A'),
        spaceAfter=18
    )

    # Paragraphs: Times New Roman, Size 12, Justified, First-line indent
    body_style = ParagraphStyle(
        'IntroBody',
        parent=styles['Normal'],
        fontName='Times-Roman',
        fontSize=12,
        leading=17.8,
        alignment=4, # Justified
        textColor=colors.HexColor('#1E293B'),
        firstLineIndent=24,
        spaceAfter=12
    )

    story = []

    # Document Title
    story.append(Paragraph("INTRODUCTION", title_style))
    story.append(HRFlowable(width="100%", thickness=1, color=colors.HexColor('#CBD5E1'), spaceAfter=14, spaceBefore=0))

    # Narrative Paragraphs
    p1 = (
        "This consolidated project report presents six interconnected projects demonstrating the development and practical "
        "applications of Generative Artificial Intelligence (Generative AI), Large Language Models (LLMs), and Agentic AI. "
        "The work follows a progressive engineering approach, beginning with the fundamental mathematical architecture of "
        "language models and extending towards the development of autonomous, intelligent applications capable of assisting "
        "users, enforcing statutory compliance, and automating multifaceted real-world tasks."
    )
    story.append(Paragraph(p1, body_style))

    p2 = (
        "The first project focuses on implementing a decoder-style Transformer language model from scratch using PyTorch. "
        "It explores the fundamental building blocks of modern Transformer architecture, including tokenization strategies, "
        "learned token embeddings, sinusoidal positional encodings, multi-head self-attention mechanisms, position-wise "
        "feed-forward networks, and autoregressive next-token prediction. This implementation provides rigorous practical insight "
        "into how neural language models vectorize, attend to, and generate sequence-based representations, establishing a solid "
        "foundation for understanding contemporary Generative AI systems."
    )
    story.append(Paragraph(p2, body_style))

    p3 = (
        "The second project explores the deployment and operationalization of a locally hosted Large Language Model using the "
        "Ollama framework. By integrating a quantized Qwen open-weights model with a custom web-based user interface, the application "
        "enables users to interact with an AI model running entirely within an on-premise, local computing environment. This project "
        "demonstrates edge deployment, backend REST API integration, and full-stack interface engineering while directly addressing "
        "critical enterprise concerns, including data privacy, compute latency, hardware resource constraints, and the strategic "
        "reduction of reliance on proprietary cloud-hosted AI providers."
    )
    story.append(Paragraph(p3, body_style))

    p4 = (
        "The subsequent four projects extend AI capabilities beyond passive response generation into practical institutional workflow "
        "automation through Agentic AI. Unlike conventional chatbots that primarily generate conversational text, goal-oriented AI agents "
        "are architected to interpret high-level task instructions, maintain environment state, query external databases, dynamically invoke "
        "tools, and execute structured operations within strict organizational boundaries."
    )
    story.append(Paragraph(p4, body_style))

    p5 = (
        "The third project involves developing a University Leave Processing Agent to streamline institutional faculty and student leave-management "
        "procedures. The system combines natural language intent parsing, institutional business rules, and relational database transactions "
        "to assist administrative staff in verifying entitlement balances, evaluating request validity, and logging approved leaves. This "
        "application illustrates how conversational agents can simplify repetitive administrative procedures and enhance workflow efficiency."
    )
    story.append(Paragraph(p5, body_style))

    p6 = (
        "The fourth project focuses on an AI-powered Recruitment and Placement Preparation Assistant (PlacementPrep). It applies language model "
        "reasoning to recruitment-related activities and student career readiness. The platform provides automated resume critique against "
        "job descriptions, simulates domain-specific technical interview questions, assesses candidate conceptual responses, and generates "
        "constructive gap analysis to support students in achieving career placement milestones."
    )
    story.append(Paragraph(p6, body_style))

    p7 = (
        "The fifth project presents an AI-powered Email Processing Agent that automates inbound enterprise communication workflows through "
        "the orchestration of n8n, Google Gmail, and Google Drive. The system categorizes incoming messages, extracts actionable entities, "
        "drafts context-aware replies, and files relevant attachments automatically. Crucially, Human-in-the-Loop (HITL) supervisory controls "
        "are embedded into the pipeline to ensure that sensitive or outbound communications undergo human verification before execution, "
        "maintaining rigorous institutional accountability."
    )
    story.append(Paragraph(p7, body_style))

    p8 = (
        "The sixth project culminates in an Intelligent Student Grievance Resolution Agent, an enterprise-grade quasi-judicial portal engineered "
        "in strict compliance with the statutory mandates of the UGC (Redressal of Grievances of Students) Regulations, 2023. Rejecting "
        "unpredictable generative chatbots in sensitive administrative domains, the system employs an explainable Natural Language Processing "
        "triage engine to classify petitions across seven university jurisdictions, dynamically assigns urgency-tiered Service Level Agreements "
        "scaling from 24-hour critical turnaround to routine schedules, cross-references statutory bylaws, safeguards petitioner confidentiality "
        "through cryptographic identity shielding, and synthesizes authoritative draft resolution decrees for university authorities."
    )
    story.append(Paragraph(p8, body_style))

    p9 = (
        "Together, these six interconnected projects span core frontiers of modern computing, including Natural Language Processing, deep learning "
        "tensor operations, Transformer mathematics, full-stack web engineering, relational database management, local LLM containerization, "
        "workflow orchestration, and regulatory compliance. Each implementation addresses a progressive stage of intelligent application "
        "development, establishing a continuous trajectory from neural mechanics to deployed multi-agent enterprise systems."
    )
    story.append(Paragraph(p9, body_style))

    p10 = (
        "The report is organized into eleven comprehensive chapters. Chapters 1 and 2 introduce the foundational concepts, explain the project "
        "objectives, and present the theoretical technologies utilized. Chapters 3 through 8 describe the six individual implementations in detail, "
        "covering system architecture, development methodology, and functional execution. Chapter 9 presents testing protocols, performance "
        "observations, and comparative evaluation. Chapter 10 synthesizes overall learning outcomes and engineering proficiencies gained, and "
        "Chapter 11 concludes the consolidated work with prospective directions for future research."
    )
    story.append(Paragraph(p10, body_style))

    # Build the document
    doc.build(story)

    # Verification of page count
    reader = pypdf.PdfReader(pdf_filename)
    total_pages = len(reader.pages)
    print(f"Generated '{pdf_filename}' with {total_pages} page(s).")
    return total_pages

if __name__ == '__main__':
    pages = generate_introduction_pdf()
    if pages == 2:
        print("SUCCESS: Document is exactly 2 pages.")
    else:
        print(f"WARNING: Expected 2 pages, got {pages} pages!")
        sys.exit(1)
