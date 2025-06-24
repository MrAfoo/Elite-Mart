
import React from "react";

const LatestBlog = () => {
  const blogs = [
    {
      title: "Design Trends 2024",
      code: "Blog - D2024",
      description: "Exploring the latest design trends for the upcoming year.",
      image: "/blog1.jpeg", 
    },
    {
      title: "Minimalist Interiors",
      code: "Blog - M2024",
      description: "Tips to achieve a clean and clutter-free home.",
      image: "/blog2.jpeg",
    },
    {
      title: "Smart Home Gadgets",
      code: "Blog - S2024",
      description: "Top gadgets to upgrade your home automation.",
      image: "/blog3.jpeg",
    },
  ];

  return (
    <section className=" py-10 bg-gray-50 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-8">
          Latest Blog
        </h2>
        {/* Responsive grid layout */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="relative border rounded-xl p-4 bg-white shadow-md hover:shadow-lg transition duration-300"
              style={{ height: "361px" }} // Optional height for consistent card size
            >
              <div className="w-full h-40 flex items-center justify-center overflow-hidden rounded-lg">
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="object-contain w-full h-full"
                />
              </div>
              <div className="mt-4 text-center">
                <h3 className="text-lg font-semibold text-gray-800">
                  {blog.title}
                </h3>
                <p className="text-sm text-gray-500">{blog.code}</p>
                <p className="text-sm text-gray-600 mt-2">
                  {blog.description}
                </p>
              </div>
               
              <div className="absolute inset-0 bg-purple-500 text-white opacity-0 hover:opacity-100 flex items-center justify-center rounded-xl transition duration-300">
                <button className="py-2 px-4 bg-white text-purple-500 font-bold rounded-md shadow-md">
                  Read More
                </button>
              </div> 
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default LatestBlog;