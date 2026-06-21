"""
Generates all SEO landing pages:
  - 11 condition+city pages (adhd/anxiety/depression x fairfax/arlington/alexandria/reston/northern-va)
  - 5 insurance pages (Aetna, Medicaid, Medicare, Carelon, Anthem BCBS)
Run once from the repo root.
"""
import os

BASE = os.path.join(os.path.dirname(__file__), "pages")

# ── shared HTML fragments ──────────────────────────────────────────────────

GTAG = """\
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-3YS26D3KXJ"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-3YS26D3KXJ');
</script>"""

TOPBAR = """\
<div class="site-topbar" style="position:sticky;top:0;z-index:200;background:#1e3328;padding:0 clamp(1rem,4vw,3rem);display:flex;align-items:center;justify-content:center;gap:1.25rem;height:36px;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;flex-shrink:0;">
  <a href="tel:7037919099" style="color:rgba(255,255,255,.8);font-size:.75rem;text-decoration:none;display:flex;align-items:center;gap:.4rem;white-space:nowrap;">
    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 7V5z"/></svg>
    (703) 791-9099
  </a>
  <span style="color:rgba(255,255,255,.25);">|</span>
  <a href="mailto:info@alicetrannp.com" style="color:rgba(255,255,255,.8);font-size:.75rem;text-decoration:none;display:flex;align-items:center;gap:.4rem;white-space:nowrap;">
    <svg width="12" height="12" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>
    info@alicetrannp.com
  </a>
</div>"""

NAV = """\
<div class="nav-wrapper">
<nav>
  <a href="../index.html" class="nav-logo"><img src="../img/logo.png" alt="" width="28" height="28" style="border-radius:50%;vertical-align:middle;margin-right:8px;">Alice Tran Psychiatric Care</a>
  <div class="nav-links">
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="rates.html">Rates</a>
    <a href="conditions.html">Conditions</a>
    <a href="blog/index.html">Blog</a>
    <a href="faq.html">FAQ</a><a href="contact.html">Contact</a>
    <div style="display:flex;align-items:center;gap:0.5rem;flex-shrink:0;">
      <a href="https://doxy.me/alicetran" target="_blank" class="nav-visit">Join Visit</a>
      <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta">Book Now</a>
    </div>
  </div>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta nav-book-mobile">Book Now</a>
  <button class="nav-toggle" onclick="toggleMenu()" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="about.html">About</a>
  <a href="services.html">Services</a>
  <a href="rates.html">Rates</a>
  <a href="conditions.html">Conditions</a>
  <a href="blog/index.html">Blog</a>
  <a href="faq.html">FAQ</a><a href="contact.html">Contact</a>
  <a href="https://doxy.me/alicetran" target="_blank">Join Visit</a>
  <a href="https://alicetran.intakeq.com/booking" target="_blank">Book Now</a>
</div>
</div>"""

FOOTER = """\
<footer>
  <div class="footer-grid">
    <div>
      <div class="footer-brand">Alice Tran Psychiatric Care</div>
      <p class="footer-tagline">Telehealth psychiatric care across Virginia.<br>English &amp; Ti&#7871;ng Vi&#7879;t welcome.</p>
      <br><h4>Contact</h4>
      <a href="tel:7037919099">Phone: (703) 791-9099</a>
      <a href="mailto:info@alicetrannp.com">Email: info@alicetrannp.com</a>
    </div>
    <div>
      <h4>Pages</h4>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="rates.html">Rates</a>
      <a href="conditions.html">Conditions</a>
      <a href="blog/index.html">Blog</a>
      <a href="faq.html">FAQ</a><a href="contact.html">Contact</a>
    </div>
    <div>
      <h4>Hours</h4>
      <p style="line-height:2.2;">
        <b>Mon &ndash; Thu</b> 10am &ndash; 4pm<br>
        <b>Fri &ndash; Sun</b> Closed
      </p>
    </div>
  </div>
  <div class="footer-copy">&copy; 2026 Alice Tran Psychiatric Care LLC. All rights reserved. &nbsp;&middot;&nbsp; <a href="privacy.html">Privacy</a> &middot; <a href="terms.html">Terms</a> &middot; <a href="disclaimer.html">Disclaimer</a></div>
</footer>
<script>function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open');}</script>
<script src="../js/chat-widget.js" data-base="../"></script>"""

# ── condition data ────────────────────────────────────────────────────────

