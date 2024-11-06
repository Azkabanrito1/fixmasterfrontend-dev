import { PageHeading, BackBtn } from "../../../../globalcomponents/Utilities";
import {
  FolderContaier,
  Folder,
} from "../../../../qamastercomponent/training/QaMasterTraining";

const ManageCustomer = () => {
  const training = [
    {
      id: 1,
      text: "Cse.pdf",
      img: "/images/pdf.png",
      link: "cse",
    },
    {
      id: 2,
      text: "Getting Started.pdf",
      img: "/images/pdf.png",
    },
    {
      id: 3,
      text: "Founding FM.pdf",
      img: "/images/pdf.png",
    },
    {
      id: 4,
      text: "Why FM.pdf",
      img: "/images/pdf.png",
    },
    {
      id: 5,
      text: "What we offer.pdf",
      img: "/images/pdf.png",
    },
    {
      id: 6,
      text: "FM roles.pdf",
      img: "/images/pdf.png",
    },
    {
      id: 7,
      text: "Our Customer.pdf",
      img: "/images/pdf.png",
    },
    {
      id: 8,
      text: "Our Impact.pdf",
      img: "/images/pdf.png",
    },
    {
      id: 9,
      text: "Award & Recognition.pdf",
      img: "/images/pdf.png",
    },
    {
      id: 10,
      text: "Our Partner",
      img: "/images/pdf.png",
    },
    {
      id: 11,
      text: "License.pdf",
      img: "/images/pdf.png",
    },
  ];
  const trainingTemplate = training.map((item) => {
    return (
      <Folder key={item.id}>
        <img src={item.img} alt="" />
        <h2 className=" fs-5 mt-2">{item.text}</h2>
      </Folder>
    );
  });

  return (
    <>
      <div>
        <BackBtn />
        <PageHeading>Managing Customers</PageHeading>
      </div>
      <FolderContaier>{trainingTemplate}</FolderContaier>
    </>
  );
};

export default ManageCustomer;
