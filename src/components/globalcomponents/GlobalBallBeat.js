import { BallBeat } from "react-pure-loaders";

const GlobalBallBeat = ({ loading, loaderRef }) => {
  if (!loading) return;

  return (
    <div className="text-center" ref={loaderRef}>
      <BallBeat color="#f26222" loading={loading} />
    </div>
  );
};

export default GlobalBallBeat;
