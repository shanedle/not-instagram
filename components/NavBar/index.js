import React from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { useSession, signIn, signOut } from "next-auth/react";
import { useRecoilState } from "recoil";
import { HiHome, HiOutlinePlusCircle, HiOutlineLogin } from "react-icons/hi";

import { modalState } from "../../atom/modalAtom";

export default function Header() {
  const { data: session } = useSession();

  const [open, setOpen] = useRecoilState(modalState);

  const router = useRouter();

  return (
    <>
      <div className="shadow-sm border-b sticky top-0 bg-white">
        <div className="flex items-center justify-between max-w-6xl mx-4 xl:mx-auto">
          <div className="cursor-pointer h-24 w-24 relative lg:inline-grid">
            <Image
              src="/images/instagram_logo.svg"
              layout="fill"
              className="object-contain"
              onClick={() => router.push("/")}
            />
          </div>

          {session && (
            <div className="flex space-x-4 items-center">
              <HiHome
                size="2em"
                className="cursor-pointer"
                onClick={() => router.push("/")}
              />

              <HiOutlinePlusCircle
                onClick={() => setOpen(true)}
                size="2em"
                className="cursor-pointer"
              />
              <img
                onClick={signOut}
                src={session.user.image}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = "../images/default-avatar.webp";
                }}
                alt="user-image"
                className="h-8 rounded-full cursor-pointer"
                referrerPolicy="noreferrer"
              />
            </div>
          )}

          {!session && (
            <button onClick={signIn}>
              <HiOutlineLogin size="2em" /> Login
            </button>
          )}
        </div>
      </div>
    </>
  );
}
