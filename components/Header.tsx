"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { SITE, SERVICES } from "@/content/site-config";
import { IconDrop, IconPhone, IconMenu, IconX, IconChevron } from "./Icons";

export default function Header() {
  const [open, setOpen] = useState(false);

  // Escape closes the mobile menu (keyboard users shouldn't have to tab back to the toggle).
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <>
      <div className="topbar">
        <div className="container">
          <span>⚡ 24/7 Emergency Water Damage Restoration Services</span>
          <span>We Work With All Insurance Companies ✓</span>
        </div>
      </div>

      <header className="site-header">
        <div className="container">
          <Link href="/" className="brand">
            <div className="brand-mark"><IconDrop /></div>
            <div className="brand-text">
              <div className="name">Arizona Water Damage</div>
              <div className="tagline">{SITE.tagline}</div>
            </div>
          </Link>

          <nav className="main-nav">
            <Link href="/">Home</Link>
            <div className="has-dropdown">
              <Link href="/services">Services ▾</Link>
              <div className="dropdown">
                {SERVICES.map((s) => (
                  <Link key={s.slug} href={`/services/${s.slug}`}>{s.name.replace(" Arizona", "")}</Link>
                ))}
              </div>
            </div>
            <div className="has-dropdown">
              <Link href="/service-areas">Service Areas ▾</Link>
              <div className="dropdown">
                <Link href="/service-areas/water-damage-maricopa-county-az">Maricopa County</Link>
                <Link href="/service-areas/water-damage-pima-county-az">Pima County</Link>
                <Link href="/service-areas/water-damage-pinal-county-az">Pinal County</Link>
                <Link href="/service-areas">View All 23 Cities →</Link>
              </div>
            </div>
            <Link href="/about">About Us</Link>
            <Link href="/blog">Blog</Link>
            <Link href="/faq">FAQ</Link>
            <Link href="/contact">Contact</Link>
          </nav>

          <div className="header-cta">
            <div className="header-phone">
              <div className="label">24/7 Emergency</div>
              <a href={SITE.phoneHref} className="num">{SITE.phone}</a>
            </div>
            <a href={SITE.phoneHref} className="btn btn-primary header-cta-btn">
              <IconPhone className="w-4 h-4" /> <span className="btn-label">Call Now</span>
            </a>
            <button
              className="mobile-toggle"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <IconX className="w-5 h-5" /> : <IconMenu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {open && (
          <div className="mobile-menu">
            <div className="container">
              <Link href="/" onClick={() => setOpen(false)}>Home</Link>
              <details>
                <summary>Services <IconChevron className="w-4 h-4 inline-chevron" /></summary>
                <div className="mobile-submenu">
                  {SERVICES.map((s) => (
                    <Link key={s.slug} href={`/services/${s.slug}`} onClick={() => setOpen(false)}>{s.name.replace(" Arizona", "")}</Link>
                  ))}
                </div>
              </details>
              <details>
                <summary>Service Areas <IconChevron className="w-4 h-4 inline-chevron" /></summary>
                <div className="mobile-submenu">
                  <Link href="/service-areas/water-damage-maricopa-county-az" onClick={() => setOpen(false)}>Maricopa County</Link>
                  <Link href="/service-areas/water-damage-pima-county-az" onClick={() => setOpen(false)}>Pima County</Link>
                  <Link href="/service-areas/water-damage-pinal-county-az" onClick={() => setOpen(false)}>Pinal County</Link>
                  <Link href="/service-areas" onClick={() => setOpen(false)}>View All 23 Cities →</Link>
                </div>
              </details>
              <Link href="/about" onClick={() => setOpen(false)}>About Us</Link>
              <Link href="/blog" onClick={() => setOpen(false)}>Blog</Link>
              <Link href="/faq" onClick={() => setOpen(false)}>FAQ</Link>
              <Link href="/contact" onClick={() => setOpen(false)}>Contact</Link>
              <a href={SITE.phoneHref} className="btn btn-primary btn-block" style={{ marginTop: "8px" }}>
                <IconPhone className="w-4 h-4" /> Call {SITE.phone}
              </a>
            </div>
          </div>
        )}
      </header>
    </>
  );
}
