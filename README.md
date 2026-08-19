# AI Watermark Tools

A production-grade, privacy-conscious online AI text analysis, invisible Unicode character detection, and deterministic text cleaning web application.

## 🌟 Overview & Core Objective

**AI Watermark Tools** provides free client-side utilities designed to scan, detect, and clean hidden Unicode artifacts from AI-generated text (such as ChatGPT, Claude, and Gemini) without subscriptions, paywalls, or accounts.

### Technical Capabilities
* **Invisible Character Detection:** Identifies Zero-Width Space (`U+200B`), Zero-Width Non-Joiner (`U+200C`), Zero-Width Joiner (`U+200D`), Word Joiner (`U+2060`), and Byte Order Mark (`U+FEFF`).
* **Whitespace Anomaly Normalization:** Fixes non-breaking spaces (`U+00A0`), multiple space sequences, and erratic tabulations.
* **Deterministic Text Cleaning:** Conservative, non-destructive cleaning that strictly preserves international scripts (Arabic, Urdu, Chinese, Japanese), emojis, punctuation, and markdown semantics.
* **Privacy by Design:** 100% client-side text processing; no user inputs are permanently logged or stored in a database.
* **Technical Honesty:** No false claims of "100% undetectable AI text" or guaranteed bypass of probabilistic AI classifiers.

---

## 🛠️ Technology Stack

* **Framework:** React 19 + TypeScript (Strict Mode)
* **Build System:** Vite 6
* **Styling:** Tailwind CSS v4 + Plus Jakarta Sans typography
* **Icons:** Lucide React
* **Architecture:** Modular, configuration-driven SPA with client-side history router

---

## 🧭 Site Routes & Architecture

| Route | Page / Tool | Description |
|---|---|---|
| `/` | **Homepage** | Hero, Primary Claude & ChatGPT tool cards, interactive tool workspace, how it works, features, limitations, FAQ, and blog preview |
| `/claude-ai-text-watermark-remover` | **Claude Tool** | Specialized Anthropic Claude text cleaner with targeted SEO and keyword architecture |
| `/chatgpt-ai-text-watermark-remover` | **ChatGPT Tool** | Specialized OpenAI ChatGPT text cleaner with targeted SEO and keyword architecture |
| `/ai-text-watermark-remover` | **General Tool** | Universal AI text watermark remover and analysis workspace |
| `/ai-text-cleaner` | **AI Text Cleaner** | Fast whitespace normalizer and formatting artifact sanitizer |
| `/invisible-character-remover` | **Invisible Char Tool** | Deep Unicode scanner for zero-width spaces, joiners, and BOM markers |
| `/about` | **About Us** | Mission, philosophy, and technical transparency standards |
| `/contact` | **Contact** | Feedback and bug report form |
| `/privacy` | **Privacy Policy** | Detailed data handling statement and client-side processing guarantees |
| `/terms` | **Terms of Service** | Usage terms and service boundaries |
| `/disclaimer` | **Disclaimer** | AI detection disclaimer and technical limits notice |
| `/blog` | **Blog Index** | Knowledge base with search and tag filtering |
| `/blog/:slug` | **Blog Post** | In-depth research articles on Unicode mechanics and text watermarking |

---

## 🚀 Getting Started

### Development Mode
To start the Vite local development server on port 3000:

```bash
npm run dev
```

### Production Build
To create an optimized production bundle:

```bash
npm run build
```

### Type Checking & Lint
To verify TypeScript types and syntax:

```bash
npm run lint
```
