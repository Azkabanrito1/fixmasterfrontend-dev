import { TableTitle } from "./QuoteTable";
import { InfoTable } from "../../../globalcomponents/Utilities";
import GlobalBtn from "../../../globalcomponents/GlobalBtn";
import styled from "styled-components";
import DeleteQuoteMaterialModal from "./modal/DeleteQuoteMaterialModal";
import { useSnackbar } from "notistack";
import { useState } from "react";
import { useDeleteMaterialFromQuote } from "../../../../hooks/useQueries/useJobs";

const MaterialsTable = ({ materials, quoteData, fixId }) => {
  const [activeId, setActiveId] = useState(0);
  const [showDeleteQuoteModal, setShowDeleteQuoteModal] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  // modal controls
  const openDeleteModal = (id) => {
    setShowDeleteQuoteModal(true);
    setActiveId(id);
  };
  const closeDeleteModal = () => {
    setShowDeleteQuoteModal(false);
  };
  // --------------mutation callbacks--------------
  const onSuccess = (response) => {
    enqueueSnackbar(response.message, { variant: "success" });
    closeDeleteModal();
  };
  const onFailed = (response) => {
    enqueueSnackbar(response.message, { variant: "error" });
  };

  const payload = {
    equipmentId: activeId,
    jobNumber: fixId,
  };

  // ----------------mutations------------------------
  const { mutate: deleteMaterial, isLoading: loading } =
    useDeleteMaterialFromQuote(onSuccess, onFailed);

  // const tbodySubHeader = materials?.map((material, index) =>
  //   material?.items?.map((item, itemIndex) => (
  //     <tr key={itemIndex}>
  //       <td>Equipment {itemIndex + 1}</td>
  //       <td colSpan={6}>{material.name}</td>
  //       <td>
  //         <DeleteBtn
  //           onClick={() => {
  //             openDeleteModal(material.id);
  //           }}
  //         >
  //           <i class="fa-solid fa-trash"></i>
  //         </DeleteBtn>
  //       </td>
  //     </tr>
  //   ))
  // );

  // const tbodyTemplate = materials?.map((material, index, jobType) =>
  //   material?.items?.map((item, itemIndex) => (
  //     <tr key={itemIndex}>
  //       <td>Item {itemIndex + 1}</td>
  //       <td>{item.itemName}</td>
  //       <td>{item.quantity}</td>
  //       <td>{item.unitOfMeasurement}</td>
  //       <td>{item.unitPrice}</td>
  //       <td>{item.totalPrice}</td>
  //       <td></td>
  //       <td></td>
  //     </tr>
  //   ))
  // );

  return (
    <>
      <div>
        <TableTitle>
          <h4>Materials</h4>
        </TableTitle>

        {materials?.map((material, index) => (
          <InfoTable layout={"auto"} border="1px solid #222" key={index}>
            <thead>
              <tr>
                <th>Items</th>
                <th>Description</th>
                <th>Quantity</th>
                <th>Unit of Measure</th>
                <th>Unit Price</th>
                <th>Price</th>
                <th className="orange">Total</th>
                <th>...</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Equipment {index + 1}</td>
                <td colSpan={6}>{material.name}</td>
                <td>
                  <DeleteBtn
                    onClick={() => {
                      openDeleteModal(material.id);
                    }}
                  >
                    <i class="fa-solid fa-trash"></i>
                  </DeleteBtn>
                </td>
              </tr>
            </tbody>
            <tbody>
              {material?.items?.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td>Item {itemIndex + 1}</td>
                  <td>{item.itemName}</td>
                  <td>{item.quantity}</td>
                  <td>{item.unitOfMeasurement}</td>
                  <td>{item.unitPrice}</td>
                  <td>{item.totalPrice}</td>
                  <td></td>
                  <td></td>
                </tr>
              ))}
            </tbody>
            <tbody>
              {material?.items?.map((item, itemIndex) => (
                <tr key={itemIndex}>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td className="orange fw-bold">{material?.subTotal}</td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </InfoTable>
        ))}

        <TableTitle>
          <h4>Materials Total</h4>
          <span className="total">{quoteData?.totalMaterialCost}</span>
        </TableTitle>
      </div>
      {showDeleteQuoteModal && (
        <DeleteQuoteMaterialModal
          open={showDeleteQuoteModal}
          close={() => setShowDeleteQuoteModal(false)}
          onDelete={() => deleteMaterial(payload)}
          pText={`Are you sure you want to delete this material`}
          labelText={"Delete Material?"}
          actionText={"Delete"}
          isLoading={loading}
        />
      )}
    </>
  );
};

export default MaterialsTable;

const DeleteBtn = styled.button`
  color: var(--clr-primary);
`;
