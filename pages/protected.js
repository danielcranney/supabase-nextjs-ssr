import React, { useState, useEffect, useContext } from "react";
import Link from "next/link";
import Head from "next/head";
import { supabase } from "../utils/initSupabase";
import { useRouter } from "next/router";

export async function getServerSideProps({ req }) {
  const { user } = await supabase.auth.api.getUserByCookie(req);
  console.log("The server-side user is:", user);

  if (!user) {
    return { props: {}, redirect: { destination: "/", permanent: false } };
  }

  // If there is a user, return it.
  return { props: { user } };
}

export default function ReportsPage({ user }) {
  const router = useRouter();

  useEffect(() => {
    const logUser = () => {
      console.log("The logged in user is", user);
    };
    logUser();
  }, []);

  return (
    <>
      <Head>
        <title>Hidden Page</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="flex flex-col items-start flex-grow px-12 mx-auto my-12">
        <h1 className="mb-6 text-center">Protected Page</h1>

        <div className="flex flex-col justify-start w-full mb-6 bg-white border rounded-md md:items-center border-primary-200 p-7">
          <p className="mb-2">
            <span className="font-semibold text-gray-600">Email: </span>
            {user.email}
          </p>

          <p className="mb-2">
            <span className="font-semibold text-gray-600">
              Last Signed In:{" "}
            </span>
            {new Date(user.last_sign_in_at).toLocaleString()}
          </p>
          <button
            type="outline"
            onClick={() => {
              supabase.auth.signOut();
              router.push("/");
            }}
            className="mt-3 sm:ml-1.5 btn-gray-outline btn-md md:btn-lg sm:mt-0"
          >
            Sign out
          </button>
        </div>
      </main>
    </>
  );
}
