import { NextSeo } from "next-seo";
import Feed from "../components/Feed";
import NavBar from "../components/NavBar";
import UploadModal from "../components/UploadModal";

export default function Home() {
  return (
    <>
      <NextSeo
        title="Not Instagram | Home"
        description="Next.js Instagram Clone."
        canonical="https://not-instagram.vercel.app/"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://not-instagram.vercel.app/",
          site_name: "Not Instagram | Home",
          description: "Next.js Instagram Clone.",
        }}
      />
      <div className="bg-gray-50 min-h-screen">
        <NavBar />
        <Feed />
        <UploadModal />
      </div>
    </>
  );
}
