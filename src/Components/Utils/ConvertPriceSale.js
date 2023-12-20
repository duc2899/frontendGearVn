const priceSale = (oldPrice, rate) => {
  const percent = (100 - rate * 100) / 100;
  return oldPrice * percent;
};
export default priceSale;