CONDITIONS = {
    "adhd": {
        "name": "ADHD",
        "service_label": "ADHD Treatment",
        "slug_part": "adhd-treatment",
        "tag": "Adult ADHD",
        "title_suffix": "ADHD Treatment",
        "meta_desc_tmpl": "Board-certified psychiatric nurse practitioner Alice Tran, PMHNP-BC, provides adult ADHD evaluation and medication management via telehealth for {city_name}, VA residents. No referral needed.",
        "h1_line1": "Adult ADHD Treatment",
        "h1_line2": "{city_name}, Virginia",
        "hero_p": "Many adults live for years not knowing they have ADHD. If you struggle with focus, time management, or follow-through, a proper evaluation can be the turning point. Alice Tran, PMHNP-BC, provides comprehensive adult ADHD assessment and medication management via telehealth, serving {city_name} and all of Virginia.",
        "what_heading": "What Is Adult ADHD?",
        "what_body": """<p>ADHD is not a childhood condition that people simply outgrow. Millions of adults live with undiagnosed or undertreated ADHD, often spending years wondering why focusing feels so hard, why deadlines feel impossible, or why relationships suffer despite genuine effort.</p>
    <p>Adult ADHD often looks different from what most people picture. Rather than obvious hyperactivity, adults more commonly experience difficulty sustaining attention on low-stimulation tasks, a persistent sense of underachievement, impulsive decisions, emotional reactivity, chronic lateness, and an inability to start things even when they care deeply about them.</p>
    <p>In women and in people who were labeled "gifted" as children, ADHD frequently goes undiagnosed for decades. The coping strategies that worked in school, like hyperfocusing, working twice as hard, or relying on last-minute adrenaline, eventually stop being enough.</p>""",
        "symptoms_heading": "Common Signs of Adult ADHD",
        "symptoms": [
            "Difficulty sustaining attention on meetings, reading, or paperwork",
            "Chronic disorganization or losing important items regularly",
            "Forgetting appointments, deadlines, or conversations",
            "Starting many projects but struggling to complete them",
            "Emotional dysregulation or low frustration tolerance",
            "Impulsive spending, speaking, or decision-making",
            "Time blindness, consistently underestimating how long tasks take",
            "Racing thoughts or difficulty quieting the mind at night",
        ],
        "treatment_heading": "How Alice Tran Treats Adult ADHD",
        "treatment_body": """<p>A proper ADHD evaluation looks at your full history, not just a checklist. Alice conducts a detailed clinical interview covering childhood and current symptoms, reviews standardized ADHD rating scales, and explores how attention difficulties have shaped your education, career, and relationships.</p>
    <p>Treatment is individualized. Many people benefit from stimulant medications such as amphetamine salts or methylphenidate, which work quickly and reliably for ADHD symptoms. Non-stimulant options including atomoxetine and guanfacine are available for those who prefer them or cannot tolerate stimulants. Every medication decision is made collaboratively, with a clear explanation of what to expect.</p>
    <p>Virginia telehealth law permits prescribing ADHD medications via secure video visits, so you can receive complete evaluation and ongoing medication management from anywhere in the state. Follow-up appointments are typically scheduled every one to three months to monitor response and adjust as needed.</p>""",
        "local_heading": "Telehealth ADHD Care for {city_name} Residents",
        "local_body_tmpl": "{city_telehealth_blurb}",
        "faqs": [
            ("Can an adult be diagnosed with ADHD?",
             "Yes. ADHD is a lifelong neurological condition. Many adults were never evaluated as children, received an incorrect diagnosis, or were told they would outgrow it. Adult ADHD diagnosis is based on a thorough clinical interview and history review, not a brain scan or single questionnaire."),
            ("What is the difference between ADHD and anxiety?",
             "ADHD and anxiety share many surface symptoms, including difficulty concentrating, restlessness, and sleep problems. The key difference lies in the cause: ADHD involves attention regulation difficulties rooted in brain wiring, while anxiety involves excessive worry and fear responses. It is also very common to have both conditions at the same time."),
            ("Do I need a referral to be evaluated for ADHD?",
             "No referral is required. Alice Tran Psychiatric Care accepts new patients directly. You can book an evaluation online and typically be seen within one to two weeks."),
            ("What medications treat adult ADHD?",
             "Common first-line medications include stimulants such as Adderall (amphetamine salts) and Ritalin or Concerta (methylphenidate). Non-stimulant options include Strattera (atomoxetine) and Intuniv (guanfacine). The right choice depends on your history, preferences, sleep patterns, and any coexisting conditions."),
            ("Is telehealth effective for ADHD evaluation and treatment?",
             "Yes. Adult ADHD evaluation and medication management translate well to telehealth. Alice conducts full evaluations via secure video visit. Virginia law permits prescribing ADHD medications through telehealth appointments, so no in-person visit is required."),
        ],
        "cta_label": "Schedule an ADHD Evaluation",
        "schema_specialty": "Psychiatry",
    },
    "anxiety": {
        "name": "Anxiety",
        "service_label": "Anxiety Treatment",
        "slug_part": "anxiety-treatment",
        "tag": "Anxiety Treatment",
        "title_suffix": "Anxiety Treatment",
        "meta_desc_tmpl": "Alice Tran, PMHNP-BC, provides anxiety evaluation and medication management via telehealth for {city_name}, VA residents. Same-week appointments often available. No referral needed.",
        "h1_line1": "Anxiety Treatment",
        "h1_line2": "{city_name}, Virginia",
        "hero_p": "Anxiety is the most common mental health condition in the United States, yet many people go years assuming their worry is just part of who they are. Alice Tran, PMHNP-BC, provides compassionate anxiety evaluation and medication management via telehealth, available to {city_name} residents and anyone across Virginia.",
        "what_heading": "Understanding Anxiety Disorders",
        "what_body": """<p>Anxiety disorders include generalized anxiety disorder (GAD), social anxiety, panic disorder, health anxiety, and specific phobias. While some degree of worry is a normal human experience, anxiety becomes a clinical concern when it is excessive, persistent, difficult to control, and interferes with daily life.</p>
    <p>Symptoms can be mental, physical, or both. Common experiences include constant or recurring worry, restlessness, muscle tension, fatigue, difficulty concentrating, irritability, and disrupted sleep. Physical symptoms such as racing heart, shortness of breath, stomach problems, and dizziness can sometimes be mistaken for medical conditions, leading to months of unnecessary testing before a mental health cause is identified.</p>
    <p>Anxiety frequently coexists with depression, and it can also overlap significantly with ADHD. A thorough evaluation helps clarify which conditions are present and how they interact.</p>""",
        "symptoms_heading": "Signs You May Have an Anxiety Disorder",
        "symptoms": [
            "Excessive worry that is hard to turn off, even when things are objectively fine",
            "Feeling on edge or keyed up most of the time",
            "Trouble falling asleep because your mind keeps racing",
            "Avoiding situations, conversations, or responsibilities because of fear",
            "Physical symptoms with no clear medical cause (tight chest, upset stomach, headaches)",
            "Panic attacks, sudden waves of intense fear with physical symptoms",
            "Replaying conversations or events and worrying about what you said or did",
            "Difficulty concentrating because worry keeps pulling your attention away",
        ],
        "treatment_heading": "How Alice Tran Treats Anxiety",
        "treatment_body": """<p>Before recommending treatment, Alice conducts a thorough psychiatric evaluation to understand the type and severity of your anxiety, what triggers it, how long you have experienced it, and what has or has not helped before. Lab work may be ordered to rule out medical causes of anxiety-like symptoms, including thyroid imbalances and low vitamin D or B12 levels.</p>
    <p>Effective treatment for anxiety typically involves medication, therapy, or both. SSRIs and SNRIs are the most commonly prescribed and generally well-tolerated medications for anxiety disorders. Buspirone is another option for generalized anxiety. Some patients benefit from short-term support with other medications during high-stress periods. Alice explains each option clearly, including what to expect, how long it takes to work, and potential side effects.</p>
    <p>Medication is most effective when combined with therapy. If you are not already working with a therapist, Alice can provide a referral to someone who specializes in anxiety treatment, such as cognitive behavioral therapy (CBT).</p>""",
        "local_heading": "Telehealth Anxiety Care for {city_name} Residents",
        "local_body_tmpl": "{city_telehealth_blurb}",
        "faqs": [
            ("What is the difference between normal worry and an anxiety disorder?",
             "Normal worry is proportional to a real situation and fades when the situation resolves. An anxiety disorder involves worry that is excessive, difficult to control, often not tied to a specific situation, and persistent even when things are going well. If anxiety is affecting your work, relationships, sleep, or quality of life, that is a signal worth taking seriously."),
            ("Can anxiety be treated with medication?",
             "Yes. SSRIs and SNRIs are highly effective for most anxiety disorders and are the standard of care for conditions like GAD, social anxiety, and panic disorder. They typically take two to four weeks to show meaningful improvement and work best taken consistently. Some people use medication for a defined period while building skills in therapy; others benefit from long-term treatment."),
            ("Do I need a referral to see Alice for anxiety?",
             "No referral is needed. You can book directly through the online scheduling system. Many patients come to Alice after struggling on their own for years or after a primary care provider recommended a psychiatric specialist."),
            ("What if I have both anxiety and depression?",
             "This is extremely common. Many of the same medications treat both conditions effectively, and a thorough evaluation will assess for both. Alice develops treatment plans that address all presenting concerns together rather than treating one diagnosis in isolation."),
            ("Is telehealth a good fit for anxiety treatment?",
             "Yes. Many patients find telehealth particularly helpful for anxiety because they can attend appointments from a comfortable, familiar environment rather than navigating a new office. Evaluation and medication management for anxiety are fully suited to secure video visits."),
        ],
        "cta_label": "Schedule an Anxiety Evaluation",
        "schema_specialty": "Psychiatry",
    },
    "depression": {
        "name": "Depression",
        "service_label": "Depression Treatment",
        "slug_part": "depression-treatment",
        "tag": "Depression Treatment",
        "title_suffix": "Depression Treatment",
        "meta_desc_tmpl": "Alice Tran, PMHNP-BC, provides depression evaluation and antidepressant management via telehealth for {city_name}, VA residents. Compassionate, evidence-based care. No referral needed.",
        "h1_line1": "Depression Treatment",
        "h1_line2": "{city_name}, Virginia",
        "hero_p": "Depression is one of the most treatable mental health conditions, yet many people go months or years without help, assuming they should be able to push through on their own. Alice Tran, PMHNP-BC, provides comprehensive depression evaluation and medication management via telehealth for {city_name} residents and anyone across Virginia.",
        "what_heading": "Understanding Depression",
        "what_body": """<p>Depression is more than sadness. Major depressive disorder involves a persistent low mood or loss of interest in things you used to enjoy, often accompanied by fatigue, changes in sleep or appetite, difficulty concentrating, feelings of worthlessness or guilt, slowed thinking, and in some cases, thoughts of death or suicide.</p>
    <p>Depression affects people differently. Some experience the classic presentation of sadness and tearfulness. Others feel emotionally flat, unmotivated, or irritable rather than sad. Some people continue to function on the surface while feeling empty inside, a pattern sometimes called high-functioning depression. Whatever form it takes, depression is a medical condition and not a sign of weakness or failure.</p>
    <p>Before attributing symptoms to depression, it is important to rule out medical causes. Thyroid disorders, anemia, vitamin B12 deficiency, vitamin D deficiency, and certain medications can all produce symptoms that closely resemble depression. A thorough evaluation includes lab work when clinically indicated.</p>""",
        "symptoms_heading": "Common Signs of Depression",
        "symptoms": [
            "Persistent low mood, sadness, or emotional numbness lasting more than two weeks",
            "Loss of interest or pleasure in activities that used to feel meaningful",
            "Fatigue and low energy, even after adequate sleep",
            "Changes in appetite or weight without intentional dieting",
            "Sleeping too much or too little",
            "Difficulty concentrating, remembering details, or making decisions",
            "Feelings of worthlessness, excessive guilt, or self-criticism",
            "Withdrawing from friends, family, or social activities",
        ],
        "treatment_heading": "How Alice Tran Treats Depression",
        "treatment_body": """<p>Treatment for depression typically involves antidepressant medication, psychotherapy, or a combination of both. First-line antidepressants including SSRIs and SNRIs are effective for most people with moderate to severe depression and are generally well tolerated. It often takes two to four weeks to notice meaningful improvement, and the dose may need adjustment over time.</p>
    <p>Alice conducts a full psychiatric evaluation before recommending any treatment, reviewing prior treatment history, current medications, family history, and life circumstances. The goal is not just to reduce symptoms but to understand what is driving the depression and address it as completely as possible. Lab work is ordered when appropriate to rule out reversible medical causes.</p>
    <p>Follow-up appointments are important, particularly in the first few months. Alice monitors medication response, side effects, and progress at each visit, adjusting the plan as needed. If therapy would benefit you, she can provide a referral to a therapist who specializes in depression treatment.</p>""",
        "local_heading": "Telehealth Depression Care for {city_name} Residents",
        "local_body_tmpl": "{city_telehealth_blurb}",
        "faqs": [
            ("How do I know if I need medication for depression?",
             "Medication is generally considered for moderate to severe depression, depression lasting more than a few weeks, or depression that is significantly affecting your ability to function at work or in relationships. It is also considered when therapy alone has not been enough. A psychiatric evaluation helps clarify what approach makes sense for your specific situation."),
            ("How long does it take for antidepressants to work?",
             "Most antidepressants take two to four weeks to produce noticeable effects, with full benefit typically felt at six to eight weeks. If the first medication does not work well, there are many others to try. Finding the right fit sometimes takes patience, but most people do find a medication that helps."),
            ("Can depression go away on its own?",
             "Mild depression sometimes improves on its own, particularly when tied to a specific stressor that resolves. However, moderate to severe depression rarely resolves without treatment, and leaving it untreated carries real risks including worsening symptoms, relationship damage, and lost time. Earlier treatment generally leads to better outcomes."),
            ("Do I need a referral to see Alice for depression?",
             "No referral is required. Alice Tran Psychiatric Care accepts new patients directly. You can book a new patient evaluation online and typically be seen within one to two weeks."),
            ("Is telehealth appropriate for depression treatment?",
             "Yes. Depression evaluation and antidepressant management are well-suited to telehealth. Many patients find it easier to open up about how they are feeling from the privacy of their own home. Secure video visits are HIPAA-compliant and available to anyone in Virginia."),
        ],
        "cta_label": "Schedule a Depression Evaluation",
        "schema_specialty": "Psychiatry",
    },
}

