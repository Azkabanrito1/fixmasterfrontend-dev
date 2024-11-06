import { StyledOption } from "../../customercomponents/payment/PaymentUtilities";

const OptionsCArds = ({ options }) => {
  return (
    <StyledOption onClick={options.action}>
      <div>
        <img src={options.icon} alt="" />
        <div>
          <h2
            style={{
              fontSize: "1.1rem",
              fontWeight: 600,
              color: "var(--clr-primary)",
            }}
          >
            {options.title}
          </h2>
        </div>
      </div>

      <button onClick={options.action}>
        <i className="fa fa-chevron-right"></i>
      </button>
    </StyledOption>
  );
};

export default OptionsCArds;
