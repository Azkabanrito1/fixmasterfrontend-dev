import { useState } from "react";
import { Document, Page } from "react-pdf";

const GlobalPDFViewer = ({ url, classes }) => {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <>
      <div className={classes || "pdf-div"}>
        {classes !== "terms-pdf" && (
          <p>
            Page {pageNumber} of {numPages}
          </p>
        )}
        <Document file={url} onLoadSuccess={onDocumentLoadSuccess}>
          {Array.apply(null, Array(numPages))
            .map((x, i) => i + 1)
            .map((page) => {
              return (
                <Page
                  key={page}
                  pageNumber={page}
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                />
              );
            })}
        </Document>
      </div>
    </>
  );
};

export default GlobalPDFViewer;
