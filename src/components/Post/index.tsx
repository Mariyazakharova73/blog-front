import React, { FC } from "react";
import clsx from "clsx";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Clear";
import EditIcon from "@mui/icons-material/Edit";
import EyeIcon from "@mui/icons-material/RemoveRedEyeOutlined";
import CommentIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";

import s from "./Post.module.scss";
import { UserInfo } from "../UserInfo";
import { PostSkeleton } from "./Skeleton";
import { Link } from "react-router-dom";
import { ReactNode } from "react-markdown/lib/react-markdown";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store";
import { fetchRemovePost } from "../../redux/slices/postsSlice";

interface PostProps {
  id?: string;
  title?: string;
  createdAt?: string;
  imageUrl?: string;
  user?: {
    avatarUrl?: string;
    fullName?: string;
  };
  viewsCount?: number;
  commentsCount?: number;
  tags?: string[];
  children?: ReactNode;
  isFullPost?: boolean;
  isLoading?: boolean;
  isEditable?: boolean;
}

export const Post: FC<any> = ({
  id,
  title,
  createdAt,
  imageUrl,
  user,
  viewsCount,
  commentsCount,
  tags,
  children,
  isFullPost,
  isLoading,
  isEditable,
}) => {
  const dispatch: AppDispatch = useDispatch();
  if (isLoading) {
    return <PostSkeleton />;
  }

  const onClickRemove = () => {
    dispatch(fetchRemovePost(id))
  };

  return (
    <div className={clsx(s.root, { [s.rootFull]: isFullPost })}>
      {isEditable && (
        <div className={s.editButtons}>
          <Link to={`/posts/${id}/edit`}>
            <IconButton color="primary">
              <EditIcon />
            </IconButton>
          </Link>
          <IconButton onClick={onClickRemove} color="secondary">
            <DeleteIcon />
          </IconButton>
        </div>
      )}
      {imageUrl && (
        <img
          className={clsx(s.image, { [s.imageFull]: isFullPost })}
          src={imageUrl}
          alt={`${title}.`}
        />
      )}
      <div className={s.wrapper}>
        <UserInfo {...user} additionalText={createdAt} />
        <div className={s.indention}>
          <h2 className={clsx(s.title, { [s.titleFull]: isFullPost })}>
            {isFullPost ? title : <Link to={`/posts/${id}`}>{title}</Link>}
          </h2>
          <ul className={s.tags}>
            {tags?.map((name: string) => (
              <li key={name}>
                <a href={`/tag/${name}`}>#{name}</a>
              </li>
            ))}
          </ul>
          {children && <div className={s.content}>{children}</div>}
          <ul className={s.postDetails}>
            <li>
              <EyeIcon />
              <span>{viewsCount}</span>
            </li>
            <li>
              <CommentIcon />
              <span>{commentsCount}</span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
