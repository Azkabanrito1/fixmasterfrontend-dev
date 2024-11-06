import { Backdrop, CircularProgress } from "@mui/material";

const GlobalFullScreenLoader = ({ open }) => {
  return (
    <Backdrop
      sx={{
        color: "rgba(255, 255, 255, 0.5)",
        backdropFilter: "blur(5px)",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  );
};

export default GlobalFullScreenLoader;
