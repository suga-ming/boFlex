import React, { useEffect } from "react";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearch, IGetShowResult } from "../api/axios";
import { makeImagePath } from "../utils";

const Container = styled.div`
  margin: 100px 0 0 60px;
`;

const Box = styled.div<{ bgPhoto: string }>`
  width: 300px;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  border-radius: 7px;
  /* margin-top: 20px; */
`;

const BoxArea = styled.div`
  display: grid;
  width: 900px;
  margin-top: 20px;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
`;

const Search = () => {
  const location = useLocation();
  const keyword = new URLSearchParams(location.search).get("keyword");
  console.log("keyword", keyword);

  const { data, isLoading } = useQuery<IGetShowResult>(
    ["search", keyword],
    () => getSearch(keyword)
  );
  console.log("search", data);

  return (
    <Container>
      <h1>{keyword}의 검색결과 입니다.</h1>
      <BoxArea>
        {data?.results.map((list) => (
          <Box bgPhoto={makeImagePath(list?.backdrop_path, "w500")} />
        ))}
      </BoxArea>
    </Container>
  );
};

export default Search;
