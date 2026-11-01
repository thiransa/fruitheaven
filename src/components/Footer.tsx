import Image from "next/image";
import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-wine-dark">
      <div className="mx-auto grid max-w-[1440px] gap-10 px-6 py-14 md:grid-cols-3 lg:px-14">
        <Image
          src="/images/logo.png"
          alt="Fruit Heaven"
          width={1254}
          height={1254}
          className="h-auto w-40"
        />
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-lilac">
            Visit
          </h3>
          <p className="mt-3 text-white/80">
            No.55, New Manning Market,
            <br />
            Peliyagoda.
          </p>
        </div>
        <div>
          <h3 className="font-mono text-xs uppercase tracking-widest text-lilac">
            Contact
          </h3>
          <p className="mt-3 text-white/80">
            <a href="tel:0777662766" className="hover:text-lilac">
              077 766 2766
            </a>
            <br />
            <a href="tel:0777774932" className="hover:text-lilac">
              077 777 4932
            </a>
            <br />
            <a href="mailto:fruitheaven00@gmail.com" className="hover:text-lilac">
              fruitheaven00@gmail.com
            </a>
          </p>
          <a
            href="https://wa.me/94777662766"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-2.5 text-sm font-medium text-white transition hover:bg-[#1ebe5b]"
          >
            <svg viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor" aria-hidden>
              <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.69.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.29.17-1.42-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.43-9.43a9.37 9.37 0 0 1 9.42 9.43c0 5.2-4.23 9.43-9.43 9.43m8.02-17.45A11.27 11.27 0 0 0 12.05.75C5.8.75.72 5.83.72 12.08c0 2 .52 3.95 1.52 5.66L.62 23.25l5.64-1.48a11.3 11.3 0 0 0 5.79 1.47c6.25 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.31-8.01" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>
      </div>
      <p className="border-t border-white/10 py-5 text-center text-xs text-white/50">
        © {new Date().getFullYear()} Fruit Heaven — Heaven in Every Bite ·{" "}
        <Link href="/credits" className="hover:text-lilac hover:underline">
          Photo credits
        </Link>
      </p>
    </footer>
  );
}
