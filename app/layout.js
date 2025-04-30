// app/layout.js
import './globals.css';
import { Cinzel } from 'next/font/google';
import Navbar from './components/navbar'; // Import Navbar component

// Import the Cinzel font with specific weights
const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata = {
  title: 'MH World Theorycraft',
  description: 'Monster Hunter: World toolkit',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${cinzel.className} relative min-h-screen text-[#fdf5e6]`}>
        {/* Blurred Background Image Layer */}
        <div
          className="absolute inset-0 bg-cover bg-center blur-sm opacity-40 -z-10"
          style={{ backgroundImage: `url('/images/mhw.jpg')` }} // Adjust the path if necessary
        ></div>

        {/* Navbar - Imported from components */}
        <Navbar />

        {/* Main Content */}
        <main className="p-6 max-w-screen-xl mx-auto relative z-10">
          {children}
        </main>
      </body>
    </html>
  );
}


