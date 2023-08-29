import React, { FC } from "react";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { ADD_POST_PATH, LOGIN_PATH, MAIN_PATH, POST_PATH, REGISTER_PATH } from "./utils/constants";

const App: FC = () => {
  return (
    <>
      <Header />
      <Container maxWidth="lg">
        <Routes>
          <Route path={MAIN_PATH} element={<Home />} />
          <Route path={POST_PATH} element={<FullPost />} />
          <Route path={ADD_POST_PATH} element={<AddPost />} />
          <Route path={LOGIN_PATH} element={<Login />} />
          <Route path={REGISTER_PATH} element={<Registration />} />
        </Routes>
      </Container>
    </>
  );
};

export default App;
