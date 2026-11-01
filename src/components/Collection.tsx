import Image from "next/image";
import Reveal from "./Reveal";

export default function Collection() {
  return (
    <section
      id="collection"
      className="mx-auto max-w-[1440px] px-6 pb-6 pt-10 md:pb-12 lg:px-14"
    >
      <Reveal>
        <h2 className="font-hand text-5xl md:text-6xl">The Collection</h2>
      </Reveal>

      <div className="mt-8 grid items-center gap-8 md:mt-12 md:grid-cols-2 md:gap-16">
        <Reveal className="flex justify-center">
          <Image
            src="/images/wordmark.png"
            alt="Fruit Heaven — Heaven in Every Bite"
            width={1022}
            height={215}
            className="h-auto w-[min(72%,460px)]"
          />
        </Reveal>

        <div className="flex flex-col gap-4 md:gap-8">
          <Reveal delay={0.1}>
            <Image
              src="/images/collection-apples.jpg"
              alt="Red grapes, green apples and red apples on display at the Fruit Heaven stall"
              width={1600}
              height={800}
              className="aspect-[2/1] w-full max-w-[540px] object-cover"
            />
          </Reveal>
          <Reveal delay={0.2}>
            <Image
              src="/images/collection-stall-2.jpg"
              alt="Crates of apples, grapes and oranges at the Fruit Heaven stall"
              width={1600}
              height={800}
              className="aspect-[2/1] w-full max-w-[540px] object-cover"
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
