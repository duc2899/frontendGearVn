import React from "react";

function ConvertStringToLowercase(string) {
  return string.charAt(0) + string.toLowerCase().substring(1);
}

export default ConvertStringToLowercase;
