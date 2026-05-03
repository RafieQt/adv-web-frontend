import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t mt-10 bg-zinc-200 text-gray-600 dark:bg-zinc-950 dark:text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5">

        {/* LINKS */}
        <div className="flex flex-col-2 sm:flex-row justify-center items-center gap-2 sm:gap-4 text-sm mb-4">
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <Link href="/contact" className="hover:underline">
            Contact
          </Link>
          <Link href="/privacy" className="hover:underline">
            Privacy Policy
          </Link>
          <Link href="/help" className="hover:underline">
            Help
          </Link>
        </div>

        {/* COPYRIGHT */}
        <div className="flex justify-center gap-1 text-xs sm:text-sm">
          &copy; {new Date().getFullYear()} All rights reserved |
          <Link href="/" className="hover:underline">
            E-commerce Management Web
          </Link>
        </div>
      </div>

    </footer>
  );
}