import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { IconDrop, IconArrow } from "@/components/Icons";
import { BLOG_POSTS } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Arizona Water Damage Blog | Guides & Resources",
  description:
    "Practical guides on Arizona water damage: monsoon prep, insurance coverage, restoration cost, mold risk, and flood safety.",
  alternates: { canonical: "/blog" },
  ...socialMeta("Arizona Water Damage Blog | Guides & Resources",
    "Practical guides on Arizona water damage: monsoon prep, insurance coverage, restoration cost, mold risk, and flood safety.",
    "/blog"),
};

export default function BlogIndexPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Blog" }]} />
      <PageHero
        eyebrow="Resources"
        h1="Arizona Water Damage Blog"
        lead="Practical, Arizona-specific guides — monsoon prep, insurance, cost, mold, and more."
        primaryCta={{ label: "Need Water Damage Help? Contact Us", href: "/contact" }}
      />
      <section>
        <div className="container">
          <p className="hub-intro">
            Practical guides for Arizona homeowners: what to do after monsoon flooding, how long restoration takes, what insurance usually
            covers, and how to spot hidden water damage and mold. If it is an emergency, do not wait on an article. Call
            {" "}<a href="tel:+19282679292">(928) 267-9292</a> or <Link href="/contact">request service online</Link>.
          </p>
          <h2 className="sr-only">Latest Articles</h2>
          <div className="services-grid">
            {BLOG_POSTS.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="service-card">
                <div className="service-icon"><IconDrop /></div>
                <h3>{post.name}</h3>
                <p>{post.desc}</p>
                <span className="link">Read guide <IconArrow className="w-3.5 h-3.5" /></span>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
