import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../styles/globals.css";
import AppLayout from "@/layout/AppLayout";
import { RecoilRoot } from "recoil";
import Head from "next/head";
export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <>
      <Head>
        <meta name="robots" content="index, follow" />
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#476055" />
        <meta
          name="title"
          content="Rentaly - Quản lý nhà trọ và CCMN"
        />
        <meta
          name="description"
          content="Rentaly - Quản lý nhà trọ và CCMN"
        />
        <link
          rel="icon"
          type="image/png"
          href="/images/logo.png"
        />
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,maximum-scale=1,shrink-to-fit=no"
        />
        <title>Rentaly - Quản lý nhà trọ và CCMN</title>
      </Head>
      <RecoilRoot>
        <AppLayout>
          <Component {...pageProps} />
        </AppLayout>
      </RecoilRoot>
    </>
  );
}
