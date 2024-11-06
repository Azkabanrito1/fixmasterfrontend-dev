import BookingInfo from "./jobinfo/BookingInfo";
import ProductsInfo from "./jobinfo/ProductsInfo";
import MedialInfo from "./jobinfo/MediaInfo";
import ServiceInfo from "./jobinfo/ServiceInfo";
import ContactInfo from "./jobinfo/ContactInfo";
// import Prefs from "./jobinfo/Prefs";
import { useOutletContext } from "react-router-dom";

const ViewJob = () => {
  const { jobDetails = {} } = useOutletContext();

  return (
    <>
      <BookingInfo jobDetails={jobDetails[0] || jobDetails} />

      {Object.values(jobDetails?.productsInformation || {}).some(
        (info) => info === true
      ) && (
        <ProductsInfo
          productInfo={
            jobDetails[0]?.productsInformation ||
            jobDetails?.productsInformation
          }
        />
      )}
      {Object.values(jobDetails?.fixMultiMedias || {}).some(
        (info) => info === true
      ) && (
        <MedialInfo
          multimedias={
            jobDetails[0]?.fixMultiMedias || jobDetails?.fixMultiMedias
          }
        />
      )}

      <ServiceInfo
        jobDetails={jobDetails[0]?.addressDetails || jobDetails?.addressDetails}
      />
      <ContactInfo jobDetails={jobDetails[0] || jobDetails} />
      {/* <Prefs jobDetails={jobDetails} /> */}
    </>
  );
};

export default ViewJob;
