import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Circle, Polygon, Rectangle
import numpy as np

def draw_pictograms(ax):
    """Draw clean vector pictograms for each component"""
    pass

def generate_diagram():
    fig, ax = plt.subplots(figsize=(14, 9.5), dpi=300)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Background canvas
    fig.patch.set_facecolor('#080E1A') # Deep dark institutional slate
    ax.set_facecolor('#080E1A')

    # Outer decorative frame
    border = FancyBboxPatch((1.5, 1.5), 97, 97, boxstyle="round,pad=0.5,rounding_size=1.5",
                            linewidth=1.5, edgecolor='#C59B27', facecolor='none')
    ax.add_patch(border)

    # 1. HEADER SECTION
    ax.text(50, 96.2, "CENTRAL STUDENT GRIEVANCE REDRESSAL SYSTEM (SGRMS)", 
            color='#C59B27', fontsize=15, weight='bold', ha='center', va='center', fontfamily='sans-serif')
    ax.text(50, 93.8, "ENTERPRISE SYSTEM ARCHITECTURE & DATA FLOW SPECIFICATION", 
            color='#E2E8F0', fontsize=11, weight='bold', ha='center', va='center', fontfamily='sans-serif')
    ax.text(50, 91.8, "Statutory Tiered Architecture: Intake, Deterministic NLP Triage, Adjudication & Regulatory Decrees", 
            color='#94A3B8', fontsize=8, style='italic', ha='center', va='center', fontfamily='sans-serif')

    # Color definitions for tiers
    c_blue_bg = '#0F1E36'
    c_blue_border = '#38BDF8'
    
    c_amber_bg = '#231805'
    c_amber_border = '#F59E0B'
    
    c_emerald_bg = '#062319'
    c_emerald_border = '#10B981'
    
    c_indigo_bg = '#181236'
    c_indigo_border = '#818CF8'

    c_base_bg = '#111827'
    c_base_border = '#64748B'

    # Helper function for component boxes
    def draw_card(x, y, w, h, title, items, icon_type, border_col, bg_col):
        # Card container
        box = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.3,rounding_size=0.8",
                             linewidth=1.2, edgecolor=border_col, facecolor=bg_col)
        ax.add_patch(box)
        
        # Header bar
        hbar = FancyBboxPatch((x, y + h - 2.8), w, 2.8, boxstyle="round,pad=0.1,rounding_size=0.5",
                              linewidth=0, facecolor=border_col, alpha=0.25)
        ax.add_patch(hbar)

        # Icon circle
        ic_center = (x + 2.5, y + h - 1.4)
        circ = Circle(ic_center, 1.1, facecolor=border_col, edgecolor='none')
        ax.add_patch(circ)

        # Draw specific pictorial icon inside circle
        draw_icon(ax, ic_center[0], ic_center[1], icon_type)

        # Card Title
        ax.text(x + 4.3, y + h - 1.4, title, color='#FFFFFF', fontsize=7.8, weight='bold', va='center')

        # Card items
        y_pos = y + h - 4.5
        for itm in items:
            ax.plot(x + 1.8, y_pos, marker='o', markersize=2.5, color=border_col)
            ax.text(x + 2.8, y_pos, itm, color='#CBD5E1', fontsize=6.2, va='center')
            y_pos -= 2.4

    def draw_icon(ax, ix, iy, itype):
        if itype == 'user':
            # Student head & shoulders
            ax.add_patch(Circle((ix, iy + 0.35), 0.35, facecolor='#FFFFFF'))
            ax.add_patch(Polygon([[ix - 0.55, iy - 0.55], [ix + 0.55, iy - 0.55], 
                                  [ix + 0.35, iy - 0.05], [ix - 0.35, iy - 0.05]], facecolor='#FFFFFF'))
        elif itype == 'shield':
            # Whistleblower shield with lock
            ax.add_patch(Polygon([[ix, iy + 0.65], [ix + 0.6, iy + 0.3], [ix + 0.45, iy - 0.6], 
                                  [ix, iy - 0.8], [ix - 0.45, iy - 0.6], [ix - 0.6, iy + 0.3]], facecolor='#FFFFFF'))
            ax.add_patch(Circle((ix, iy - 0.05), 0.18, facecolor='#080E1A'))
        elif itype == 'doc':
            # Document page
            ax.add_patch(Rectangle((ix - 0.4, iy - 0.6), 0.8, 1.2, facecolor='#FFFFFF'))
            ax.plot([ix - 0.25, ix + 0.25], [iy + 0.3, iy + 0.3], color='#080E1A', lw=1)
            ax.plot([ix - 0.25, ix + 0.25], [iy, iy], color='#080E1A', lw=1)
            ax.plot([ix - 0.25, ix + 0.1], [iy - 0.3, iy - 0.3], color='#080E1A', lw=1)
        elif itype == 'brain':
            # AI / NLP Brain
            ax.add_patch(Circle((ix, iy), 0.5, facecolor='#FFFFFF'))
            ax.plot([ix - 0.6, ix + 0.6], [iy, iy], color='#080E1A', lw=1)
            ax.plot([ix, ix], [iy - 0.6, iy + 0.6], color='#080E1A', lw=1)
            ax.plot([ix - 0.4, ix + 0.4], [iy + 0.4, iy - 0.4], color='#080E1A', lw=1)
        elif itype == 'timer':
            # Clock / SLA
            ax.add_patch(Circle((ix, iy), 0.6, facecolor='#FFFFFF'))
            ax.add_patch(Circle((ix, iy), 0.48, facecolor='#080E1A'))
            ax.plot([ix, ix], [iy, iy + 0.35], color='#F59E0B', lw=1.5)
            ax.plot([ix, ix + 0.25], [iy, iy], color='#F59E0B', lw=1.5)
        elif itype == 'book':
            # Statutory law book
            ax.add_patch(Polygon([[ix - 0.55, iy + 0.4], [ix, iy + 0.25], [ix + 0.55, iy + 0.4],
                                  [ix + 0.55, iy - 0.45], [ix, iy - 0.3], [ix - 0.55, iy - 0.45]], facecolor='#FFFFFF'))
            ax.plot([ix, ix], [iy + 0.25, iy - 0.3], color='#080E1A', lw=1.2)
        elif itype == 'officer':
            # Officer / Judge
            ax.add_patch(Circle((ix, iy + 0.35), 0.35, facecolor='#FFFFFF'))
            ax.add_patch(Polygon([[ix - 0.6, iy - 0.55], [ix + 0.6, iy - 0.55], 
                                  [ix + 0.4, iy], [ix - 0.4, iy]], facecolor='#FFFFFF'))
            ax.plot([ix - 0.15, ix + 0.15], [iy - 0.2, iy - 0.2], color='#065F46', lw=1.2)
        elif itype == 'queue':
            # List / Queue with check
            ax.add_patch(Rectangle((ix - 0.5, iy - 0.55), 1.0, 1.1, facecolor='#FFFFFF'))
            ax.plot([ix - 0.3, ix - 0.1], [iy + 0.2, iy + 0.2], color='#10B981', lw=1.5)
            ax.plot([ix + 0.05, ix + 0.3], [iy + 0.2, iy + 0.2], color='#080E1A', lw=1)
            ax.plot([ix - 0.3, ix - 0.1], [iy - 0.1, iy - 0.1], color='#10B981', lw=1.5)
            ax.plot([ix + 0.05, ix + 0.3], [iy - 0.1, iy - 0.1], color='#080E1A', lw=1)
        elif itype == 'gavel':
            # Hearing / Gavel
            ax.add_patch(Rectangle((ix - 0.45, iy + 0.1), 0.9, 0.4, facecolor='#FFFFFF', angle=25))
            ax.plot([ix, ix - 0.4], [iy + 0.1, iy - 0.5], color='#FFFFFF', lw=2)
        elif itype == 'seal':
            # University Decree / Gold Seal
            ax.add_patch(Circle((ix, iy), 0.55, facecolor='#EAB308'))
            ax.add_patch(Circle((ix, iy), 0.4, facecolor='#080E1A'))
            ax.add_patch(Polygon([[ix - 0.25, iy - 0.3], [ix - 0.4, iy - 0.7], [ix - 0.1, iy - 0.5]], facecolor='#EAB308'))
            ax.add_patch(Polygon([[ix + 0.25, iy - 0.3], [ix + 0.4, iy - 0.7], [ix + 0.1, iy - 0.5]], facecolor='#EAB308'))
        elif itype == 'appeal':
            # Scales of justice / Appeal
            ax.plot([ix - 0.45, ix + 0.45], [iy + 0.3, iy + 0.3], color='#FFFFFF', lw=1.5)
            ax.plot([ix, ix], [iy + 0.45, iy - 0.5], color='#FFFFFF', lw=1.5)
            ax.plot([ix - 0.35, ix - 0.35], [iy + 0.3, iy], color='#FFFFFF', lw=1)
            ax.plot([ix + 0.35, ix + 0.35], [iy + 0.3, iy], color='#FFFFFF', lw=1)
        elif itype == 'chart':
            # Analytics bar chart
            ax.add_patch(Rectangle((ix - 0.45, iy - 0.45), 0.22, 0.4, facecolor='#818CF8'))
            ax.add_patch(Rectangle((ix - 0.15, iy - 0.45), 0.22, 0.7, facecolor='#818CF8'))
            ax.add_patch(Rectangle((ix + 0.15, iy - 0.45), 0.22, 0.95, facecolor='#818CF8'))

    # ==========================================
    # TIER 1: CLIENT PRESENTATION & INTAKE
    # ==========================================
    tier1_bg = FancyBboxPatch((3.5, 71.5), 93, 17.5, boxstyle="round,pad=0.5,rounding_size=1.0",
                              linewidth=1.2, edgecolor=c_blue_border, facecolor=c_blue_bg)
    ax.add_patch(tier1_bg)
    ax.text(5.5, 87.2, "TIER 1: CLIENT PRESENTATION & STUDENT INTAKE LAYER", 
            color=c_blue_border, fontsize=9.2, weight='bold')
    ax.text(94.5, 87.2, "REACT 18 • TAILWIND CSS • ZERORetaliation PROTOCOL", 
            color='#64748B', fontsize=6.8, weight='bold', ha='right')

    draw_card(5.5, 72.8, 28, 12.8, "5-Step Structured Wizard", [
        "Category selection & incident particulars",
        "Chronological statement of grievance",
        "Specific relief / remediation requested",
        "Statutory declaration veracity sign-off"
    ], 'user', c_blue_border, '#091322')

    draw_card(36.0, 72.8, 28, 12.8, "Whistleblower Identity Shield", [
        "Confidential identity cryptographic masking",
        "Complete protection from faculty bias",
        "Instant unique Docket Token generation",
        "Confidential 4-digit PIN authentication"
    ], 'shield', c_blue_border, '#091322')

    draw_card(66.5, 72.8, 28, 12.8, "Evidentiary Proof Dropzone", [
        "Multi-document file upload (PDF/PNG)",
        "Fee challans & duplicate debit logs",
        "Medical sanction certificates",
        "Evaluated examination script scans"
    ], 'doc', c_blue_border, '#091322')

    # Arrow 1 -> 2
    arrow1 = FancyArrowPatch((50, 71.3), (50, 68.2), arrowstyle='simple,head_width=5,head_length=6',
                             color='#F59E0B', lw=1.2)
    ax.add_patch(arrow1)
    ax.text(52, 69.8, "HTTPS / JSON Payload — Verified Intake Docket Token (APX-2026-GRV-****)", 
            color='#FCD34D', fontsize=6.8, weight='bold')

    # ==========================================
    # TIER 2: INTELLIGENT POLICY TRIAGE AGENT
    # ==========================================
    tier2_bg = FancyBboxPatch((3.5, 49.5), 93, 18.0, boxstyle="round,pad=0.5,rounding_size=1.0",
                              linewidth=1.2, edgecolor=c_amber_border, facecolor=c_amber_bg)
    ax.add_patch(tier2_bg)
    ax.text(5.5, 65.7, "TIER 2: INTELLIGENT POLICY TRIAGE & DECISION-SUPPORT AGENT", 
            color=c_amber_border, fontsize=9.2, weight='bold')
    ax.text(94.5, 65.7, "DETERMINISTIC NLP • ZERO HALLUCINATIONS • STATUTORY SLA", 
            color='#64748B', fontsize=6.8, weight='bold', ha='right')

    draw_card(5.5, 50.8, 28, 13.2, "Deterministic NLP Classifier", [
        "Domain-specific token & trigger lexicons",
        "Automated routing to 7 jurisdictions",
        ">94% precision deterministic classification",
        "Eliminates generative AI hallucinations"
    ], 'brain', c_amber_border, '#1A1203')

    draw_card(36.0, 50.8, 28, 13.2, "Urgency & Severity Matrix", [
        "Multi-variable sentiment & risk score (1-10)",
        "P1 Critical (24h Turnaround SLA)",
        "P2 High (48h), P3 Medium (5d), P4 (10d)",
        "Watchdog auto-escalation to Ombudsperson"
    ], 'timer', c_amber_border, '#1A1203')

    draw_card(66.5, 50.8, 28, 13.2, "Statutory Bylaws Matcher", [
        "UGC Grievance Regulations, 2023",
        "University Academic Ordinance 14-B",
        "Examination Admit Code Sec 8.3",
        "Automated decree recommendations"
    ], 'book', c_amber_border, '#1A1203')

    # Arrow 2 -> 3
    arrow2 = FancyArrowPatch((50, 49.3), (50, 46.2), arrowstyle='simple,head_width=5,head_length=6',
                             color='#10B981', lw=1.2)
    ax.add_patch(arrow2)
    ax.text(52, 47.8, "Triaged Docket Queue & Institutional Decision Support Decrees", 
            color='#6EE7B7', fontsize=6.8, weight='bold')

    # ==========================================
    # TIER 3: COMMITTEE & OFFICER WORKBENCH
    # ==========================================
    tier3_bg = FancyBboxPatch((3.5, 27.5), 93, 18.0, boxstyle="round,pad=0.5,rounding_size=1.0",
                              linewidth=1.2, edgecolor=c_emerald_border, facecolor=c_emerald_bg)
    ax.add_patch(tier3_bg)
    ax.text(5.5, 43.7, "TIER 3: STANDING COMMITTEE & OFFICER ADJUDICATION WORKBENCH", 
            color=c_emerald_border, fontsize=9.2, weight='bold')
    ax.text(94.5, 43.7, "ROLE CONSOLES • LIVE SLA TIMER • QUASI-JUDICIAL POWERS", 
            color='#64748B', fontsize=6.8, weight='bold', ha='right')

    draw_card(5.5, 28.8, 28, 13.2, "Role-Based Adjudicator Consoles", [
        "Dean of Academic Affairs (Academics)",
        "Controller of Examinations (COE)",
        "Chief Warden & Dean Student Welfare",
        "Internal Complaints Committee (ICC)"
    ], 'officer', c_emerald_border, '#041610')

    draw_card(36.0, 28.8, 28, 13.2, "Live Docket & SLA Countdown", [
        "Status queues: Intake, Review, Hearing",
        "Remaining turnaround countdown clock",
        "Visual warning flags upon SLA breach",
        "Confidential evidentiary file viewer"
    ], 'queue', c_emerald_border, '#041610')

    draw_card(66.5, 28.8, 28, 13.2, "Hearing & Order Composer", [
        "Formal hearing summons scheduler",
        "Interlocutory remedial directives",
        "Statutory decree editor with citations",
        "Official digital seal & order enactment"
    ], 'gavel', c_emerald_border, '#041610')

    # Arrow 3 -> 4
    arrow3 = FancyArrowPatch((50, 27.3), (50, 24.2), arrowstyle='simple,head_width=5,head_length=6',
                             color='#818CF8', lw=1.2)
    ax.add_patch(arrow3)
    ax.text(52, 25.8, "Enacted Resolution Order & Chronological Lifecycle Audit Event", 
            color='#A5B4FC', fontsize=6.8, weight='bold')

    # ==========================================
    # TIER 4: RESOLUTION DECREE, APPEALS & AUDIT
    # ==========================================
    tier4_bg = FancyBboxPatch((3.5, 8.5), 93, 15.0, boxstyle="round,pad=0.5,rounding_size=1.0",
                              linewidth=1.2, edgecolor=c_indigo_border, facecolor=c_indigo_bg)
    ax.add_patch(tier4_bg)
    ax.text(5.5, 21.8, "TIER 4: RESOLUTION DECREE, APPEALS & AUDIT GOVERNANCE TIER", 
            color=c_indigo_border, fontsize=9.2, weight='bold')
    ax.text(94.5, 21.8, "DIGITAL SEALS • FIRST APPEALS • IMMUTABLE AUDIT TRAIL", 
            color='#64748B', fontsize=6.8, weight='bold', ha='right')

    draw_card(5.5, 9.6, 28, 10.8, "Certified Resolution Decrees", [
        "Official university letterhead & insignia",
        "Statutory citations & numbered orders",
        "Digital signature & gold authority seal"
    ], 'seal', c_indigo_border, '#0E0922')

    draw_card(36.0, 9.6, 28, 10.8, "Statutory First Appeal Desk", [
        "Direct escalation to University Ombuds",
        "Independent second-tier judicial review",
        "1-to-5 star student satisfaction feedback"
    ], 'appeal', c_indigo_border, '#0E0922')

    draw_card(66.5, 9.6, 28, 10.8, "Institutional Public Analytics", [
        "Real-time redressal rate tracking (96.4%)",
        "Average turnaround time (2.6 days)",
        "Category distribution & SLA compliance"
    ], 'chart', c_indigo_border, '#0E0922')

    # ==========================================
    # BOTTOM CROSS-CUTTING ARCHITECTURE STRIP
    # ==========================================
    base_strip = FancyBboxPatch((3.5, 2.5), 93, 4.8, boxstyle="round,pad=0.3,rounding_size=0.6",
                                linewidth=1.0, edgecolor='#C59B27', facecolor='#0B132B')
    ax.add_patch(base_strip)

    # Storage cylinder icon
    ax.add_patch(Rectangle((5.5, 3.4), 1.2, 2.2, facecolor='#C59B27'))
    ax.add_patch(Circle((6.1, 5.6), 0.6, facecolor='#E2E8F0'))
    ax.add_patch(Circle((6.1, 4.5), 0.6, facecolor='#E2E8F0'))
    ax.add_patch(Circle((6.1, 3.4), 0.6, facecolor='#E2E8F0'))

    ax.text(8.0, 5.2, "CROSS-CUTTING SYSTEM INFRASTRUCTURE & DATA PERSISTENCE", 
            color='#C59B27', fontsize=7.5, weight='bold')
    ax.text(8.0, 3.6, "LocalStorage Abstraction Layer • In-Memory Seeded Cases • Node.js Express 4 REST API • SHA-256 Hash Verification • UGC 2023 & ISO 9001:2015 Benchmark", 
            color='#CBD5E1', fontsize=6.2)

    output_png = "architecture_diagram_with_pictures.png"
    plt.tight_layout()
    plt.savefig(output_png, dpi=300, bbox_inches='tight', facecolor='#080E1A')
    plt.close()
    print(f"Generated pictorial architecture diagram image: {output_png}")
    return output_png

if __name__ == '__main__':
    generate_diagram()
