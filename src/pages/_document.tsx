import {
  Html,
  Head,
  Main,
  NextScript,
} from "next/document";

export default function Document() {
  return (
    <Html lang="en">
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
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
