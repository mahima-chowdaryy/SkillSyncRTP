import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from '@/context/AuthContext';
import Script from 'next/script';
import Navbar from '@/components/Navbar';
import { Toaster } from 'react-hot-toast';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'SkillSync - Student Collaboration Platform',
  description: 'Connect with fellow students and collaborate on projects',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"
          strategy="beforeInteractive"
        />
        <Script id="emailjs-init" strategy="afterInteractive">
          {`
            (function() {
              window.emailjs.init("tRD14YfnN9gQ1mLp8");
            })();
          `}
        </Script>
      </head>
      <body className={`${inter.className} bg-gray-900 text-white`}>
        <AuthProvider>
          <Navbar />
          <main className="min-h-screen pt-16">
            {children}
          </main>
          <Toaster position="top-right" />
        </AuthProvider>
      </body>
    </html>
  );
}
