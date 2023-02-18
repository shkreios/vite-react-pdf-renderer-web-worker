import { expose } from 'comlink';
import type { PDFProps } from '../PDF';
import './workerShim';
let log = console.info;

const renderPDFInWorker = async (props: PDFProps) => {
  try {
    const { renderPDF } = await import('../renderPDF');
    return URL.createObjectURL(await renderPDF(props));
  } catch (error) {
    log(error);
    throw error;
  }
};

const onProgress = (cb: typeof console.info) => (log = cb);

expose({ renderPDFInWorker: renderPDFInWorker, onProgress });

export type WorkerType = {
  renderPDFInWorker: typeof renderPDFInWorker;
  onProgress: typeof onProgress;
};
