import { ToolConfig } from '../types';

export const TOOL_CONFIGS: Record<string, ToolConfig> = {
  claude: {
    id: 'claude-ai-text-watermark-remover',
    name: 'Claude AI Text Watermark Remover',
    provider: 'claude',
    route: '/claude-ai-text-watermark-remover',
    pageTitle: 'Claude AI Text Cleaner – Remove Hidden Text Artifacts',
    metaDescription: 'Clean Claude-generated text by detecting and removing invisible characters, unusual whitespace, formatting artifacts, and other text artifacts online.',
    h1: 'Claude AI Text Watermark Remover',
    heroBadge: 'Specialized Anthropic Claude Text Cleaner',
    leadParagraph: 'Inspect and clean Claude-generated text for invisible Unicode characters, unusual whitespace, and formatting artifacts that can appear when copying from Claude’s interface.',
    primaryKeywords: [
      'Claude ai text watermark remover',
      'Claude text watermark remover',
    ],
    secondaryKeywords: [
      'Claude watermark remover',
      'Claude AI watermark remover',
      'remove Claude watermark',
      'Claude text cleaner',
      'Claude AI text cleaner',
      'clean Claude text',
    ],
    features: [
      {
        title: 'Invisible Character Detection',
        description: 'Detects zero-width spaces (U+200B), non-joiners (U+200C), joiners (U+200D), and byte order marks in copied Claude text.',
        iconName: 'Layers',
      },
      {
        title: 'Whitespace Normalization',
        description: 'Fixes irregular non-breaking spaces (U+00A0), multiple space clusters, and trailing line returns.',
        iconName: 'FileCode',
      },
      {
        title: 'Multilingual Preservation',
        description: 'Safely protects Arabic, Urdu, Chinese, Japanese, emoji ligatures, and punctuation without corruption.',
        iconName: 'ShieldCheck',
      },
      {
        title: 'Instant Client-Side Cleaning',
        description: 'Claude text analysis and cleaning run in your browser. Pasted text is not stored in a database.',
        iconName: 'Sparkles',
      },
    ],
    detectionCapabilities: [
      {
        title: 'Invisible Control Characters',
        items: [
          'Zero Width Space (U+200B)',
          'Zero Width Non-Joiner (U+200C)',
          'Zero Width Joiner (U+200D)',
          'Word Joiner (U+2060)',
          'Byte Order Mark (U+FEFF)',
          'Left-to-Right / Right-to-Left Marks (U+200E, U+200F)',
        ],
      },
      {
        title: 'Whitespace & Formatting Anomalies',
        items: [
          'Non-Breaking Spaces (U+00A0)',
          'En / Em Spaces (U+2002, U+2003)',
          'Thin & Hair Spaces (U+2009, U+200A)',
          'Consecutive space sequences',
          'Inadvertent markdown copy fragments',
        ],
      },
    ],
    explainerSections: [
      {
        heading: 'Cleaning Claude-generated text',
        paragraphs: [
          'Claude often produces structured markdown: headings, lists, blockquotes, and code samples. When that output is copied from a web or desktop interface, the clipboard can include extra whitespace, non-breaking spaces, and occasional hidden Unicode characters that were used for layout or cursor handling.',
          'This page is for people who want to inspect Claude text and clean those copy-paste artifacts without rewriting the wording. It is not a claim that Anthropic embeds a secret removable watermark in every response.',
        ],
      },
      {
        heading: 'Formatting artifacts vs. watermark claims',
        paragraphs: [
          'People searching for a Claude watermark remover are usually dealing with two different ideas. One is statistical or provenance research around AI-generated text. The other is practical text hygiene: hidden characters, unusual spaces, and markdown remnants that show up after copying.',
          'This tool addresses the second category. It inspects the actual characters in the text you paste and removes a catalog of detectable artifacts. It cannot prove whether a passage was written by Claude, and it cannot remove a probabilistic pattern in word choice.',
        ],
        bullets: [
          'Hidden Unicode characters and zero-width spaces',
          'Non-breaking spaces and irregular whitespace',
          'Copy-paste formatting left behind by rich text views',
        ],
      },
    ],
    howToSteps: [
      {
        title: 'Paste Claude output',
        description: 'Copy text from Claude and paste it into the workspace on this page.',
      },
      {
        title: 'Review detected artifacts',
        description: 'Check whether invisible characters, unusual spaces, or formatting issues were found.',
      },
      {
        title: 'Clean the text',
        description: 'Run the cleaner to remove cataloged artifacts while keeping words, punctuation, and scripts intact.',
      },
      {
        title: 'Copy the result',
        description: 'Export the cleaned text for your editor, CMS, or documents.',
      },
    ],
    limitations: {
      does: 'Detects and removes invisible Unicode control characters, zero-width spaces, byte-order marks, non-breaking spaces, and formatting artifacts that can appear when copying Claude text.',
      doesNot: 'This page does not claim that Claude inserts a cryptographic watermark into every answer, and it does not guarantee bypass of AI detectors. Detectors typically look at writing patterns, not only hidden characters.',
    },
    relatedTools: [
      {
        to: '/ai-text-cleaner',
        title: 'AI Text Cleaner',
        description: 'Normalize whitespace and formatting in AI-generated text',
      },
      {
        to: '/invisible-character-remover',
        title: 'Invisible Character Remover',
        description: 'Focus on zero-width and hidden Unicode characters',
      },
      {
        to: '/ai-text-watermark-remover',
        title: 'AI Text Watermark Remover',
        description: 'Inspect detectable artifacts across AI-generated text',
      },
    ],
    relatedGuides: [
      {
        to: '/blog/does-claude-watermark-text',
        title: 'Does Claude watermark text?',
        description: 'What we can and cannot say about Claude text artifacts',
      },
      {
        to: '/blog/how-to-clean-ai-generated-text',
        title: 'Clean AI-generated text without changing meaning',
        description: 'Hygiene versus rewriting for assistant drafts',
      },
    ],
    faqs: [
      {
        question: 'What does this Claude text cleaner remove?',
        answer: 'It removes cataloged invisible Unicode characters, zero-width spaces, byte-order marks, non-breaking spaces, and irregular whitespace that can appear in copied Claude text. It does not rewrite your sentences.',
      },
      {
        question: 'Does Claude watermark text?',
        answer: 'Anthropic has published research on AI provenance, but this site does not treat Claude’s consumer interface as inserting covert tracking characters into every copied answer. What we can inspect here are the characters actually present in the text you paste.',
      },
      {
        question: 'Does cleaning change the meaning of my text?',
        answer: 'No. The cleaner targets hidden characters and abnormal whitespace. Words, punctuation, and international scripts are preserved.',
      },
      {
        question: 'Does the tool store my Claude text?',
        answer: 'Cleaning and analysis run in your browser. Pasted text is not saved to a database. Optional rewriting, if you use that separate feature, is a different request.',
      },
      {
        question: 'Can I use this for ChatGPT text too?',
        answer: 'Yes, the same character-level cleaning works on other copied text. If you specifically copied ChatGPT output, the ChatGPT tool page has ChatGPT-focused explanations.',
      },
    ],
  },

  chatgpt: {
    id: 'chatgpt-ai-text-watermark-remover',
    name: 'ChatGPT AI Text Watermark Remover',
    provider: 'chatgpt',
    route: '/chatgpt-ai-text-watermark-remover',
    pageTitle: 'ChatGPT Watermark Remover – Clean ChatGPT Text Online',
    metaDescription: 'Free ChatGPT text cleaner. Inspect copied ChatGPT text for invisible characters, zero-width spaces, and formatting artifacts, then clean it in your browser.',
    h1: 'ChatGPT AI Text Watermark Remover',
    heroBadge: 'Specialized OpenAI ChatGPT Text Cleaner',
    leadParagraph: 'Clean copied ChatGPT text by inspecting it for invisible characters, zero-width spaces, unusual whitespace, and formatting artifacts. This is a text cleaner, not a detector-bypass tool.',
    primaryKeywords: [
      'ChatGPT ai text watermark remover',
      'ChatGPT text watermark remover',
    ],
    secondaryKeywords: [
      'ChatGPT watermark remover',
      'ChatGPT AI watermark remover',
      'remove ChatGPT watermark',
      'ChatGPT text cleaner',
      'ChatGPT AI text cleaner',
      'clean ChatGPT text',
    ],
    features: [
      {
        title: 'Zero-Width Character Removal',
        description: 'Detects and strips zero-width spaces, word joiners, and BOM markers from ChatGPT copy-paste snippets.',
        iconName: 'Layers',
      },
      {
        title: 'NBSP & Space Normalization',
        description: 'Replaces sticky non-breaking spaces (U+00A0) and irregular tabulations with clean standard spaces.',
        iconName: 'FileCode',
      },
      {
        title: 'Unicode & Emoji Safe',
        description: 'Preserves all international language characters (Arabic, Urdu, Chinese, Japanese) and modern emojis.',
        iconName: 'ShieldCheck',
      },
      {
        title: 'Zero Account Required',
        description: 'Instant browser-side analysis with zero registration, zero credit limits, and no account.',
        iconName: 'Sparkles',
      },
    ],
    detectionCapabilities: [
      {
        title: 'Invisible Characters & Code Points',
        items: [
          'Zero Width Space (U+200B)',
          'Zero Width Non-Joiner (U+200C)',
          'Zero Width Joiner (U+200D)',
          'Zero Width No-Break Space (U+FEFF)',
          'Soft Hyphens (U+00AD)',
          'Control characters (U+0000 - U+001F)',
        ],
      },
      {
        title: 'ChatGPT Copy-Paste Formatting Issues',
        items: [
          'Non-Breaking Spaces (U+00A0)',
          'Mathematical & Ideographic Spaces (U+3000)',
          'Trailing formatting characters',
          'Triple space and inconsistent indentations',
          'Fragmented markdown code fence remnants',
        ],
      },
    ],
    explainerSections: [
      {
        heading: 'What people mean by “ChatGPT watermark”',
        paragraphs: [
          'Search phrases like ChatGPT watermark remover, ChatGPT watermark, and clean ChatGPT text often mix several ideas together. Some people mean hidden characters in copied text. Others mean research into statistical watermarking, where a model might bias token choices. Those are not the same thing.',
          'This tool helps with the first kind of problem: characters you can inspect in the pasted string. OpenAI has researched statistical watermarking, but this page does not claim that standard ChatGPT web output contains a secret invisible tracking code in every response.',
        ],
      },
      {
        heading: 'What this ChatGPT text cleaner can do',
        paragraphs: [
          'When you copy from ChatGPT’s web interface, the clipboard may include zero-width spaces, non-breaking spaces, soft hyphens, or extra whitespace around lists and code. Those artifacts can break search, change character counts, or look odd in a plain-text editor.',
          'Paste the text here to see what was detected, then clean cataloged artifacts without changing the wording.',
        ],
        bullets: [
          'Invisible Unicode characters and zero-width spaces',
          'Non-breaking spaces and unusual whitespace',
          'Copy-paste formatting around markdown and lists',
        ],
      },
      {
        heading: 'What this page does not claim',
        paragraphs: [
          'Cleaning ChatGPT text is not the same as making writing “human” or undetectable. AI content detectors generally score vocabulary, sentence variation, and predictability. Removing hidden characters does not rewrite those patterns, and we do not promise detector bypass.',
        ],
      },
    ],
    howToSteps: [
      {
        title: 'Copy from ChatGPT',
        description: 'Select the ChatGPT reply you want to inspect and copy it to the clipboard.',
      },
      {
        title: 'Paste it here',
        description: 'Paste into the ChatGPT cleaner workspace. Analysis runs in your browser.',
      },
      {
        title: 'Check invisible characters',
        description: 'Review whether zero-width spaces, BOM markers, or unusual whitespace were found.',
      },
      {
        title: 'Clean and export',
        description: 'Remove cataloged artifacts, then copy or download the cleaned text.',
      },
    ],
    limitations: {
      does: 'Detects and removes invisible Unicode characters, zero-width spaces, byte-order marks, non-breaking spaces, and formatting artifacts that can appear in copied ChatGPT text.',
      doesNot: 'This is not a ChatGPT watermark detector in the statistical sense, and it does not guarantee that cleaned text will pass AI detectors. It does not claim that every ChatGPT reply contains a removable hidden watermark.',
    },
    relatedTools: [
      {
        to: '/ai-text-cleaner',
        title: 'AI Text Cleaner',
        description: 'Clean AI-generated text and normalize formatting',
      },
      {
        to: '/invisible-character-remover',
        title: 'Invisible Character Remover',
        description: 'Remove hidden Unicode and zero-width characters',
      },
      {
        to: '/ai-text-watermark-remover',
        title: 'AI Text Watermark Remover',
        description: 'Inspect detectable artifacts in AI-generated text',
      },
    ],
    relatedGuides: [
      {
        to: '/blog/how-to-clean-chatgpt-text',
        title: 'How to clean ChatGPT text',
        description: 'Inspect hidden characters and formatting leftovers in copied replies',
      },
      {
        to: '/blog/does-chatgpt-watermark-text',
        title: 'Does ChatGPT watermark text?',
        description: 'Statistical watermarking vs. invisible Unicode artifacts',
      },
    ],
    faqs: [
      {
        question: 'What does this ChatGPT watermark remover actually remove?',
        answer: 'It removes detectable text artifacts in the string you paste: invisible Unicode characters, zero-width spaces, byte-order marks, non-breaking spaces, and irregular whitespace. It does not rewrite ChatGPT’s wording.',
      },
      {
        question: 'Does ChatGPT watermark text?',
        answer: 'OpenAI has researched statistical watermarking, which would be a pattern in word choice rather than a hidden character. Standard ChatGPT copies often contain ordinary copy-paste artifacts instead. This tool inspects those characters; it does not prove that a reply is watermarked.',
      },
      {
        question: 'Are invisible characters the same as a watermark?',
        answer: 'No. Invisible Unicode characters are real code points, such as U+200B, that can ride along when you copy from a web UI. A statistical watermark, if used, would be a subtle bias in which words the model picks. Cleaning hidden characters does not remove that kind of pattern.',
      },
      {
        question: 'Does cleaning change the meaning of my text?',
        answer: 'No. Words, punctuation, emojis, and non-Latin scripts stay in place. Only cataloged hidden characters and abnormal whitespace are changed.',
      },
      {
        question: 'Does the tool store my ChatGPT text?',
        answer: 'Cleaning and analysis run in your browser. We do not save pasted text to a database.',
      },
      {
        question: 'Will this make ChatGPT text undetectable?',
        answer: 'No. We do not claim detector bypass, “humanization,” or guaranteed removal of an AI watermark. This is a text-hygiene tool.',
      },
    ],
  },

  general: {
    id: 'ai-text-watermark-remover',
    name: 'AI Text Watermark Remover',
    provider: 'general',
    route: '/ai-text-watermark-remover',
    pageTitle: 'AI Text Watermark Remover – Clean AI-Generated Text',
    metaDescription: 'Analyze and clean AI-generated text by removing invisible Unicode characters, zero-width spaces, unwanted formatting, and other detectable text artifacts.',
    h1: 'AI Text Watermark Remover & Cleaner',
    heroBadge: 'Universal AI Text Cleaner & Analyzer',
    leadParagraph: 'Inspect and clean detectable text artifacts that may occur in copied or AI-generated text, including invisible Unicode characters, zero-width spaces, and unusual formatting.',
    primaryKeywords: [
      'AI text watermark remover',
      'AI text watermark cleaner',
    ],
    secondaryKeywords: [
      'remove AI watermark',
      'invisible character remover',
      'clean AI text',
      'AI text analyzer',
    ],
    features: [
      {
        title: 'Comprehensive Text Inspection',
        description: 'Scans text character-by-character for zero-width glyphs, byte order marks, and irregular spaces.',
        iconName: 'Search',
      },
      {
        title: 'Deterministic Cleaning',
        description: 'Strips only verified unwanted artifacts without mangling legitimate vocabulary or Unicode alphabets.',
        iconName: 'Eraser',
      },
      {
        title: 'Side-by-Side Comparison',
        description: 'Compare original and cleaned text with character count differences and removed artifact metrics.',
        iconName: 'Layers',
      },
      {
        title: 'Full Client-Side Privacy',
        description: 'Cleaning runs in your browser. Pasted text is not stored in a database.',
        iconName: 'ShieldCheck',
      },
    ],
    detectionCapabilities: [
      {
        title: 'Hidden Unicode Artifacts',
        items: [
          'Zero Width Space (U+200B)',
          'Zero Width Joiner (U+200D)',
          'Byte Order Mark (U+FEFF)',
          'Word Joiner (U+2060)',
        ],
      },
      {
        title: 'Whitespace Anomalies',
        items: [
          'Non-Breaking Spaces (U+00A0)',
          'Thin Space (U+2009)',
          'Hair Space (U+200A)',
          'Double space clusters',
        ],
      },
    ],
    explainerSections: [
      {
        heading: 'AI text watermarks and what this tool actually checks',
        paragraphs: [
          '“Remove AI watermark from text” is a common search, but it bundles several ideas. Some people mean hidden Unicode characters. Some mean formatting leftovers from chat UIs. Some mean statistical watermarking, which would live in word-choice patterns rather than in extra characters.',
          'This tool helps inspect and clean detectable text artifacts in the pasted string. It does not imply that every AI-generated passage contains a removable watermark, and it cannot strip a probabilistic pattern from the vocabulary.',
        ],
      },
      {
        heading: 'When to use this universal remover',
        paragraphs: [
          'Use this page when the text may come from more than one assistant, or when you want a general scan before publishing, pasting into code, or loading content into a CMS. If you already know the source, the ChatGPT or Claude pages add source-specific explanation.',
        ],
        bullets: [
          'Mixed or unknown AI-generated drafts',
          'Copied web text with odd spacing or hidden characters',
          'A first pass before a more specific cleaner',
        ],
      },
    ],
    howToSteps: [
      {
        title: 'Paste the text',
        description: 'Paste AI-generated or copied text into the workspace.',
      },
      {
        title: 'Inspect artifacts',
        description: 'See whether invisible characters, zero-width spaces, or unusual whitespace are present.',
      },
      {
        title: 'Clean detectable issues',
        description: 'Remove cataloged artifacts without changing the wording.',
      },
      {
        title: 'Export',
        description: 'Copy or download the cleaned result.',
      },
    ],
    limitations: {
      does: 'Helps inspect and clean detectable text artifacts that may occur in copied or AI-generated text, including invisible Unicode characters, zero-width spaces, and formatting issues.',
      doesNot: 'It does not claim that all AI text contains a removable watermark, and it does not guarantee AI detector bypass or “human” scores.',
    },
    relatedTools: [
      {
        to: '/chatgpt-ai-text-watermark-remover',
        title: 'ChatGPT Watermark Remover',
        description: 'Clean ChatGPT text and copy-paste artifacts',
      },
      {
        to: '/ai-text-cleaner',
        title: 'AI Text Cleaner',
        description: 'Normalize whitespace and formatting in AI text',
      },
      {
        to: '/invisible-character-remover',
        title: 'Invisible Character Remover',
        description: 'Focus on hidden Unicode and zero-width characters',
      },
    ],
    relatedGuides: [
      {
        to: '/blog/how-to-clean-ai-generated-text',
        title: 'How to clean AI-generated text',
        description: 'Remove artifacts without rewriting the sentences',
      },
      {
        to: '/blog/ai-text-formatting-artifacts-explained',
        title: 'AI text formatting artifacts',
        description: 'Whitespace, markdown remnants, and hidden characters',
      },
    ],
    faqs: [
      {
        question: 'What does the AI text watermark remover do?',
        answer: 'It scans pasted text for hidden characters, zero-width markers, non-standard whitespace, and formatting artifacts, then offers a cleaned plain-text result. It does not assume every AI draft contains a watermark.',
      },
      {
        question: 'Does every AI-generated text contain a removable watermark?',
        answer: 'No. Some copied AI text contains ordinary Unicode and formatting leftovers. Statistical watermarking, when discussed in research, is not the same as a hidden character you can delete.',
      },
      {
        question: 'Does cleaning change the meaning of my text?',
        answer: 'No. The cleaner keeps words and scripts and only adjusts cataloged hidden characters and abnormal whitespace.',
      },
      {
        question: 'Does the tool store my text?',
        answer: 'Cleaning runs in your browser. Pasted text is not stored in a database.',
      },
      {
        question: 'Is this the same as an AI scrubber or detector bypass?',
        answer: 'No. This is text hygiene. We do not claim that cleaned text will evade AI detectors.',
      },
    ],
  },

  cleaner: {
    id: 'ai-text-cleaner',
    name: 'AI Text Cleaner',
    provider: 'general',
    route: '/ai-text-cleaner',
    pageTitle: 'AI Text Cleaner – Clean AI-Generated Text Online',
    metaDescription: 'Clean AI-generated text online by removing hidden Unicode characters, zero-width spaces, unwanted whitespace, and formatting artifacts.',
    h1: 'AI Text Cleaner',
    heroBadge: 'Fast Formatting & Whitespace Normalizer',
    leadParagraph: 'Clean AI-generated text by removing hidden Unicode characters, zero-width spaces, non-breaking spaces, and formatting artifacts while keeping the original wording.',
    primaryKeywords: [
      'AI text cleaner',
      'clean AI text',
    ],
    secondaryKeywords: [
      'format cleaner',
      'whitespace cleaner',
      'text normalizer',
    ],
    features: [
      {
        title: 'Whitespace Cleanup',
        description: 'Normalizes non-breaking spaces, excessive tabulations, and irregular line breaks.',
        iconName: 'FileCode',
      },
      {
        title: 'Hidden Character Cleanup',
        description: 'Removes zero-width spaces and other cataloged invisible Unicode characters from copied AI text.',
        iconName: 'Eraser',
      },
      {
        title: 'Meaning Preservation',
        description: 'Keeps your words, punctuation, and paragraph structure instead of paraphrasing the draft.',
        iconName: 'ShieldCheck',
      },
      {
        title: 'One-Click Copy & Export',
        description: 'Instantly copy cleaned text to clipboard or download as a .txt file.',
        iconName: 'Download',
      },
    ],
    detectionCapabilities: [
      {
        title: 'Formatting Elements Cleaned',
        items: [
          'Multiple continuous space sequences',
          'Sticky non-breaking space (NBSP) characters',
          'Zero-width spaces and related hidden markers',
          'Excessive trailing carriage returns',
        ],
      },
      {
        title: 'Invisible Unicode Characters',
        items: [
          'Zero Width Space (U+200B)',
          'Byte Order Mark (U+FEFF)',
          'Soft Hyphens (U+00AD)',
          'Word Joiner (U+2060)',
        ],
      },
    ],
    explainerSections: [
      {
        heading: 'What does an AI text cleaner do?',
        paragraphs: [
          'An AI text cleaner is for drafts that already say what you want, but arrived with extra formatting. Copied ChatGPT, Claude, or other assistant text can include sticky spaces, hidden characters, and uneven line breaks that make the text awkward in documents or code.',
          'This page focuses on cleaning AI-generated text: normalize whitespace, strip cataloged invisible characters, and leave the sentences themselves alone.',
        ],
      },
      {
        heading: 'What types of characters can be cleaned?',
        paragraphs: [
          'The cleaner looks at code points and spacing, not at whether the writing “sounds like AI.” Typical issues include:',
        ],
        bullets: [
          'Invisible Unicode characters such as zero-width spaces',
          'Non-breaking spaces that prevent wrapping',
          'Unusual whitespace (thin spaces, extra space runs, trailing spaces)',
          'Formatting leftovers from rich text or markdown views',
        ],
      },
      {
        heading: 'How to clean AI-generated text',
        paragraphs: [
          'Paste the draft, review the analysis, run the cleaner, then copy the result into your editor. If you only care about hidden characters, the Invisible Character Remover is a more focused scan. If the text is specifically from ChatGPT or Claude, those tool pages explain source-specific copy-paste issues.',
        ],
      },
    ],
    howToSteps: [
      {
        title: 'Paste AI-generated text',
        description: 'Drop in the draft you want to clean. You do not need an account.',
      },
      {
        title: 'See spacing and hidden characters',
        description: 'The analyzer reports invisible characters and whitespace issues found in the string.',
      },
      {
        title: 'Clean the draft',
        description: 'Normalize spaces and remove cataloged artifacts without paraphrasing.',
      },
      {
        title: 'Reuse the text',
        description: 'Copy or download the cleaned version for publishing or editing.',
      },
    ],
    limitations: {
      does: 'Cleans hidden Unicode characters, zero-width spaces, non-breaking spaces, unusual whitespace, and formatting artifacts in AI-generated or copied text.',
      doesNot: 'It does not paraphrase content, guarantee detector bypass, or claim that cleaning equals removing an AI watermark.',
    },
    relatedTools: [
      {
        to: '/chatgpt-ai-text-watermark-remover',
        title: 'ChatGPT Watermark Remover',
        description: 'Clean ChatGPT text and inspect copy-paste artifacts',
      },
      {
        to: '/invisible-character-remover',
        title: 'Invisible Character Remover',
        description: 'Remove hidden Unicode characters and zero-width spaces',
      },
      {
        to: '/ai-text-watermark-remover',
        title: 'AI Text Watermark Remover',
        description: 'Inspect detectable artifacts in AI-generated text',
      },
    ],
    relatedGuides: [
      {
        to: '/blog/how-to-clean-ai-generated-text',
        title: 'Clean AI text without changing meaning',
        description: 'What a cleaner should preserve versus rewrite',
      },
      {
        to: '/blog/ai-text-formatting-artifacts-explained',
        title: 'AI text formatting artifacts explained',
        description: 'Why copied AI text can look and behave oddly',
      },
    ],
    faqs: [
      {
        question: 'What does this AI text cleaner remove?',
        answer: 'Hidden Unicode characters, zero-width spaces, non-breaking spaces, extra whitespace, and related formatting artifacts. It does not rewrite your vocabulary.',
      },
      {
        question: 'Can I use this to clean ChatGPT or Claude text?',
        answer: 'Yes. This is the general cleaner for AI-generated text. The ChatGPT and Claude pages add explanations for those sources.',
      },
      {
        question: 'Does cleaning change the meaning of my text?',
        answer: 'No. Sentence content stays the same. Only cataloged hidden characters and abnormal spacing are adjusted.',
      },
      {
        question: 'Does the tool store my text?',
        answer: 'Cleaning runs in your browser. Pasted text is not stored in a database.',
      },
      {
        question: 'Is this an AI paraphraser?',
        answer: 'No. Optional rewriting is a separate, opt-in feature and is not required for cleaning.',
      },
    ],
  },

  invisible: {
    id: 'invisible-character-remover',
    name: 'Invisible Character Remover',
    provider: 'invisible',
    route: '/invisible-character-remover',
    pageTitle: 'Invisible Character Remover – Clean Hidden Unicode Text',
    metaDescription: 'Remove invisible characters, zero-width spaces, hidden Unicode characters, non-breaking spaces, and other unwanted text artifacts with this free online cleaner.',
    h1: 'Invisible Character Remover',
    heroBadge: 'Zero-Width & Unicode Control Character Scanner',
    leadParagraph: 'Find and remove invisible Unicode characters, zero-width spaces, non-breaking spaces, and other hidden code points that can travel with copied text.',
    primaryKeywords: [
      'invisible character remover',
      'remove invisible characters',
    ],
    secondaryKeywords: [
      'zero width space remover',
      'BOM remover',
      'unicode cleaner',
      'hidden character detector',
    ],
    features: [
      {
        title: 'Deep Zero-Width Scan',
        description: 'Exposes U+200B (ZWSP), U+200C (ZWNJ), U+200D (ZWJ), and U+2060 (Word Joiner) code points.',
        iconName: 'Search',
      },
      {
        title: 'Detailed Position Mapping',
        description: 'Identifies exact character counts and occurrences of invisible elements inside your string.',
        iconName: 'Layers',
      },
      {
        title: 'Surgical Removal',
        description: 'Safely removes hidden markers while preserving emojis and proper foreign language ligatures.',
        iconName: 'ShieldCheck',
      },
      {
        title: 'Export & Copy',
        description: 'Copy sanitized text instantly to your clipboard or download as a clean plain text file.',
        iconName: 'Download',
      },
    ],
    detectionCapabilities: [
      {
        title: 'Detected Invisible Unicode Characters',
        items: [
          'U+200B : Zero Width Space',
          'U+200C : Zero Width Non-Joiner',
          'U+200D : Zero Width Joiner',
          'U+2060 : Word Joiner',
          'U+FEFF : Zero Width No-Break Space (BOM)',
          'U+00AD : Soft Hyphen',
        ],
      },
    ],
    explainerSections: [
      {
        heading: 'What are invisible Unicode characters?',
        paragraphs: [
          'Invisible Unicode characters are code points that occupy a position in a string but draw little or no visible glyph. They exist for line-breaking, script joining, bidirectional text, and encoding. They become a problem when they hitch a ride during copy-paste and then break search, diffs, or parsers.',
          'This remover is for people who need to see those hidden characters and strip the ones that do not belong in plain text. It is useful for AI-generated drafts, but also for any copied web text.',
        ],
      },
      {
        heading: 'Zero-width spaces and related hidden characters',
        paragraphs: [
          'A zero-width space is U+200B. You will not see a gap, but the character still counts and can split a word for search. Nearby characters include the word joiner (U+2060), byte order mark (U+FEFF), and soft hyphen (U+00AD).',
          'A non-breaking space (U+00A0) is not zero-width, but it looks like a normal space and often surprises people in the same copy-paste workflow. This tool reports those as well.',
        ],
        bullets: [
          'Zero-width space (U+200B): no visible width, still present in the string',
          'BOM (U+FEFF): often appears at the start of a copied file or web snippet',
          'Non-breaking space (U+00A0): looks like a space, behaves differently',
        ],
      },
    ],
    howToSteps: [
      {
        title: 'Paste the suspect text',
        description: 'Paste any string that may contain hidden Unicode characters.',
      },
      {
        title: 'Read the scan',
        description: 'Check counts for zero-width spaces, BOM, joiners, and related markers.',
      },
      {
        title: 'Remove hidden characters',
        description: 'Strip cataloged invisible characters while keeping visible letters and emoji sequences intact.',
      },
      {
        title: 'Copy the clean string',
        description: 'Use the result in code, documents, or publishing tools.',
      },
    ],
    limitations: {
      does: 'Detects and removes cataloged invisible Unicode characters, zero-width spaces, BOM markers, soft hyphens, and related hidden or sticky spacing characters.',
      doesNot: 'It does not decode encrypted watermarks, and it does not claim that hidden characters are proof of an AI watermark. Some joiners are preserved when they are needed for emoji sequences.',
    },
    relatedTools: [
      {
        to: '/ai-text-cleaner',
        title: 'AI Text Cleaner',
        description: 'Clean AI-generated text and normalize formatting',
      },
      {
        to: '/chatgpt-ai-text-watermark-remover',
        title: 'ChatGPT Watermark Remover',
        description: 'Clean ChatGPT text after copying from the chat UI',
      },
      {
        to: '/claude-ai-text-watermark-remover',
        title: 'Claude AI Text Cleaner',
        description: 'Inspect Claude copies for hidden characters and spacing',
      },
    ],
    relatedGuides: [
      {
        to: '/blog/how-to-remove-invisible-characters',
        title: 'How to remove invisible characters',
        description: 'Detect, then clean cataloged hidden Unicode code points',
      },
      {
        to: '/blog/zero-width-space-u200b-explained',
        title: 'Zero Width Space (U+200B) explained',
        description: 'What U+200B is, when it is useful, and how to remove it',
      },
    ],
    faqs: [
      {
        question: 'What are zero-width characters?',
        answer: 'They are Unicode code points with no visible width, such as the zero-width space (U+200B). They can still affect search, length counts, and parsing.',
      },
      {
        question: 'Does this remove invisible Unicode characters?',
        answer: 'Yes. It scans for cataloged hidden characters including zero-width spaces, word joiners, BOM, and soft hyphens, then removes the ones marked for cleaning.',
      },
      {
        question: 'Will emoji and other languages break?',
        answer: 'The cleaner is conservative. Visible letters, including Arabic, Chinese, and Japanese, stay intact. Zero-width joiners used in emoji sequences are treated carefully so combined emoji are not split.',
      },
      {
        question: 'Does cleaning change the meaning of my text?',
        answer: 'Visible wording stays the same. Only hidden or sticky characters in the catalog are removed or normalized.',
      },
      {
        question: 'Does the tool store my text?',
        answer: 'Scanning and cleaning run in your browser. Pasted text is not stored in a database.',
      },
    ],
  },
};
