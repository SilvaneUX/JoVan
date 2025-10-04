'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FaBars, FaTimes, FaMoon, FaSun } from 'react-icons/fa';
import { useTheme } from '@/contexts/ThemeContext';
import { useSettings } from '@/contexts/SettingsContext';
import Image from 'next/image';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { settings } = useSettings();

  const toggleMenu = () => setIsOpen(!isOpen);

  const navbarTitle = settings?.navbar.title || 'JoVan';
  const showLogo = settings?.navbar.showLogo && settings?.navbar.logo;

  return (
    <nav className="bg-blue-600 text-white shadow-lg dark:bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link href="/" className="flex items-center space-x-2">
            {showLogo && (
              <div className="relative w-8 h-8">
                <Image
                  src={settings.navbar.logo}
                  alt="Logo"
                  fill
                  className="object-contain"
                />
              </div>
            )}
            <span className="text-2xl font-bold">{navbarTitle}</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-200 transition">
              Home
            </Link>
            <Link href="/products" className="hover:text-blue-200 transition">
              Products
            </Link>
            <Link href="/about" className="hover:text-blue-200 transition">
              About Us
            </Link>
            <Link href="/contact" className="hover:text-blue-200 transition">
              Contact
            </Link>
            <Link href="/admin/login" className="hover:text-blue-200 transition">
              Admin
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-blue-700 dark:hover:bg-slate-700 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center space-x-4">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-blue-700 dark:hover:bg-slate-700 transition"
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? <FaSun size={20} /> : <FaMoon size={20} />}
            </button>
            <button
              className="text-2xl"
              onClick={toggleMenu}
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-4">
              <Link
                href="/"
                className="hover:text-blue-200 transition"
                onClick={toggleMenu}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="hover:text-blue-200 transition"
                onClick={toggleMenu}
              >
                Products
              </Link>
              <Link
                href="/about"
                className="hover:text-blue-200 transition"
                onClick={toggleMenu}
              >
                About Us
              </Link>
              <Link
                href="/contact"
                className="hover:text-blue-200 transition"
                onClick={toggleMenu}
              >
                Contact
              </Link>
              <Link
                href="/admin/login"
                className="hover:text-blue-200 transition"
                onClick={toggleMenu}
              >
                Admin
              </Link>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
