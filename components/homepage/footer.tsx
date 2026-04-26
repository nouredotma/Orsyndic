"use client";
 
import { ChevronRight } from "lucide-react";
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
    <footer className="w-full px-2 md:px-8 pb-2 md:pb-8">
      <div className="max-w-full mx-auto bg-primary text-primary-foreground rounded-sm md:rounded-xl px-6 md:px-16 pt-16 pb-0 overflow-hidden">
        {/* Row 1: Five-column link grid */}
        <div className="grid grid-cols-2 gap-y-8 gap-x-8 md:flex md:flex-nowrap md:justify-between md:gap-x-12">
          {/* Column 1 – Agency */}
          <div>
            <h4 className="font-bold text-primary-foreground uppercase text-sm tracking-wider mb-5">
              {t.footer.columns.agency}
            </h4>
            <ul className="space-y-3 text-sm p-0 list-none">
              <li>
                <Link
                  href="/"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>{t.footer.links.home}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#features"
                  onClick={(e) => handleScroll(e, "/#features")}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>{t.footer.links.work}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#use-cases"
                  onClick={(e) => handleScroll(e, "/#use-cases")}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>{t.footer.links.services}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#testimonials"
                  onClick={(e) => handleScroll(e, "/#testimonials")}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>{t.footer.links.testimonials}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#pricing"
                  onClick={(e) => handleScroll(e, "/#pricing")}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>{t.footer.links.pricing}</span>
                </Link>
              </li>
            </ul>
          </div>
 
          {/* Column 2 – Resources */}
          <div>
            <h4 className="font-bold text-primary-foreground uppercase text-sm tracking-wider mb-5">
              {t.footer.columns.resources}
            </h4>
            <ul className="space-y-3 text-sm p-0 list-none">
              <li>
                <Link
                  href="/#features"
                  onClick={(e) => handleScroll(e, "/#features")}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>{t.footer.links.work}</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/#faq"
                  onClick={(e) => handleScroll(e, "/#faq")}
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>{t.footer.links.faq}</span>
                </Link>
              </li>
              <li>
                <div className="text-primary-foreground/40 pointer-events-none font-medium flex items-center gap-0 cursor-not-allowed">
                  <ChevronRight size={14} className="-ml-1" />
                  <span>{t.footer.links.blog}</span>
                  <span className="ml-2 text-[10px] uppercase tracking-tighter opacity-50 border border-primary-foreground/20 px-1 rounded-sm">{t.footer.soon}</span>
                </div>
              </li>
              <li>
                <div className="text-primary-foreground/40 pointer-events-none font-medium flex items-center gap-0 cursor-not-allowed">
                  <ChevronRight size={14} className="-ml-1" />
                  <span>{t.footer.links.help}</span>
                  <span className="ml-2 text-[10px] uppercase tracking-tighter opacity-50 border border-primary-foreground/20 px-1 rounded-sm">{t.footer.soon}</span>
                </div>
              </li>
            </ul>
          </div>
 
          {/* Column 3 – Legal */}
          <div className="opacity-40 pointer-events-none select-none">
            <h4 className="font-bold text-primary-foreground uppercase text-sm tracking-wider mb-5">
              {t.footer.columns.legal}
            </h4>
            <ul className="space-y-3 text-sm p-0 list-none">
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>{t.footer.links.privacy}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>{t.footer.links.terms}</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>{t.footer.links.cookie}</span>
                </a>
              </li>
            </ul>
          </div>
 
          {/* Column 4 – Connect */}
          <div className="opacity-40 pointer-events-none select-none">
            <h4 className="font-bold text-primary-foreground uppercase text-sm tracking-wider mb-5">
              {t.footer.columns.connect}
            </h4>
            <ul className="space-y-3 text-sm p-0 list-none">
              <li>
                <a
                  href="https://facebook.com/orsyndic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>Facebook</span>
                </a>
              </li>
              <li>
                <a
                  href="https://instagram.com/orsyndic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.linkedin.com/company/orsyndic"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0"
                >
                  <ChevronRight size={14} className="-ml-1" />
                  <span>LinkedIn</span>
                </a>
              </li>
            </ul>
          </div>
 
          {/* Column 5 – Contact Us */}
          <div>
            <h4 className="font-bold text-primary-foreground uppercase text-sm tracking-wider mb-5">
              {t.footer.columns.contact}
            </h4>
            <ul className="space-y-3 text-sm p-0 list-none">
              <li>
                <span className="text-primary-foreground/70 font-medium flex items-center gap-0 whitespace-nowrap">
                  <ChevronRight size={14} className="-ml-1 shrink-0" />
                  <span>+212 6 60 71 50 95</span>
                </span>
              </li>
              <li>
                <a
                  href="mailto:contact@orsyndic.com"
                  className="text-primary-foreground/70 hover:text-primary-foreground transition font-medium flex items-center gap-0 whitespace-nowrap"
                >
                  <ChevronRight size={14} className="-ml-1 shrink-0" />
                  <span>contact@orsyndic.com</span>
                </a>
              </li>
              <li>
                <span className="text-primary-foreground/70 font-medium flex items-center gap-0 whitespace-nowrap">
                  <ChevronRight size={14} className="-ml-1 shrink-0" />
                  <span>Marrakech, Morocco</span>
                </span>
              </li>
            </ul>
          </div>
        </div>
 
        {/* Row 2: Large bold agency name */}
        <div className="relative flex justify-center py-2 md:py-4">
          <h2 className="text-[15vw] md:text-[15.5vw] text-primary-foreground tracking-tight text-center leading-none whitespace-nowrap pointer-events-none font-goodly">
            orsyndic
          </h2>
        </div>
 
        {/* Row 3: Copyright with top border */}
        <div className="border-t border-primary-foreground/20 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-primary-foreground/70 text-sm">
            © {new Date().getFullYear()} Orsyndic. {t.footer.rights}
          </p>
          <div className="items-center gap-2 text-sm text-primary-foreground/70 hidden md:inline-flex">
            <span className="w-2 h-2 bg-green-400 rounded-full inline-block animate-pulse" />
            <span>{t.footer.status}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