# ── city data ─────────────────────────────────────────────────────────────

CITIES = {
    "fairfax": {
        "name": "Fairfax",
        "slug_part": "fairfax-va",
        "county": "Fairfax County",
        "state_context": "in Fairfax, Virginia",
        "telehealth_blurbs": {
            "adhd": "Fairfax County is one of the most educated and professionally driven communities in the country, and it is also a place where undiagnosed ADHD quietly affects thousands of high-achieving adults. Whether you are a federal employee, a contractor, a parent managing a packed schedule, or a student who has always had to work harder than peers to keep up, telehealth makes it easy to get evaluated and treated without taking time off work or fighting Fairfax traffic. Alice sees patients via secure video visit during weekday morning and afternoon hours.",
            "anxiety": "The fast pace of life in Fairfax County, with its competitive job market, long commutes, and high cost of living, creates fertile ground for anxiety. Many Fairfax residents carry the weight of high performance expectations without ever addressing the anxiety driving them. Telehealth with Alice Tran makes it possible to get psychiatric care from your home or office, no commute required.",
            "depression": "In Fairfax County, where success and productivity are cultural expectations, depression can go unrecognized for a long time. Many residents feel pressure to keep functioning at a high level even when they are struggling privately. Telehealth with Alice Tran allows you to receive confidential, compassionate depression care from your home, on a schedule that fits your life.",
        },
    },
    "arlington": {
        "name": "Arlington",
        "slug_part": "arlington-va",
        "county": "Arlington County",
        "state_context": "in Arlington, Virginia",
        "telehealth_blurbs": {
            "adhd": "Arlington's high-achieving, fast-moving environment can both mask and amplify ADHD symptoms. Many Arlington residents have built careers around compensating for attention difficulties without ever receiving a diagnosis. Telehealth with Alice Tran makes getting evaluated simple, with appointments available via secure video so you do not need to take a half-day off or navigate DC traffic to get care.",
            "anxiety": "Arlington is home to many professionals in government, tech, consulting, and nonprofit sectors, all fields where performance pressure and constant connectivity can sustain or worsen anxiety. Telehealth with Alice Tran makes it easy to prioritize your mental health without interrupting a demanding workday.",
            "depression": "For many Arlington residents, depression coexists with an outwardly productive life. It is possible to hold a demanding job, maintain relationships, and still feel profoundly disconnected or empty. Telehealth with Alice Tran provides private, confidential depression care without requiring you to take time away from your work or family obligations.",
        },
    },
    "alexandria": {
        "name": "Alexandria",
        "slug_part": "alexandria-va",
        "county": "Alexandria (City)",
        "state_context": "in Alexandria, Virginia",
        "telehealth_blurbs": {
            "adhd": "Alexandria's vibrant and diverse population includes many adults who suspect they have ADHD but have never been formally evaluated. Telehealth with Alice Tran removes the barriers to getting an assessment: no referral, no in-person office visit, and appointments available during standard weekday hours via secure video. Care is available to anyone in Virginia, including all Alexandria zip codes.",
            "anxiety": "Alexandria residents seeking anxiety treatment no longer need to navigate in-person appointment logistics. Telehealth with Alice Tran means you can attend your psychiatric appointment from home, your office, or anywhere in Virginia with a private internet connection. Same-week appointments are often available for new patients.",
            "depression": "Getting help for depression can feel hardest when you are most depressed. Telehealth with Alice Tran lowers that barrier: you can book online, connect via secure video from your own space, and receive a thorough evaluation and treatment plan without traveling across town. Alice serves all of Alexandria and the surrounding area.",
        },
    },
    "reston": {
        "name": "Reston",
        "slug_part": "reston-va",
        "county": "Fairfax County (Reston)",
        "state_context": "in Reston, Virginia",
        "telehealth_blurbs": {
            "adhd": "Reston's thriving tech and government contracting community is filled with high-performing professionals who have quietly compensated for ADHD symptoms for years. If you find yourself constantly context-switching, missing details, or running late despite genuinely trying, telehealth with Alice Tran makes it easy to get evaluated from Reston Town Center or anywhere in Virginia.",
            "anxiety": "Reston's demanding professional environment and diverse community create unique pressures that can fuel or worsen anxiety. Telehealth with Alice Tran means accessible psychiatric care available on your schedule, without a commute to a different county. Appointments are available via secure video to all Reston and Fairfax County residents.",
            "depression": "For Reston residents dealing with depression, telehealth makes it easier to take the first step. Alice Tran sees patients via secure video visit, allowing you to attend from home during a lunch break or after the workday ends. No in-person office, no long drive, and no referral required.",
        },
    },
    "northern-virginia": {
        "name": "Northern Virginia",
        "slug_part": "northern-virginia",
        "county": "Northern Virginia",
        "state_context": "across Northern Virginia",
        "telehealth_blurbs": {
            "adhd": "Northern Virginia is one of the most educated and high-achieving regions in the country, and it is also a region where adult ADHD routinely goes undiagnosed. High intelligence, strong work ethic, and years of developing coping strategies can mask ADHD symptoms until they become impossible to ignore. Alice Tran sees patients across the Northern Virginia region via telehealth, including Fairfax, Arlington, Alexandria, Reston, McLean, Vienna, Herndon, Falls Church, Chantilly, and Centreville.",
            "anxiety": "Across Northern Virginia, from the busy corridors of Arlington to the suburbs of Fairfax and Loudoun counties, anxiety is among the most common reasons adults seek psychiatric care. Telehealth with Alice Tran means residents throughout the region can access evidence-based anxiety treatment without the commute, wait, or logistical barriers of in-person care.",
            "depression": "Depression affects adults throughout Northern Virginia, regardless of income, education, or outward success. Telehealth with Alice Tran provides accessible, confidential depression care to residents across Fairfax, Arlington, Alexandria, Prince William, and Loudoun counties. No referral is needed, and appointments can often be scheduled within the same week.",
        },
    },
}

