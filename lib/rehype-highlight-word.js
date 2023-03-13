// Thanks to https://ped.ro/blog/code-blocks-but-better

import { visit } from 'unist-util-visit';
import { unified } from 'unified';
import parse from 'rehype-parse';
import { toHtml } from 'hast-util-to-html';

const CALLOUT = /__(.*?)__/g

module.exports = code => {
  const html = toHtml(code);
  const result = html.replace(
    CALLOUT,
    (_, text) => `<span class="highlight-word">${text}</span>`
  )
  const hast = unified()
    .use(parse, { emitParseErrors: true, fragment: true })
    .parse(result)
  return hast.children
}
