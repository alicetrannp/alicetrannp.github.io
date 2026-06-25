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

// ── 1. RICHMOND ──────────────────────────────────────────────────────────────
{
  filename: 'psychiatric-care-richmond-va.html',
  title: 'Psychiatric Care in Richmond, VA | Telehealth | Alice Tran, PMHNP-BC',
  desc: 'Telehealth psychiatric care for adults in Richmond, Henrico, Chesterfield, and Central Virginia. Alice Tran, PMHNP-BC offers psychiatric evaluations, medication management, and therapy. Accepting new patients.',
  keywords: 'psychiatrist Richmond VA, psychiatric care Richmond Virginia, telehealth psychiatry Richmond, mental health provider Richmond VA, PMHNP Richmond Virginia, anxiety depression ADHD Richmond, Henrico Chesterfield psychiatrist',
  canonical: 'https://alicetrannp.com/pages/psychiatric-care-richmond-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":[{"@type":"City","name":"Richmond"},{"@type":"City","name":"Henrico"},{"@type":"City","name":"Chesterfield"}],"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Richmond &amp; Central Virginia</span>
  <h1>Psychiatric Care<br>for Adults in Richmond, Virginia</h1>
  <p>Richmond is growing fast. The mental health system has not kept pace. Telehealth bridges that gap.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">Who this serves</span>
    <h2 class="loc-h2">Richmond has changed dramatically. Mental health care options in Central Virginia have not kept up.</h2>
    <p class="loc-p">Richmond has undergone a real transformation over the past decade. Young professionals are moving in. The arts district is thriving. VCU draws students and researchers from across the country. The suburbs of Henrico and Chesterfield are dense with working families, government employees, and healthcare workers who carry their own stress quietly.</p>
    <p class="loc-p">What hasn't changed fast enough is access to quality outpatient psychiatric care. Psychiatrists in the Richmond area often have long waitlists. Many practices are not accepting new patients. The gap between needing care and getting it can stretch into months.</p>
    <p class="loc-p">Alice Tran, PMHNP-BC provides telehealth psychiatric care for adults across the Richmond metro area — including Henrico, Chesterfield (Midlothian, Moseley), Hanover (Mechanicsville, Ashland), Goochland, and Powhatan. No commute across the city. No waiting room. Real appointments that actually happen.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner--w">
    <span class="loc-tag">What Richmond patients come for</span>
    <h2 class="loc-h2">The concerns that bring Central Virginia adults to psychiatric care</h2>
    <div class="loc-grid--3" style="margin-top:1.75rem;">
      <div class="loc-card" data-reveal>
        <h3>Anxiety and overwhelm</h3>
        <p>The particular anxiety of a city in flux — rising costs, shifting neighborhoods, career uncertainty after major life moves. Generalized anxiety, panic attacks, and social anxiety are among the most common reasons Richmond adults seek psychiatric care.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:80ms">
        <h3>Depression and low motivation</h3>
        <p>Depression often goes unrecognized in high-functioning adults. A VCU healthcare worker, a Chesterfield parent, a Shockoe Bottom professional — depression does not care about accomplishment. It responds well to treatment, especially when caught early.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:160ms">
        <h3>ADHD in adults</h3>
        <p>Many Richmond adults arrive at ADHD diagnoses later in life — after years of compensating with caffeine, overwork, and shame about their productivity. A proper evaluation and treatment plan changes things significantly.</p>
      </div>
      <div class="loc-card" data-reveal>
        <h3>Burnout</h3>
        <p>VCU Medical Center nurses and staff, Henrico county teachers, state government employees, and nonprofit workers across Richmond share a common experience: giving so much to their work that they have nothing left. Burnout is a clinical condition. It deserves clinical care.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:80ms">
        <h3>Life transitions</h3>
        <p>Moving to Richmond, leaving Richmond, new jobs, relationship changes, new parenthood, grief. Transitions — even good ones — carry weight. Supportive psychiatric care helps people move through change rather than get stuck in it.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:160ms">
        <h3>Postpartum mental health</h3>
        <p>Postpartum depression and anxiety affect a significant portion of new mothers and are frequently underdiagnosed and undertreated. Alice provides evaluation and medication management for perinatal and postpartum mental health for families across Central Virginia.</p>
      </div>
    </div>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner--w">
    <span class="loc-tag" style="display:block;text-align:center;">Areas served</span>
    <h2 class="loc-h2" style="text-align:center;margin-bottom:.75rem;">Richmond &amp; surrounding communities</h2>
    <p class="loc-p" style="text-align:center;margin-bottom:1.5rem;">As a telehealth practice, Alice sees patients from any location in Virginia. Central Virginia communities she frequently serves:</p>
    <div class="loc-tags" style="justify-content:center;">
      <span class="loc-tag-pill">Richmond</span>
      <span class="loc-tag-pill">Henrico</span>
      <span class="loc-tag-pill">Chesterfield</span>
      <span class="loc-tag-pill">Midlothian</span>
      <span class="loc-tag-pill">Moseley</span>
      <span class="loc-tag-pill">Mechanicsville</span>
      <span class="loc-tag-pill">Ashland</span>
      <span class="loc-tag-pill">Goochland</span>
      <span class="loc-tag-pill">Powhatan</span>
      <span class="loc-tag-pill">Short Pump</span>
      <span class="loc-tag-pill">Glen Allen</span>
      <span class="loc-tag-pill">Colonial Heights</span>
    </div>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner">
    <span class="loc-tag">Common questions</span>
    <h2 class="loc-h2">What Richmond patients usually ask</h2>
    <div style="margin-top:1.75rem;">
      <div class="loc-faq">
        <h3>Do you have availability for new patients in Richmond?</h3>
        <p>Yes. The best way to check current availability is to view the <a href="https://alicetran.intakeq.com/booking" target="_blank" style="color:var(--forest);font-weight:600;">online booking calendar</a> directly. If you don't see a time that works, reach out by phone or email — there are often cancellations.</p>
      </div>
      <div class="loc-faq">
        <h3>What insurance do you accept?</h3>
        <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
      </div>
      <div class="loc-faq">
        <h3>Can you prescribe medication via telehealth in Virginia?</h3>
        <p>Yes. Virginia law allows licensed providers to prescribe psychiatric medication via telehealth, including stimulant medications for ADHD under applicable guidelines. Everything is handled through your appointment — no separate in-person visit required.</p>
      </div>
      <div class="loc-faq">
        <h3>Is telehealth as effective as seeing someone in person?</h3>
        <p>Research consistently shows that telehealth psychiatric care produces comparable outcomes to in-person care for the vast majority of conditions. For medication management and supportive therapy, the quality of the conversation is what matters — and many patients find they're more open in their own space.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Accepting new patients across Central Virginia.</h2>
  <p>Telehealth. Board-certified PMHNP. English &amp; Vietnamese.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book Now &rarr;</a>
  <p style="margin-top:1.25rem;font-size:.9rem;color:rgba(255,255,255,.45);">Or call or text: <a href="tel:7038295227" style="color:rgba(255,255,255,.7);">(703) 829-5227</a></p>
</div>`
},

// ── 2. HAMPTON ROADS ─────────────────────────────────────────────────────────
{
  filename: 'mental-health-care-hampton-roads-va.html',
  title: 'Mental Health Care in Hampton Roads, VA | Alice Tran, PMHNP-BC',
  desc: 'Telehealth mental health and psychiatric care for adults in Virginia Beach, Norfolk, Chesapeake, Newport News, Hampton, and Portsmouth. Alice Tran, PMHNP-BC. Serving military families, veterans, and civilians.',
  keywords: 'mental health care Hampton Roads VA, psychiatrist Virginia Beach, telehealth psychiatry Norfolk Virginia, mental health provider Chesapeake VA, PMHNP Hampton Roads, military mental health Virginia Beach, anxiety depression Newport News VA',
  canonical: 'https://alicetrannp.com/pages/mental-health-care-hampton-roads-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":[{"@type":"City","name":"Virginia Beach"},{"@type":"City","name":"Norfolk"},{"@type":"City","name":"Chesapeake"},{"@type":"City","name":"Newport News"}],"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Hampton Roads, Virginia</span>
  <h1>Mental Health Care<br>for Adults in Hampton Roads</h1>
  <p>Virginia Beach, Norfolk, Chesapeake, Newport News, Hampton, and Portsmouth — telehealth psychiatric care that reaches you wherever you are on the coast.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">A region with specific needs</span>
    <h2 class="loc-h2">Hampton Roads is one of the most military-dense regions in the country. That shapes everything, including mental health.</h2>
    <p class="loc-p">The Hampton Roads metro area is home to Naval Station Norfolk, Joint Base Langley-Eustis, Naval Air Station Oceana, and numerous other installations. That means a significant portion of the population is either active duty, a military family member, or a veteran — all of whom carry unique mental health experiences that civilian providers don't always understand.</p>
    <p class="loc-p">But Hampton Roads is also home to hundreds of thousands of civilians — healthcare workers at Sentara and Riverside, teachers, small business owners, first-generation college students at ODU and Hampton University, and families who have been here for generations. The mental health needs are as diverse as the region itself.</p>
    <p class="loc-p">Alice Tran, PMHNP-BC provides telehealth psychiatric care for adults across Hampton Roads. She sees patients from Virginia Beach, Norfolk, Chesapeake, Newport News, Hampton, Portsmouth, and Suffolk — no drive across the Hampton Roads Bridge-Tunnel required.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner--w">
    <span class="loc-tag">What Alice treats</span>
    <h2 class="loc-h2">Mental health conditions commonly treated in Hampton Roads</h2>
    <div class="loc-grid" style="margin-top:1.75rem;">
      <div>
        <div class="loc-card" style="margin-bottom:1.25rem;" data-reveal>
          <h3>PTSD and trauma</h3>
          <p>Trauma comes in many forms in Hampton Roads — military combat and service-related trauma, domestic violence, accidents, and the compounding stress of high-stakes careers. Alice provides psychiatric evaluation and medication management for trauma and PTSD, coordinating with therapists for comprehensive care.</p>
        </div>
        <div class="loc-card" data-reveal style="--delay:80ms">
          <h3>Anxiety and panic</h3>
          <p>The stress of deployment uncertainty, financial pressure, long commutes across the region, and the demands of dual-income military households creates real anxiety. Alice treats generalized anxiety disorder, panic attacks, social anxiety, and related conditions.</p>
        </div>
      </div>
      <div>
        <div class="loc-card" style="margin-bottom:1.25rem;" data-reveal>
          <h3>Depression and adjustment</h3>
          <p>Military families face a particular kind of depression tied to isolation, relocation, and the grief of frequent moves. Civilians in Hampton Roads deal with their own pressures. Depression is treatable — and telehealth means no barriers to actually getting that treatment.</p>
        </div>
        <div class="loc-card" data-reveal style="--delay:80ms">
          <h3>ADHD in adults</h3>
          <p>Adult ADHD — especially in women and people who compensated well enough in school to never get evaluated — is frequently underdiagnosed. Alice provides comprehensive evaluation and evidence-based treatment for ADHD across the Hampton Roads region.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner--w">
    <span class="loc-tag" style="display:block;text-align:center;">Areas served</span>
    <h2 class="loc-h2" style="text-align:center;margin-bottom:.75rem;">Hampton Roads communities</h2>
    <div class="loc-tags" style="justify-content:center;">
      <span class="loc-tag-pill">Virginia Beach</span>
      <span class="loc-tag-pill">Norfolk</span>
      <span class="loc-tag-pill">Chesapeake</span>
      <span class="loc-tag-pill">Newport News</span>
      <span class="loc-tag-pill">Hampton</span>
      <span class="loc-tag-pill">Portsmouth</span>
      <span class="loc-tag-pill">Suffolk</span>
      <span class="loc-tag-pill">Williamsburg</span>
      <span class="loc-tag-pill">Poquoson</span>
      <span class="loc-tag-pill">York County</span>
      <span class="loc-tag-pill">Isle of Wight</span>
    </div>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner">
    <span class="loc-tag">Questions &amp; practicalities</span>
    <h2 class="loc-h2">What Hampton Roads patients want to know</h2>
    <div style="margin-top:1.75rem;">
      <div class="loc-faq">
        <h3>Do you see active duty military members?</h3>
        <p>Alice sees civilians and veterans. For active duty members, care coordination depends on your current healthcare coverage. She is happy to discuss your specific situation during a consultation.</p>
      </div>
      <div class="loc-faq">
        <h3>What insurance do you accept?</h3>
        <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
      </div>
      <div class="loc-faq">
        <h3>How does telehealth work for patients in Virginia Beach or Chesapeake?</h3>
        <p>You connect via a secure video link — no app download required — from anywhere in Virginia. Your home, your car, a private space at work. The appointment is the same as an in-person visit, without the commute across the region.</p>
      </div>
      <div class="loc-faq">
        <h3>Can family members be included in the appointment?</h3>
        <p>With your consent, yes. Alice welcomes family involvement when it is helpful to your care. For Vietnamese-speaking families, she can conduct the full conversation in Vietnamese.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Mental health care for Hampton Roads adults.</h2>
  <p>Telehealth. Accepting new patients. English &amp; Vietnamese.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book Now &rarr;</a>
  <p style="margin-top:1.25rem;font-size:.9rem;color:rgba(255,255,255,.45);">Or call or text: <a href="tel:7038295227" style="color:rgba(255,255,255,.7);">(703) 829-5227</a></p>
</div>`
},

