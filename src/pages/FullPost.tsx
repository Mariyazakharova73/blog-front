import React, { FC, useEffect, useState } from "react";
import { Post } from "../components/Post";
import { Index } from "../components/AddComment";
import { CommentsBlock } from "../components/CommentsBlock";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { PostItem } from "../types/types";

export const FullPost: FC = () => {
  const [post, setPost] = useState<PostItem | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`/posts/${id}`)
      .then((res) => setPost(res.data))
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return <Post isLoading={true} isFullPost />;
  }

  return (
    <>
      <Post
        id={post?._id}
        title={post?.title}
        imageUrl={post?.imageUrl || ""}
        user={{
          avatarUrl: post?.user.avatarUrl,
          fullName: post?.user.fullName,
        }}
        createdAt={post?.createdAt}
        viewsCount={post?.viewsCount}
        commentsCount={3}
        tags={post?.tags}
        isFullPost
      >
        <p>{post?.text}</p>
      </Post>
      <CommentsBlock
        items={[
          {
            user: {
              fullName: "Вася Пупкин",
              avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
            },
            text: "Это тестовый комментарий 555555",
          },
          {
            user: {
              fullName: "Иван Иванов",
              avatarUrl: "https://mui.com/static/images/avatar/2.jpg",
            },
            text: "When displaying three lines or more, the avatar is not aligned at the top. You should set the prop to align the avatar at the top",
          },
        ]}
        isLoading={false}
      >
        <Index />
      </CommentsBlock>
    </>
  );
};
