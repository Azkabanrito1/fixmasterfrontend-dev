import { Link, NavLink } from "react-router-dom";
import Collapsible from "react-collapsible";
import { StyledNav } from "./CustomerSidebar";
import { useGetUserMenu } from "../../../hooks/useQueries/useIdentity";

const SideBar = ({ closeSidebar, showSideBar, openSwitchProfile }) => {
  const { data: sideBarMenuData } = useGetUserMenu();

  const sideBarMenu = sideBarMenuData?.menu;

  const menuTemplate = sideBarMenu?.map((item) => {
    return !item.menuItems.length ? (
      <li
        key={item.id * Math.random()}
        className={!item.onbardingAvailability ? "disabled" : ""}
      >
        {item.menuUrl.slice(1) === "switch-account" ? (
          <Link
            to="#"
            onClick={() => {
              closeSidebar();
              openSwitchProfile();
            }}
          >
            <i className={item.menuIcon}></i>
            {item.menuName}
          </Link>
        ) : (
          <NavLink
            to={item.menuUrl[0] === "/" ? item.menuUrl.slice(1) : item.menuUrl}
            end={item.menuUrl === "" ? true : false}
            onClick={closeSidebar}
          >
            <i className={item.menuIcon}></i>
            {item.menuName}
          </NavLink>
        )}
      </li>
    ) : (
      <li
        key={item.id * Math.random()}
        className={`collapsible
            ${!item.onbardingAvailability ? "disabled" : ""}
          `}
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
                key={menuItem.id * Math.random()}
                to={
                  menuItem.url[0] === "/" ? menuItem.url.slice(1) : menuItem.url
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
  });

  return (
    <StyledNav className={showSideBar ? "open" : "close"}>
      {menuTemplate}
    </StyledNav>
  );
};

export default SideBar;
