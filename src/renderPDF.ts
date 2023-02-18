import { createElement } from 'react';
import type { PDFProps } from './PDF';

export const renderPDF = async (props: PDFProps) => {
  const { pdf } = await import('@react-pdf/renderer');
  const { PDF } = await import('./PDF');
  // @ts-ignore
  return pdf(createElement(PDF, props)).toBlob();
};
