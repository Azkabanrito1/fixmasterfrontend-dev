import styled from "styled-components";
import { Link, NavLink, useNavigate } from "react-router-dom";
import Collapsible from "react-collapsible";
import { useGetUserMenu } from "../../../hooks/useQueries/useIdentity";
import useLogout from "../../../hooks/useLogout";

const SideBar = ({
  openBookaFix,
  openSwitchProfile,
  showSideBar,
  closeSidebar,
  openCommentToMgt,
}) => {
  // const dispatch = useDispatch();
  const navigate = useNavigate();
  // const queryClient = useQueryClient();

  const { data: sideBarMenuData } = useGetUserMenu();

  const sideBarMenu = sideBarMenuData?.menu;

  //  const handleLogout = async () => {
  //    await dispatch(logout());
  //    queryClient.clear();
  //    closeSidebar();
  //    navigate("/");
  //  };

  const handleLogout = useLogout(() => {
    closeSidebar();
    navigate("/");
  });

  const menuTemplate = sideBarMenu?.map((item) => {
    if (item.menuItems.length === 0) {
      // handle bookafix action on sidebar menu
      if (item.menuUrl.slice(1) === "bookfix") {
        return (
          <li key={item.id}>
            <Link
              to="#"
              onClick={() => {
                openBookaFix();
                closeSidebar();
              }}
            >
              <i className={item.menuIcon}></i>
              {item.menuName}
            </Link>
          </li>
        );
      }
      // handle logout action on sidebar menu
      else if (item.menuUrl.slice(1) === "logout") {
        return (
          <li key={item.id}>
            <Link to="#" onClick={handleLogout}>
              <i className={item.menuIcon}></i>
              {item.menuName}
            </Link>
          </li>
        );
      }
      // handle switch account action on sidebar menu
      else if (item.menuUrl.slice(1) === "switch-account") {
        return (
          <li key={item.id}>
            <Link
              to="#"
              onClick={() => {
                openSwitchProfile();
                closeSidebar();
              }}
            >
              <i className={item.menuIcon}></i>
              {item.menuName}
            </Link>
          </li>
        );
      }
      // handle open comment to management action
      // else if (item.menuUrl.slice(1) === "comment-to-management") {
      //   return (
      //     <li key={item.id}>
      //       <Link
      //         to="#"
      //         onClick={() => {
      //           openCommentToMgt();
      //           closeSidebar();
      //         }}
      //       >
      //         <i className={item.menuIcon}></i>
      //         {item.menuName}
      //       </Link>
      //     </li>
      //   );
      // }
      // handle every other action on sidebar menu
      else {
        return (
          <li key={item.id}>
            <NavLink
              to={
                item.menuUrl[0] === "/" ? item.menuUrl.slice(1) : item.menuUrl
              }
              end={item.menuUrl === "" ? true : false}
              onClick={closeSidebar}
            >
              <i className={item.menuIcon}></i>
              {item.menuName}
            </NavLink>
          </li>
        );
      }
    } else {
      return (
        <li
          key={item.id}
          className={`collapsible ${
            item.menuName === "Subscription" ? "d-none" : ""
          }`}
        >
          <Collapsible
            trigger={
              <span className="collapsible-trigger">
                <i className={item.menuIcon}></i>
                {item.menuName}
                <i className="fas fa-chevron-right state-icon"></i>
              </span>
            }
          >
            {item.menuItems?.map((menuItem) => {
              return (
                <NavLink
                  key={menuItem.id}
                  to={
                    menuItem.url[0] === "/"
                      ? menuItem.url.slice(1)
                      : menuItem.url
                  }
                  onClick={closeSidebar}
                >
                  <i className={menuItem.icon}></i>
                  {menuItem.name}
                </NavLink>
              );
            })}
          </Collapsible>
        </li>
      );
    }
  });

  return (
    <StyledNav className={showSideBar ? "open" : "close"}>
      {menuTemplate}
    </StyledNav>
  );
};

export default SideBar;

export const StyledNav = styled.nav`
  position: relative;
  width: 100%;
  min-height: calc(100vh - 100px);
  padding-block: 16px;
  overflow-y: scroll;
  overflow-x: hidden;
  isolation: isolate;
  transition: 0.4s ease-in-out;

  &::-webkit-scrollbar {
    width: 12px; /* width of the entire scrollbar */
  }
  &::-webkit-scrollbar-track {
    background: #eee; /* color of the tracking area */
  }
  &::-webkit-scrollbar-thumb {
    background-color: var(--clr-primary); /* color of the scroll thumb */
    border-radius: 10px; /* roundness of the scroll thumb */
    border: 3px solid #eee;
  }

  li {
    margin-bottom: 8px;
    /* margin-inline: 1rem 6px; */
    padding-inline: 1.2rem 6px;
    /* padding-left: 6px; */
    padding-block: 4px;
    border-radius: 10px 0 0 10px;
    list-style-type: none;

    &.collapsible {
      padding-block: 0;
    }

    &:hover {
      background-color: #f6f6f6;
      transition: 400ms;
    }
  }

  .collapsible {
    span {
      padding-block: 12px;
    }

    i {
      font-size: 16px;
    }

    a {
      padding-block: 6px;
      padding-left: 8px;
      margin-block: 2px;
      color: #fff;
      font-size: 14px;

      &.active {
        color: #fff;
      }

      &.active i {
        color: #fff;
      }

      &.active::before {
        right: 1px;
        background-color: #fff;
      }
    }

    &:has(.active) .collapsible-trigger {
      color: var(--clr-primary);

      i {
        color: var(--clr-primary);
      }

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        right: 0;
        width: 2px;
        height: 65%;
        border-radius: 16px;
        background-color: var(--clr-primary);
        transform: translate(0, -50%);
      }
    }

    .Collapsible__contentOuter {
      position: relative;
      width: 102%;
      translate: -2%;
      background-color: var(--clr-primary);
    }
  }

  a,
  .collapsible-trigger {
    position: relative;
    display: flex;
    align-items: center;
    gap: 12px;
    height: 100%;
    padding-block: 8px;
    text-decoration: none;
    color: #a3aed0;
    cursor: pointer;

    i {
      width: 12%;
      font-size: 22px;
    }

    &:hover {
      color: #a3aed0;
    }

    &.active {
      color: var(--clr-primary);

      i {
        color: var(--clr-primary);
      }
    }

    &.active::before {
      content: "";
      position: absolute;
      top: 50%;
      right: 0;
      width: 3px;
      height: 95%;
      border-radius: 16px;
      background-color: var(--clr-primary);
      transform: translate(0, -50%);
    }

    .state-icon {
      position: absolute;
      right: -10px;
      top: 50%;
      font-size: 13px;
      translate: 0 -50%;
      transform-origin: 0 50%;
      transition: 300ms ease-in-out;
    }
  }

  .Collapsible__trigger.is-open .state-icon {
    rotate: 90deg;
  }

  .disabled {
    pointer-events: none;
    opacity: 0.4;
    cursor: not-allowed;
  }

  @media screen and (max-width: 768px) {
    position: absolute;
    width: 70% !important;

    background-color: #fff;
    overflow-x: auto;
    z-index: 10;

    &.open {
      transform: translateX(0);
    }

    &.close {
      transform: translateX(-100%);
    }
  }
`;
