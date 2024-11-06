import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import { useFormik } from "formik";
import { Fields, FormGroup } from "../../components/globalcomponents/Utilities";
import GlobalInput from "../../components/globalcomponents/GlobalInput";
import GlobalCheckbox from "../../components/globalcomponents/GlobalCheckbox";
import GlobalBtn from "../../components/globalcomponents/GlobalBtn";
import { registerSchema } from "../../Validations/registerValidations";
import SiteNavbar from "../../components/landingpagecomponents/SiteNavbar";
import ConfirmEmailModal from "../../components/globalcomponents/modals/ConfirmEmailModal";
import { LoginRegWrapper } from "./Login";
import { useRegister } from "../../hooks/useQueries/useIdentity";
import ModalHeader from "../../components/layouts/modal/ModalHeader";
import GlobalBallBeat from "../../components/globalcomponents/GlobalBallBeat";
import PasswordToggleInput from "../../components/globalcomponents/GlobalPwdToggleInput";
import ContactInfoFormGroup from "../../components/globalcomponents/globalformgroups/ContactInformationFormGroup";
import NameFormGroup from "../../components/globalcomponents/globalformgroups/NameFormGroup";
import {
  useGetCustomerTypesOptions,
  useViewTermsAndConditions,
} from "../../hooks/useQueries/useAdmin";
import CustomerType from "../../components/globalcomponents/CustomerType";
import CustomerTerms from "../../components/customercomponents/modals/CustomerTerms";

const Login = () => {
  const [selectedCountry, setSelectedCountry] = useState({
    code: "+234",
    abbr: "NG",
  });
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [openTermsModal, setOpenTermsModal] = useState(false);

  const [offset, setOffset] = useState(new Date());
  const { code } = useParams();

  //-----------------------------data fetching--------------------------------

  const { data: customerTypeData } = useGetCustomerTypesOptions();

  const onSubmit = async (values) => {
    const clientNumber = `${selectedCountry.code} ${values.phoneNo}`;

    const customerSubTypeId =
      values.customerType.toLowerCase() === "commercial"
        ? +values.commercialType
        : 0;

    const referrals = code ? code : values.referral;

    const payload = {
      firstName: values.firstName,
      lastName: values.lastName,
      username: values.email,
      email: values.email,
      phoneNumber: clientNumber,
      password: values.password,
      referedBy: referrals,
      customerTypeId: customerType[0].id,
      customerSubTypeId,
    };
    register(payload);
  };

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  // ====================data fetching================================

  // RQ registration mutation
  const onRegSuccess = () => {
    enqueueSnackbar("A verification code has been sent to the provided email", {
      variant: "success",
    });
    localStorage.setItem("emailSaved", JSON.stringify(values.email));
    generateTimerOffset(300); // offset time by 1min : 30 seconds
    setShowConfirmModal(true);
  };

  const onRegFailure = (res) => {
    enqueueSnackbar(res.message, { variant: "error" });
  };

  const { mutate: register, isLoading } = useRegister(
    onRegSuccess,
    onRegFailure
  );

  const generateTimerOffset = (time) => {
    const now = new Date();
    now.setSeconds(now.getSeconds() + time);

    setOffset(now);
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    handleSubmit,
    setFieldValue,
  } = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      email: "",
      phoneNo: "",
      customerType: "",
      commercialType: "",
      password: "",
      confirmPassword: "",
      referral: "",
      termsOfService: false,
    },
    validationSchema: registerSchema,
    onSubmit,
  });

  const formikHandlers = {
    values,
    touched,
    errors,
    handleBlur,
    handleChange,
    setFieldValue,
  };

  const customerType = customerTypeData?.data?.filter((customer) =>
    values?.customerType?.includes(customer.name)
  );
  useEffect(() => {
    setFieldValue("referral", code);
  }, [code]);
  return (
    <>
      <SiteNavbar
        isOpen={isNavOpen}
        toggleIsOpen={() => {
          setIsNavOpen((prev) => !prev);
        }}
      />
      <LoginRegWrapper>
        <div style={{ width: "600px" }} className="bg-white rounded p-4">
          <ModalHeader
            title="Create an Account"
            subHeading="Create an account to have unlimited access to FixMaster services"
          />

          <GlobalBallBeat loading={isLoading} />

          <form onSubmit={handleSubmit}>
            <NameFormGroup formikHandlers={formikHandlers} />
            <ContactInfoFormGroup
              withoutHeading={true}
              formikHandlers={formikHandlers}
              country={selectedCountry}
              setCountry={setSelectedCountry}
            />
            <Fields>
              <FormGroup columns="2">
                <PasswordToggleInput
                  formikHandlers={formikHandlers}
                  inputName="password"
                  labelText="Password"
                />
                <PasswordToggleInput
                  formikHandlers={formikHandlers}
                  inputName="confirmPassword"
                  labelText="Confirm Password"
                />
              </FormGroup>
            </Fields>
            <CustomerType
              formikHandlers={formikHandlers}
              customerTypeData={customerTypeData?.data}
              customerType={customerType}
            />
            <FormGroup columns="1">
              <GlobalInput
                labelText={"Referral Code"}
                inputName={"referral"}
                inputValue={values.referral}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.referral && errors.referral}
                errorMessage={errors.referral}
              />

              <GlobalCheckbox
                labelText={
                  <>
                    I agree to the{" "}
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenTermsModal(true);
                      }}
                      style={{
                        background: "transparent",
                        border: "none",
                        color: "var(--clr-primary)",
                      }}
                    >
                      Terms & Conditions
                    </button>
                  </>
                }
                mb="0"
                inputName={"termsOfService"}
                inputValue={values.termsOfService}
                handleChange={handleChange}
                handleBlur={handleBlur}
                error={touched.termsOfService && errors.termsOfService}
                errorMessage={errors.termsOfService}
                required
              />
              <GlobalBtn
                type="submit"
                disabled={!values.termsOfService}
                className="mx-auto"
              >
                Sign Up
              </GlobalBtn>
            </FormGroup>{" "}
          </form>

          <p className="text-center" style={{ color: "var(--clr-primary)" }}>
            Already have an account?{" "}
            <Link
              className="fw-bold"
              style={{ color: "var(--clr-primary)" }}
              to={"/login"}
            >
              Log In
            </Link>{" "}
          </p>
        </div>
      </LoginRegWrapper>

      {showConfirmModal && (
        <ConfirmEmailModal
          open={showConfirmModal}
          onVerify={() => {
            setShowConfirmModal(false);
            navigate("/login");
          }}
          offsetTime={offset}
        />
      )}

      {openTermsModal && (
        <CustomerTerms
          open={openTermsModal}
          close={() => setOpenTermsModal(false)}
          headerText={`CUSTOMER TERMS AND CONDITIONS`}
        />
      )}
    </>
  );
};

export default Login;
