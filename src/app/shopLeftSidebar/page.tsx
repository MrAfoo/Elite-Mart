'use client';

import React from 'react';
import { useState, useEffect } from 'react';
import { client } from '../../sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';
import { FaShoppingCart, FaHeart, FaSearch } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { useCart } from '../context/CartContext';


const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}
interface Product {
  _id: string;
  name: string;
  price: string;
  image: any;
  category: string;
}
interface Filters {
  brands: string[];
  offers: string[];
  ratings: number[];
  categories: string[];
  priceRanges: string[];
  colors: string[];
}
interface PriceRange {
  min: number;
  max: number;
}

const ShopListPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPriceRange, setSelectedPriceRange] = useState<PriceRange | null>(null);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [visibleProducts, setVisibleProducts] = useState(6); 
  const [hasMore, setHasMore] = useState(true); // Track if more products are available


   
  const [filters, setFilters] = useState<Filters>({
    brands: [],
    offers: [],
    ratings: [],
    categories: [],
    priceRanges: [],
    colors: [],
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const handleLoadMore = async () => {
    const nextBatch = visibleProducts + 6; // Load 6 more products
    setVisibleProducts(nextBatch);
    
    
    if (nextBatch >= filteredProducts.length) {
      
      const query = `*[_type == "product"]`; // Modify this query based on your needs
      const newProducts = await client.fetch(query);
      
      if (newProducts.length <= nextBatch) {
        setHasMore(false);
      }
    }
  };

  
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true); // Set loading to true before fetching
        const query = `*[_type == "product"]`;
        const fetchedProducts = await client.fetch(query);
        setProducts(fetchedProducts);
        setFilteredProducts(fetchedProducts); // Set initial filtered products
        setHasMore(fetchedProducts.length > visibleProducts);
        setIsLoading(false); // Set loading to false after fetching
      } catch (error) {
        console.error('Error fetching products:', error);
        setIsLoading(false); // Make sure to set loading to false even if there's an error
      }
    };
  
    fetchProducts();
  }, []);
  
  

  useEffect(() => {
    const applyFilters = () => {
      let filtered = [...products];
  
      // Price filter
      if (selectedPriceRange) {
        filtered = filtered.filter(product => {
          const price = parseFloat(product.price);
          return price >= selectedPriceRange.min && price <= selectedPriceRange.max;
        });
      }
  
      setFilteredProducts(filtered);
    };
  
    applyFilters();
  }, [filters, products, selectedPriceRange]);
   

  const handlePriceRangeChange = (min: number, max: number) => {
    setSelectedPriceRange({ min, max });
  };

  const { addToCart, cartItemsCount } = useCart();
  
  const handleAddToCart = (product: Product) => {
    const cartItem = {
      _id: product._id,  // Changed from id to _id
      name: product.name,
      price: parseFloat(product.price),
      quantity: 1,
      image: {  // Match the Product interface structure
        asset: {
          url: urlFor(product.image).url()
        }
      }
    };
  
    addToCart(cartItem);
    toast.success('Product added to cart!', {
      duration: 2000,
      position: 'top-center',
    });

    const existingCart = JSON.parse(localStorage.getItem("cart") || "[]");
    const updatedCart = [...existingCart, cartItem];
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };
  
  const handleFilterChange = (type: keyof Filters, value: string | number) => {
    setFilters(prev => {
      const updatedFilters = { ...prev };
      
      if (type === 'ratings') {
        const ratingsArray = updatedFilters[type];
        if (typeof value === 'number') {
          if (ratingsArray.includes(value)) {
            updatedFilters[type] = ratingsArray.filter(item => item !== value);
          } else {
            updatedFilters[type] = [...ratingsArray, value];
          }
        }
      } else {
        const stringArray = updatedFilters[type] as string[];
        if (typeof value === 'string') {
          if (stringArray.includes(value)) {
            updatedFilters[type] = stringArray.filter(item => item !== value);
          } else {
            updatedFilters[type] = [...stringArray, value];
          }
        }
      }
      
      return updatedFilters;
    });
  };
  
  
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-2xl">Loading...</div>
      </div>
    );
  }

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[300px] bg-gradient-to-r from-[#F6F5FF] via-[#F8F7FF] to-[#F6F5FF]">
        <div className="absolute inset-0 bg-[url('/pattern.png')] opacity-10"></div>
        <div className="container mx-auto h-full flex flex-col items-center justify-center px-4">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
            Shop Collection
          </h1>
          <div className="flex items-center space-x-2 text-sm font-medium">
            <span className="text-gray-600 hover:text-pink-500 cursor-pointer">Home</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-600 hover:text-pink-500 cursor-pointer">Shop</span>
            <span className="text-gray-400">/</span>
            <span className="text-pink-500">Collection</span>
          </div>
        </div>
      </div>

      {/* Filter Controls */}
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-wrap justify-between items-center gap-4">
            <div className="flex flex-wrap items-center gap-6">
              <div className="relative">
                <select className="appearance-none text-[#0D0E43] bg-transparent pl-4 pr-10 py-2 border border-gray-800 rounded-lg focus:ring-2 focus:ring-pink-500 focus:border-transparent">
                  <option>Latest Products</option>
                  <option>Best Selling</option>
                  <option>Price: Low to High</option>
                  <option>Price: High to Low</option>
                </select>
                <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
                  <svg className="w-4 h-4  text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button className="p-2 rounded-lg border text-[#0D0E43] border-gray-800 hover:border-pink-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="p-2 rounded-lg border text-[#0D0E43] border-gray-800 hover:border-pink-500 transition-colors">
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 4a2 2 0 012-2h8a2 2 0 012 2v12a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 0h8v12H6V4z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
            
            <p className="text-sm text-gray-500">
              Showing <span className="font-medium">{visibleProducts}</span> of{" "}
              <span className="font-medium">{filteredProducts.length}</span> products
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-xl shadow-sm p-6 sticky top-4 space-y-8">

  <div className="p-4 overflow-y-auto h-full">
    {/* Product Brand */}
    <h2 className="text-lg font-semibold text-[#0D0E43] mb-4">Product Brand</h2>
    <div className="space-y-2 text-[#0D0E43]">
      {['Coaster Furniture', 'Fusion Dot High Fashion', 'Unique Furniture Restor', 'Dream Furniture Flipping', 'Young Repurposed', 'Green DIY furniture'].map((brand, index) => (
        <div key={index}>
          <input type="checkbox" id={`brand-${index}`} className="mr-2" />
          <label htmlFor={`brand-${index}`} className="text-sm">{brand}</label>
        </div>
      ))}
    </div>

    {/* Discount Offer */}
    <h2 className="text-lg font-semibold mt-6 text-[#0D0E43] mb-4">Discount Offer</h2>
    <div className="space-y-2 text-[#0D0E43]">
      {['20% Cashback', '5% Cashback Offer', '25% Discount Offer'].map((offer, index) => (
        <div key={index}>
          <input type="checkbox" id={`offer-${index}`} className="mr-2" />
          <label htmlFor={`offer-${index}`} className="text-sm">{offer}</label>
        </div>
      ))}
    </div>

    {/* Rating Item */}
    <h2 className="text-lg font-semibold mt-6 text-[#0D0E43] mb-4">Rating Item</h2>
    <div className="space-y-2 text-[#0D0E43]">
      {[5, 4, 3, 2].map((rating, index) => (
        <div key={index}>
          <input type="checkbox" id={`rating-${index}`} className="mr-2" />
          <label htmlFor={`rating-${index}`} className="text-sm">
            {Array.from({ length: rating }, () => '★').join('')} ({Math.floor(Math.random() * 3000)})
          </label>
        </div>
      ))}
    </div>

    {/* Categories */}
    <h2 className="text-lg font-semibold mt-6 text-[#0D0E43] mb-4">Categories</h2>
    <div className="space-y-2 text-[#0D0E43] ">
      {['Prestashop', 'Magento', 'Bigcommerce', 'osCommerce', '3dcart', 'Bags', 'Accessories', 'Jewellery', 'Watches'].map((category, index) => (
        <div key={index}>
          <input type="checkbox" id={`category-${index}`} className="mr-2" />
          <label htmlFor={`category-${index}`} className="text-sm">{category}</label>
        </div>
      ))}
    </div>

    {/* Price Filter */}
    <h2 className="text-lg font-semibold mt-6 text-[#0D0E43] vmb-4">Price Filter</h2>
<div className="space-y-2 text-[#0D0E43]">
  {[
    { label: '$0.00 - $150.00', min: 0, max: 150 },
    { label: '$150.00 - $350.00', min: 150, max: 350 },
    { label: '$350.00 - $504.00', min: 350, max: 504 },
    { label: '$450.00+', min: 450, max: 99999 }
  ].map((range, index) => (
    <div key={index}>
      <input 
        type="checkbox" 
        id={`price-${index}`} 
        className="mr-2"
        checked={selectedPriceRange?.min === range.min && selectedPriceRange?.max === range.max}
        onChange={() => handlePriceRangeChange(range.min, range.max)}
      />
      <label htmlFor={`price-${index}`} className="text-sm">{range.label}</label>
    </div>
  ))}
</div>

   {/* Filter By Color */}
<h2 className="text-lg font-semibold text-[#0D0E43] mt-6 mb-4">Filter By Color</h2>
<div className="space-y-2 text-[#0D0E43]">
  {['Blue', 'Orange', 'Brown', 'Green', 'Purple', 'Sky'].map((color, index) => (
    <div key={index}>
      <input 
        type="checkbox" 
        id={`color-${index}`} 
        className="mr-2"
        checked={filters.colors.includes(color)}
        onChange={() => handleFilterChange('colors', color)}
      />
      <label htmlFor={`color-${index}`} className="text-sm">{color}</label>
    </div>
  ))}
</div>
</div>
</div>
</aside>
         {/* Product Grid */}
         <main className="flex-1">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredProducts.slice(0, visibleProducts).map((product) => (
                <div key={product._id} className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="relative aspect-square overflow-hidden rounded-t-xl">
                    <img
                      src={urlFor(product.image).url()}
                      alt={product.name}
                      className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-all duration-300">
                    <div className="absolute top-4 right-4 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
  <button
    onClick={() => handleAddToCart(product)}
    className="p-2 bg-white rounded-full shadow-md hover:bg-pink-500 hover:text-white transition-colors"
  >
    <FaShoppingCart className="w-5 h-5" />
  </button>
  <button className="p-2 bg-white rounded-full shadow-md hover:bg-pink-500 hover:text-white transition-colors">
    <FaHeart className="w-5 h-5" />
  </button>
  <button className="p-2 bg-white rounded-full shadow-md hover:bg-pink-500 hover:text-white transition-colors">
    <FaSearch className="w-5 h-5" />
  </button>
</div>
                    </div>
            </div>
            <div className="p-6">
                    <h3 className="font-semibold text-lg text-gray-800 mb-2">{product.name}</h3>
                    <p className="text-pink-500 font-bold">${product.price}</p>
                  </div>
                </div>
              ))}
            </div>
{/* Load More Button */}
{hasMore && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={handleLoadMore}
                  className="px-8 py-3 bg-pink-500 text-white rounded-lg font-semibold hover:bg-pink-600 transform hover:-translate-y-0.5 transition-all duration-200 shadow-sm hover:shadow-md"
                >
                  Load More Products
                </button>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ShopListPage;



  