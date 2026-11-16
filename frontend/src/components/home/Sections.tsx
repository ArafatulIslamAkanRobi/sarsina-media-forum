import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BookOpen,
  Building2,
  CalendarDays,
  Clock,
  GraduationCap,
  HeartHandshake,
  Landmark,
  MapPin,
  Megaphone,
  Newspaper,
  PenLine,
  Receipt,
  ShieldCheck,
  Sparkles,
  Users,
} from "lucide-react";
import { institutions, organizations, publicationCategories } from "@/content/data";
import { quickAccess } from "@/content/site";
import {
  getAnnualMahfils,
  getArticles,
  getAuthor,
  getDonationProjects,
  getFeaturedMahfil,
  getHomeTeam,
  getNews,
} from "@/lib/content";
import { formatDateBn } from "@/lib/format";
import { Icon } from "@/components/ui/Icon";
import { Media } from "@/components/ui/Media";
import { SectionHead } from "@/components/ui/SectionHead";
import { SampleBadge } from "@/components/ui/SampleBadge";
import {
  ArticleFeatureCard,
  ArticleRowCard,
  NewsLeadCard,
  NewsRowCard,
  ProjectCard,
  TeamCard,
} from "@/components/ui/Cards";
import { SeasonArt } from "./Artwork";
import { NewsletterForm } from "./NewsletterForm";

/* ---------------------------------------------------------- Quick access */

