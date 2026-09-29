export default function Loading() {
  return (
    <main className="min-h-screen bg-gray-100 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="mb-6 text-4xl font-bold">
          Most Recent Album
        </h1>

        <div className="rounded-lg bg-white p-6 shadow">
          <div className="flex items-center gap-3">
            <div className="h-6 w-6 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

            <p className="text-gray-600">
              Searching for the most recent album...
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}