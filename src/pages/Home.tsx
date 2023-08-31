import React, { FC, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Grid from "@mui/material/Grid";
import { Post, TagsBlock, CommentsBlock } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch } from "../redux/store";
import {
  fetchPosts,
  fetchTags,
  selectPosts,
  selectStatus,
  selectTags,
  selectTagsStatus,
} from "../redux/slices/postsSlice";
import { Status } from "../types/types";
import { selectUserData } from "../redux/slices/authSlice";

export const Home: FC = () => {
  const dispatch: AppDispatch = useDispatch();
  const posts = useSelector(selectPosts);
  const userData = useSelector(selectUserData);
  const status = useSelector(selectStatus);
  const tags = useSelector(selectTags);
  const tagsStatus = useSelector(selectTagsStatus);
  const isPostsLoading = status === Status.LOADING;
  const isTagsLoading = tagsStatus === Status.LOADING;

  useEffect(() => {
    dispatch(fetchPosts());
    dispatch(fetchTags());
  }, []);

  return (
    <>
      <Tabs style={{ marginBottom: 15 }} value={0} aria-label="basic tabs example">
        <Tab label="Новые" />
        <Tab label="Популярные" />
      </Tabs>
      <Grid container spacing={4}>
        <Grid xs={8} item>
          {isPostsLoading
            ? [Array(5)].map((i, index) => <Post key={index} isLoading={isPostsLoading} />)
            : posts.map((item) => (
                <Post
                  key={item._id}
                  id={item._id}
                  title={item.title}
                  imageUrl={item.imageUrl || ""}
                  user={{
                    avatarUrl: item.user?.avatarUrl,
                    fullName: item.user?.fullName,
                  }}
                  createdAt={item.createdAt}
                  viewsCount={item.viewsCount}
                  commentsCount={3}
                  tags={item.tags}
                  isEditable={userData?._id === item?.user?._id}
                />
              ))}
        </Grid>
        <Grid xs={4} item>
          <TagsBlock items={tags} isLoading={isTagsLoading} />
          <CommentsBlock
            items={[
              {
                user: {
                  fullName: "Вася Пупкин",
                  avatarUrl: "https://mui.com/static/images/avatar/1.jpg",
                },
                text: "Это тестовый комментарий",
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
            children={undefined}
          />
        </Grid>
      </Grid>
    </>
  );
};
