'use client';

import { useState } from 'react';
import { BarsOutlined, CloseOutlined } from '@ant-design/icons';
import Link from 'next/link';

export const Header = function Header() {
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
};
