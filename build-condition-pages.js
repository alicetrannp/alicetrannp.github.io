// build-condition-pages.js — high-intent condition/service landing pages
const fs = require('fs');

const NAV = `<nav>
  <a href="../index.html" class="nav-logo"><img src="../img/logo.png" alt="" width="28" height="28" style="border-radius:50%;vertical-align:middle;margin-right:8px;">Alice Tran Psychiatric Care</a>
  <div class="nav-links">
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="rates.html">Rates &amp; Insurance</a>
    <a href="conditions.html">Conditions</a>
    <a href="blog/index.html">Blog</a>
    <a href="contact.html">Contact</a>
    <div style="display:flex;align-items:center;gap:0.5rem;flex-shrink:0;">
      <a href="https://doxy.me/alicetran" target="_blank" class="nav-visit">Join Visit</a>
      <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta">Book Now</a>
    </div>
  </div>
  <button class="nav-toggle" onclick="toggleMenu()" aria-label="Menu"><span></span><span></span><span></span></button>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="about.html">About</a><a href="services.html">Services</a><a href="rates.html">Rates &amp; Insurance</a>
  <a href="conditions.html">Conditions</a><a href="blog/index.html">Blog</a><a href="contact.html">Contact</a>
  <a href="https://doxy.me/alicetran" target="_blank">Join Visit</a>
  <a href="https://alicetran.intakeq.com/booking" target="_blank">Book Now</a>
</div>`;

const FOOTER = `<section class="cta-band"><h2 class="section-title">The first step is usually the hardest.</h2><a href="https://alicetran.intakeq.com/booking" target="_blank" class="btn btn-light">Book an Appointment</a><p>No referral needed. Accepting new patients across Virginia.</p></section>
<footer><div class="footer-grid"><div><div class="footer-brand">Alice Tran Psychiatric Care</div><p class="footer-tagline">Telehealth psychiatric care across Virginia.<br>English &amp; Ti&#7871;ng Vi&#7879;t welcome.</p><br><h4>Contact</h4><a href="tel:7038295227">Phone: (703) 829-5227</a><a href="mailto:info@alicetrannp.com">Email: info@alicetrannp.com</a></div><div><h4>Pages</h4><a href="about.html">About</a><a href="services.html">Services</a><a href="rates.html">Rates &amp; Insurance</a><a href="conditions.html">Conditions</a><a href="blog/index.html">Blog</a><a href="contact.html">Contact</a></div><div><h4>Hours</h4><p style="line-height:2.2;"><b>Mon &ndash; Thu</b> 9am &ndash; 4pm<br><b>Fri &ndash; Sun</b> Closed</p></div></div><div class="footer-copy">&copy; 2026 Alice Tran Psychiatric Care LLC. All rights reserved. &middot; <a href="privacy.html">Privacy</a> &middot; <a href="terms.html">Terms</a> &middot; <a href="disclaimer.html">Disclaimer</a></div></footer>
<script>function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open');}</script>`;

function head(slug, title, desc) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Alice Tran PMHNP</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="https://alicetrannp.com/pages/${slug}.html" />
  <link rel="preload" href="../css/fonts.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="../css/fonts.css"></noscript>
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="icon" href="../img/logo.png" type="image/png" />
</head>
<body>`;
}

const CTA = (msg) => `<div style="background:var(--sage-lt);border-left:4px solid var(--sage-dk);border-radius:0 16px 16px 0;padding:1.5rem 2rem;margin:2rem 0;">
      <p style="margin:0;font-size:.95rem;color:var(--forest);">${msg} <a href="https://alicetran.intakeq.com/booking" target="_blank" style="color:var(--green);font-weight:600;">Book now</a> or call (703) 829-5227.</p>
    </div>`;

const SEE = (links) => `<p style="font-size:.85rem;color:var(--green-lt);border-top:1px solid var(--border);padding-top:1rem;margin-top:2rem;">See also: ${links}</p>`;

const link = (href, text) => `<a href="${href}" style="color:var(--green);">${text}</a>`;

// ── PAGES ────────────────────────────────────────────────────────────────────

const pages = [

  // 1. ADHD Evaluation
  {
    slug: 'adhd-evaluation-virginia',
    title: 'ADHD Evaluation and Treatment for Adults in Virginia',
    desc: 'Looking for an ADHD evaluation in Virginia? Alice Tran, PMHNP-BC, provides comprehensive adult ADHD assessments, diagnosis, and medication management via telehealth. No referral needed.',
    body: `
