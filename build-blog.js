// build-blog.js  — generates blog post pages + index
const fs = require('fs');
const path = require('path');

const NAV = `
<nav>
  <a href="../../index.html" class="nav-logo"><img src="../../img/logo.png" alt="" width="28" height="28" style="border-radius:50%;vertical-align:middle;margin-right:8px;">Alice Tran Psychiatric Care</a>
  <div class="nav-links">
    <a href="../about.html">About</a>
    <a href="../services.html">Services</a>
    <a href="../rates.html">Rates &amp; Insurance</a>
    <a href="../conditions.html">Conditions</a>
    <a href="index.html">Blog</a>
    <a href="../contact.html">Contact</a>
    <div style="display:flex;align-items:center;gap:0.5rem;flex-shrink:0;">
      <a href="https://doxy.me/alicetran" target="_blank" class="nav-visit">Join Visit</a>
      <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta">Book Now</a>
    </div>
  </div>
  <button class="nav-toggle" onclick="toggleMenu()" aria-label="Menu">
    <span></span><span></span><span></span>
  </button>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="../about.html">About</a>
  <a href="../services.html">Services</a>
  <a href="../rates.html">Rates &amp; Insurance</a>
  <a href="../conditions.html">Conditions</a>
  <a href="index.html">Blog</a>
  <a href="../contact.html">Contact</a>
  <a href="https://doxy.me/alicetran" target="_blank">Join Visit</a>
  <a href="https://alicetran.intakeq.com/booking" target="_blank">Book Now</a>
</div>`;

const FOOTER = `
<section class="cta-band" style="padding:60px clamp(1.5rem,5vw,4rem);">
  <h2 class="section-title" style="color:#fff;">Ready to take the first step?</h2>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="btn btn-light">Book an Appointment</a>
  <p style="color:rgba(255,255,255,.6);margin-top:1rem;font-size:.95rem;">Telehealth psychiatric care across Virginia &middot; English &amp; Ti&#7871;ng Vi&#7879;t welcome</p>
</section>
<footer>
  <div class="footer-grid">
    <div>
      <div class="footer-brand">Alice Tran Psychiatric Care</div>
      <p class="footer-tagline">Telehealth psychiatric care across Virginia.<br>English &amp; Ti&#7871;ng Vi&#7879;t welcome.</p>
      <br><h4>Contact</h4>
      <a href="tel:7038295227">Phone: (703) 829-5227</a>
      <a href="mailto:info@alicetrannp.com">Email: info@alicetrannp.com</a>
    </div>
    <div>
      <h4>Pages</h4>
      <a href="../about.html">About</a>
      <a href="../services.html">Services</a>
      <a href="../rates.html">Rates &amp; Insurance</a>
      <a href="../conditions.html">Conditions</a>
      <a href="index.html">Blog</a>
      <a href="../contact.html">Contact</a>
    </div>
    <div>
      <h4>Hours</h4>
      <p style="line-height:2.2;">
        <b>Mon &ndash; Thu</b> 9am &ndash; 4pm<br>
        <b>Fri &ndash; Sun</b> Closed
      </p>
    </div>
  </div>
  <div class="footer-copy">&copy; 2026 Alice Tran Psychiatric Care LLC. All rights reserved. &nbsp;&middot;&nbsp; <a href="../privacy.html">Privacy</a> &middot; <a href="../terms.html">Terms</a> &middot; <a href="../disclaimer.html">Disclaimer</a></div>
</footer>
<script>function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open');}</script>`;

const HEAD = (title, desc, slug, date) => `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${title} | Alice Tran PMHNP</title>
  <meta name="description" content="${desc}" />
  <link rel="canonical" href="https://alicetrannp.com/pages/blog/${slug}.html" />
  <link rel="preload" href="../../css/fonts.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="../../css/fonts.css"></noscript>
  <link rel="stylesheet" href="../../css/style.css" />
  <link rel="icon" href="../../img/logo.png" type="image/png" />
  <meta property="og:type" content="article" />
  <meta property="og:title" content="${title} | Alice Tran PMHNP" />
  <meta property="og:description" content="${desc}" />
  <meta property="og:url" content="https://alicetrannp.com/pages/blog/${slug}.html" />
  <meta property="og:image" content="https://alicetrannp.com/img/preview.jpg" />
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": "${title}",
    "description": "${desc}",
    "datePublished": "${date}",
    "dateModified": "${date}",
    "author": {
      "@type": "Person",
      "name": "Alice Tran",
      "jobTitle": "Psychiatric Mental Health Nurse Practitioner",
      "honorificSuffix": "PMHNP-BC"
    },
    "publisher": {
      "@type": "MedicalBusiness",
      "name": "Alice Tran Psychiatric Care",
      "url": "https://alicetrannp.com"
    },
    "url": "https://alicetrannp.com/pages/blog/${slug}.html"
  }
  <\/script>
</head>
<body>`;

