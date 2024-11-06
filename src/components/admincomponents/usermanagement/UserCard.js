import { Avatar, Box, Stack } from "@mui/material";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserCard = ({ user, icon, to, id, title, description }) => {
  return (
    <Box p={3} bgcolor={"#fff"}>
      <Stack spacing={2}>
        <Avatar
          src={user?.icon || icon || "/images/adds.png"}
          alt={user?.trainingType + "-icon"}
        />
        <Link
          to={user?.linkTo || user?.to || to}
          style={{ textDecoration: "none" }}
          className="d-flex justify-content-between align-items-center"
        >
          <h4 className="fs-4 text-dark text-capitalize mb-0">
            {user?.trainingType || user?.title || title}
          </h4>
          <i className="fa fa-chevron-right text-dark"></i>
        </Link>
        <Stack direction={"row"} justifyContent={"space-between"} gap={2}>
          {/* {!!user?.description ? (
            <Description>{user?.description || description}</Description>
          ) : (
            <p>Total {user?.title}</p>
          )} */}
          <Description>{user?.description || description}</Description>
          <span className="fs-4 orange">{user?.totalUsers}</span>
        </Stack>
      </Stack>
    </Box>
  );
};

export default UserCard;

const Description = styled.p`
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
  color: #595858b2;
`;
