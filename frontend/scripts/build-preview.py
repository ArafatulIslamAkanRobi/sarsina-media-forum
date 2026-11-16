#!/usr/bin/env python3
"""
Build a single-file, shareable preview from the static export.

    STATIC_EXPORT=1 npx next build        # writes ./out
    python3 scripts/build-preview.py out preview

Every exported page becomes a <section data-route="..."> inside one HTML
document; links are rewritten to #route hashes and scripts/preview.js
provides the interactions (menu, slider, forms) without React.
"""
import pathlib, re, shutil, sys
from bs4 import BeautifulSoup

src = pathlib.Path(sys.argv[1] if len(sys.argv) > 1 else "out")
dst = pathlib.Path(sys.argv[2] if len(sys.argv) > 2 else "preview")
here = pathlib.Path(__file__).parent

SKIP = {"404", "_not-found", "media-forum/_"}


def route_of(rel: str) -> str:
    rel = rel[:-5] if rel.endswith(".html") else rel
    rel = rel.strip("/")
    return "home" if rel in ("", "index") else rel.replace("/", "-")


def rewrite_href(href: str) -> str:
    if not href or not href.startswith("/") or href.startswith("//"):
        return href
    path, _, frag = href.partition("#")
    path = path.split("?")[0]
    route = route_of(path)
    # keep the in-page anchor as a second hash segment: #route--anchor
    return f"#{route}--{frag}" if frag else f"#{route}"


def fix_links(node):
    for a in node.find_all("a", href=True):
        a["href"] = rewrite_href(a["href"])
        a.attrs.pop("target", None) if a["href"].startswith("#") else None
    for img in node.find_all("img"):
        if img.get("src", "").startswith("/"):
            img["src"] = img["src"].lstrip("/")
        img.attrs.pop("srcset", None)
        img.attrs.pop("sizes", None)
    for s in node.find_all("script"):
        if s.get("type") != "application/ld+json":
            s.decompose()


pages = {}
for f in sorted(src.rglob("*.html")):
    rel = f.relative_to(src).as_posix()
    if rel[:-5] in SKIP:
        continue
    pages[route_of(rel)] = BeautifulSoup(f.read_text("utf-8"), "html.parser")

home = pages["home"]
body = home.body
# Shell = everything in <body> except <main>; main content comes from each page
shell_before, shell_after = [], []
seen_main = False
for child in list(body.children):
    if getattr(child, "name", None) == "main":
        seen_main = True
        continue
    if getattr(child, "name", None) in ("script", "next-route-announcer"):
        continue
    (shell_after if seen_main else shell_before).append(child)

sections = []
for route, soup in pages.items():
    main = soup.find("main")
    fix_links(main)
    title = soup.title.string if soup.title else ""
    sections.append(
        f'<section data-route="{route}" data-title="{title}"{"" if route == "home" else " hidden"}>'
        + "".join(str(c) for c in main.children)
        + "</section>"
    )

frag = BeautifulSoup("".join(str(c) for c in shell_before + shell_after), "html.parser")
fix_links(frag)
shell_html = str(frag)
cut = shell_html.find('<footer')
before, after = shell_html[:cut], shell_html[cut:]

dst.mkdir(parents=True, exist_ok=True)

# CSS: drop self-hosted @font-face (fonts come from Google Fonts instead)
css = "".join(p.read_text("utf-8") for p in sorted((src / "_next/static/css").glob("*.css")))
css = re.sub(r"@font-face\{[^}]*url\(/_next/[^}]*\}", "", css)
(dst / "site.css").write_text(css, "utf-8")
shutil.copy(here / "preview.js", dst / "preview.js")
shutil.copytree(src / "brand", dst / "brand", dirs_exist_ok=True)

page = f"""<title>ছারছীনা দরবার শরীফ</title>
<meta name="description" content="ছারছীনা দরবার শরীফ ও ছারছীনা মিডিয়া ফোরামের ওয়েবসাইট — প্রিভিউ">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Hind+Siliguri:wght@400;500;600;700&family=Inter:wght@400;500;600;700&display=swap">
<link rel="stylesheet" href="site.css">
<style>html{{background:#f8f6f1}} body{{background:#f8f6f1;color:#2d2d2d;font-family:"Hind Siliguri","Noto Sans Bengali",system-ui,sans-serif;font-size:16px}}</style>
{before}
<main id="main">{''.join(sections)}</main>
{after}
<script src="preview.js"></script>
"""
(dst / "index.html").write_text(page, "utf-8")
print(f"{len(sections)} routes →", dst / "index.html", f"{(dst / 'index.html').stat().st_size // 1024} KB")
