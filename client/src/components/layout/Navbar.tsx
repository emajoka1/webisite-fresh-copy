import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "wouter";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Magnetic } from "@/components/ui/magnetic";
import logo from "@/assets/logo.png";

const isTransparent = (color: string) => {
  if (!color || color === "transparent") return true;
  const match = color.match(/rgba?\(([^)]+)\)/i);
  if (!match) return false;
  const parts = match[1]
    .split(/[,\s/]+/)
    .filter(Boolean)
    .map((value) => Number(value));
  if (parts.length < 3) return false;
  const alpha = parts[3] ?? 1;
  return alpha === 0;
};

const isLightColor = (color: string) => {
  const match = color.match(/rgba?\(([^)]+)\)/i);
  if (!match) return false;
  const parts = match[1]
    .split(/[,\s/]+/)
    .filter(Boolean)
    .map((value) => Number(value));
  if (parts.length < 3) return false;

  const [r, g, b] = parts;
  const toLinear = (channel: number) => {
    const normalized = channel / 255;
    return normalized <= 0.04045
      ? normalized / 12.92
      : ((normalized + 0.055) / 1.055) ** 2.4;
  };

  const luminance = 0.2126 * toLinear(r) + 0.7152 * toLinear(g) + 0.0722 * toLinear(b);
  return luminance > 0.5;
};

