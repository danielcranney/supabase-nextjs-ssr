import { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import useSWR from "swr";
import { supabase } from "../utils/initSupabase";
import { withRouter } from "next/router";
import { useUser } from "../lib/UserContext";
import Auth from "./../components/Auth";
import { useRouter } from "next/router";

const fetcher = (url, token) =>
  fetch(url, {
    method: "GET",
    headers: new Headers({ "Content-Type": "application/json", token }),
    credentials: "same-origin",
  }).then((res) => res.json());

const Profile = ({ router }) => {
  const { user, session } = useUser();
  const { data, error } = useSWR(
    session ? ["/api/getUser", session.access_token] : null,
    fetcher
  );
  const [authView, setAuthView] = useState(
    router.query.selectedView || "sign_in"
  );

  // useEffect(() => {
  //   const { data: authListener } = supabase.auth.onAuthStateChange(
  //     (event, session) => {
  //       if (event === "PASSWORD_RECOVERY") setAuthView("update_password");
  //       if (event === "USER_UPDATED")
  //         setTimeout(() => setAuthView("sign_in"), 1000);
  //       // Send session to /api/auth route to set the auth cookie.
  //     }
  //   );

  //   return () => {
  //     authListener.unsubscribe();
  //   };
  // }, []);

  const View = () => {
    if (!user)
      return (
        <>
          <Auth
            supabaseClient={supabase}
            authView={authView}
            setAuthView={setAuthView}
          />
        </>
      );

    return (
      <>
        {authView === "update_password" && (
          <Auth.UpdatePassword supabaseClient={supabase} />
        )}
        {user && (
          <>
            <h4 className="text-center">You're signed in!</h4>
            <p className="mb-3 text-center">
              <span className="font-semibold">Email:</span> {user.email}
            </p>

            <div className="flex items-center mx-auto mt-0 md:mt-4">
              <Link href="/protected">
                <a className="mr-0 sm:mr-1.5 btn-gray-outline btn-md md:btn-lg">
                  Go to Protected Page
                </a>
              </Link>
              <button
                type="outline"
                onClick={() => supabase.auth.signOut()}
                className="mt-3 sm:ml-1.5 btn-gray-outline btn-md md:btn-lg sm:mt-0"
              >
                Sign out
              </button>
            </div>

            {error && <div style={{ color: "red" }}>Failed to fetch user!</div>}
          </>
        )}
      </>
    );
  };

  return (
    <>
      <Head>
        <title>Sign Up and Sign In</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="border-b min-h-96 border-primary-200 dark:border-gray-600 bg-primary-100 dark:bg-gray-800">
        {/* // Outer Wrapper with min height full screen */}
        <div className="container flex items-center flex-grow mx-auto my-12">
          {/* Form Container - Full */}
          <div className="flex flex-col items-center justify-center w-full px-2 mx-auto md:w-4/5 xl:w-2/3">
            {/* Content Box Styling */}
            <div className="flex flex-col w-full content-box p-7">
              <h2 className="mb-3 text-3xl text-center">Profile</h2>

              <View />
            </div>
          </div>
        </div>
      </main>
    </>
  );
};

export default withRouter(Profile);
