import Image from "next/image";
import Link from "next/link";
import Product from "./components/Product";

export default function Home() {
  return (
    <main>
      <h1>Hello World</h1>
      <Link href="/user">UserPage</Link>
      <Product/>
      </main>
  );
}
