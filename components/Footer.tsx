export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-gray-900 text-gray-400">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div>
            <span className="text-lg font-bold text-orange-400">
              Orange Plan Management
            </span>
            <p className="mt-2 text-sm leading-relaxed">
              Custom NDIS Platform Demonstration
            </p>
          </div>

          {/* Links 1 */}
          <div>
            <h4 className="text-sm font-semibold text-white">Company</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><span className="hover:text-white cursor-pointer transition-colors">About Orange</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">How It Works</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Pricing</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Blog / Resources</span></li>
            </ul>
          </div>

          {/* Links 2 */}
          <div>
            <h4 className="text-sm font-semibold text-white">Support</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li><span className="hover:text-white cursor-pointer transition-colors">Contact Us</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Support</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Privacy Policy</span></li>
              <li><span className="hover:text-white cursor-pointer transition-colors">Terms &amp; Conditions</span></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-white">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm">
              <li>Phone: 1300 611 990</li>
              <li>Email: hello@orangeplan.com.au</li>
              <li>Newstead, QLD</li>
            </ul>
          </div>
        </div>

        <div className="mt-10 border-t border-gray-700 pt-6 text-center text-xs">
          © {new Date().getFullYear()} Orange Plan Management. All rights
          reserved.
        </div>
      </div>
    </footer>
  );
}
