import React, { FC } from "react";
import Button from "@mui/material/Button";
import s from "./Header.module.scss";
import Container from "@mui/material/Container";
import { Link } from "react-router-dom";
import { LOGIN_PATH, MAIN_PATH, POST_CREATE_PATH, REGISTER_PATH } from "../../utils/constants";

export const Header: FC = () => {
  const isAuth = false;

  const onClickLogout = () => {};

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
                <Link to={POST_CREATE_PATH}>
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