// ─── POSTS ─────────────────────────────────────────────────────────────────

const posts = [

  // ── 1 ──────────────────────────────────────────────────────────────────
  {
    slug: 'what-is-a-pmhnp',
    date: '2026-05-01',
    title: 'What Is a PMHNP? A Plain-Language Guide to Psychiatric Nurse Practitioners',
    desc: 'Confused by the letters PMHNP? Here is what a Psychiatric Mental Health Nurse Practitioner does, how they differ from a psychiatrist, and whether they can prescribe medication in Virginia.',
    hero: 'Understanding Your Provider',
    body: `
<article class="blog-article">
  <div class="blog-hero">
    <div class="section-tag">Mental Health 101</div>
    <h1>What Is a PMHNP?<br><span style="font-style:italic;font-weight:300;">A Plain-Language Guide to Psychiatric Nurse Practitioners</span></h1>
    <p class="blog-meta">By Alice Tran, PMHNP-BC &nbsp;&middot;&nbsp; May 2026 &nbsp;&middot;&nbsp; 5 min read</p>
  </div>

  <div class="blog-body">

    <p>If you have been looking for mental health care in Virginia, you may have come across the letters <strong>PMHNP</strong> and wondered what they mean. You are not alone. Many people are unfamiliar with this type of provider, and that unfamiliarity can be a barrier to getting help.</p>

    <p>This article explains exactly what a PMHNP is, what they can do, and whether they might be the right fit for you.</p>

    <h2>What Does PMHNP Stand For?</h2>
    <p><strong>PMHNP</strong> stands for <strong>Psychiatric Mental Health Nurse Practitioner</strong>. It is an advanced practice registered nurse (APRN) who has completed graduate-level education and clinical training specifically in psychiatry and mental health.</p>
    <p>In Virginia, PMHNPs hold a master's or doctoral degree in nursing, have passed a national board certification exam (the ANCC board exam), and hold an active state license. The designation <strong>PMHNP-BC</strong> means board-certified — an additional credential that requires passing a rigorous national exam.</p>

    <h2>What Can a PMHNP Do?</h2>
    <p>A PMHNP is trained to:</p>
    <ul>
      <li>Conduct comprehensive psychiatric evaluations</li>
      <li>Diagnose mental health conditions (such as anxiety, depression, ADHD, bipolar disorder, and PTSD)</li>
      <li>Prescribe and manage psychiatric medications</li>
      <li>Provide supportive psychotherapy alongside medication management</li>
      <li>Create individualized treatment plans</li>
      <li>Coordinate care with therapists, primary care providers, and specialists</li>
    </ul>

    <h2>How Is a PMHNP Different from a Psychiatrist?</h2>
    <p>This is the question patients ask most often. Here is the honest answer:</p>
    <p>A <strong>psychiatrist</strong> is a medical doctor (MD or DO) who completed medical school, a general residency, and a psychiatric residency — typically 12+ years of training. A <strong>PMHNP</strong> is a nurse who completed an undergraduate nursing degree, then an advanced graduate program in psychiatric nursing — typically 6 to 8 years total.</p>
    <p>Both can diagnose and prescribe. In practice, for outpatient medication management and therapy, <strong>the day-to-day care is very similar</strong>. PMHNPs tend to spend more time in appointments focusing on the whole person — lifestyle, relationships, culture, and social context — not just symptom checklists.</p>
    <p>In Virginia, PMHNPs can practice independently or under the supervision of a psychiatrist and provide the same scope of outpatient psychiatric care.</p>

    <h2>Can a PMHNP Prescribe Medication in Virginia?</h2>
    <p>Yes. PMHNPs in Virginia are authorized to prescribe controlled and non-controlled psychiatric medications, including antidepressants, anti-anxiety medications, mood stabilizers, ADHD medications, and sleep aids.</p>

    <h2>Is a PMHNP Right for You?</h2>
    <p>A PMHNP is a great fit if you are looking for:</p>
    <ul>
      <li>A comprehensive psychiatric evaluation for a new or ongoing concern</li>
      <li>Medication management with personalized attention</li>
      <li>A provider who takes time to understand your whole story — not just your diagnosis</li>
      <li>Telehealth care from the comfort of your home</li>
      <li>Care in English or Vietnamese</li>
    </ul>

    <div class="blog-cta-box">
      <p>Alice Tran is a board-certified PMHNP (PMHNP-BC, FNP-BC) serving adults across Virginia via telehealth. If you have questions about whether this type of care is right for you, feel free to <a href="../contact.html">reach out</a> or <a href="https://alicetran.intakeq.com/booking" target="_blank">book a consultation</a>.</p>
    </div>

    <h2>The Bottom Line</h2>
    <p>A PMHNP is a highly trained mental health provider who can evaluate, diagnose, and treat psychiatric conditions — including prescribing medication. For most adults seeking outpatient psychiatric care, a PMHNP can provide comprehensive, compassionate care that is on par with what a psychiatrist offers.</p>
    <p>The most important thing is finding someone you feel comfortable talking to. The letters after someone's name matter less than whether you feel heard in the room.</p>

    <p class="blog-see-also">See also: <a href="../services.html">Services offered</a> &middot; <a href="../pages/faq.html">Frequently asked questions</a> &middot; <a href="../conditions.html">Conditions treated</a></p>
  </div>
</article>`
  },

  // ── 2 ──────────────────────────────────────────────────────────────────
  {
    slug: 'adhd-adults-virginia',
    date: '2026-05-01',
    title: 'ADHD in Adults: Signs, Diagnosis, and Treatment in Virginia',
    desc: 'Think you might have ADHD as an adult? Learn what adult ADHD looks like, how diagnosis works in Virginia, and what treatment options are available through telehealth.',
    hero: 'ADHD in Adults',
    body: `
<article class="blog-article">
  <div class="blog-hero">
    <div class="section-tag">ADHD</div>
    <h1>ADHD in Adults:<br><span style="font-style:italic;font-weight:300;">Signs, Diagnosis, and Treatment in Virginia</span></h1>
    <p class="blog-meta">By Alice Tran, PMHNP-BC &nbsp;&middot;&nbsp; May 2026 &nbsp;&middot;&nbsp; 6 min read</p>
  </div>

  <div class="blog-body">

    <p>Many adults who are eventually diagnosed with ADHD spent years wondering why certain things felt harder for them than for everyone else. Why can't I finish projects? Why do I keep losing things? Why does sitting through a meeting feel impossible?</p>
    <p>If this sounds familiar, you are not lazy, unmotivated, or broken. ADHD is a real, treatable neurological condition — and it looks different in adults than it does in children.</p>

    <h2>What Does ADHD Look Like in Adults?</h2>
    <p>The classic image of ADHD is a child bouncing off walls. But adult ADHD is often quieter and more internal. Common signs include:</p>
    <ul>
      <li>Difficulty sustaining attention on tasks that aren't immediately interesting</li>
      <li>Frequently losing items (keys, phone, wallet) or forgetting appointments</li>
      <li>Starting many projects but struggling to finish them</li>
      <li>Chronic lateness or poor time management</li>
      <li>Impulsive decisions — spending, speaking, reacting before thinking</li>
      <li>Emotional dysregulation — frustration that feels disproportionate</li>
      <li>Racing thoughts or difficulty winding down at night</li>
      <li>Hyperfocus: getting intensely absorbed in things you enjoy, then neglecting other responsibilities</li>
    </ul>
    <p>Adults with ADHD often develop coping strategies that mask these symptoms — which is why so many go undiagnosed for decades.</p>

    <h2>Can You Be Diagnosed with ADHD as an Adult in Virginia?</h2>
    <p>Yes. ADHD is not just a childhood condition. Many adults receive their first diagnosis in their 20s, 30s, 40s, or later — often after a major life change (a new job, a relationship, parenthood) makes it harder to cope.</p>
    <p>In Virginia, an adult ADHD evaluation can be done by a psychiatrist, PMHNP, or psychologist. The evaluation typically involves:</p>
    <ul>
      <li>A thorough clinical interview about your symptoms, history, and daily life</li>
      <li>Standardized rating scales and questionnaires</li>
      <li>A review of how symptoms affect work, relationships, and daily functioning</li>
      <li>Ruling out other conditions (anxiety, depression, sleep disorders) that can mimic ADHD</li>
    </ul>
    <p>There is no single blood test or brain scan for ADHD — diagnosis is clinical, based on a careful conversation and assessment.</p>

    <h2>How Is Adult ADHD Treated?</h2>
    <p>Treatment is typically a combination of medication and behavioral strategies.</p>
    <h3>Medication</h3>
    <p>Stimulant medications (like Adderall or Ritalin) are the most studied and often most effective first-line treatment for ADHD. Non-stimulant options (like Strattera or Wellbutrin) are also available for people who prefer to avoid stimulants or have certain health conditions. Medication is always discussed carefully and started at the lowest effective dose.</p>
    <h3>Behavioral Strategies</h3>
    <p>Medication addresses the neurological component. Behavioral tools help you build systems that work with your brain rather than against it: external reminders, structured routines, body doubling, and breaking tasks into smaller steps.</p>
    <h3>Therapy</h3>
    <p>Cognitive behavioral therapy (CBT) adapted for ADHD is particularly helpful. It addresses the shame, avoidance, and self-doubt that often develop after years of struggling without understanding why.</p>

    <h2>Can Telehealth ADHD Treatment Work?</h2>
    <p>Yes. Telehealth psychiatric care — including evaluation, diagnosis, and medication management for ADHD — is available and legal in Virginia. Many adults find telehealth easier to maintain consistently, especially given the scheduling challenges that often come with ADHD itself.</p>

    <div class="blog-cta-box">
      <p>Alice Tran provides ADHD evaluations and medication management for adults across Virginia via telehealth. No referral needed. <a href="https://alicetran.intakeq.com/booking" target="_blank">Book a consultation</a> or <a href="../contact.html">reach out with questions</a>.</p>
    </div>

    <h2>You Are Not Behind. You Just Have a Different Brain.</h2>
    <p>Adults with ADHD are often incredibly creative, driven, and empathetic people. The goal of treatment isn't to make you into someone different — it's to remove the friction so you can show up more fully as who you already are.</p>

    <p class="blog-see-also">See also: <a href="../condition-adhd.html">ADHD care page</a> &middot; <a href="../condition-anxiety.html">Anxiety</a> &middot; <a href="what-is-a-pmhnp.html">What is a PMHNP?</a></p>
  </div>
</article>`
  },

  // ── 3 ──────────────────────────────────────────────────────────────────
  {
    slug: 'what-is-medication-management',
    date: '2026-05-01',
    title: 'What Is Medication Management in Psychiatry? What to Expect',
    desc: 'Medication management is one of the most searched psychiatric terms — but few sites explain what it actually means. Here is what happens at a medication management appointment and why it matters.',
    hero: 'Medication Management',
    body: `
<article class="blog-article">
  <div class="blog-hero">
    <div class="section-tag">Treatment</div>
    <h1>What Is Medication Management in Psychiatry?<br><span style="font-style:italic;font-weight:300;">What to Expect at Your Appointments</span></h1>
    <p class="blog-meta">By Alice Tran, PMHNP-BC &nbsp;&middot;&nbsp; May 2026 &nbsp;&middot;&nbsp; 5 min read</p>
  </div>

  <div class="blog-body">

    <p>When people search for psychiatric care, they often see the phrase <strong>medication management</strong> listed as a service. But what does it actually mean? Is it just getting a prescription refilled? What happens in those appointments?</p>
    <p>This article breaks it down in plain language.</p>

    <h2>What Is Medication Management?</h2>
    <p>Medication management is the ongoing process of evaluating, prescribing, adjusting, and monitoring psychiatric medications to make sure they are working safely and effectively for you.</p>
    <p>It is not just writing a prescription and sending you home. It includes:</p>
    <ul>
      <li>Reviewing how you are feeling since your last appointment</li>
      <li>Assessing whether the medication is helping — and how much</li>
      <li>Checking for side effects or any new concerns</li>
      <li>Adjusting the dose or switching medications if needed</li>
      <li>Discussing how your medication interacts with your lifestyle, other prescriptions, or health conditions</li>
      <li>Answering your questions honestly</li>
    </ul>
    <p>It is a conversation, not a transaction.</p>

    <h2>Who Needs Medication Management?</h2>
    <p>Not everyone who comes to a psychiatric appointment ends up on medication — and that is okay. Medication is one tool, not the only tool. However, medication management is often recommended for:</p>
    <ul>
      <li>Moderate to severe depression that hasn't responded to therapy alone</li>
      <li>Anxiety disorders that significantly interfere with daily life</li>
      <li>ADHD where structure and behavioral strategies haven't been enough</li>
      <li>Bipolar disorder, where mood stabilization often requires medication</li>
      <li>PTSD with severe symptoms affecting sleep and daily functioning</li>
      <li>OCD, postpartum depression, panic disorder, and other conditions</li>
    </ul>

    <h2>What Happens at a Medication Management Appointment?</h2>
    <p>After your initial evaluation (the first, longer appointment where your history is reviewed in detail), follow-up medication management visits typically last 30 to 50 minutes. Here is what that time looks like:</p>
    <ol>
      <li><strong>Check-in.</strong> How have you been? What has changed since the last visit?</li>
      <li><strong>Medication review.</strong> Is the medication helping? Any side effects? Are you taking it consistently?</li>
      <li><strong>Adjustment discussion.</strong> Based on your feedback, should we stay the course, increase or decrease the dose, or try something different?</li>
      <li><strong>Therapy check-in.</strong> Supportive conversation, coping strategies, and any other concerns on your mind.</li>
      <li><strong>Plan.</strong> What are we doing next, and when do we check in again?</li>
    </ol>

    <h2>How Often Are Medication Management Appointments?</h2>
    <p>This varies depending on where you are in treatment. When starting a new medication or adjusting a dose, appointments may happen every 2 to 4 weeks so we can monitor how you are responding. Once things are stable, appointments may shift to every 4 to 8 weeks.</p>

    <h2>Do You Have to Be on Medication Forever?</h2>
    <p>No. The goal is always to find the least intervention that gets you where you want to be. Some people benefit from medication for a defined period (for example, during a particularly hard season of life) and then taper off. Others find that ongoing medication is what allows them to function at their best. This is always an individualized conversation, never a one-size-fits-all decision.</p>

    <div class="blog-cta-box">
      <p>Alice Tran provides medication management for adults across Virginia via telehealth. Appointments are available Monday through Thursday. <a href="https://alicetran.intakeq.com/booking" target="_blank">Book an appointment</a> or <a href="../contact.html">get in touch</a> with any questions.</p>
    </div>

    <p class="blog-see-also">See also: <a href="../services.html">Services</a> &middot; <a href="../rates.html">Rates &amp; Insurance</a> &middot; <a href="what-is-a-pmhnp.html">What is a PMHNP?</a></p>
  </div>
</article>`
  },

  // ── 4 ──────────────────────────────────────────────────────────────────
  {
    slug: 'telehealth-psychiatry-how-it-works',
    date: '2026-05-02',
    title: 'How Telehealth Psychiatry Works (And Whether It Is Right for You)',
    desc: 'Telehealth psychiatry lets you receive psychiatric evaluations, medication management, and therapy from home. Here is how it works in Virginia and what to expect from your first visit.',
    hero: 'Telehealth Psychiatry',
    body: `
<article class="blog-article">
  <div class="blog-hero">
    <div class="section-tag">Telehealth</div>
    <h1>How Telehealth Psychiatry Works<br><span style="font-style:italic;font-weight:300;">And Whether It Is Right for You</span></h1>
    <p class="blog-meta">By Alice Tran, PMHNP-BC &nbsp;&middot;&nbsp; May 2026 &nbsp;&middot;&nbsp; 5 min read</p>
  </div>

  <div class="blog-body">

    <p>A few years ago, seeing a psychiatrist from your couch would have seemed unusual. Today, telehealth is how many Virginians access psychiatric care — and research increasingly shows it is just as effective as in-person care for most outpatient mental health needs.</p>
    <p>If you are curious about whether telehealth psychiatry is the right option for you, this guide answers the most common questions.</p>

    <h2>What Is Telehealth Psychiatry?</h2>
    <p>Telehealth psychiatry is psychiatric care delivered through a secure video platform rather than an in-person office. You connect with your provider from your home, your car, your office — wherever you have a private space and a stable internet connection.</p>
    <p>Everything that happens in a traditional psychiatric appointment can happen via telehealth: a full evaluation, a diagnosis, a prescription, and ongoing follow-up visits.</p>

    <h2>What Can Telehealth Psychiatry Actually Do?</h2>
    <p>In Virginia, a telehealth psychiatric provider can:</p>
    <ul>
      <li>Conduct a comprehensive initial psychiatric evaluation</li>
      <li>Diagnose mental health conditions</li>
      <li>Prescribe and manage psychiatric medications (including controlled substances, with appropriate documentation)</li>
      <li>Provide supportive therapy alongside medication</li>
      <li>Adjust treatment plans over time</li>
      <li>Coordinate with your primary care provider or therapist</li>
    </ul>

    <h2>How Does a Telehealth Appointment Work?</h2>
    <p>Here is what to expect:</p>
    <ol>
      <li><strong>Book online.</strong> You choose a time that works for you — no waitlist phone tag, no referral required.</li>
      <li><strong>Complete your intake forms.</strong> Before your first appointment, you will fill out a brief health history online. This saves time during the visit.</li>
      <li><strong>Join your appointment.</strong> At your scheduled time, you click a secure link. No app download required. A stable internet connection and a quiet, private space are all you need.</li>
      <li><strong>Have your visit.</strong> Your first appointment is 60 minutes. We talk about your concerns, history, goals, and what you are hoping to get from care.</li>
      <li><strong>Follow-up.</strong> Depending on your treatment plan, follow-up visits are typically 30 or 50 minutes, scheduled every few weeks to monthly.</li>
    </ol>

    <h2>Is Telehealth Psychiatry As Good As In-Person?</h2>
    <p>For outpatient psychiatric care — evaluation, medication management, and supportive therapy — yes. Multiple studies show outcomes are comparable. The therapeutic relationship, which is the most important factor in treatment success, builds just as well over video.</p>
    <p>Telehealth is not appropriate for acute psychiatric emergencies or inpatient-level care. For those situations, an emergency room or crisis line (988) is the right resource.</p>

    <h2>Who Is Telehealth Psychiatry Right For?</h2>
    <p>Telehealth is especially well-suited if you:</p>
    <ul>
      <li>Have a demanding schedule and need flexible appointment times</li>
      <li>Live in a rural area of Virginia without nearby psychiatric providers</li>
      <li>Experience anxiety that makes leaving home for appointments difficult</li>
      <li>Want to avoid the waiting room, commute, and scheduling friction of an in-person office</li>
      <li>Prefer the comfort of your own space for sensitive conversations</li>
    </ul>

    <h2>Is Telehealth Psychiatric Care Private?</h2>
    <p>Yes. All appointments are conducted through a HIPAA-compliant platform. Your health information is protected by federal law, the same as any in-person medical visit.</p>

    <div class="blog-cta-box">
      <p>Alice Tran provides telehealth psychiatric care for adults across all of Virginia — from Northern Virginia to Richmond, Hampton Roads, Charlottesville, and beyond. No referral needed. <a href="https://alicetran.intakeq.com/booking" target="_blank">Book a consultation</a>.</p>
    </div>

    <p class="blog-see-also">See also: <a href="../telehealth-psychiatry-northern-virginia.html">Telehealth psychiatry in Northern Virginia</a> &middot; <a href="../services.html">Services</a> &middot; <a href="../faq.html">FAQ</a></p>
  </div>
</article>`
  },

  // ── 5 ──────────────────────────────────────────────────────────────────
  {
    slug: 'anxiety-when-to-see-a-psychiatrist',
    date: '2026-05-02',
    title: 'Anxiety vs. Stress: When Should You See a Psychiatrist?',
    desc: 'Everyone feels stressed sometimes. But how do you know when anxiety has crossed the line into something that needs professional support? A PMHNP explains the difference and what to do next.',
    hero: 'Anxiety',
    body: `
<article class="blog-article">
  <div class="blog-hero">
    <div class="section-tag">Anxiety</div>
    <h1>Anxiety vs. Stress:<br><span style="font-style:italic;font-weight:300;">When Should You See a Psychiatrist?</span></h1>
    <p class="blog-meta">By Alice Tran, PMHNP-BC &nbsp;&middot;&nbsp; May 2026 &nbsp;&middot;&nbsp; 5 min read</p>
  </div>

  <div class="blog-body">

    <p>Stress is a normal part of life. A deadline, a difficult conversation, a health scare — these things are supposed to feel uncomfortable. But anxiety is different from stress, and knowing the difference can help you decide when it is time to reach out for support.</p>

    <h2>What Is the Difference Between Stress and Anxiety?</h2>
    <p><strong>Stress</strong> is a response to an external event. It usually resolves when the situation does. The presentation is over, the deadline passes, the conflict gets resolved — and the tension lifts.</p>
    <p><strong>Anxiety</strong> persists beyond the trigger. It lingers even when there is nothing immediate to worry about. It can feel like a low hum in the background of your life, or it can spike into overwhelming worry that is hard to control. Anxiety often attaches to the next thing, and then the next, because it is not really about any one situation — it is a pattern in how the nervous system responds.</p>

    <h2>Signs That What You Are Feeling Might Be Anxiety</h2>
    <ul>
      <li>Persistent worry that is hard to turn off, even when things are going okay</li>
      <li>Physical symptoms: racing heart, tight chest, shortness of breath, stomach problems</li>
      <li>Difficulty sleeping — trouble falling asleep, staying asleep, or racing thoughts at night</li>
      <li>Avoidance: canceling plans, putting off decisions, staying small to feel safe</li>
      <li>Irritability that feels disproportionate to what triggered it</li>
      <li>Muscle tension, headaches, or fatigue you cannot explain medically</li>
      <li>Difficulty concentrating because your mind keeps drifting to worries</li>
    </ul>

    <h2>When Is It Time to See a Psychiatrist?</h2>
    <p>There is no exact threshold — but here are some signs it may be time to talk to someone:</p>
    <ul>
      <li>Your anxiety has lasted more than a few weeks and is not tied to a specific, passing situation</li>
      <li>It is affecting your work, relationships, or ability to do things you used to enjoy</li>
      <li>You are avoiding things you know are important because of how anxious they make you feel</li>
      <li>You are using alcohol, food, social media, or busyness to manage the feeling</li>
      <li>You are having panic attacks — sudden, intense episodes of fear with physical symptoms</li>
      <li>You feel like you have tried to manage it on your own and it is not getting better</li>
    </ul>
    <p>You do not have to wait until things are at a breaking point. Reaching out earlier often means a shorter path to feeling better.</p>

    <h2>What Does Anxiety Treatment Look Like?</h2>
    <p>Treatment depends on your specific symptoms, history, and preferences. It may include:</p>
    <ul>
      <li><strong>Therapy</strong> — Cognitive behavioral therapy (CBT) is one of the most effective treatments for anxiety. It helps you identify and shift the thought patterns that fuel anxious responses.</li>
      <li><strong>Medication</strong> — SSRIs and SNRIs (common antidepressants) are first-line medications for anxiety disorders. They are non-addictive and take a few weeks to build up. Shorter-term options may be discussed for acute situations.</li>
      <li><strong>Lifestyle changes</strong> — Sleep, exercise, caffeine, and stress management all have a meaningful impact on anxiety. These are always part of the conversation.</li>
      <li><strong>A combination</strong> — For many people, medication plus therapy works better than either alone.</li>
    </ul>

    <h2>A Note on Anxiety in the Virginia Area</h2>
    <p>If you live in Northern Virginia — near Fairfax, Arlington, McLean, or Tysons — you already know that the culture here is high-pressure. Demanding careers, long commutes, high cost of living, competitive environments. Anxiety does not exist in a vacuum. Where you live and work matters, and good psychiatric care takes that context seriously.</p>

    <div class="blog-cta-box">
      <p>If any of this resonates, you are welcome here. Alice Tran sees adults across Virginia via telehealth for anxiety evaluation and treatment. <a href="https://alicetran.intakeq.com/booking" target="_blank">Book a consultation</a> or <a href="../contact.html">send a message</a> — no referral needed.</p>
    </div>

    <p class="blog-see-also">See also: <a href="../condition-anxiety.html">Anxiety care page</a> &middot; <a href="../condition-panic.html">Panic disorder</a> &middot; <a href="../condition-burnout.html">Burnout &amp; chronic stress</a></p>
  </div>
</article>`
  },

];

