import os

pages = [
    r"C:\Users\anhtr\Documents\alicetrannp.github.io\pages\conditions.html",
    r"C:\Users\anhtr\Documents\alicetrannp.github.io\pages\conditions-vi.html",
]

for path in pages:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    if "nav-wrapper" in content:
        print(f"Already has nav-wrapper: {os.path.basename(path)}")
        continue
    # Add opening wrapper
    old = '<nav><a href="../index.html"'
    new = '<div class="nav-wrapper">\n<nav><a href="../index.html"'
    if old not in content:
        print(f"SKIP (no match): {os.path.basename(path)}")
        continue
    content = content.replace(old, new, 1)
    # Close wrapper after mobile-menu (before page-hero)
    for old_close, new_close in [
        ('</div>\n\n<div class="page-hero">', '</div>\n</div>\n\n<div class="page-hero">'),
        ('</div>\n<div class="page-hero">', '</div>\n</div>\n<div class="page-hero">'),
    ]:
        if old_close in content:
            content = content.replace(old_close, new_close, 1)
            break
    else:
        print(f"WARN (no close match): {os.path.basename(path)}")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print(f"Fixed: {os.path.basename(path)}")