# Which city+condition combinations to generate
COMBOS = [
    ("adhd", "fairfax"),
    ("adhd", "arlington"),
    ("adhd", "alexandria"),
    ("adhd", "reston"),
    ("adhd", "northern-virginia"),
    ("anxiety", "fairfax"),
    ("anxiety", "arlington"),
    ("anxiety", "northern-virginia"),
    ("depression", "fairfax"),
    ("depression", "alexandria"),
    ("depression", "northern-virginia"),
]

# ── page builder: condition+city ──────────────────────────────────────────

def faq_html(faqs):
    items = ""
    for q, a in faqs:
        items += f"""
    <div style="border-bottom:1px solid var(--border);padding:1.25rem 0;">
      <p style="font-weight:600;color:var(--forest);margin:0 0 .5rem;font-size:.95rem;">{q}</p>
      <p style="color:var(--green-md);font-size:.9rem;line-height:1.8;margin:0;">{a}</p>
    </div>"""
    return items

def symptoms_html(symptoms):
    items = "".join(f'<li style="padding:.35rem 0;color:var(--green-md);font-size:.93rem;">{s}</li>' for s in symptoms)
    return f'<ul style="list-style:none;padding:0;margin:0;">{items}</ul>'

def build_condition_city_page(cond_key, city_key):
    c = CONDITIONS[cond_key]
    city = CITIES[city_key]
    city_name = city["name"]
    slug = f"{c['slug_part']}-{city['slug_part']}"
    canonical = f"https://alicetrannp.com/pages/{slug}.html"
    title = f"{c['title_suffix']} {city_name}, VA | Alice Tran Psychiatric Care"
    meta_desc = c["meta_desc_tmpl"].format(city_name=city_name)
    h1_l1 = c["h1_line1"]
    h1_l2 = c["h1_line2"].format(city_name=city_name)
    hero_p = c["hero_p"].format(city_name=city_name)
    local_heading = c["local_heading"].format(city_name=city_name)
    local_body = city["telehealth_blurbs"][cond_key]
    area_served = city_name if city_key != "northern-virginia" else "Northern Virginia"

    schema = f"""{{
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Alice Tran Psychiatric Care",
    "url": "https://alicetrannp.com",
    "telephone": "+17037919099",
    "email": "info@alicetrannp.com",
    "medicalSpecialty": "{c['schema_specialty']}",
    "areaServed": "{area_served}",
    "description": "{meta_desc}",
    "provider": {{
      "@type": "Person",
      "name": "Alice Tran",
      "jobTitle": "Psychiatric Mental Health Nurse Practitioner",
      "honorificSuffix": "PMHNP-BC"
    }}
  }}"""

    symptoms = symptoms_html(c["symptoms"])
    faqs = faq_html(c["faqs"])

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
{GTAG}
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{title}</title>
  <meta name="description" content="{meta_desc}" />
  <link rel="canonical" href="{canonical}" />
  <link rel="preload" href="../css/fonts.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="../css/fonts.css"></noscript>
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="icon" href="../img/logo.png" type="image/png" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="{title}" />
  <meta property="og:description" content="{meta_desc}" />
  <meta property="og:url" content="{canonical}" />
  <meta property="og:image" content="https://alicetrannp.com/img/preview.jpg" />
  <script type="application/ld+json">
  {schema}
  </script>
