import { FC, useState } from 'react';
import { RenderedPDFViewer } from './RenderedPDFViewer';
import { saveAs } from 'file-saver';
export const App: FC = () => {
  const [text, setText] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <input value={text} onChange={(e) => setText(e.target.value)} />
      <button
        onClick={async () => {
          const { renderPDF } = await import('./renderPDF');
          const blob = await renderPDF({ text });
          saveAs(blob, 'test.pdf');
        }}
      >
        Download
      </button>
      <RenderedPDFViewer
        style={{ backgroundColor: 'grey', width: '500px', height: '760px' }}
        text={text}
      />
    </div>
  );
};
