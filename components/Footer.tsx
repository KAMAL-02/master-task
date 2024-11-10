import React from 'react';
import { Facebook, Twitter, Instagram, Mail, Phone, Linkedin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="mt-auto bg-gray-100 dark:bg-gray-900 dark:text-gray-200 text-gray-600 text-xs border border-gray-300 dark:border-gray-800">
      <div className="container mx-auto max-w-5xl px-4">
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 sm:gap-6">
          {/* Brand and Description */}
          <div className="text-center sm:text-left sm:flex-1 pt-3">
            <h3 className="font-bold text-base text-gray-800 dark:text-gray-200">YourBrand</h3>
            <p className="max-w-xs text-sm text-gray-700 mt-1 dark:text-gray-400">
              Creating innovative solutions for tomorrow's challenges.
            </p>
          </div>

          {/* Contact and Social Combined */}
          <div className="flex flex-col items-center sm:items-end gap-2 sm:gap-3 sm:flex-1">
            {/* Contact Info */}
            <div className="flex flex-wrap justify-center sm:justify-end gap-3 pt-4">
              <a href="tel:+1234567890" className="flex items-center hover:text-gray-800 dark:hover:text-gray-400">
                <Phone className="w-4 h-4 mr-1" />
                +1 (234) 567-890
              </a>
              <a href="mailto:support@yourbrand.com" className="flex items-center hover:text-gray-800 dark:hover:text-gray-400">
                <Mail className="w-4 h-4 mr-1" />
                support@yourbrand.com
              </a>
            </div>

            {/* Social Media Links */}
            <div className="flex gap-4 mt-1">
              <a href="#" className="hover:text-gray-800 dark:hover:text-gray-400" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-800 dark:hover:text-gray-400" aria-label="Twitter">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-800 dark:hover:text-gray-400" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="hover:text-gray-800 dark:hover:text-gray-400" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="text-center my-2 pt-4 text-gray-500">
          © {new Date().getFullYear()} YourBrand. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;