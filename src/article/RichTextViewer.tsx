interface RichTextViewer {
  content: string | null;
}

function RichTextViewer({
  content = "No article content yet",
}: RichTextViewer) {
  let displayableContent = content ?? "No article content yet";

  displayableContent = displayableContent
    ?.replaceAll('class="ql-align-right"', 'style="text-align: right"')
    .replaceAll('class="ql-align-center"', 'style="text-align: center"');

  return (
    <div className="ql-container">
      <div
        dangerouslySetInnerHTML={{
          __html: displayableContent,
        }}
      ></div>
    </div>
  );
}

export default RichTextViewer;
