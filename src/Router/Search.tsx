import React from "react";
import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get;
  console.log(keyword);
  return <div>Search</div>;
};

export default Search;
