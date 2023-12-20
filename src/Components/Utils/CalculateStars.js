import React from "react";

function CalculateStars(data) {
  const totalStars = data.reduce((total, current) => {
    return total + current.star * current.count;
  }, 0);
  const totalFeedback = data.reduce((total, curr) => {
    return total + curr.count;
  }, 0);
  return Number.parseFloat(totalStars / totalFeedback).toFixed(1);
}

export default CalculateStars;
