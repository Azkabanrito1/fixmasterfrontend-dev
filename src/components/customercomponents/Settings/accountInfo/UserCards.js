import styled from "styled-components";
import "react-credit-cards/es/styles-compiled.css";
import Cards from "react-credit-cards";
import { useSnackbar } from "notistack";
import { Button, IconButton } from "@mui/material";
import { useUpdateDefaultCard } from "../../../../hooks/useQueries/useIdentity";
import GlobalFullScreenLoader from "../../../globalcomponents/GlobalFullScreenLoader";
import { FaTrash } from "react-icons/fa";

function UserCards({ userCards, deleteCard }) {
  const { enqueueSnackbar } = useSnackbar();

  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
  };
  const onError = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };
  const { mutate: updateDefaultCard, isLoading: isUpdating } =
    useUpdateDefaultCard(onSuccess, onError);

  const defaultCard = userCards?.filter((card) => card.isDefault === true);

  const btnStyle = {
    position: "absolute",
    bottom: "-12px",
    right: "12px",
    zIndex: 2,
    bgcolor: "var(--clr-primary)",
    ":hover": {
      bgcolor: "#4e4e4e",
    },
  };

  return (
    <div>
      <div className="text-center mb-5">
        {defaultCard?.length > 0 &&
          defaultCard.map((card) => {
            return (
              <div className="position-relative" key={card.cardId}>
                <IconButton
                  onClick={() => deleteCard(card.cardId)}
                  sx={btnStyle}
                >
                  <FaTrash color="#fff" />
                </IconButton>
                <Cards
                  name={card.name}
                  number={card.cardNumber}
                  expiry={card.expiredDate}
                  cvc={"000"}
                  preview={true}
                />
              </div>
            );
          })}
      </div>

      <div>
        {userCards?.map((cards) => {
          if (cards.isDefault === false)
            return (
              <CardData
                key={cards.cardId}
                className="border-bottom b-1 py-3 mb-4 position-relative"
              >
                <SmallIconImg
                  img
                  src={"/images/masterSmallIcon.svg"}
                  alt="Master Card sm"
                />

                <IconButton
                  onClick={() => deleteCard(cards.cardId)}
                  sx={{
                    ...btnStyle,
                    bottom: 0,
                  }}
                >
                  <FaTrash color="#fff" size={"16px"} />
                </IconButton>
                <CardDetails>
                  <span>{cards.cardNumber}</span>
                  <span className="fw-bold">{cards.name}</span>
                </CardDetails>

                <Button
                  sx={{
                    color: "var(--clr-primary)",
                    textTransform: "none",
                  }}
                  onClick={() => updateDefaultCard(cards.cardId)}
                >
                  Set as default
                </Button>
              </CardData>
            );
        })}
      </div>

      <GlobalFullScreenLoader open={isUpdating} />
    </div>
  );
}

export default UserCards;

const CardData = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const SmallIconImg = styled.img`
  width: 39px;
  height: 29px;
`;

const CardDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.2rem;
`;
