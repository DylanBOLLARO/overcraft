import Head from "next/head";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import Header from "./Header";

interface LayoutProps {
  children: React.ReactNode;
  title?: string;
}

export default function Layout({ children, title }: LayoutProps) {
  const darkTheme = createTheme({
    palette: {
      mode: "dark",
    },
  });

  return (
    <>
      <Head>
        <title>sc2-build-order-ts-settings</title>
      </Head>
      <ThemeProvider theme={darkTheme}>
        <Header title={title || ""} />
        <main className="mt-24">{children}</main>
      </ThemeProvider>
    </>
  );
}
