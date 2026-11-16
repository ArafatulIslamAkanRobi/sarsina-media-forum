/* Interactions for the static, single-page preview (no React). */
(function () {
  "use strict";
  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var BN = "০১২৩৪৫৬৭৮৯";
  var bn = function (n) { return String(n).replace(/[0-9]/g, function (d) { return BN[d]; }); };
  var toAscii = function (s) { return s.replace(/[০-৯]/g, function (d) { return String(BN.indexOf(d)); }); };
  var taka = function (n) {
    var s = String(Math.round(n)), last = s.slice(-3), rest = s.slice(0, -3).replace(/\B(?=(\d{2})+(?!\d))/g, ",");
    return "৳ " + bn(rest ? rest + "," + last : last);
  };

  /* ---------------- Routing (#route or #route--anchor) */
  var sections = $$("main > section[data-route]");
  var routes = {};
  sections.forEach(function (s) { routes[s.getAttribute("data-route")] = s; });
  var current = "home";

  function markActive(route) {
    var top = route.split("-")[0];
    $$(".nav__link, .drawer-link, .bottom-nav a").forEach(function (a) {
      var h = (a.getAttribute("href") || "").replace(/^#/, "").split("--")[0];
      var on = h === route || (h !== "home" && h === top) || (h === "home" && route === "home");
      if (a.tagName === "A" && on) a.setAttribute("aria-current", "page"); else if (a.tagName === "A") a.removeAttribute("aria-current");
    });
  }

  function show() {
    var raw = decodeURIComponent(location.hash.replace(/^#/, ""));
    var parts = raw.split("--"), route = parts[0], anchor = parts[1];
    if (!raw) route = "home";
    if (!routes[route]) {
      // plain in-page anchor such as #quick-donate or a table-of-contents link
      var target = raw && routes[current] && routes[current].querySelector("#" + CSS.escape(raw));
      if (target) target.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    if (route !== current) {
      routes[current].hidden = true;
      routes[route].hidden = false;
      current = route;
      document.title = routes[route].getAttribute("data-title") || document.title;
    }
    closeDrawer();
    markActive(route);
    var el = anchor && routes[route].querySelector("#" + CSS.escape(anchor));
    if (el) setTimeout(function () { el.scrollIntoView({ block: "start" }); }, 0);
    else window.scrollTo(0, 0);
  }
  window.addEventListener("hashchange", show);

  /* ---------------- Drawer */
  var drawer = $("#site-drawer"), backdrop = $(".drawer-backdrop");
  function openDrawer() {
    if (!drawer) return;
    drawer.setAttribute("data-open", "true"); backdrop.setAttribute("data-open", "true");
    drawer.removeAttribute("inert"); document.body.style.overflow = "hidden";
    var c = $(".drawer__head .icon-btn", drawer); if (c) c.focus();
  }
  function closeDrawer() {
    if (!drawer || drawer.getAttribute("data-open") !== "true") return;
    drawer.setAttribute("data-open", "false"); backdrop.setAttribute("data-open", "false");
    drawer.setAttribute("inert", ""); document.body.style.overflow = "";
  }
  $$('button[aria-controls="site-drawer"]').forEach(function (b) { b.addEventListener("click", openDrawer); });
  if (backdrop) backdrop.addEventListener("click", closeDrawer);
  var closeBtn = drawer && $(".drawer__head .icon-btn", drawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  $$(".drawer-acc").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var sub = btn.nextElementSibling, open = btn.getAttribute("aria-expanded") === "true";
      $$(".drawer-acc").forEach(function (o) { o.setAttribute("aria-expanded", "false"); if (o.nextElementSibling) o.nextElementSibling.hidden = true; });
      if (!open && sub) { btn.setAttribute("aria-expanded", "true"); sub.hidden = false; }
    });
  });

  /* ---------------- Desktop dropdowns */
  $$(".nav__item > button.nav__link").forEach(function (btn) {
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var item = btn.parentElement, open = item.getAttribute("data-open") === "true";
      $$(".nav__item").forEach(function (i) { i.setAttribute("data-open", "false"); });
      item.setAttribute("data-open", open ? "false" : "true");
      btn.setAttribute("aria-expanded", open ? "false" : "true");
    });
  });
  document.addEventListener("click", function () { $$(".nav__item").forEach(function (i) { i.setAttribute("data-open", "false"); }); });
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") { closeDrawer(); $$(".nav__item").forEach(function (i) { i.setAttribute("data-open", "false"); }); }
  });

  /* ---------------- Today's date */
  var dateEl = $(".topbar .topbar__item span");
  if (dateEl) {
    var months = ["জানুয়ারি", "ফেব্রুয়ারি", "মার্চ", "এপ্রিল", "মে", "জুন", "জুলাই", "আগস্ট", "সেপ্টেম্বর", "অক্টোবর", "নভেম্বর", "ডিসেম্বর"];
    var days = ["রবিবার", "সোমবার", "মঙ্গলবার", "বুধবার", "বৃহস্পতিবার", "শুক্রবার", "শনিবার"];
    var d = new Date();
    dateEl.textContent = bn(d.getDate()) + " " + months[d.getMonth()] + " " + bn(d.getFullYear()) + " (" + days[d.getDay()] + ")";
  }

  /* ---------------- Hero slider */
  $$(".hero").forEach(function (hero) {
    var slides = $$(".hero__slide", hero), dots = $$(".hero__dot", hero), i = 0, timer;
    if (slides.length < 2) return;
    var reduce = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    function go(n) {
      i = (n + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        s.setAttribute("data-active", k === i ? "true" : "false");
        s.setAttribute("aria-hidden", k === i ? "false" : "true");
        if (k === i) s.removeAttribute("inert"); else s.setAttribute("inert", "");
      });
      dots.forEach(function (d, k) { d.setAttribute("aria-current", k === i ? "true" : "false"); });
      schedule();
    }
    function schedule() { clearTimeout(timer); if (!reduce) timer = setTimeout(function () { go(i + 1); }, 7000); }
    dots.forEach(function (d, k) { d.addEventListener("click", function () { go(k); }); });
    var arrows = $$(".hero__arrow", hero);
    if (arrows[0]) arrows[0].addEventListener("click", function () { go(i - 1); });
    if (arrows[1]) arrows[1].addEventListener("click", function () { go(i + 1); });
    hero.addEventListener("mouseenter", function () { clearTimeout(timer); });
    hero.addEventListener("mouseleave", schedule);
    var x0 = null;
    hero.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
    hero.addEventListener("touchend", function (e) {
      if (x0 === null) return; var dx = e.changedTouches[0].clientX - x0;
      if (Math.abs(dx) > 50) go(i + (dx < 0 ? 1 : -1)); x0 = null;
    });
    schedule();
  });

  /* ---------------- Form helpers */
  function setError(input, msg) {
    var field = input.closest(".field") || input.parentElement;
    var el = field.querySelector(".error.js");
    if (!msg) { if (el) el.remove(); input.removeAttribute("aria-invalid"); return; }
    if (!el) { el = document.createElement("span"); el.className = "error js"; field.appendChild(el); }
    el.textContent = msg; input.setAttribute("aria-invalid", "true");
  }
  function notice(host, kind, html) {
    var box = host.querySelector(".js-notice");
    if (!box) { box = document.createElement("p"); host.appendChild(box); }
    box.className = "alert alert--" + kind + " js-notice";
    box.setAttribute("role", "status");
    box.innerHTML = html;
  }
  var EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, MOBILE = /^(?:\+?88)?01[3-9]\d{8}$/;

  /* Donation forms */
  $$("form.donate-form").forEach(function (form) {
    var fund = $("select", form), contact = $('[id="df-contact"]', form), amount = $('[id="df-amount"]', form);
    var name = $('[id="df-name"]', form), anon = $('input[type="checkbox"]', form), submit = $('button[type="submit"]', form);
    var chips = $$(".chip", form).filter(function (c) { return c.hasAttribute("aria-pressed"); });
    function amt() { return Number(toAscii(amount.value || "")); }
    function sync() {
      chips.forEach(function (c) { c.setAttribute("aria-pressed", Number(toAscii(c.textContent).replace(/[^0-9]/g, "")) === amt() ? "true" : "false"); });
      submit.lastChild.textContent = amt() >= 10 ? taka(amt()) + " দান করুন" : "দান করুন";
    }
    chips.forEach(function (c) { c.addEventListener("click", function () { amount.value = toAscii(c.textContent).replace(/[^0-9]/g, ""); sync(); }); });
    amount.addEventListener("input", function () { amount.value = amount.value.replace(/[^0-9০-৯]/g, ""); sync(); });
    if (anon) anon.addEventListener("change", function () { name.disabled = anon.checked; if (anon.checked) name.value = ""; });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true, c = toAscii(contact.value.trim()).replace(/[\s-]/g, "");
      if (!fund.value) { setError(fund, "একটি তহবিল নির্বাচন করুন"); ok = false; } else setError(fund);
      if (!c) { setError(contact, "মোবাইল নম্বর অথবা ইমেইল লিখুন"); ok = false; }
      else if (!MOBILE.test(c) && !EMAIL.test(c)) { setError(contact, "সঠিক মোবাইল নম্বর (01XXXXXXXXX) অথবা ইমেইল লিখুন"); ok = false; }
      else setError(contact);
      if (!amount.value) { setError(amount, "অনুদানের পরিমাণ লিখুন"); ok = false; }
      else if (amt() < 10) { setError(amount, "সর্বনিম্ন ৳ ১০"); ok = false; } else setError(amount);
      var host = submit.parentElement.querySelector("[aria-live]") || submit.parentElement;
      if (!ok) { var bad = form.querySelector('[aria-invalid="true"]'); if (bad) bad.focus(); return; }
      notice(host, "info", "আপনার তথ্য যাচাই হয়েছে — <b>" + fund.options[fund.selectedIndex].text + "</b> তহবিলে <b>" + taka(amt()) +
        "</b>। তবে অনলাইন পেমেন্ট সংযুক্ত না হওয়ায় কোনো লেনদেন সম্পন্ন হয়নি এবং কোনো অর্থ কাটা হয়নি।");
    });
  });

  /* Newsletter */
  $$(".newsletter form").forEach(function (form) {
    var input = $("input", form);
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var host = $("[aria-live]", form) || form;
      if (!EMAIL.test(input.value.trim())) { notice(host, "warn", "সঠিক ইমেইল ঠিকানা লিখুন"); input.setAttribute("aria-invalid", "true"); return; }
      input.removeAttribute("aria-invalid");
      notice(host, "warn", "ধন্যবাদ! নিউজলেটার সেবা এখনো চালু হয়নি — চালু হলে এই ফর্ম থেকেই সাবস্ক্রাইব করা যাবে।");
    });
  });

  /* Member login */
  $$(".auth-card form").forEach(function (form) {
    var id = $('[id="lg-id"]', form), pw = $('[id="lg-pw"]', form), eye = $(".input-group__btn", form);
    var host = $("[aria-live]", form) || form;
    if (eye) eye.addEventListener("click", function () {
      var show = pw.type === "password"; pw.type = show ? "text" : "password";
      eye.setAttribute("aria-pressed", show ? "true" : "false");
      eye.setAttribute("aria-label", show ? "পাসওয়ার্ড লুকান" : "পাসওয়ার্ড দেখুন");
    });
    $$("button[type=button]", form).forEach(function (b) {
      if (b !== eye) b.addEventListener("click", function () { notice(host, "warn", "পাসওয়ার্ড পুনরুদ্ধারের জন্য অ্যাডমিনের সাথে যোগাযোগ করুন।"); });
    });
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      var ok = true;
      if (!id.value.trim()) { setError(id, "সদস্য আইডি অথবা ইমেইল লিখুন"); ok = false; } else setError(id);
      if (pw.value.length < 8) { setError(pw, "পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে"); ok = false; } else setError(pw);
      if (ok) notice(host, "warn", "এটি প্রিভিউ সংস্করণ — লগইন সার্ভারের সাথে এখনো সংযুক্ত নয়।");
    });
  });

  /* Copy-link share buttons */
  $$('.share button[aria-label="লিংক কপি করুন"]').forEach(function (b) {
    b.addEventListener("click", function () {
      if (navigator.clipboard) navigator.clipboard.writeText(location.href).then(function () { b.style.background = "#e8f2ec"; }, function () {});
    });
  });

  show();
})();
