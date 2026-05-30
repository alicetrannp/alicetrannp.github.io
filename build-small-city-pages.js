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
      <span style="font-size:12px;color:#4a5e44;display:block;line-height:2;">Fax: (703) 970-1541</span>
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
        <b>Monday</b> 10am &ndash; 4pm<br>
        <b>Tuesday</b> 10am &ndash; 4pm<br>
        <b>Wednesday</b> 10am &ndash; 4pm<br>
        <b>Thursday</b> 10am &ndash; 4pm<br>
        <b>Friday</b> Closed<br>
        <b>Saturday</b> Closed<br>
        <b>Sunday</b> Closed
      </p>
    </div>
  </div>
  <div class="footer-copy">&copy; 2026 Alice Tran Psychiatric Care LLC. All rights reserved. &nbsp;&middot;&nbsp; <a href="privacy.html">Privacy</a> &middot; <a href="terms.html">Terms</a> &middot; <a href="disclaimer.html">Disclaimer</a> &middot; <a href="accessibility.html">Accessibility</a></div>
</footer>
<script>function toggleMenu(){document.getElementById('mobileMenu').classList.toggle('open');}</script>`;

const CSS = `<link rel="preload" href="../css/fonts.css" as="style" onload="this.onload=null;this.rel='stylesheet'">
  <noscript><link rel="stylesheet" href="../css/fonts.css"></noscript>
  <link rel="stylesheet" href="../css/style.css" />
  <style>
    .sm-hero{background:var(--forest);padding:64px clamp(1.5rem,6vw,4rem) 52px;text-align:center;}
    .sm-hero .section-tag{display:inline-block;font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:var(--sage-dk);font-weight:600;margin-bottom:1.1rem;}
    .sm-hero h1{font-family:var(--serif);font-size:clamp(1.8rem,4vw,2.75rem);font-weight:300;color:#fff;line-height:1.2;margin:0 0 1rem;max-width:680px;margin-left:auto;margin-right:auto;}
    .sm-hero p{color:rgba(255,255,255,.72);font-size:.97rem;line-height:1.85;max-width:540px;margin:0 auto 1.75rem;}
    .sm-s{padding:52px clamp(1.5rem,5vw,3.5rem);}
    .sm-s--alt{background:var(--sage-lt);}
    .sm-inner{max-width:760px;margin:0 auto;}
    .sm-tag{font-size:.72rem;letter-spacing:.22em;text-transform:uppercase;color:var(--green);font-weight:600;display:block;margin-bottom:.75rem;}
    .sm-h2{font-family:var(--serif);font-size:clamp(1.5rem,3vw,2.1rem);font-weight:300;color:var(--forest);line-height:1.3;margin:0 0 1rem;}
    .sm-p{font-size:1rem;color:var(--green-md);line-height:1.85;margin:0 0 1rem;}
    .sm-grid{display:grid;grid-template-columns:1fr 1fr;gap:1.25rem;margin-top:1.25rem;}
    .sm-item{background:#fff;border:1px solid var(--border);border-radius:12px;padding:1.25rem 1.5rem;}
    .sm-item h3{font-family:var(--serif);font-size:1.1rem;font-weight:400;color:var(--forest);margin:0 0 .35rem;}
    .sm-item p{font-size:.9rem;color:var(--green-md);line-height:1.65;margin:0;}
    .sm-tags{display:flex;flex-wrap:wrap;gap:.5rem;margin-top:1rem;}
    .sm-pill{display:inline-block;background:var(--sage-md);color:var(--forest);font-size:.82rem;font-weight:500;padding:.3rem .85rem;border-radius:999px;}
    .sm-faq+.sm-faq{border-top:1px solid var(--border);padding-top:1.25rem;margin-top:1.25rem;}
    .sm-faq h3{font-family:var(--serif);font-size:1.05rem;font-weight:400;color:var(--forest);margin:0 0 .35rem;}
    .sm-faq p{font-size:.92rem;color:var(--green-md);line-height:1.75;margin:0;}
    .sm-cta{background:var(--forest);text-align:center;padding:52px clamp(1.5rem,5vw,3.5rem);}
    .sm-cta h2{font-family:var(--serif);font-size:clamp(1.5rem,3vw,2.2rem);font-weight:300;color:#fff;margin:0 0 .75rem;}
    .sm-cta p{color:rgba(255,255,255,.65);margin:0 0 1.5rem;font-size:.95rem;}
    @media(max-width:600px){.sm-grid{grid-template-columns:1fr;}}
  </style>`;

const pages = [

// ── FALLS CHURCH ──────────────────────────────────────────────────────────────
{
  filename: 'psychiatric-care-falls-church-va.html',
  title: 'Psychiatric Care in Falls Church, VA | Telehealth | Alice Tran, PMHNP-BC',
  desc: 'Telehealth psychiatric care for adults in Falls Church, VA. Alice Tran, PMHNP-BC offers psychiatric evaluations, medication management, and therapy for anxiety, depression, ADHD, and more. Accepting new patients.',
  keywords: 'psychiatrist Falls Church VA, psychiatric care Falls Church Virginia, mental health provider Falls Church VA, telehealth psychiatry Falls Church, anxiety depression Falls Church, ADHD Falls Church Virginia, PMHNP Falls Church VA',
  canonical: 'https://alicetrannp.com/pages/psychiatric-care-falls-church-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":{"@type":"City","name":"Falls Church"},"availableLanguage":["English","Vietnamese"],"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday"],"opens":"10:00","closes":"16:00"}]}`,
  body: `
<div class="sm-hero">
  <span class="section-tag">Falls Church, Virginia</span>
  <h1>Psychiatric Care for Adults<br>in Falls Church, Virginia</h1>
  <p>Falls Church is small by Virginia standards but carries the full weight of Northern Virginia living — the costs, the commutes, the competition. Telehealth psychiatric care that fits your life here.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.75rem 1.85rem;">Book an Appointment &rarr;</a>
</div>

<section class="sm-s">
  <div class="sm-inner">
    <span class="sm-tag">About this practice</span>
    <h2 class="sm-h2">Small city, very real pressure.</h2>
    <p class="sm-p">Falls Church is one of the smallest independent cities in the United States — but it sits at the intersection of some of the most demanding suburban pressure in the country. The schools are among the most competitive in Virginia. The cost of living reflects the proximity to DC. And many Falls Church residents are commuting into Arlington, Tysons, or the city itself, carrying work stress home to a community that expects a lot.</p>
    <p class="sm-p">Alice Tran, PMHNP-BC provides telehealth psychiatric evaluations, medication management, and supportive therapy for adults in Falls Church and the surrounding area. She is board-certified in psychiatric mental health, sees patients in English and Vietnamese, and conducts all appointments via secure video — no traffic, no parking, no waiting room.</p>

    <div class="sm-grid">
      <div class="sm-item">
        <h3>Psychiatric Evaluation</h3>
        <p>A 60-minute first visit to understand your history, symptoms, and goals before building a care plan together.</p>
      </div>
      <div class="sm-item">
        <h3>Medication Management</h3>
        <p>Ongoing follow-up visits (30&ndash;50 min) to review how treatment is working and adjust as needed.</p>
      </div>
      <div class="sm-item">
        <h3>Supportive Therapy</h3>
        <p>Brief, focused psychotherapy woven into every appointment — not a separate service, part of the visit.</p>
      </div>
      <div class="sm-item">
        <h3>English &amp; Vietnamese</h3>
        <p>Full care in Vietnamese for the Falls Church Vietnamese community. No interpreter needed.</p>
      </div>
    </div>
  </div>
</section>

<section class="sm-s sm-s--alt">
  <div class="sm-inner">
    <span class="sm-tag">Conditions treated</span>
    <h2 class="sm-h2">What Alice treats for Falls Church adults</h2>
    <div class="sm-tags">
      <span class="sm-pill">Anxiety</span>
      <span class="sm-pill">Depression</span>
      <span class="sm-pill">ADHD</span>
      <span class="sm-pill">Burnout</span>
      <span class="sm-pill">Insomnia</span>
      <span class="sm-pill">Trauma &amp; PTSD</span>
      <span class="sm-pill">Bipolar Disorder</span>
      <span class="sm-pill">OCD</span>
      <span class="sm-pill">Postpartum Depression</span>
      <span class="sm-pill">Life Transitions</span>
      <span class="sm-pill">Panic Disorder</span>
      <span class="sm-pill">Cultural Stress</span>
    </div>
    <p class="sm-p" style="margin-top:1.25rem;">Not sure if your concern is on this list? <a href="contact.html" style="color:var(--forest);font-weight:600;">Reach out</a> — you do not have to name it perfectly to be welcome here.</p>
  </div>
</section>

<section class="sm-s">
  <div class="sm-inner">
    <span class="sm-tag">Common questions</span>
    <h2 class="sm-h2">Falls Church patients often ask</h2>
    <div class="sm-faq">
      <h3>What insurance do you accept?</h3>
      <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
    </div>
    <div class="sm-faq">
      <h3>Do you see patients who have never been to a psychiatrist before?</h3>
      <p>Yes — frequently. The first visit is a conversation, not a test. You do not need a prior diagnosis or a referral. You just need to show up.</p>
    </div>
    <div class="sm-faq">
      <h3>Can you treat ADHD in adults?</h3>
      <p>Yes. Alice provides comprehensive adult ADHD evaluation and prescribes medication when appropriate, including stimulant medication via telehealth under current Virginia regulations.</p>
    </div>
    <div class="sm-faq">
      <h3>How quickly can I be seen?</h3>
      <p>Check the <a href="https://alicetran.intakeq.com/booking" target="_blank" style="color:var(--forest);font-weight:600;">online booking calendar</a> for real-time availability. If you do not see a slot that works, call or text (703) 829-5227.</p>
    </div>
  </div>
</section>

<div class="sm-cta">
  <h2>Accepting new patients in Falls Church, VA.</h2>
  <p>Telehealth. Board-certified. English &amp; Vietnamese.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.75rem 1.85rem;display:inline-block;">Book Now &rarr;</a>
  <p style="margin-top:1rem;font-size:.88rem;color:rgba(255,255,255,.45);">Or call/text: <a href="tel:7038295227" style="color:rgba(255,255,255,.7);">(703) 829-5227</a></p>
</div>`
},

// ── TYSONS ────────────────────────────────────────────────────────────────────
{
  filename: 'psychiatric-care-tysons-va.html',
  title: 'Psychiatric Care in Tysons, VA | Telehealth | Alice Tran, PMHNP-BC',
  desc: 'Telehealth psychiatric care for adults in Tysons, VA. Alice Tran, PMHNP-BC serves the Tysons corporate corridor — anxiety, burnout, ADHD, and depression treatment for working adults. No commute needed.',
  keywords: 'psychiatrist Tysons VA, psychiatric care Tysons Corner Virginia, mental health provider Tysons VA, telehealth psychiatry Tysons, anxiety burnout Tysons Corner, ADHD Tysons Virginia, PMHNP Tysons VA, mental health Tysons Corner',
  canonical: 'https://alicetrannp.com/pages/psychiatric-care-tysons-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":{"@type":"City","name":"Tysons"},"availableLanguage":["English","Vietnamese"],"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday"],"opens":"10:00","closes":"16:00"}]}`,
  body: `
<div class="sm-hero">
  <span class="section-tag">Tysons, Virginia</span>
  <h1>Psychiatric Care for Adults<br>in Tysons, Virginia</h1>
  <p>Tysons is one of the most concentrated corporate corridors on the East Coast. The stress that comes with it is real — and it deserves real care. Telehealth means you can fit an appointment into your workday without a commute.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.75rem 1.85rem;">Book an Appointment &rarr;</a>
</div>

<section class="sm-s">
  <div class="sm-inner">
    <span class="sm-tag">Who this is for</span>
    <h2 class="sm-h2">Tysons runs on performance. That has a cost.</h2>
    <p class="sm-p">Tysons Corner and Tysons Galleria sit at the center of one of the largest concentrations of corporate offices, consulting firms, government contractors, and financial services companies in Northern Virginia. The people who work here are driven, capable, and often quietly overwhelmed. The culture rewards output and does not leave much space for the conversation that actually needs to happen.</p>
    <p class="sm-p">Alice Tran, PMHNP-BC provides telehealth psychiatric care for adults in Tysons and the surrounding area — McLean, Vienna, and the Beltway corridor. Because her practice is fully telehealth, Tysons workers can join an appointment from their office, their car, or anywhere private — without blocking out half a day for the drive and waiting room.</p>
    <p class="sm-p">She treats anxiety, burnout, depression, ADHD, and more — in English and Vietnamese — for adults ages 18 to 60.</p>

    <div class="sm-grid" style="margin-top:1.5rem;">
      <div class="sm-item">
        <h3>Work-related burnout</h3>
        <p>When the job that once defined you stops feeling meaningful and rest stops feeling restful, that is a clinical problem — not a character flaw.</p>
      </div>
      <div class="sm-item">
        <h3>High-functioning anxiety</h3>
        <p>The kind that looks like productivity. Perfectionism, constant planning, difficulty delegating — until it becomes disabling.</p>
      </div>
      <div class="sm-item">
        <h3>ADHD in professionals</h3>
        <p>Many Tysons-area professionals reach a point where the coping strategies stop working. Proper diagnosis and treatment changes things significantly.</p>
      </div>
      <div class="sm-item">
        <h3>Depression that hides well</h3>
        <p>High-functioning depression is real. You can hold a demanding job and appear fine while struggling internally. It responds well to treatment.</p>
      </div>
    </div>
  </div>
</section>

<section class="sm-s sm-s--alt">
  <div class="sm-inner">
    <span class="sm-tag">Practical details</span>
    <h2 class="sm-h2">Common questions from Tysons patients</h2>
    <div class="sm-faq">
      <h3>Can I do an appointment from my office?</h3>
      <p>Yes — anywhere you have a few minutes of privacy and a phone or laptop. Many patients join from a conference room, a parked car, or their office with the door closed. The appointment takes 30 to 60 minutes depending on whether it is an initial visit or follow-up.</p>
    </div>
    <div class="sm-faq">
      <h3>What insurance do you accept?</h3>
      <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
    </div>
    <div class="sm-faq">
      <h3>Is this confidential from my employer?</h3>
      <p>Yes. Your care is fully protected under HIPAA. Your employer has no access to your records. Your EOB will show only "telehealth visit" — not a diagnosis, provider name, or any clinical detail.</p>
    </div>
    <div class="sm-faq">
      <h3>Do I need a referral?</h3>
      <p>No referral is needed. You can book directly online or by calling the office. A referral from your primary care doctor is welcome but not required.</p>
    </div>
  </div>
</section>

<div class="sm-cta">
  <h2>Psychiatric care for Tysons adults.</h2>
  <p>Telehealth. No waiting room. Board-certified PMHNP.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.75rem 1.85rem;display:inline-block;">Book Now &rarr;</a>
  <p style="margin-top:1rem;font-size:.88rem;color:rgba(255,255,255,.45);">Or call/text: <a href="tel:7038295227" style="color:rgba(255,255,255,.7);">(703) 829-5227</a></p>
</div>`
},

// ── VIENNA ────────────────────────────────────────────────────────────────────
{
  filename: 'psychiatric-care-vienna-va.html',
  title: 'Psychiatric Care in Vienna, VA | Telehealth | Alice Tran, PMHNP-BC',
  desc: 'Telehealth psychiatric care for adults in Vienna, VA. Alice Tran, PMHNP-BC treats anxiety, depression, ADHD, burnout, and life transitions for Vienna residents and families. Accepting new patients.',
  keywords: 'psychiatrist Vienna VA, psychiatric care Vienna Virginia, mental health provider Vienna VA, telehealth psychiatry Vienna, anxiety depression Vienna Virginia, ADHD Vienna VA, PMHNP Vienna Virginia, mental health Vienna Fairfax County',
  canonical: 'https://alicetrannp.com/pages/psychiatric-care-vienna-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":{"@type":"City","name":"Vienna"},"availableLanguage":["English","Vietnamese"],"openingHoursSpecification":[{"@type":"OpeningHoursSpecification","dayOfWeek":["Monday","Tuesday","Wednesday","Thursday"],"opens":"10:00","closes":"16:00"}]}`,
  body: `
<div class="sm-hero">
  <span class="section-tag">Vienna, Virginia</span>
  <h1>Psychiatric Care for Adults<br>in Vienna, Virginia</h1>
  <p>Vienna has the feel of a real neighborhood — the trail, the town center, the schools people move here for. It also carries real pressure. Telehealth psychiatric care that fits the life you're actually living.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.75rem 1.85rem;">Book an Appointment &rarr;</a>
</div>

<section class="sm-s">
  <div class="sm-inner">
    <span class="sm-tag">About this practice</span>
    <h2 class="sm-h2">Vienna is one of the most livable communities in Northern Virginia. That does not make mental health struggles less real.</h2>
    <p class="sm-p">Vienna sits quietly between Tysons and Fairfax — walkable, well-resourced, and genuinely community-oriented in a way that many Northern Virginia suburbs are not. The W&amp;OD Trail runs through it. The schools draw families who care about education. It has the kind of character that makes people want to put down roots.</p>
    <p class="sm-p">It also has parents managing the pressure of competitive school environments, professionals commuting into DC or Tysons daily, adults navigating the weight of keeping everything together, and people who look fine from the outside and are not fine at all on the inside. Mental health struggles do not care about zip code or quality of life rankings.</p>
    <p class="sm-p">Alice Tran, PMHNP-BC provides telehealth psychiatric care for adults in Vienna and surrounding Fairfax County — including Oakton, Dunn Loring, Merrifield, and the Metro Orange and Silver Line corridor. She is board-certified in psychiatric mental health, sees patients in English and Vietnamese, and provides full evaluations, medication management, and supportive therapy via secure video.</p>

    <div class="sm-grid" style="margin-top:1.5rem;">
      <div class="sm-item">
        <h3>Anxiety &amp; panic</h3>
        <p>Generalized anxiety, panic disorder, and the particular strain of keeping up with a high-achieving community while managing internal dread.</p>
      </div>
      <div class="sm-item">
        <h3>Depression</h3>
        <p>Including high-functioning depression — when the schedule is full and the emptiness is real. Medication, therapy, or both depending on your situation.</p>
      </div>
      <div class="sm-item">
        <h3>ADHD</h3>
        <p>Comprehensive adult ADHD evaluation and treatment. Many Vienna adults reach this diagnosis later in life, after years of compensating silently.</p>
      </div>
      <div class="sm-item">
        <h3>Parenting stress &amp; postpartum</h3>
        <p>New parents and parents of school-age children navigating the particular pressure of raising kids in a community with high expectations for everyone involved.</p>
      </div>
    </div>
  </div>
</section>

<section class="sm-s sm-s--alt">
  <div class="sm-inner">
    <span class="sm-tag">Quick answers</span>
    <h2 class="sm-h2">What Vienna patients want to know</h2>
    <div class="sm-faq">
      <h3>What insurance do you accept?</h3>
      <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
    </div>
    <div class="sm-faq">
      <h3>Do you treat children or teenagers?</h3>
      <p>Alice's practice is for adults ages 18 to 60. For younger patients, she is happy to provide a referral recommendation if you reach out directly.</p>
    </div>
    <div class="sm-faq">
      <h3>Can I use the Metro to get to your office?</h3>
      <p>Alice's practice is fully telehealth — there is no in-person office to travel to. You join your appointment by video from wherever you are. Vienna's Silver Line access is great, but you won't need it for this.</p>
    </div>
    <div class="sm-faq">
      <h3>Do I need a diagnosis before booking?</h3>
      <p>No. The first appointment is the evaluation. You do not need to arrive knowing what is wrong — figuring that out together is part of what the first visit is for.</p>
    </div>
  </div>
</section>

<div class="sm-cta">
  <h2>Accepting new patients in Vienna, VA.</h2>
  <p>Telehealth. Thoughtful. Board-certified PMHNP. English &amp; Vietnamese.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.75rem 1.85rem;display:inline-block;">Book Now &rarr;</a>
  <p style="margin-top:1rem;font-size:.88rem;color:rgba(255,255,255,.45);">Or call/text: <a href="tel:7038295227" style="color:rgba(255,255,255,.7);">(703) 829-5227</a></p>
</div>`
}

]; // end pages

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
console.log('\nAll small city pages generated.');
