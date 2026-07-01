const fs = require('fs');
const path = require('path');

const NAV = `<nav>
  <a href="../index.html" class="nav-logo"><img src="../img/logo.png" alt="" width="28" height="28" style="border-radius:50%;vertical-align:middle;margin-right:8px;">Alice Tran Psychiatric Care</a>
  <div class="nav-links">
    <a href="about.html">About</a>
    <a href="services.html">Services</a>
    <a href="rates.html">Rates & Insurance</a>
    <a href="conditions.html">Conditions</a>
    <a href="contact.html">Contact</a>
    <div style="display:flex;align-items:center;gap:0.5rem;flex-shrink:0;">
      <a href="https://doxy.me/alicetran" target="_blank" class="nav-visit">Join Visit</a>
      <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta">Book Now</a>
    </div>
  </div>
  <button class="nav-toggle" onclick="toggleMenu()" aria-label="Menu"><span></span><span></span><span></span></button>
</nav>
<div class="mobile-menu" id="mobileMenu">
  <a href="about.html">About</a>
  <a href="services.html">Services</a>
  <a href="rates.html">Rates & Insurance</a>
  <a href="conditions.html">Conditions</a>
  <a href="contact.html">Contact</a>
  <a href="https://doxy.me/alicetran" target="_blank">Join Visit</a>
  <a href="https://alicetran.intakeq.com/booking" target="_blank">Book Now</a>
</div>`;

const FOOTER = `<footer>
  <div class="footer-grid">
    <div>
      <div class="footer-brand">Alice Tran Psychiatric Care</div>
      <p class="footer-tagline">Telehealth psychiatric care across Virginia.<br>English &amp; Ti&#7871;ng Vi&#7879;t welcome.</p>
      <br>
      <h4>Contact</h4>
      <a href="tel:7038295227">Phone: (703) 829-5227 (Call or Text)</a>
      <span style="font-size:12px;color:#4a5e44;display:block;line-height:2;">Fax: (804) 807-9399</span>
      <a href="mailto:info@alicetrannp.com">Email: info@alicetrannp.com</a>
    </div>
    <div>
      <h4>Telehealth</h4>
      <a href="https://doxy.me/alicetran" target="_blank">Join appointment</a>
      <a href="https://alicetran.intakeq.com/booking" target="_blank">Book online</a>
      <h4 style="margin-top:1.5rem;">Pages</h4>
      <a href="about.html">About</a>
      <a href="services.html">Services</a>
      <a href="rates.html">Rates &amp; Insurance</a>
      <a href="conditions.html">Conditions</a>
      <a href="contact.html">Contact</a>
    </div>
    <div>
      <h4>Hours</h4>
      <p style="line-height:2.2;">
        <b>Monday</b> 9am &ndash; 4pm<br>
        <b>Tuesday</b> 9am &ndash; 4pm<br>
        <b>Wednesday</b> 9am &ndash; 4pm<br>
        <b>Thursday</b> 9am &ndash; 4pm<br>
        <b>Friday</b> Closed<br>
        <b>Saturday</b> Closed<br>
        <b>Sunday</b> Closed
      </p>
    </div>
  </div>
  <div class="footer-copy">&copy; 2026 Alice Tran Psychiatric Care LLC. All rights reserved. &nbsp;&middot;&nbsp; <a href="privacy.html">Privacy</a> &middot; <a href="terms.html">Terms</a> &middot; <a href="disclaimer.html">Disclaimer</a> &middot; <a href="accessibility.html">Accessibility</a></div>
</footer>
<script>
const _rev=document.querySelectorAll('[data-reveal]');
const _obs=new IntersectionObserver(es=>es.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-in');_obs.unobserve(e.target);}}),{threshold:0.1});
_rev.forEach(el=>_obs.observe(el));
</script>
<script>function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open');}</script>`;

const CSS = `<link rel="preload" href="../css/fonts.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="../css/fonts.css"></noscript>
  <link rel="stylesheet" href="../css/style.css" />
  <style>
    .loc-hero{background:var(--forest);padding:72px clamp(1.5rem,6vw,4rem) 56px;text-align:center;}
    .loc-hero .section-tag{display:inline-block;font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:var(--sage-dk);font-weight:600;margin-bottom:1.25rem;}
    .loc-hero h1{font-family:var(--serif);font-size:clamp(1.9rem,4.5vw,3rem);font-weight:300;color:#fff;line-height:1.2;margin:0 0 1.1rem;max-width:760px;margin-left:auto;margin-right:auto;}
    .loc-hero p{color:rgba(255,255,255,.72);font-size:1rem;line-height:1.85;max-width:600px;margin:0 auto 2rem;}
    .loc-s{padding:60px clamp(1.5rem,5vw,3.5rem);}
    .loc-s--alt{background:var(--sage-lt);}
    .loc-s--dk{background:var(--forest);}
    .loc-inner{max-width:840px;margin:0 auto;}
    .loc-inner--w{max-width:1040px;margin:0 auto;}
    .loc-tag{font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:var(--green);font-weight:600;display:block;margin-bottom:.85rem;}
    .loc-tag--lt{color:var(--sage-dk);}
    .loc-h2{font-family:var(--serif);font-size:clamp(1.65rem,3.2vw,2.4rem);font-weight:300;color:var(--forest);line-height:1.25;margin:0 0 1.1rem;}
    .loc-h2--lt{color:#fff;}
    .loc-p{font-size:1rem;color:var(--green-md);line-height:1.85;margin:0 0 1rem;}
    .loc-p--lt{color:rgba(255,255,255,.72);}
    .loc-grid{display:grid;grid-template-columns:1fr 1fr;gap:2rem;}
    .loc-grid--3{display:grid;grid-template-columns:repeat(3,1fr);gap:1.5rem;}
    .loc-card{background:#fff;border:1px solid var(--border);border-radius:14px;padding:1.75rem;}
    .loc-card--dk{background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);border-radius:14px;padding:1.75rem;}
    .loc-card h3{font-family:var(--serif);font-size:1.25rem;font-weight:400;color:var(--forest);margin:0 0 .5rem;}
    .loc-card--dk h3{color:#fff;}
    .loc-card p{font-size:.92rem;color:var(--green-md);line-height:1.7;margin:0;}
    .loc-card--dk p{color:rgba(255,255,255,.65);}
    .loc-faq+.loc-faq{border-top:1px solid var(--border);padding-top:1.5rem;margin-top:1.5rem;}
    .loc-faq h3{font-family:var(--serif);font-size:1.1rem;font-weight:400;color:var(--forest);margin:0 0 .4rem;}
    .loc-faq p{font-size:.93rem;color:var(--green-md);line-height:1.75;margin:0;}
    .loc-cta{background:var(--forest);text-align:center;padding:60px clamp(1.5rem,5vw,3.5rem);}
    .loc-cta h2{font-family:var(--serif);font-size:clamp(1.7rem,3.5vw,2.6rem);font-weight:300;color:#fff;margin:0 0 .85rem;}
    .loc-cta p{color:rgba(255,255,255,.65);margin:0 0 1.75rem;font-size:.97rem;}
    .loc-tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem;}
    .loc-tag-pill{display:inline-block;background:var(--sage-md);color:var(--forest);font-size:.82rem;font-weight:500;padding:.3rem .85rem;border-radius:999px;}
    @media(max-width:680px){.loc-grid,.loc-grid--3{grid-template-columns:1fr;}}
  </style>`;

