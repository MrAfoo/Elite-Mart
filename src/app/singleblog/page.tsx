'use client';
import React, { Suspense, useState } from "react";
import { FaPenNib } from "react-icons/fa";
import { MdOutlineCalendarMonth } from "react-icons/md";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";

function BlogContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    comment: ''
  });

  const validateInput = (value: string, type: 'name' | 'email' | 'comment') => {
    switch(type) {
      case 'name':
        return value.replace(/[^a-zA-Z\s]/g, '').slice(0, 50);
      case 'email':
        return value.slice(0, 100).toLowerCase();
      case 'comment':
        return value.slice(0, 500);
      default:
        return value;
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    type: 'name' | 'email' | 'comment'
  ) => {
    const safeValue = validateInput(e.target.value, type);
    setFormData(prev => ({
      ...prev,
      [e.target.name]: safeValue
    }));
  };
  return (
    <div className="bg-white min-h-screen">
      {/* Hero Section */}
      <div className="w-full h-[286px] bg-[#F6F5FF] flex flex-col items-center justify-center">
        <div className="text-center px-4">
          <h1 className="text-5xl font-bold text-black mb-4">Single Blog</h1>
          <p className="text-sm text-gray-500">
            Home &gt; Pages &gt;{" "}
            <span className="text-pink-500">Single Blog</span>
          </p>
        </div>
      </div>

      {/* Blog Content */}
      <div className="max-w-7xl mx-auto p-4 md:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

      {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          <img
            src="/iu.jpeg"
            alt="Blog Image"
            className="w-full rounded-lg"
          />
          {/* Blog Meta */}
          <div className="flex items-center text-sm text-gray-500 space-x-4">
            <div className="text-pink-700">
              <FaPenNib />
            </div>
            <div className="bg-pink-200 px-3 py-1 rounded-sm">
              <span className="text-black">Surf Axion</span>
            </div>
            <div className="text-orange-500">
              <MdOutlineCalendarMonth />
            </div>
            <div className="bg-orange-200 px-3 py-1 rounded-sm">
              <span className="text-black">Aug 20, 2023</span>
            </div>
          </div>

          <h1 className="text-2xl font-bold text-gray-800">
            Mauris at orci non vulputate diam tincidunt nec.
          </h1>
          <p className="text-gray-600 leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
            tristique felis eu mauris cursus, sit amet commodo lectus sodales.
            Nulla facilisi. Donec id purus dignissim, facilisis lacus vel,
            eleifend erat.
          </p>

          <div className="bg-gray-100 p-4 border-l-4 border-pink-500">
            <p className="italic text-gray-600">
              “Lorem ipsum dolor sit amet, consectetur adipiscing elit. Commodus
              dictum sapien, erat consectetur ipsum risus.”
            </p>
          </div>

          {/* Two-Column Images */}
          <div className="grid grid-cols-2 gap-4">
            <div className="relative">
              <img
                src="/jm.jpeg"
                alt="Image 1"
                className="rounded-lg"
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-white bg-pink-500 rounded-full p-2 hover:bg-pink-600 transition duration-300"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M6.5 5.5v9l7-4.5-7-4.5z" />
                </svg>
              </div>
            </div>
            <img
              src="/yz.jpeg"
              alt="Image 2"
              className="rounded-lg"
            />
          </div>

          {/* Sample Product Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { img: "/as.jpeg", title: "Smart Watch", price: "$49.99" },
              { img: "/dc.jpeg", title: "Shoes", price: "$19.99" },
              { img: "/jk.jpeg", title: "Play Station", price: "$39.99" },
              { img: "/fv.jpeg", title: "Printer", price: "$89.99" },
            ].map((product, idx) => (
              <div
                key={idx}
                className="p-4 flex flex-col justify-center items-center"
              >
                <img
                  src={product.img}
                  alt={product.title}
                  className="h-32 w-32 object-contain mb-4"
                />
                <p className="text-lg text-gray-800 font-semibold mb-2">{product.title}</p>
                <span className="text-pink-500 font-bold">{product.price}</span>
              </div>
            ))}
          </div>
<p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                eleifend purus vitae massa convallis, et volutpat ligula maximus.
              </p>

              <p className="text-gray-600">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris
                eleifend purus vitae massa convallis, et volutpat ligula maximus.
              </p>
              {/* Social Icons */}
          <div className="flex justify-center space-x-4 py-4">
            <a href="#" className="text-blue-500 hover:text-black text-xl">
              <FaFacebookF />
            </a>
            <a href="#" className="text-pink-500 hover:text-black text-xl">
              <FaInstagram />
            </a>
            <a href="#" className="text-blue-500 hover:text-black text-xl">
              <FaTwitter />
            </a>
          </div>
        </div>

      {/* Navigation */}
      <div className="flex justify-between py-4 bg-gray-300 p-2">
        <a
          href="/blog"
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          <span className="mr-1">←</span> Previous Post
        </a>
        <a
          href="#"
          className="text-gray-600 hover:text-gray-800 flex items-center"
        >
          Next Post <span className="ml-1">→</span>
        </a>
      </div>

     {/* Blog Cards */}
     <div className="space-y-8 mt-12 w-[800]">
     <h3 className="text-2xl font-bold mb-6 text-gray-800">Related Posts</h3>
  
  {/* First Post */}
  <div className="bg-white w-[800] shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 overflow-hidden">
  <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3">
        <img
          src="/hn.jpeg"
          alt="Post 1"
          className="w-full h-64 md:h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="md:w-2/3 p-8">
        <div className="flex items-center mb-2">
          <span className="text-pink-500">
            <MdOutlineCalendarMonth className="inline mr-2" />
          </span>
          <p className="text-sm text-gray-500">Jan 09 2020</p>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-pink-500 transition-colors">
          Sapien ac
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. At in
          vitae rutrum vulputate consectetur.
        </p>
        <button className="mt-4 text-pink-500 font-medium hover:text-pink-600 transition-colors">
          Read More →
        </button>
      </div>
    </div>
  </div>

  {/* Second Post */}
  <div className="bg-white w-[800] shadow-lg rounded-xl hover:shadow-xl transition-shadow duration-300 overflow-hidden">
    <div className="flex flex-col md:flex-row">
      <div className="md:w-1/3 ">
        <img
          src="/hn.jpeg"
          alt="Post 2"
          className="w-full h-64 md:h-full object-cover transform hover:scale-105 transition-transform duration-300"
        />
      </div>
      <div className="md:w-2/3 p-8">
        <div className="flex items-center mb-2">
          <span className="text-pink-500">
            <MdOutlineCalendarMonth className="inline mr-2" />
          </span>
          <p className="text-sm text-gray-500">Aug 18 2020</p>
        </div>
        <h2 className="text-xl font-bold text-gray-800 mb-3 hover:text-pink-500 transition-colors">
          Augue conva
        </h2>
        <p className="text-gray-600 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. At in
          vitae rutrum vulputate consectetur.
        </p>
        <button className="mt-4 text-pink-500 font-medium hover:text-pink-600 transition-colors">
          Read More →
        </button>
      </div>
    </div>
  </div>
</div>

            </div>
            
  
            {/* Sidebar */}
            <aside className="lg:col-span-1 space-y-6 bg-white p-6 rounded-lg shadow-lg sticky top-4">
            {/* Search */}
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search..."
                  className="w-full border rounded-lg px-4 py-2"
                />
                <span className="absolute right-3 top-2.5 text-gray-500">🔍</span>
              </div>
  
              <div>
  <h3 className="text-lg text-gray-800 font-bold mb-4">Categories</h3>
  <div className="grid grid-cols-2 gap-4 text-gray-700">
    {/* First Column */}
    <ul className="space-y-2">
      <li>
        <a href="#" className="hover:bg-pink-500 hover:text-white p-2 block">Hobbies (14)</a>
      </li>
      <li>
        <a href="#" className="hover:bg-pink-500 hover:text-white p-2 block">Women (21)</a>
      </li>
      <li>
        <a href="#" className="hover:bg-pink-500 hover:text-white p-2 block">Fashion (10)</a>
      </li>
    </ul>
    {/* Second Column */}
    <ul className="space-y-2">
      <li>
        <a href="#" className="hover:bg-pink-500 hover:text-white p-2 block">Technology (18)</a>
      </li>
      <li>
        <a href="#" className="hover:bg-pink-500 hover:text-white p-2 block">Sports (12)</a>
      </li>
      <li>
        <a href="#" className="hover:bg-pink-500 hover:text-white p-2 block">Lifestyle (16)</a>
      </li>
    </ul>
  </div>
</div>

            {/* Recent Posts */}
            <div>
            <h3 className="text-lg text-gray-800 font-bold mb-4">Recent Posts</h3>
            <ul className="space-y-4">
              {["/jm.jpeg", "/yz.jpeg", "/kjl.jpeg"].map((img, idx) => (
                <li key={idx} className="flex gap-4 items-center">
                  <img
                    src={img}
                    alt="Recent Post"
                    className="w-12 h-12 object-cover rounded-lg"
                  />
                  <a href="#" className="hover:text-pink-500 text-gray-800">
                    Recent Post Title
                  </a>
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
  <h3 className="text-lg font-bold text-gray-800 mb-4">Offer Product</h3>
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
  <h3 className="text-lg font-bold text-gray-800 mb-4">Follow</h3>
  <div className="flex gap-4">
    {/* Facebook Icon */}
    <a
      href="https://facebook.com"
      className="text-white bg-blue-500 rounded-full p-3 flex items-center justify-center hover:bg-blue-600"
    >
      <FaFacebookF />
    </a>
    {/* Twitter Icon */}
    <a
      href="https://twitter.com"
      className="text-white bg-blue-400 rounded-full p-3 flex items-center justify-center hover:bg-blue-600"
    >
      <FaTwitter />
    </a>
    {/* Instagram Icon */}
    <a
      href="https://instagram.com"
      className="text-white bg-pink-500 rounded-full p-3 flex items-center justify-center hover:bg-blue-600"
    >
      <FaInstagram />
    </a>
  </div>
</div>

  
            {/* Tags */}
            <div>
  <h3 className="text-lg font-bold mb-4">Tags</h3>
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

            </aside>
            </div>
  
          {/* Comment Section */}
          <div className="mt-8 max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-sm">
  <h3 className="text-2xl font-bold mb-6 text-gray-800">Leave a Comment</h3>
  <form className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={(e) => handleInputChange(e, 'name')}
        placeholder="Your Name"
        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={(e) => handleInputChange(e, 'email')}
        placeholder="Your Email"
        className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all"
      />
    </div>
    <textarea
      name="comment"
      value={formData.comment}
      onChange={(e) => handleInputChange(e, 'comment')}
      rows={6}
      placeholder="Write your comment..."
      className="w-full border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all resize-none"
    ></textarea>
    <div className="flex items-center">
      <input
        type="checkbox"
        className="w-4 h-4 text-pink-500 border-gray-300 rounded focus:ring-pink-500"
      />
      <span className="ml-2 text-gray-600">
        Save my name and email for the next comment.
      </span>
    </div>
    <button
      type="submit"
      className="bg-pink-500 text-white px-8 py-3 rounded-lg hover:bg-pink-600 transition-colors duration-300 font-medium"
    >
      Post Comment
    </button>
  </form>
</div>



</div>
      
    );
  }
  
  export default function SingleBlog() {
    return (
      <Suspense fallback={<div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>}>
        <BlogContent />
      </Suspense>
    );
  }