// ── 3. CHARLOTTESVILLE ───────────────────────────────────────────────────────
{
  filename: 'psychiatric-visits-charlottesville-va.html',
  title: 'Psychiatric Visits in Charlottesville, VA | Telehealth | Alice Tran, PMHNP-BC',
  desc: 'Telehealth psychiatric visits for adults in Charlottesville, Albemarle County, and surrounding Virginia. Alice Tran, PMHNP-BC serves UVA community members, academics, students, and Charlottesville residents.',
  keywords: 'psychiatrist Charlottesville VA, psychiatric care Charlottesville Virginia, telehealth mental health Charlottesville, UVA psychiatrist, PMHNP Charlottesville, anxiety depression Charlottesville VA, Albemarle County mental health',
  canonical: 'https://alicetrannp.com/pages/psychiatric-visits-charlottesville-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":[{"@type":"City","name":"Charlottesville"},{"@type":"AdministrativeArea","name":"Albemarle County"}],"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Charlottesville &amp; Surrounding Virginia</span>
  <h1>Psychiatric Visits<br>for Adults in Charlottesville, Virginia</h1>
  <p>A university town with a particular kind of pressure. Telehealth psychiatric care that fits into an academic life — or the life of anyone in the Charlottesville area.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">About this community</span>
    <h2 class="loc-h2">Charlottesville is a small city that carries an outsized amount of pressure — academic, political, and cultural.</h2>
    <p class="loc-p">UVA shapes everything about Charlottesville — the economy, the culture, the social structure, and the mental health landscape. Graduate students living on stipends in one of Virginia's more expensive small cities. Researchers facing the pressure of publication, funding, and tenure. Faculty navigating the particular loneliness of academia while projecting authority. Staff doing the invisible work that keeps the institution running.</p>
    <p class="loc-p">And beyond the UVA bubble: Albemarle County families in Crozet and Earlysville, rural communities in Fluvanna, Greene, and Nelson counties where mental health providers are scarce, and longtime Charlottesville residents navigating a city that feels increasingly like it was built for someone else.</p>
    <p class="loc-p">Alice Tran, PMHNP-BC provides telehealth psychiatric visits for adults in Charlottesville and across the surrounding region. A full psychiatric evaluation, medication management, and supportive therapy — via secure video, from wherever you are.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner--w">
    <span class="loc-tag">Services offered</span>
    <h2 class="loc-h2">What a psychiatric visit with Alice looks like</h2>
    <div class="loc-grid--3" style="margin-top:1.75rem;">
      <div class="loc-card--dk" style="background:var(--forest);border:none;" data-reveal>
        <h3 style="color:#fff;">Initial Evaluation (60 min)</h3>
        <p style="color:rgba(255,255,255,.7);">A full first visit to understand your history, current concerns, prior treatment, and goals. No rushed intake. We decide together on a path forward — whether that involves medication, therapy, or both.</p>
      </div>
      <div class="loc-card--dk" style="background:var(--forest);border:none;" data-reveal style="--delay:80ms">
        <h3 style="color:#fff;">Follow-up Visits (30&ndash;50 min)</h3>
        <p style="color:rgba(255,255,255,.7);">Regular check-ins to review how treatment is working, adjust medication if needed, and address what's changed in your life. Unhurried, collaborative, and built around your actual experience.</p>
      </div>
      <div class="loc-card--dk" style="background:var(--forest);border:none;" data-reveal style="--delay:160ms">
        <h3 style="color:#fff;">Supportive Therapy</h3>
        <p style="color:rgba(255,255,255,.7);">Brief, focused psychotherapy woven into every appointment. Not a separate service — part of the visit itself. Addressing the context of your life, not just the symptom checklist.</p>
      </div>
    </div>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner--w">
    <span class="loc-tag" style="display:block;text-align:center;">Areas served</span>
    <h2 class="loc-h2" style="text-align:center;margin-bottom:.75rem;">Charlottesville &amp; surrounding communities</h2>
    <div class="loc-tags" style="justify-content:center;">
      <span class="loc-tag-pill">Charlottesville</span>
      <span class="loc-tag-pill">Albemarle County</span>
      <span class="loc-tag-pill">Crozet</span>
      <span class="loc-tag-pill">Earlysville</span>
      <span class="loc-tag-pill">Keswick</span>
      <span class="loc-tag-pill">Fluvanna County</span>
      <span class="loc-tag-pill">Palmyra</span>
      <span class="loc-tag-pill">Lake Monticello</span>
      <span class="loc-tag-pill">Greene County</span>
      <span class="loc-tag-pill">Ruckersville</span>
      <span class="loc-tag-pill">Nelson County</span>
      <span class="loc-tag-pill">Lovingston</span>
    </div>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner">
    <span class="loc-tag">Common questions</span>
    <h2 class="loc-h2">What Charlottesville patients often ask</h2>
    <div style="margin-top:1.75rem;">
      <div class="loc-faq">
        <h3>Do you see UVA students or graduate students?</h3>
        <p>Alice sees adults ages 18 to 60, which includes undergraduate and graduate students. UVA has its own counseling services, but many students prefer a private, independent provider for psychiatric care. Telehealth is especially practical for students — no need to navigate UVA Health scheduling or Student Health waitlists.</p>
      </div>
      <div class="loc-faq">
        <h3>What insurance do you accept?</h3>
        <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
      </div>
      <div class="loc-faq">
        <h3>I live in a rural area outside Charlottesville. Can you still see me?</h3>
        <p>Yes — that is exactly what telehealth solves. Patients in Fluvanna, Nelson, Greene, and Louisa counties often have very limited local mental health options. Alice sees patients from anywhere in Virginia, including communities where the nearest psychiatrist might be an hour's drive away.</p>
      </div>
      <div class="loc-faq">
        <h3>How often would I need appointments?</h3>
        <p>It depends on where you are in treatment. A new patient starting medication typically has monthly visits initially. Once stable, visits may extend to every 6 to 8 weeks. Alice discusses appointment frequency at the first visit based on your specific situation.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Psychiatric visits for Charlottesville adults.</h2>
  <p>Telehealth. No waitlist — check availability online. Accepting new patients.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book Now &rarr;</a>
  <p style="margin-top:1.25rem;font-size:.9rem;color:rgba(255,255,255,.45);">Or call or text: <a href="tel:7038295227" style="color:rgba(255,255,255,.7);">(703) 829-5227</a></p>
</div>`
},

// ── 4. ROANOKE / LYNCHBURG ───────────────────────────────────────────────────
{
  filename: 'mental-health-roanoke-lynchburg-va.html',
  title: 'Mental Health Care in Roanoke & Lynchburg, VA | Alice Tran, PMHNP-BC',
  desc: 'Telehealth mental health and psychiatric care for adults in Roanoke, Lynchburg, Blacksburg, Bedford, and South Central Virginia. Alice Tran, PMHNP-BC. Bridging the mental health provider gap in rural Virginia.',
  keywords: 'mental health Roanoke VA, psychiatrist Roanoke Virginia, telehealth mental health Lynchburg VA, psychiatric care Blacksburg Virginia, PMHNP Roanoke, anxiety depression Roanoke Lynchburg, mental health provider Southwest Virginia',
  canonical: 'https://alicetrannp.com/pages/mental-health-roanoke-lynchburg-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":[{"@type":"City","name":"Roanoke"},{"@type":"City","name":"Lynchburg"},{"@type":"City","name":"Blacksburg"}],"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Roanoke, Lynchburg &amp; South Central Virginia</span>
  <h1>Mental Health Care<br>in Roanoke, Lynchburg &amp; the Blue Ridge</h1>
  <p>Southwestern Virginia has real mental health needs and too few providers to meet them. Telehealth changes that equation.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">The provider gap in Southwest Virginia</span>
    <h2 class="loc-h2">Roanoke and Lynchburg have grown. Access to psychiatric care has not grown with them.</h2>
    <p class="loc-p">The mental health provider shortage in Virginia is felt most acutely outside Northern Virginia and Richmond. In Roanoke, Lynchburg, Bedford, and the surrounding communities, the ratio of psychiatrists and psychiatric nurse practitioners to population is significantly lower than in the state's urban centers. Waitlists are long. Many practices are not accepting new patients. People who need care wait months, or go without.</p>
    <p class="loc-p">Telehealth is not a workaround for real care — it is real care. Alice Tran, PMHNP-BC provides the same quality psychiatric evaluation, medication management, and supportive therapy to patients in Roanoke, Lynchburg, and the Blue Ridge region that she provides to patients in Fairfax — through a secure video appointment from your home.</p>
    <p class="loc-p">She also serves Blacksburg and Christiansburg (Virginia Tech community), Bedford County, Campbell County, Amherst, Appomattox, and the broader South Central Virginia region, including Smith Mountain Lake.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner--w">
    <span class="loc-tag">Who Alice sees in this region</span>
    <h2 class="loc-h2">Mental health needs across Roanoke, Lynchburg, and beyond</h2>
    <div class="loc-grid" style="margin-top:1.75rem;">
      <div>
        <div class="loc-card" style="margin-bottom:1.25rem;" data-reveal>
          <h3>Virginia Tech community (Blacksburg)</h3>
          <p>Faculty, staff, graduate students, and non-student adults in the New River Valley who want independent psychiatric care outside the university system. ADHD, anxiety, depression, and burnout are common presenting concerns.</p>
        </div>
        <div class="loc-card" data-reveal style="--delay:80ms">
          <h3>Caregiver burnout</h3>
          <p>Rural and small-city communities often have more informal caregiving — family members caring for aging parents, adults with disabilities, or children with complex needs. Caregiver burnout is real and undertreated. Alice addresses it directly.</p>
        </div>
      </div>
      <div>
        <div class="loc-card" style="margin-bottom:1.25rem;" data-reveal>
          <h3>Adults who have "managed" for years</h3>
          <p>In communities where mental health treatment carries stigma, many adults spend years managing anxiety or depression without any professional support. They reach out when the coping strategies stop being enough. This is one of the most common presentations Alice sees, and one of the most rewarding to treat.</p>
        </div>
        <div class="loc-card" data-reveal style="--delay:80ms">
          <h3>Insomnia and burnout</h3>
          <p>Healthcare workers, first responders, teachers, and essential workers across the region experience chronically disrupted sleep and work-related exhaustion. Alice evaluates and treats both the symptoms and the underlying causes.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner--w">
    <span class="loc-tag" style="display:block;text-align:center;">Areas served</span>
    <h2 class="loc-h2" style="text-align:center;margin-bottom:.75rem;">South Central &amp; Southwest Virginia</h2>
    <div class="loc-tags" style="justify-content:center;">
      <span class="loc-tag-pill">Roanoke</span>
      <span class="loc-tag-pill">Lynchburg</span>
      <span class="loc-tag-pill">Blacksburg</span>
      <span class="loc-tag-pill">Christiansburg</span>
      <span class="loc-tag-pill">Bedford</span>
      <span class="loc-tag-pill">Forest</span>
      <span class="loc-tag-pill">Moneta</span>
      <span class="loc-tag-pill">Smith Mountain Lake</span>
      <span class="loc-tag-pill">Amherst</span>
      <span class="loc-tag-pill">Appomattox</span>
      <span class="loc-tag-pill">Campbell County</span>
      <span class="loc-tag-pill">Salem</span>
    </div>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner">
    <span class="loc-tag">Common questions</span>
    <h2 class="loc-h2">What Southwest Virginia patients ask</h2>
    <div style="margin-top:1.75rem;">
      <div class="loc-faq">
        <h3>I've never seen a psychiatrist before. What should I expect?</h3>
        <p>The first appointment is a 60-minute conversation. Alice asks about your history, your current concerns, what you've already tried, and what you're hoping for. There is no right way to show up — you don't need a diagnosis or the right words going in. The evaluation helps figure out what would actually help.</p>
      </div>
      <div class="loc-faq">
        <h3>What insurance do you accept?</h3>
        <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
      </div>
      <div class="loc-faq">
        <h3>What if I have spotty internet in a rural area?</h3>
        <p>If the video connection is unstable, appointments can be completed by phone. Alice's office will call you directly rather than end the appointment. A phone visit is not ideal but it works — and it is far better than no visit at all.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Mental health care for Roanoke, Lynchburg, and beyond.</h2>
  <p>Telehealth across all of Virginia. Accepting new patients.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book Now &rarr;</a>
  <p style="margin-top:1.25rem;font-size:.9rem;color:rgba(255,255,255,.45);">Or call or text: <a href="tel:7038295227" style="color:rgba(255,255,255,.7);">(703) 829-5227</a></p>
</div>`
},

