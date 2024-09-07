import React from "react";
import dynamic from "next/dynamic";

import MarkdownIt from "markdown-it";
import hljs from "highlight.js";
import "highlight.js/styles/github.css";
import "react-markdown-editor-lite/lib/index.css";

const MdEditor = dynamic(() => import("react-markdown-editor-lite"), {
  ssr: false,
});

interface MarkdownEditorProps {
   content: string;
   onChange: ({ text }: { text: string; }) => void
}

const MarkdownEditor = ({ content, onChange}: MarkdownEditorProps) => {
  const mdParser: MarkdownIt = new MarkdownIt({
    html: true,
    linkify: true,
    typographer: true,
    highlight: function (str, lang) {
      if (lang && hljs.getLanguage(lang)) {
        try {
          return `<pre class="hljs"><code>${
            hljs.highlight(lang, str, true).value
          }</code></pre>`;
        } catch (__) {}
      }
      return `<pre class="hljs"><code>${mdParser.utils.escapeHtml(
        str
      )}</code></pre>`;
    },
  });

  return (
    <MdEditor
      value={content}
      style={{ height: "500px" }}
      className="rounded-lg overflow-hidden mdeditor-medium-style"
      renderHTML={(text) => mdParser.render(text)}
      onChange={onChange}
    />
  );
};

export default MarkdownEditor;
