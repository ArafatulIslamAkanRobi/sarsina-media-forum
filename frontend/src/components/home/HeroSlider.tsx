"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, Heart, ImageIcon } from "lucide-react";
import type { HeroSlide } from "@/content/site";
import { Skyline } from "./Artwork";

const INTERVAL = 7000;

export function HeroSlider({ slides }: { slides: HeroSlide[] }) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const reduced = useRef(false);

  useEffect(() => {
    reduced.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mq = window.matchMedia("(min-width: 1024px)");
    const update = () => setIsDesktop(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const go = useCallback((i: number) => setIndex((i + slides.length) % slides.length), [slides.length]);

  useEffect(() => {
    if (paused || reduced.current || slides.length < 2) return;
    const t = window.setTimeout(() => go(index + 1), INTERVAL);
    return () => window.clearTimeout(t);
  }, [index, paused, go, slides.length]);

  // Touch swipe
  const touchX = useRef<number | null>(null);

  return (
    <section
      className="hero"
      aria-roledescription="carousel"
      aria-label="প্রধান ব্যানার"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocusCapture={() => setPaused(true)}
      onBlurCapture={() => setPaused(false)}
      onTouchStart={(e) => { touchX.current = e.touches[0].clientX; }}
      onTouchEnd={(e) => {
        if (touchX.current == null) return;
        const dx = e.changedTouches[0].clientX - touchX.current;
        if (Math.abs(dx) > 50) go(index + (dx < 0 ? 1 : -1));
        touchX.current = null;
      }}
    >
      <div className="hero__slides">
        {slides.map((s, i) => {
          const active = i === index;
          const showVideo = isDesktop && s.video?.src;
          return (
            <div
              key={s.id}
              className="hero__slide"
              data-active={active}
              role="group"
              aria-roledescription="slide"
              aria-label={`${i + 1} / ${slides.length}`}
              aria-hidden={!active}
              inert={!active}
            >
              {s.image || showVideo ? (
                <div className="hero__bg">
                  {showVideo ? (
                    <video autoPlay muted loop playsInline poster={s.video?.poster ?? s.image?.src} preload="metadata">
                      <source src={s.video!.src} />
                    </video>
                  ) : (
                    <Image src={s.image!.src} alt={s.image!.alt} fill priority={i === 0} sizes="100vw" style={{ objectFit: "cover" }} />
                  )}
                </div>
              ) : (
                <div className="hero__art" aria-hidden>
                  <div className="hero__pattern" />
                  <Skyline className="hero__skyline" />
                </div>
              )}
              <div className="hero__overlay" aria-hidden />
              {!s.image && !showVideo && (
                <span className="hero__badge"><ImageIcon aria-hidden />দরবার শরীফের ছবি শীঘ্রই</span>
              )}
              <div className="container">
                <div className="hero__content">
                  {s.eyebrow && <p className="hero__eyebrow">{s.eyebrow}</p>}
                  {i === 0 ? <h1 className="hero__title">{s.title}</h1> : <h2 className="hero__title">{s.title}</h2>}
                  <p className="hero__text">{s.text}</p>
                  <div className="hero__actions">
                    <Link href={s.primary.href} className="btn btn-light">{s.primary.label}<ArrowRight size={18} aria-hidden /></Link>
                    {s.secondary && (
                      <Link href={s.secondary.href} className="btn btn-ghost-light"><Heart size={18} aria-hidden />{s.secondary.label}</Link>
                    )}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {slides.length > 1 && (
        <div className="hero__controls">
          <div className="container">
            <button type="button" className="hero__arrow" aria-label="আগের স্লাইড" onClick={() => go(index - 1)}><ChevronLeft aria-hidden /></button>
            <div className="hero__dots">
              {slides.map((s, i) => (
                <button key={s.id} type="button" className="hero__dot" aria-label={`স্লাইড ${i + 1}`} aria-current={i === index} onClick={() => go(i)} />
              ))}
            </div>
            <button type="button" className="hero__arrow" aria-label="পরের স্লাইড" onClick={() => go(index + 1)}><ChevronRight aria-hidden /></button>
          </div>
        </div>
      )}

      <svg className="hero__curve" viewBox="0 0 1440 48" preserveAspectRatio="none" aria-hidden>
        <path d="M0 48 V20 Q720 -12 1440 20 V48 Z" fill="currentColor" />
      </svg>
    </section>
  );
}
