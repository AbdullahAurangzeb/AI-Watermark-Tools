import React, { Fragment, ReactNode } from 'react';
import { Link } from '../../router/RouterContext';

function renderInline(text: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\[([^\]]+)\]\(([^)]+)\)|\*\*([^*]+)\*\*|`([^`]+)`)/g;
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = pattern.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }

    if (match[2] && match[3]) {
      const href = match[3];
      const label = match[2];
      if (href.startsWith('/')) {
        nodes.push(
          <Link key={`link-${key++}`} to={href} className="text-indigo-600 font-semibold underline hover:text-indigo-800">
            {label}
          </Link>
        );
      } else {
        nodes.push(
          <a
            key={`ext-${key++}`}
            href={href}
            className="text-indigo-600 font-semibold underline hover:text-indigo-800"
            rel="noopener noreferrer"
            target="_blank"
          >
            {label}
          </a>
        );
      }
    } else if (match[4]) {
      nodes.push(
        <strong key={`b-${key++}`} className="font-semibold text-slate-900">
          {match[4]}
        </strong>
      );
    } else if (match[5]) {
      nodes.push(
        <code key={`c-${key++}`} className="text-[13px] bg-slate-100 px-1 py-0.5 rounded font-mono text-slate-800">
          {match[5]}
        </code>
      );
    }

    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes;
}

export function BlogContent({ content }: { content: string }) {
  const lines = content.trim().split('\n');
  const blocks: ReactNode[] = [];
  let listItems: string[] = [];
  let tableRows: string[] = [];
  let key = 0;

  const flushList = () => {
    if (listItems.length === 0) return;
    blocks.push(
      <ul key={`ul-${key++}`} className="list-disc pl-5 space-y-1.5 text-slate-700">
        {listItems.map((item, i) => (
          <li key={i}>{renderInline(item)}</li>
        ))}
      </ul>
    );
    listItems = [];
  };

  const flushTable = () => {
    if (tableRows.length === 0) return;
    const parsed = tableRows
      .map((row) =>
        row
          .split('|')
          .slice(1, -1)
          .map((cell) => cell.trim())
      )
      .filter((cells) => cells.length > 0 && !cells.every((cell) => /^[-:]+$/.test(cell)));

    if (parsed.length > 0) {
      const header = parsed[0];
      const body = parsed.slice(1);
      blocks.push(
        <div key={`table-${key++}`} className="overflow-x-auto">
          <table className="w-full text-sm text-left border-collapse">
            <thead>
              <tr>
                {header.map((cell, i) => (
                  <th key={i} className="border border-slate-200 bg-slate-50 px-3 py-2 font-semibold text-slate-900">
                    {renderInline(cell)}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {body.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={`${i}-${j}`} className="border border-slate-200 px-3 py-2 text-slate-700">
                      {renderInline(cell)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
    }
    tableRows = [];
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      flushTable();
      continue;
    }

    if (trimmed.startsWith('### ')) {
      flushList();
      flushTable();
      blocks.push(
        <h3 key={`h3-${key++}`} className="text-lg font-bold text-slate-900 pt-2">
          {renderInline(trimmed.slice(4))}
        </h3>
      );
      continue;
    }

    if (trimmed.startsWith('## ')) {
      flushList();
      flushTable();
      blocks.push(
        <h2 key={`h2-${key++}`} className="text-2xl font-bold text-slate-900 pt-4">
          {renderInline(trimmed.slice(3))}
        </h2>
      );
      continue;
    }

    if (trimmed.startsWith('|')) {
      flushList();
      tableRows.push(trimmed);
      continue;
    }

    if (trimmed.startsWith('* ') || trimmed.startsWith('- ')) {
      flushTable();
      listItems.push(trimmed.slice(2));
      continue;
    }

    const numbered = trimmed.match(/^\d+\.\s+(.*)$/);
    if (numbered) {
      flushTable();
      listItems.push(numbered[1]);
      continue;
    }

    flushList();
    flushTable();
    blocks.push(
      <p key={`p-${key++}`} className="text-slate-700 leading-relaxed">
        {renderInline(trimmed)}
      </p>
    );
  }

  flushList();
  flushTable();

  return <Fragment>{blocks}</Fragment>;
}
