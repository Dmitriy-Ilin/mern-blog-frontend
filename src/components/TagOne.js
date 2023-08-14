import React, { useEffect, useState } from "react";
import Stack from "@mui/joy/Stack";
import Item from "@mui/joy/Stack";
import { useParams } from "react-router-dom";
import axios from "../axios";
import { Post } from "./Post";

const TagOne = () => {
  const [data, setData] = useState();
  const { name } = useParams();

  useEffect(() => {
    axios
      .get(`tags/${name}`)
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("произошла ошибка при выборе тега");
      });
  }, [name]);

  const tagName = name.toUpperCase();

  return (
    <div>
      <h1>{`#${tagName}`}</h1>
      <Stack spacing={2}>
        {data?.map((obj, index) => (
          <Item key={index}>
            {" "}
            <Post
              id={obj._id}
              title={obj.title}
              imageUrl={
                obj.imageUrl ? `http://localhost:4444${obj.imageUrl}` : ""
              }
              user={obj.user}
              createdAt={obj.createdAt}
              viewsCount={obj.viewsCount}
              commentsCount={obj.comments.length}
              tags={obj.tags}
            />
          </Item>
        ))}
      </Stack>
    </div>
  );
};

export default TagOne;