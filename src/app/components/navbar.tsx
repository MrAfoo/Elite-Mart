'use client';

import { RxEnvelopeClosed } from "react-icons/rx";
import { PiPhoneCallBold } from "react-icons/pi";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiUser, FiMenu } from "react-icons/fi";
import { CiHeart } from "react-icons/ci";
import { FiShoppingCart } from "react-icons/fi";
import { CiSearch } from "react-icons/ci";
import Link from "next/link";
import { useState } from "react";
import { useCart } from '../context/CartContext';
import { useAuth0 } from "@auth0/auth0-react";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { cart } = useCart();
  const [isLoading, setIsLoading] = useState(false);
  const { loginWithRedirect, logout, isAuthenticated, user  } = useAuth0();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchQuery.trim()) return;

    const query = `*[_type == "product" && (name match "*${searchQuery}*" || description match "*${searchQuery}*")]`;
    
    try {
        window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`;
    } catch (error) {
        console.error('Search error:', error);
    }
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };
  
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  const cartTotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
  

  return (
    <div>
      {/* Top Header */}
      <div className="h-[50px] w-full bg-[#7E33E0] flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32">
        {/* Left Section */}
        <div className="flex items-center space-x-4 text-white">
          <div className="flex items-center space-x-2">
            <RxEnvelopeClosed className="w-4 h-4" />
            <span className="hidden sm:inline font-[Josefin Sans] text-sm">
              mhhasanul@gmail.com
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <PiPhoneCallBold className="w-4 h-4" />
            <span className="hidden sm:inline font-[Josefin Sans] text-sm">
              (12345)67890
            </span>
          </div>
        </div>

        {/* Right Section */}
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-1">
            <span className="text-sm text-white">English</span>
            <RiArrowDropDownLine className="w-4 h-4 text-white" />
          </div>
          <div className="hidden sm:flex items-center space-x-1">
            <span className="text-sm text-white">USD</span>
            <RiArrowDropDownLine className="w-4 h-4 text-white" />
          </div>
          <Link href="/gy7" className="flex items-center space-x-1">
            <span className="hidden sm:inline text-sm text-white">Wishlist</span>
            <CiHeart className="w-4 h-4 text-white" />
          </Link>
          
            
          {isAuthenticated ? (
            <div className="hidden sm:flex items-center space-x-1">
            <button className="text-sm text-white hover:text-gray-300" onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}>
        Log Out</button>
        </div>
          ) : (
            <div  className="flex items-center space-x-1">
            <button onClick={() => loginWithRedirect()} className="hidden hover:text-gray-300 sm:inline text-sm text-white" >Login</button>
            <button> <FiUser onClick={() => loginWithRedirect()} className="w-4 h-4 text-white hover:text-gray-300" /> </button>
          </div>
            )}
        
         
          <div className="relative group">
            <Link href="/shopCurt" className="relative">
              <FiShoppingCart className="w-5 h-5 cursor-pointer text-white hover:text-gray-300" />
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs">
                  {cart.length}
                </span>
              )}
            </Link>
            

            {/* Mini Cart Preview */}
            <div className="absolute right-0 mt-2 w-72 bg-white rounded-md shadow-lg hidden group-hover:block z-50">
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2 text-gray-800">Cart ({cart.length} items)</h3>
                <div className="max-h-60 overflow-auto">
                {cart.map((item) => (
                    <div key={item._id} className="flex items-center gap-2 mb-2 pb-2 border-b">
                      {item.image?.asset?.url ? (
                        <img
                          src={item.image.asset.url} 
                          alt={item.name} 
                          className="w-12 h-12 object-cover rounded"
                        />
                      ) : (
                        <div className="w-12 h-12 bg-gray-200 rounded flex items-center justify-center">
                          <span className="text-gray-400 text-xs">No image</span>
                        </div>
                      )}
                      <div className="flex-1">
                        <p className="text-sm font-medium text-gray-800">{item.name}</p>
                        <p className="text-xs text-gray-500">
                          {item.quantity} × ${item.price}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
                {cart.length > 0 ? (
                  <>
                    <div className="mt-2 pt-2 border-t">
                      <div className="flex justify-between font-semibold text-gray-800">
                        <span>Total:</span>
                        <span>${cartTotal.toFixed(2)}</span>
                      </div>
                    </div>
                    <div className="mt-4 space-y-2">
                      <Link 
                        href="/shopCurt"
                        className="block text-center bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
                      >
                        View Cart
                      </Link>
                      <Link 
                        href="/checkout"
                        className="block text-center bg-green-600 text-white py-2 rounded hover:bg-green-700 transition-colors"
                      >
                        Checkout
                      </Link>
                    </div>
                  </>
                ) : (
                  <p className="text-center text-gray-500 py-4">Your cart is empty</p>
                )}
              </div>
            </div>
          </div>
          {isAuthenticated && (
            <div className="hidden sm:flex  flex-col items-center space-x-1">
              <p className="text-sm text-white">Welcome</p>
              <p className="text-sm text-white">{user?.name}</p></div>
            )}
        </div>
      </div>
      {/* Navbar */}
      <div className="w-full h-[60px] bg-white flex items-center justify-between px-4 sm:px-8 md:px-16 lg:px-32">
        {/* Logo */}
        <div className="text-[#0D0E43] font-bold text-lg sm:text-xl mr-4">
         <Link href="/"> Elite Mart</Link>
        </div>

        {/* Navbar Links */}
        <div className="hidden sm:flex items-center space-x-4">
          <div className="relative flex items-center ml-[10] space-x-1">
            <Link href="/" className="text-[#FB2E86] text-sm hover:text-pink-500">
              Home
            </Link>
            <span onClick={toggleDropdown} className="cursor-pointer">
              <RiArrowDropDownLine className="w-5 h-5 text-[#FB2E86]" />
            </span>

            {/* Dropdown */}
            {isDropdownOpen && (
              <div className="absolute top-full left-0  bg-white shadow-md rounded-md w-40 mt-2 z-50">
                <Link href="/shopList" className="block px-4 py-2 text-[#0D0E43] hover:bg-gray-100">
                  Shop List
                </Link>
                <Link href="/shopLeftSidebar" className="block px-4 py-2 text-[#0D0E43] hover:bg-gray-100">
                  Shop LSB
                </Link>
                <Link href="/shopGrid" className="block px-4 py-2 text-[#0D0E43] hover:bg-gray-100">
                  Shop Grid
                </Link>
              </div>
            )}
          </div>
          <Link href="/" className="text-[#0D0E43] text-sm hover:text-pink-500">
            Pages
          </Link>
          <Link href="/shopGrid" className="text-[#0D0E43] text-sm hover:text-pink-500">
            Products
          </Link>
          <Link href="/blog" className="text-[#0D0E43] text-sm hover:text-pink-500">
            Blog
          </Link>
          <Link href="/shopLeftSidebar" className="text-[#0D0E43] text-sm hover:text-pink-500">
            Shop
          </Link>
          <Link href="/contact" className="text-[#0D0E43] text-sm hover:text-pink-500">
            Contact
          </Link>
          <Link href="/admin/login" className="text-[#0D0E43] text-sm hover:text-pink-500">
    Dashboard
</Link>
        </div>

        
{/* Search */}
<form onSubmit={handleSearch} className="flex items-center ml-auto">
  <label htmlFor="search" className="sr-only">
    Search
  </label>
  <input
    type="text"
    id="search"
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
    placeholder="Search"
    aria-label="Search"
    className="block w-full md:w-[150px] lg:w-[300px] h-[40px] border px-4 text-sm rounded-l focus:border-[#FB2E86] focus:outline-none"
  />
  {isLoading ? (
    <div className="w-[40px] h-[40px] bg-[#FB2E86] flex items-center justify-center rounded-r">
      <span className="loader w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
    </div>
  ) : (
    <button
      type="submit"
      className="w-[40px] h-[40px] bg-[#FB2E86] flex items-center justify-center rounded-r hover:bg-[#e02574]"
      aria-label="Search"
    >
      <CiSearch className="w-5 h-5 text-white" />
    </button>
  )}
</form>



        {/* Mobile Menu Button */}
        <button onClick={toggleMobileMenu} className="sm:hidden">
          <FiMenu className="w-6 h-6 text-[#0D0E43]" />
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="sm:hidden bg-white shadow-md flex flex-col items-start px-4 py-4 space-y-3">
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-[#FB2E86]">
            Home
          </Link>
          <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0D0E43]">
            Pages
          </Link>
          <Link href="/shopList" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0D0E43]">
            Products
          </Link>
          <Link href="/blog" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0D0E43]">
            Blog
          </Link>
          <Link href="/shopgrid" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0D0E43]">
            Shop
          </Link>
          <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0D0E43]">
            Contact
          </Link>
          <Link href="/admin/login" onClick={() => setIsMobileMenuOpen(false)} className="text-[#0D0E43]">
    Dashboard
</Link>
        </div>
      )}
    </div>
  );
}
