import React from 'react';

interface CopilotIframeProps {
  botId?: string;
  language?: string;
  height?: string | number;
}

// Simple, secure Copilot iframe component. Uses NEXT_PUBLIC_COPILOT_BOT_ID by default.
export const CopilotIframe: React.FC<CopilotIframeProps> = ({
  botId,
  language = 'en',
  height = 600
}) => {
  const id = botId || process.env.NEXT_PUBLIC_COPILOT_BOT_ID || '';
  const src = id ? `https://copilot.microsoft.com/embedded/${encodeURIComponent(id)}?lang=${encodeURIComponent(language)}` : '';

  return (
    <div className="copilot-iframe-wrapper" style={{ width: '100%', height }}>
      {src ? (
        <iframe
          title="Copilot Assistant"
          src={src}
          style={{ border: 'none', width: '100%', height: '100%' }}
          sandbox="allow-scripts allow-same-origin allow-forms allow-popups"
          loading="lazy"
        />
      ) : (
        <div className="text-muted">Copilot not configured.</div>
      )}
    </div>
  );
};

export default CopilotIframe;
