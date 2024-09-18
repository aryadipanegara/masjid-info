import {
  Facebook,
  Instagram,
  Twitter,
  Mail,
  Phone,
  MapPin,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
  return (
    <footer className="w-full py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-emerald-800 to-teal-700 text-white">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="flex flex-col items-center md:items-start">
            <Image
              src="/masjid.png"
              alt="MasjidInfo Logo"
              width={50}
              height={50}
              className="mb-4"
            />
            <p className="text-sm text-emerald-100 text-center md:text-left">
              Menghubungkan masyarakat melalui keindahan masjid dan budaya
              Islam.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-200">
              Explore
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/masjid"
                  className="text-sm text-emerald-100 hover:text-white transition-colors"
                >
                  Lihat Semua Masjid
                </Link>
              </li>
              <li>
                <Link
                  href="/about"
                  className="text-sm text-emerald-100 hover:text-white transition-colors"
                >
                  Tentang Kami
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4 text-emerald-200">
              Contact Us
            </h3>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail size={16} className="mr-2 text-emerald-300" />
                <a
                  href="#"
                  className="text-sm text-emerald-100 hover:text-white transition-colors"
                >
                  Bujanglanang@gmail.com
                </a>
              </li>
              <li className="flex items-center">
                <Phone size={16} className="mr-2 text-emerald-300" />
                <a
                  href="tel:+1234567890"
                  className="text-sm text-emerald-100 hover:text-white transition-colors"
                >
                  +62
                </a>
              </li>
              <li className="flex items-center">
                <MapPin size={16} className="mr-2 text-emerald-300" />
                <span className="text-sm text-emerald-100">Indonesia</span>
              </li>
            </ul>
          </div>
          <div>
            {/* <h3 className="text-lg font-semibold mb-4 text-emerald-200">
              Stay Connected
            </h3>
            <div className="flex space-x-4 mb-4">
              <a
                href="#"
                className="text-emerald-300 hover:text-white transition-colors"
              >
                <Facebook size={24} />
              </a>
              <a
                href="#"
                className="text-emerald-300 hover:text-white transition-colors"
              >
                <Twitter size={24} />
              </a>
              <a
                href="#"
                className="text-emerald-300 hover:text-white transition-colors"
              >
                <Instagram size={24} />
              </a>
            </div> */}
            {/* <form className="mt-4">
              <label htmlFor="newsletter" className="sr-only">
                Subscribe to our newsletter
              </label>
              <div className="flex">
                <input
                  type="email"
                  id="newsletter"
                  placeholder="Enter your email"
                  className="px-4 py-2 w-full text-gray-900 bg-white rounded-l-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-emerald-500 text-white rounded-r-md hover:bg-emerald-600 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 focus:ring-offset-emerald-800"
                >
                  Subscribe
                </button>
              </div>
            </form> */}
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-emerald-600 text-center text-sm text-emerald-200">
          <p>© {new Date().getFullYear()} MasjidInfo. All rights reserved.</p>
          <div className="mt-2 space-x-4">
            <Link
              href="/privacy"
              className="hover:text-white transition-colors"
            >
              Privacy Policy
            </Link>
            <Link
              href="/termsofservice"
              className="hover:text-white transition-colors"
            >
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
