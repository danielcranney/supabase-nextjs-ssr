import Image from "next/image";
import Link from "next/link";

// pages/404.js
export default function Custom404() {
  return (
    <main className="relative w-full min-h-96">
      <div className="w-full">
        <div className="container flex flex-col-reverse flex-grow mx-auto my-10 md:flex-row">
          <div className="flex flex-col items-start justify-center w-full mx-auto md:w-1/2">
            <h1 className="mb-4 text-7xl">Oops!</h1>
            <h2 className="mb-6 text-primary-main ">404 - Page not found.</h2>
            <p className="text-lg">We're not quite sure what happened.</p>
            <p className="text-lg">
              To fix the issue, you can either go back or return to the{" "}
              <Link href="/">
                <a>homepage.</a>
              </Link>
            </p>
          </div>
          <div className="w-full pr-8 md:w-1/2">
            <Image
              src="/img/not-found-2.svg"
              alt="404 - Page Not Found"
              width={1120}
              height={699}
              className="object-contain object-right-top"
            />
          </div>
        </div>
      </div>
    </main>
  );
}