<div class="page-hero">
  <div class="section-tag">ADHD</div>
  <h1>ADHD Evaluation and Treatment<br>for Adults in Virginia</h1>
  <p>Comprehensive ADHD assessments, diagnosis, and medication management via telehealth. Serving adults across Virginia. No referral needed.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="btn btn-primary-inner" style="margin-top:1.5rem;display:inline-block;">Book a Consultation</a>
</div>
<section style="background:var(--cream);padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:800px;margin:0 auto;">
    <h2 style="font-family:var(--serif);font-size:1.8rem;color:var(--forest);margin-bottom:1rem;">Do You Think You Might Have ADHD?</h2>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Many adults with ADHD spent years wondering why certain things felt harder for them than for others. Difficulty finishing projects, losing track of time, struggling to focus on tasks that do not feel immediately rewarding, impulsive decisions, emotional dysregulation. If this sounds familiar, you are not lazy or unmotivated. ADHD is a real, treatable neurological condition.</p>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Alice Tran, PMHNP-BC, provides comprehensive ADHD evaluations and medication management for adults across Virginia via telehealth. No referral required.</p>

    <h2 style="font-family:var(--serif);font-size:1.5rem;color:var(--forest);margin:2rem 0 .75rem;">What an ADHD Evaluation Includes</h2>
    <ul style="color:var(--green-md);line-height:2;font-size:1rem;padding-left:1.5rem;">
      <li>A thorough clinical interview covering your history, symptoms, and daily functioning</li>
      <li>Standardized ADHD rating scales and symptom questionnaires</li>
      <li>Review of how symptoms affect work, relationships, and daily life</li>
      <li>Ruling out other conditions that can look like ADHD, including anxiety, depression, and sleep disorders</li>
      <li>A diagnosis and personalized treatment plan</li>
    </ul>

    <h2 style="font-family:var(--serif);font-size:1.5rem;color:var(--forest);margin:2rem 0 .75rem;">ADHD Treatment Options</h2>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Treatment is tailored to your needs and may include stimulant medications (such as Adderall or Ritalin), non-stimulant alternatives (such as Strattera or Wellbutrin), or a combination of medication and behavioral strategies. All options are discussed openly and collaboratively.</p>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Read more: ${link('blog/adhd-adults-virginia.html', 'ADHD in Adults: Signs, Diagnosis, and Treatment in Virginia')}.</p>

    <h2 style="font-family:var(--serif);font-size:1.5rem;color:var(--forest);margin:2rem 0 .75rem;">Telehealth ADHD Care Across Virginia</h2>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Alice sees adults with ADHD across Northern Virginia, Richmond, Hampton Roads, Charlottesville, Roanoke, and all of Virginia via telehealth. Appointments are available Monday through Thursday.</p>
    ${CTA('Ready to get evaluated? Telehealth appointments available across Virginia.')}
    ${SEE(`${link('condition-adhd.html','ADHD condition page')} &middot; ${link('services.html','Services')} &middot; ${link('medication-management-fairfax-va.html','Medication management Fairfax')} &middot; ${link('blog/adhd-adults-virginia.html','ADHD blog')} &middot; ${link('faq.html','FAQ')}`)}
  </div>
</section>`
  },

  // 2. Anxiety Treatment
  {
    slug: 'anxiety-treatment-virginia',
    title: 'Anxiety Treatment for Adults in Virginia',
    desc: 'Anxiety treatment via telehealth across Virginia. Alice Tran, PMHNP-BC, provides psychiatric evaluations, anxiety diagnosis, and medication management for adults. No referral needed.',
    body: `
