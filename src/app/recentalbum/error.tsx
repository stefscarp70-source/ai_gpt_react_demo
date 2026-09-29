"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">

        <h1 className="mb-6 text-4xl font-bold">
          Most Recent Album
        </h1>

        <div className="rounded-lg bg-white p-6 shadow">

          <h2 className="text-xl font-semibold text-red-600">
            Unable to retrieve the album
          </h2>

          <p className="mt-3 text-gray-600">
            {error.message}
          </p>

          <button
            type="button"
            onClick={() => reset()}
            className="mt-6 rounded-md bg-blue-600 px-5 py-2 font-medium text-white hover:bg-blue-700"
          >
            Try again
          </button>

        </div>
      </div>
    </main>
  );
}