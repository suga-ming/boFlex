import { BrowserRouter, Routes, Route, useMatch } from "react-router-dom";
import Header from "../Components/Header";
import GlobalStyle from "../styles/GlobalStyles";
import Home from "./Home";
import Search from "./Search";
import Tv from "./Tv";

const Router = () => {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />}></Route>
        <Route path="movies/:id" element={<Home />}></Route>
        <Route path="/tv" element={<Tv />}></Route>
        <Route path="/search" element={<Search />}></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default Router;
