import ChatWidget from "../components/chat/ChatWidget";

const LandingPage = () => {
  return (
    <div className="min-h-screen bg-slate-50">
      <header className="px-6 py-4">
        <nav className="mx-auto flex max-w-6xl items-center justify-between">
          <div className="flex items-center gap-3 text-slate-900">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-600 text-white">
              B
            </span>
            <span className="text-sm font-semibold">BusinessCo</span>
          </div>
          <div className="hidden items-center gap-6 text-sm text-slate-500 md:flex">
            <a href="#solutions" className="hover:text-slate-700">Solutions</a>
            <a href="#capabilities" className="hover:text-slate-700">Capabilities</a>
            <a href="#contact" className="hover:text-slate-700">Contact</a>
          </div>
          <button className="rounded-full bg-brand-600 px-4 py-2 text-xs font-semibold text-white">
            Get Started
          </button>
        </nav>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-24 pt-10">
        <section className="grid items-center gap-10 md:grid-cols-2">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-600">Modern AI Assistance</p>
            <h1 className="mt-3 text-4xl font-semibold text-slate-900 md:text-5xl">
              Transform customer journeys with a smart support layer
            </h1>
            <p className="mt-4 text-base text-slate-500">
              Deliver fast answers, personalized continuity, and guided recommendations through a polished AI chatbot
              experience.
            </p>
            <div className="mt-6 flex flex-wrap gap-3">
              <button className="rounded-full bg-brand-600 px-5 py-2 text-sm font-semibold text-white">
                Start Free Trial
              </button>
              <button className="rounded-full border border-slate-200 px-5 py-2 text-sm font-semibold text-slate-600">
                Watch Demo
              </button>
            </div>
          </div>
          <div className="rounded-3xl border border-slate-100 bg-white p-6 shadow-card">
            <div className="grid gap-4">
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Premium features</p>
                <p className="text-xs text-slate-500">Connect plans, support, and workflows in one place.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">24/7 support</p>
                <p className="text-xs text-slate-500">Answer requests instantly and reduce response time.</p>
              </div>
              <div className="rounded-2xl bg-slate-50 p-4">
                <p className="text-sm font-semibold text-slate-900">Global reach</p>
                <p className="text-xs text-slate-500">Serve customers across regions with consistent quality.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="capabilities" className="grid gap-6 md:grid-cols-3">
          {[
            {
              title: "Instant intent capture",
              description: "Quick replies convert high-intent users without friction."
            },
            {
              title: "Personalized continuity",
              description: "Bring CRM context directly into the chat experience."
            },
            {
              title: "Integrated actions",
              description: "Book sessions, share locations, and recommend services seamlessly."
            }
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm">
              <p className="text-sm font-semibold text-slate-900">{item.title}</p>
              <p className="mt-2 text-xs text-slate-500">{item.description}</p>
            </div>
          ))}
        </section>
      </main>

      <ChatWidget />
    </div>
  );
};

export default LandingPage;
