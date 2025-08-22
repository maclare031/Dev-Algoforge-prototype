// src/components/MarkdownCheatSheet.tsx

import { Lightbulb } from 'lucide-react';

export const MarkdownCheatSheet = () => (
  <div className="text-xs text-gray-400 bg-gray-900/50 p-3 rounded-md border border-gray-700/50">
    <div className="flex items-center font-semibold mb-2 text-gray-300">
      <Lightbulb className="w-4 h-4 mr-2 text-yellow-400" />
      Markdown Quick Guide
    </div>
    <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
      <li><code className="font-mono bg-gray-700/50 px-1 rounded-sm"># H1</code></li>
      <li><code className="font-mono bg-gray-700/50 px-1 rounded-sm">## H2</code></li>
      <li><code className="font-mono bg-gray-700/50 px-1 rounded-sm">**bold**</code></li>
      <li><code className="font-mono bg-gray-700/50 px-1 rounded-sm">*italic*</code></li>
      <li><code className="font-mono bg-gray-700/50 px-1 rounded-sm">`code`</code></li>
      <li><code className="font-mono bg-gray-700/50 px-1 rounded-sm">[Link](url)</code></li>
    </ul>
  </div>
);