// ── 5. SHENANDOAH VALLEY ─────────────────────────────────────────────────────
{
  filename: 'telehealth-mental-health-shenandoah-valley-va.html',
  title: 'Telehealth Mental Health Care in the Shenandoah Valley, VA | Alice Tran, PMHNP-BC',
  desc: 'Telehealth psychiatric and mental health care for adults in Harrisonburg, Staunton, Winchester, Front Royal, Waynesboro, and the Shenandoah Valley. Alice Tran, PMHNP-BC. Accepting new patients statewide.',
  keywords: 'telehealth mental health Shenandoah Valley VA, psychiatrist Harrisonburg Virginia, mental health provider Winchester VA, PMHNP Shenandoah Valley, psychiatric care Staunton VA, anxiety depression Harrisonburg, telehealth psychiatry Front Royal VA',
  canonical: 'https://alicetrannp.com/pages/telehealth-mental-health-shenandoah-valley-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":[{"@type":"City","name":"Harrisonburg"},{"@type":"City","name":"Winchester"},{"@type":"City","name":"Staunton"}],"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Shenandoah Valley &amp; Western Virginia</span>
  <h1>Telehealth Mental Health Care<br>in the Shenandoah Valley</h1>
  <p>Harrisonburg, Winchester, Staunton, Front Royal, Waynesboro — and the rural communities between them. Quality psychiatric care that does not require driving over a mountain to get it.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">Why telehealth matters here</span>
    <h2 class="loc-h2">The Shenandoah Valley is beautiful. Access to psychiatric care is another story.</h2>
    <p class="loc-p">The Shenandoah Valley runs from Winchester in the north down through Harrisonburg and Staunton to the southern end of the ridge. It's home to long-established farming communities, JMU students and faculty, Massanutten resort workers, Mennonite and other faith communities, a growing Latino population in Harrisonburg, and small-city professionals who chose the Valley for its pace and price.</p>
    <p class="loc-p">What the Valley does not have enough of is outpatient psychiatric providers. Getting to a psychiatrist in Charlottesville or Northern Virginia often means a long drive over challenging terrain — or simply not going at all. Telehealth removes that barrier entirely. Alice Tran, PMHNP-BC provides full psychiatric care via secure video for adults throughout the Shenandoah Valley, from wherever you are.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner--w">
    <span class="loc-tag">What brings Valley patients to care</span>
    <h2 class="loc-h2">Mental health across the Shenandoah Valley</h2>
    <div class="loc-grid--3" style="margin-top:1.75rem;">
      <div class="loc-card" data-reveal>
        <h3>JMU community (Harrisonburg)</h3>
        <p>Students, graduate students, faculty, and staff at James Madison University seeking independent psychiatric care outside the campus system. ADHD evaluation, anxiety management, and depression treatment are common needs.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:80ms">
        <h3>Rural and small-town adults</h3>
        <p>Adults in Page County, Shenandoah County, Rockingham County, and beyond who have limited local options. Many have never seen a psychiatric provider simply because it was not accessible. Telehealth makes it accessible.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:160ms">
        <h3>Northern Valley commuters (Winchester)</h3>
        <p>Winchester residents who commute into Northern Virginia or DC carry NoVA-level stress at Valley cost of living — a combination that creates real burnout and anxiety. Alice understands that pressure and treats the whole picture.</p>
      </div>
    </div>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner--w">
    <span class="loc-tag" style="display:block;text-align:center;">Areas served</span>
    <h2 class="loc-h2" style="text-align:center;margin-bottom:.75rem;">Shenandoah Valley communities</h2>
    <div class="loc-tags" style="justify-content:center;">
      <span class="loc-tag-pill">Harrisonburg</span>
      <span class="loc-tag-pill">Winchester</span>
      <span class="loc-tag-pill">Staunton</span>
      <span class="loc-tag-pill">Waynesboro</span>
      <span class="loc-tag-pill">Front Royal</span>
      <span class="loc-tag-pill">Woodstock</span>
      <span class="loc-tag-pill">Luray</span>
      <span class="loc-tag-pill">Bridgewater</span>
      <span class="loc-tag-pill">Elkton</span>
      <span class="loc-tag-pill">Strasburg</span>
      <span class="loc-tag-pill">Stephens City</span>
      <span class="loc-tag-pill">Fishersville</span>
    </div>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner">
    <span class="loc-tag">Common questions</span>
    <h2 class="loc-h2">What Shenandoah Valley patients ask</h2>
    <div style="margin-top:1.75rem;">
      <div class="loc-faq">
        <h3>Is this practice a good fit if I've never done telehealth before?</h3>
        <p>Yes. The technology is simpler than most people expect — you click a link and you are in the appointment. No downloads, no accounts. Alice's team is glad to walk you through the process before your first visit if you want a quick run-through.</p>
      </div>
      <div class="loc-faq">
        <h3>What insurance do you accept?</h3>
        <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
      </div>
      <div class="loc-faq">
        <h3>Do you treat patients from faith-based communities?</h3>
        <p>Alice provides care to adults from all backgrounds and belief systems. She is respectful of personal faith traditions and does not require patients to separate their values from their mental health care. Your whole self is welcome in this practice.</p>
      </div>
      <div class="loc-faq">
        <h3>Can you see me if I am also working with a local therapist?</h3>
        <p>Absolutely — this is often the ideal setup. A local therapist handles therapeutic work; Alice handles the psychiatric side (evaluation, diagnosis, medication). With your permission, she can communicate with your therapist to coordinate care.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Mental health care across the Shenandoah Valley.</h2>
  <p>Telehealth. No mountain to cross. Accepting new patients.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book Now &rarr;</a>
  <p style="margin-top:1.25rem;font-size:.9rem;color:rgba(255,255,255,.45);">Or call or text: <a href="tel:7038295227" style="color:rgba(255,255,255,.7);">(703) 829-5227</a></p>
</div>`
},

// ── 6. LOUDOUN COUNTY ────────────────────────────────────────────────────────
{
  filename: 'psychiatric-care-loudoun-county-va.html',
  title: 'Psychiatric Care in Loudoun County, VA | Ashburn, Leesburg | Alice Tran, PMHNP-BC',
  desc: 'Telehealth psychiatric care for adults in Loudoun County, VA — Ashburn, Leesburg, Sterling, Purcellville, and surrounding areas. Alice Tran, PMHNP-BC. Treating anxiety, burnout, ADHD, and more.',
  keywords: 'psychiatrist Loudoun County VA, psychiatric care Ashburn Virginia, mental health provider Leesburg VA, PMHNP Loudoun County, telehealth psychiatry Sterling VA, anxiety burnout ADHD Ashburn, Purcellville mental health provider',
  canonical: 'https://alicetrannp.com/pages/psychiatric-care-loudoun-county-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":[{"@type":"AdministrativeArea","name":"Loudoun County"},{"@type":"City","name":"Ashburn"},{"@type":"City","name":"Leesburg"}],"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Loudoun County, Virginia</span>
  <h1>Psychiatric Care<br>in Loudoun County, Virginia</h1>
  <p>One of the wealthiest, fastest-growing counties in America — and one where the pressure to perform, provide, and appear fine is relentless. Telehealth psychiatric care that meets you where you are.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">The Loudoun reality</span>
    <h2 class="loc-h2">Loudoun County has grown explosively. The stress that comes with that growth is real — and widely unacknowledged.</h2>
    <p class="loc-p">Loudoun County has been one of the fastest-growing counties in the United States for over a decade. The data center corridor along Route 7 has brought tech jobs and industry. The schools are rated highly. The neighborhoods in Ashburn, Brambleton, and Leesburg are well-maintained and family-oriented. From the outside, it looks like the American dream running smoothly.</p>
    <p class="loc-p">Inside those homes is a different picture. Parents stretched between demanding careers and hypercompetitive school environments. Tech workers navigating layoffs and identity shifts. Dual-income households carrying mortgages that require both incomes to stay afloat. New residents who moved here for opportunity and found themselves isolated in a suburb where everyone looks busy and no one knows their neighbors.</p>
    <p class="loc-p">Alice Tran, PMHNP-BC provides telehealth psychiatric care for adults in Ashburn, Leesburg, Sterling, Purcellville, South Riding, Brambleton, and throughout Loudoun County. No traffic on Route 7. No navigating One Loudoun parking. Just an appointment that fits into your actual life.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner--w">
    <span class="loc-tag">What Loudoun patients come for</span>
    <h2 class="loc-h2">The patterns Alice sees in Loudoun County adults</h2>
    <div class="loc-grid--3" style="margin-top:1.75rem;">
      <div class="loc-card" data-reveal>
        <h3>High-functioning anxiety</h3>
        <p>The kind that looks like productivity. Constant planning, difficulty delegating, an inability to rest without guilt. Loudoun is full of people who have built entire careers on their anxiety — until it stops being useful and starts being disabling.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:80ms">
        <h3>Tech industry burnout</h3>
        <p>The data center economy and tech sector draw workers who identify deeply with their jobs. When a layoff comes — or when the job stops feeling meaningful — the identity collapse that follows can look a lot like depression. It often is. And it responds well to treatment.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:160ms">
        <h3>Parenting stress and postpartum</h3>
        <p>New parents in Loudoun face competitive school preparation, high housing costs, and the expectation that they will excel at parenting the same way they excel at everything else. Postpartum depression and parenting-related anxiety are common and very treatable.</p>
      </div>
      <div class="loc-card" data-reveal>
        <h3>ADHD — late diagnosis</h3>
        <p>Many Loudoun adults arrive at ADHD only after their child is diagnosed — and they recognize themselves in the description. Or after a career transition reveals that the compensating strategies no longer work. Alice provides thorough adult ADHD evaluation and treatment.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:80ms">
        <h3>Isolation in a new suburb</h3>
        <p>Moving to Loudoun for the schools or the jobs often means leaving an established community behind. Building genuine connection in a fast-growing suburb takes longer than people expect. The resulting loneliness can develop into depression quietly.</p>
      </div>
      <div class="loc-card" data-reveal style="--delay:160ms">
        <h3>Commuter stress and burnout</h3>
        <p>The Dulles Toll Road, Route 28, and the Silver Line Metro have made Loudoun more connected — but the commute into DC or Tysons is still significant. Chronic commuter stress compounds everything else and is worth addressing as part of a broader picture.</p>
      </div>
    </div>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">Common questions</span>
    <h2 class="loc-h2">What Loudoun County patients ask</h2>
    <div style="margin-top:1.75rem;">
      <div class="loc-faq">
        <h3>Do you offer evening or early morning appointments?</h3>
        <p>Alice's current hours are Monday through Thursday, 9am to 4pm. If those hours are a barrier, reach out directly — there may be options, or she can recommend next steps for finding care that fits your schedule.</p>
      </div>
      <div class="loc-faq">
        <h3>What insurance do you accept?</h3>
        <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
      </div>
      <div class="loc-faq">
        <h3>Is this confidential from my employer?</h3>
        <p>Yes. Your care is protected under HIPAA. Your employer has no access to your medical records or the fact that you are receiving psychiatric care. Your insurance EOB will show only "telehealth visit" — not a diagnosis or a provider name.</p>
      </div>
      <div class="loc-faq">
        <h3>Can I be seen if I have a security clearance?</h3>
        <p>This is a common concern in Northern Virginia. Seeking mental health treatment does not automatically affect a security clearance — in fact, untreated mental health conditions are more likely to create issues than treated ones. Alice is not able to provide clearance-specific legal advice, but she encourages you to seek the care you need.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Psychiatric care for Loudoun County adults.</h2>
  <p>Telehealth. Board-certified PMHNP. Accepting new patients.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book Now &rarr;</a>
  <p style="margin-top:1.25rem;font-size:.9rem;color:rgba(255,255,255,.45);">Or call or text: <a href="tel:7038295227" style="color:rgba(255,255,255,.7);">(703) 829-5227</a></p>
</div>`
},

