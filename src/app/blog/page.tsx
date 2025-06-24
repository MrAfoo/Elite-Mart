'use client';

import Link from "next/link";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaPenNib, FaFacebookF, FaTwitter, FaInstagram, FaSearch } from "react-icons/fa";

export default function Blog() {
  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-[#F6F5FF] via-[#F8F7FF] to-[#F6F5FF]">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container mx-auto h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Latest Blog Posts</h1>
          <nav className="flex items-center space-x-2 text-sm font-medium">
            <Link href="/" className="text-gray-600 hover:text-pink-500 transition-colors">Home</Link>
            <span className="text-gray-400">/</span>
            <span className="text-pink-500">Blog</span>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Blog Posts Section */}
          <div className="lg:w-2/3">
            <div className="space-y-8">
              {Array.from({ length: 3 }).map((_, index) => (
                <article key={index} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <Link href="/singleblog">
                    <div className="relative aspect-[16/9] overflow-hidden rounded-t-xl">
                      <img
                        src={index === 0 ? "/iu.jpeg" : index === 1 ? "/poo.jpeg" : "/wty.jpeg"}
                        alt={`Blog ${index + 1}`}
                        className="w-full h-full object-cover transform hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  </Link>
                  
                  <div className="p-6">
                    <div className="flex items-center gap-4 text-sm text-gray-500 mb-3">
                      <div className="flex items-center text-pink-500">
                        <FaPenNib className="mr-2" />
                        <span>Surf Axion</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <MdOutlineCalendarMonth className="mr-2" />
                        <span>Aug 20, 2023</span>
                      </div>
                    </div>

                    <h2 className="text-2xl font-bold text-gray-800 mb-3 hover:text-pink-500 transition-colors">
                      <Link href="/singleblog">
                        Mauris at orci non vulputate diam tincidunt nec.
                      </Link>
                    </h2>

                    <p className="text-gray-600 mb-4 line-clamp-3">
                      Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                    </p>

                    <Link
                      href="/singleblog"
                      className="inline-flex items-center text-pink-500 font-semibold hover:text-pink-600 transition-colors"
                    >
                      Read More
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-12">
              <nav className="flex items-center space-x-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <button
                    key={i}
                    className={`h-10 w-10 rounded-lg transition-colors ${
                      i === 0
                        ? "bg-pink-500 text-white"
                        : "text-gray-600 hover:bg-pink-50 hover:text-pink-500"
                    }`}
                  >
                    {i + 1}
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3">
            <div className="space-y-8">
              {/* Search */}
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search articles..."
                    className="w-full pl-4 pr-10 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent"
                  />
                  <FaSearch className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400" />
                </div>
              </div>

          {/* Categories */}
          <div className="bg-white p-6 rounded-xl shadow-sm">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Categories</h3>
            <ul className="space-y-2">
            {["Hobbies (14)", "Women (21)", "Fashion (10)", "Technology (18)"].map((category, index) => (
                    <li key={index}>
                      <a
                        href="#"
                        className="flex items-center justify-between p-3 rounded-lg hover:bg-pink-50 transition-colors group"
                      >
                      <span className="text-gray-600 group-hover:text-pink-500">{category}</span>
                        <svg className="w-4 h-4 text-gray-400 group-hover:text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

          {/* Recent Posts */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Recent Posts</h3>
            <ul className="space-y-3">
              {["/jm.jpeg", "/yz.jpeg", "/kjl.jpeg", "/gb.jpeg"].map((img, i) => (
                <li key={i} className="flex items-center gap-4">
                  <img src={img} alt="Recent Post" className="w-12 h-12 rounded object-cover" />
                  <div>
                    <a href="#" className="hover:text-pink-500 text-gray-800  block">
                      In a long established fact
                    </a>
                    <p className="text-gray-600 text-sm">Aug 09 2020</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>


            {/* Sale Product */}
          <div>
            <h3 className="text-lg font-bold text-gray-800 mb-4">Sale Product</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-4">
                <img
                  src="/hn.jpeg"
                  alt="Sale Product"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="text-gray-700">Elli arouise e min mauris</p>
                  <span className="text-pink-500 font-semibold">$120.00</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/sx.jpeg"
                  alt="Sale Product"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="text-gray-700">Elli arouise e min mauris</p>
                  <span className="text-pink-500 font-semibold">$120.00</span>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <img
                  src="/sx.jpeg"
                  alt="Sale Product"
                  className="w-16 h-16 object-cover rounded-md"
                />
                <div>
                  <p className="text-gray-700">Venenatis pulvinar ex enim</p>
                  <span className="text-pink-500 font-semibold">$100.00</span>
                </div>
              </div>
            </div>
          </div>

          {/* Offer Product */}
         <div>
  <h3 className="text-lg text-gray-800 font-bold mb-4">Offer Product</h3>
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {/* Item 1 */}
    <div className="flex items-center gap-4">
      <img
        src="/fv.jpeg"
        alt="Offer Product"
        className="w-16 h-16 object-cover rounded-md"
      />
      <div>
        <p className="text-gray-700">Duis feugiat elit nisi</p>
        <span className="text-pink-500 font-semibold">$150.00</span>
      </div>
    </div>
    
    {/* Item 2 */}
    <div className="flex items-center gap-4">
      <img
        src="/dc.jpeg"
        alt="Offer Product"
        className="w-16 h-16 object-cover rounded-md"
      />
      <div>
        <p className="text-gray-700">Sed placerat turpis sit</p>
        <span className="text-pink-500 font-semibold">$130.00</span>
      </div>
    </div>
    
    {/* Item 3 */}
    <div className="flex items-center gap-4">
      <img
        src="/qa.jpeg"
        alt="Offer Product"
        className="w-16 h-16 object-cover rounded-md"
      />
      <div>
        <p className="text-gray-700">Sed placerat turpis sit</p>
        <span className="text-pink-500 font-semibold">$130.00</span>
      </div>
    </div>
    
    {/* Item 4 */}
    <div className="flex items-center gap-4">
      <img
        src="/az.jpeg"
        alt="Offer Product"
        className="w-16 h-16 object-cover rounded-md"
      />
      <div>
        <p className="text-gray-700">Sed placerat turpis sit</p>
        <span className="text-pink-500 font-semibold">$130.00</span>
      </div>
    </div>
  </div>
</div>

  
            {/* Social Links */}
            <div>
            <h3 className="text-lg text-gray-800 font-bold mb-4">Follow</h3>
            <div className="flex gap-4">
              {[
                { icon: <FaFacebookF />, color: "bg-blue-500", hover: "hover:bg-blue-600" },
                { icon: <FaTwitter />, color: "bg-blue-400", hover: "hover:bg-blue-600" },
                { icon: <FaInstagram />, color: "bg-pink-500", hover: "hover:bg-pink-600" },
              ].map((item, index) => (
                <a
                  key={index}
                  href="#"
                  className={`text-white rounded-full p-3 flex items-center justify-center ${item.color} ${item.hover}`}
                >
                  {item.icon}
                </a>
              ))}
            </div>
          </div>
               {/* Tags */}
               <div>
  <h3 className="text-lg font-bold text-gray-800 mb-4">Tags</h3>
  <div className="flex flex-wrap gap-x-4 gap-y-2">
    {/* First Row */}
    <div className="basis-full flex gap-x-4">
      <a href="#" className="text-sm underline text-blue-600 hover:text-pink-500">
        General
      </a>
      <a href="#" className="text-sm underline text-blue-600 hover:text-pink-500">
        Attasi
      </a>
      <a href="#" className="text-sm underline text-blue-600 hover:text-pink-500">
        Insta
      </a>
    </div>

    {/* Second Row */}
    <div className="basis-full flex gap-x-4">
      <a href="#" className="text-sm underline text-blue-600 hover:text-pink-500">
        General
      </a>
      <a href="#" className="text-sm underline text-blue-600 hover:text-pink-500">
        Bibsaas
      </a>
      <a href="#" className="text-sm underline text-blue-600 hover:text-pink-500">
        Nulla
      </a>
    </div>
  </div>
</div>

</div>
          </aside>
        </div>
        <div className="mt-12 flex flex-wrap justify-center gap-8 mb-8">
      {["/logz5.jpeg", "/logz1.jpeg", "/logz2.jpeg", "/logz4.jpeg", "/logz3.jpeg"].map((src, i) => (
        <img key={i} src={src} alt={`Logo ${i + 1}`} className="w-24 h-24 md:w-40 md:h-40 object-contain" />
      ))}
    </div>
      </div>
    </div>
  );
}
         
      



 