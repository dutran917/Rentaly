import "@/styles/globals.css";
import type { AppProps } from "next/app";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import AppLayout from "@/layout/AppLayout";
import { RecoilRoot } from "recoil";
export default function App({
  Component,
  pageProps,
}: AppProps) {
  return (
    <RecoilRoot>
      <AppLayout>
        <Component {...pageProps} />
      </AppLayout>
    </RecoilRoot>
  );
}