// ─── BUILD EACH POST ─────────────────────────────────────────────────────────

const outDir = path.join(__dirname, 'pages', 'blog');

posts.forEach(p => {
  const html = `${HEAD(p.title, p.desc, p.slug, p.date)}
${NAV}
${p.body}
${FOOTER}
</body>
</html>`;
  fs.writeFileSync(path.join(outDir, `${p.slug}.html`), html, 'utf8');
  console.log('  wrote', p.slug + '.html');
});

// ─── BUILD INDEX ─────────────────────────────────────────────────────────────

const cards = posts.map(p => `
    <a href="${p.slug}.html" class="blog-card">
      <div class="blog-card__body">
        <p class="blog-card__date">${new Date(p.date).toLocaleDateString('en-US',{month:'long',year:'numeric'})}</p>
        <h2 class="blog-card__title">${p.title}</h2>
        <p class="blog-card__desc">${p.desc}</p>
        <span class="blog-card__cta">Read more &rarr;</span>
      </div>
    </a>`).join('\n');

const indexHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Mental Health Blog | Alice Tran PMHNP — Telehealth Psychiatry Virginia</title>
  <meta name="description" content="Plain-language articles on psychiatry, ADHD, anxiety, medication management, and telehealth mental health care in Virginia, from Alice Tran PMHNP-BC." />
  <link rel="canonical" href="https://alicetrannp.com/pages/blog/" />
  <link rel="preload" href="../../css/fonts.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="../../css/fonts.css"></noscript>
  <link rel="stylesheet" href="../../css/style.css" />
  <link rel="icon" href="../../img/logo.png" type="image/png" />
