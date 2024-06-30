import { AppDispatch, RootState } from "@/store";
import { fetchPostsThunk } from "@/store/fetchPost";
import { Delete, Edit, PersonPinCircle } from "@mui/icons-material";
import { Box, Button, Card, IconButton, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const ListPost = () => {
  const router = useRouter();
  const dispatch: AppDispatch = useDispatch();
  const { posts, error } = useSelector((state: RootState) => state.post);

  useEffect(() => {
    dispatch(fetchPostsThunk());
  }, [dispatch]);

  //return to login if error
  useEffect(() => {
    if (!!error) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          marginTop: 16,
          gap: 16,
        }}
      >
        {!!posts.length &&
          posts?.map((data, index) => {
            return (
              <Box
                width={300}
                height={300}
                key={index}
                flexDirection={"column"}
                sx={{
                  border: 1,
                  padding: 2,
                  display: "flex",
                  justifyContent: "space-between",
                  flexDirection: "column",
                }}
              >
                <Box>
                  <Typography variant="h6">{data.title}</Typography>
                  <Typography variant="body1">{data.description}</Typography>
                </Box>
                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                  }}
                >
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ gap: 2 }}
                  >
                    <Typography variant="button">Delete</Typography>
                    <Delete />
                  </IconButton>
                  <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    sx={{ gap: 2 }}
                  >
                    <Typography variant="button">Edit</Typography>
                    <Edit />
                  </IconButton>
                </Box>
              </Box>
            );
          })}
        {posts.length === 0 && <Box>No Data</Box>}
      </div>
    </div>
  );
};

export default ListPost;
