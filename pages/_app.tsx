import type { AppProps } from "next/app";
import { ChakraProvider, ColorModeProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import NextNProgress from "nextjs-progressbar";
import Head from "next/head";
import customTheme from "./../styles/theme";
import "../styles/globals.css";
import { useEffect, useState } from "react";

function MyApp({ Component, pageProps }: AppProps) {
  const [showChild, setShowChild] = useState(false);
  useEffect(() => {
    setShowChild(true);
  }, []);

  if (!showChild) {
    return null;
  }

  if (typeof window === "undefined") {
    return <></>;
  } else {
    return (
      <ChakraProvider resetCSS theme={customTheme}>
        <ColorModeProvider
          options={{
            initialColorMode: "light",
            useSystemColorMode: true,
          }}
        >
          <Head>
            <title>YEEEEET 2.0</title>
            <meta name="tool of tools" content="Made by Liiiaaam93" />
            <link
              rel="apple-touch-icon"
              sizes="180x180"
              href="/apple-touch-ico.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="32x32"
              href="/favico-32x32.png"
            />
            <link
              rel="icon"
              type="image/png"
              sizes="16x16"
              href="/favico-16x16.png"
            />
            <link rel="manifest" href="/site.webmanifest" />
            <link
              rel="mask-icon"
              href="/safari-pinned-tab.svg"
              color="#5bbad5"
            />
            <meta name="msapplication-TileColor" content="#da532c" />
            <meta name="theme-color" content="#ffffff"></meta>
          </Head>
          <RecoilRoot>
            <NextNProgress height={5} />
            <Component {...pageProps} />
          </RecoilRoot>
        </ColorModeProvider>
      </ChakraProvider>
    );
  }
}
export default MyApp;
