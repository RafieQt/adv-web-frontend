export default function Loading() {
  return (
    <div className="p-6 animate-pulse">
      <div className="h-8 bg-gray-300 w-1/3 mb-4 rounded" />
      <div className="h-60 bg-gray-300 w-full mb-4 rounded" />
      <div className="h-4 bg-gray-300 w-2/3 mb-2 rounded" />
      <div className="h-4 bg-gray-300 w-1/2 rounded" />
    </div>
  );
}