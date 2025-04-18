// components/ui/loading-spinner.tsx
function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="w-12 h-12 border-4 border-gray-300 rounded-full border-t-blue-600 animate-spin"></div>
    </div>
  );
}
