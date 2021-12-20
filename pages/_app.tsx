import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import { RecoilRoot } from "recoil";
import NextNProgress from "nextjs-progressbar";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider>
      <RecoilRoot>
        <NextNProgress height={5} />

        <Component {...pageProps} />
      </RecoilRoot>
    </ChakraProvider>
  );
}
export default MyApp;
