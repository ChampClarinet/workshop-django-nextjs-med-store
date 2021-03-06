import React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';

export default class MyDocument extends Document {
    render() {
        return (
            <Html lang="en">
                <Head>
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:400,700 subset=cyrillic-ext,latin" key="font-1" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Material+Icons:400,700 subset=cyrillic-ext,latin" key="font-2" />
                </Head>
                <body>
                    <Main />
                    <NextScript />
                </body>
            </Html>
        );
    }
}