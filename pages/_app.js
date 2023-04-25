import "@/styles/globals.css";
import Head from "next/head";
import Script from "next/script";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

export default function App({ Component, pageProps }) {
  return (
    <div className="bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-blue-100 via-blue-300 to-blue-500 h-screen overflow-auto">
      <Head>
        <title>MDP</title>
      </Head>
      <Script
        type="module"
        src="https://gradio.s3-us-west-2.amazonaws.com/3.27.0/gradio.js"
      />
      <NavBar />
      <Footer />
    </div>
  );
}