// ── 7. PRINCE WILLIAM COUNTY ─────────────────────────────────────────────────
{
  filename: 'telehealth-psychiatry-prince-william-va.html',
  title: 'Telehealth Psychiatry in Prince William County, VA | Alice Tran, PMHNP-BC',
  desc: 'Telehealth psychiatric care for adults in Prince William County — Woodbridge, Manassas, Dale City, Gainesville, Dumfries, and Quantico. Alice Tran, PMHNP-BC. Serving a diverse, working community.',
  keywords: 'psychiatrist Prince William County VA, telehealth psychiatry Woodbridge Virginia, mental health Manassas VA, PMHNP Prince William County, psychiatric care Dale City Virginia, anxiety depression Woodbridge VA, Gainesville mental health provider',
  canonical: 'https://alicetrannp.com/pages/telehealth-psychiatry-prince-william-va.html',
  schema: `{"@context":"https://schema.org","@type":"MedicalBusiness","name":"Alice Tran Psychiatric Care","url":"https://alicetrannp.com","telephone":"(703) 829-5227","medicalSpecialty":"Psychiatry","areaServed":[{"@type":"AdministrativeArea","name":"Prince William County"},{"@type":"City","name":"Woodbridge"},{"@type":"City","name":"Manassas"}],"availableLanguage":["English","Vietnamese"]}`,
  body: `
<div class="loc-hero">
  <span class="section-tag">Prince William County, Virginia</span>
  <h1>Telehealth Psychiatry<br>for Adults in Prince William County</h1>
  <p>Woodbridge, Manassas, Dale City, Gainesville, Dumfries — a large, diverse, hardworking county that deserves better access to psychiatric care.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;">Book an Appointment &rarr;</a>
</div>

<section class="loc-s">
  <div class="loc-inner">
    <span class="loc-tag">Who this is for</span>
    <h2 class="loc-h2">Prince William is Northern Virginia's most diverse and most overlooked county when it comes to mental health resources.</h2>
    <p class="loc-p">Prince William County is large, dense, and genuinely diverse — home to significant Latino, Asian, African American, and immigrant communities alongside longtime Virginia families, military families near Quantico, and a growing population of professionals priced out of Fairfax and Loudoun.</p>
    <p class="loc-p">The commutes are long. The I-95 corridor through Woodbridge is one of the most congested stretches of highway in the country. Workers leave early and come home late. Time is scarce. And mental health care — which requires time, flexibility, and insurance access — can feel like something for people with more of both.</p>
    <p class="loc-p">Alice Tran, PMHNP-BC provides telehealth psychiatric care for adults across Prince William County. She sees patients in Woodbridge, Manassas, Dale City, Gainesville, Dumfries, Triangle, Bristow, and surrounding communities — no I-95 required. For Vietnamese-speaking patients in the county's Vietnamese community, she offers full care in Vietnamese.</p>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner--w">
    <span class="loc-tag">What Alice treats</span>
    <h2 class="loc-h2">Common reasons Prince William adults seek psychiatric care</h2>
    <div class="loc-grid" style="margin-top:1.75rem;">
      <div>
        <div class="loc-card" style="margin-bottom:1.25rem;" data-reveal>
          <h3>Anxiety and commuter stress</h3>
          <p>The I-95 corridor creates a specific kind of chronic stress — unpredictable, uncontrollable, time-consuming. Combined with demanding work schedules, this compounds into anxiety that affects sleep, relationships, and health. Alice treats anxiety disorders and the physical toll of sustained stress.</p>
        </div>
        <div class="loc-card" data-reveal style="--delay:80ms">
          <h3>Depression and isolation</h3>
          <p>Working long hours and commuting leaves little time for community. The isolation that results — especially for newer residents and immigrants building lives in a new place — can develop into depression quietly. Treatment makes a significant difference.</p>
        </div>
      </div>
      <div>
        <div class="loc-card" style="margin-bottom:1.25rem;" data-reveal>
          <h3>Immigrant and bicultural stress</h3>
          <p>Prince William County has one of the most diverse populations in Northern Virginia. The stress of navigating two cultures, supporting family here and abroad, and building a life in a new country has real mental health consequences. Alice understands this context — she lived it.</p>
        </div>
        <div class="loc-card" data-reveal style="--delay:80ms">
          <h3>Military and Quantico families</h3>
          <p>Families near Marine Corps Base Quantico face the specific challenges of military life — deployment anxiety, frequent moves, reintegration stress, and navigating care during transitions. Telehealth is especially practical for military families whose schedules and locations change.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="loc-s">
  <div class="loc-inner--w">
    <span class="loc-tag" style="display:block;text-align:center;">Areas served</span>
    <h2 class="loc-h2" style="text-align:center;margin-bottom:.75rem;">Prince William County communities</h2>
    <div class="loc-tags" style="justify-content:center;">
      <span class="loc-tag-pill">Woodbridge</span>
      <span class="loc-tag-pill">Manassas</span>
      <span class="loc-tag-pill">Dale City</span>
      <span class="loc-tag-pill">Gainesville</span>
      <span class="loc-tag-pill">Dumfries</span>
      <span class="loc-tag-pill">Triangle</span>
      <span class="loc-tag-pill">Bristow</span>
      <span class="loc-tag-pill">Haymarket</span>
      <span class="loc-tag-pill">Occoquan</span>
      <span class="loc-tag-pill">Lake Ridge</span>
      <span class="loc-tag-pill">Montclair</span>
      <span class="loc-tag-pill">Quantico</span>
    </div>
  </div>
</section>

<section class="loc-s loc-s--alt">
  <div class="loc-inner">
    <span class="loc-tag">Common questions</span>
    <h2 class="loc-h2">What Prince William patients ask</h2>
    <div style="margin-top:1.75rem;">
      <div class="loc-faq">
        <h3>Do you offer care in languages other than English?</h3>
        <p>Yes. Alice provides full psychiatric care in Vietnamese — evaluations, medication conversations, and follow-up visits. For Prince William County's Vietnamese-speaking community, no interpreter is needed.</p>
      </div>
      <div class="loc-faq">
        <h3>What insurance do you accept?</h3>
        <p>Alice accepts Aetna, Cigna, United Healthcare, Oxford, and Oscar. She also sees patients who pay out of pocket. See <a href="rates.html" style="color:var(--forest);font-weight:600;">Rates &amp; Insurance</a> for current fees.</p>
      </div>
      <div class="loc-faq">
        <h3>I work long hours. Are appointments flexible?</h3>
        <p>Alice's current hours are Monday through Thursday, 9am to 4pm. If that does not work with your schedule, reach out directly — there are sometimes options, and she is glad to discuss what might be possible.</p>
      </div>
      <div class="loc-faq">
        <h3>Can I be seen quickly if I am struggling right now?</h3>
        <p>Check the <a href="https://alicetran.intakeq.com/booking" target="_blank" style="color:var(--forest);font-weight:600;">online booking calendar</a> for the earliest available slot. If it is urgent, call or text (703) 829-5227 directly — Alice's team will do their best to find something sooner. For a mental health crisis, please contact the 988 Suicide and Crisis Lifeline by calling or texting 988.</p>
      </div>
    </div>
  </div>
</section>

<div class="loc-cta">
  <h2>Telehealth psychiatry for Prince William County.</h2>
  <p>Accepting new patients. English &amp; Vietnamese. No I-95 required.</p>
  <a href="https://alicetran.intakeq.com/booking" target="_blank" class="nav-cta" style="font-size:1rem;padding:.8rem 2rem;display:inline-block;">Book Now &rarr;</a>
  <p style="margin-top:1.25rem;font-size:.9rem;color:rgba(255,255,255,.45);">Or call or text: <a href="tel:7038295227" style="color:rgba(255,255,255,.7);">(703) 829-5227</a></p>
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

console.log('\nAll regional pages generated.');
