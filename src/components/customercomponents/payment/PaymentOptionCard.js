import { StyledOption } from "./PaymentUtilities";

const OptionCard = ({ option }) => {
  return (
    <StyledOption onClick={option.action}>
      <div>
        <img src={option.icon} alt="" />
        <div>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--clr-primary)",
            }}
          >
            {option.title}
          </h2>
          <p style={{ fontSize: "0.9rem" }}>{option.subtitle}</p>
        </div>
      </div>

      <button onClick={option.action}>
        <i className="fa fa-chevron-right"></i>
      </button>
    </StyledOption>
  );
};

export default OptionCard;
