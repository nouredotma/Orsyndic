"use client";
 
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useLanguage } from "@/lib/language-context";
 
export default function Footer() {
  const pathname = usePathname();
  const { t } = useLanguage();
 
  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    const isAnchor = href.startsWith("#") || href.includes("#")
    if (isAnchor) {
      const hash = href.includes("#") ? `#${href.split("#")[1]}` : href
      
      if (pathname === "/") {
        e.preventDefault()
        const destination = document.querySelector(hash)
        if (destination) {
          destination.scrollIntoView({ behavior: "smooth" })
        }
      }
    }
  }
 
  return (
    <footer className="w-full bg-black text-white overflow-x-hidden">
      <div className="w-full px-6 md:px-16 pt-16 pb-0">
        {/* Row 1: Five-column link grid */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-8 md:flex md:flex-nowrap md:justify-between md:gap-x-12">
          {/* Column 1 – Agency */}
          <div>
            <h4 className="font-medium text-white uppercase text-sm tracking-wider mb-5">
              {t.footer.columns.agency}
            </h4>
            <ul className="space-y-3 text-sm p-0 list-none">
              <li>
                <Link
                  href="/"
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>{t.footer.links.home}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  onClick={(e) => handleScroll(e, "/#features")}
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>{t.footer.links.work}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#functionalities"
                  onClick={(e) => handleScroll(e, "/#functionalities")}
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>{t.footer.links.functionalities}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  onClick={(e) => handleScroll(e, "/#testimonials")}
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>{t.footer.links.testimonials}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  onClick={(e) => handleScroll(e, "/#pricing")}
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>{t.footer.links.pricing}</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 2 – Resources */}
          <div>
            <h4 className="font-medium text-white uppercase text-sm tracking-wider mb-5">
              {t.footer.columns.resources}
            </h4>
            <ul className="space-y-3 text-sm p-0 list-none">
              <li>
                <Link
                  href="/#features"
                  onClick={(e) => handleScroll(e, "/#features")}
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>{t.footer.links.work}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  onClick={(e) => handleScroll(e, "/#faq")}
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>{t.footer.links.faq}</span>
                </Link>
              </li>
              <li>
                <div className="text-neutral-400 pointer-events-none font-normal flex items-center cursor-not-allowed">
                  <span>{t.footer.links.blog}</span>
                  <span className="ml-2 text-[10px] uppercase tracking-tighter opacity-50 border border-white/20 px-1 rounded-sm">{t.footer.soon}</span>
                </div>
              </li>
              <li>
                <div className="text-neutral-400 pointer-events-none font-normal flex items-center cursor-not-allowed">
                  <span>{t.footer.links.help}</span>
                  <span className="ml-2 text-[10px] uppercase tracking-tighter opacity-50 border border-white/20 px-1 rounded-sm">{t.footer.soon}</span>
                </div>
              </li>
            </ul>
          </div>

          {/* Column 3 – Legal */}
          <div className="opacity-40 pointer-events-none select-none">
            <h4 className="font-medium text-white uppercase text-sm tracking-wider mb-5">
              {t.footer.columns.legal}
            </h4>
            <ul className="space-y-3 text-sm p-0 list-none">
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>{t.footer.links.privacy}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>{t.footer.links.terms}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>{t.footer.links.cookie}</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 – Connect */}
          <div className="opacity-40 pointer-events-none select-none">
            <h4 className="font-medium text-white uppercase text-sm tracking-wider mb-5">
              {t.footer.columns.connect}
            </h4>
            <ul className="space-y-3 text-sm p-0 list-none">
              <li>
                <a
                  href="https://facebook.com/orsyndic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/orsyndic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/orsyndic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>

          {/* Column 5 – Contact Us */}
          <div>
            <h4 className="font-medium text-white uppercase text-sm tracking-wider mb-5">
              {t.footer.columns.contact}
            </h4>
            <ul className="space-y-3 text-sm p-0 list-none">
              <li>
                <span className="text-neutral-400 font-normal">
                  <span>+212 6 60 71 50 95</span>
                </span>
              </li>
              <li>
                <a
                  href="mailto:contact@orsyndic.com"
                  className="text-neutral-400 hover:text-white transition font-normal"
                >
                  <span>contact@orsyndic.com</span>
                </a>
              </li>
              <li>
                <span className="text-neutral-400 font-normal">
                  <span>Marrakech, Morocco</span>
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section: Copyright (Left) and Large Name (Right) */}
        <div className="mt-12 flex flex-col md:flex-row items-end justify-between gap-4">
          <p className="text-neutral-400 text-sm mb-2 md:mb-6">
            © {new Date().getFullYear()} Orsyndic. {t.footer.rights}
          </p>
          <h2 className="text-[15vw] md:text-[18vw] tracking-tight whitespace-nowrap pointer-events-none font-goodly bg-gradient-to-br from-white via-white to-black bg-clip-text text-transparent">
            Orsyndic
          </h2>
        </div>
      </div>
    </footer>
  );
}
