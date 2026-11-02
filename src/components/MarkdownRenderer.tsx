import React from 'react';

interface MarkdownRendererProps {
  content: string;
  className?: string;
}

export const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({
  content,
  className = '',
}) => {
  if (!content) return null;

  // Render inline formatting: **bold**, *italic*, `code`, and [label](url)
  const renderInline = (text: string): React.ReactNode[] => {
    const regex = /(`[^`]+`|\*\*[^*]+\*\*|\*[^*]+\*|\[[^\]]+\]\([^)]+\))/g;
    const parts = text.split(regex);

    return parts.map((part, index) => {
      if (!part) return null;

      // Inline code
      if (part.startsWith('`') && part.endsWith('`') && part.length > 2) {
        return (
          <code
            key={index}
            className="px-1.5 py-0.5 text-xs font-mono bg-slate-100 dark:bg-zinc-800 text-slate-800 dark:text-zinc-200 rounded border border-slate-200/60 dark:border-zinc-700 hover:border-blue-400 transition-colors inline-block"
          >
            {part.slice(1, -1)}
          </code>
        );
      }

      // Bold with subtle interactive hover
      if (part.startsWith('**') && part.endsWith('**') && part.length > 4) {
        return (
          <strong
            key={index}
            className="font-semibold text-slate-900 dark:text-zinc-100 hover:text-blue-600 dark:hover:text-blue-400 transition-colors cursor-text"
          >
            {part.slice(2, -2)}
          </strong>
        );
      }

      // Italic
      if (part.startsWith('*') && part.endsWith('*') && part.length > 2) {
        return (
          <em key={index} className="italic">
            {part.slice(1, -1)}
          </em>
        );
      }

      // Link: [text](url)
      if (part.startsWith('[') && part.includes('](') && part.endsWith(')')) {
        const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
        if (match) {
          const [, label, url] = match;
          const isSafeUrl = /^(https?:\/\/|mailto:|#|\/)/i.test(url);
          return (
            <a
              key={index}
              href={isSafeUrl ? url : '#'}
              target={url.startsWith('http') ? '_blank' : undefined}
              rel={url.startsWith('http') ? 'noopener noreferrer' : undefined}
              className="text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 underline underline-offset-4 decoration-blue-400/50 hover:decoration-blue-600 font-medium transition-all duration-150 hover:bg-blue-50/50 dark:hover:bg-blue-950/40 px-1 py-0.5 rounded"
            >
              {label}
            </a>
          );
        }
      }

      return <React.Fragment key={index}>{part}</React.Fragment>;
    });
  };

  // Split into block sections by double newlines
  const blocks = content.split(/\n\s*\n/);

  return (
    <div className={`space-y-3.5 text-slate-600 dark:text-zinc-300 leading-relaxed text-[15px] ${className}`}>
      {blocks.map((block, bIdx) => {
        const trimmed = block.trim();
        if (!trimmed) return null;

        // Check if block is an unordered list
        const lines = trimmed.split('\n');
        const isList = lines.every((line) => line.trim().startsWith('- ') || line.trim().startsWith('* '));

        if (isList) {
          return (
            <ul key={bIdx} className="space-y-2 my-2 ml-2 list-none">
              {lines.map((line, lIdx) => {
                const itemText = line.trim().replace(/^[-*]\s+/, '');
                return (
                  <li
                    key={lIdx}
                    className="flex items-start gap-2.5 p-1.5 rounded-lg hover:bg-white/60 dark:hover:bg-zinc-900/60 hover:translate-x-1 transition-all duration-200 group"
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-500/70 mt-2 shrink-0 group-hover:scale-125 group-hover:bg-blue-600 transition-all" />
                    <span className="flex-1 text-slate-700 dark:text-zinc-300 group-hover:text-slate-900 dark:group-hover:text-zinc-100 transition-colors">
                      {renderInline(itemText)}
                    </span>
                  </li>
                );
              })}
            </ul>
          );
        }

        // Regular paragraph with hover polish
        return (
          <p
            key={bIdx}
            className="leading-relaxed p-2 rounded-lg hover:bg-white/40 dark:hover:bg-zinc-900/30 transition-colors duration-150"
          >
            {lines.map((line, lIdx) => (
              <React.Fragment key={lIdx}>
                {lIdx > 0 && <br />}
                {renderInline(line)}
              </React.Fragment>
            ))}
          </p>
        );
      })}
    </div>
  );
};
