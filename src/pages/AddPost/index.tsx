import React, { ChangeEvent, FC, RefObject, useCallback, useEffect, useRef, useState } from "react";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Button from "@mui/material/Button";
import SimpleMDE from "react-simplemde-editor";
import { useSelector } from "react-redux";
import "easymde/dist/easymde.min.css";
import s from "./AddPost.module.scss";
import { selectIsAuth } from "../../redux/slices/authSlice";
import { ALL_POSTS_PATH, AUTH_UPLOAD_PATH, BASE_URL, MAIN_PATH } from "../../utils/constants";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "../../axios";

export const AddPost: FC = () => {
  const options: EasyMDE.Options = React.useMemo(
    () => ({
      spellChecker: false,
      maxHeight: "400px",
      autofocus: true,
      placeholder: "Введите текст...",
      status: false,
      autosave: {
        enabled: true,
        delay: 1000,
        uniqueId: "123",
      },
    }),
    []
  );
  const navigate = useNavigate();
  const { id } = useParams();
  const isAuth = useSelector(selectIsAuth);
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");
  const [values, setValues] = React.useState({ title: "", text: "", tags: "" });
  const inputFileRef: RefObject<HTMLInputElement> = useRef(null);
  const isEditing = Boolean(id);

  const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const formData = new FormData();
      if (e.target.files) {
        formData.append("image", e.target.files[0]);
        const { data } = await axios.post(AUTH_UPLOAD_PATH, formData);
        setImageUrl(data.url);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const onClickRemoveImage = () => {
    setImageUrl("");
  };

  const onChangeText = useCallback(
    (text: string) => {
      setValues({ ...values, text: text });
    },
    [values]
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setValues({ ...values, [name]: value });
  };

  const onSubmit = async () => {
    try {
      setIsLoading(true);
      const fields = {
        title: values.title,
        text: values.text,
        tags: values.tags,
        imageUrl,
      };
      const { data } = isEditing
        ? await axios.patch(`${ALL_POSTS_PATH}/${id}`, fields)
        : await axios.post(ALL_POSTS_PATH, fields);

      const resId = isEditing ? id : data._id;
      navigate(`${ALL_POSTS_PATH}/${resId}`);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isAuth && !localStorage.getItem("token")) {
    navigate(MAIN_PATH);
  }

  useEffect(() => {
    // страница редактирования поста
    if (id) {
      // для установки значения в input и src
      axios.get(`${ALL_POSTS_PATH}/${id}`).then(({ data }) => {
        setValues({ title: data.title, text: data.text, tags: data.tags.join(", ") });
        setImageUrl(data.imageUrl);
      });
    }
  }, []);

  return (
    <Paper style={{ padding: 30 }}>
      <Button onClick={() => inputFileRef?.current?.click()} variant="outlined" size="large">
        Загрузить превью
      </Button>
      <input type="file" ref={inputFileRef} onChange={handleChangeFile} hidden />
      {imageUrl && (
        <>
          <Button variant="contained" color="error" onClick={onClickRemoveImage}>
            Удалить
          </Button>
          <img className={s.image} src={`${BASE_URL}${imageUrl}`} alt="Uploaded" />
        </>
      )}
      <br />
      <br />
      <TextField
        name="title"
        classes={{ root: s.title }}
        variant="standard"
        placeholder="Заголовок статьи..."
        fullWidth
        value={values.title}
        onChange={handleChange}
      />
      <TextField
        name="tags"
        value={values.tags}
        classes={{ root: s.tags }}
        variant="standard"
        placeholder="Тэги"
        fullWidth
        onChange={handleChange}
      />
      <SimpleMDE
        className={s.editor}
        value={values.text}
        onChange={onChangeText}
        options={options}
      />
      <div className={s.buttons}>
        <Button size="large" variant="contained" onClick={onSubmit}>
          {isEditing ? "Сохранить" : "Опубликовать"}
        </Button>
        <Link to={MAIN_PATH}>
          <Button size="large">Отмена</Button>
        </Link>
      </div>
    </Paper>
  );
};
