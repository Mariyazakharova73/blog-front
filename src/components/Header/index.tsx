import React, { FC } from "react";
import Button from "@mui/material/Button";
import s from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { LOGIN_PATH, MAIN_PATH, ADD_POST_PATH, REGISTER_PATH } from "../../utils/constants";
import { useSelector, useDispatch } from "react-redux";
import { logout, selectIsAuth } from "../../redux/slices/authSlice";
import { AppDispatch } from "../../redux/store";
import { AlertAppearance } from "../../types/types";

interface HeaderProps {
  openAlert: () => void;
  addErrorMessage: (message: string) => void;
  changeColor: (color: AlertAppearance) => void;
}

export const Header: FC<HeaderProps> = ({ openAlert, addErrorMessage, changeColor }) => {
  const isAuth = useSelector(selectIsAuth);
  const dispatch: AppDispatch = useDispatch();

  const onClickLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    changeColor("success");
    openAlert();
    addErrorMessage("Вы вышли из аккаунта!");
  };

  return (
    <div className={s.root}>
      <Container maxWidth="lg">
        <div className={s.inner}>
          <Link className={s.logo} to={MAIN_PATH}>
            <div>Logo</div>
          </Link>
          <div className={s.buttons}>
            {isAuth ? (
              <>
                <Link to={ADD_POST_PATH}>
                  <Button variant="contained">Написать статью</Button>
                </Link>
                <Button onClick={onClickLogout} variant="contained" color="error">
                  Выйти
                </Button>
              </>
            ) : (
              <>
                <Link to={LOGIN_PATH}>
                  <Button variant="outlined">Войти</Button>
                </Link>
                <Link to={REGISTER_PATH}>
                  <Button variant="contained">Создать аккаунт</Button>
                </Link>
              </>
            )}
          </div>
        </div>
      </Container>
    </div>
  );
};
