# -*- coding: utf-8 -*-
"""Regenerate sitemap.xml lastmod dates from git history.

Keeps the existing URL list, priority and changefreq. lastmod for each URL becomes the date
of the most recent commit that touched the file in a small commit (fewer than BULK files),
so sitewide sweeps such as footer or nav edits do not mark every page as freshly changed.
Falls back to the most recent commit of any size, then to today.

Run from the repo root after publishing:  python gen_sitemap.py
"""
import io, re, subprocess, datetime, collections, os

HOST = 'https://alicetrannp.com'
BULK = 100
WEEKLY = {'/pages/blog/', '/pages/blog/index-vi.html', '/'}

os.chdir(os.path.dirname(os.path.abspath(__file__)))
sm = io.open('sitemap.xml', encoding='utf-8').read()
blocks = re.findall(r'<url>(.*?)</url>', sm, re.S)
DEFAULT_FREQ, DEFAULT_PRI = 'monthly', '0.6'


def field(block, tag, default=''):
    m = re.search(r'<%s>(.*?)</%s>' % (tag, tag), block, re.S)
    return m.group(1).strip() if m else default


entries = [(field(b, 'loc'), field(b, 'lastmod'), field(b, 'changefreq', DEFAULT_FREQ),
            field(b, 'priority', DEFAULT_PRI)) for b in blocks]
assert entries and all(e[0] for e in entries), 'sitemap format not recognised'
assert len(entries) == sm.count('<loc>'), 'url block count mismatch'

log = subprocess.check_output(['git', 'log', '--name-only', '--format=@@%ad', '--date=short'],
                              encoding='utf-8', errors='ignore')
small, any_ = {}, {}
for block in log.split('@@')[1:]:
    lines = [l.strip() for l in block.strip().splitlines() if l.strip()]
    date, names = lines[0], lines[1:]
    for n in names:
        any_.setdefault(n, date)
        if len(names) < BULK:
            small.setdefault(n, date)


def to_file(url):
    path = url[len(HOST):]
    if path.endswith('/'):
        path += 'index.html'
    return path.lstrip('/')


today = datetime.date.today().isoformat()
# files edited but not yet committed count as changed today
dirty = {l[3:].strip().strip('"') for l in subprocess.check_output(
    ['git', 'status', '--porcelain'], encoding='utf-8', errors='ignore').splitlines() if l.strip()}
for d in dirty:
    small[d] = today
out, changed, missing = [], 0, []
for loc, old, freq, pri in entries:
    f = to_file(loc)
    if not os.path.isfile(f):
        missing.append(loc)
        continue
    new = small.get(f) or any_.get(f) or today
    path = loc[len(HOST):]
    if path in WEEKLY:
        freq = 'weekly'
    if new != old:
        changed += 1
    out.append('  <url>\n    <loc>%s</loc>\n    <lastmod>%s</lastmod>\n    <changefreq>%s</changefreq>\n'
               '    <priority>%s</priority>\n  </url>' % (loc, new, freq, pri))

head = sm[:sm.index('<url>')]
xml = head + '\n'.join(out) + '\n</urlset>\n'
io.open('sitemap.xml', 'w', encoding='utf-8').write(xml)
dist = collections.Counter(re.findall(r'<lastmod>(\d{4}-\d{2})', xml))
print('urls: %d  lastmod updated: %d  dropped (file missing): %d' % (len(out), changed, len(missing)))
for m in missing:
    print('  dropped', m)
for k in sorted(dist):
    print('  %s %d' % (k, dist[k]))
