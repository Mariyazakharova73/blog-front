import React, { FC } from "react";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import s from "./Login.module.scss";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { MAIN_PATH } from "../../utils/constants";
import { AlertAppearance, FormRegisterValues } from "../../types/types";
import { fetchRegister, selectIsAuth } from "../../redux/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";

interface RegistrationProps {
  openAlert: () => void;
  addErrorMessage: (message: string) => void;
  changeColor: (color: AlertAppearance) => void;
}

export const Registration: FC<RegistrationProps> = ({
  openAlert,
  addErrorMessage,
  changeColor,
}) => {
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
      fullName: "Мария",
      email: "2test@test.ru",
      password: "123456",
    },
    mode: "onChange",
  });

  const onSubmit = async (values: FormRegisterValues) => {
    const data: any = await dispatch(fetchRegister(values));

    if (!data.payload.token) {
      openAlert();
      addErrorMessage("Не удалось зарегистрироваться!");
    }

    localStorage.setItem("token", data.payload.token);
    changeColor("success");
    openAlert();
    addErrorMessage("Вы успешно зарегистрировались!");
  };

  if (isAuth) {
    navigate(MAIN_PATH);
  }

  return (
    <Paper classes={{ root: s.root }}>
      <Typography classes={{ root: s.title }} variant="h5">
        Создание аккаунта
      </Typography>
      <div className={s.avatar}>
        <Avatar sx={{ width: 100, height: 100 }} />
      </div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <TextField
          className={s.field}
          label="Полное имя"
          error={Boolean(errors.fullName?.message)}
          fullWidth
          helperText={errors.fullName?.message}
          {...register("fullName", { required: "Укажите полное имя" })}
        />
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
          Зарегистрироваться
        </Button>
      </form>
    </Paper>
  );
};
