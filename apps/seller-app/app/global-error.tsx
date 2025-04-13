// app/global-error.tsx
"use client";

import React from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  // Make sure to actually use the error or remove it to fix the linting warning
  console.error("Global error occurred:", error);

  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center">
          <h2 className="text-xl font-semibold">Something went wrong!</h2>
          <button
            className="mt-4 rounded-md bg-primary px-4 py-2 text-white"
            onClick={() => reset()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
