import React, { useState, useEffect, useContext, useRef } from "react";
import { useTheme } from "next-themes";
import { supabase } from "../utils/initSupabase";
import { useRouter } from "next/router";
import Link from "next/link";
import { useUser } from "../lib/UserContext";

export default function Header() {
  const router = useRouter();
  const { user, session } = useUser();

  return (
    <header className="relative top-0 z-50 flex items-center justify-center w-full h-24 px-24 mx-auto bg-white">
      {/* Logo */}
      <Link href="/">
        <a className="mr-auto text-xl font-semibold text-gray-700">Go home</a>
      </Link>

      {/* Login, Signup and Dark Mode when NOT logged in */}
      <div className="relative flex items-center flex-grow-1">
        {!user ? (
          <>
            <button
              onClick={() => router.push("/protected")}
              className="mr-3 btn-gray-outline btn-sm"
            >
              Protected
            </button>
            <Link href="/profile">
              <a className="btn-gray-outline btn-sm">Sign In/Profile</a>
            </Link>
          </>
        ) : (
          <>
            <Link href="/profile">
              <a className="mr-3 btn-gray-outline btn-sm">Sign In/Profile</a>
            </Link>
            <Link href="/protected">
              <a className="mr-3 btn-gray-outline btn-sm">Protected</a>
            </Link>
            <button
              onClick={() => {
                supabase.auth.signOut();
                router.push("/");
              }}
              className="btn-gray-outline btn-sm"
            >
              Sign Out
            </button>
          </>
        )}
      </div>
    </header>
  );
}
