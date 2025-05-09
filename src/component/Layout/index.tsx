'use client';

import { BarsOutlined, CloseOutlined, FacebookFilled, GithubFilled } from '@ant-design/icons';
import Link from 'next/link';
import { memo, ReactNode, useState } from 'react';

const Header = memo(function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="sticky top-0 z-10 bg-white shadow">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex flex-shrink-0 items-center">
            <Link
              href="/"
              className="text-xl font-bold text-blue-600 transition duration-150 hover:text-blue-800"
            >
              Truong Le Minh Nhat
            </Link>
          </div>

          <nav className="hidden space-x-8 md:flex">
            <Link
              href="/"
              className="px-3 py-2 text-sm font-medium text-gray-600 transition duration-150 hover:text-gray-900"
            >
              Home
            </Link>
            <Link
              href="/blog"
              className="px-3 py-2 text-sm font-medium text-gray-600 transition duration-150 hover:text-gray-900"
            >
              Blog
            </Link>
            <Link
              href="/docs"
              className="px-3 py-2 text-sm font-medium text-gray-600 transition duration-150 hover:text-gray-900"
            >
              Docs
            </Link>
            <Link
              href="/showcase"
              className="px-3 py-2 text-sm font-medium text-gray-600 transition duration-150 hover:text-gray-900"
            >
              Showcase
            </Link>
            <Link
              href="/todo-list"
              className="px-3 py-2 text-sm font-medium text-gray-600 transition duration-150 hover:text-gray-900"
            >
              Todo list management
            </Link>
          </nav>

          <div className="flex items-center md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-2 text-gray-600 hover:bg-gray-100 hover:text-gray-900 focus:ring-2 focus:ring-blue-500 focus:outline-none focus:ring-inset"
              aria-label="Open menu"
            >
              {isMenuOpen ? <CloseOutlined /> : <BarsOutlined />}
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="space-y-1 px-2 pt-2 pb-3 sm:px-3">
              <Link
                href="/"
                className="block rounded-md bg-gray-100 px-3 py-2 text-base font-medium text-gray-900"
              >
                Home
              </Link>
              <Link
                href="/blog"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                Blog
              </Link>
              <Link
                href="/docs"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                Docs
              </Link>
              <Link
                href="/showcase"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                Showcase
              </Link>
              <Link
                href="/todo-list"
                className="block rounded-md px-3 py-2 text-base font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
              >
                Todo list management
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
});

const Footer = memo(function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2">
            <h2 className="mb-4 text-lg font-semibold">Truong Le Minh Nhat</h2>
            <p className="mb-4 max-w-md text-gray-300">HDW-TRAINING-NEXTJS</p>
            <div className="flex space-x-4">
              <a
                href="https://www.facebook.com/nhat3173"
                className="text-gray-400 transition duration-150 hover:text-white"
              >
                <span className="sr-only">Facebook</span>
                <FacebookFilled />
              </a>
              <a
                href="https://github.com/nhattlm3173/HDW-TRAINING-NEXTJS"
                className="text-gray-400 transition duration-150 hover:text-white"
              >
                <span className="sr-only">GitHub</span>
                <GithubFilled />
              </a>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 transition duration-150 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/blog"
                  className="text-gray-300 transition duration-150 hover:text-white"
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/docs"
                  className="text-gray-300 transition duration-150 hover:text-white"
                >
                  Docs
                </Link>
              </li>
              <li>
                <Link
                  href="/showcase"
                  className="text-gray-300 transition duration-150 hover:text-white"
                >
                  Showcase
                </Link>
              </li>
              <li>
                <Link
                  href="/todo-list"
                  className="text-gray-300 transition duration-150 hover:text-white"
                >
                  Todo list management
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold tracking-wider uppercase">Contact Us</h3>
            <address className="space-y-2 text-gray-300 not-italic">
              <p>123 Demo Street</p>
              <p>HCM City, District 321</p>
              <p className="mt-4">
                <a
                  href="mailto:test@gmail.com"
                  className="transition duration-150 hover:text-white"
                >
                  test@gmail.com
                </a>
              </p>
              <p>
                <a href="tel:+84123574698" className="transition duration-150 hover:text-white">
                  +84 123574698
                </a>
              </p>
            </address>
          </div>
        </div>

        {/* Bottom Copyright */}
        <div className="mt-12 border-t border-gray-700 pt-8 text-center text-sm text-gray-400">
          <p>© {new Date().getFullYear()} Truong Le Minh Nhat. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
});

export const Layout = memo(function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <Footer />
    </div>
  );
});
