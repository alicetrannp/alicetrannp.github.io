import glob, re

# Add class="site-topbar" to the topbar div so CSS can target it
files = glob.glob('**/*.html', recursive=True)
updated = 0

for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    if 'class="site-topbar"' in content:
        continue
    # Replace the opening tag of the topbar div
    new = content.replace(
        '<div style="position:sticky;top:0;z-index:200;',
        '<div class="site-topbar" style="position:sticky;top:0;z-index:200;',
        1
    )
    if new != content:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(new)
        updated += 1

print(f'Done. Updated: {updated}')
