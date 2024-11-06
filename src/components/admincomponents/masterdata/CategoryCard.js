import React, { Fragment } from "react";
import {
  AddressCards,
  CardContainer,
} from "../../suppliercomponent/setting/AddressCard";
import GlobalTableActions from "../../globalcomponents/GlobalTableActions";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { GridCardsContainer } from "../../globalcomponents/Utilities";

const CategoryCard = ({
  data,
  showEditModalHandler,
  showDeactiveHandler,
  showActiveHandler,
  showAddServiceListing,
}) => {
  const navigate = useNavigate();

  const cardTemplates = data?.map((item) => {
    const actions = [
      {
        id: 0,
        name: "View Details",
        action: () => navigate(`../category/details/${item.id}`),
      },
      {
        id: 1,
        name: "Edit details",
        action: () => showEditModalHandler(item.id),
      },
      {
        id: 2,
        name: "Add service Listing",
        action: () => showAddServiceListing(item.id),
      },
      ...(!!item.hasServices
        ? [
            {
              id: 3,
              name: "View Services",
              action: () => navigate(`../services/details/${item.id}`),
            },
          ]
        : []),
      ...(item.status.toLowerCase() === "inactive"
        ? [
            {
              id: 4,
              name: "Activate",
              action: () => showActiveHandler(item.id),
            },
          ]
        : []),
      ...(item.status.toLowerCase() === "active"
        ? [
            {
              id: 5,
              name: "Deactivate",
              action: () => showDeactiveHandler(item.id),
            },
          ]
        : []),
    ];

    return (
      <CardCategory key={item.id} status={item.status}>
        <header className="d-flex justify-content-between ">
          <h3>{item.name}</h3>
          <GlobalTableActions actions={actions} id={item.id} />
        </header>

        <div className="body">
          <Fragment>
            <div className="d-flex justify-content-between p-2">
              <h3 className="fs-6 fw-bold " style={{ color: "#222222" }}>
                SubCategories
              </h3>
              <p>
                {item.hasSubCategory ? (
                  <i
                    className="fa fa-check text-success"
                    aria-hidden="true"
                  ></i>
                ) : (
                  <i className="fa fa-times text-danger" aria-hidden="true"></i>
                )}
              </p>
            </div>
            <div className="d-flex justify-content-between p-2">
              <h3 className="fs-6 fw-bold " style={{ color: "#222222" }}>
                Services
              </h3>
              <p>
                {item.hasServices ? (
                  <i
                    className="fa fa-check text-success"
                    aria-hidden="true"
                  ></i>
                ) : (
                  <i className="fa fa-times text-danger" aria-hidden="true"></i>
                )}
              </p>
            </div>
            <div className="d-flex justify-content-between p-2">
              <h3 className="fs-6 fw-bold " style={{ color: "#222222" }}>
                Status
              </h3>
              <p
                className={`${
                  item?.status?.toLowerCase() === "active"
                    ? "text-success"
                    : "text-danger"
                }`}
              >
                {item.status}
              </p>
            </div>
          </Fragment>
        </div>
      </CardCategory>
    );
  });
  return <GridCardsContainer>{cardTemplates}</GridCardsContainer>;
};

export default CategoryCard;

const CardCategory = styled(AddressCards)`
  background-color: ${({ status }) =>
    status?.toLowerCase() === "inactive" ? "red" : "white"};

  header {
    background-color: transparent;
    color: #222222;
    h3 {
      font-size: 1.4rem;
    }
  }
`;
