export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:justify-between">
          <div className="text-center sm:text-left">
            <span className="text-lg font-bold text-orange-500">
              Orange Plan Management
            </span>
            <p className="mt-1 text-sm text-gray-500">
              Custom Platform Demonstration
            </p>
          </div>
          <nav className="flex gap-6 text-sm text-gray-400">
            <span>Contact</span>
            <span>About</span>
            <span>NDIS Info</span>
          </nav>
        </div>
        <div className="mt-8 border-t border-gray-100 pt-6 text-center text-xs text-gray-400">
          © {new Date().getFullYear()} Orange Plan Management. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
