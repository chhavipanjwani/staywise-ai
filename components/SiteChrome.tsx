'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BedDouble, Bot, ChevronDown, Compass, Heart, Menu, Moon, Search, Sparkles, Sun, Users, X } from 'lucide-react';
import { useState } from 'react';
import { useStayWise } from '@/components/StayWiseProvider';
import { AIChat } from '@/components/AIChat';

const navItems = [
  { href: '/explore', label: 'Explore', icon: Compass },
  { href: '/hotels', label: 'Hotels', icon: BedDouble },
  { href: '/pg-hostels', label: 'PGs & Hostels', icon: Search },
  { href: '/roommates', label: 'Roommates', icon: Users },
];

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { theme, toggleTheme, savedIds, compareIds } = useStayWise();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="min-h-screen bg-[var(--bg)] transition-colors">
      <header className="sticky top-0 z-40 border-b border-[var(--line)] bg-[var(--bg)]/90 backdrop-blur-xl">
        <div className="container-wide flex h-[72px] items-center justify-between gap-6">
          <Link href="/" className="flex items-center gap-3" onClick={() => setMobileOpen(false)}>
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[var(--navy)] text-white shadow-lg shadow-indigo-500/15"><Sparkles size={18} /></span>
            <span className="leading-none"><span className="block text-[17px] font-extrabold tracking-tight">StayWise<span className="text-[#4e55d9]"> AI</span></span><span className="mt-1 block text-[9px] font-bold uppercase tracking-[.22em] text-[var(--muted)]">Smarter stays</span></span>
          </Link>
          <nav className="hidden items-center gap-1 lg:flex">
            {navItems.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className={`rounded-xl px-3 py-2 text-sm font-semibold transition hover:bg-[var(--surface-2)] ${pathname === href || pathname.startsWith(`${href}/`) ? 'bg-[var(--surface-2)] text-[#5554d8]' : 'text-[var(--muted)]'}`}><Icon className="mr-1.5 inline" size={15} />{label}</Link>)}
            <Link href="/ai-assistant" className="ml-2 rounded-xl bg-gradient-to-r from-[#5a5ce2] to-[#1eb5a4] px-4 py-2 text-sm font-bold text-white shadow-lg shadow-indigo-500/20 transition hover:-translate-y-0.5"><Bot className="mr-1.5 inline" size={15} />Try AI</Link>
          </nav>
          <div className="hidden items-center gap-2 md:flex">
            <Link href="/dashboard" aria-label="Saved and dashboard" className="relative rounded-xl p-2.5 text-[var(--muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text)]"><Heart size={18} />{savedIds.length > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#5554d8] px-1 text-[9px] font-bold text-white">{savedIds.length}</span>}</Link>
            <Link href="/compare" aria-label="Compare properties" className="relative rounded-xl p-2.5 text-[var(--muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text)]"><span className="text-sm font-bold">⇄</span>{compareIds.length > 0 && <span className="absolute -right-1 -top-1 grid h-4 min-w-4 place-items-center rounded-full bg-[#20ad9d] px-1 text-[9px] font-bold text-white">{compareIds.length}</span>}</Link>
            <button onClick={toggleTheme} aria-label="Toggle color theme" className="rounded-xl p-2.5 text-[var(--muted)] transition hover:bg-[var(--surface-2)] hover:text-[var(--text)]">{theme === 'light' ? <Moon size={17} /> : <Sun size={17} />}</button>
            <Link href="/login" className="rounded-xl border border-[var(--line)] px-3.5 py-2 text-sm font-bold text-[var(--text)] transition hover:border-[#7775e7]">Sign in</Link>
          </div>
          <button className="rounded-xl p-2 text-[var(--text)] lg:hidden" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Toggle menu">{mobileOpen ? <X /> : <Menu />}</button>
        </div>
        {mobileOpen && <div className="border-t border-[var(--line)] bg-[var(--surface)] px-5 py-4 lg:hidden"><div className="container-wide grid gap-2">{navItems.map(({ href, label }) => <Link key={href} href={href} onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface-2)]">{label}</Link>)}<Link href="/ai-assistant" onClick={() => setMobileOpen(false)} className="rounded-xl bg-[#5554d8] px-3 py-3 text-sm font-bold text-white">Try AI demo</Link><Link href="/dashboard" onClick={() => setMobileOpen(false)} className="rounded-xl px-3 py-3 text-sm font-semibold text-[var(--text)] hover:bg-[var(--surface-2)]">Dashboard · {savedIds.length} saved</Link></div></div>}
      </header>
      <main>{children}</main>
      <AIChat />
    </div>
  );
}
