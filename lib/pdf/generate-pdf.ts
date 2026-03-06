import ReactPDF from '@react-pdf/renderer';
import { GuiaIANegociosPDF } from './guia-ia-negocios';
import React from 'react';

/**
 * Generates the IA business guide PDF as a Buffer.
 * Used by the email sending API to attach as PDF.
 */
export async function generateGuiaPDFBuffer(): Promise<Buffer> {
  const pdfStream = await ReactPDF.renderToStream(
    React.createElement(GuiaIANegociosPDF)
  );

  const chunks: Uint8Array[] = [];
  for await (const chunk of pdfStream) {
    chunks.push(chunk as Uint8Array);
  }

  return Buffer.concat(chunks);
}

/**
 * Generates the PDF and returns it as a base64 string.
 * Useful for Resend email attachments.
 */
export async function generateGuiaPDFBase64(): Promise<string> {
  const buffer = await generateGuiaPDFBuffer();
  return buffer.toString('base64');
}