</head>
<body>
{TOPBAR}

{NAV}

<div class="page-hero">
  <div class="section-tag">{city_name}, Virginia</div>
  <h1>{h1_l1}<br><span style="font-style:italic;font-weight:300;">{h1_l2}</span></h1>
  <p>{hero_p}</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="btn-primary" style="margin-top:1.5rem;display:inline-block;">Schedule an Evaluation</a>
</div>

<section style="background:var(--cream);padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:860px;margin:0 auto;">
    <span class="eyebrow">{c['tag']}</span>
    <h2 class="h2-hero">{c['what_heading']}</h2>
    {c['what_body']}
  </div>
</section>

<section style="background:#fff;padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:860px;margin:0 auto;">
    <span class="eyebrow">Recognizing the Signs</span>
    <h2 class="h2-hero">{c['symptoms_heading']}</h2>
    {symptoms}
    <p style="margin-top:1.5rem;color:var(--green-md);font-size:.9rem;font-style:italic;">This list is not exhaustive and not a substitute for a clinical evaluation. Many of these symptoms overlap with other conditions. A proper assessment is the only way to know for sure.</p>
  </div>
</section>

<section style="background:var(--sage-lt);padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:860px;margin:0 auto;">
    <span class="eyebrow">Treatment Approach</span>
    <h2 class="h2-hero">{c['treatment_heading']}</h2>
    {c['treatment_body']}
  </div>
</section>

<section style="background:var(--cream);padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:860px;margin:0 auto;">
    <span class="eyebrow">Serving {city_name}</span>
    <h2 class="h2-hero">{local_heading}</h2>
    <p style="color:var(--green-md);font-size:.95rem;line-height:1.85;">{local_body}</p>
    <div style="margin-top:2rem;background:#fff;border-radius:14px;padding:1.5rem 2rem;border:1px solid var(--border);">
      <p style="margin:0;font-size:.9rem;color:var(--forest);font-weight:600;">Insurance accepted:</p>
      <p style="margin:.5rem 0 0;font-size:.9rem;color:var(--green-md);">Aetna &middot; Medicaid &middot; Medicare &middot; Carelon &middot; Anthem BCBS Virginia &middot; Self-pay welcome</p>
    </div>
  </div>
</section>

<section style="background:#fff;padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:860px;margin:0 auto;">
    <span class="eyebrow">Common Questions</span>
    <h2 class="h2-hero">Frequently Asked Questions</h2>
    {faqs}
  </div>
</section>

<section style="background:var(--forest);padding:80px clamp(1.5rem,5vw,4rem);text-align:center;">
  <p style="color:var(--sage-lt);font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:1rem;">Ready to get started?</p>
  <h2 style="color:#fff;font-family:var(--serif);font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:300;margin:0 0 1.25rem;">{c['cta_label']}</h2>
  <p style="color:rgba(255,255,255,.75);max-width:540px;margin:0 auto 2rem;font-size:.95rem;line-height:1.7;">No referral needed. Most insurance accepted. Secure video visits available to anyone in Virginia.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="btn-primary" style="background:var(--sage-lt);color:var(--forest);">Book Online Now</a>
  <p style="color:rgba(255,255,255,.5);font-size:.8rem;margin-top:1.5rem;">Or call <a href="tel:7037919099" style="color:rgba(255,255,255,.7);text-decoration:none;">(703) 791-9099</a></p>
</section>

