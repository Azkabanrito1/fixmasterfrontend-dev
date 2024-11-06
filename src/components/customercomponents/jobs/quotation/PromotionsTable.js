const PromotionsTable = ({ promotions }) => {
  const ItemRow = ({ item }) => (
    <tr>
      <td>Item {item.id}</td>
      <td>{item.description}</td>
      <td>{item.price}</td>
      <td></td>
      <td></td>
    </tr>
  );

  const TbodyTemplate = () => (
    <>
      {promotions?.promotionItems.map((item, id) => (
        <ItemRow item={item} key={id} />
      ))}
      <tr>
        <td></td>
        <td></td>
        <td></td>
        <td color="#006717" className=" fw-bold">
          {promotions.totalPriceForPromotions}
        </td>
        <td></td>
      </tr>
    </>
  );

  return (
    <div>
      <TableTitle>
        <h4>Promotions</h4>
      </TableTitle>

      <InfoTable layout={"auto"} border="1px solid #222">
        <thead>
          <tr>
            <th>Items</th>
            <th>Description</th>
            <th>Price</th>
            <th color="#006717">Total</th>
            <th>---</th>
          </tr>
        </thead>
        <tbody>
          <TbodyTemplate />
        </tbody>
      </InfoTable>
      <TableTitle>
        <h4>Promotions Total</h4>
        <span className="total">{promotions?.totalPriceForPromotions}</span>
      </TableTitle>
    </div>
  );
};

export default PromotionsTable;
