import { useSession } from "next-auth/react";

import Posts from "../Post/Posts";
import UserProfile from "../UserProfile";
import Suggestions from "../Suggestions";
import Footer from "../Footer";

export default function Feed() {
  const { data: session } = useSession();

  return (
    <main
      className={`grid ${
        session
          ? "grid-cols-1 md:grid-cols-3 md:max-w-6xl mx-auto"
          : "grid-cols-1 md:grid-cols-2 md:max-w-3xl mx-auto"
      }  `}
    >
      {!session && (
        <>
          <div>Login to view the feed!</div>
        </>
      )}

      {session && (
        <>
          <section className="md:col-span-2">
            <Posts />
          </section>

          <aside className="hidden md:inline-grid md:col-span-1">
            <div className="fixed w-[380px]">
              <UserProfile />
              <Suggestions />
              <Footer />
            </div>
          </aside>
        </>
      )}
    </main>
  );
}
