import { FaShoppingCart, FaHeart, FaSearch } from "react-icons/fa";

export default function ShopListPage() {
  const products = [
    {
      title: "Accumsan tincidunt",
      originalPrice: "59.00",
      discountedPrice: "26.00",
      rating: 4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/q.jpeg",
    },
    {
      title: "In nulla",
      originalPrice: "52.00",
      discountedPrice: "26.00",
      rating: 5,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/d.jpeg",
    },
    {
      title: "Vel sem",
      originalPrice: "50.00",
      discountedPrice: "26.00",
      rating: 3,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/a.jpeg",
    },
    {
      title: "Porttitor cum",
      originalPrice: "59.00",
      discountedPrice: "26.00",
      rating: 4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/b.jpeg",
    },
    {
      title: "Nunc in",
      originalPrice: "50.00",
      discountedPrice: "26.00",
      rating: 4,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/k.jpeg",
    },
    {
      title: "Vitae facilisis",
      originalPrice: "59.00",
      discountedPrice: "26.00",
      rating: 5,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/o.jpeg",
    },
    {
      title: "Curabitur lectus",
      originalPrice: "59.00",
      discountedPrice: "26.00",
      rating: 5,
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      image: "/p.jpeg",
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Header Section */}
      <div className="w-full h-[286px] bg-[#F6F5FF] flex flex-col items-center justify-center px-6 text-center">
        <h1 className="text-5xl font-bold text-black mb-4">Shop List</h1>
        <p className="text-sm text-gray-500 mt-4">
          Home &gt; Pages &gt; <span className="text-pink-500">Shop List</span>
        </p>
      </div>

      {/* Content Section */}
      <div className="mt-8 px-4 lg:px-16 text-center lg:text-left">
        <h2 className="text-2xl text-gray-800 font-semibold mb-2">
          Ecommerce Accessories &amp; Fashion Items
        </h2>
        <p className="text-gray-600 mt-2">About 9,620 results (0.62 seconds)</p>
      </div>

      {/* Filters */}
      <div className="mt-4 flex flex-wrap justify-between items-center gap-4 px-4 lg:px-16">
  <div className="flex items-center space-x-4">
    <div className="flex items-center space-x-2">
      <label htmlFor="per-page" className="text-sm text-gray-700">
        Per Page:
      </label>
      <input
        type="number"
        id="per-page"
        className="w-16 border border-gray-300 rounded-md p-1 text-sm"
        placeholder="10"
      />
    </div>
    <div className="flex items-center space-x-2">
      <label htmlFor="sort-by" className="text-sm text-gray-700">
        Sort By:
      </label>
      <select
        id="sort-by"
        className="border border-gray-300 text-gray-800 rounded-md p-1 text-sm"
      >
        <option>Best Match</option>
        <option>Price Low to High</option>
        <option>Price High to Low</option>
      </select>
    </div>
    <div className="flex items-center space-x-2">
      <label htmlFor="view" className="text-sm text-gray-700">
        View:
      </label>
      <input
        type="text"
        id="view"
        className="w-16 border border-gray-300 rounded-md p-1 text-sm"
        placeholder="Grid"
      />
    </div>
  </div>
</div>


      {/* Product Cards Section */}
      <div className="mt-12 px-4 lg:px-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.map((product, index) => (
          <div
            key={index}
            className="flex flex-col items-start gap-4 p-4 border rounded-lg shadow-sm"
          >
            <img
              src={product.image}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg"
            />

            {/* Product Details */}
            <div className="flex-1 w-full">
              <h3 className="text-lg text-black font-semibold">{product.title}</h3>
              <div className="flex items-center gap-2">
                <span className="text-red-500 font-bold">
                  ${product.discountedPrice}
                </span>
                <span className="text-gray-500 line-through">
                  ${product.originalPrice}
                </span>
              </div>
              <div className="flex items-center mt-1">
                {Array.from({ length: 5 }, (_, i) => (
                  <span
                    key={i}
                    className={`text-yellow-400 ${
                      i < product.rating ? "fill-current" : "text-gray-300"
                    }`}
                  >
                    ★
                  </span>
                ))}
              </div>
              <p className="text-sm text-gray-600 mt-2">{product.description}</p>
            </div>

            {/* Actions with react-icons */}
            <div className="flex items-center gap-2 justify-between w-full">
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <FaShoppingCart className="text-gray-600 hover:text-black" />
              </button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <FaHeart className="text-red-400 hover:text-red-600" />
              </button>
              <button className="p-2 bg-gray-100 rounded-full hover:bg-gray-200">
                <FaSearch className="text-gray-600 hover:text-black" />
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Brand Logos Section */}
      <div className="flex flex-wrap bg-white justify-center items-center gap-8 mt-8 mb-8">
         {['/logz5.jpeg', '/logz1.jpeg', '/logz2.jpeg', '/logz4.jpeg', '/logz3.jpeg'].map(
      (logo, index) => (
        <img
          key={index}
          src={logo}
          alt={`Logo ${index}`}
          className="w-24 md:w-40 h-auto object-contain"
        />
      )
      )}
         </div>
    </div>
  );
}