</head>
<body>
${NAV}

<div class="page-hero">
  <div class="section-tag">Mental Health Resources</div>
  <h1>From the Practice</h1>
  <p>Plain-language articles on psychiatry, mental health, and what to expect from care — written by Alice Tran, PMHNP-BC.</p>
</div>

<section style="background:var(--cream,#F5F2EC);padding:64px clamp(1.5rem,5vw,4rem);">
  <div style="max-width:960px;margin:0 auto;display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:1.5rem;">
${cards}
  </div>
</section>

${FOOTER}

<style>
.blog-card {
  display:flex;flex-direction:column;background:#fff;border-radius:16px;
  border:1px solid rgba(0,0,0,.07);text-decoration:none;color:inherit;
  transition:box-shadow .2s,transform .2s;overflow:hidden;
}
.blog-card:hover { box-shadow:0 8px 32px rgba(0,0,0,.1); transform:translateY(-2px); }
.blog-card__body { padding:1.75rem 1.5rem 1.5rem; display:flex; flex-direction:column; gap:.6rem; flex:1; }
.blog-card__date { font-size:.75rem;letter-spacing:.14em;text-transform:uppercase;color:#7A9E7E;font-weight:600; }
.blog-card__title { font-family:var(--serif,Georgia,serif);font-size:1.15rem;font-weight:500;color:#2E4A3C;line-height:1.4;margin:0; }
.blog-card__desc { font-size:.88rem;color:#5A7A64;line-height:1.7;margin:0;flex:1; }
.blog-card__cta { font-size:.82rem;font-weight:600;color:#2E4A3C;margin-top:.5rem; }
</style>
</body>
</html>`;

fs.writeFileSync(path.join(outDir, 'index.html'), indexHtml, 'utf8');
console.log('  wrote blog/index.html');
console.log('Done. ' + (posts.length + 1) + ' files written.');
