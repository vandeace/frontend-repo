"use client";
import ListPost from "@/components/listPost";
import { Typography, AppBar, Toolbar, IconButton } from "@mui/material";
import { Add, LogoutSharp } from "@mui/icons-material";
import ModalCreate from "@/components/ModalCreate";
import React from "react";
import { signOut } from "firebase/auth";
import { auth } from "@/apis/firebase";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleLogout = () => {
    signOut(auth).then(() => {
      router.push("/login");
      localStorage.removeItem("token");
    });
  };
  return (
    <div>
      <AppBar position="sticky">
        <Toolbar
          variant="regular"
          style={{
            width: "100%",
            display: "flex",
            justifyContent: "space-between",
            padding: "6px 64px 6px 64px",
          }}
        >
          <Typography variant="h5" color="inherit" component="div">
            Main Page
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ gap: 2 }}
            onClick={handleLogout}
          >
            <Typography variant="button">Logout</Typography>
            <LogoutSharp />
          </IconButton>
        </Toolbar>
      </AppBar>
      <main className="flex-1 flex-col items-center p-16">
        <div className="flex items-center justify-between">
          <Typography>List Post</Typography>
          <IconButton
            edge="start"
            color="primary"
            aria-label="menu"
            sx={{ gap: 2 }}
            onClick={handleOpen}
          >
            <Typography variant="button">Add Data</Typography>
            <Add />
          </IconButton>
        </div>
        <ModalCreate open={open} handleClose={handleClose} />
        <ListPost />
      </main>
    </div>
  );
}