<div class="page-hero">
  <div class="section-tag">Anxiety</div>
  <h1>Anxiety Treatment for Adults in Virginia</h1>
  <p>Psychiatric evaluations, diagnosis, and medication management for anxiety disorders. Telehealth across Virginia. No referral needed.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="btn btn-primary-inner" style="margin-top:1.5rem;display:inline-block;">Book a Consultation</a>
</div>
<section style="background:var(--cream);padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:800px;margin:0 auto;">
    <h2 style="font-family:var(--serif);font-size:1.8rem;color:var(--forest);margin-bottom:1rem;">When Anxiety Goes Beyond Everyday Stress</h2>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Everyone feels anxious sometimes. But when worry becomes persistent, hard to control, and starts affecting your work, relationships, or quality of life, it deserves clinical attention. Anxiety disorders are among the most common mental health conditions in adults and they are highly treatable.</p>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Alice Tran, PMHNP-BC, provides anxiety evaluations and medication management for adults across Virginia via telehealth. No referral required.</p>

    <h2 style="font-family:var(--serif);font-size:1.5rem;color:var(--forest);margin:2rem 0 .75rem;">Types of Anxiety We Treat</h2>
    <ul style="color:var(--green-md);line-height:2;font-size:1rem;padding-left:1.5rem;">
      <li>Generalized anxiety disorder (GAD)</li>
      <li>${link('condition-panic.html','Panic disorder')} and panic attacks</li>
      <li>Social anxiety disorder</li>
      <li>Health anxiety</li>
      <li>Anxiety related to life transitions, work stress, or cultural pressures</li>
      <li>Anxiety alongside depression, ADHD, or trauma</li>
    </ul>

    <h2 style="font-family:var(--serif);font-size:1.5rem;color:var(--forest);margin:2rem 0 .75rem;">Anxiety Treatment Options</h2>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Treatment may include SSRIs or SNRIs (first-line medications for anxiety that are non-habit-forming), buspirone, or other non-benzodiazepine approaches. Read: ${link('blog/anxiety-when-to-see-a-psychiatrist.html','when anxiety needs professional support')} and ${link('blog/benzodiazepines-what-you-should-know.html','what to know about benzodiazepines')}.</p>
    ${CTA('Serving adults across Virginia via telehealth.')}
    ${SEE(`${link('condition-anxiety.html','Anxiety condition page')} &middot; ${link('condition-panic.html','Panic disorder')} &middot; ${link('blog/anxiety-when-to-see-a-psychiatrist.html','Anxiety blog')} &middot; ${link('faq.html','FAQ')}`)}
  </div>
</section>`
  },

  // 3. Depression Treatment
  {
    slug: 'depression-treatment-virginia',
    title: 'Depression Treatment for Adults in Virginia',
    desc: 'Depression treatment via telehealth across Virginia. Alice Tran, PMHNP-BC, provides psychiatric evaluations, depression diagnosis, and medication management. No referral needed.',
    body: `
<div class="page-hero">
  <div class="section-tag">Depression</div>
  <h1>Depression Treatment for Adults in Virginia</h1>
  <p>Psychiatric evaluations, diagnosis, and medication management for depression. Telehealth across Virginia. No referral needed.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="btn btn-primary-inner" style="margin-top:1.5rem;display:inline-block;">Book a Consultation</a>
