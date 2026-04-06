# FOSSEE Workshop Booking — UI/UX Redesign

> **Frontend redesign of [FOSSEE/workshop_booking](https://github.com/FOSSEE/workshop_booking) using React + Vite.**  
> This project is a submission for the FOSSEE Python Screening Task (April 2026).

---

## 🎬 Live Demo Walkthrough

![FOSSEE App Walkthrough](./public/demo.webp)

---

## 📸 Before vs After

The original Django-templated site is functional but minimal — plain HTML forms, no mobile layout, no visual hierarchy. Below are side-by-side comparisons of key pages.

> Screenshots of the original Django app are in `docs/screenshots/before/`  
> Screenshots of the redesign are in `docs/screenshots/after/`

| Page | Original (Django) | Redesign (React) |
|------|-------------------|------------------|
| Home / Landing | Bare text links, no hero | Animated hero, feature cards, CTA buttons |
| Workshop List | Plain `<ul>` with hyperlinks | Searchable card grid with pagination |
| Workshop Detail | Raw form fields | Glassmorphism header, metadata grid, comment thread |
| Login | Unstyled Django form | Centered card, error states, demo credential hint |
| Registration | Single-column Django form | Multi-section form with radio groups and validation |
| Dashboard | None (no dedicated view) | Role-aware tab dashboard with stat cards |

---

## 🧠 Design Reasoning (Required Questions)

### Q1 — What design principles guided my improvements?

I applied four concrete principles, not just aesthetic choices:

1. **Visual hierarchy via type scale** — I established a 7-step type scale (`0.75rem` → `2.5rem`) with a consistent `4px` base spacing unit. Every layout decision derives from multiples of this base, creating rhythmic consistency across screens.

2. **Fitts's Law for touch targets** — Every interactive element (buttons, nav links, form controls) meets the WCAG 2.1 minimum of 44×44px. On the original site, the nav links were too small for reliable mobile taps.

3. **F-pattern and progressive disclosure** — Workshop cards expose just enough info (name, duration, description excerpt) to support scanning. Details are deferred to the detail page, reducing cognitive load on list views.

4. **WCAG AA contrast** — The coral (`#e94560`) on deep-indigo (`#0f0f1a`) background achieves a contrast ratio above 4.5:1 for normal text (verified at [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker)). The light theme (`data-theme="light"`) provides an alternative for outdoor use.

### Q2 — How did I ensure responsiveness across devices?

I used a **mobile-first CSS strategy** — base styles target small screens, and `min-width` media queries progressively enhance for wider viewports:

```css
/* Base: mobile (< 480px) — default styles */
/* Tablet: 768px+ */
@media (min-width: 768px) { ... }
/* Desktop: 1024px+ */
@media (min-width: 1024px) { ... }
```

Specific decisions:
- **Navigation**: collapses to a slide-in drawer with a hamburger button on mobile; full horizontal navbar on desktop
- **Forms**: single-column stack on mobile → two-column grid on desktop (`grid-template-columns: 1fr 1fr`)
- **Workshop grid**: 1 column on mobile → 2 on tablet → 3 on desktop
- **Touch targets**: all buttons/links are `min-height: 44px` per WCAG 2.1 SC 2.5.5
- Tested across Chrome DevTools device presets (iPhone SE, Pixel 7, iPad, desktop)

### Q3 — What trade-offs did I make between design and performance?

I made three explicit trade-offs, each a conscious decision rather than an oversight:

1. **Google Fonts external load vs self-hosting** — I load Inter and Material Icons from Google Fonts CDN (combined into a single request with `preload`). This costs ~40KB and one external DNS lookup, but the global CDN cache hit rate means most users already have these fonts cached. Self-hosting would eliminate the external risk but add build complexity. For a demo submission, CDN wins.

2. **CSS animations vs no animations** — I chose CSS keyframe animations (`fadeIn`, `slideUp`) over a JS animation library. This keeps the bundle ~0KB heavier for animation code, at the cost of less animation flexibility. I wrapped all animations in a `prefers-reduced-motion` media query so users who disable motion aren't affected.

3. **Mock data layer vs real API** — I implemented a `mockData.js` layer mirroring the Django models exactly, which means the UI works standalone without the Python server. The trade-off is that the UI doesn't demonstrate real-time API integration. I partially addressed this by wiring `WorkshopTypes` and `Dashboard` to attempt a real `fetch()` to `http://localhost:8000/api/` before falling back to mock state.

### Q4 — What was the most challenging part and how did I approach it?

The hardest part was **mapping Django's role-based permission system to React Context** without a real auth backend.

In Django, the original `workshop_booking` app gates views server-side using `@login_required` and checks `request.user.profile.position`. In React, there's no server enforcing these rules — everything runs in the browser. I had to replicate the coordinator/instructor permission logic entirely client-side using `AuthContext`.

The specific challenge: the original Django model uses a `Profile` model with a `position` field that has `(coordinator, instructor)` choices. My `AuthContext` exposes an `isInstructor()` helper that checks `user?.position === 'instructor'`. This drives three different UI states:
- **Unauthenticated** → public view (browse workshops, no dashboard)
- **Coordinator** → can propose workshops, see own bookings
- **Instructor** → sees all pending bookings, can accept/reject/change date

Getting this role-switching to feel seamless — especially on `ProtectedRoute` and the `Dashboard` tab system — required careful state design. I chose React Context over prop drilling because 6+ components need auth state simultaneously.

---

## 🚀 How to Run Locally

### Frontend Only (no backend needed)

```bash
# 1. Clone this repository
git clone https://github.com/hardik0903/fossee-workshop-booking-ui.git
cd fossee-workshop-booking-ui

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev

# 4. Open in browser
# → http://localhost:5173
```

### Demo Credentials

> This is a **frontend-only demo** with mocked auth and data. No real account is created.

| Role | Email | Password |
|------|-------|----------|
| Coordinator | `rajesh@college.edu` | any (min 4 chars) |
| Instructor | `sharma@iitb.ac.in` | any (min 4 chars) |

Unknown emails will be **rejected** — only the two accounts above can log in.

### Optional: Run with Django Backend

The app attempts real API calls to `http://localhost:8000/api/` on the Workshop List and Dashboard pages. To enable this:

```bash
# In a separate terminal — requires Python 3.8+
cd django_backend
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

If the Django server is not running, the app falls back to mock data automatically.

---

## 🛠️ Tech Stack

| Layer | Choice | Reason |
|-------|--------|--------|
| UI Framework | React 19 | Component-driven, matches task requirement |
| Build Tool | Vite 8 | Instant HMR, optimised production bundle |
| Routing | react-router-dom v7 | Declarative client-side routing |
| SEO | react-helmet-async | Per-page dynamic `<head>` tags in SPA |
| Styling | Vanilla CSS + CSS variables | Zero runtime overhead, full design control |
| Icons | Material Icons Round | Consistent, accessible, CDN-cached |
| Prop validation | prop-types | Dev-time type checking, documents component contracts |

---

## 📁 Repository Structure

```
src/
├── components/         # Reusable UI pieces
│   ├── Navbar.jsx      # Responsive nav with mobile drawer + aria-expanded
│   ├── Footer.jsx      # Site footer with quick links
│   ├── WorkshopCard.jsx # Dual-variant card (type listing + dashboard instance)
│   ├── StatusBadge.jsx # Pill badge: pending / accepted / deleted
│   ├── Pagination.jsx  # Accessible page navigation
│   ├── ProtectedRoute.jsx # Auth guard wrapper
│   ├── LoadingSpinner.jsx # CSS-only spinner (no JS library)
│   └── ThemeToggle.jsx # Dark/light mode switch (localStorage persisted)
├── context/
│   ├── AuthContext.jsx # Login / register / logout state + role helpers
│   └── ThemeContext.jsx # Theme state with data-theme attribute on <html>
├── data/
│   └── mockData.js     # Mock users, workshop types, bookings — mirrors Django models
├── pages/
│   ├── Home.jsx        # Landing page with hero and feature cards
│   ├── Login.jsx       # Auth form with demo credential hint
│   ├── Register.jsx    # Multi-section coordinator registration form
│   ├── WorkshopTypes.jsx     # Searchable, paginated workshop catalogue
│   ├── WorkshopTypeDetail.jsx # Workshop info + T&C + propose button
│   ├── WorkshopDetail.jsx    # Booking detail + instructor action bar + comments
│   ├── Dashboard.jsx   # Role-aware dashboard with stat cards and tab filter
│   ├── ProposeWorkshop.jsx   # Coordinator proposal form with T&C checkbox
│   └── Profile.jsx     # Editable user profile
├── App.jsx             # Router setup, skip-nav link, route definitions
├── App.css             # Skip-link styles, main landmark styles
└── index.css           # Design tokens (CSS variables), global styles, utility classes
```

---

## ♿ Accessibility Implementation

I targeted WCAG 2.1 AA compliance throughout:

- **Skip navigation link** — a visually hidden `<a href="#main-content">` appears on keyboard focus, letting keyboard users jump past the navbar (SC 2.4.1)
- **`role="main"`** — main content area is wrapped in `<main id="main-content" role="main">` for screen reader landmark navigation
- **`aria-label` on icon-only buttons** — every button that shows only an icon has an explicit `aria-label` (hamburger: "Toggle navigation menu", theme toggle: "Switch to dark/light mode", download buttons: "Download {filename}")
- **`aria-expanded`** — the hamburger button and user dropdown both reflect open/closed state via `aria-expanded`
- **`aria-hidden="true"`** — all decorative Material Icons spans carry `aria-hidden` so screen readers skip the ligature text
- **Focus ring** — every interactive element has a visible 2px coral focus outline via `a:focus-visible, button:focus-visible`
- **Escape key** — both the mobile drawer and user dropdown close on `Escape` (SC 2.1.2)
- **`prefers-reduced-motion`** — all CSS animations are disabled to `0.01ms` for users with vestibular disorders (SC 2.3.3)
- **Semantic HTML** — `<nav>`, `<main>`, `<footer>`, `<section>`, `<form>`, `<label>` used correctly throughout
- **ARIA roles on tabs** — Dashboard tabs use `role="tablist"`, `role="tab"`, `aria-selected`, `aria-controls`

---

## 🔍 SEO Implementation

- **`react-helmet-async`** wraps the app at root level in `main.jsx` via `<HelmetProvider>`
- Every page sets a unique `<title>` and `<meta name="description">` via `<Helmet>`
- Workshop detail pages set **dynamic titles** from the workshop name (e.g., "Python Programming | FOSSEE Workshops")
- All pages include **Open Graph tags** (`og:title`, `og:description`, `og:type`, `og:site_name`) for social sharing previews
- `index.html` baseline includes `description`, `keywords`, `author`, `theme-color`
- Google Fonts combined into a **single request** with `rel="preload"` to prevent render-blocking
- Semantic heading hierarchy: single `<h1>` per page, `<h2>` for sections, `<h3>` for cards

---

## 📄 License

This project is a portfolio/submission piece. The original Django app is © FOSSEE, IIT Bombay.
