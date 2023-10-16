import { Html, Head, Main, NextScript } from 'next/document';
import Script from 'next/script';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>BrainWave AI ChatBot</title>
        {/* <meta name="description" content="" /> */}
        <link rel="icon" type="image/x-icon" href="/brain.ico" />
      </Head>
      <body suppressHydrationWarning={true}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
