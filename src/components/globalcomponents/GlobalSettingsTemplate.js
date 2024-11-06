import styled from "styled-components";
import GlobalSettingsCard from "./GlobalSettingsCard";
import { Container } from "./Utilities";

const GlobalSettingsTemplate = ({ settingOptions }) => {
  const cardsTemplate = settingOptions.map((settingOption) => {
    return (
      <GlobalSettingsCard
        key={settingOption.id}
        id={settingOption.id}
        settingOption={settingOption}
      />
    );
  });

  return <SettingsContainer>{cardsTemplate}</SettingsContainer>;
};

export default GlobalSettingsTemplate;

const SettingsContainer = styled(Container)`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 1.5rem;
  background-color: transparent;
`;
