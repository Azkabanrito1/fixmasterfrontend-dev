import { BackBtn, PageHeading } from "./Utilities";

const VideoPage = () => {
  const searchParams = new URLSearchParams(window.location.search);
  const url = searchParams.get("url");
  const title = searchParams.get("title");

  return (
    <>
      <div>
        <BackBtn />
        <PageHeading>{title}</PageHeading>
      </div>
      <video src={url} controls />
    </>
  );
};

export default VideoPage;
