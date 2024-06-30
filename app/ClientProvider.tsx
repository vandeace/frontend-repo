"use client";
import store from "@/store";
import ThemeProvider from "@mui/material/styles/ThemeProvider";
import React, { useEffect } from "react";
import { Provider, useDispatch } from "react-redux";
import { createTheme } from "@mui/material/styles";
import { useRouter } from "next/navigation";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  let token: null | string = null;
  if (typeof window !== "undefined") {
    token = localStorage.getItem("token");
  }
  const router = useRouter();
  const theme = createTheme({
    palette: {
      primary: {
        main: "#1976d2",
      },
      secondary: {
        main: "#dc004e",
      },
    },
    typography: {
      fontFamily: "Roboto, sans-serif",
    },
  });

  useEffect(() => {
    if (!token) {
      router.push("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </Provider>
  );
};

export default ClientProvider;
