import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock, Hourglass, Newspaper, PenLine, UserRound } from "lucide-react";
import type { Article, Author, DonationProject, NewsItem, TeamMember } from "@/content/types";
import { formatDateBn, formatTaka, readingTimeBn, toBnDigits } from "@/lib/format";
import { Media } from "./Media";
import { SampleBadge } from "./SampleBadge";

/* ---------------------------------------------------------------- News */

export function NewsLeadCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.slug}`} className="card news-lead">
      <Media image={item.coverImage} ratio="none" sizes="(min-width: 1024px) 700px, 100vw" icon={<Newspaper />}>
        <span className="badge badge--solid news-lead__tag">{item.category}</span>
      </Media>
      <div className="card__body">
        <h3 className="card__title">{item.title}</h3>
        <p className="card__text line-clamp-2">{item.excerpt}</p>
        <div className="meta" style={{ marginTop: 12 }}>
          <span><CalendarDays aria-hidden />{formatDateBn(item.publishedAt)}</span>
          <span>{item.reporter}</span>
          <SampleBadge show={item.sample} />
        </div>
      </div>
    </Link>
  );
}

export function NewsRowCard({ item }: { item: NewsItem }) {
  return (
    <Link href={`/news/${item.slug}`} className="card news-row">
      <Media image={item.coverImage} ratio="none" sizes="140px" label={null} icon={<Newspaper />} />
      <div style={{ minWidth: 0 }}>
        <span className="badge" style={{ marginBottom: 4 }}>{item.category}</span>
        <h3 className="card__title line-clamp-2">{item.title}</h3>
        <div className="meta">
          <span><CalendarDays aria-hidden />{formatDateBn(item.publishedAt)}</span>
          <SampleBadge show={item.sample} />
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------- Article */

export function Byline({ author, small }: { author: Author | null; small?: boolean }) {
  if (!author) return null;
  return (
    <span className={`byline${small ? " byline--sm" : ""}`}>
      <span className="byline__avatar">
        {author.photo ? <Image src={author.photo.src} alt="" width={64} height={64} /> : null}
      </span>
      <span style={{ minWidth: 0 }}>
        <span className="byline__name">{author.name}</span>
        {!small && <span style={{ display: "block", fontSize: 12.5 }}>{author.designation}</span>}
      </span>
    </span>
  );
}

export function ArticleFeatureCard({ article, author }: { article: Article; author: Author | null }) {
  return (
    <article className="card article-feature">
      <Link href={`/blog/${article.slug}`} aria-label={article.title} tabIndex={-1}>
        <Media image={article.coverImage} ratio="none" sizes="(min-width: 1024px) 680px, 100vw" icon={<PenLine />} />
      </Link>
      <div className="card__body">
        <div className="meta">
          <span className="badge">{article.category}</span>
          <span><CalendarDays aria-hidden />{formatDateBn(article.publishedAt)}</span>
          <span><Clock aria-hidden />{readingTimeBn(article.readingTimeMin)}</span>
          <SampleBadge show={article.sample} />
        </div>
        <h3 className="card__title">
          <Link href={`/blog/${article.slug}`}>{article.title}</Link>
        </h3>
        <p className="card__text line-clamp-3">{article.excerpt}</p>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap", marginTop: 6 }}>
          {author && <Link href={`/blog/author/${author.slug}`}><Byline author={author} /></Link>}
          <Link href={`/blog/${article.slug}`} className="read-more">বিস্তারিত পড়ুন <ArrowRight aria-hidden /></Link>
        </div>
      </div>
    </article>
  );
}

export function ArticleRowCard({ article, author }: { article: Article; author: Author | null }) {
  return (
    <Link href={`/blog/${article.slug}`} className="card article-row">
      <Media image={article.coverImage} ratio="none" sizes="140px" label={null} icon={<PenLine />} />
      <div style={{ minWidth: 0, display: "grid", gap: 6, alignContent: "start" }}>
        <div className="meta" style={{ fontSize: 12.5 }}>
          <span className="badge">{article.category}</span>
          <span><Clock aria-hidden />{readingTimeBn(article.readingTimeMin)}</span>
        </div>
        <h3 className="card__title line-clamp-2">{article.title}</h3>
        <div className="meta" style={{ fontSize: 12.5 }}>
          <Byline author={author} small />
          <span>{formatDateBn(article.publishedAt)}</span>
          <SampleBadge show={article.sample} />
        </div>
      </div>
    </Link>
  );
}

/* ------------------------------------------------------------ Donation */

export function DonationProgress({ project }: { project: DonationProject }) {
  const { targetAmount: target, collectedAmount: collected } = project;
  if (target == null || collected == null || target <= 0) {
    return (
      <p className="progress-pending">
        <Hourglass aria-hidden />
        লক্ষ্যমাত্রা ও সংগ্রহের হালনাগাদ তথ্য শীঘ্রই প্রকাশ করা হবে
      </p>
    );
  }
  const pct = Math.min(100, Math.round((collected / target) * 100));
  return (
    <div className="progress">
      <div className="progress__row"><span>অগ্রগতি</span><b>{toBnDigits(pct)}%</b></div>
      <div className="progress__bar" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={pct} aria-label={`${project.title} অগ্রগতি`}>
        <div className="progress__fill" style={{ width: `${pct}%` }} />
      </div>
      <div className="progress__row"><span>লক্ষ্য: <b>{formatTaka(target)}</b></span><span>সংগৃহীত: <b>{formatTaka(collected)}</b></span></div>
    </div>
  );
}

export function ProjectCard({ project }: { project: DonationProject }) {
  return (
    <article className="card card--hover project-card">
      <Media image={project.image} ratio="none" sizes="(min-width: 1024px) 300px, 50vw" />
      <div className="card__body">
        <h3 className="card__title"><Link href={`/donate/${project.slug}`}>{project.title}</Link></h3>
        <p className="card__text line-clamp-3" style={{ marginTop: 0 }}>{project.shortDescription}</p>
        <DonationProgress project={project} />
        <div className="project-card__actions">
          <Link href={`/donate/${project.slug}`} className="btn btn-outline btn-sm">বিস্তারিত</Link>
          <Link href={`/donate?fund=${project.fundId}#quick-donate`} className="btn btn-primary btn-sm">দান করুন</Link>
        </div>
      </div>
    </article>
  );
}

/* ---------------------------------------------------------------- Team */

export function TeamCard({ member }: { member: TeamMember }) {
  const inner = (
    <>
      <div className="team-card__photo">
        {member.photo ? (
          <Image src={member.photo.src} alt={member.photo.alt} fill sizes="132px" style={{ objectFit: "cover" }} />
        ) : (
          <div className="media-ph" aria-hidden><UserRound /></div>
        )}
      </div>
      {member.name ? (
        <span className="team-card__name">{member.name}</span>
      ) : (
        <span className="team-card__name team-card__name--pending">নাম শীঘ্রই যুক্ত হবে</span>
      )}
      <span className="team-card__role">{member.designation}</span>
    </>
  );
  return member.slug ? (
    <Link href={`/media-forum/${member.slug}`} className="card team-card">{inner}</Link>
  ) : (
    <div className="card team-card">{inner}</div>
  );
}
