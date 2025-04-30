'use client';

import { useState } from "react";
import Link from 'next/link';

export default function Navbar() {
    const [menuOpen, setMenuOpen] = useState(false);

    return(
        <nav className="bg-gradient-to-b from-black to-blue-100 text-white px-4 py-2 flex items-center">
            <button onClick={() => setMenuOpen(!menuOpen)}
            className="mr-4 p-2 focus:outline-none">
                <span className="text-2xl">&#9776;</span>
            </button>

            <div className="w-10 h-10 mr-2 flex items-center justify-center">
                <img
                src="https://i.pinimg.com/564x/01/97/cd/0197cd31c8901df115d2296b104d9d30.jpg"
                alt="Site Logo"
                className="w-10 h-10 rounded mr-2 object-cover"/>
            </div>

            <span className="text-lg font-semibold">MHW Calcs - DPS Summary And Build Editing</span>

            {menuOpen && (
            <div className="absolute top-14 left-4 bg-white text-black rounded shadow-lg w-48 z-50">
                <ul>
                    <li className="border-b hover:bg-gray-100">
                        <Link href="./monster-display" className="block px-4 py-2">Monsters</Link>
                    </li>
                    <li className="border-b hover:bg-gray-100">
                        <Link href="./weapon-display" className="block px-4 py-2">Weapons</Link>
                    </li>
                    <li className="border-b hover:bg-gray-100">
                        <Link href="./armor-display" className="block px-4 py-2">Armor</Link>
                    </li>
                    <li className="border-b hover:bg-gray-100">
                        <Link href="./theorycraft" className="block px-4 py-2">Theorycraft</Link>
                    </li>
                </ul>
            </div>
            )}
        </nav>
    );
}