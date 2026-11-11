import os
import sys
from reportlab.lib.pagesizes import landscape, A4
from reportlab.lib import colors
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Image, Table, TableStyle
)
from reportlab.pdfgen import canvas
import pypdf

class LandscapeAcademicCanvas(canvas.Canvas):
    """Academic landscape canvas with running border and footer"""
    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self._saved_page_states = []

    def showPage(self):
        self._saved_page_states.append(dict(self.__dict__))
        self._startPage()

    def save(self):
        num_pages = len(self._saved_page_states)
        for state in self._saved_page_states:
            self.__dict__.update(state)
            self.draw_decorations(num_pages)
            super().showPage()
        super().save()

    def draw_decorations(self, total_pages):
        self.saveState()
        w, h = landscape(A4) # 841.89 x 595.28 pt

        navy = colors.HexColor('#0D1F3C')
        gold = colors.HexColor('#C59B27')
        sub_gray = colors.HexColor('#64748B')
        border_gray = colors.HexColor('#CBD5E1')

        # Outer framing border
        self.setStrokeColor(navy)
        self.setLineWidth(1.4)
        self.rect(16, 16, w - 32, h - 32)

        self.setStrokeColor(gold)
        self.setLineWidth(0.6)
        self.rect(19, 19, w - 38, h - 38)

        # Header running line
        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(navy)
        self.drawString(26, h - 30, "APEX UNIVERSITY  |  DIRECTORATE OF STUDENT AFFAIRS & OMBUDSPERSON")

        self.setFont("Helvetica-Bold", 7.5)
        self.setFillColor(gold)
        self.drawRightString(w - 26, h - 30, "B.TECH S7 MINI PROJECT | SYSTEM ARCHITECTURE DIAGRAM")

        self.setStrokeColor(border_gray)
        self.setLineWidth(0.5)
        self.line(26, h - 34, w - 26, h - 34)

        # Footer running line
        self.line(26, 31, w - 26, 31)
        self.setFont("Helvetica", 6.8)
        self.setFillColor(sub_gray)
        self.drawString(26, 22, "Intelligent Student Grievance Resolution Agent (SGRMS)  |  UGC Regulations 2023 Compliant  |  ISO 9001:2015 Benchmark")

        self.setFont("Helvetica-Bold", 6.8)
        self.setFillColor(navy)
        self.drawRightString(w - 26, 22, f"ARCHITECTURE SPECIFICATION  |  PAGE {self._pageNumber} OF {total_pages}")

        self.restoreState()

def build_pdf():
    pdf_filename = "ARCHITECTURE_DIAGRAM.pdf"
    img_filename = "architecture_diagram_with_pictures.png"

    w_page, h_page = landscape(A4) # 841.89 x 595.28 pt

    # Doc template with margins: left 24, right 24, top 38, bottom 36
    # Printable area: 841.89 - 48 = 793.89 pt wide; 595.28 - 74 = 521.28 pt high
    doc = SimpleDocTemplate(
        pdf_filename,
        pagesize=landscape(A4),
        leftMargin=24,
        rightMargin=24,
        topMargin=38,
        bottomMargin=36
    )

    story = []

    # Target image width & height preserving 4170 : 2820 aspect ratio (1.4787)
    avail_w = 770.0
    avail_h = 498.0

    target_h = avail_h
    target_w = target_h * (4170.0 / 2820.0) # ~736 pt

    diagram_img = Image(img_filename, width=target_w, height=target_h)
    diagram_img.hAlign = 'CENTER'

    story.append(diagram_img)

    doc.build(story, canvasmaker=LandscapeAcademicCanvas)

    # Verification of page count
    reader = pypdf.PdfReader(pdf_filename)
    page_count = len(reader.pages)
    print(f"Verified: '{pdf_filename}' generated with {page_count} page(s).")
    return page_count

if __name__ == '__main__':
    count = build_pdf()
    if count == 1:
        print("PERFECT: Architecture Diagram with pictures fits exactly on 1 page.")
    else:
        print(f"WARNING: Expected 1 page, got {count} pages!")
        sys.exit(1)
