// Hàm lấy danh sách các creator hàng đầu dựa trên tổng doanh thu từ NFT đã bán
export const getTopCreators = (creators) => {
  const finalCreators = [];
  // Nhóm các NFT theo người bán (seller)
  const finalResults = creators.reduce((index, currentValue) => {
    (index[currentValue.seller] = index[currentValue.seller] || []).push(
      currentValue
    );

    return index;
  }, {});
  // Tính tổng giá trị NFT đã bán cho từng seller và thêm vào danh sách finalCreators
  Object.entries(finalResults).forEach((item) => {
    const seller = item[0];
    const total = item[1]
      .map((newItem) => Number(newItem.price))
      .reduce((previousValue, currentValue) => previousValue + currentValue, 0);

    finalCreators.push({ seller, total });
  });

  return finalCreators;
};
