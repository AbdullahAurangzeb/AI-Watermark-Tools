import React from 'react';
import { TOOL_CONFIGS } from '../data/toolConfigs';
import { ToolPageShell } from '../components/tools/ToolPageShell';

export function ClaudeToolPage() {
  return <ToolPageShell config={TOOL_CONFIGS.claude} />;
}
