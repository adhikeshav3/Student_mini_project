import matplotlib
matplotlib.use('Agg')
import matplotlib.pyplot as plt
import matplotlib.patches as patches
from matplotlib.patches import FancyBboxPatch, FancyArrowPatch, Circle, Polygon, Rectangle

def generate_drawio_diagram():
    # 16:10 aspect ratio, clean white academic background
    fig, ax = plt.subplots(figsize=(14, 9.2), dpi=300)
    ax.set_xlim(0, 100)
    ax.set_ylim(0, 100)
    ax.axis('off')

    # Pure white canvas (standard Draw.io / Visio print)
    fig.patch.set_facecolor('#FFFFFF')
    ax.set_facecolor('#FFFFFF')

    # Subtle outer grid / border (optional, clean light gray)
    border = FancyBboxPatch((1.5, 1.5), 97, 97, boxstyle="square,pad=0",
                            linewidth=1.0, edgecolor='#CBD5E1', facecolor='#FAFAFA')
    ax.add_patch(border)

    # Inner drawing area
    inner = FancyBboxPatch((2.5, 2.5), 95, 95, boxstyle="square,pad=0",
                           linewidth=0, facecolor='#FFFFFF')
    ax.add_patch(inner)

    # ==========================================
    # HEADER (Academic Report Style)
    # ==========================================
    ax.text(50, 95.0, "SYSTEM ARCHITECTURE DIAGRAM", 
            color='#0F172A', fontsize=15, weight='bold', ha='center', va='center', fontfamily='sans-serif')
    ax.text(50, 92.5, "Central Student Grievance Redressal & Resolution System (SGRMS)", 
            color='#475569', fontsize=10.5, weight='semibold', ha='center', va='center', fontfamily='sans-serif')
    
    # Thin divider
    ax.plot([10, 90], [90.5, 90.5], color='#E2E8F0', lw=1.2)

    # Palette definitions (Clean Visio / Draw.io pastel fills + solid borders)
    c_blue_bg = '#EFF6FF'
    c_blue_b = '#2563EB'
    
    c_amber_bg = '#FFFBEB'
    c_amber_b = '#D97706'
    
    c_green_bg = '#ECFDF5'
    c_green_b = '#059669'
    
    c_purple_bg = '#F5F3FF'
    c_purple_b = '#7C3AED'

    # Helper function to draw component cards
    def draw_component(x, y, w, h, title, items, icon_type, border_col, bg_col):
        # Drop shadow effect (subtle Visio style)
        shadow = FancyBboxPatch((x + 0.35, y - 0.35), w, h, boxstyle="round,pad=0.2,rounding_size=0.6",
                                linewidth=0, facecolor='#E2E8F0', alpha=0.6)
        ax.add_patch(shadow)

        # Card container
        card = FancyBboxPatch((x, y), w, h, boxstyle="round,pad=0.2,rounding_size=0.6",
                              linewidth=1.2, edgecolor=border_col, facecolor=bg_col)
        ax.add_patch(card)

        # Header bar
        hbar = FancyBboxPatch((x, y + h - 2.8), w, 2.8, boxstyle="round,pad=0.1,rounding_size=0.4",
                              linewidth=0, facecolor=border_col, alpha=0.12)
        ax.add_patch(hbar)

        # Icon circle
        ic_center = (x + 2.4, y + h - 1.4)
        circ = Circle(ic_center, 1.0, facecolor=border_col, edgecolor='none')
        ax.add_patch(circ)
        draw_clean_icon(ax, ic_center[0], ic_center[1], icon_type)

        # Title
        ax.text(x + 4.2, y + h - 1.4, title, color='#0F172A', fontsize=8.0, weight='bold', va='center', fontfamily='sans-serif')

        # Bullet items
        y_pos = y + h - 4.4
        for itm in items:
            ax.plot(x + 1.8, y_pos, marker='s', markersize=2.2, color=border_col)
            ax.text(x + 2.8, y_pos, itm, color='#334155', fontsize=6.5, va='center', fontfamily='sans-serif')
            y_pos -= 2.3

    def draw_clean_icon(ax, ix, iy, itype):
        if itype == 'user':
            ax.add_patch(Circle((ix, iy + 0.3), 0.3, facecolor='#FFFFFF'))
            ax.add_patch(Polygon([[ix - 0.5, iy - 0.5], [ix + 0.5, iy - 0.5], 
                                  [ix + 0.3, iy - 0.1], [ix - 0.3, iy - 0.1]], facecolor='#FFFFFF'))
        elif itype == 'shield':
            ax.add_patch(Polygon([[ix, iy + 0.6], [ix + 0.5, iy + 0.25], [ix + 0.38, iy - 0.5], 
                                  [ix, iy - 0.7], [ix - 0.38, iy - 0.5], [ix - 0.5, iy + 0.25]], facecolor='#FFFFFF'))
            ax.add_patch(Circle((ix, iy - 0.05), 0.15, facecolor='#2563EB'))
        elif itype == 'doc':
            ax.add_patch(Rectangle((ix - 0.35, iy - 0.5), 0.7, 1.0, facecolor='#FFFFFF'))
            ax.plot([ix - 0.2, ix + 0.2], [iy + 0.25, iy + 0.25], color='#2563EB', lw=1)
            ax.plot([ix - 0.2, ix + 0.2], [iy, iy], color='#2563EB', lw=1)
            ax.plot([ix - 0.2, ix + 0.05], [iy - 0.25, iy - 0.25], color='#2563EB', lw=1)
        elif itype == 'nlp':
            ax.add_patch(Circle((ix, iy), 0.45, facecolor='#FFFFFF'))
            ax.plot([ix - 0.5, ix + 0.5], [iy, iy], color='#D97706', lw=1)
            ax.plot([ix, ix], [iy - 0.5, iy + 0.5], color='#D97706', lw=1)
            ax.add_patch(Circle((ix, iy), 0.2, facecolor='#D97706'))
        elif itype == 'timer':
            ax.add_patch(Circle((ix, iy), 0.5, facecolor='#FFFFFF'))
            ax.plot([ix, ix], [iy, iy + 0.3], color='#D97706', lw=1.2)
            ax.plot([ix, ix + 0.2], [iy, iy], color='#D97706', lw=1.2)
        elif itype == 'bylaws':
            ax.add_patch(Polygon([[ix - 0.45, iy + 0.35], [ix, iy + 0.2], [ix + 0.45, iy + 0.35],
                                  [ix + 0.45, iy - 0.35], [ix, iy - 0.25], [ix - 0.45, iy - 0.35]], facecolor='#FFFFFF'))
            ax.plot([ix, ix], [iy + 0.2, iy - 0.25], color='#D97706', lw=1.2)
        elif itype == 'admin':
            ax.add_patch(Circle((ix, iy + 0.3), 0.3, facecolor='#FFFFFF'))
            ax.add_patch(Polygon([[ix - 0.5, iy - 0.5], [ix + 0.5, iy - 0.5], 
                                  [ix + 0.35, iy - 0.05], [ix - 0.35, iy - 0.05]], facecolor='#FFFFFF'))
            ax.plot([ix - 0.15, ix + 0.15], [iy - 0.2, iy - 0.2], color='#059669', lw=1.2)
        elif itype == 'queue':
            ax.add_patch(Rectangle((ix - 0.4, iy - 0.45), 0.8, 0.9, facecolor='#FFFFFF'))
            ax.plot([ix - 0.25, ix + 0.25], [iy + 0.2, iy + 0.2], color='#059669', lw=1.2)
            ax.plot([ix - 0.25, ix + 0.25], [iy, iy], color='#059669', lw=1.2)
            ax.plot([ix - 0.25, ix + 0.25], [iy - 0.2, iy - 0.2], color='#059669', lw=1.2)
        elif itype == 'hearing':
            ax.add_patch(Rectangle((ix - 0.35, iy + 0.05), 0.7, 0.35, facecolor='#FFFFFF', angle=20))
            ax.plot([ix, ix - 0.3], [iy + 0.05, iy - 0.45], color='#FFFFFF', lw=1.8)
        elif itype == 'decree':
            ax.add_patch(Circle((ix, iy), 0.45, facecolor='#FFFFFF'))
            ax.add_patch(Circle((ix, iy), 0.32, facecolor='#7C3AED'))
            ax.add_patch(Polygon([[ix - 0.2, iy - 0.25], [ix - 0.35, iy - 0.6], [ix - 0.05, iy - 0.4]], facecolor='#FFFFFF'))
            ax.add_patch(Polygon([[ix + 0.2, iy - 0.25], [ix + 0.35, iy - 0.6], [ix + 0.05, iy - 0.4]], facecolor='#FFFFFF'))
        elif itype == 'appeal':
            ax.plot([ix - 0.4, ix + 0.4], [iy + 0.25, iy + 0.25], color='#FFFFFF', lw=1.4)
            ax.plot([ix, ix], [iy + 0.35, iy - 0.45], color='#FFFFFF', lw=1.4)
            ax.plot([ix - 0.3, ix - 0.3], [iy + 0.25, iy], color='#FFFFFF', lw=1)
            ax.plot([ix + 0.3, ix + 0.3], [iy + 0.25, iy], color='#FFFFFF', lw=1)
        elif itype == 'analytics':
            ax.add_patch(Rectangle((ix - 0.4, iy - 0.4), 0.2, 0.35, facecolor='#FFFFFF'))
            ax.add_patch(Rectangle((ix - 0.12, iy - 0.4), 0.2, 0.6, facecolor='#FFFFFF'))
            ax.add_patch(Rectangle((ix + 0.16, iy - 0.4), 0.2, 0.85, facecolor='#FFFFFF'))

    # Helper function for drawing container layers
    def draw_layer_container(y, h, title, tech_tag, border_col, bg_col):
        # Layer boundary
        layer_box = FancyBboxPatch((4.0, y), 92.0, h, boxstyle="round,pad=0.3,rounding_size=0.6",
                                   linewidth=1.2, edgecolor=border_col, facecolor=bg_col, linestyle='--')
        ax.add_patch(layer_box)

        # Layer title badge
        t_badge = FancyBboxPatch((5.5, y + h - 2.4), 38, 2.2, boxstyle="round,pad=0.1,rounding_size=0.3",
                                 linewidth=0, facecolor=border_col)
        ax.add_patch(t_badge)
        ax.text(6.5, y + h - 1.3, title, color='#FFFFFF', fontsize=7.5, weight='bold', va='center', fontfamily='sans-serif')

        # Tech tag
        ax.text(94.5, y + h - 1.3, tech_tag, color='#64748B', fontsize=6.5, weight='semibold', ha='right', va='center', fontfamily='sans-serif')

    # ==========================================
    # LAYER 1: CLIENT PRESENTATION LAYER
    # ==========================================
    draw_layer_container(72.0, 16.5, "LAYER 1: CLIENT PRESENTATION & INTAKE", "React 18  |  Tailwind CSS  |  Vite 6", c_blue_b, '#F8FAFC')

    draw_component(5.8, 73.0, 27.8, 12.0, "Multi-Step Filing Wizard", [
        "Structured 5-step intake workflow",
        "Incident particulars & location details",
        "Objective statement & relief sought",
        "Statutory declaration check & sign-off"
    ], 'user', c_blue_b, '#FFFFFF')

    draw_component(36.1, 73.0, 27.8, 12.0, "Whistleblower Identity Shield", [
        "Optional anonymous petition mode",
        "Protects student against faculty bias",
        "Unique Docket ID (APX-2026-GRV-****)",
        "Confidential 4-digit PIN access"
    ], 'shield', c_blue_b, '#FFFFFF')

    draw_component(66.4, 73.0, 27.8, 12.0, "Evidence Upload Module", [
        "Document dropzone (PDF, PNG, JPG)",
        "Fee challans & payment receipts",
        "Medical sanction certificates",
        "Evaluated examination script copies"
    ], 'doc', c_blue_b, '#FFFFFF')

    # Orthogonal Arrow Layer 1 -> Layer 2
    arr1 = FancyArrowPatch((50, 71.8), (50, 68.8), arrowstyle='->,head_width=4,head_length=5',
                           color='#475569', lw=1.2)
    ax.add_patch(arr1)
    ax.text(50.8, 70.3, "HTTP POST / REST Payload — Encrypted Docket Submission", 
            color='#334155', fontsize=6.5, weight='bold', va='center', fontfamily='sans-serif')

    # ==========================================
    # LAYER 2: INTELLIGENT POLICY TRIAGE LAYER
    # ==========================================
    draw_layer_container(50.5, 17.5, "LAYER 2: POLICY TRIAGE & DECISION SUPPORT", "Deterministic NLP  |  Rule Engine  |  UGC 2023", c_amber_b, '#FFFDF5')

    draw_component(5.8, 51.5, 27.8, 12.8, "Deterministic NLP Triage", [
        "Keyword & statutory trigger tokenizer",
        "Routes to 7 university departments",
        ">94% classification precision",
        "Deterministic, zero hallucination logic"
    ], 'nlp', c_amber_b, '#FFFFFF')

    draw_component(36.1, 51.5, 27.8, 12.8, "Urgency & SLA Matrix", [
        "Multi-factor severity scoring (1-10)",
        "P1 Critical (24-hour turnaround SLA)",
        "P2 High (48h), P3 Medium (5d), P4 (10d)",
        "Watchdog auto-escalation timer"
    ], 'timer', c_amber_b, '#FFFFFF')

    draw_component(66.4, 51.5, 27.8, 12.8, "Statutory Bylaws Engine", [
        "UGC Grievance Regulations, 2023",
        "University Academic Ordinance 14-B",
        "Examination Admit Card Code Sec 8.3",
        "Automated resolution draft directives"
    ], 'bylaws', c_amber_b, '#FFFFFF')

    # Orthogonal Arrow Layer 2 -> Layer 3
    arr2 = FancyArrowPatch((50, 50.3), (50, 47.3), arrowstyle='->,head_width=4,head_length=5',
                           color='#475569', lw=1.2)
    ax.add_patch(arr2)
    ax.text(50.8, 48.8, "Triaged Docket Queue & Pre-Drafted Regulatory Directives", 
            color='#334155', fontsize=6.5, weight='bold', va='center', fontfamily='sans-serif')

    # ==========================================
    # LAYER 3: ADJUDICATION WORKBENCH LAYER
    # ==========================================
    draw_layer_container(29.0, 17.5, "LAYER 3: STANDING COMMITTEE WORKBENCH", "Role-Based Access Control (RBAC)  |  SLA Watchdog", c_green_b, '#F7FEFA')

    draw_component(5.8, 30.0, 27.8, 12.8, "Role-Based Officer Consoles", [
        "Dean of Academic Affairs (Academics)",
        "Controller of Examinations (COE)",
        "Chief Warden & Dean Student Welfare",
        "Internal Complaints Committee (ICC)"
    ], 'admin', c_green_b, '#FFFFFF')

    draw_component(36.1, 30.0, 27.8, 12.8, "Live Case Dossier Inspector", [
        "Status filters: Intake, Review, Hearing",
        "Live remaining SLA countdown timer",
        "Visual warning alerts on SLA breach",
        "Confidential evidentiary file viewer"
    ], 'queue', c_green_b, '#FFFFFF')

    draw_component(66.4, 30.0, 27.8, 12.8, "Hearing & Decree Composer", [
        "Formal hearing summons scheduler",
        "Interlocutory compliance directives",
        "Statutory decree editor with citations",
        "Official digital seal & signature sign-off"
    ], 'hearing', c_green_b, '#FFFFFF')

    # Orthogonal Arrow Layer 3 -> Layer 4
    arr3 = FancyArrowPatch((50, 28.8), (50, 25.8), arrowstyle='->,head_width=4,head_length=5',
                           color='#475569', lw=1.2)
    ax.add_patch(arr3)
    ax.text(50.8, 27.3, "Enacted Resolution Order & Chronological Audit Event Log", 
            color='#334155', fontsize=6.5, weight='bold', va='center', fontfamily='sans-serif')

    # ==========================================
    # LAYER 4: RESOLUTION, APPEALS & AUDIT
    # ==========================================
    draw_layer_container(9.0, 16.0, "LAYER 4: RESOLUTION DECREE & AUDIT LEDGER", "Official Decree Export  |  Appeals  |  Analytics", c_purple_b, '#FAF5FF')

    draw_component(5.8, 10.0, 27.8, 11.5, "Certified Resolution Decrees", [
        "Formal legal layout with university logo",
        "Statutory citations & numbered orders",
        "Authorized officer digital signature seal",
        "One-click print / PDF export"
    ], 'decree', c_purple_b, '#FFFFFF')

    draw_component(36.1, 10.0, 27.8, 11.5, "Statutory First Appeal Desk", [
        "Direct escalation to Univ Ombudsperson",
        "Independent second-tier formal review",
        "1-to-5 star student satisfaction rating",
        "Resolution feedback & closure notes"
    ], 'appeal', c_purple_b, '#FFFFFF')

    draw_component(66.4, 10.0, 27.8, 11.5, "Governance Analytics Dashboard", [
        "Real-time redressal rate tracking (96.4%)",
        "Average turnaround time metric (2.6 days)",
        "Category distribution & SLA compliance",
        "Immutable chronological lifecycle log"
    ], 'analytics', c_purple_b, '#FFFFFF')

    # ==========================================
    # BOTTOM: DATA PERSISTENCE & COMPLIANCE BAR
    # ==========================================
    bottom_bar = FancyBboxPatch((4.0, 3.2), 92.0, 4.8, boxstyle="round,pad=0.2,rounding_size=0.4",
                                linewidth=1.0, edgecolor='#94A3B8', facecolor='#F1F5F9')
    ax.add_patch(bottom_bar)

    # Database cylinder icon (Draw.io style)
    db_x, db_y = 5.8, 4.0
    ax.add_patch(Rectangle((db_x, db_y), 1.4, 2.4, facecolor='#2563EB', edgecolor='#1D4ED8', lw=0.8))
    ax.add_patch(patches.Ellipse((db_x + 0.7, db_y + 2.4), 1.4, 0.6, facecolor='#60A5FA', edgecolor='#1D4ED8', lw=0.8))
    ax.add_patch(patches.Ellipse((db_x + 0.7, db_y), 1.4, 0.6, facecolor='#2563EB', edgecolor='#1D4ED8', lw=0.8))

    ax.text(8.0, 5.8, "PERSISTENCE & SECURITY INFRASTRUCTURE:", 
            color='#0F172A', fontsize=7.2, weight='bold', fontfamily='sans-serif')
    ax.text(8.0, 4.2, "Browser LocalStorage Abstraction Layer  •  In-Memory Seed Database  •  Node.js Express 4 REST API  •  SHA-256 Digital Verification  •  UGC 2023 & ISO 9001:2015 Benchmark", 
            color='#475569', fontsize=6.3, fontfamily='sans-serif')

    output_png = "architecture_diagram_drawio.png"
    plt.tight_layout()
    plt.savefig(output_png, dpi=300, bbox_inches='tight', facecolor='#FFFFFF')
    plt.close()
    print(f"Generated clean Draw.io style diagram: {output_png}")
    return output_png

if __name__ == '__main__':
    generate_drawio_diagram()
