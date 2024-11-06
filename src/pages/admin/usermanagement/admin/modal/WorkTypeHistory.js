import styled from "styled-components";
import GlobalBallBeat from "../../../../../components/globalcomponents/GlobalBallBeat";
import GlobalModal from "../../../../../components/globalcomponents/GlobalModal";
import AltModalHeader from "../../../../../components/layouts/modal/AltModalHeader";
import { useGetWorkTypeHistory } from "../../../../../hooks/useQueries/useOnboarding";
import { format } from "date-fns";

const WorkTypeHistory = ({ open, close, applicant }) => {
  const { data: history, isLoading } = useGetWorkTypeHistory(
    applicant.collaboratorUserId
  );
  return (
    <>
      <GlobalModal width="75%" isOpen={open} closeModal={close}>
        <AltModalHeader closeModal={close} />
        <h2 className="text-center">Working Type History</h2>
        {isLoading && <GlobalBallBeat loading={isLoading} />}
        {!isLoading && (
          <>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                rowGap: "5px",
                margin: "20px 0px",
              }}
            >
              <ParText>
                <Label>Name:</Label> {applicant.fullName}
              </ParText>
              <ParText>
                <Label>Role:</Label> {applicant.collaborator}
              </ParText>
              <ParText>
                <Label>Working Type:</Label> {applicant.workingType}
              </ParText>
            </div>
            <Container>
              <InnerContainer>
                {history?.data?.map((el, index) => {
                  return (
                    <Item>
                      <ItemContainer
                        className={
                          index === history?.data.length - 1 ? "active" : ""
                        }
                      >
                        <p>
                          <Label>{el.workingType}</Label>
                        </p>
                        <p>
                          {format(new Date(el.assignedDate), "dd-MM-yyyy") ||
                            "N/A"}
                        </p>
                        {/* time seems late by an hour, check this */}
                        <p>{format(new Date(el.assignedDate), "hh:mm a")}</p>
                      </ItemContainer>
                      <RightArrow
                        className={
                          index === history?.data.length - 1 ? "active" : ""
                        }
                      />
                    </Item>
                  );
                })}
              </InnerContainer>
            </Container>
          </>
        )}
      </GlobalModal>
    </>
  );
};
export default WorkTypeHistory;

const Item = styled.div`
  position: relative;
  white-space: nowrap;
  z-index: 20;
  display: flex;
  align-items: center;
  gap: 10px;
`;
const ItemContainer = styled.div`
  white-space: nowrap;
  background-color: var(--clr-primary);
  color: #fff;
  padding: 40px;
  border-radius: 20px;
  &.active {
    background-color: #fff;
    color: var(--clr-primary);
    border: 2px solid var(--clr-primary);
  }
`;
const Container = styled.div`
  width: 100%;
  overflow-x: scroll;
  padding-bottom: 20px;
  &::-webkit-scrollbar {
    width: 20px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
    border: 2px solid #f1f1f1;
  }
  /* Firefox scrollbar customization */
  scrollbar-width: thin;
  scrollbar-color: #888 #f1f1f1;
`;
const InnerContainer = styled.div`
  width: fit-content;
  position: relative;
  display: flex;
  gap: 50px;
`;

const ProgressLine = styled.div`
  height: 10px;
  background-color: var(--clr-primary);
  position: absolute;
  left: 0;
  right: 0;
  z-index: 10;
  top: 50%;
  transform: translateY(-50%);
`;
const Label = styled.span`
  font-weight: bold;
  font-size: 18px;
`;
const ParText = styled.p`
  font-size: 18px;
`;

const RightArrow = styled.div`
  display: inline-block;
  position: relative;
  padding-left: 20px;

  /* Tail */
  &::before {
    content: "";
    position: absolute;
    top: 50%;
    left: 0;
    width: 50px;
    height: 8px;
    background-color: var(--clr-primary);
    transform: translateY(-50%);
  }

  &::after {
    content: "";
    position: absolute;
    top: 50%;
    left: 50px;
    width: 0;
    height: 0;
    border-top: 10px solid transparent;
    border-bottom: 10px solid transparent;
    border-left: 10px solid var(--clr-primary);
    transform: translateY(-50%);
  }
  &.active {
    display: none;
  }
`;
