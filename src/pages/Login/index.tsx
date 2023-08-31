import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import s from "./Login.module.scss";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchAuth, selectIsAuth } from "../../redux/slices/authSlice";
import { AlertAppearance, FormLoginValues } from "../../types/types";
import { useNavigate } from "react-router-dom";
import { MAIN_PATH } from "../../utils/constants";
import { PayloadAction } from "@reduxjs/toolkit";

interface LoginProps {
  openAlert: () => void;
  addErrorMessage: (message: string) => void;
  changeColor: (color: AlertAppearance) => void;
}

export const Login: FC<LoginProps> = ({ openAlert, addErrorMessage, changeColor }) => {
  const dispatch: AppDispatch = useDispatch();
  const navigate = useNavigate();
  const isAuth = useSelector(selectIsAuth);

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: {
      email: "test@test.ru",
      password: "123456",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: FormLoginValues) => {
    const data: PayloadAction<any> = await dispatch(fetchAuth(values));

    if (!data.payload.token) {
      openAlert();
      addErrorMessage("Не удалось авторизоваться!");
    }

    localStorage.setItem("token", data.payload.token);
    changeColor("success");
    openAlert();
    addErrorMessage("Вы успешно авторизовались!");
  };

  if (isAuth) {
    navigate(MAIN_PATH);
  }

  return (
    <Paper classes={{ root: s.root }}>
      <Typography classes={{ root: s.title }} variant="h5">
        Вход в аккаунт
      </Typography>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={s.field}
          label="E-Mail"
          error={Boolean(errors.email?.message)}
          fullWidth
          helperText={errors.email?.message}
          {...register("email", { required: "Укажите почту" })}
        />
        <TextField
          className={s.field}
          label="Пароль"
          error={Boolean(errors.password?.message)}
          fullWidth
          helperText={errors.password?.message}
          {...register("password", { required: "Введите пароль" })}
        />
        <Button type="submit" size="large" variant="contained" fullWidth disabled={!isValid}>
          Войти
        </Button>
      </form>
    </Paper>
  );
};
