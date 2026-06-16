import glob

files = glob.glob('**/*.html', recursive=True)
updated = 0

for f in files:
    with open(f, 'r', encoding='utf-8') as fh:
        content = fh.read()
    new = content.replace('justify-content:flex-end;gap:1.25rem', 'justify-content:center;gap:1.25rem', 1)
    if new != content:
        with open(f, 'w', encoding='utf-8') as fh:
            fh.write(new)
        updated += 1

print(f'Done. Updated: {updated}')