</div>
<section style="background:var(--cream);padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:800px;margin:0 auto;">
    <h2 style="font-family:var(--serif);font-size:1.8rem;color:var(--forest);margin-bottom:1rem;">Depression Is More Than Sadness</h2>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Clinical depression affects how you think, feel, and function. It is not a character flaw or something you can simply push through. It is a medical condition with biological, psychological, and social dimensions, and it responds well to the right treatment.</p>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Alice Tran, PMHNP-BC, provides comprehensive depression evaluations and medication management for adults across Virginia via telehealth. No referral required.</p>

    <h2 style="font-family:var(--serif);font-size:1.5rem;color:var(--forest);margin:2rem 0 .75rem;">What We Evaluate</h2>
    <ul style="color:var(--green-md);line-height:2;font-size:1rem;padding-left:1.5rem;">
      <li>Major depressive disorder (MDD)</li>
      <li>Persistent depressive disorder (dysthymia)</li>
      <li>Depression alongside anxiety, trauma, or burnout</li>
      <li>${link('condition-postpartum.html','Postpartum depression')} and perinatal mood disorders</li>
      <li>Depression related to grief, life transitions, or cultural stress</li>
      <li>Ruling out bipolar disorder when the history suggests mood cycling</li>
    </ul>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Read more: ${link('blog/depression-vs-bipolar-disorder.html','Depression vs. Bipolar Disorder')} and ${link('blog/burnout-vs-depression.html','Burnout vs. Depression')}.</p>

    <h2 style="font-family:var(--serif);font-size:1.5rem;color:var(--forest);margin:2rem 0 .75rem;">Depression Treatment Options</h2>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Treatment is tailored to you and may include antidepressant medication (SSRIs or SNRIs), lifestyle recommendations, and coordination with a therapist if therapy is part of your plan. Read our article: ${link('blog/medication-vs-therapy.html','medication vs. therapy')}.</p>
    ${CTA('You do not have to wait until things are at a breaking point.')}
    ${SEE(`${link('condition-depression.html','Depression condition page')} &middot; ${link('condition-postpartum.html','Postpartum depression')} &middot; ${link('blog/depression-vs-bipolar-disorder.html','Depression vs. bipolar')} &middot; ${link('faq.html','FAQ')}`)}
  </div>
</section>`
  },

  // 4. PTSD Treatment
  {
    slug: 'ptsd-treatment-virginia',
    title: 'PTSD and Trauma Treatment for Adults in Virginia',
    desc: 'Trauma-informed psychiatric care across Virginia. Alice Tran, PMHNP-BC, provides PTSD evaluations and medication management for adults via telehealth. No referral needed.',
    body: `
<div class="page-hero">
  <div class="section-tag">Trauma and PTSD</div>
  <h1>PTSD and Trauma Treatment for Adults in Virginia</h1>
  <p>Trauma-informed psychiatric evaluations and medication management. Telehealth across Virginia. No referral needed.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="btn btn-primary-inner" style="margin-top:1.5rem;display:inline-block;">Book a Consultation</a>
</div>
<section style="background:var(--cream);padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:800px;margin:0 auto;">
    <h2 style="font-family:var(--serif);font-size:1.8rem;color:var(--forest);margin-bottom:1rem;">Trauma-Informed Care That Sees the Whole Person</h2>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Trauma changes how the nervous system responds to the world. PTSD, complex trauma, and trauma-related anxiety are not signs of weakness. They are signs that your mind and body are trying to protect you from something that hurt you. With the right support, the nervous system can heal.</p>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Alice Tran, PMHNP-BC, provides trauma-informed psychiatric evaluations and medication management for adults across Virginia via telehealth. Care is provided in a nonjudgmental, culturally sensitive environment where your story is welcome.</p>

    <h2 style="font-family:var(--serif);font-size:1.5rem;color:var(--forest);margin:2rem 0 .75rem;">What We Address</h2>
    <ul style="color:var(--green-md);line-height:2;font-size:1rem;padding-left:1.5rem;">
      <li>Post-traumatic stress disorder (PTSD)</li>
      <li>Complex trauma and childhood adversity</li>
      <li>Military trauma and veteran mental health</li>
      <li>Medical trauma</li>
      <li>Trauma related to abuse, assault, or loss</li>
      <li>Trauma-related depression, anxiety, and dissociation</li>
    </ul>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Read more: ${link('blog/ptsd-vs-anxiety-whats-the-difference.html','PTSD vs. Anxiety: What Is the Difference?')}</p>
    ${CTA('You do not have to explain everything perfectly. You just have to show up.')}
    ${SEE(`${link('condition-trauma-ptsd.html','Trauma and PTSD condition page')} &middot; ${link('blog/ptsd-vs-anxiety-whats-the-difference.html','PTSD vs. anxiety')} &middot; ${link('condition-anxiety.html','Anxiety care')} &middot; ${link('faq.html','FAQ')}`)}
  </div>
