import { Link } from "react-router-dom";
import PromoBanner from "../../../components/customercomponents/dashboardcomponents/PromoBanner";
import {
  PageAside,
  PageContainer,
} from "../../../components/layouts/dashboard/DashboardUtilities";
import {
  Folder,
  FolderContainer,
} from "../../../components/layouts/training/TrainingFolder";
import { useGetFmFolders } from "../../../hooks/useQueries/useAdmin";

const AboutFm = () => {
  const { data: foldersData } = useGetFmFolders();

  const folders = foldersData?.data;

  return (
    <PageContainer>
      <FolderContainer>
        {folders?.map((folder) => {
          return (
            <Link
              to={`/customer/aboutfm/${folder.folderId}`}
              style={{
                textDecoration: "none",
                marginBottom: "30px",
              }}
            >
              <Folder>
                <img src="/images/folder.png" alt="" />
                <span
                  style={{
                    position: "absolute",
                    top: "100%",
                    padding: "12px",
                    color: "#000",
                    fontWeight: "bold",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  {folder.folderName}
                </span>
              </Folder>
            </Link>
          );
        })}
      </FolderContainer>
      <PageAside>
        <PromoBanner banner="/images/ileyaPromofix.png" />
      </PageAside>
    </PageContainer>
  );
};

export default AboutFm;
