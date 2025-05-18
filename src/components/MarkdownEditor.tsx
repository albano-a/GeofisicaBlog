import { useState } from "react";
import { MDXEditor } from "@mdxeditor/editor";

import "@mdxeditor/editor/style.css";

export default function MarkdownEditor() {
  const [markdown, setMarkdown] = useState("#### Escreva aqui seu post...");

  return (
    <div style={{ maxWidth: 800, margin: "0 auto" }}>
      <div style={{ minHeight: 400, background: "#fff" }}>
        <MDXEditor
          markdown={markdown}
          onChange={setMarkdown}
          
        />
      </div>
      <h3>Preview</h3>
      <div
        style={{
          border: "1px solid #ddd",
          borderRadius: 4,
          padding: 16,
          background: "#fafafa",
          minHeight: 100,
          marginTop: 16,
          whiteSpace: "pre-wrap",
        }}
      >
        {markdown}
      </div>
    </div>
  );
}
