"""Fix blog index OG/schema + add see-also links to 5 informational blog posts."""
import os

BASE = r"C:\Users\anhtr\Documents\alicetrannp.github.io"
BLOG = os.path.join(BASE, "pages", "blog")

# ── 1. BLOG INDEX: add OG tags + schema ──────────────────────────────────────
index_path = os.path.join(BLOG, "index.html")
with open(index_path, "r", encoding="utf-8") as f:
    content = f.read()

if "og:title" not in content:
    og_schema = """  <meta property="og:type" content="website" />
  <meta property="og:title" content="Mental Health Blog | Alice Tran PMHNP, Telehealth Psychiatry Virginia" />
  <meta property="og:description" content="Plain-language articles on psychiatry, ADHD, anxiety, medication management, and telehealth mental health care in Virginia, from Alice Tran PMHNP-BC." />
  <meta property="og:url" content="https://alicetrannp.com/pages/blog/" />
  <meta property="og:image" content="https://alicetrannp.com/img/preview.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="Mental Health Blog | Alice Tran PMHNP, Telehealth Psychiatry Virginia" />
  <meta name="twitter:description" content="Plain-language articles on psychiatry, ADHD, anxiety, medication management, and telehealth mental health care in Virginia, from Alice Tran PMHNP-BC." />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Mental Health Blog | Alice Tran PMHNP",
    "description": "Plain-language articles on psychiatry, ADHD, anxiety, medication management, and telehealth mental health care in Virginia.",
    "url": "https://alicetrannp.com/pages/blog/",
    "author": {
      "@type": "Person",
      "name": "Alice Tran",
      "jobTitle": "Psychiatric Mental Health Nurse Practitioner",
      "honorificSuffix": "PMHNP-BC",
      "url": "https://alicetrannp.com/pages/about.html"
    },
    "publisher": {
      "@type": "MedicalBusiness",
      "name": "Alice Tran Psychiatric Care",
      "url": "https://alicetrannp.com"
    }
  }
  </script>"""
    content = content.replace("</head>", og_schema + "\n</head>", 1)
    with open(index_path, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed: blog/index.html — added OG tags + Blog schema")
else:
    print("SKIP: blog/index.html already has OG tags")

# ── 2. INFORMATIONAL BLOG POSTS: add See Also links ──────────────────────────
def see_also_block(links):
    items = "\n".join(
        f'      <a href="{href}" style="display:block;color:var(--forest);font-weight:600;padding:.5rem 0;'
        f'border-bottom:1px solid rgba(0,0,0,.07);text-decoration:none;">{label} →</a>'
        for label, href in links
    )
    return f"""
    <div style="border-top:1px solid var(--line,rgba(0,0,0,.1));margin-top:2rem;padding-top:1.5rem;">
      <p style="font-size:.78rem;text-transform:uppercase;letter-spacing:.16em;color:var(--green-md);font-weight:700;margin:0 0 .75rem;">See Also</p>
{items}
    </div>

"""

posts = {
    "what-is-a-psychiatric-evaluation.html": see_also_block([
        ("Our Psychiatric Services — What to Expect", "../services.html"),
        ("Rates & Insurance", "../rates.html"),
    ]),
    "what-is-medication-management.html": see_also_block([
        ("Our Psychiatric Services", "../services.html"),
        ("Book a Consultation", "https://alicetran.intakeq.com/booking"),
    ]),
    "telehealth-psychiatry-how-it-works.html": see_also_block([
        ("Our Telehealth Psychiatric Services", "../services.html"),
        ("Rates & Insurance", "../rates.html"),
    ]),
    "lab-testing-psychiatry.html": see_also_block([
        ("Our Psychiatric Services", "../services.html"),
        ("What Is a Psychiatric Evaluation?", "what-is-a-psychiatric-evaluation.html"),
    ]),
    "what-is-a-pmhnp.html": see_also_block([
        ("About Alice Tran, PMHNP-BC", "../about.html"),
        ("Our Psychiatric Services", "../services.html"),
    ]),
}

for fname, block in posts.items():
    path = os.path.join(BLOG, fname)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if "../services.html" in content or "../about.html" in content:
        # Already has a link — check if it's in the body (not just nav/footer)
        # Simple heuristic: if there are 3+ occurrences it's already in body too
        count = content.count("../services.html") + content.count("../about.html")
        if count >= 3:
            print(f"SKIP (already linked in body): {fname}")
            continue

    content = content.replace("</article>", block + "</article>", 1)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Fixed: blog/{fname}")

print("\nDone.")
