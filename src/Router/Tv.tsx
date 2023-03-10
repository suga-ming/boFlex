import { AnimatePresence, motion, useScroll } from "framer-motion";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { useNavigate, useMatch } from "react-router-dom";
import styled from "styled-components";
import { getMovies, getTv, IGetShowResult } from "../api/axios";
import Slider from "../Components/Slider";
import { makeImagePath } from "../utils";

const Wrapper = styled.div`
  background-color: black;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgPhoto: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 60px;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
`;

const Title = styled.h2`
  font-size: 48px;
  margin-bottom: 15px;
`;

const Overview = styled.p`
  font-size: 20px;
  width: 50%;
`;

const Overlay = styled(motion.div)`
  position: fixed;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const BigMoive = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 80vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
`;

const BigCover = styled.div`
  width: 100%;
  background-size: cover;
  background-position: center center;
  height: 400px;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  padding: 20px;
  font-size: 33px;
  font-weight: 700;
  position: relative;
  top: -80px;
`;

const BogOverView = styled.p`
  padding: 20px;
  top: -80px;
  position: relative;
  color: ${(props) => props.theme.white.lighter};
`;

const SliderContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Tv = () => {
  const navigate = useNavigate();
  const bigMovieMatch = useMatch("/tv/:tvId");
  console.log("dac", bigMovieMatch);
  const { scrollY } = useScroll();

  const { data, isLoading } = useQuery<IGetShowResult>(
    ["tv", "nowPlaying"],
    getTv
  );
  console.log("Tvdata?", data);

  const overlayClick = () => {
    navigate(`/tv`);
  };
  const clickedMovie =
    bigMovieMatch?.params.tvId &&
    data?.results.find(
      (movie) => String(movie.id) === bigMovieMatch.params.tvId
    );

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgPhoto={makeImagePath(data?.results[1].backdrop_path || "")}>
            <Title>{data?.results[1].name}</Title>
            <Overview>{data?.results[1].overview}</Overview>
          </Banner>
          <SliderContainer>
            <Slider data={data as IGetShowResult} type={"tv"} />
          </SliderContainer>

          <AnimatePresence>
            {bigMovieMatch ? (
              <>
                <Overlay
                  onClick={overlayClick}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMoive
                  layoutId={bigMovieMatch.params.tvId}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black,transparent),url(${makeImagePath(
                            clickedMovie.backdrop_path,
                            "w500"
                          )})`,
                        }}
                      />
                      <BigTitle>{clickedMovie.name}</BigTitle>
                      <BogOverView>{clickedMovie.overview}</BogOverView>
                    </>
                  )}
                </BigMoive>
              </>
            ) : null}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Tv;
