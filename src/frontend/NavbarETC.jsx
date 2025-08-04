import React, { useState, useEffect } from "react";
import {
  Search,
  Menu,
  X,
  Facebook,
  Twitter,
  Instagram,
  ArrowRight,
} from "lucide-react";

// --- DATA ---
// Anda bisa mengganti gambar-gambar ini dengan URL gambar Anda sendiri.
// Pastikan gambar memiliki resolusi yang cukup tinggi untuk hasil terbaik.

//pastinya itu di buatun source image untuk di download
const carouselImages = [
  "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=2070&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1445205170230-053b83016050?q=80&w=2071&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523381294911-8d3cead13475?q=80&w=2070&auto=format&fit=crop",
];

const menuItems = [
  { name: "Home", path: "/" },
  { name: "Collection", path: "/collection" },
  { name: "About", path: "/about" },
  { name: "Contact", path: "/contact" },
];

// --- KOMPONEN NAVBAR ---
// Navbar yang responsif, mirip dengan kode Anda sebelumnya.
const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <nav className="absolute top-0 left-0 w-full z-20 bg-transparent text-white">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="text-2xl font-bold tracking-wider">NICHI</div>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-8 items-center text-sm font-medium">
          {menuItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.path}
                className="hover:text-gray-300 transition-colors duration-300"
              >
                {item.name}
              </a>
            </li>
          ))}
        </ul>

        {/* Search & Hamburger */}
        <div className="flex items-center space-x-4">
          <button className="hidden md:block hover:text-gray-300 transition-colors duration-300">
            <Search size={20} />
          </button>
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-black bg-opacity-80 backdrop-blur-sm px-6 py-4">
          <ul className="flex flex-col space-y-4">
            {menuItems.map((item) => (
              <li key={item.name}>
                <a
                  href={item.path}
                  className="block py-2 hover:text-gray-300 transition-colors duration-300"
                >
                  {item.name}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <button className="flex items-center space-x-2 w-full text-left">
                <Search size={20} />
                <span>Search</span>
              </button>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

// --- KOMPONEN CAROUSEL BACKGROUND ---
// Komponen ini yang bertanggung jawab untuk menampilkan dan menggerakkan gambar di background.
const CarouselBackground = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // useEffect digunakan untuk menjalankan side-effect, dalam hal ini, sebuah timer.
  useEffect(() => {
    // Set interval untuk mengubah slide setiap 5 detik (5000 milidetik)
    const timer = setInterval(() => {
      // Logika untuk pindah ke slide berikutnya.
      // (prevSlide + 1) % carouselImages.length akan membuat slide kembali ke 0 setelah mencapai slide terakhir.
      setCurrentSlide((prevSlide) => (prevSlide + 1) % carouselImages.length);
    }, 5000);

    // Cleanup function: Dijalankan saat komponen di-unmount (dihilangkan dari layar).
    // Ini penting untuk mencegah memory leak.
    return () => clearInterval(timer);
  }, []); // Array dependensi kosong `[]` berarti useEffect ini hanya berjalan sekali saat komponen pertama kali dirender.

  return (
    <div className="absolute top-0 left-0 w-full h-full z-0 overflow-hidden">
      {carouselImages.map((image, index) => (
        <div
          key={index}
          className={`absolute w-full h-full transition-opacity duration-1000 ease-in-out ${
            index === currentSlide ? "opacity-100" : "opacity-0"
          }`}
        >
          <img
            src={image}
            alt={`Carousel background ${index + 1}`}
            className="w-full h-full object-cover" // object-cover memastikan gambar menutupi area tanpa distorsi
          />
        </div>
      ))}
      {/* Lapisan overlay gelap untuk membuat teks lebih mudah dibaca */}
      <div className="absolute top-0 left-0 w-full h-full bg-black bg-opacity-50 z-1"></div>
    </div>
  );
};

// --- KOMPONEN UTAMA LANDING PAGE ---
export default function App() {
  return (
    <div className="relative w-full h-screen text-white overflow-hidden">
      {/* 1. Carousel sebagai Background */}
      <CarouselBackground />

      {/* 2. Navbar di atas segalanya */}
      <Navbar />

      {/* 3. Konten Utama (Hero Section) */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full text-center px-4">
        <div className="max-w-3xl">
          <h1
            className="text-4xl md:text-6xl lg:text-7xl font-extrabold uppercase tracking-widest leading-tight"
            style={{ textShadow: "2px 2px 8px rgba(0,0,0,0.7)" }}
          >
            Temukan Gaya Anda
          </h1>
          <p
            className="mt-4 max-w-xl mx-auto text-base md:text-lg text-gray-200"
            style={{ textShadow: "1px 1px 4px rgba(0,0,0,0.7)" }}
          >
            Jelajahi koleksi terbaru kami yang dirancang untuk menonjolkan
            kepribadian Anda. Kualitas premium, desain eksklusif.
          </p>
          <button className="mt-8 px-8 py-3 bg-white text-black font-semibold rounded-full hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 flex items-center mx-auto">
            Shop Now <ArrowRight className="ml-2" size={20} />
          </button>
        </div>
      </main>

      {/* 4. Social Media Icons di pojok kiri bawah */}
      <div className="absolute bottom-6 left-6 z-10 hidden md:flex flex-col space-y-4">
        <a
          href="#"
          className="hover:text-gray-300 transition-colors duration-300"
        >
          <Facebook size={20} />
        </a>
        <a
          href="#"
          className="hover:text-gray-300 transition-colors duration-300"
        >
          <Twitter size={20} />
        </a>
        <a
          href="#"
          className="hover:text-gray-300 transition-colors duration-300"
        >
          <Instagram size={20} />
        </a>
      </div>
    </div>
  );
}