{FOOTER}
</body>
</html>"""
    return slug, html


# ── insurance data ────────────────────────────────────────────────────────

INSURANCES = [
    {
        "slug": "aetna-psychiatrist-virginia",
        "insurer": "Aetna",
        "title": "Aetna Psychiatrist Virginia | Alice Tran Psychiatric Care",
        "meta_desc": "Alice Tran Psychiatric Care accepts Aetna insurance for telehealth psychiatric services in Virginia, including ADHD, anxiety, and depression treatment. No referral needed.",
        "tag": "Accepted Insurance",
        "h1_l1": "Alice Tran Psychiatric Care",
        "h1_l2": "Accepts Aetna Insurance",
        "hero_p": "If you have Aetna insurance and need psychiatric care in Virginia, Alice Tran Psychiatric Care is in-network. Telehealth appointments are available for ADHD evaluation, anxiety treatment, depression management, and medication management.",
        "about_heading": "Using Your Aetna Benefits for Psychiatric Care",
        "about_body": """<p>Aetna is one of the largest health insurance providers in the United States, and many Aetna plans include mental health and substance use disorder benefits under parity with medical and surgical benefits. This means that if you have Aetna insurance, your psychiatric care may be covered at the same level as a visit to your primary care doctor.</p>
    <p>Alice Tran Psychiatric Care is in-network with Aetna, which means you pay in-network cost-sharing rates (your copay or coinsurance after your deductible) rather than out-of-network rates. Your exact out-of-pocket cost depends on your specific Aetna plan, your deductible status, and your copay or coinsurance amount.</p>
    <p>Before your first appointment, we recommend calling the member services number on the back of your Aetna card to confirm your mental health benefits, verify that telehealth psychiatric services are covered, and find out what your copay or coinsurance will be.</p>""",
        "services_heading": "Psychiatric Services Covered Through Aetna",
        "services": [
            "New patient psychiatric evaluation (90-minute initial visit)",
            "ADHD evaluation and diagnosis",
            "Medication management follow-up visits",
            "Anxiety and depression treatment",
            "Insomnia medication management",
            "Telehealth video visits (HIPAA-compliant)",
        ],
        "faqs": [
            ("Does Aetna cover telehealth psychiatric visits?",
             "Most Aetna plans cover telehealth mental health visits, including telehealth psychiatric appointments. Coverage details depend on your specific plan. Contact Aetna member services at the number on your insurance card to confirm telehealth mental health benefits for your plan."),
            ("What is my copay for a psychiatric visit with Aetna?",
             "Copay amounts vary by plan. Many Aetna members pay a specialist copay of $30 to $60 per visit after their deductible is met. Call the number on your Aetna card and ask for your in-network mental health specialist copay to get an accurate number for your specific plan."),
            ("Do I need a referral from my primary care doctor to see Alice?",
             "Most Aetna plans do not require a referral for in-network mental health specialists, but this can vary by plan type. Check your Summary of Benefits or call Aetna to confirm whether a referral is required under your plan before scheduling."),
            ("How do I know what my Aetna deductible is?",
             "You can find your deductible information by logging into your Aetna member portal at aetna.com, calling member services at the number on the back of your card, or reviewing your Summary of Benefits and Coverage (SBC) document."),
            ("What if Aetna denies my claim?",
             "Insurance claim denials can sometimes be appealed successfully. If Aetna denies a claim, you have the right to file an internal appeal and, if that is unsuccessful, an external review. Our administrative team can provide documentation to support your appeal if needed."),
        ],
    },
    {
        "slug": "medicaid-psychiatrist-virginia",
        "insurer": "Medicaid (Virginia)",
        "title": "Medicaid Psychiatrist Virginia | Alice Tran Psychiatric Care",
        "meta_desc": "Alice Tran Psychiatric Care accepts Virginia Medicaid for telehealth psychiatric care, including ADHD treatment, anxiety, depression, and medication management across Northern Virginia.",
        "tag": "Accepted Insurance",
        "h1_l1": "Alice Tran Psychiatric Care",
        "h1_l2": "Accepts Virginia Medicaid",
        "hero_p": "If you are covered by Virginia Medicaid, Alice Tran Psychiatric Care can see you for telehealth psychiatric care. Accepting Medicaid is part of Alice's commitment to making mental health care accessible to everyone in the communities she serves.",
        "about_heading": "Virginia Medicaid and Mental Health Coverage",
        "about_body": """<p>Virginia Medicaid (also called Medallion 4.0 for managed care enrollees) covers a broad range of mental health services, including psychiatric evaluation, medication management, and ongoing follow-up care. Coverage for telehealth mental health visits was significantly expanded in recent years, making it easier than ever to access psychiatric care from home.</p>
    <p>Alice Tran Psychiatric Care is enrolled with Virginia Medicaid. This means that if you have Medicaid through the Commonwealth of Virginia, you can be seen for psychiatric services with little to no out-of-pocket cost, depending on your specific plan and eligibility category.</p>
    <p>If you are unsure whether your specific Medicaid plan covers telehealth psychiatric services, you can call the member services number on your Medicaid card or contact the Virginia Department of Medical Assistance Services (DMAS) for guidance.</p>""",
        "services_heading": "Services Available to Medicaid Members",
        "services": [
            "Initial psychiatric evaluation for ADHD, anxiety, depression, and other conditions",
            "Ongoing medication management and follow-up visits",
            "Telehealth video appointments from anywhere in Virginia",
            "Coordination with other providers when needed",
            "Referrals to therapy and other community resources",
        ],
        "faqs": [
            ("Does Virginia Medicaid cover telehealth psychiatric appointments?",
             "Yes. Virginia Medicaid expanded telehealth coverage for mental health and psychiatric services. Most Medicaid enrollees in Virginia can access telehealth psychiatric visits covered under their plan. Confirm with your specific managed care organization (MCO) if you have questions about your plan."),
            ("Do I need a referral to see a psychiatric provider with Medicaid?",
             "Referral requirements vary by Medicaid managed care organization. Some Medallion 4.0 plans do not require a referral for mental health specialty visits; others do. Check with your specific MCO to confirm before scheduling."),
            ("What is my cost-sharing for Medicaid psychiatric visits?",
             "Most Virginia Medicaid enrollees pay little to no out-of-pocket cost for covered mental health services. Some categories of enrollees may have a small copay. Your specific cost-sharing depends on your eligibility category and managed care plan."),
            ("How do I check if Alice is in my Medicaid network?",
             "You can verify network participation by calling the member services number on your Medicaid card or searching your managed care organization's provider directory online. You are also welcome to call our office at (703) 791-9099 to confirm."),
            ("What should I bring to my first appointment?",
             "For your first telehealth visit, please have your Medicaid card information available, a list of any current medications, and a private, quiet space with a reliable internet connection. You will receive intake forms via email to complete before your appointment."),
        ],
    },
    {
        "slug": "medicare-psychiatrist-virginia",
        "insurer": "Medicare",
        "title": "Medicare Psychiatrist Virginia | Alice Tran Psychiatric Care",
        "meta_desc": "Alice Tran, PMHNP-BC, accepts Medicare for telehealth psychiatric care in Virginia. Adult ADHD, anxiety, depression, and medication management. No referral needed.",
        "tag": "Accepted Insurance",
        "h1_l1": "Alice Tran Psychiatric Care",
        "h1_l2": "Accepts Medicare",
        "hero_p": "Alice Tran Psychiatric Care accepts Medicare for telehealth psychiatric services in Virginia. Whether you are seeking evaluation for anxiety, depression, or medication management for a psychiatric condition, care is accessible from the comfort of your home.",
        "about_heading": "Medicare Coverage for Psychiatric Care",
        "about_body": """<p>Medicare Part B covers outpatient mental health services, including psychiatric evaluations and medication management visits provided by a psychiatric nurse practitioner. Coverage for telehealth mental health visits has expanded significantly in recent years, and Medicare beneficiaries can now receive psychiatric care via video from their home.</p>
    <p>As a Medicare-enrolled provider, Alice Tran Psychiatric Care bills Medicare directly for covered services. After Medicare pays its portion, you are responsible for your Part B coinsurance (typically 20% after your deductible) unless you have a supplemental Medigap policy that covers the remainder.</p>
    <p>If you have a Medicare Advantage plan rather than Original Medicare, benefits and network participation may differ. Please contact your Medicare Advantage plan to confirm that Alice Tran Psychiatric Care is in-network and that telehealth psychiatric services are covered under your plan.</p>""",
        "services_heading": "Medicare-Covered Psychiatric Services",
        "services": [
            "Initial psychiatric evaluation (90-minute new patient visit)",
            "Follow-up medication management visits",
            "Telehealth video visits from your home in Virginia",
            "Evaluation and treatment of anxiety, depression, and other psychiatric conditions",
            "Coordination with primary care and other treating providers",
        ],
        "faqs": [
            ("Does Medicare cover telehealth psychiatric visits?",
             "Yes. Medicare Part B covers outpatient mental health services provided via telehealth, including psychiatric appointments with a qualified nurse practitioner. Telehealth mental health coverage has been significantly expanded and is available to Medicare beneficiaries receiving care from their home."),
            ("What is my cost-sharing for Medicare psychiatric visits?",
             "Under Original Medicare Part B, you typically pay 20% coinsurance after your Part B deductible is met. If you have a Medigap supplemental policy, it may cover some or all of that coinsurance. Medicare Advantage plan cost-sharing varies by plan."),
            ("Does Medicare require a referral for psychiatric care?",
             "Original Medicare does not require a referral to see a psychiatric nurse practitioner for outpatient mental health care. Medicare Advantage plans may have different requirements. Check your plan documents or call the number on your card to confirm."),
            ("I have Medicare Advantage. Am I covered?",
             "Medicare Advantage coverage depends on your specific plan and whether Alice Tran Psychiatric Care is in your plan's network. Please call the member services number on your Medicare Advantage card to confirm in-network status and telehealth benefits before scheduling."),
            ("What psychiatric conditions does Alice treat for Medicare patients?",
             "Alice evaluates and treats anxiety, depression, insomnia, ADHD, and other adult psychiatric conditions. She prescribes and manages psychiatric medications and provides referrals to therapy when appropriate."),
        ],
    },
    {
        "slug": "carelon-psychiatrist-virginia",
        "insurer": "Carelon Behavioral Health",
        "title": "Carelon Behavioral Health Psychiatrist Virginia | Alice Tran Psychiatric Care",
        "meta_desc": "Alice Tran Psychiatric Care accepts Carelon Behavioral Health for telehealth psychiatric services in Virginia. ADHD, anxiety, depression, and medication management. No referral needed.",
        "tag": "Accepted Insurance",
        "h1_l1": "Alice Tran Psychiatric Care",
        "h1_l2": "Accepts Carelon Behavioral Health",
        "hero_p": "Alice Tran Psychiatric Care is in-network with Carelon Behavioral Health for telehealth psychiatric services in Virginia. If your mental health benefits are managed through Carelon, you can access ADHD evaluation, anxiety treatment, depression care, and medication management covered under your plan.",
        "about_heading": "Carelon Behavioral Health and Psychiatric Coverage",
        "about_body": """<p>Carelon Behavioral Health (formerly known as Beacon Health Options) is a managed behavioral health organization that administers mental health and substance use disorder benefits for many employer-sponsored health plans and government programs. If your health insurance plan uses Carelon to manage behavioral health benefits, your mental health care is billed through Carelon rather than directly through your medical insurer.</p>
    <p>Alice Tran Psychiatric Care is in-network with Carelon Behavioral Health. This means that if your plan's behavioral health benefits are managed by Carelon and Alice is in your specific network, you pay in-network cost-sharing rates for covered psychiatric services.</p>
    <p>To confirm coverage, call the member services number on your Carelon card or check your Explanation of Benefits (EOB) from a recent mental health claim to see if Carelon is listed as the behavioral health administrator.</p>""",
        "services_heading": "Psychiatric Services Covered Through Carelon",
        "services": [
            "New patient psychiatric evaluation",
            "ADHD assessment and medication management",
            "Anxiety and depression evaluation and treatment",
            "Ongoing follow-up medication management visits",
            "Telehealth video visits from anywhere in Virginia",
        ],
        "faqs": [
            ("How do I know if my mental health benefits are managed by Carelon?",
             "Look at your insurance card. If it says 'Behavioral Health: Carelon' or 'Mental Health: Beacon Health Options,' your behavioral health benefits are administered by Carelon. You can also call your medical insurer's member services line and ask which company manages your mental health benefits."),
            ("Does Carelon require prior authorization for psychiatric visits?",
             "Carelon's prior authorization requirements vary by plan and service type. Initial evaluations may not require prior auth, but ongoing treatment sometimes does. Our administrative team will handle prior authorization requests when required by your plan."),
            ("What is my copay for a Carelon psychiatric visit?",
             "Copay amounts depend on your specific plan. Call the number on your Carelon card and ask for your in-network mental health specialist copay to get an accurate figure for your plan."),
            ("Do I need a referral to see Alice through my Carelon plan?",
             "Referral requirements depend on your specific plan. Many Carelon plans allow direct access to in-network behavioral health providers without a primary care referral. Check your plan documents or call Carelon to confirm."),
            ("Can I use Carelon for telehealth psychiatric appointments?",
             "Yes. Carelon-administered plans generally cover telehealth mental health visits. Confirm telehealth mental health coverage with Carelon member services before scheduling if you want to verify your specific benefit."),
        ],
    },
    {
        "slug": "anthem-bcbs-psychiatrist-virginia",
        "insurer": "Anthem BCBS Virginia",
        "title": "Anthem BCBS Virginia Psychiatrist | Alice Tran Psychiatric Care",
        "meta_desc": "Alice Tran Psychiatric Care accepts Anthem Blue Cross Blue Shield of Virginia for telehealth psychiatric care. ADHD, anxiety, depression, and medication management. No referral needed.",
        "tag": "Accepted Insurance",
        "h1_l1": "Alice Tran Psychiatric Care",
        "h1_l2": "Accepts Anthem BCBS Virginia",
        "hero_p": "If you have Anthem Blue Cross Blue Shield of Virginia, Alice Tran Psychiatric Care is in-network for telehealth psychiatric services. Whether you need an ADHD evaluation, anxiety treatment, or ongoing medication management, your Anthem plan may cover a significant portion of the cost.",
        "about_heading": "Using Anthem BCBS Virginia for Psychiatric Care",
        "about_body": """<p>Anthem Blue Cross Blue Shield of Virginia is one of the state's largest health insurers. Most Anthem BCBS plans include mental health benefits that cover outpatient psychiatric services, including telehealth visits, under parity with medical and surgical benefits.</p>
    <p>Alice Tran Psychiatric Care is in-network with Anthem BCBS Virginia, which means you pay in-network cost-sharing rates rather than out-of-network rates. Your specific out-of-pocket costs depend on your plan's deductible, copay, or coinsurance structure.</p>
    <p>Before your first appointment, call the member services number on the back of your Anthem card to confirm mental health telehealth benefits, verify your deductible status, and ask about your specialist copay or coinsurance for outpatient psychiatric visits.</p>""",
        "services_heading": "Psychiatric Services Covered Through Anthem BCBS Virginia",
        "services": [
            "Initial psychiatric evaluation (new patient 90-minute visit)",
            "ADHD assessment and medication management",
            "Anxiety and depression treatment",
            "Insomnia medication management",
            "Follow-up medication management visits",
            "Telehealth video visits from your home in Virginia",
        ],
        "faqs": [
            ("Does Anthem BCBS Virginia cover telehealth psychiatric visits?",
             "Most Anthem BCBS Virginia plans cover telehealth mental health visits. Coverage details depend on your specific plan year and benefit structure. Call the mental health services line on your Anthem card to confirm telehealth psychiatric coverage for your specific plan."),
            ("Do I need a referral to see Alice through Anthem BCBS Virginia?",
             "Most Anthem PPO plans do not require a referral for in-network mental health specialists. HMO plans may require one. Check your Summary of Benefits or call the number on your card to confirm referral requirements for your plan type."),
            ("What is my copay for an Anthem BCBS psychiatric visit?",
             "Specialist copays for Anthem BCBS Virginia plans typically range from $30 to $75, but this varies widely. Call the member services number on your card and ask specifically about your outpatient mental health specialist copay to get an accurate amount for your plan."),
            ("What if I have an Anthem HealthKeepers plan?",
             "HealthKeepers is Anthem's Medicaid managed care plan in Virginia. If you have HealthKeepers through Virginia Medicaid, your mental health benefits follow Medicaid rules. Call HealthKeepers member services to confirm network participation and any prior authorization requirements."),
            ("How do I verify that Alice is in my Anthem BCBS Virginia network?",
             "You can search the Anthem provider directory at anthem.com or call the member services number on your insurance card. You are also welcome to contact our office at (703) 791-9099 to verify your specific plan."),
        ],
    },
]

# ── page builder: insurance ───────────────────────────────────────────────

def build_insurance_page(ins):
    canonical = f"https://alicetrannp.com/pages/{ins['slug']}.html"
    services_html = "".join(
        f'<li style="padding:.35rem 0;color:var(--green-md);font-size:.93rem;">{s}</li>'
        for s in ins["services"]
    )
    services_html = f'<ul style="list-style:none;padding:0;margin:0;">{services_html}</ul>'
    faqs = faq_html(ins["faqs"])

    schema = f"""{{
    "@context": "https://schema.org",
    "@type": "MedicalBusiness",
    "name": "Alice Tran Psychiatric Care",
    "url": "https://alicetrannp.com",
    "telephone": "+17037919099",
    "email": "info@alicetrannp.com",
    "areaServed": "Virginia",
    "description": "{ins['meta_desc']}"
  }}"""

    html = f"""<!DOCTYPE html>
