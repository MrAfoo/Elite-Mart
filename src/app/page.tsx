import { draftMode } from 'next/headers';
import { client } from '../sanity/lib/client';
import Hero from "./components/hero";
import FeaturedProducts from './components/featured';
import Latest from "./components/latest";
import Blog from "./components/blog";
import Center from "./components/center";

export const revalidate = 60; 

async function getProducts() {
  const { isEnabled } = await draftMode();
  const query = `*[_type == "product"]{
    _id,
    name,
    code,
    price,
    image {
      asset -> {
        url
      }
    },
    description,
    category
  }`;

  return client.fetch(query, {}, {
    cache: isEnabled ? 'no-store' : 'force-cache',
  });
}

export default async function Home() {
  const products = await getProducts();
  
  return (
    <main>
      <Hero/>
      <FeaturedProducts products={products} />
      <Latest/>
      <Center/>
      <Blog/>
    </main>
  );
}
