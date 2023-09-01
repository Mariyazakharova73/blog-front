import React, { FC } from "react";
import s from "./AddComment.module.scss";
import TextField from "@mui/material/TextField";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";

export const Index: FC = () => {
  return (
    <>
      <div className={s.root}>
        <Avatar classes={{ root: s.avatar }} src="https://mui.com/static/images/avatar/5.jpg" />
        <div className={s.form}>
          <TextField
            label="Написать комментарий"
            variant="outlined"
            maxRows={10}
            multiline
            fullWidth
          />
          <Button variant="contained">Отправить</Button>
        </div>
      </div>
    </>
  );
};
