import React, { FC } from "react";
import s from "./UserInfo.module.scss";

interface UserInfoProps {
  avatarUrl: string;
  fullName: string;
  additionalText: string;
}

export const UserInfo: FC<UserInfoProps> = ({ avatarUrl, fullName, additionalText }) => {
  return (
    <div className={s.root}>
      <img className={s.avatar} src={avatarUrl || "/noavatar.png"} alt={fullName} />
      <div className={s.userDetails}>
        <span className={s.userName}>{fullName}</span>
        <span className={s.additional}>{additionalText}</span>
      </div>
    </div>
  );
};
