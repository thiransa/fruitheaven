import Image from "next/image";
import Reveal from "./Reveal";

export default function Mission() {
  return (
    <section
      id="mission"
      className="mx-auto max-w-[1440px] px-6 py-12 md:py-16 lg:px-14 lg:py-20"
    >
      <Reveal>
        <h2 className="font-hand text-5xl md:pl-8 md:text-6xl">Our Mission</h2>
      </Reveal>

      <div className="mt-6 grid items-center gap-8 md:mt-12 md:grid-cols-2 md:gap-12 lg:gap-16">
        <Reveal>
          <Image
            src="/images/delivery-truck.jpg"
            alt="Fruit Heaven delivery truck at New Manning Market"
            width={1599}
            height={899}
            sizes="(min-width: 768px) 50vw, 100vw"
            className="aspect-[16/10] w-full rounded-xl object-cover object-[70%_center] shadow-2xl ring-1 ring-white/10"
          />
        </Reveal>
        <Reveal
          delay={0.1}
          className="space-y-6 text-base leading-relaxed text-white/95 md:text-[17px]"
        >
          <p>
            At Fruit Heaven, our mission is to bring nature&rsquo;s finest
            fruits to every home by offering a carefully selected range of
            premium imported and fresh local fruits. We are committed to
            delivering exceptional quality, freshness, and taste while building
            lasting relationships with our customers through trust and care. By
            bringing together the best of local harvests and fruits from around
            the world, we strive to make every fruit experience a little more
            special.
          </p>
          <p>Fruit Heaven — A World of Freshness, Naturally.</p>
        </Reveal>
      </div>
    </section>
  );
}
