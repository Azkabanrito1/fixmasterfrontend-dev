import {
  BackBtn,
  PageHeading,
} from "../../../components/globalcomponents/Utilities";
import {
  PageAside,
  PageContainer,
} from "../../../components/layouts/dashboard/DashboardUtilities";
import PromoBanner from "../../../components/customercomponents/dashboardcomponents/PromoBanner";
import styled from "styled-components";
import { useGetFmFiles } from "../../../hooks/useQueries/useAdmin";
import { Link, useNavigate, useParams } from "react-router-dom";
import { LuFileVideo } from "react-icons/lu";
import { AiTwotoneFilePdf } from "react-icons/ai";
import { AiTwotoneFileImage } from "react-icons/ai";

const AboutFmFiles = () => {
  const { folderId } = useParams();

  const { data: filesData } = useGetFmFiles(folderId);

  const files = filesData?.data;

  return (
    <>
      <PageContainer>
        <Main>
          <div>
            <BackBtn />
            <PageHeading>The Fm Revolution</PageHeading>
          </div>

          <Files>
            {files?.map((file) => {
              return (
                <div className="files" key={file.fileId}>
                  {file.fileType === "document" ? (
                    <Link to={file.fileURL} target="_blank" className="file">
                      <span className="icon">
                        <AiTwotoneFilePdf />
                      </span>
                      <span className="name">{file.fileName}</span>
                    </Link>
                  ) : file.fileType === "image" ? (
                    <Link to={file.fileURL} target="_blank" className="file">
                      <span className="icon">
                        <AiTwotoneFileImage />
                      </span>
                      <span className="name">{file.fileName}</span>
                    </Link>
                  ) : (
                    <Link to={file.fileURL} target="_blank" className="file">
                      <span className="icon">
                        <LuFileVideo />
                      </span>
                      <span className="name">{file.name}</span>
                    </Link>
                  )}
                </div>
              );
            })}
          </Files>
        </Main>

        <PageAside>
          <PromoBanner banner="/images/ileyaPromofix.png" />
        </PageAside>
      </PageContainer>
    </>
  );
};
export default AboutFmFiles;

const Main = styled.div``;

const Files = styled.div`
  display: flex;
  gap: 2rem;
  flex-wrap: wrap;

  .files {
    .file {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-decoration: none;
      color: black;
      font-weight: 600;

      svg {
        font-size: 8rem;
        color: var(--clr-primary);
      }

      .name {
        font-size: 0.9rem;
      }
    }
  }
`;