</section>`
  },

  // 5. Medication Management Virginia
  {
    slug: 'medication-management-virginia',
    title: 'Medication Management for Mental Health in Virginia',
    desc: 'Psychiatric medication management across Virginia via telehealth. Alice Tran, PMHNP-BC, provides ongoing medication oversight for anxiety, depression, ADHD, and more. No referral needed.',
    body: `
<div class="page-hero">
  <div class="section-tag">Medication Management</div>
  <h1>Medication Management for Mental Health in Virginia</h1>
  <p>Ongoing psychiatric medication management via telehealth across Virginia. Thoughtful, personalized care. No referral needed.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="btn btn-primary-inner" style="margin-top:1.5rem;display:inline-block;">Book a Consultation</a>
</div>
<section style="background:var(--cream);padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:800px;margin:0 auto;">
    <h2 style="font-family:var(--serif);font-size:1.8rem;color:var(--forest);margin-bottom:1rem;">What Is Medication Management?</h2>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Medication management is more than getting a prescription refilled. It is an ongoing, collaborative process of evaluating how your medication is working, adjusting doses when needed, monitoring for side effects, and making sure the treatment plan continues to fit your life and goals.</p>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Alice Tran, PMHNP-BC, provides medication management for anxiety, depression, ADHD, bipolar disorder, PTSD, insomnia, and other conditions for adults across Virginia via telehealth. Read our full guide: ${link('blog/what-is-medication-management.html','What Is Medication Management in Psychiatry?')}</p>

    <h2 style="font-family:var(--serif);font-size:1.5rem;color:var(--forest);margin:2rem 0 .75rem;">Conditions We Manage Medication For</h2>
    <ul style="color:var(--green-md);line-height:2;font-size:1rem;padding-left:1.5rem;">
      <li>${link('condition-anxiety.html','Anxiety disorders')} and panic disorder</li>
      <li>${link('condition-depression.html','Depression')} and mood disorders</li>
      <li>${link('condition-adhd.html','ADHD')} in adults</li>
      <li>${link('condition-bipolar.html','Bipolar disorder')}</li>
      <li>${link('condition-trauma-ptsd.html','PTSD and trauma')}</li>
      <li>${link('condition-insomnia.html','Insomnia')}</li>
      <li>${link('condition-ocd.html','OCD')}</li>
      <li>${link('condition-postpartum.html','Postpartum and perinatal mood disorders')}</li>
    </ul>

    <h2 style="font-family:var(--serif);font-size:1.5rem;color:var(--forest);margin:2rem 0 .75rem;">What to Expect</h2>
    <p style="color:var(--green-md);line-height:1.85;font-size:1rem;">Your first visit is a comprehensive evaluation (60 minutes). Follow-up medication management appointments are 30 or 50 minutes. When starting a new medication, visits may be every 2 to 4 weeks. Once stable, visits are typically monthly or less frequent. Appointments are available Monday through Thursday via secure telehealth video.</p>
    ${CTA('Serving adults across all of Virginia. No referral needed.')}
    ${SEE(`${link('services.html','All services')} &middot; ${link('rates.html','Rates and insurance')} &middot; ${link('blog/what-is-medication-management.html','Medication management guide')} &middot; ${link('medication-management-fairfax-va.html','Medication management Fairfax')} &middot; ${link('faq.html','FAQ')}`)}
  </div>
</section>`
  },

];

pages.forEach(p => {
  const html = head(p.slug, p.title, p.desc) + '\n' + NAV + '\n' + p.body + '\n' + FOOTER + '\n</body>\n</html>';
  fs.writeFileSync('pages/' + p.slug + '.html', html, 'utf8');
  console.log('wrote pages/' + p.slug + '.html');
});

function head(slug, title, desc) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Alice Tran PMHNP</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="https://alicetrannp.com/pages/${slug}.html" />
  <link rel="preload" href="../css/fonts.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="../css/fonts.css"></noscript>
  <link rel="stylesheet" href="../css/style.css" />
  <link rel="icon" href="../img/logo.png" type="image/png" />
</head>
<body>`;
}

console.log('Done.');
