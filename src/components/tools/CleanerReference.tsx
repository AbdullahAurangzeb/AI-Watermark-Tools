import React from 'react';
import { CheckCircle2, Info } from 'lucide-react';
import { CLEANER_BEHAVIOR, CLEANER_NEVER_CHANGES } from '../../data/cleanerBehavior';

/**
 * Shared, implementation-accurate reference of what the cleaner removes,
 * normalizes, and intentionally keeps.
 */
export function CleanerReference() {
  return (
    <section className="space-y-6" aria-labelledby="cleaner-reference-heading">
      <div className="border-b border-slate-200 pb-3">
        <h2 id="cleaner-reference-heading" className="text-2xl font-bold text-slate-900 tracking-tight">
          What the cleaner removes, converts, and keeps
        </h2>
        <p className="text-sm text-slate-500 mt-1">
          Exactly what happens when you press clean, with the default settings used on every tool page.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {CLEANER_BEHAVIOR.map((group) => (
          <div key={group.title} className="p-5 rounded-2xl bg-white border border-slate-200/80 space-y-2">
            <h3 className="text-base font-semibold text-slate-900">{group.title}</h3>
            <p className="text-xs text-slate-500">{group.summary}</p>
            <ul className="space-y-1.5 text-sm text-slate-600 pt-1">
              {group.items.map((item) => (
                <li key={item} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" aria-hidden="true" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <p className="flex items-start gap-2 text-sm text-slate-600 leading-relaxed p-4 rounded-xl bg-slate-50 border border-slate-200">
        <Info className="w-4 h-4 text-indigo-600 shrink-0 mt-0.5" aria-hidden="true" />
        <span>{CLEANER_NEVER_CHANGES}</span>
      </p>
    </section>
  );
}
