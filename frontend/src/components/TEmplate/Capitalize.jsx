import React from "react";
function cFL(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

// Example:
// capitalizeFirstLetter("movies"); // "Movies"

export default cFL;