import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH

def create_introduction_docx():
    doc = docx.Document()

    # Page setup - Standard A4 with 1 inch margins
    sections = doc.sections
    for section in sections:
        section.top_margin = Inches(1)
        section.bottom_margin = Inches(1)
        section.left_margin = Inches(1)
        section.right_margin = Inches(1)

    # Set Times New Roman default
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Times New Roman'
    font.size = Pt(12)
    font.color.rgb = RGBColor(0, 0, 0)

    # Title: Size 14, Bold, Centered
    p_title = doc.add_paragraph()
    run_title = p_title.add_run("INTRODUCTION")
    run_title.font.name = 'Times New Roman'
    run_title.font.size = Pt(14)
    run_title.bold = True
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER
    p_title.paragraph_format.space_after = Pt(18)
    p_title.paragraph_format.space_before = Pt(0)

    paragraphs_text = [
        "This consolidated project report presents six interconnected projects demonstrating the development and practical "
        "applications of Generative Artificial Intelligence (Generative AI), Large Language Models (LLMs), and Agentic AI. "
        "The work follows a progressive engineering approach, beginning with the fundamental mathematical architecture of "
        "language models and extending towards the development of autonomous, intelligent applications capable of assisting "
        "users, enforcing statutory compliance, and automating multifaceted real-world tasks.",

        "The first project focuses on implementing a decoder-style Transformer language model from scratch using PyTorch. "
        "It explores the fundamental building blocks of modern Transformer architecture, including tokenization strategies, "
        "learned token embeddings, sinusoidal positional encodings, multi-head self-attention mechanisms, position-wise "
        "feed-forward networks, and autoregressive next-token prediction. This implementation provides rigorous practical insight "
        "into how neural language models vectorize, attend to, and generate sequence-based representations, establishing a solid "
        "foundation for understanding contemporary Generative AI systems.",

        "The second project explores the deployment and operationalization of a locally hosted Large Language Model using the "
        "Ollama framework. By integrating a quantized Qwen open-weights model with a custom web-based user interface, the application "
        "enables users to interact with an AI model running entirely within an on-premise, local computing environment. This project "
        "demonstrates edge deployment, backend REST API integration, and full-stack interface engineering while directly addressing "
        "critical enterprise concerns, including data privacy, compute latency, hardware resource constraints, and the strategic "
        "reduction of reliance on proprietary cloud-hosted AI providers.",

        "The subsequent four projects extend AI capabilities beyond passive response generation into practical institutional workflow "
        "automation through Agentic AI. Unlike conventional chatbots that primarily generate conversational text, goal-oriented AI agents "
        "are architected to interpret high-level task instructions, maintain environment state, query external databases, dynamically invoke "
        "tools, and execute structured operations within strict organizational boundaries.",

        "The third project involves developing a University Leave Processing Agent to streamline institutional faculty and student leave-management "
        "procedures. The system combines natural language intent parsing, institutional business rules, and relational database transactions "
        "to assist administrative staff in verifying entitlement balances, evaluating request validity, and logging approved leaves. This "
        "application illustrates how conversational agents can simplify repetitive administrative procedures and enhance workflow efficiency.",

        "The fourth project focuses on an AI-powered Recruitment and Placement Preparation Assistant (PlacementPrep). It applies language model "
        "reasoning to recruitment-related activities and student career readiness. The platform provides automated resume critique against "
        "job descriptions, simulates domain-specific technical interview questions, assesses candidate conceptual responses, and generates "
        "constructive gap analysis to support students in achieving career placement milestones.",

        "The fifth project presents an AI-powered Email Processing Agent that automates inbound enterprise communication workflows through "
        "the orchestration of n8n, Google Gmail, and Google Drive. The system categorizes incoming messages, extracts actionable entities, "
        "drafts context-aware replies, and files relevant attachments automatically. Crucially, Human-in-the-Loop (HITL) supervisory controls "
        "are embedded into the pipeline to ensure that sensitive or outbound communications undergo human verification before execution, "
        "maintaining rigorous institutional accountability.",

        "The sixth project culminates in an Intelligent Student Grievance Resolution Agent, an enterprise-grade quasi-judicial portal engineered "
        "in strict compliance with the statutory mandates of the UGC (Redressal of Grievances of Students) Regulations, 2023. Rejecting "
        "unpredictable generative chatbots in sensitive administrative domains, the system employs an explainable Natural Language Processing "
        "triage engine to classify petitions across seven university jurisdictions, dynamically assigns urgency-tiered Service Level Agreements "
        "scaling from 24-hour critical turnaround to routine schedules, cross-references statutory bylaws, safeguards petitioner confidentiality "
        "through cryptographic identity shielding, and synthesizes authoritative draft resolution decrees for university authorities.",

        "Together, these six interconnected projects span core frontiers of modern computing, including Natural Language Processing, deep learning "
        "tensor operations, Transformer mathematics, full-stack web engineering, relational database management, local LLM containerization, "
        "workflow orchestration, and regulatory compliance. Each implementation addresses a progressive stage of intelligent application "
        "development, establishing a continuous trajectory from neural mechanics to deployed multi-agent enterprise systems.",

        "The report is organized into eleven comprehensive chapters. Chapters 1 and 2 introduce the foundational concepts, explain the project "
        "objectives, and present the theoretical technologies utilized. Chapters 3 through 8 describe the six individual implementations in detail, "
        "covering system architecture, development methodology, and functional execution. Chapter 9 presents testing protocols, performance "
        "observations, and comparative evaluation. Chapter 10 synthesizes overall learning outcomes and engineering proficiencies gained, and "
        "Chapter 11 concludes the consolidated work with prospective directions for future research."
    ]

    for text in paragraphs_text:
        p = doc.add_paragraph()
        p.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY
        p.paragraph_format.first_line_indent = Inches(0.5)
        p.paragraph_format.line_spacing = 1.3
        p.paragraph_format.space_after = Pt(10)
        p.paragraph_format.space_before = Pt(0)
        
        run = p.add_run(text)
        run.font.name = 'Times New Roman'
        run.font.size = Pt(12)
        run.font.color.rgb = RGBColor(0, 0, 0)

    filename = "INTRODUCTION.docx"
    doc.save(filename)
    print(f"Successfully created {filename} with native Times New Roman, Title 14pt, and Body 12pt.")

if __name__ == '__main__':
    create_introduction_docx()
