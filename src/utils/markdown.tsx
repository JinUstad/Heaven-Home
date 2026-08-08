import React from 'react';

/**
 * Normalizes unclosed formatting tags and parses inline markdown tokens:
 * - ***bold italic***
 * - **bold** or __bold__
 * - *italic* or _italic_
 * - `code`
 * - [link](url)
 */
export function parseInlineMarkdown(text: string): React.ReactNode {
  if (!text) return text;

  // Auto-balance single unclosed ** markers so **text becomes **text**
  let processed = text;
  const boldPairs = (processed.match(/\*\*/g) || []).length;
  if (boldPairs % 2 !== 0) {
    processed = processed + '**';
  }

  // Auto-balance single unclosed __ markers
  const underPairs = (processed.match(/__/g) || []).length;
  if (underPairs % 2 !== 0) {
    processed = processed + '__';
  }

  // Match markdown tokens
  const regex = /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|__[^_]+__|\*[^*]+\*|_[^_]+_|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;

  const parts = processed.split(regex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Bold + Italic: ***text***
    if (part.startsWith('***') && part.endsWith('***') && part.length >= 6) {
      const inner = part.slice(3, -3);
      return (
        <strong key={index} className="font-bold text-gray-900">
          <em className="italic">{inner}</em>
        </strong>
      );
    }

    // Bold: **text** or __text__
    if (
      (part.startsWith('**') && part.endsWith('**') && part.length >= 4) ||
      (part.startsWith('__') && part.endsWith('__') && part.length >= 4)
    ) {
      const inner = part.slice(2, -2);
      return (
        <strong key={index} className="font-bold text-gray-900">
          {inner}
        </strong>
      );
    }

    // Italic: *text* or _text_
    if (
      (part.startsWith('*') && part.endsWith('*') && part.length >= 2) ||
      (part.startsWith('_') && part.endsWith('_') && part.length >= 2)
    ) {
      const inner = part.slice(1, -1);
      return (
        <em key={index} className="italic text-gray-800">
          {inner}
        </em>
      );
    }

    // Inline Code: `code`
    if (part.startsWith('`') && part.endsWith('`') && part.length >= 2) {
      const inner = part.slice(1, -1);
      return (
        <code
          key={index}
          className="bg-gray-100 text-gray-800 text-xs px-1.5 py-0.5 rounded font-mono border border-gray-200"
        >
          {inner}
        </code>
      );
    }

    // Links: [title](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, linkText, url] = linkMatch;
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--primary)] font-semibold underline hover:text-emerald-800 transition-colors"
        >
          {linkText}
        </a>
      );
    }

    return part;
  });
}

/**
 * Renders multiline markdown text into structured React nodes with
 * full block-level support (Headings, Lists, Blockquotes, Paragraphs)
 * and rich inline styling (Bold, Italic, Links, Code).
 */
export function renderRichMarkdown(text: string, options?: { isBlog?: boolean }): React.ReactNode[] {
  if (!text) return [];

  const lines = text.split('\n');
  const elements: React.ReactNode[] = [];

  lines.forEach((line, idx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      elements.push(<div key={`spacer-${idx}`} className={options?.isBlog ? "h-3" : "h-1.5"} />);
      return;
    }

    // Heading 1: # Title
    if (trimmed.startsWith('# ')) {
      elements.push(
        <h2
          key={idx}
          className={
            options?.isBlog
              ? "text-2xl sm:text-3xl font-serif font-bold text-gray-900 mt-6 mb-3"
              : "text-lg sm:text-xl font-serif font-bold text-gray-900 mt-5 mb-2"
          }
        >
          {parseInlineMarkdown(trimmed.slice(2))}
        </h2>
      );
      return;
    }

    // Heading 2: ## Section
    if (trimmed.startsWith('## ')) {
      elements.push(
        <h3
          key={idx}
          className={
            options?.isBlog
              ? "text-xl sm:text-2xl font-serif font-bold text-[var(--primary)] mt-5 mb-2.5"
              : "text-base sm:text-lg font-serif font-bold text-[var(--primary)] mt-4 mb-1.5"
          }
        >
          {parseInlineMarkdown(trimmed.slice(3))}
        </h3>
      );
      return;
    }

    // Heading 3: ### Sub-section
    if (trimmed.startsWith('### ')) {
      elements.push(
        <h4
          key={idx}
          className={
            options?.isBlog
              ? "text-lg font-serif font-bold text-gray-800 mt-4 mb-2"
              : "text-sm sm:text-base font-serif font-bold text-gray-900 mt-3 mb-1"
          }
        >
          {parseInlineMarkdown(trimmed.slice(4))}
        </h4>
      );
      return;
    }

    // Standalone Bold Heading line (e.g., "**One Dispenser, Two Convenient Functions**" or "**One Dispenser, Two Convenient Functions")
    const boldHeadingMatch = trimmed.match(/^\*\*([^*]+)\*\*?$/);
    if (boldHeadingMatch) {
      const headingContent = boldHeadingMatch[1].trim();
      elements.push(
        <h3
          key={idx}
          className={
            options?.isBlog
              ? "text-xl sm:text-2xl font-serif font-bold text-gray-900 mt-6 mb-3"
              : "text-base sm:text-lg font-serif font-bold text-gray-900 mt-4 mb-1.5"
          }
        >
          {parseInlineMarkdown(headingContent)}
        </h3>
      );
      return;
    }

    // Blockquote: > Quote
    if (trimmed.startsWith('> ')) {
      elements.push(
        <blockquote
          key={idx}
          className="border-l-4 border-[var(--primary)] pl-4 py-2 my-3 italic text-gray-700 bg-gray-50 rounded-r-lg text-sm sm:text-base font-serif"
        >
          {parseInlineMarkdown(trimmed.slice(2))}
        </blockquote>
      );
      return;
    }

    // Bulleted list: - Item or * Item
    if (trimmed.startsWith('- ') || trimmed.startsWith('* ')) {
      elements.push(
        <li key={idx} className="ml-5 list-disc text-gray-700 my-1 text-sm sm:text-base leading-relaxed">
          {parseInlineMarkdown(trimmed.slice(2))}
        </li>
      );
      return;
    }

    // Numbered list: 1. Item
    if (/^\d+\.\s/.test(trimmed)) {
      elements.push(
        <li key={idx} className="ml-5 list-decimal text-gray-700 my-1 text-sm sm:text-base leading-relaxed">
          {parseInlineMarkdown(trimmed.replace(/^\d+\.\s/, ''))}
        </li>
      );
      return;
    }

    // Regular paragraph with inline bold, italic, links, etc.
    elements.push(
      <p
        key={idx}
        className={
          options?.isBlog
            ? "text-gray-700 text-base sm:text-lg leading-relaxed my-2.5 font-normal"
            : "text-gray-600 text-sm sm:text-base leading-relaxed my-1"
        }
      >
        {parseInlineMarkdown(trimmed)}
      </p>
    );
  });

  return elements;
}
