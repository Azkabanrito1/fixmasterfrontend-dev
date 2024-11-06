import Collapsible from "react-collapsible";
import AddAddress from "./AddNewAddressForm";
import { StyledCollapsible } from "./BookingInfo";
import { FormGroup } from "../../globalcomponents/Utilities";
import GlobalSelect from "../../globalcomponents/GlobalSelect";
import GlobalCheckbox from "../../globalcomponents/GlobalCheckbox";
import GlobalInput from "../../globalcomponents/GlobalInput";
import { useEffect, useState } from "react";
import styled from "styled-components";
import GlobalPhoneInput from "../../globalcomponents/GlobalPhoneInput";
import {
  useGetAddressDetailsById,
  useGetCustomerAddresses,
} from "../../../hooks/useQueries/useIdentity";
import usePhoneBreakdown from "../../../hooks/usePhoneBreakdown";

const ServiceDelivery = ({
  formikHandlers,
  mode,
  selectedCountry,
  setSelectedCountry,
  initAddressId,
}) => {
  const [selectedAddressId, setSelectedAddressId] = useState("");
  const { values, errors, touched, handleChange, handleBlur, setFieldValue } =
    formikHandlers;

  const { data: customerAddressesData } = useGetCustomerAddresses();
  const customerAddresses = customerAddressesData?.data;
  const { data: selectedAddressDetailsData } = useGetAddressDetailsById(
    selectedAddressId,
    {
      enabled: !!selectedAddressId,
    }
  );
  const selectedAddressDetails = selectedAddressDetailsData?.data;

  useEffect(() => {
    if (initAddressId) {
      setSelectedAddressId(initAddressId);
    }
  }, [initAddressId]);

  useEffect(() => {
    if (selectedAddressDetails?.length > 0) {
      setFieldValue("address", selectedAddressDetails[0]?.location_name);
      setFieldValue("state", selectedAddressDetails[0]?.state);
      setFieldValue("lga", selectedAddressDetails[0]?.lga);
      setFieldValue("city", selectedAddressDetails[0]?.city);
      setFieldValue("contactName", selectedAddressDetails[0]?.contact_name);
      setFieldValue(
        "contactPhoneNo",
        selectedAddressDetails[0]?.contact_phone.slice(4)
      );
      setFieldValue("contactEmail", selectedAddressDetails[0]?.contact_email);
    }
  }, [selectedAddressDetails]);

  return (
    <Collapsible
      trigger={
        <StyledCollapsible className="d-flex justify-content-between align-items-center mb-4">
          <div>
            <h3 className="heading">Service Delivery Location</h3>
            <p className="sub-heading">
              Tell us where the fix is to be delivered
            </p>
          </div>
          <i className="fas fa-chevron-right collapsible-icon"></i>
        </StyledCollapsible>
      }
    >
      <div className="px-4">
        <FormGroup className="mb-3" columns="2">
          {customerAddresses &&
          customerAddresses?.length > 0 &&
          !values.addNewAddress ? (
            <GlobalSelect
              options={customerAddresses}
              labelText={"Choose from your saved addresses"}
              labelColor={"var(--clr-primary)"}
              defaultOption={"Choose your address"}
              defaultValue="0"
              selectName="addressId"
              selectValue={values.addressId}
              handleBlur={handleBlur}
              handleChange={(e) => {
                handleChange(e);
                setSelectedAddressId(
                  e.target.value === "0" ? "" : e.target.value
                );
              }}
              error={touched.addressId && errors.addressId}
              errorMessage={errors.addressId}
            />
          ) : null}
        </FormGroup>

        {selectedAddressId && (
          <>
            <FormGroup className="my-4" columns="3">
              <Details>
                <h4>State</h4>
                <span>{selectedAddressDetails?.[0]?.state}</span>
              </Details>
              <Details>
                <h4>LGA</h4>
                <span>{selectedAddressDetails?.[0]?.localGoverment}</span>
              </Details>
              <Details>
                <h4>City</h4>
                <span>{selectedAddressDetails?.[0]?.city}</span>
              </Details>
              <Details>
                <h4>Address</h4>
                <span>{selectedAddressDetails?.[0]?.location_name}</span>
              </Details>
            </FormGroup>
            <div className="mb-5">
              <h4
                style={{
                  marginBottom: "8px",
                  fontSize: "1.2rem",
                  fontWeight: 600,
                }}
              >
                Contact Person For The Fix
              </h4>
              <FormGroup columns="2" mb="1.5rem">
                <GlobalInput
                  labelColor={"var(--clr-primary)"}
                  labelText={"Contact Name"}
                  inputPlaceholder={"Contact Name"}
                  inputName={"contactName"}
                  inputValue={values.contactName}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={errors?.contactName && touched?.contactName}
                  errorMessage={errors?.contactName}
                />

                <GlobalPhoneInput
                  labelText="Contact Phone Number"
                  labelColor="var(--clr-primary)"
                  inputName="contactPhoneNo"
                  inputPlaceholder="000 000 0000"
                  inputValue={values.contactPhoneNo}
                  selectedCountry={selectedCountry}
                  setSelectedCountry={setSelectedCountry}
                  handleBlur={handleBlur}
                  handleChange={setFieldValue}
                  error={errors.contactPhoneNo && touched.contactPhoneNo}
                  errorMessage={errors.contactPhoneNo}
                />

                <GlobalInput
                  labelColor={"var(--clr-primary)"}
                  labelText={"Contact Email"}
                  inputPlaceholder={"Contact Email"}
                  inputName={"contactEmail"}
                  inputValue={values.contactEmail}
                  handleBlur={handleBlur}
                  handleChange={handleChange}
                  error={errors?.contactEmail && touched?.contactEmail}
                  errorMessage={errors?.contactEmail}
                />
              </FormGroup>
            </div>
          </>
        )}

        <FormGroup columns="2">
          <GlobalCheckbox
            bRad={"50%"}
            labelText={"Add new address"}
            inputValue={values.addNewAddress}
            inputName={"addNewAddress"}
            handleChange={(e) => {
              handleChange(e);
              setSelectedAddressId("");
              setFieldValue("address", "");
              setFieldValue("state", "");
              setFieldValue("lga", "");
              setFieldValue("city", "");
            }}
          />
        </FormGroup>

        {values.addNewAddress && (
          <AddAddress
            formikHandlers={formikHandlers}
            selectedCountry={selectedCountry}
            setSelectedCountry={setSelectedCountry}
            mode={mode}
          />
        )}

        {mode === "editing" && (
          <div className="mb-5">
            <h4
              style={{
                marginBottom: "8px",
                fontSize: "1.2rem",
                fontWeight: 600,
              }}
            >
              Contact Person For The Fix
            </h4>
            <FormGroup columns="2" mb="1.5rem">
              <GlobalInput
                labelColor={"var(--clr-primary)"}
                labelText={"Contact Name"}
                inputPlaceholder={"Contact Name"}
                inputName={"contactName"}
                inputValue={values.contactName}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors?.contactName && touched?.contactName}
                errorMessage={errors?.contactName}
              />

              <GlobalPhoneInput
                labelText="Contact Phone Number"
                labelColor="var(--clr-primary)"
                inputName="contactPhoneNo"
                inputPlaceholder="000 000 0000"
                inputValue={values.contactPhoneNo}
                selectedCountry={selectedCountry}
                setSelectedCountry={setSelectedCountry}
                handleBlur={handleBlur}
                handleChange={setFieldValue}
                error={errors.contactPhoneNo && touched.contactPhoneNo}
                errorMessage={errors.contactPhoneNo}
              />

              <GlobalInput
                labelColor={"var(--clr-primary)"}
                labelText={"Contact Email"}
                inputPlaceholder={"Contact Email"}
                inputName={"contactEmail"}
                inputValue={values.contactEmail}
                handleBlur={handleBlur}
                handleChange={handleChange}
                error={errors?.contactEmail && touched?.contactEmail}
                errorMessage={errors?.contactEmail}
              />
            </FormGroup>
          </div>
        )}
      </div>
    </Collapsible>
  );
};

export default ServiceDelivery;

const Details = styled.div`
  h4 {
    color: var(--clr-primary);
    font-size: 1rem;
    font-weight: 600;
  }

  span {
    font-size: 1rem;
  }
`;
