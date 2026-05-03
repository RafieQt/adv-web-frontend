import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4"
         style={{ backgroundImage: 'radial-gradient(circle, #e5e7eb 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      <div className="text-center max-w-md mx-auto">

        {/* Decorative 404 */}
        <p className="text-[160px] font-medium leading-none text-gray-100 select-none -mb-16">
          404
        </p>

        {/* Broken page icon */}
        <div className="flex justify-center mb-6">
          <svg width="44" height="52" viewBox="0 0 44 52" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="1" y="1" width="36" height="44" rx="3" stroke="#9ca3af" strokeWidth="1.5"/>
            <polyline points="23,1 23,15 37,15" stroke="#9ca3af" strokeWidth="1.5" fill="none"/>
            <line x1="9" y1="24" x2="29" y2="24" stroke="#9ca3af" strokeWidth="1.5"/>
            <line x1="9" y1="31" x2="23" y2="31" stroke="#9ca3af" strokeWidth="1.5"/>
            <line x1="9" y1="38" x2="19" y2="38" stroke="#9ca3af" strokeWidth="1.5"/>
            <line x1="27" y1="36" x2="35" y2="44" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
            <line x1="35" y1="36" x2="27" y2="44" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"/>
          </svg>
        </div>

        {/* Heading */}
        <h2 className="text-xl font-medium text-gray-900 mb-2">
          Page not found
        </h2>

        {/* Message */}
        <p className="text-sm text-gray-500 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-700 transition-colors"
        >
          ← Return home
        </Link>

        {/* Hint */}
        <p className="mt-8 text-xs text-gray-400">
          or check that the URL is correct
        </p>
      </div>
    </div>
  )
}