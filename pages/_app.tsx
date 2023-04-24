import netlifyIdentity from "netlify-identity-widget";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import BaseStyles from "../styles/base-styles";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  return (
    <>
      <BaseStyles />
      <Component {...pageProps} />
    </>
  );
}
