import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Collection from "@/components/Collection";
import Mission from "@/components/Mission";
import Catalogue from "@/components/Catalogue";
import Footer from "@/components/Footer";
import CartDrawer from "@/components/CartDrawer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Collection />
        <Mission />
        <Catalogue />
      </main>
      <Footer />
      <CartDrawer />
    </>
  );
}
