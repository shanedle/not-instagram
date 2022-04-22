import Head from "next/head";

import Feed from "../components/Feed";
import NavBar from "../components/NavBar";
import UploadModal from "../components/UploadModal";

export default function Home() {
  return (
    <div className="bg-gray-50 min-h-screen">
      <Head>
        <title>Not Instagram</title>
        <meta name="description" content="Instagram Clone made with Next.js" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NavBar />
      <Feed />
      <UploadModal />
    </div>
  );
}
