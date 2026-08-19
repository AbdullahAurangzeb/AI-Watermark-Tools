import React from 'react';
import { TOOL_CONFIGS } from '../data/toolConfigs';
import { ToolPageShell } from '../components/tools/ToolPageShell';

export function CleanerToolPage() {
  return <ToolPageShell config={TOOL_CONFIGS.cleaner} />;
}
