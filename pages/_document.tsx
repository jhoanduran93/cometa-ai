import { Html, Head, Main, NextScript } from 'next/document';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <title>Cometa AI ChatBot</title>
        {/* Otros metadatos y enlaces */}
        <link rel="icon" type="image/x-icon" href="/cometa.ico" />

        {/* Agrega el script de Hotjar aquí */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(h,o,t,j,a,r){
                h.hj=h.hj||function(){(h.hj.q=h.hj.q||[]).push(arguments)};
                h._hjSettings={hjid: 3710371, hjsv: 6};
                a=o.getElementsByTagName('head')[0];
                r=o.createElement('script');r.async=1;
                r.src=t+h._hjSettings.hjid+j+h._hjSettings.hjsv;
                a.appendChild(r);
              })(window,document,'https://static.hotjar.com/c/hotjar-','.js?sv=');
            `
          }}
        />
      </Head>
      <body suppressHydrationWarning={true}>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}