// ─────────────────────────────────────────────
// PAGE DEFINITIONS
// ─────────────────────────────────────────────

const pages = [

// ── 1. FAIRFAX GENERAL ────────────────────────────────────────────────────────
{
  filename: 'psychiatric-care-fairfax-va.html',
  title: 'Psychiatric Nurse Practitioner in Fairfax, VA | Alice Tran, PMHNP-BC',
  desc: 'Alice Tran, PMHNP-BC provides psychiatric evaluations, medication management, and therapy for adults in Fairfax, VA via telehealth. Board-certified. English & Vietnamese. New patients welcome.',
  keywords: 'psychiatric nurse practitioner Fairfax VA, psychiatrist Fairfax Virginia, PMHNP Fairfax, mental health provider Fairfax VA, psychiatric evaluation Fairfax, anxiety depression ADHD Fairfax VA',
  canonical: 'https://alicetrannp.com/pages/psychiatric-care-fairfax-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","address":{"@type":"PostalAddress","streetAddress":"3060 Williams Drive, Suite 300","addressLocality":"Fairfax","addressRegion":"VA","postalCode":"22031","addressCountry":"US"},"areaServed":{"@type":"City","name":"Fairfax"},"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Fairfax County, Virginia</span>
  <h1>Psychiatric Nurse Practitioner<br>in Fairfax, Virginia</h1>
  <p>Board-certified psychiatric care for adults in one of the most high-achieving — and quietly high-pressure — counties in the country.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">About this practice</span>
    <h2 class="loc-h2">The pressure in Fairfax is real — even when it doesn't look like it.</h2>
    <p class="loc-p">Fairfax County is one of the highest-income, highest-educated, and most achievement-oriented counties in the United States. The schools are competitive. The careers are demanding. The cost of living is significant. And the unspoken expectation — that if you live here, you should be doing fine — creates a particular kind of silence around mental health.</p>
    <p class="loc-p">Alice Tran, PMHNP-BC, FNP-BC provides psychiatric evaluations, medication management, and supportive therapy for adults in Fairfax via telehealth. Her office is located at 3060 Williams Drive, Suite 300 in Fairfax — but all care is delivered remotely, which means you don't need to fight Fairfax traffic to get help.</p>
    <p class="loc-p">She treats anxiety, depression, ADHD, trauma, burnout, and more — in English and Vietnamese — for adults ages 18 to 65 across Fairfax and the surrounding area.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner--w">
    <span class="loc-tag">Who comes here for care</span>
    <h2 class="loc-h2">Fairfax brings a specific kind of patient.</h2>
    <div class="loc-grid" style="margin-top:1.75rem;">
      <div>
        <p class="loc-p">Federal contractors and government employees who carry classified stress they can't bring home. Tech workers navigating layoffs and identity. Parents holding their families together while quietly falling apart. First-generation immigrants who built everything here and now feel the weight of what that cost.</p>
        <p class="loc-p">And increasingly: adults who never thought they'd need psychiatric care, who have been "managing" for years, and who are finally tired of managing alone.</p>
        <p class="loc-p">These are the people Alice sees. Her approach is whole-person and unhurried — a full hour for a first visit, because your history deserves that kind of time.</p>
      </div>
      <div class="loc-card" style="align-self:start;">
        <h3>What PMHNP-BC means</h3>
        <p>A Psychiatric Mental Health Nurse Practitioner (PMHNP-BC) is a board-certified advanced practice nurse who specializes in mental health — licensed to diagnose, treat, and prescribe. Alice is also board-certified as a Family Nurse Practitioner (FNP-BC), meaning she sees the full person, not just the diagnosis. In Virginia, PMHNPs practice independently and provide the same scope of psychiatric care as a psychiatrist.</p>
      </div>
    </div>
  </div>
</section>

<section class="loc-s loc-s--dk">
  <div class="loc-inner--w">
    <span class="loc-tag loc-tag--lt" style="display:block;text-align:center;margin-bottom:.5rem;">Services in Fairfax</span>
    <h2 class="loc-h2 loc-h2--lt" style="text-align:center;margin-bottom:2rem;">What Alice provides</h2>
    <div class="loc-grid--3">
      <div class="loc-card--dk" data-reveal>
        <h3>Psychiatric Evaluation</h3>
        <p>A 60-minute initial visit to understand your history, current concerns, and goals. No rushed intake. We decide on next steps together, not before we've really talked.</p>
      </div>
      <div class="loc-card--dk" data-reveal style="--delay:80ms">
        <h3>Medication Management</h3>
        <p>Ongoing 30–50 minute follow-up visits to evaluate how treatment is working, adjust as needed, and make sure you understand what you're taking and why.</p>
      </div>
      <div class="loc-card--dk" data-reveal style="--delay:160ms">
        <h3>Supportive Therapy</h3>
        <p>Brief, focused psychotherapy woven into every appointment — addressing not just symptoms but the context of your life, relationships, and goals.</p>
      </div>
    </div>
    <p style="text-align:center;color:rgba(255,255,255,.45);font-size:.85rem;margin-top:1.75rem;">Telehealth only &middot; Adults ages 18&ndash;60 &middot; English &amp; Vietnamese</p>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">Common questions</span>
    <h2 class="loc-h2">What Fairfax patients usually ask</h2>
    <div style="margin-top:1.75rem;">
      <div class="loc-faq">
        <h3>Do you see patients in person in Fairfax?</h3>
        <p>Alice's practice is fully telehealth. While her office address is in Fairfax, all appointments are conducted via secure video. This works especially well for Fairfax residents — no navigating Route 50 or the Beltway for a 30-minute appointment.</p>
      </div>
      <div class="loc-faq">
        <h3>What insurance do you accept?</h3>
        <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
      </div>
      <div class="loc-faq">
        <h3>Can you treat ADHD in adults?</h3>
        <p>Yes. Adult ADHD — particularly in professionals and women — is frequently underdiagnosed. Alice provides comprehensive ADHD evaluation and prescribes medication when appropriate, including stimulant medication.</p>
      </div>
      <div class="loc-faq">
        <h3>How soon can I be seen?</h3>
        <p>Availability varies. The best way to check is to <a href="https://alicetran.intakeq.com/booking" target="_blank" style="color:var(--forest);font-weight:600;">view the online booking calendar</a> directly, which shows real-time availability. If you don't see a time that works, reach out — there are sometimes cancellations.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Accepting new patients in Fairfax, VA.</h2>
  <p>Telehealth. Board-certified. English &amp; Vietnamese.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book Now &rarr;</a>
</div>`
},

// ── 2. MEDICATION MANAGEMENT FAIRFAX ─────────────────────────────────────────
{
  filename: 'medication-management-fairfax-va.html',
  title: 'Medication Management in Fairfax, VA | Psychiatric Care | Alice Tran, PMHNP-BC',
  desc: 'Psychiatric medication management in Fairfax, VA via telehealth. Alice Tran, PMHNP-BC explains what medication management actually is, what to expect, and how it works for anxiety, depression, ADHD, and more.',
  keywords: 'medication management Fairfax VA, psychiatric medication Fairfax Virginia, psychiatrist prescribe medication Fairfax, anxiety medication management NoVA, depression medication Fairfax, ADHD medication Virginia telehealth',
  canonical: 'https://alicetrannp.com/pages/medication-management-fairfax-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","address":{"@type":"PostalAddress","streetAddress":"3060 Williams Drive, Suite 300","addressLocality":"Fairfax","addressRegion":"VA","postalCode":"22031","addressCountry":"US"},"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Fairfax County, Virginia</span>
  <h1>Medication Management<br>in Fairfax, Virginia</h1>
  <p>Psychiatric medication management is not just getting a prescription. Here is what it actually involves — and why it matters.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">What this actually means</span>
    <h2 class="loc-h2">Most people don't know what "medication management" involves. Here's the honest version.</h2>
    <p class="loc-p">The term sounds clinical and transactional — like a pharmacy visit. It's not. Psychiatric medication management is an ongoing, collaborative process between you and your provider. It involves understanding what's happening in your life, evaluating whether medication is appropriate, choosing the right option for you specifically, starting at the right dose, and checking in regularly to see how it's actually working.</p>
    <p class="loc-p">Alice Tran, PMHNP-BC provides medication management for adults in Fairfax and across Northern Virginia via telehealth. She is board-certified in psychiatric mental health and sees medication as one part of a larger picture — not the whole answer, and never the first conversation.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner--w">
    <span class="loc-tag">The process</span>
    <h2 class="loc-h2">What actually happens at a medication management appointment</h2>
    <div class="loc-grid" style="margin-top:1.75rem;">
      <div class="loc-card" data-reveal>
        <h3>The first visit (60 minutes)</h3>
        <p>This is a full psychiatric evaluation, not a prescription consultation. Alice takes a complete history: your symptoms, when they started, what's changed, what you've tried before, your family history, medications you're currently taking, and what your goals are. Medication may come up — but only after understanding the full picture. You leave the first visit with a care plan, not just a prescription.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:80ms">
        <h3>Follow-up visits (30–50 minutes)</h3>
        <p>After starting medication, follow-up visits check what's working and what isn't. Side effects are addressed. Doses are adjusted. Alice also asks about sleep, energy, mood, relationships, and stress — because medication results don't happen in a vacuum, and the rest of your life affects how well treatment works.</p>
      </div>
    </div>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">Common concerns</span>
    <h2 class="loc-h2">Things people worry about — addressed honestly.</h2>
    <div style="margin-top:1.75rem;">
      <div class="loc-faq">
        <h3>"I don't want to be on medication forever."</h3>
        <p>That's a completely reasonable concern, and one Alice hears often. Psychiatric medication is not always long-term. For some conditions (like a single episode of depression), a defined course of medication makes sense. For others, ongoing treatment is part of staying well — just like blood pressure medication. The conversation about duration starts at the beginning, not years later.</p>
      </div>
      <div class="loc-faq">
        <h3>"I'm worried about becoming dependent or addicted."</h3>
        <p>Most psychiatric medications — antidepressants, mood stabilizers, certain ADHD medications — are not addictive in the clinical sense. Some medications (like benzodiazepines) do carry dependency risk, and Alice discusses this explicitly before prescribing anything. Informed consent is not a formality here.</p>
      </div>
      <div class="loc-faq">
        <h3>"I've tried medication before and it didn't work."</h3>
        <p>This is very common. What didn't work before may not have been the right medication, the right dose, or the right length of time. Alice reviews your full medication history before making any recommendations. Previous treatment experience is important information, not a reason to give up.</p>
      </div>
      <div class="loc-faq">
        <h3>"Can I get medication on the first visit?"</h3>
        <p>Sometimes, yes — depending on the situation. For straightforward presentations of anxiety or depression where the picture is clear, it may make sense to begin treatment at the first visit. For more complex situations, Alice may want to gather more information first. The goal is to get it right, not to get it fast.</p>
      </div>
      <div class="loc-faq">
        <h3>What conditions does Alice prescribe for?</h3>
        <p>Anxiety disorders, depression, ADHD, bipolar disorder, OCD, PTSD, insomnia, postpartum depression, and more. See the <a href="conditions.html" style="color:var(--forest);font-weight:600;">full list of conditions</a> for details.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Medication management in Fairfax — done thoughtfully.</h2>
  <p>Telehealth. No waiting room. English &amp; Vietnamese.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book an Appointment &rarr;</a>
</div>`
},

// ── 3. TELEHEALTH NORTHERN VIRGINIA ──────────────────────────────────────────
{
  filename: 'telehealth-psychiatry-northern-virginia.html',
  title: 'Telehealth Psychiatry in Northern Virginia | Alice Tran, PMHNP-BC',
  desc: 'Telehealth psychiatric care for adults across Northern Virginia — Fairfax, Arlington, Alexandria, Reston, McLean, and beyond. Alice Tran, PMHNP-BC. No commute, no waiting room. Accepting new patients.',
  keywords: 'telehealth psychiatry Northern Virginia, online psychiatrist NoVA, telehealth mental health Northern Virginia, virtual psychiatric care Virginia, online PMHNP Northern Virginia, telehealth anxiety depression ADHD NoVA',
  canonical: 'https://alicetrannp.com/pages/telehealth-psychiatry-northern-virginia.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":{"@type":"State","name":"Virginia"},"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Northern Virginia &amp; Beyond</span>
  <h1>Telehealth Psychiatric Care<br>Across Northern Virginia</h1>
  <p>Adding a commute to an already overwhelming schedule is its own barrier to care. Telehealth removes it.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">The Northern Virginia reality</span>
    <h2 class="loc-h2">Northern Virginia has some of the worst traffic in the country. That's not a minor inconvenience — it's a real barrier to getting care.</h2>
    <p class="loc-p">A 20-minute drive to a psychiatrist's office can become 90 minutes during rush hour. A 50-minute appointment suddenly takes half a workday when you account for the drive there and back. For people already stretched thin — working long hours, managing families, commuting into DC — that time cost makes it easy to deprioritize mental health care indefinitely.</p>
    <p class="loc-p">Telehealth eliminates that barrier entirely. Alice Tran, PMHNP-BC sees patients across all of Northern Virginia via secure video appointment. You join from home, from your office, from your car, or wherever you have a few minutes of privacy. The appointment is the same — only the commute is different, because there isn't one.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner">
    <span class="loc-tag">How it works</span>
    <h2 class="loc-h2">What a telehealth psychiatric appointment actually looks like</h2>
    <div class="loc-grid" style="margin-top:1.75rem;align-items:start;">
      <div>
        <p class="loc-p">Alice uses <strong>doxy.me</strong> — a HIPAA-compliant video platform. You don't download an app. You click a link and you're in. It works on your phone, tablet, or computer.</p>
        <p class="loc-p">The appointment runs exactly like an in-person psychiatric visit. Alice takes a full history at your first visit, discusses your concerns without rushing, and builds a care plan with you. Follow-up visits review how things are going, adjust medication if needed, and check in on what else is happening in your life.</p>
        <p class="loc-p">The only thing that changes with telehealth is where you are when it happens. Some people find that being in their own space — their couch, their home office — makes the conversation easier, not harder.</p>
      </div>
      <div>
        <div class="loc-card" style="margin-bottom:1rem;">
          <h3>Privacy and security</h3>
          <p>All video appointments use HIPAA-compliant encryption. No recording. Your sessions are private. The only trace of your appointment is in your medical record — not your browser history, your insurance EOB (which says only "telehealth visit"), or your employer's systems.</p>
        </div>
        <div class="loc-card">
          <h3>What you need</h3>
          <p>A phone, tablet, or computer with a camera and microphone. A reasonably private space for the duration of your appointment. That's it. No downloads, no accounts to create.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner--w">
    <span class="loc-tag" style="display:block;text-align:center;">Areas served</span>
    <h2 class="loc-h2" style="text-align:center;margin-bottom:.75rem;">Serving adults across Northern Virginia and statewide</h2>
    <p class="loc-p" style="text-align:center;margin-bottom:1.5rem;">As a telehealth-only practice, Alice sees patients from any location in Virginia.</p>
    <div class="loc-tags" style="justify-content:center;">
      <span class="loc-tag-pill">Fairfax</span><span class="loc-tag-pill">Arlington</span>
      <span class="loc-tag-pill">Alexandria</span><span class="loc-tag-pill">McLean</span>
      <span class="loc-tag-pill">Reston</span><span class="loc-tag-pill">Herndon</span>
      <span class="loc-tag-pill">Vienna</span><span class="loc-tag-pill">Falls Church</span>
      <span class="loc-tag-pill">Annandale</span><span class="loc-tag-pill">Springfield</span>
      <span class="loc-tag-pill">Chantilly</span><span class="loc-tag-pill">Centreville</span>
      <span class="loc-tag-pill">Tysons</span><span class="loc-tag-pill">Ashburn</span>
      <span class="loc-tag-pill">Leesburg</span><span class="loc-tag-pill">Manassas</span>
      <span class="loc-tag-pill">Woodbridge</span><span class="loc-tag-pill">Richmond</span>
      <span class="loc-tag-pill">All of Virginia</span>
    </div>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner">
    <span class="loc-tag">Common questions</span>
    <h2 class="loc-h2">Telehealth questions answered</h2>
    <div style="margin-top:1.75rem;">
      <div class="loc-faq">
        <h3>Is telehealth psychiatry as effective as in-person?</h3>
        <p>Research consistently shows that telehealth psychiatric care produces outcomes comparable to in-person care for most conditions. For medication management and talk-based therapy, the quality of the conversation matters far more than the physical location. Many patients report feeling more comfortable and open when they're in their own environment.</p>
      </div>
      <div class="loc-faq">
        <h3>Can controlled substances be prescribed via telehealth?</h3>
        <p>Yes, under current Virginia and federal regulations, Alice can prescribe controlled substances including stimulant medications for ADHD via telehealth, following all applicable guidelines. This may require additional documentation at your initial visit.</p>
      </div>
      <div class="loc-faq">
        <h3>What if I have a technical issue during the appointment?</h3>
        <p>If the video connection drops, Alice's office will call you directly. Appointments are never abandoned due to technical difficulties — they're completed by phone if needed.</p>
      </div>
      <div class="loc-faq">
        <h3>Does insurance cover telehealth psychiatric visits?</h3>
        <p>Yes. Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar, all of which cover telehealth psychiatric services. Out-of-pocket patients are also welcome. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for details.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Psychiatric care anywhere in Northern Virginia.</h2>
  <p>No commute. No waiting room. Board-certified PMHNP. English &amp; Vietnamese.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book Now &rarr;</a>
</div>`
},

// ── 4. ARLINGTON ─────────────────────────────────────────────────────────────
{
  filename: 'psychiatric-care-arlington-va.html',
  title: 'Psychiatric Care in Arlington, VA | Telehealth Psychiatry | Alice Tran, PMHNP-BC',
  desc: 'Telehealth psychiatric care for adults in Arlington, VA. Alice Tran, PMHNP-BC treats anxiety, depression, ADHD, burnout, and life transitions for young professionals, transplants, and Arlington residents.',
  keywords: 'psychiatrist Arlington VA, psychiatric care Arlington Virginia, mental health provider Arlington VA, telehealth psychiatry Arlington, anxiety depression Arlington, ADHD Arlington Virginia, PMHNP Arlington VA',
  canonical: 'https://alicetrannp.com/pages/psychiatric-care-arlington-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":{"@type":"City","name":"Arlington"},"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Arlington, Virginia</span>
  <h1>Psychiatric Care<br>for Adults in Arlington, Virginia</h1>
  <p>You built a life here that looks good on paper. The inside of that life deserves the same attention.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">Who this is for</span>
    <h2 class="loc-h2">Arlington attracts ambitious, driven people. It also quietly exhausts them.</h2>
    <p class="loc-p">Arlington is dense, expensive, and full of people who came here for a reason — a policy job, a tech role, a career opportunity, proximity to power. Many are in their 20s and 30s, building careers and trying to figure out who they are at the same time. Many are highly accomplished by any external measure and feel surprisingly lost internally.</p>
    <p class="loc-p">The loneliness of Arlington is particular: it's a city where people are constantly around other people — at coffee shops, on the Rosslyn-Ballston corridor, at networking events — and still feel profoundly disconnected. The city rewards achievement. It doesn't always make space for difficulty.</p>
    <p class="loc-p">Alice Tran, PMHNP-BC provides psychiatric evaluations, medication management, and supportive therapy via telehealth for adults in Arlington. She sees people who are successful and struggling at the same time, and she doesn't find that contradiction surprising. It's more common than people admit.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner--w">
    <span class="loc-tag">What brings Arlington patients in</span>
    <h2 class="loc-h2">The most common reasons Arlington adults seek psychiatric care</h2>
    <div class="loc-grid--3" style="margin-top:1.75rem;">
      <div class="loc-card" data-reveal>
        <h3>Anxiety and performance pressure</h3>
        <p>The expectation to be always-on, always-impressive, always-optimizing. Anxiety in Arlington often looks like productivity — until it doesn't. When the output slows and the dread stays, it's time to talk.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:80ms">
        <h3>Burnout and career identity</h3>
        <p>High-achieving people often don't recognize burnout until it's severe. When the job that defined you stops feeling meaningful and rest stops feeling restful, that's a clinical problem — not a character flaw.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:160ms">
        <h3>Life transitions</h3>
        <p>New to Arlington, newly partnered, newly single, newly promoted, newly stuck. Change — even chosen change — creates a kind of grief. Psychiatric care can help navigate what isn't quite loss but isn't quite fine either.</p>
      </div>
      <div class="loc-card" data-reveal>
        <h3>Depression that hides well</h3>
        <p>High-functioning depression is real. You can hold a demanding job, maintain relationships, and appear fine while experiencing persistent emptiness, low motivation, and difficulty finding meaning. That deserves treatment.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:80ms">
        <h3>ADHD — finally diagnosed</h3>
        <p>Many adults in Arlington come to understand their ADHD only after years of compensating with overwork. The coping strategies get harder to sustain. A proper evaluation and treatment plan changes things.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:160ms">
        <h3>Isolation in a crowded city</h3>
        <p>Arlington is one of the most transient places in the country. People move in and out. Social networks are shallow by necessity. The loneliness that results is real, and it has clinical consequences.</p>
      </div>
    </div>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">Practical details</span>
    <h2 class="loc-h2">Why telehealth works especially well for Arlington</h2>
    <p class="loc-p">Arlington is one of the most walkable, transit-connected parts of Northern Virginia — but that doesn't mean finding parking near a psychiatrist's office is convenient, or that taking two hours out of a demanding workday is realistic. Telehealth solves that. Alice's appointments happen on your schedule, from wherever you are in Arlington — your apartment, your office, your car outside the coffee shop.</p>
    <div style="margin-top:2rem;">
      <div class="loc-faq">
        <h3>Do you treat people who are new to psychiatric care?</h3>
        <p>Frequently. Many Arlington patients have never seen a psychiatrist or PMHNP before. The first visit is designed to be a conversation, not an evaluation to pass. You don't need to know the right words or have the right diagnosis going in.</p>
      </div>
      <div class="loc-faq">
        <h3>Can therapy and medication happen at the same practice?</h3>
        <p>Alice provides supportive therapy integrated into every appointment. For deeper therapeutic work — trauma processing, CBT — she may recommend a therapist in addition to psychiatric care. She is happy to coordinate with other providers you're already seeing.</p>
      </div>
      <div class="loc-faq">
        <h3>What if I'm not sure I need psychiatry specifically?</h3>
        <p>A psychiatric evaluation can help answer that. Alice will be honest about whether medication is appropriate, whether therapy alone might be a better fit, or whether a different kind of support makes more sense. The goal is the right care, not more care.</p>
      </div>
      <div class="loc-faq">
        <h3>What insurance do you accept?</h3>
        <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Psychiatric care for Arlington adults.</h2>
  <p>Telehealth. Thoughtful. No waitlist games — just check availability online.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book Now &rarr;</a>
</div>`
},

// ── 5. ALEXANDRIA ────────────────────────────────────────────────────────────
{
  filename: 'psychiatric-care-alexandria-va.html',
  title: 'Psychiatric Care in Alexandria, VA | Telehealth Psychiatry | Alice Tran, PMHNP-BC',
  desc: 'Telehealth psychiatric care for adults in Alexandria, VA. Alice Tran, PMHNP-BC serves Alexandria residents including military families, federal employees, and adults navigating life transitions. New patients welcome.',
  keywords: 'psychiatrist Alexandria VA, psychiatric care Alexandria Virginia, mental health provider Alexandria VA, telehealth psychiatry Alexandria, military mental health Alexandria Virginia, PMHNP Alexandria VA, anxiety depression Alexandria',
  canonical: 'https://alicetrannp.com/pages/psychiatric-care-alexandria-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":{"@type":"City","name":"Alexandria"},"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Alexandria, Virginia</span>
  <h1>Psychiatric Care<br>for Adults in Alexandria, Virginia</h1>
  <p>Alexandria is a city of arrivals. New jobs, new relationships, new chapters. Adjusting is harder than people admit — and easier with the right support.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">Who comes here</span>
    <h2 class="loc-h2">Alexandria brings together people in the middle of something.</h2>
    <p class="loc-p">There is something particular about Alexandria — the way it holds long-time families next to people who arrived six months ago and aren't quite sure they'll stay. Federal workers, military families rotating through Fort Belvoir, professionals who chose Old Town for its character and are now navigating what it actually costs to live there, recent divorcees, new parents, people mid-career who quietly stopped knowing what they wanted.</p>
    <p class="loc-p">The mental health needs in Alexandria are diverse, but the common thread is transition. Change — even welcome change — creates psychological weight. The move, the promotion, the relationship shift, the loss, the thing that should feel like progress but somehow doesn't. Alice Tran, PMHNP-BC specializes in exactly this.</p>
    <p class="loc-p">She provides psychiatric evaluations, medication management, and supportive therapy for adults in Alexandria via telehealth. No commute, no waiting room, just an appointment that fits into your actual life.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner--w">
    <span class="loc-tag">What Alice treats in Alexandria</span>
    <h2 class="loc-h2">Conditions that bring Alexandria patients to psychiatric care</h2>
    <div class="loc-grid" style="margin-top:1.75rem;">
      <div>
        <div class="loc-card" style="margin-bottom:1.25rem;" data-reveal>
          <h3>Adjustment and life transitions</h3>
          <p>Relocation, career change, relationship transitions, new parenthood — adjusting is not weakness. When the adjustment period extends or deepens beyond what feels normal, psychiatric support can help you move through it rather than around it.</p>
        </div>
        <div class="loc-card" data-reveal style="--delay:80ms">
          <h3>Anxiety and uncertainty</h3>
          <p>Generalized anxiety, panic attacks, and the particular dread of not knowing what comes next. Alexandria's proximity to federal government and policy work creates its own ambient uncertainty — Alice understands the professional context her patients live in.</p>
        </div>
      </div>
      <div>
        <div class="loc-card" style="margin-bottom:1.25rem;" data-reveal>
          <h3>Military-related mental health</h3>
          <p>Serving families and veterans in Alexandria and near Fort Belvoir. PTSD, adjustment after deployment, caregiver burnout, and the difficulty of accessing care during and after service. Telehealth is especially practical for military families navigating frequent moves and schedule unpredictability.</p>
        </div>
        <div class="loc-card" data-reveal style="--delay:80ms">
          <h3>Depression and grief</h3>
          <p>Including grief that doesn't fit the expected categories — the end of a career chapter, the loss of an identity, the quiet mourning of a version of your life you didn't end up living. Alice's approach to depression includes both medication when appropriate and the space to name what's actually happening.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">Questions &amp; practicalities</span>
    <h2 class="loc-h2">What Alexandria patients often want to know</h2>
    <div style="margin-top:1.75rem;">
      <div class="loc-faq">
        <h3>Do you see military veterans and active-duty family members?</h3>
        <p>Yes. Alice provides care for veterans, active-duty family members, and civilians navigating military-related mental health concerns. She accepts several major insurers and can discuss out-of-pocket options for those using Tricare who need a non-network provider.</p>
      </div>
      <div class="loc-faq">
        <h3>Can I start seeing you while I'm also seeing a therapist?</h3>
        <p>Absolutely — this is ideal, actually. A therapist and a psychiatrist or PMHNP serve different but complementary roles. Alice is happy to coordinate care with your therapist, with your permission, and often recommends adding therapy for patients who would benefit from it.</p>
      </div>
      <div class="loc-faq">
        <h3>What if I move away from Alexandria?</h3>
        <p>Because Alice's practice is fully telehealth, she can continue seeing you anywhere in Virginia after you move. Many patients who came to her while living in Alexandria continue their care after relocating elsewhere in the state.</p>
      </div>
      <div class="loc-faq">
        <h3>How do I know if I need medication versus just therapy?</h3>
        <p>That's exactly the kind of question a psychiatric evaluation is designed to answer. Alice takes the full picture into account before recommending anything, and she will be direct about whether medication makes sense for your specific situation — and what the alternatives are if it doesn't.</p>
      </div>
      <div class="loc-faq">
        <h3>What insurance do you accept?</h3>
        <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Psychiatric care for Alexandria adults.</h2>
  <p>Telehealth. Thoughtful. Accepting new patients.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book Now &rarr;</a>
</div>`
},

// ── 6. VIETNAMESE FAIRFAX ────────────────────────────────────────────────────
{
  filename: 'vietnamese-psychiatric-care-fairfax-va.html',
  title: 'Vietnamese Psychiatric Care in Fairfax, VA | Alice Tran, PMHNP-BC',
  desc: 'Vietnamese-speaking psychiatric care in Fairfax, Annandale, and Northern Virginia. Alice Tran, PMHNP-BC provides psychiatric evaluations and medication management in English and Vietnamese for the Vietnamese community in Fairfax County.',
  keywords: 'Vietnamese psychiatrist Fairfax VA, bác sĩ tâm thần Fairfax Virginia, Vietnamese mental health provider Annandale VA, Vietnamese speaking PMHNP Fairfax, chăm sóc sức khỏe tâm thần tiếng Việt Fairfax, Vietnamese psychiatric care Northern Virginia',
  canonical: 'https://alicetrannp.com/pages/vietnamese-psychiatric-care-fairfax-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":[{"@type":"City","name":"Fairfax"},{"@type":"City","name":"Annandale"},{"@type":"City","name":"Falls Church"}],"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Chăm sóc sức khỏe tâm thần bằng tiếng Việt · Fairfax, VA</span>
  <h1>Vietnamese-Speaking Psychiatric Care<br>in Fairfax and Annandale, Virginia</h1>
  <p>For the Vietnamese community in Fairfax County — care in the language that feels like home, from a provider who understands the cultural context you grew up in.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">About this community</span>
    <h2 class="loc-h2">The Fairfax Vietnamese community is one of the oldest and most established in the country.</h2>
    <p class="loc-p">The Vietnamese community in Fairfax County — stretching through Annandale, Springfield, and the surrounding corridor — has been here since the late 1970s and early 1980s. It is now multi-generational: grandparents who came after 1975, parents who rebuilt their lives from nothing, and children who grew up American but Vietnamese at home.</p>
    <p class="loc-p">Each generation carries something different. The first generation carries the weight of what they left and what they built. The second generation carries the gap between two worlds — Vietnamese enough for family, American enough for everything else. Both deserve psychiatric care that understands what that actually means, not just a translated intake form.</p>
    <p class="loc-p">Alice Tran, PMHNP-BC grew up in this in-between space. She provides psychiatric evaluations, medication management, and supportive therapy fully in Vietnamese for adults in Fairfax, Annandale, Springfield, and across Northern Virginia via telehealth.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner--w">
    <span class="loc-tag">Two generations, different needs</span>
    <h2 class="loc-h2">What Alice hears from Vietnamese patients in Fairfax</h2>
    <div class="loc-grid" style="margin-top:1.75rem;">
      <div class="loc-card" data-reveal>
        <h3>First-generation immigrants</h3>
        <p style="margin-bottom:.75rem;">"Tôi chưa bao giờ nói chuyện với ai về chuyện này."<br><em style="font-size:.85rem;color:var(--green-lt);">"I have never talked to anyone about this."</em></p>
        <p>For many Vietnamese adults who came here as refugees or immigrants, mental health was a luxury — something for people who had the time and safety to be fragile. The idea of asking for help can feel like an admission of failure, or a betrayal of everything they survived to build. Alice works within that frame, not against it. She understands the cultural logic of endurance — and when endurance has become a harm rather than a strength.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:80ms">
        <h3>Second-generation Vietnamese Americans</h3>
        <p style="margin-bottom:.75rem;">"Tôi không biết mình thuộc về đâu."<br><em style="font-size:.85rem;color:var(--green-lt);">"I don't know where I belong."</em></p>
        <p>The children of immigrants face a different weight: the pressure to succeed enough to justify the sacrifice, the guilt of wanting a life that looks different from what was expected, the identity dissonance of being Vietnamese at home and American everywhere else. Alice sees these experiences not as cultural curiosities but as legitimate clinical material — things worth naming and treating.</p>
      </div>
    </div>
  </div>
</section>

<section class="loc-s loc-s--dk">
  <div class="loc-inner">
    <span class="loc-tag loc-tag--lt" style="display:block;text-align:center;margin-bottom:.5rem;">Dịch vụ · Services</span>
    <h2 class="loc-h2 loc-h2--lt" style="text-align:center;margin-bottom:.5rem;">Provided fully in Vietnamese if preferred</h2>
    <p class="loc-p loc-p--lt" style="text-align:center;margin-bottom:2rem;">No interpreter. No translation delay. The whole appointment, in the language you think in.</p>
    <div class="loc-grid--3">
      <div class="loc-card--dk" data-reveal>
        <h3>Đánh giá tâm thần</h3>
        <p style="color:rgba(255,255,255,.5);font-size:.82rem;margin-bottom:.5rem;">Psychiatric Evaluation</p>
        <p>A full 60-minute intake appointment conducted in Vietnamese. Your history, your symptoms, your goals — in the language where you can actually express them accurately.</p>
      </div>
      <div class="loc-card--dk" data-reveal style="--delay:80ms">
        <h3>Thuốc tâm thần</h3>
        <p style="color:rgba(255,255,255,.5);font-size:.82rem;margin-bottom:.5rem;">Medication Management</p>
        <p>Medication options explained clearly in Vietnamese — what each medication does, why it's being considered, what side effects to watch for, and how long to expect before seeing results.</p>
      </div>
      <div class="loc-card--dk" data-reveal style="--delay:160ms">
        <h3>Liệu pháp hỗ trợ</h3>
        <p style="color:rgba(255,255,255,.5);font-size:.82rem;margin-bottom:.5rem;">Supportive Therapy</p>
        <p>Brief, culturally attuned therapy woven into every visit. Family dynamics, immigration experience, intergenerational expectations — all welcome topics, in whatever language they come out in.</p>
      </div>
    </div>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">Câu hỏi thường gặp · Common questions</span>
    <h2 class="loc-h2">What Vietnamese families in Fairfax often ask</h2>
    <div style="margin-top:1.75rem;">
      <div class="loc-faq">
        <h3>Can my parents be part of the appointment?</h3>
        <p>Yes — with your consent. Many Vietnamese families make mental health decisions together, and Alice welcomes that. She can speak directly with family members in Vietnamese, explain the diagnosis and treatment plan, and answer their questions. Their involvement, when you want it, is an asset — not an obstacle.</p>
      </div>
      <div class="loc-faq">
        <h3>My parents don't believe in mental health treatment. How do I talk to them?</h3>
        <p>This is one of the most common questions Alice hears. She can help you think through how to approach the conversation with your family — what language might land, what to expect, and how to manage the gap between what you know you need and what your family understands about it. You are not alone in this.</p>
      </div>
      <div class="loc-faq">
        <h3>Is there stigma in asking for help?</h3>
        <p>Within many Vietnamese families, yes — there can be. Alice does not pretend that isn't real. She also knows that the people who show up for this appointment have often already crossed a significant internal threshold just to be there. That takes courage, and it is treated as such.</p>
      </div>
      <div class="loc-faq">
        <h3>Do you serve the Annandale and Springfield Vietnamese communities specifically?</h3>
        <p>Yes. Via telehealth, Alice serves the Vietnamese communities throughout the Fairfax corridor — Annandale, Springfield, Centreville, Chantilly, and the surrounding areas. Patients join from their homes, which means no one has to find parking near Eden Center to get care.</p>
      </div>
      <div class="loc-faq">
        <h3>What insurance do you accept?</h3>
        <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Ch&#259;m s&#243;c s&#7913;c kh&#7887;e t&#226;m th&#7847;n b&#7857;ng ti&#7871;ng Vi&#7879;t t&#7841;i Fairfax, VA.</h2>
  <p>Psychiatric care in English and Vietnamese. Telehealth. New patients welcome.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book an Appointment &rarr;</a>
  <p style="margin-top:1.25rem;font-size:.9rem;color:rgba(255,255,255,.4);">Or call/text: <a href="tel:7038295227" style="color:rgba(255,255,255,.65);">(703) 829-5227</a></p>
</div>`
}

]; // end pages array

// ─────────────────────────────────────────────
// GENERATOR
// ─────────────────────────────────────────────

for (const p of pages) {
  const html = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>${p.title}</title>
  <meta name="description" content="${p.desc}" />
  <meta name="keywords" content="${p.keywords}" />
  <link rel="canonical" href="${p.canonical}" />
  ${CSS}
  <meta property="og:type" content="website" />
  <meta property="og:title" content="${p.title}" />
  <meta property="og:description" content="${p.desc}" />
  <meta property="og:url" content="${p.canonical}" />
  <meta property="og:image" content="https://alicetrannp.com/img/preview.jpg" />
  <script type="application/ld+json">${p.schema}<\/script>
  <link rel="icon" href="../img/logo.png" type="image/png" />
</head>
<body>
${NAV}
${p.body}
${FOOTER}
</body>
</html>`;

  const fp = path.join(__dirname, 'pages', p.filename);
  fs.writeFileSync(fp, html);
  console.log('Created:', p.filename);
}

console.log('\nAll city pages generated.');