<html lang="en">
<head>
{GTAG}
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>{ins['title']}</title>
  <meta name="description" content="{ins['meta_desc']}" />
  <link rel="canonical" href="{canonical}" />
  <link rel="preload" href="../css/fonts.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="../css/fonts.css"></noscript>
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="icon" href="../img/logo.png" type="image/png" />
  <meta property="og:type" content="website" />
  <meta property="og:title" content="{ins['title']}" />
  <meta property="og:description" content="{ins['meta_desc']}" />
  <meta property="og:url" content="{canonical}" />
  <meta property="og:image" content="https://alicetrannp.com/img/preview.jpg" />
  <script type="application/ld+json">
  {schema}
  </script>
</head>
<body>
{TOPBAR}

{NAV}

<div class="page-hero">
  <div class="section-tag">{ins['tag']}</div>
  <h1>{ins['h1_l1']}<br><span style="font-style:italic;font-weight:300;">{ins['h1_l2']}</span></h1>
  <p>{ins['hero_p']}</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="btn-primary" style="margin-top:1.5rem;display:inline-block;">Book Now</a>
</div>

<section style="background:var(--cream);padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:860px;margin:0 auto;">
    <span class="eyebrow">Insurance Information</span>
    <h2 class="h2-hero">{ins['about_heading']}</h2>
    {ins['about_body']}
  </div>
