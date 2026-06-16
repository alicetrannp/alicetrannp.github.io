import glob

# For pages/ (one level deep) — insert Blog link before FAQ
PAGES_OLD = '<a href="faq.html">FAQ</a>'
PAGES_NEW = '<a href="blog/index.html">Blog</a><a href="faq.html">FAQ</a>'

# For pages/blog/ (two levels deep) — already have Blog link, skip
# For root-level pages — handled separately if needed

files = glob.glob('pages/*.html')
updated = 0

for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    # Skip if Blog link already present
    if 'blog/index.html' in content or '>Blog<' in content:
        continue
    # Add Blog link before FAQ in both desktop and mobile navs
    new = content.replace(PAGES_OLD, PAGES_NEW)
    if new != content:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(new)
        updated += 1

print(f'Done. Updated: {updated}')
