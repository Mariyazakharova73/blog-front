import React, { FC } from "react";
import styles from "./SideBlock.module.scss";
import Typography from "@mui/material/Typography";
import Paper from "@mui/material/Paper";
import { ReactNode } from "react-markdown/lib/react-markdown";

interface SideBlockProps {
  title: string;
  children: ReactNode;
}

export const SideBlock: FC<SideBlockProps> = ({ title, children }) => {
  return (
    <Paper classes={{ root: styles.root }}>
      <Typography variant="h6" classes={{ root: styles.title }}>
        {title}
      </Typography>
      {children}
    </Paper>
  );
};
