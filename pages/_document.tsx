import { Head, Html, Main, NextScript } from 'next/document';

import { ColorModeScript } from '@chakra-ui/react';

export default function Document() {
  return (
    <Html lang="zh-CN">
      <Head />
      <body>
        <ColorModeScript initialColorMode="system" />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
