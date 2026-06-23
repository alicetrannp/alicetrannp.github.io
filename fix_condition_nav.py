import os, glob

pages_dir = r"C:\Users\anhtr\Documents\alicetrannp.github.io\pages"
files = [f for f in glob.glob(os.path.join(pages_dir, "condition-*.html"))
         if "-vi.html" not in f]

fixed = 0
for path in files:
    with open(path, "r", encoding="utf-8") as f:
        content = f.read()
    if "nav-wrapper" in content:
        continue

    old_open = '<nav><a href="../index.html"'
    new_open = '<div class="nav-wrapper">\n<nav><a href="../index.html"'
    if old_open not in content:
        print(f"SKIP (no nav match): {os.path.basename(path)}")
        continue
    content = content.replace(old_open, new_open, 1)

    # Close wrapper after mobile-menu div (before page content)
    old_close = '</div>\n\n<div class="page-hero">'
    new_close = '</div>\n</div>\n\n<div class="page-hero">'
    if old_close in content:
        content = content.replace(old_close, new_close, 1)
    else:
        old_close2 = '</div>\n<div class="page-hero">'
        new_close2 = '</div>\n</div>\n<div class="page-hero">'
        if old_close2 in content:
            content = content.replace(old_close2, new_close2, 1)
        else:
            print(f"WARN (no close match): {os.path.basename(path)}")

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    fixed += 1
    print(f"Fixed: {os.path.basename(path)}")

print(f"\nDone. Fixed {fixed} files.")
