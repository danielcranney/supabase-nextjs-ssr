import React, { useEffect } from "react";
import Link from "next/link";
import Head from "next/head";
import Image from "next/image";
import { supabase } from "../utils/initSupabase";
import { useRouter } from "next/router";
import { useUser } from "../lib/UserContext";

export default function Home() {
  const router = useRouter();
  const { user, session } = useUser();
  console.log(user, session);

  return (
    <>
      <Head>
        <title>Supabase Authentication</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>

      <main className="container relative flex flex-col items-center mx-auto py-36">
        {!user ? (
          <div className="flex">
            <button
              className="mr-4 btn-gray-outline btn-lg"
              onClick={() => {
                router.push("/profile");
              }}
            >
              Sign in/Profile
            </button>

            <button
              className="mr-4 btn-gray-outline btn-lg"
              onClick={() => {
                router.push("/protected");
              }}
            >
              View Protected Page
            </button>
          </div>
        ) : (
          <button
            className="mr-4 btn-gray-outline btn-lg"
            onClick={() => {
              router.push("/protected");
            }}
          >
            View Protected Page
          </button>
        )}
      </main>
    </>
  );
}
