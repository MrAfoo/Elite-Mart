'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { client } from '../../sanity/lib/client';
import imageUrlBuilder from '@sanity/image-url';

const builder = imageUrlBuilder(client);

function urlFor(source: any) {
  return builder.image(source);
}

export default function LatestProducts() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const query = `*[_type == "product"][0...4]{
        _id,
        name,
        price,
        image,
        description,
        category
      }`;
      const result = await client.fetch(query);
      setProducts(result);
    };

    fetchProducts();
  }, []);

  const handleViewDetails = (id: string) => {
    router.push(`/productDetails/${id}`);
  };

  return (
    <section className="py-8 bg-gray-50 px-4">
      <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Latest Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product: any) => (
          <div key={product._id} className="bg-white rounded-lg shadow-xl hover:shadow-md transition-shadow relative group">
            <div className="h-48 overflow-hidden rounded-t-lg flex items-center justify-center">
              <img
                src={urlFor(product.image).width(300).url()}
                alt={product.name}
                className="w-full h-full object-contain"
              />
            </div>
            <div className="p-4 flex flex-col items-center text-center">
              <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
              <p className="text-xs text-gray-600 mt-1">{product.category}</p>
              <p className="text-sm font-bold text-blue-600 mt-1">${product.price}</p>
              <button
                onClick={() => handleViewDetails(product._id)}
                className="mt-2 w-full max-w-[150px] bg-pink-500 text-white py-1 px-3 rounded text-sm hover:bg-pink-600 transition-colors"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
