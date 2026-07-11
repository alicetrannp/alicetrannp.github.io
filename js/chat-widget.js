(function () {
  var base = (document.currentScript || {}).getAttribute('data-base') || '';

  var KB = [
    {
      keywords: ['i need help', 'need help', 'help me', 'i\'m sad', 'im sad', 'feeling sad', 'i\'m anxious', 'im anxious', 'feeling anxious', 'i\'m depressed', 'im depressed', 'feeling depressed', 'i\'m struggling', 'im struggling', 'struggling', 'i\'m not okay', 'not okay', 'not doing well', 'i\'m overwhelmed', 'overwhelmed', 'i\'m scared', 'i\'m stressed', 'im stressed', 'so stressed', 'stressed out', 'i\'m lost', 'feeling lost', 'hard time', 'having a hard time', 'don\'t know where to start', 'where do i start', 'i don\'t know', 'not feeling well', 'not feeling good', 'feeling low', 'i\'m not well'],
      answer: 'You\'re not alone — and reaching out, even here, takes courage. 💚<br><br>Alice\'s practice is built for exactly this moment. Whether you\'re struggling with something you can name or something you\'re still trying to find words for, you are welcome here. Alice would be honored to listen.'
    },
    {
      keywords: ['new patient', 'accepting', 'taking new', 'take new', 'are you taking', 'are you accepting'],
      answer: 'Yes! Alice is currently accepting new patients. No referral needed — you can book directly online.',
      action: { label: 'Book a consultation →', href: 'https://alicetran.intakeq.com/booking' }
    },
    {
      keywords: ['referral', "doctor's note", 'doctor note', 'prior diagnosis', 'do i need'],
      answer: 'No referral needed. You can book directly online without a doctor\'s note or prior diagnosis required.'
    },
    {
      keywords: ['pmhnp', 'nurse practitioner', 'what is a np', 'what is an np', 'are you a doctor', 'are you a psychiatrist', 'vs psychiatrist', 'psychiatrist vs', 'vs a psychiatrist', 'qualified', 'qualification', 'credential', 'certification', 'board certified', 'board-certified', 'who is alice', 'about alice', 'segall', 'training', 'license', 'licensed'],
      answer: 'Alice is a dual board-certified Psychiatric Mental Health Nurse Practitioner (PMHNP-BC) and Family Nurse Practitioner (FNP-BC), licensed in Virginia. A PMHNP is an advanced practice provider who can diagnose mental health conditions, prescribe medication, and provide therapy — for most outpatient psychiatric care, the visit is very similar to seeing a psychiatrist. Alice also completed advanced clinical training under the supervision of Dr. Errol Segall, MD, a psychiatrist with over 50 years of experience.',
      action: { label: 'What is a PMHNP? →', href: base + 'pages/blog/what-is-a-pmhnp.html' }
    },
    {
      keywords: ['insurance', 'aetna', 'medicaid', 'medicare', 'anthem', 'bcbs', 'blue cross', 'carelon', 'humana', 'tricare', 'in-network', 'in network', 'cover', 'covered', 'accept insurance', 'take insurance'],
      answer: 'Alice is in-network with Aetna, Medicaid, Medicare, Carelon, Anthem BCBS Virginia, and Humana Military. Additional plans are being added. See the full updated list on the Rates page.',
      action: { label: 'View insurance & rates →', href: base + 'pages/rates.html' }
    },
    {
      keywords: ['self pay', 'self-pay', 'no insurance', 'without insurance', 'out of pocket', 'how much', 'cost', 'price', 'rate', 'fee', 'pay'],
      answer: 'Self-pay rates range from $195–$350 depending on the appointment type. Full details are on the Rates page.',
      action: { label: 'View self-pay rates →', href: base + 'pages/rates.html' }
    },
    {
      keywords: ['telehealth', 'virtual', 'video', 'online', 'zoom', 'remote', 'video call'],
      answer: 'Yes! All appointments are available via secure telehealth video. You can be seen from anywhere in Virginia.'
    },
    {
      keywords: ['in person', 'in-person', 'office visit', 'come in', 'see in person'],
      answer: 'Most patients prefer the convenience of telehealth. However, Alice is happy to offer in-person appointments when needed, by appointment only.'
    },
    {
      keywords: ['first appointment', 'first visit', 'initial visit', 'evaluation', 'intake', 'how long', 'long is', 'first session'],
      answer: 'The first appointment is a comprehensive psychiatric evaluation lasting 60 minutes. It\'s a spacious, unhurried time to share your history, symptoms, and goals.'
    },
    {
      keywords: ['follow up', 'follow-up', 'next appointment', 'medication management', 'check in', 'second visit'],
      answer: 'Follow-up appointments for medication management are 30 or 50 minutes depending on your needs.'
    },
    {
      keywords: ['benzo', 'benzodiazepine', 'xanax', 'valium', 'klonopin', 'ativan', 'alprazolam', 'diazepam', 'clonazepam', 'controlled substance'],
      answer: 'Short-term benzodiazepines may be prescribed when clinically appropriate. However, Alice does not prescribe long-term or ongoing benzodiazepine therapy. If you\'re currently on a long-term prescription, please reach out to discuss whether this practice is a good fit.'
    },
    {
      keywords: ['adhd', 'adderall', 'stimulant', 'ritalin', 'vyvanse', 'attention', 'focus', 'concentration'],
      answer: 'Yes, Alice evaluates and treats ADHD in adults. This includes diagnostic assessment and medication management when appropriate.'
    },
    {
      keywords: ['anxiety', 'depression', 'bipolar', 'ptsd', 'trauma', 'ocd', 'panic', 'insomnia', 'burnout', 'postpartum', 'mood', 'stress', 'what do you treat', 'conditions'],
      answer: 'Alice treats a wide range of conditions including anxiety, depression, ADHD, trauma & PTSD, bipolar disorder, OCD, panic disorder, burnout, postpartum depression, and insomnia.',
      action: { label: 'See all conditions →', href: base + 'pages/conditions.html' }
    },
    {
      keywords: ['vietnamese', 'tiếng việt', 'viet', 'speak vietnamese', 'bilingual', 'language', 'tieng viet'],
      answer: 'Yes! Alice is fluent in Vietnamese and offers full psychiatric care in both English and Vietnamese. No interpreter needed.',
      action: { label: 'Learn more →', href: base + 'pages/vietnamese-psychiatric-care.html' }
    },
    {
      keywords: ['hours', 'open', 'when are you', 'schedule', 'available', 'monday', 'tuesday', 'wednesday', 'thursday', 'days'],
      answer: 'Office hours are Monday–Thursday, 9am–4pm. New patients are typically seen within 1–2 weeks.'
    },
    {
      keywords: ['book', 'booking', 'schedule appointment', 'make appointment', 'sign up', 'get started', 'how do i start', 'how to start'],
      answer: 'You can book directly online — no referral needed!',
      action: { label: 'Book a consultation →', href: 'https://alicetran.intakeq.com/booking' }
    },
    {
      keywords: ['cancel', 'cancellation', 'reschedule', 'no show', 'late cancel', 'missed appointment'],
      answer: 'Please review the cancellation policy on the Rates page. Late cancellations and no-shows may incur a fee.',
      action: { label: 'View cancellation policy →', href: base + 'pages/rates.html#cancellation' }
    },
    {
      keywords: ['location', 'address', 'where', 'fairfax', 'office', 'find you'],
      answer: 'The office address is 3060 Williams Drive, Suite 300, Fairfax, VA 22031. Most care is delivered via telehealth across all of Virginia.'
    },
    {
      keywords: ['crisis', 'emergency', 'urgent', 'suicidal', 'harm', 'danger', '911', '988'],
      answer: '🚨 If you are in crisis, please do not wait for an appointment. Call or text <strong>988</strong> (Suicide & Crisis Lifeline) — free, confidential, 24/7. For emergencies, call <strong>911</strong>.'
    },
    {
      keywords: ['respond', 'response', 'reply', 'message', 'email', 'voicemail', 'how long to hear', 'get back'],
      answer: 'Emails, voicemails, and portal messages are typically responded to within 24–72 business hours. For fastest response, call or text <a href="tel:7037919099" style="color:#2E4A3C;font-weight:600;">(703) 791-9099</a>.'
    },
    {
      keywords: ['service', 'what do you offer', 'what do you do', 'therapy', 'psychotherapy', 'medication'],
      answer: 'Alice offers comprehensive psychiatric evaluations, medication management, and supportive therapy for adults ages 18–65.',
      action: { label: 'View all services →', href: base + 'pages/services.html' }
    },
    {
      keywords: ['ages', 'age', 'how old', 'adult', 'teenager', 'teen', 'child', 'senior', 'elderly'],
      answer: 'Alice currently sees adults ages 18 to 65.'
    }
  ];

  var FALLBACK = 'I\'m not sure about that one. For a direct answer, please call or text Alice at <a href="tel:7037919099" style="color:#2E4A3C;font-weight:600;">(703) 791-9099</a> — she typically responds within 24 business hours.';

  var QUICK_REPLIES = [
    { label: 'Do you accept my insurance?', query: 'insurance' },
    { label: 'How do I book an appointment?', query: 'how to book appointment' },
    { label: 'Are you accepting new patients?', query: 'new patient' },
    { label: 'Do you do telehealth?', query: 'telehealth' }
  ];

  function findAnswer(input) {
    var lower = input.toLowerCase();
    for (var i = 0; i < KB.length; i++) {
      var item = KB[i];
      for (var j = 0; j < item.keywords.length; j++) {
        if (lower.indexOf(item.keywords[j]) !== -1) return item;
      }
    }
    return null;
  }

  function buildWidget() {
    var style = document.createElement('style');
    style.textContent = [
      '#atpc-btn{position:fixed;bottom:24px;right:24px;z-index:99999;display:flex;align-items:center;gap:10px;background:#fff;color:#2E4A3C;border:none;border-radius:999px;padding:13px 20px;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;font-size:.9rem;font-weight:600;cursor:pointer;box-shadow:0 4px 24px rgba(0,0,0,.18),0 0 0 1px rgba(0,0,0,.06);transition:transform .2s,box-shadow .2s;letter-spacing:.01em;}',
      '#atpc-btn:hover{transform:translateY(-2px);box-shadow:0 10px 36px rgba(0,0,0,.22),0 0 0 1px rgba(0,0,0,.06);}',
      '#atpc-win{position:fixed;bottom:82px;right:24px;z-index:99999;width:350px;max-height:500px;background:#fff;border-radius:20px;box-shadow:0 20px 60px rgba(0,0,0,.18);display:flex;flex-direction:column;overflow:hidden;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",sans-serif;transform:scale(.95) translateY(10px);opacity:0;pointer-events:none;transition:opacity .2s,transform .2s;}',
      '#atpc-win.open{opacity:1;pointer-events:all;transform:scale(1) translateY(0);}',
      '#atpc-hdr{background:#2E4A3C;color:#fff;padding:14px 16px;display:flex;align-items:center;gap:11px;flex-shrink:0;}',
      '#atpc-hdr img{width:36px;height:36px;border-radius:50%;object-fit:cover;border:2px solid rgba(255,255,255,.3);flex-shrink:0;}',
      '#atpc-hdr-txt strong{display:block;font-size:.88rem;}',
      '#atpc-hdr-txt span{display:block;font-size:.72rem;opacity:.7;margin-top:1px;}',
      '#atpc-hdr-txt em{display:block;font-size:.68rem;opacity:.55;font-style:italic;margin-top:1px;}',
      '#atpc-x{background:none;border:none;color:rgba(255,255,255,.7);cursor:pointer;font-size:18px;margin-left:auto;flex-shrink:0;padding:2px 4px;line-height:1;}',
      '#atpc-x:hover{color:#fff;}',
      '#atpc-msgs{flex:1;overflow-y:auto;padding:14px;display:flex;flex-direction:column;gap:8px;}',
      '.am{max-width:88%;font-size:.84rem;line-height:1.65;padding:9px 13px;border-radius:16px;}',
      '.am.bot{background:#F5F2EC;color:#2E4A3C;align-self:flex-start;border-bottom-left-radius:3px;}',
      '.am.user{background:#2E4A3C;color:#fff;align-self:flex-end;border-bottom-right-radius:3px;}',
      '.am a{color:#2E4A3C;font-weight:600;}',
      '.am .ac{display:inline-flex;margin-top:7px;background:#2E4A3C;color:#fff!important;text-decoration:none;border-radius:999px;padding:6px 13px;font-size:.76rem;font-weight:600;}',
      '#atpc-qr{display:flex;flex-wrap:wrap;gap:5px;padding:0 14px 10px;flex-shrink:0;}',
      '.aqb{background:#fff;border:1.5px solid #2E4A3C;color:#2E4A3C;border-radius:999px;padding:5px 11px;font-size:.76rem;font-weight:500;cursor:pointer;font-family:inherit;transition:background .15s;}',
      '.aqb:hover{background:#F5F2EC;}',
      '#atpc-row{display:flex;gap:7px;padding:10px 14px;border-top:1px solid rgba(0,0,0,.08);align-items:center;flex-shrink:0;}',
      '#atpc-inp{flex:1;border:1.5px solid rgba(0,0,0,.15);border-radius:999px;padding:8px 13px;font-size:.84rem;font-family:inherit;outline:none;color:#2E4A3C;transition:border-color .15s;}',
      '#atpc-inp:focus{border-color:#2E4A3C;}',
      '#atpc-send{background:#2E4A3C;border:none;border-radius:50%;width:34px;height:34px;display:flex;align-items:center;justify-content:center;cursor:pointer;flex-shrink:0;}',
      '#atpc-send:hover{opacity:.85;}',
      '@media(max-width:420px){#atpc-win{width:calc(100vw - 20px);right:10px;}#atpc-btn{bottom:16px;right:16px;}}'
    ].join('');
    document.head.appendChild(style);

    var imgSrc = base + 'img/alice-portrait.webp';

    var btn = document.createElement('button');
    btn.id = 'atpc-btn';
    btn.setAttribute('aria-label', 'Chat with us');
    btn.innerHTML = '<svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2"><path stroke-linecap="round" stroke-linejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/></svg> Have a question?';
    document.body.appendChild(btn);

    var win = document.createElement('div');
    win.id = 'atpc-win';
    win.setAttribute('role', 'dialog');
    win.setAttribute('aria-label', 'Chat with Alice Tran Psychiatric Care');
    win.innerHTML = '<div id="atpc-hdr"><img src="' + imgSrc + '" alt="Alice Tran" /><div id="atpc-hdr-txt"><strong>Alice Tran Psychiatric Care</strong><span>You\'re not alone. I\'m here to help.</span></div><button id="atpc-x" aria-label="Close">✕</button></div><div id="atpc-msgs"></div><div id="atpc-qr"></div><div id="atpc-row"><input id="atpc-inp" type="text" placeholder="Type your question..." autocomplete="off" /><button id="atpc-send" aria-label="Send"><svg width="15" height="15" fill="none" viewBox="0 0 24 24" stroke="#fff" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14M12 5l7 7-7 7"/></svg></button></div>';
    document.body.appendChild(win);

    var msgs = document.getElementById('atpc-msgs');
    var inp = document.getElementById('atpc-inp');
    var qrEl = document.getElementById('atpc-qr');

    function addMsg(html, type) {
      var d = document.createElement('div');
      d.className = 'am ' + type;
      d.innerHTML = html;
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
    }

    function clearQR() { qrEl.innerHTML = ''; }

    function showQR() {
      clearQR();
      QUICK_REPLIES.forEach(function (qr) {
        var b = document.createElement('button');
        b.className = 'aqb';
        b.textContent = qr.label;
        b.onclick = function () { send(qr.query); };
        qrEl.appendChild(b);
      });
    }

    function showFollowUp() {
      clearQR();
      var followUps = [
        { label: '📅 Schedule a consultation', href: 'https://alicetran.intakeq.com/booking', external: true },
        { label: '🔍 Verify insurance coverage', href: base + 'pages/rates.html', external: false },
        { label: '💬 Ask another question', focus: true }
      ];
      followUps.forEach(function (f) {
        var b = document.createElement('button');
        b.className = 'aqb';
        b.textContent = f.label;
        if (f.focus) {
          b.onclick = function () { clearQR(); inp.focus(); };
        } else {
          b.onclick = function () { window.open(f.href, f.external ? '_blank' : '_self'); };
        }
        qrEl.appendChild(b);
      });
    }

    function send(text) {
      if (!text.trim()) return;
      addMsg(text, 'user');
      inp.value = '';
      clearQR();
      setTimeout(function () {
        var result = findAnswer(text);
        if (result) {
          var html = result.answer;
          if (result.action) {
            html += '<br><a href="' + result.action.href + '" class="ac">' + result.action.label + '</a>';
          }
          addMsg(html, 'bot');
        } else {
          addMsg(FALLBACK, 'bot');
        }
        showFollowUp();
      }, 380);
    }

    // Greeting
    setTimeout(function () {
      addMsg('👋 Hi! I can answer common questions about Alice\'s practice. What\'s on your mind?', 'bot');
      showQR();
    }, 250);

    btn.onclick = function () { win.classList.toggle('open'); };
    document.getElementById('atpc-x').onclick = function () { win.classList.remove('open'); };
    document.getElementById('atpc-send').onclick = function () { send(inp.value); };
    inp.addEventListener('keydown', function (e) { if (e.key === 'Enter') send(inp.value); });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', buildWidget);
  } else {
    buildWidget();
  }
})();
