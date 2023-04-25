import netlifyIdentity from "netlify-identity-widget";
import type { AppProps } from "next/app";
import { useEffect } from "react";
import BaseStyles from "../styles/base-styles";
import { CloudinaryContext } from "cloudinary-react";

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    netlifyIdentity.init();
  }, []);

  return (
    <>
      <BaseStyles />
      <CloudinaryContext cloudName="howisthesurf">
        <Component {...pageProps} />
      </CloudinaryContext>
    </>
  );
}
