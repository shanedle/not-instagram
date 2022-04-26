import { NextSeo } from "next-seo";
import { getProviders, signIn } from "next-auth/react";

export default function login({ providers }) {
  return (
    <>
      <NextSeo
        title="Not Instagram | Login"
        description="Next.js Instagram Clone."
        canonical="https://not-instagram.vercel.app/"
        openGraph={{
          type: "website",
          locale: "en_US",
          url: "https://not-instagram.vercel.app/",
          site_name: "Not Instagram | Login",
          description: "Next.js Instagram Clone.",
        }}
      />
      <div className="flex justify-center mt-20">
        <img
          className="hidden object-cover md:inline-flex md:w-96"
          src="/images/signin_cover.webp"
          alt="instagram-image"
        />
        <div className="flex max-h-96 border-2">
          {Object.values(providers).map((provider) => (
            <div
              key={provider.name}
              className="text-center m-auto space-y-8 p-20"
            >
              <img
                className="w-48 object-cover"
                src="/images/instagram_logo.svg"
                alt="instagram logo"
              />
              <button
                onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                className="bg-red-400 rounded-lg p-3 text-white hover:bg-red-500"
              >
                Log in with {provider.name}
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps(context) {
  const providers = await getProviders(context);
  return {
    props: { providers },
  };
}
