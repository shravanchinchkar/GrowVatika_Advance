export default function NotFound() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-2xl font-bold">Page Not Found</h1>
      <p>Sorry, the page you're looking for doesn't exist.</p>
      <a href="/" className="text-blue-600 hover:underline">
        Return to home page
      </a>
    </div>
  );
}
