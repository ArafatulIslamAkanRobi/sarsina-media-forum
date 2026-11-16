"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronDown, Heart, LogIn, Menu, X } from "lucide-react";
import { mainNav, site } from "@/content/site";

export const OPEN_MENU_EVENT = "sdf:open-menu";

function isActive(pathname: string, href: string) {
  const base = href.split("#")[0];
  return base === "/" ? pathname === "/" : pathname === base || pathname.startsWith(`${base}/`);
}

export function Header() {
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openAcc, setOpenAcc] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const closeDrawer = useCallback(() => {
    setDrawerOpen(false);
    menuBtnRef.current?.focus();
  }, []);

  // Close menus on route change
  useEffect(() => {
    setDrawerOpen(false);
    setOpenDropdown(null);
  }, [pathname]);

  // Bottom navigation "আরও" opens the drawer
  useEffect(() => {
    const open = () => setDrawerOpen(true);
    window.addEventListener(OPEN_MENU_EVENT, open);
    return () => window.removeEventListener(OPEN_MENU_EVENT, open);
  }, []);

  // Escape / outside click
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;
      setOpenDropdown(null);
      if (drawerOpen) closeDrawer();
    };
    const onClick = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) setOpenDropdown(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("click", onClick);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("click", onClick);
    };
  }, [drawerOpen, closeDrawer]);

  // Lock scroll while the drawer is open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    if (drawerOpen) closeBtnRef.current?.focus();
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      <header className="site-header">
        <div className="container">
          <Link href="/" className="brand" aria-label={`${site.name} — হোম`}>
            <Image src={site.logo} alt="" width={116} height={116} className="brand__logo" priority />
            <span>
              <span className="brand__name">{site.name}</span>
              <span className="brand__sub">{site.mediaName}</span>
              <span className="brand__tag">{site.tagline}</span>
            </span>
          </Link>

          <nav ref={navRef} className="nav" aria-label="প্রধান মেনু">
            <ul className="nav__list">
              {mainNav.map((item) =>
                item.children ? (
                  <li key={item.href} className="nav__item" data-open={openDropdown === item.href}>
                    <button
                      type="button"
                      className="nav__link"
                      aria-expanded={openDropdown === item.href}
                      aria-haspopup="true"
                      aria-current={isActive(pathname, item.href) ? "page" : undefined}
                      onClick={() => setOpenDropdown((v) => (v === item.href ? null : item.href))}
                    >
                      {item.label}
                      <ChevronDown aria-hidden />
                    </button>
                    <ul className="dropdown">
                      <li><Link href={item.href}>{item.label} — সকল তথ্য</Link></li>
                      {item.children.map((c) => (
                        <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
                      ))}
                    </ul>
                  </li>
                ) : (
                  <li key={item.href} className="nav__item">
                    <Link href={item.href} className="nav__link" aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                      {item.label}
                    </Link>
                  </li>
                ),
              )}
            </ul>
          </nav>

          <div className="header-actions">
            <span className="lang-toggle">
              <b>বাংলা</b>
              <span aria-hidden>|</span>
              <span title="ইংরেজি সংস্করণ শীঘ্রই আসছে" aria-disabled="true" className="en" style={{ opacity: 0.55, cursor: "not-allowed" }}>EN</span>
            </span>
            <Link href="/donate" className="btn btn-primary btn-sm header-donate">
              <Heart size={16} aria-hidden />দান করুন
            </Link>
            <Link href="/member/login" className="icon-btn header-menu-btn" aria-label="সদস্য লগইন">
              <LogIn aria-hidden />
            </Link>
            <button
              ref={menuBtnRef}
              type="button"
              className="icon-btn header-menu-btn"
              aria-label="মেনু খুলুন"
              aria-expanded={drawerOpen}
              aria-controls="site-drawer"
              onClick={() => setDrawerOpen(true)}
            >
              <Menu aria-hidden />
            </button>
          </div>
        </div>
      </header>

      <div className="drawer-backdrop" data-open={drawerOpen} onClick={closeDrawer} aria-hidden />
      <div
        id="site-drawer"
        className="drawer"
        data-open={drawerOpen}
        role="dialog"
        aria-modal="true"
        aria-label="মেনু"
        inert={!drawerOpen}
      >
        <div className="drawer__head">
          <Link href="/" className="brand">
            <Image src={site.logo} alt="" width={80} height={80} className="brand__logo" style={{ width: 40, height: 40 }} />
            <span className="brand__name" style={{ fontSize: 16 }}>{site.name}</span>
          </Link>
          <button ref={closeBtnRef} type="button" className="icon-btn" aria-label="মেনু বন্ধ করুন" onClick={closeDrawer}>
            <X aria-hidden />
          </button>
        </div>
        <nav className="drawer__body" aria-label="মোবাইল মেনু">
          {mainNav.map((item) =>
            item.children ? (
              <div key={item.href}>
                <button
                  type="button"
                  className="drawer-acc"
                  aria-expanded={openAcc === item.href}
                  onClick={() => setOpenAcc((v) => (v === item.href ? null : item.href))}
                >
                  {item.label}
                  <ChevronDown aria-hidden />
                </button>
                {openAcc === item.href && (
                  <ul className="drawer-sub">
                    <li><Link href={item.href}>সকল তথ্য</Link></li>
                    {item.children.map((c) => (
                      <li key={c.href}><Link href={c.href}>{c.label}</Link></li>
                    ))}
                  </ul>
                )}
              </div>
            ) : (
              <Link key={item.href} href={item.href} className="drawer-link" aria-current={isActive(pathname, item.href) ? "page" : undefined}>
                {item.label}
              </Link>
            ),
          )}
        </nav>
        <div className="drawer__foot">
          <Link href="/donate" className="btn btn-primary btn-block"><Heart size={16} aria-hidden />দান করুন</Link>
          <Link href="/member/login" className="btn btn-outline btn-block"><LogIn size={16} aria-hidden />সদস্য লগইন</Link>
        </div>
      </div>
    </>
  );
}
