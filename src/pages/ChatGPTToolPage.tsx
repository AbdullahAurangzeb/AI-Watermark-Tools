import React from 'react';
import { TOOL_CONFIGS } from '../data/toolConfigs';
import { ToolPageShell } from '../components/tools/ToolPageShell';

export function ChatGPTToolPage() {
  return <ToolPageShell config={TOOL_CONFIGS.chatgpt} />;
}
