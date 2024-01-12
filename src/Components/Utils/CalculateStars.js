function CalculateStars(data) {
  const totalStars = data.reduce((total, current) => {
    return total + current.star;
  }, 0);
  const res = totalStars / data.length;
  return res ? res.toFixed(1) : 0;
}

export default CalculateStars;
