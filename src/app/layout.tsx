"use client";
import "./globals.css";
import Head from "next/head";
import { Inter } from "next/font/google";
import { Providers } from "./provider";
import { Box, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import Home from "./home";

import useUser from "./lib/hooks/useUser";

import { useEffect, useState } from "react";
import { SnackbarProvider } from "notistack";
import Login from "./login";
import { ConfirmProvider } from "material-ui-confirm";
import "moment/locale/es";
const inter = Inter({ subsets: ["latin"] });

// export const metadata: Metadata = {
//   title: "Refrigeración segundo",
//   description: "Pagina administrativa",
// };
export const darkTheme = createTheme({
  palette: {
    mode: "dark",
  },
});
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const home = useUser({ redirectTo: "/login" });
  useEffect(() => {
    setIsPageLoaded(true);
  }, []);

  return (
    <html lang="en">
      <Head>
        <title>Refrigeración segundo</title>
        <meta property="og:title" content="My page title" key="title" />
        <link rel="icon" type="image/x-icon" href="favicon.ico" />
      </Head>
      <body className={inter.className}>
        <Providers>
          <ThemeProvider theme={darkTheme}>
            <CssBaseline />
            <SnackbarProvider>
              <ConfirmProvider>
                <Box>
                  {home.user && <Home />}
                  {!home.user && <Login />}
                  {children}
                </Box>
              </ConfirmProvider>
            </SnackbarProvider>
          </ThemeProvider>
        </Providers>
      </body>
    </html>
  );
}