export function QuickAccess() {
  return (
    <nav className="quick" aria-label="দ্রুত প্রবেশ">
      <div className="container">
        <ul className="quick__grid">
          {quickAccess.map((q, i) => (
            <li key={q.href}>
              <Link href={q.href} className={`quick__item${i === 0 ? " quick__item--accent" : ""}`}>
                <span className="quick__icon"><Icon name={q.icon} /></span>
                {q.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

/* -------------------------------------------------------- Today's mahfil */

export function TodayMahfil() {
  const m = getFeaturedMahfil();
  return (
    <section className="section" aria-labelledby="today-mahfil" id="today">
      <div className="container">
        <h2 id="today-mahfil" className="sr-only">আজকের মাহফিল</h2>
        {m ? (
          <article className="event-card">
            <div className="event-card__media">
              <Media image={m.bannerImage} ratio="none" dark className="" sizes="(min-width: 768px) 50vw, 100vw" label="মাহফিলের ছবি শীঘ্রই">
              </Media>
            </div>
            <div className="event-card__body">
              <span className="event-card__label"><span className="pulse" aria-hidden />আজকের মাহফিল <SampleBadge show={m.sample} /></span>
              <h3 className="event-card__title">{m.title}</h3>
              <p className="event-card__text">{m.description}</p>
              <ul className="event-card__facts">
                {m.startDate && <li><CalendarDays aria-hidden />{formatDateBn(m.startDate, true)}</li>}
                {m.time && <li><Clock aria-hidden />{m.time}</li>}
                <li style={{ gridColumn: "1 / -1" }}><MapPin aria-hidden />{m.venue}</li>
              </ul>
              <div className="event-card__actions">
                <Link href="/mahfil" className="btn btn-gold">বিস্তারিত দেখুন<ArrowRight size={18} aria-hidden /></Link>
                <Link href="/mahfil#annual" className="btn btn-ghost-light">সকল মাহফিল</Link>
              </div>
            </div>
          </article>
        ) : (
          <div className="empty-state">
            <CalendarDays aria-hidden />
            <h3>আজ কোনো মাহফিল নির্ধারিত নেই</h3>
            <p>আসন্ন মাহফিলের সময়সূচি দেখতে মাহফিল পেজে যান।</p>
            <Link href="/mahfil" className="btn btn-primary btn-sm">মাহফিলের তথ্য</Link>
          </div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------ Latest news */

export function LatestNews() {
  const items = getNews();
  const lead = items.find((n) => n.featured) ?? items[0];
  const rest = items.filter((n) => n !== lead).slice(0, 3);
  return (
    <section className="section section--white" aria-labelledby="latest-news">
      <div className="container">
        <SectionHead id="latest-news" title="সর্বশেষ সংবাদ" icon={<Megaphone size={26} />} link={{ href: "/news", label: "সকল সংবাদ দেখুন" }} />
        {lead ? (
          <div className="news-layout">
            <NewsLeadCard item={lead} />
            <div className="news-list">
              {rest.map((n) => <NewsRowCard key={n.slug} item={n} />)}
            </div>
          </div>
        ) : (
          <div className="empty-state"><Newspaper aria-hidden /><h3>এখনো কোনো সংবাদ প্রকাশিত হয়নি</h3></div>
        )}
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Annual mahfil */

export function AnnualMahfil() {
  const list = getAnnualMahfils();
  return (
    <section className="section pattern-bg" aria-labelledby="annual-mahfil" id="annual">
      <div className="container">
        <SectionHead
          id="annual-mahfil"
          title="বাৎসরিক মাহফিলসমূহ"
          subtitle="দরবার শরীফের ঐতিহ্যবাহী বাৎসরিক মাহফিলের তথ্য। তারিখ ঘোষণার পর এখানে প্রকাশ করা হবে।"
          icon={<Sparkles size={26} />}
          link={{ href: "/mahfil", label: "সকল মাহফিল" }}
        />
        <div className="grid-4">
          {list.map((m) => (
            <article key={m.slug} className={`card card--hover season season--${m.theme}`}>
              <div className="season__art"><SeasonArt theme={m.theme} /></div>
              <div className="season__body">
                <h3 className="card__title" style={{ fontSize: 19 }}>{m.title}</h3>
                <div className="meta"><span><CalendarDays aria-hidden />{m.startDate ? formatDateBn(m.startDate) : m.monthLabel}</span></div>
                <Link href={`/mahfil#${m.slug}`} className="btn btn-outline btn-sm" style={{ marginTop: 10 }}>বিস্তারিত দেখুন<ArrowRight size={16} aria-hidden /></Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Donation */

export function DonationBanner() {
  return (
    <section className="section section--white" aria-labelledby="donate-banner" style={{ paddingBottom: 0 }}>
      <div className="container">
        <div className="donate-banner">
          <div className="donate-banner__body">
            <span className="badge badge--gold" style={{ alignSelf: "flex-start" }}><HeartHandshake size={14} aria-hidden />দান কার্যক্রম</span>
            <h2 id="donate-banner" className="donate-banner__title">উন্নয়নমূলক কাজে অংশীদার হোন</h2>
            <p className="donate-banner__text">ছারছীনা দরবার শরীফের বিভিন্ন উন্নয়ন ও জনকল্যাণমূলক প্রকল্পে আপনার অনুদান পৌঁছে দিন।</p>
            <div className="donate-banner__actions">
              <Link href="/donate" className="btn btn-gold">সকল অনুদান প্রকল্প দেখুন<ArrowRight size={18} aria-hidden /></Link>
              <Link href="/donate#quick-donate" className="btn btn-ghost-light">দ্রুত দান</Link>
            </div>
            <ul className="donate-banner__trust">
              <li><ShieldCheck aria-hidden />যাচাইকৃত প্রকল্প</li>
              <li><Receipt aria-hidden />ডিজিটাল রসিদ</li>
              <li><Landmark aria-hidden />স্বচ্ছ হিসাব</li>
            </ul>
          </div>
          <div className="donate-banner__media">
            <Media image={null} ratio="none" dark className="" label="প্রকল্পের ছবি শীঘ্রই" sizes="(min-width: 768px) 45vw, 100vw" />
          </div>
        </div>
      </div>
    </section>
  );
}

export function DonationProjects() {
  const projects = getDonationProjects();
  return (
    <section className="section section--white" aria-labelledby="donation-projects">
      <div className="container">
        <SectionHead
          id="donation-projects"
          title="চলমান অনুদান প্রকল্প"
          subtitle="প্রকল্প বেছে নিয়ে সরাসরি অংশ নিন — প্রতিটি প্রকল্পের বিস্তারিত ও হালনাগাদ তথ্য দেখুন।"
          icon={<HeartHandshake size={26} />}
          link={{ href: "/donate", label: "সকল প্রকল্প" }}
        />
        <div className="grid-4 project-grid">
          {projects.map((p) => <ProjectCard key={p.slug} project={p} />)}
        </div>
      </div>
    </section>
  );
}

/* -------------------------------------------------------------- Education */

export function Education() {
  return (
    <section className="section pattern-bg" aria-labelledby="education">
      <div className="container">
        <SectionHead id="education" title="শিক্ষা প্রতিষ্ঠানসমূহ" subtitle="কুরআন-সুন্নাহভিত্তিক শিক্ষার ঐতিহ্যবাহী প্রতিষ্ঠান ও শিক্ষা বোর্ড।" icon={<GraduationCap size={26} />} link={{ href: "/education", label: "বিস্তারিত" }} />
        <div className="grid-3">
          {institutions.map((inst) => (
            <Link key={inst.slug} href={`/education#${inst.slug}`} className="card inst-card">
              <Media image={inst.image} ratio="none" icon={<Building2 />} sizes="(min-width: 1024px) 400px, 100vw" />
              <div className="card__body">
                <span className="badge" style={{ alignSelf: "flex-start" }}>{inst.kind}</span>
                <h3 className="card__title">{inst.name}</h3>
                <p className="card__text" style={{ marginTop: 0 }}>{inst.description}</p>
                <span className="read-more" style={{ marginTop: 4 }}>বিস্তারিত <ArrowRight aria-hidden /></span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------- Organizations */

export function Organizations() {
  return (
    <section className="section section--white" aria-labelledby="organizations">
      <div className="container">
        <SectionHead id="organizations" title="প্রতিষ্ঠান ও সংগঠনসমূহ" subtitle="দরবার শরীফের আদর্শে পরিচালিত সহযোগী সংগঠন।" icon={<Users size={26} />} link={{ href: "/organizations", label: "সকল সংগঠন" }} />
        <div className="org-grid">
          {organizations.map((o) => (
            <Link key={o.slug} href={`/organizations#${o.slug}`} className="card org-card">
              <span className="org-card__logo">
                {o.logo ? <Image src={o.logo.src} alt={o.logo.alt} width={144} height={144} /> : <Users aria-hidden />}
              </span>
              <h3 className="org-card__name">{o.name}</h3>
              <p className="org-card__text">{o.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ----------------------------------------------------------- Publications */

export function Publications() {
  return (
    <section className="section pattern-bg" aria-labelledby="publications">
      <div className="container">
        <SectionHead id="publications" title="প্রকাশনী" subtitle="দরবার শরীফের প্রকাশিত গ্রন্থ ও সাময়িকী — বিষয়ভিত্তিক তালিকা।" icon={<BookOpen size={26} />} link={{ href: "/publications", label: "সকল প্রকাশনা দেখুন" }} />
        <div className="shelf">
          {publicationCategories.map((c) => (
            <Link key={c.slug} href={`/publications?category=${c.slug}`} className="book">
              <span className={`book__cover book__cover--${c.tone}`}>
                <BookOpen aria-hidden />
                <span>{c.label}</span>
              </span>
              <span className="book__label">{c.description}</span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------------------- Articles */

export function Articles() {
  const list = getArticles();
  const feature = list.find((a) => a.featured) ?? list[0];
  const rest = list.filter((a) => a !== feature).slice(0, 3);
  return (
    <section className="section section--white" aria-labelledby="articles">
      <div className="container">
        <SectionHead
          id="articles"
          title="ইসলামিক প্রবন্ধ ও লেখনী"
          subtitle="ইসলামী জ্ঞানচর্চা, গবেষণা, ইতিহাস, আদর্শ ও সমসাময়িক বিষয় নিয়ে নির্বাচিত প্রবন্ধ।"
          icon={<PenLine size={26} />}
          link={{ href: "/blog", label: "সকল প্রবন্ধ দেখুন" }}
        />
        {feature ? (
          <div className="editorial">
            <ArticleFeatureCard article={feature} author={getAuthor(feature.authorSlug)} />
            <div className="article-list">
              {rest.map((a) => <ArticleRowCard key={a.slug} article={a} author={getAuthor(a.authorSlug)} />)}
            </div>
          </div>
        ) : (
          <div className="empty-state"><PenLine aria-hidden /><h3>প্রবন্ধ শীঘ্রই প্রকাশিত হবে</h3></div>
        )}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------- Team */

export function Team() {
  const team = getHomeTeam();
  return (
    <section className="section pattern-bg" aria-labelledby="team">
      <div className="container">
        <SectionHead
          id="team"
          title="ছারছীনা মিডিয়া ফোরাম"
          subtitle="দরবার শরীফের সংবাদ, কার্যক্রম ও বার্তা মানুষের কাছে পৌঁছে দিতে নিয়োজিত আমাদের মিডিয়া টিম।"
          icon={<Users size={26} />}
          center
        />
        <div className="team-grid">
          {team.map((m, i) => <TeamCard key={m.slug ?? i} member={m} />)}
        </div>
        <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
          <Link href="/media-forum" className="btn btn-outline">সকল সদস্য দেখুন<ArrowRight size={18} aria-hidden /></Link>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------- Newsletter */

export function Newsletter() {
  return (
    <section className="section section--white" aria-labelledby="newsletter">
      <div className="container">
        <div className="newsletter">
          <div>
            <h2 id="newsletter">নিয়মিত আপডেট পেতে যুক্ত থাকুন</h2>
            <p>মাহফিলের সময়সূচি, গুরুত্বপূর্ণ সংবাদ ও নতুন প্রবন্ধের খবর সরাসরি আপনার ইমেইলে।</p>
          </div>
          <NewsletterForm />
        </div>
      </div>
    </section>
  );
}
