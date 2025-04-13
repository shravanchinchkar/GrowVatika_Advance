// app/not-found.tsx
import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <h2 className="text-xl font-semibold">Page Not Found</h2>
      <p className="mt-2 text-gray-600">
        The page you're looking for doesn't exist.
      </p>
      <Link
        href="/"
        className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
      >
        Return Home
      </Link>
    </div>
  );
}
