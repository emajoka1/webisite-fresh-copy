import { Link } from "wouter";
import logo from "@/assets/logo.png";
import { ArrowUpRight } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground pt-28 md:pt-36 pb-10 overflow-hidden relative section-divider-line">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 premium-grid-mesh opacity-[0.14]" />
        <div className="orb-soft h-64 w-64 bg-primary/20 top-10 left-8" />
        <div className="orb-soft h-72 w-72 bg-primary/12 -bottom-8 right-8" />
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-14 mb-24 md:mb-28">
          <div className="md:col-span-7">
            <div className="label-pill inline-flex mb-7 text-secondary-foreground/82 border-secondary-foreground/22 bg-secondary-foreground/8">
              Ready To Mobilise
            </div>
            <h2 className="text-[13vw] md:text-[5.2vw] leading-[0.86] tracking-[-0.045em] mb-10">
              <span className="section-lead block text-secondary-foreground/95 normal-case">Design certainty for</span>
              <span className="display-title block">Nature-Positive</span>
              <span className="display-title block text-[var(--color-signal)]">Delivery.</span>
            </h2>
            <a
              href="mailto:hello@coyne.co.uk"
              className="inline-flex items-center gap-3 text-xl md:text-3xl font-medium hover:text-primary transition-colors underline decoration-1 underline-offset-8"
              data-testid="link-footer-email"
            >
              hello@coyne.co.uk
              <ArrowUpRight size={20} />
            </a>
          </div>

          <div className="md:col-span-2 md:col-start-8">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-7">Sitemap</h4>
            <ul className="space-y-4 font-bold text-sm tracking-wide uppercase">
              <li><Link href="/" className="hover:text-primary transition-colors block w-fit link-underline">Home</Link></li>
              <li><Link href="/expertise" className="hover:text-primary transition-colors block w-fit link-underline">Expertise</Link></li>
              <li><Link href="/sectors" className="hover:text-primary transition-colors block w-fit link-underline">Sectors</Link></li>
              <li><Link href="/insight" className="hover:text-primary transition-colors block w-fit link-underline">Insight</Link></li>
              <li><Link href="/survey-calendar" className="hover:text-primary transition-colors block w-fit link-underline">Survey Calendar</Link></li>
              <li><Link href="/contact" className="hover:text-primary transition-colors block w-fit link-underline">Contact</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-7">Socials</h4>
            <ul className="space-y-4 font-bold text-sm tracking-wide uppercase">
              <li><a href="#" className="hover:text-primary transition-colors block w-fit link-underline flex items-center gap-2">LinkedIn <ArrowUpRight size={14}/></a></li>
              <li><a href="#" className="hover:text-primary transition-colors block w-fit link-underline flex items-center gap-2">Instagram <ArrowUpRight size={14}/></a></li>
              <li><a href="#" className="hover:text-primary transition-colors block w-fit link-underline flex items-center gap-2">Twitter <ArrowUpRight size={14}/></a></li>
            </ul>
          </div>
          
           <div className="md:col-span-1">
            <h4 className="font-mono text-[10px] uppercase tracking-[0.22em] text-primary mb-7">Legal</h4>
            <ul className="space-y-4 font-bold text-sm tracking-wide uppercase">
              <li><a href="#" className="hover:text-primary transition-colors block w-fit link-underline">Privacy</a></li>
              <li><a href="#" className="hover:text-primary transition-colors block w-fit link-underline">Terms</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/12 pt-8 flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
          <div className="flex items-center gap-4 mb-4 md:mb-0">
             <div 
                  className="h-8 w-32 brand-logo-fill"
                  style={{
                    maskImage: `url(${logo})`,
                    maskSize: 'contain',
                    maskRepeat: 'no-repeat',
                    maskPosition: 'left center',
                    WebkitMaskImage: `url(${logo})`,
                    WebkitMaskSize: 'contain',
                    WebkitMaskRepeat: 'no-repeat',
                    WebkitMaskPosition: 'left center'
                  }}
                />
          </div>

          <div className="text-secondary-foreground/45 text-[10px] font-mono uppercase tracking-[0.2em]" data-testid="text-footer-strapline">
            Planning-first ecology for fast-moving programmes.
          </div>

          <div className="text-[18vw] md:text-[12vw] font-black leading-none tracking-[-0.08em] text-secondary-foreground/[0.045] select-none pointer-events-none absolute bottom-[-6vw] right-0">
            COYNE
          </div>
        </div>
      </div>
    </footer>
  );
};
