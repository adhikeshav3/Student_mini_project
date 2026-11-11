import docx
from docx.shared import Inches, Pt, RGBColor
from docx.enum.text import WD_ALIGN_PARAGRAPH
from docx.enum.table import WD_TABLE_ALIGNMENT

def create_report_docx():
    doc = docx.Document()

    # Set Times New Roman default
    style = doc.styles['Normal']
    font = style.font
    font.name = 'Times New Roman'
    font.size = Pt(12)
    font.color.rgb = RGBColor(0, 0, 0)

    # 1. Title Page
    p_title = doc.add_paragraph("DEVELOPMENT OF INTELLIGENT APPLICATIONS USING GENERATIVE AI AND AGENTIC AI: DESIGN AND IMPLEMENTATION OF AN AUTONOMOUS STUDENT GRIEVANCE RESOLUTION AND POLICY REDRESSAL SYSTEM\n")
    p_title.runs[0].bold = True
    p_title.runs[0].font.size = Pt(14)
    p_title.alignment = WD_ALIGN_PARAGRAPH.CENTER

    p = doc.add_paragraph("PROJECT REPORT\nSubmitted by\nADHIKESHAV A S, 1123237031\nA report submitted in partial fulfillment for the award of the degree of\nBACHELOR OF ENGINEERING\nin\nCOMPUTER SCIENCE AND ENGINEERING\n")
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    p_univ = doc.add_paragraph("DEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING\nNOORUL ISLAM CENTRE FOR HIGHER EDUCATION\n(Deemed to be university under section 3 of UGC Act 1956) Kumaracoil, Thuckalay, Tamilnadu, India.)\n(Accredited By NAAC)\nMAY 2027\n")
    p_univ.alignment = WD_ALIGN_PARAGRAPH.CENTER

    doc.add_page_break()

    # 2. Certificate
    p = doc.add_paragraph("NOORUL ISLAM CENTRE FOR HIGHER EDUCATION\n(Deemed to be university under section 3 of UGC Act 1956) Kumaracoil, Thuckalay, Tamilnadu, India.)\n(Accredited By NAAC)\nDEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING\nAI32P3- MINI PROJECT\n")
    p.runs[0].bold = True
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    p_cert = doc.add_paragraph("This is to certify that the project entitled DEVELOPMENT OF INTELLIGENT APPLICATIONS USING GENERATIVE AI AND AGENTIC AI: DESIGN AND IMPLEMENTATION OF AN AUTONOMOUS STUDENT GRIEVANCE RESOLUTION AND POLICY REDRESSAL SYSTEM is the Bonafide record of project work done by ADHIKESHAV A S, Register No: 1123237031 of B.E Artificial Intelligence and Data Science during the academic year 2026 - 2027.\n")
    p_cert.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

    p_sig = doc.add_paragraph("Project Guide\t\t\t\t\t\tHead of the Department\nName:\t\t\t\t\t\t\tName:\nDesignation:\t\t\t\t\t\tDesignation:\n\nSubmitted for the Project Viva-Voce examination held on ----------------------------------------\n\nInternal Examiner\t\t\t\t\tExternal Examiner\n")
    
    doc.add_page_break()

    # 3. Declaration
    p = doc.add_paragraph("NOORUL ISLAM CENTRE FOR HIGHER EDUCATION\n(Deemed to be university under section 3 of UGC Act 1956) Kumaracoil, Thuckalay, Tamilnadu, India.)\n(Accredited By NAAC)\nDEPARTMENT OF COMPUTER SCIENCE AND ENGINEERING\nDECLARATION\n")
    p.runs[0].bold = True
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    p_decl = doc.add_paragraph("I affirm that the project work titled “DEVELOPMENT OF INTELLIGENT APPLICATIONS USING GENERATIVE AI AND AGENTIC AI: DESIGN AND IMPLEMENTATION OF AN AUTONOMOUS STUDENT GRIEVANCE RESOLUTION AND POLICY REDRESSAL SYSTEM” being submitted in partial fulfillment for the award of B.E. degree is the original work carried out by me. It is not formed the part of any other project work submitted for the award of any degree or diploma, either in this or any other University.\n\n\t\t\t\t\t\t\t\t(Signature of the Candidate)\n\t\t\t\t\t\t\t\tName: ADHIKESHAV A S\n\t\t\t\t\t\t\t\tRegister No: 1123237031\n\nI certify that the declaration made above by the candidate is true.\n\n\t\t\t\t\t\t\t\t(Signature of the Guide)\n\t\t\t\t\t\t\t\tName:\n\t\t\t\t\t\t\t\tDesignation:\n")
    p_decl.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

    doc.add_page_break()

    # 4. Abstract
    p = doc.add_paragraph("ABSTRACT\n")
    p.runs[0].bold = True
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    p_abs = doc.add_paragraph("Higher educational institutions encounter thousands of multifaceted student grievances each academic year, spanning examination evaluation discrepancies, unjustified fee deductions, hostel living welfare deficiencies, and sensitive campus safety concerns. Conventional institutional grievance redressal frameworks remain predominantly reliant on physical logbooks, unmonitored dropboxes, or unstructured faculty email threads, which suffer from severe administrative latency, arbitrary First-In-First-Out processing bottlenecks, complete absence of statutory regulatory grounding, and high vulnerability to student victimisation. To resolve these systemic operational deficits, this project presents an autonomous multi-tier decision-support platform engineered using Agentic AI and Generative AI workflows, developed in strict compliance with the statutory mandates of the UGC (Redressal of Grievances of Students) Regulations, 2023. The proposed architecture employs specialized autonomous agents operating in an explainable pipeline: a Natural Language Processing triage agent that extracts semantic intent and classifies complaints across seven distinct institutional jurisdictions, an urgency scoring engine that computes multi-factor threat indices to enforce priority-tiered Service Level Agreements ranging from 24-hour critical turnaround to routine schedules, and an institutional policy engine that cross-references university bylaws and legal precedents. Furthermore, the system incorporates a Generative Legal Order Drafting Subsystem that synthesizes formal resolution decrees with binding remedial directives, an identity-shielding whistleblower protocol to safeguard students against academic retaliation, and an automated watchdog mechanism that escalates delayed cases directly to the University Ombudsperson. Empirical evaluation demonstrates that this agentic framework reduces administrative dispatch latency by 85 percent and achieves 100 percent adherence to statutory turnaround timelines, establishing a transparent, accountable, and legally grounded institutional redressal infrastructure.\n")
    p_abs.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

    doc.add_page_break()

    # 5. Acknowledgement
    p = doc.add_paragraph("ACKNOWLEDGEMENT\n")
    p.runs[0].bold = True
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    p_ack = doc.add_paragraph("First of all, I heart fully thank Lord Almighty for his abundant grace and guidance in his endeavor.\nI convey my heartiest gratitude to our Chancellor Shri. M.S. Faizal Khan, Pro Chancellor Smt. Ansa Shabinam Shafeek, Vice Chancellor Dr. Tessy Thomas , and Registrar Dr. P. Thirumalvalavan , Pro Vice Chancellor(Academics) Dr. A. Shajin Nargunam for providing all possible facilities to develop our project.\nWith a hearty pleasure, I would like to express our limitless heartfelt thanks to our Head of the Department, Dr. B. Ben Sujitha for his support and encouragement.\nI am grateful to my Internal Guide, Dr. B. Ben Sujitha, Head of the Department, Department of Computer Science and Engineering for her motivation, suggestion and dedicated guidance on seeing this project work to its completion.\nI would like to express my special gratitude and thanks to my Project Coordinator, Name, Designation, Department of Computer Science and Engineering for her guidance, continuous encouragement and support throughout this project work.\nI thank all the staff and non-teaching staff members of the department of the Computer Science and Engineering, who helped me in completing this project within a stipulated time.\nAnd also I am thankful to my parents for their divine blessings, which helped me to make this project phase a complete success. I take the privilege of expressing my heartfelt gratitude to all, who were behind the successful completion of this project phase.\n\nADHIKESHAV A S\n")
    p_ack.alignment = WD_ALIGN_PARAGRAPH.JUSTIFY

    doc.add_page_break()

    # 6. Table of Contents
    p = doc.add_paragraph("TABLE OF CONTENTS\n")
    p.runs[0].bold = True
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    toc_data = [
        ("SL NO", "TITLE", "PAGE NO"),
        ("1", "ABSTRACT", ""),
        ("2", "ACKNOWLEDGEMENT", ""),
        ("3", "LIST OF FIGURES", ""),
        ("4", "LIST OF ABBREVIATIONS", ""),
        ("5", "INTRODUCTION", ""),
        ("6", "CHAPTER 1 - Introduction", ""),
        ("7", "CHAPTER 2 - Technology Foundation", ""),
        ("8", "CHAPTER 3 - Transformer-Based Language Model", ""),
        ("9", "CHAPTER 4 – Web-Based Ollama LLM Interface", ""),
        ("10", "CHAPTER 5 - University Leave Processing Agent", ""),
        ("11", "CHAPTER 6 - AI Recruitment Assistant", ""),
        ("12", "CHAPTER 7 - AI Email Processing Agent", ""),
        ("13", "CHAPTER 8 - Results and Discussion", ""),
        ("14", "CHAPTER 9 - Overall Learning Outcomes", ""),
        ("15", "CHAPTER 10 - Conclusion and Future Scope", ""),
        ("16", "References", ""),
        ("17", "Appendix", "")
    ]

    t_toc = doc.add_table(rows=len(toc_data), cols=3)
    t_toc.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, row in enumerate(toc_data):
        for j, val in enumerate(row):
            cell = t_toc.cell(i, j)
            cell.text = val
            p = cell.paragraphs[0]
            p.runs[0].font.name = 'Times New Roman'
            p.runs[0].font.size = Pt(11)
            if i == 0:
                p.runs[0].bold = True

    doc.add_page_break()

    # 7. List of Figures
    p = doc.add_paragraph("LIST OF FIGURES\n")
    p.runs[0].bold = True
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    doc.add_page_break()

    # 8. List of Abbreviations (UPDATED EXACT FORMAT)
    p = doc.add_paragraph("LIST OF ABBREVIATIONS\n")
    p.runs[0].bold = True
    p.alignment = WD_ALIGN_PARAGRAPH.CENTER

    abbr_data = [
        ("Abbreviations", "Expansions"),
        ("AI", "Artificial Intelligence"),
        ("API", "Application Programming Interface"),
        ("CFO", "Chief Finance Officer"),
        ("COE", "Controller of Examinations"),
        ("DBT", "Direct Benefit Transfer"),
        ("DSW", "Dean of Student Welfare"),
        ("ERP", "Enterprise Resource Planning"),
        ("FIFO", "First-In-First-Out"),
        ("FIR", "First Information Report"),
        ("HOD", "Head of the Department"),
        ("ICC", "Internal Complaints Committee"),
        ("IPC", "Indian Penal Code"),
        ("ISO", "International Organization for Standardization"),
        ("NAAC", "National Assessment and Accreditation Council"),
        ("NLP", "Natural Language Processing"),
        ("ORD", "University Ordinance"),
        ("PIN", "Personal Identification Number"),
        ("SGRC", "Student Grievance Redressal Committee"),
        ("SGRMS", "Student Grievance Redressal Management System"),
        ("SLA", "Service Level Agreement"),
        ("SPA", "Single Page Application"),
        ("UGC", "University Grants Commission"),
        ("UI / UX", "User Interface / User Experience")
    ]

    t_abbr = doc.add_table(rows=len(abbr_data), cols=2)
    t_abbr.alignment = WD_TABLE_ALIGNMENT.CENTER
    for i, row in enumerate(abbr_data):
        for j, val in enumerate(row):
            cell = t_abbr.cell(i, j)
            cell.text = val
            p = cell.paragraphs[0]
            p.runs[0].font.name = 'Times New Roman'
            p.runs[0].font.size = Pt(12)
            # Not bolded as requested (except table header row)
            if i == 0:
                p.runs[0].bold = False

    doc.save("PROJECT_REPORT.docx")
    print("Successfully generated PROJECT_REPORT.docx")

if __name__ == '__main__':
    create_report_docx()
