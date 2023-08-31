import React, { FC, useEffect } from "react";
import Container from "@mui/material/Container";
import { Routes, Route } from "react-router-dom";
import { Header } from "./components";
import { Home, FullPost, Registration, AddPost, Login } from "./pages";
import { ADD_POST_PATH, LOGIN_PATH, MAIN_PATH, POST_PATH, REGISTER_PATH } from "./utils/constants";
import { AlertMessage } from "./components/AlertMessage/AlertMessage";
import { useDispatch, useSelector } from "react-redux";
import { AlertAppearance } from "./types/types";
import { AppDispatch } from "./redux/store";
import { fetchAuthMe, selectIsAuth } from "./redux/slices/authSlice";

const App: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const isAuth = useSelector(selectIsAuth);
  const [open, setOpen] = React.useState(false);
  const [message, setMessage] = React.useState("");
  const [color, setColor] = React.useState<AlertAppearance>("error");

  const closeAlert = () => {
    setOpen(false);
  };

  const openAlert = () => {
    setOpen(true);
  };

  const addErrorMessage = (message: string) => {
    setMessage(message);
  };

  const changeColor = (color: AlertAppearance) => {
    setColor(color);
  };

  useEffect(() => {
    dispatch(fetchAuthMe());
  }, []);

  return (
    <>
      <AlertMessage
        open={open}
        closeAlert={closeAlert}
        openAlert={openAlert}
        message={message}
        color={color}
      />
      <Header openAlert={openAlert} addErrorMessage={addErrorMessage} changeColor={changeColor} />
      <Container maxWidth="lg">
        <Routes>
          <Route path={MAIN_PATH} element={<Home />} />
          <Route path={POST_PATH} element={<FullPost />} />
          <Route path={ADD_POST_PATH} element={<AddPost />} />
          <Route
            path={LOGIN_PATH}
            element={
              <Login
                openAlert={openAlert}
                addErrorMessage={addErrorMessage}
                changeColor={changeColor}
              />
            }
          />
          <Route
            path={REGISTER_PATH}
            element={
              <Registration
                openAlert={openAlert}
                addErrorMessage={addErrorMessage}
                changeColor={changeColor}
              />
            }
          />
        </Routes>
      </Container>
    </>
  );
};

export default App;
