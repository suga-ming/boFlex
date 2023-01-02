import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IGetShowResult } from "../api/axios";

const Container = styled.div`
  position: relative;
  top: -100px;
`;

const Row = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  margin-bottom: 5px;
  position: absolute;
  width: 100%;
`;

const Box = styled(motion.div)<{ bgPhoto: string }>`
  background-color: white;
  height: 200px;
  background-image: url(${(props) => props.bgPhoto});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  display: flex;
  align-items: flex-end;
`;

const Info = styled(motion.div)`
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  padding: 10px;
  width: 100%;
  h4 {
    text-align: center;
    font-size: 18px;
  }
`;

const MovieTitle = styled.p`
  margin-bottom: 10px;
  font-size: 20px;
  padding-left: 10px;
  font-weight: 800;
`;

const NextSvg = styled.svg`
  position: absolute;
  z-index: 1;
  width: 30px;
  height: 30px;
  right: 15px;
  top: 112px;
  cursor: pointer;
`;

const PrevSvg = styled.svg`
  position: absolute;
  z-index: 1;
  width: 30px;
  height: 30px;
  left: 15px;
  top: 112px;
  cursor: pointer;
`;

const rowVariants = {
  hidden: (back: boolean) => ({
    x: back ? -window.outerWidth - 5 : window.outerWidth + 5,
  }),
  visible: {
    x: 0,
  },
  exit: (back: boolean) => ({
    x: back ? window.outerWidth + 5 : -window.outerWidth - 5,
  }),
};

const boxVariants = {
  normal: {
    scale: 1,
  },
  hover: {
    scale: 1.2,
    y: -30,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

const infoVariants = {
  hover: {
    opacity: 1,
    transition: {
      delay: 0.3,
      type: "tween",
    },
  },
};

interface IData {
  data: IGetShowResult;
  type: string;
}

const Slider = ({ data, type }: IData) => {
  console.log("datass", data);
  const navigate = useNavigate();

  const [index, setIndex] = useState(0);
  const [leaving, setLeaving] = useState(false);
  const [back, setBack] = useState(false);
  console.log(type, "type");

  const offset = 6;
  const increaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((next) => (next == maxIndex ? 0 : next + 1));
      setBack(false);
      console.log("increase", back);
      console.log("index", index);
    }
  };
  const decreaseIndex = () => {
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const totalMovies = data.results.length - 1;
      const maxIndex = Math.floor(totalMovies / offset) - 1;
      setIndex((prev) => (prev == 0 ? maxIndex : prev - 1));
      setBack(true);
      console.log("decrease", back);
      console.log("index", index);
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  const onBoxClicked = (showId: number) => {
    if (type == "movie") navigate(`/movies/${showId}`);
    else navigate(`/tv/${showId}`);
  };
  useEffect(() => {}, [back, index]);
  return (
    <div>
      <Container>
        <MovieTitle>Now Playing</MovieTitle>
        <NextSvg
          onClick={increaseIndex}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="white"
            d="M438.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-160-160c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L338.8 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l306.7 0L233.4 393.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l160-160z"
          />
        </NextSvg>
        <PrevSvg
          onClick={decreaseIndex}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 448 512"
        >
          <path
            fill="white"
            d="M9.4 233.4c-12.5 12.5-12.5 32.8 0 45.3l160 160c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L109.2 288 416 288c17.7 0 32-14.3 32-32s-14.3-32-32-32l-306.7 0L214.6 118.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0l-160 160z"
          />
        </PrevSvg>
        <AnimatePresence
          initial={false}
          onExitComplete={toggleLeaving}
          custom={back}
        >
          <Row
            custom={back}
            variants={rowVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ type: "tween", duration: 1 }}
            key={index}
          >
            {data?.results
              .slice(1)
              .slice(offset * index, offset * index + offset)
              .map((show) => (
                <Box
                  variants={boxVariants}
                  initial="normal"
                  layoutId={show.id + ""}
                  whileHover="hover"
                  onClick={() => onBoxClicked(show.id)}
                  key={show.id}
                  transition={{ type: "tween" }}
                  bgPhoto={makeImagePath(show.backdrop_path, "w500")}
                >
                  <Info variants={infoVariants}>
                    <h4>{type == "movie" ? show.title : show.name}</h4>
                  </Info>
                </Box>
              ))}
          </Row>
        </AnimatePresence>
      </Container>
    </div>
  );
};

export default Slider;
