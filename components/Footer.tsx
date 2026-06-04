import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-black text-white py-16 px-4 border-t-4 border-black">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-3 gap-12 mb-12">
          <div>
            <h3 className="text-3xl font-black mb-3 common-room-wordmark">Common Room</h3>
            <p className="text-gray-400">
              The Living Archive of College Life.<br />Built by students, for students.
            </p>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="hover:text-purple-400 transition-colors font-medium">Features</a></li>
              <li><a href="#waitlist-form" className="hover:text-purple-400 transition-colors font-medium">Join Waitlist</a></li>
              <li><Link href="/contact" className="hover:text-purple-400 transition-colors font-medium">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold uppercase tracking-wider text-sm mb-4">Get in Touch</h4>
            <p className="text-gray-400 mb-4">
              Questions? Feedback? We'd love to hear from you.
            </p>
            <Link 
              href="/contact" 
              className="inline-block px-6 py-3 bg-white text-black font-bold hover-lift border-2 border-white uppercase text-sm"
            >
              Contact Us
            </Link>
          </div>
        </div>
        
        <div className="border-t-2 border-gray-800 pt-8 text-center">
          <p className="text-gray-500">© 2026 Common Room • Built with ❤️ by students</p>
        </div>
      </div>
    </footer>
  );
}
