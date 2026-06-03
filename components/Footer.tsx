import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Common Room</h3>
            <p className="text-gray-400 text-sm">
              The Living Archive of College Life. Built by students, for students.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#features" className="hover:text-white transition-colors">Features</a></li>
              <li><a href="#waitlist-form" className="hover:text-white transition-colors">Join Waitlist</a></li>
              <li><Link href="/contact" className="hover:text-white transition-colors">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Get in Touch</h4>
            <p className="text-sm text-gray-400 mb-3">
              Have questions or feedback?
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm font-medium transition-colors"
            >
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="border-t border-gray-800 pt-8 text-center text-sm text-gray-400">
          <p>© 2026 Common Room. Built with ❤️ by students for students.</p>
        </div>
      </div>
    </footer>
  );
}
