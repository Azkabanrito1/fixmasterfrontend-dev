import GlobalPDFViewer from "./GlobalPDFViewer";
import { BackBtn, PageHeading } from "./Utilities";

const PdfPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const url = searchParams.get("url");
  const title = searchParams.get("title");

  return (
    <>
      <div>
        <BackBtn />
        <PageHeading>{title}</PageHeading>
      </div>
      <GlobalPDFViewer url={url} />
    </>
  );
};

export default PdfPage;