const getEffectiveBackground = (node: Element | null) => {
  let current: Element | null = node;
  while (current && current !== document.documentElement) {
    const background = window.getComputedStyle(current).backgroundColor;
    if (!isTransparent(background)) return background;
    current = current.parentElement;
  }
  return null;
};

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isLightBackdrop, setIsLightBackdrop] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();
  const navRef = useRef<HTMLElement | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const updateNavState = () => {
      setIsScrolled((prev) => {
        const next = window.scrollY > 20;
        return prev === next ? prev : next;
      });

      const navRect = navRef.current?.getBoundingClientRect();
      const navBottom = navRect?.bottom ?? 64;

      // Keep neon while the home hero is under the navbar.
      if (location === "/") {
        const homeHero = document.querySelector("section.hero-shell");
        if (homeHero) {
          const heroRect = homeHero.getBoundingClientRect();
          const heroUnderNav = heroRect.top <= navBottom && heroRect.bottom > navBottom;
          if (heroUnderNav) {
            setIsLightBackdrop(false);
            rafRef.current = null;
            return;
          }
        }
      }

      const sampleY = Math.min(window.innerHeight - 1, Math.max(0, (navRect?.bottom ?? 64) + 2));
      const samplePoints = [0.2, 0.5, 0.8];
      let lightVotes = 0;

      for (const point of samplePoints) {
        const sampleX = Math.round(window.innerWidth * point);
        const element = document.elementFromPoint(sampleX, sampleY);
        if (element?.closest(".hero-shell")) continue;
        const background = getEffectiveBackground(element);
        if (background && isLightColor(background)) lightVotes += 1;
      }

      const nextIsLight = lightVotes >= 2;
      setIsLightBackdrop((prev) => (prev === nextIsLight ? prev : nextIsLight));
      rafRef.current = null;
    };

    const queueUpdate = () => {
      if (rafRef.current !== null) return;
      rafRef.current = window.requestAnimationFrame(updateNavState);
    };

    window.addEventListener("scroll", queueUpdate, { passive: true });
    window.addEventListener("resize", queueUpdate);
    updateNavState();

    return () => {
      window.removeEventListener("scroll", queueUpdate);
      window.removeEventListener("resize", queueUpdate);
      if (rafRef.current !== null) {
        window.cancelAnimationFrame(rafRef.current);
      }
    };
  }, [location]);

  const navItems = [
    { name: "Services", href: "/expertise" },
    { name: "Sectors", href: "/sectors" },
    { name: "Insights", href: "/insight" },
    { name: "Calendar", href: "/survey-calendar" },
    { name: "Contact", href: "/contact" }
  ];

  return (
    <>
      <nav
        ref={navRef}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-700 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isScrolled
            ? "px-3 md:px-8 pt-3"
            : "px-6 md:px-12 pt-6 md:pt-8"
        }`}
      >
        <div
          className={`w-full flex justify-between items-center transition-all duration-700 ${
            isScrolled
              ? "rounded-full border border-foreground/12 bg-background/86 text-foreground backdrop-blur-xl px-6 md:px-8 py-3 shadow-[0_16px_42px_rgba(17,34,27,0.12)]"
              : "rounded-full border border-secondary-foreground/18 bg-secondary/74 text-secondary-foreground backdrop-blur-xl px-6 md:px-8 py-3 shadow-[0_16px_42px_rgba(12,24,18,0.28)]"
          }`}
        >
          <Link href="/" className="block hover:opacity-75 transition-opacity cursor-scale z-50" data-testid="link-logo">
            <div
              className={`h-11 md:h-12 w-44 md:w-52 transition-colors duration-500 ${
                isLightBackdrop
                  ? "bg-secondary"
                  : "bg-[var(--color-signal)] drop-shadow-[0_0_14px_rgba(198,255,46,0.34)]"
              }`}
              style={{
                maskImage: `url(${logo})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "left center",
                WebkitMaskImage: `url(${logo})`,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "left center",
              }}
              role="img"
              aria-label="Coyne Environmental"
            />
          </Link>

          <div className="hidden md:flex items-center gap-12 z-50">
            {navItems.map((item) => (
              <Magnetic key={item.name}>
                <Link
                  href={item.href}
                  className={`relative text-[12px] font-bold uppercase tracking-[0.25em] cursor-scale block py-2 hover-underline ${
                    location === item.href
                      ? "text-primary opacity-100"
                      : isScrolled
                        ? "text-foreground opacity-70 hover:opacity-100 hover:text-primary"
                        : "text-secondary-foreground opacity-78 hover:opacity-100 hover:text-primary"
                  } transition-all duration-300`}
                  data-testid={`link-nav-${item.name.toLowerCase()}`}
                >
                  {item.name}
                </Link>
              </Magnetic>
            ))}

            <div className="relative group cursor-scale ml-4 flex items-center gap-3">
              <Magnetic>
                <Link href="/contact" className="hover-underline" data-testid="link-nav-start-project">
                  <Button
                    data-testid="button-nav-start-project"
                    className="bg-[var(--color-signal)] text-[#10160f] hover:bg-[#d7ff64] hover:text-[#10160f] border-none rounded-sm h-10 px-6 text-[11px] uppercase font-bold tracking-[0.2em] transition-all duration-300 hidden lg:flex hover:shadow-[0_0_20px_rgba(198,255,46,0.55)]"
                  >
                    Start Project
                  </Button>
                </Link>
              </Magnetic>

              <Magnetic>
                <Button
                  data-testid="button-open-menu"
                  variant="outline"
                  className={`relative bg-transparent rounded-sm h-10 px-6 text-[11px] uppercase font-bold tracking-[0.2em] transition-all duration-300 ${
                    isScrolled
                      ? "border-foreground/20 text-foreground hover:bg-foreground hover:text-background hover:border-foreground"
                      : "border-secondary-foreground/28 text-secondary-foreground hover:bg-secondary-foreground hover:text-secondary hover:border-secondary-foreground"
                  }`}
                  onClick={() => setIsMobileMenuOpen(true)}
                >
                  Menu
                </Button>
              </Magnetic>
            </div>
          </div>

          <button
            className={`md:hidden z-50 relative rounded-sm border px-4 py-2 transition-colors ${
              isScrolled
                ? "border-foreground/15 bg-background/65 backdrop-blur text-foreground"
                : "border-secondary-foreground/24 bg-secondary/30 text-secondary-foreground"
            }`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            data-testid="button-toggle-mobile-menu"
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-[60] flex flex-col justify-between p-8 md:p-12 transition-all duration-1000 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileMenuOpen ? "translate-y-0 clip-path-full opacity-100" : "-translate-y-full clip-path-top opacity-0"
        }`}
        style={{
          clipPath: isMobileMenuOpen ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)" : "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
          background: "var(--color-secondary)",
        }}
      >
        <div
          className="pointer-events-none absolute inset-0 premium-grid-mesh opacity-[0.16]"
          style={{ maskImage: "radial-gradient(circle at 45% 20%, black 0%, transparent 72%)", WebkitMaskImage: "radial-gradient(circle at 45% 20%, black 0%, transparent 72%)" }}
        />

        <div className="flex justify-between items-center w-full relative z-10">
            <div
              className="h-12 md:h-14 w-44 md:w-64 bg-[var(--color-signal)] drop-shadow-[0_0_16px_rgba(198,255,46,0.36)]"
              style={{
                maskImage: `url(${logo})`,
                maskSize: "contain",
                maskRepeat: "no-repeat",
                maskPosition: "left center",
                WebkitMaskImage: `url(${logo})`,
                WebkitMaskSize: "contain",
                WebkitMaskRepeat: "no-repeat",
                WebkitMaskPosition: "left center",
              }}
            />
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-secondary-foreground hover:rotate-90 transition-transform duration-500 border border-secondary-foreground/22 rounded-full p-2"
              data-testid="button-close-menu"
            >
                <X size={32} />
            </button>
        </div>

        <div className="flex flex-col gap-1 md:gap-2 relative z-10">
          {navItems.map((item, i) => (
            <Link 
                key={item.name} 
                href={item.href}
                className="text-5xl sm:text-6xl md:text-9xl font-black uppercase tracking-[-0.05em] text-secondary-foreground/20 hover:text-secondary-foreground transition-all duration-500 block w-fit leading-[0.82] menu-item hover-underline"
                data-text={item.name}
                style={{ 
                transitionDelay: `${i * 60}ms`
                }}
                onClick={() => setIsMobileMenuOpen(false)}
                data-testid={`link-mobile-nav-${item.name.toLowerCase()}`}
            >
                <span>{item.name}</span>
            </Link>
          ))}
        </div>

        <div className="flex flex-col md:flex-row justify-between gap-8 md:items-end text-secondary-foreground/62 font-mono text-xs uppercase tracking-widest border-t border-secondary-foreground/12 pt-8 relative z-10">
            <div className="space-y-2">
                <p data-testid="text-menu-founded">Established 2024</p>
            </div>
            <div className="flex gap-6 md:gap-8">
                <a href="#" className="hover:text-secondary-foreground transition-colors hover-underline" data-testid="link-social-linkedin">LinkedIn</a>
                <a href="#" className="hover:text-secondary-foreground transition-colors hover-underline" data-testid="link-social-instagram">Instagram</a>
                <a href="#" className="hover:text-secondary-foreground transition-colors hover-underline" data-testid="link-social-twitter">Twitter</a>
            </div>
        </div>
      </div>
    </>
  );
};
