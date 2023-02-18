import { PDFViewer as PDFViewerRenderer } from '@react-pdf/renderer';
import { ComponentProps, FC, useDeferredValue, useEffect, useState } from 'react';
import { useAsync } from 'react-use';

import { proxy, wrap } from 'comlink';
import type { WorkerType } from './workers/pdf.worker';
import Worker from './workers/pdf.worker?worker';

export const pdfWorker = wrap<WorkerType>(new Worker());
pdfWorker.onProgress(proxy((info: any) => console.log(info)));

export const useRenderPDF = ({ text }: Parameters<WorkerType['renderPDFInWorker']>[0]) => {
  const {
    value: url,
    loading,
    error,
  } = useAsync(async () => {
    return pdfWorker.renderPDFInWorker({ text });
  }, [text]);

  useEffect(() => (url ? () => URL.revokeObjectURL(url) : undefined), [url]);
  return { url, loading, error };
};