</section>

<section style="background:#fff;padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:860px;margin:0 auto;">
    <span class="eyebrow">What Is Covered</span>
    <h2 class="h2-hero">{ins['services_heading']}</h2>
    {services_html}
    <div style="margin-top:2rem;background:var(--sage-lt);border-radius:14px;padding:1.5rem 2rem;">
      <p style="margin:0;font-size:.9rem;color:var(--forest);line-height:1.8;">
        <strong>Note:</strong> Coverage for specific services depends on your plan and benefit year. Always confirm your benefits with your insurer before your first appointment. Alice Tran Psychiatric Care will verify your insurance and provide a cost estimate before your visit.
      </p>
    </div>
  </div>
</section>

<section style="background:var(--sage-lt);padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:860px;margin:0 auto;">
    <span class="eyebrow">Common Questions</span>
    <h2 class="h2-hero">Frequently Asked Questions</h2>
    {faqs}
  </div>
</section>

<section style="background:var(--cream);padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:860px;margin:0 auto;display:grid;grid-template-columns:1fr 1fr;gap:2rem;">
    <div style="background:#fff;border-radius:14px;padding:2rem;border:1px solid var(--border);">
      <p style="font-weight:700;color:var(--forest);margin:0 0 .5rem;">Phone</p>
      <a href="tel:7037919099" style="color:var(--green);font-size:1rem;">(703) 791-9099</a>
    </div>
    <div style="background:#fff;border-radius:14px;padding:2rem;border:1px solid var(--border);">
      <p style="font-weight:700;color:var(--forest);margin:0 0 .5rem;">Book Online</p>
      <a href="https://alicetran.intakeq.com/booking" target="_blank" style="color:var(--green);font-size:1rem;">Schedule a visit</a>
    </div>
  </div>
</section>

<section style="background:var(--forest);padding:80px clamp(1.5rem,5vw,4rem);text-align:center;">
  <p style="color:var(--sage-lt);font-size:.8rem;letter-spacing:.12em;text-transform:uppercase;margin-bottom:1rem;">Ready to get started?</p>
  <h2 style="color:#fff;font-family:var(--serif);font-size:clamp(1.8rem,3.5vw,2.6rem);font-weight:300;margin:0 0 1.25rem;">Schedule Your First Appointment</h2>
  <p style="color:rgba(255,255,255,.75);max-width:540px;margin:0 auto 2rem;font-size:.95rem;line-height:1.7;">No referral needed. We accept {ins['insurer']} and most major insurance plans. Secure video visits available across Virginia.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="btn-primary" style="background:var(--sage-lt);color:var(--forest);">Book Online Now</a>
  <p style="color:rgba(255,255,255,.5);font-size:.8rem;margin-top:1.5rem;">Or call <a href="tel:7037919099" style="color:rgba(255,255,255,.7);text-decoration:none;">(703) 791-9099</a></p>
</section>

{FOOTER}
</body>
</html>"""
    return ins["slug"], html


# ── generate all pages ────────────────────────────────────────────────────

created = []

for cond_key, city_key in COMBOS:
    slug, html = build_condition_city_page(cond_key, city_key)
    path = os.path.join(BASE, f"{slug}.html")
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    created.append(slug)
    print(f"  created: pages/{slug}.html")

for ins in INSURANCES:
    slug, html = build_insurance_page(ins)
    path = os.path.join(BASE, f"{slug}.html")
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    created.append(slug)
    print(f"  created: pages/{slug}.html")

print(f"\nDone. {len(created)} pages generated.")
