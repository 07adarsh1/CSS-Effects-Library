/**
 * Multi-Framework Code & Playground Exporter for CSSHUB
 * Converts raw CSS and HTML into ready-to-use component code for React, Vue 3, Svelte 5, and Tailwind.
 */

// Helper to convert HTML string to JSX-compliant markup
export function htmlToJsx(html: string): string {
  return html
    // class -> className
    .replace(/\bclass="/g, 'className="')
    // for -> htmlFor
    .replace(/\bfor="/g, 'htmlFor="')
    // Self-closing void tags
    .replace(/<(input|img|br|hr|meta|link)([^>]*?)(\/?>)/gi, (match, tag, attrs) => {
      const trimmedAttrs = attrs.trim().replace(/\/$/, '').trim();
      return trimmedAttrs ? `<${tag} ${trimmedAttrs} />` : `<${tag} />`;
    })
    // tabindex -> tabIndex
    .replace(/\btabindex="/g, 'tabIndex="')
    // autocomplete -> autoComplete
    .replace(/\bautocomplete="/g, 'autoComplete="');
}

// Convert kebab-case effect ID to PascalCase Component Name
export function toPascalCase(str: string): string {
  return str
    .split(/[-_]/)
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join('');
}

/**
 * Generates a complete React (TSX) Component
 */
export function generateReactCode(effectId: string, effectName: string, css: string, html: string): string {
  const componentName = `${toPascalCase(effectId)}Effect`;
  const jsxMarkup = htmlToJsx(html);

  return `import React from 'react';

// CSS Stylesheet for ${effectName}
const effectStyles = \`
${css.trim()}
\`;

export interface ${componentName}Props {
  className?: string;
}

export function ${componentName}({ className = '' }: ${componentName}Props) {
  return (
    <>
      <style dangerouslySetInnerHTML={{ __html: effectStyles }} />
      <div className={\`effect-wrapper \${className}\`.trim()}>
        ${jsxMarkup.split('\n').join('\n        ')}
      </div>
    </>
  );
}

export default ${componentName};
`;
}

/**
 * Generates a Vue 3 Single File Component (SFC)
 */
export function generateVueCode(effectName: string, css: string, html: string): string {
  return `<script setup lang="ts">
// ${effectName} Component for Vue 3
defineProps<{
  className?: string
}>()
</script>

<template>
  <div class="effect-container" :class="className">
    ${html.split('\n').join('\n    ')}
  </div>
</template>

<style scoped>
${css.trim()}
</style>
`;
}

/**
 * Generates a Svelte 5 Component (Runes syntax)
 */
export function generateSvelteCode(effectName: string, css: string, html: string): string {
  return `<script lang="ts">
  // ${effectName} Component for Svelte 5
  let { className = '' }: { className?: string } = $props();
</script>

<div class="effect-container {className}">
  ${html.split('\n').join('\n  ')}
</div>

<style>
${css.trim()}
</style>
`;
}

/**
 * Generates a Standalone HTML + CSS Snippet
 */
export function generateStandaloneHtml(effectName: string, css: string, html: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${effectName} - CSSHUB</title>
  <style>
    /* Reset & Center Preview */
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      min-height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      background: #09090c;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif;
      padding: 2rem;
    }

    /* Effect Styles */
${css.trim().split('\n').map(l => `    ${l}`).join('\n')}
  </style>
</head>
<body>
  ${html.split('\n').join('\n  ')}
</body>
</html>`;
}

