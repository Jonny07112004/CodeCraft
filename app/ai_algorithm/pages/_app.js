// src/pages/_app.js
import '../styles/globals.css'; // Global CSS, if any

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;