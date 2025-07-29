import { NextResponse } from 'next/server';
import { PDFDocument, StandardFonts, rgb } from 'pdf-lib';

interface CertificateRequest {
  name: string;
  color: string;
  forms: string[];
  portrait?: string | null;
}

export async function POST(req: Request) {
  try {
    const { name, color, forms }: CertificateRequest = await req.json();
    // Create a new PDF document
    const pdf = await PDFDocument.create();
    const page = pdf.addPage([612, 792]); // US Letter in points
    const { width, height } = page.getSize();
    // Embed a standard font
    const font = await pdf.embedFont(StandardFonts.Helvetica);
    // Draw background rectangle
    page.drawRectangle({ x: 0, y: 0, width, height, color: rgb(0, 0, 0) });
    // Title
    page.drawText('Jedi Certificate', {
      x: 50,
      y: height - 80,
      size: 32,
      font,
      color: rgb(1, 1, 1),
    });
    // Name
    page.drawText(`Name: ${name}`, {
      x: 50,
      y: height - 130,
      size: 20,
      font,
      color: rgb(0.8, 0.8, 0.8),
    });
    // Lightsaber colour
    page.drawText(`Lightsaber Colour: ${color}`, {
      x: 50,
      y: height - 160,
      size: 18,
      font,
      color: rgb(0.8, 0.8, 0.8),
    });
    // Forms
    page.drawText('Forms:', {
      x: 50,
      y: height - 190,
      size: 18,
      font,
      color: rgb(0.8, 0.8, 0.8),
    });
    forms.forEach((form, idx) => {
      page.drawText(`- ${form}`, {
        x: 70,
        y: height - 210 - idx * 20,
        size: 16,
        font,
        color: rgb(0.7, 0.7, 0.7),
      });
    });
    // Certification note
    page.drawText('This certificate recognises your completion of the Jedi Path Quiz.', {
      x: 50,
      y: 80,
      size: 12,
      font,
      color: rgb(0.6, 0.6, 0.6),
    });
    const pdfBytes = await pdf.save();
    return new NextResponse(Buffer.from(pdfBytes), {
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="jedi-certificate.pdf"',
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to create certificate' }, { status: 500 });
  }
}