"""
SEO fix script — adds missing OG tags, schema, and cross-links across condition pages.
"""
import os, re

BASE = r"C:\Users\anhtr\Documents\alicetrannp.github.io"
PAGES = os.path.join(BASE, "pages")

# ── 1. CONDITION PAGE DATA ────────────────────────────────────────────────────
# slug → (og_title, condition_name)
CONDITIONS = {
    "condition-adhd":           ("ADHD Diagnosis & Treatment Northern Virginia | Alice Tran PMHNP",      "Attention Deficit Hyperactivity Disorder (ADHD)"),
    "condition-anger":          ("Anger Management Northern Virginia | Telehealth Psychiatry",            "Anger"),
    "condition-anxiety":        ("Anxiety Treatment Northern Virginia | Telehealth Psychiatry",           "Anxiety"),
    "condition-bipolar":        ("Bipolar Disorder Treatment Northern Virginia | Alice Tran PMHNP",       "Bipolar Disorder"),
    "condition-burnout":        ("Burnout Treatment Northern Virginia | Telehealth Psychiatry",           "Burnout"),
    "condition-cultural":       ("Cultural Pressure & Mental Health | Northern Virginia PMHNP",           "Cultural Pressure"),
    "condition-depression":     ("Depression Treatment Northern Virginia | Alice Tran PMHNP",             "Depression"),
    "condition-grief":          ("Grief & Loss Support Northern Virginia | Telehealth Psychiatry",        "Grief and Loss"),
    "condition-identity":       ("Identity & Belonging Mental Health | Northern Virginia PMHNP",          "Identity and Belonging"),
    "condition-insomnia":       ("Insomnia & Sleep Treatment Northern Virginia | Alice Tran PMHNP",       "Insomnia"),
    "condition-international":  ("Mental Health for International Students | Virginia PMHNP",             "International Student Mental Health"),
    "condition-life-transitions":("Life Transitions Mental Health | Northern Virginia PMHNP",             "Life Transitions"),
    "condition-ocd":            ("OCD Treatment Northern Virginia | Telehealth Psychiatry",               "Obsessive-Compulsive Disorder (OCD)"),
    "condition-panic":          ("Panic Disorder Treatment Northern Virginia | Alice Tran PMHNP",         "Panic Disorder"),
    "condition-perinatal":      ("Perinatal Mood Disorder Treatment | Northern Virginia PMHNP",           "Perinatal Mood Disorders"),
    "condition-postpartum":     ("Postpartum Depression Treatment Northern Virginia | Alice Tran PMHNP",  "Postpartum Depression"),
    "condition-self-esteem":    ("Self-Esteem & Confidence Mental Health | Northern Virginia PMHNP",      "Low Self-Esteem"),
    "condition-trauma-ptsd":    ("Trauma & PTSD Treatment Northern Virginia | Alice Tran PMHNP",          "Trauma and PTSD"),
}

def extract_meta(content, field):
    """Pull content="..." from a <meta name=field ...> tag."""
    m = re.search(r'<meta name="' + field + r'"[^>]*content="([^"]+)"', content, re.I)
    if not m:
        m = re.search(r'content="([^"]+)"[^>]*name="' + field + r'"', content, re.I)
    return m.group(1) if m else ""

def extract_title(content):
    m = re.search(r'<title>([^<]+)</title>', content)
    return m.group(1) if m else ""

def make_og_schema(slug, title, description, condition_name):
    url = f"https://alicetrannp.com/pages/{slug}.html"
    og = f"""  <meta property="og:type" content="website" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{description}" />
  <meta property="og:url" content="{url}" />
  <meta property="og:image" content="https://alicetrannp.com/img/preview.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{description}" />"""

    if condition_name:
        schema = f"""  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "{title}",
    "description": "{description}",
    "url": "{url}",
    "about": {{
      "@type": "MedicalCondition",
      "name": "{condition_name}"
    }},
    "author": {{
      "@type": "Person",
      "name": "Alice Tran",
      "jobTitle": "Psychiatric Mental Health Nurse Practitioner",
      "honorificSuffix": "PMHNP-BC",
      "url": "https://alicetrannp.com/pages/about.html"
    }},
    "provider": {{
      "@type": "MedicalBusiness",
      "name": "Alice Tran Psychiatric Care",
      "telephone": "(703) 791-9099",
      "url": "https://alicetrannp.com",
      "medicalSpecialty": "Psychiatry"
    }}
  }}
  </script>"""
    else:
        schema = f"""  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "{title}",
    "description": "{description}",
    "url": "{url}",
    "provider": {{
      "@type": "MedicalBusiness",
      "name": "Alice Tran Psychiatric Care",
      "telephone": "(703) 791-9099",
      "url": "https://alicetrannp.com",
      "medicalSpecialty": "Psychiatry"
    }}
  }}
  </script>"""

    return og + "\n" + schema

# ── 2. FIX CONDITION PAGES ────────────────────────────────────────────────────
fixed = 0
for slug, (og_title, cond_name) in CONDITIONS.items():
    path = os.path.join(PAGES, f"{slug}.html")
    if not os.path.exists(path):
        print(f"NOT FOUND: {slug}.html")
        continue

    with open(path, "r", encoding="utf-8") as f:
        content = f.read()

    if 'og:title' in content:
        print(f"SKIP (already has OG): {slug}.html")
        continue

    desc = extract_meta(content, "description")
    insert = make_og_schema(slug, og_title, desc, cond_name)
    # Insert before </head>
    content = content.replace("</head>", insert + "\n</head>", 1)

    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    fixed += 1
    print(f"Fixed: {slug}.html")

# ── 3. FIX conditions.html INDEX ─────────────────────────────────────────────
cond_index = os.path.join(PAGES, "conditions.html")
with open(cond_index, "r", encoding="utf-8") as f:
    content = f.read()

if 'og:title' not in content:
    title = extract_title(content)
    desc = extract_meta(content, "description")
    url = "https://alicetrannp.com/pages/conditions.html"
    og_block = f"""  <meta property="og:type" content="website" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{desc}" />
  <meta property="og:url" content="{url}" />
  <meta property="og:image" content="https://alicetrannp.com/img/preview.jpg" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:title" content="{title}" />
  <meta name="twitter:description" content="{desc}" />
  <script type="application/ld+json">
  {{
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    "name": "{title}",
    "description": "{desc}",
    "url": "{url}",
    "provider": {{
      "@type": "MedicalBusiness",
      "name": "Alice Tran Psychiatric Care",
      "telephone": "(703) 791-9099",
      "url": "https://alicetrannp.com",
      "medicalSpecialty": "Psychiatry"
    }}
  }}
  </script>"""
    content = content.replace("</head>", og_block + "\n</head>", 1)
    with open(cond_index, "w", encoding="utf-8") as f:
        f.write(content)
    print("Fixed: conditions.html")
    fixed += 1

print(f"\nDone. Fixed {fixed} pages with OG tags + schema.")
