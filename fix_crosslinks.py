"""Add cross-links: blog posts → condition pages, condition pages → blog posts."""
import os

BASE  = r"C:\Users\anhtr\Documents\alicetrannp.github.io"
BLOG  = os.path.join(BASE, "pages", "blog")
PAGES = os.path.join(BASE, "pages")

CTA_MARKER = '<div style="background:var(--sage-lt);border-radius:14px;padding:1.75rem 2rem;margin-top:2.5rem;">'

def see_also(links):
    """Build a compact 'See also' block. links = [(label, href), ...]"""
    items = "\n".join(
        f'      <a href="{href}" style="color:var(--forest);font-weight:600;text-decoration:underline;text-underline-offset:3px;">{label}</a>'
        for label, href in links
    )
    return f"""    <div style="border-top:1px solid var(--line,rgba(0,0,0,.1));margin-top:2rem;padding-top:1.5rem;">
      <p style="font-size:.78rem;text-transform:uppercase;letter-spacing:.16em;color:var(--green-md);font-weight:700;margin:0 0 .75rem;">See Also</p>
      <div style="display:flex;flex-direction:column;gap:.5rem;">
{items}
      </div>
    </div>

    """

# ── BLOG POSTS → condition pages ─────────────────────────────────────────────
blog_edits = {
    "adhd-burnout.html": see_also([
        ("ADHD Treatment in Northern Virginia", "../condition-adhd.html"),
        ("Burnout: What It Is and How We Treat It", "../condition-burnout.html"),
    ]),
    "adhd-high-functioning-professionals.html": see_also([
        ("ADHD Diagnosis & Treatment in Northern Virginia", "../condition-adhd.html"),
    ]),
    "why-adults-miss-adhd-diagnosis.html": see_also([
        ("ADHD Diagnosis & Treatment in Northern Virginia", "../condition-adhd.html"),
    ]),
    "adhd-vs-anxiety.html": see_also([
        ("ADHD Diagnosis & Treatment in Northern Virginia", "../condition-adhd.html"),
        ("Anxiety Treatment in Northern Virginia", "../condition-anxiety.html"),
    ]),
}

for fname, block in blog_edits.items():
    path = os.path.join(BLOG, fname)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    if "../condition-adhd.html" in content:
        print(f"SKIP (already has links): {fname}")
        continue
    if CTA_MARKER not in content:
        print(f"WARN (no CTA marker): {fname}")
        continue
    content = content.replace(CTA_MARKER, block + CTA_MARKER, 1)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Fixed blog: {fname}")

# ── CONDITION PAGES → blog posts ─────────────────────────────────────────────
COND_CTA = '<div style="background:var(--cream,#F5F2EC);padding:2.5rem clamp(1rem,4vw,3rem);">'

def cond_blog_block(links):
    """Small 'From the Blog' strip for condition pages that don't already have one."""
    items = "\n".join(
        f'      <a href="{href}" style="color:var(--forest,#1e3328);font-weight:600;display:block;padding:.5rem 0;border-bottom:1px solid rgba(0,0,0,.06);text-decoration:none;">{label} →</a>'
        for label, href in links
    )
    return f"""<div style="background:var(--sage-lt,#eef4f0);padding:2rem clamp(1rem,4vw,3rem);">
  <div style="max-width:760px;margin:0 auto;">
    <p style="font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:var(--green-md,#4a7c59);font-weight:700;margin:0 0 1rem;">From the Blog</p>
{items}
  </div>
</div>

"""

condition_edits = {
    "condition-anxiety.html": cond_blog_block([
        ("ADHD vs. Anxiety: How to Tell the Difference", "blog/adhd-vs-anxiety.html"),
    ]),
    "condition-burnout.html": cond_blog_block([
        ("ADHD and Burnout: Why It Happens and What to Do", "blog/adhd-burnout.html"),
    ]),
}

for fname, block in condition_edits.items():
    path = os.path.join(PAGES, fname)
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    if "blog/adhd-" in content:
        print(f"SKIP (already has blog link): {fname}")
        continue
    if COND_CTA not in content:
        print(f"WARN (no CTA marker): {fname}")
        continue
    content = content.replace(COND_CTA, block + COND_CTA, 1)
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Fixed condition: {fname}")

print("\nAll cross-links done.")
