import {
  PageHeading,
  BackBtn,
} from "../../../../../globalcomponents/Utilities";
import BookingDetails from "./jobdetail/BookingDetails";
import ProductsDetails from "./jobdetail/ProductsDetails";
import MedialDetails from "./jobdetail/MedialDetail";
import ServiceDetails from "./jobdetail/ServiceDetails";
import { useOutletContext } from "react-router-dom";
import ContactPersonLoc from "./jobdetail/ContactPersonDetail";
import Preference from "./jobdetail/Preference";

const JobDetails = () => {
  // const { JobDetail } = useOutletContext();

  // const { productInformation, multimedias } = JobDetail || {};
  return (
    <>
      <div>
        <div className="mb-4">
          <BackBtn />
        </div>
        <PageHeading>View Details</PageHeading>
      </div>
      <BookingDetails />

      <ProductsDetails />

      <MedialDetails />

      <ServiceDetails />
      <ContactPersonLoc />
      <Preference />
    </>
  );
};

export default JobDetails;
