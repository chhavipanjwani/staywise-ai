'use client';

import Link from 'next/link';
import { ArrowRight, Bot, CheckCircle2, ExternalLink, Send, Sparkles, User, Waves } from 'lucide-react';
import { useState } from 'react';
import { properties, scoreProperty } from '@/lib/data';
import { Button, Pill, SectionTitle } from '@/components/UI';

type Source = {
  title?: string;
  site_name?: string;
  snippet?: string;
  url?: string;
};

type ChatMessage = {
  role: 'user' | 'assistant';
  text: string;
  ids?: string[];
  sources?: Source[];
};

type TinyFishPayload = {
  mode?: 'tinyfish' | 'demo' | 'error';
  results?: Source[];
  message?: string;
};

function getReply(input: string): ChatMessage {
  const q = input.toLowerCase();
  const city = ['delhi', 'jaipur', 'mumbai', 'bengaluru', 'pune'].find((name) => q.includes(name));
  const type = q.includes('pg') || q.includes('hostel') ? 'pg-hostel' : q.includes('hotel') ? 'hotel' : 'all';
  const budget = q.match(/(?:under|below|within|ke andar)\s*₹?\s*([\d,]+)/i)?.[1];
  const budgetNumber = budget ? Number(budget.replace(/,/g, '')) : undefined;
  const amenities = ['Wi-Fi', 'Meals', 'AC'].filter((item) => q.includes(item.toLowerCase().replace('-', '')) || q.includes(item.toLowerCase()));
  const rows = properties
    .map((property) => ({ property, score: scoreProperty(property, { city, type, budget: budgetNumber, amenities, purpose: q.includes('student') || q.includes('quiet') ? 'study' : undefined }) }))
    .filter(({ property, score }) => (type === 'all' || property.type === type || (type === 'pg-hostel' && ['pg', 'hostel', 'room'].includes(property.type))) && (!city || property.city === city) && score.score > 50)
    .sort((a, b) => b.score.score - a.score.score)
    .slice(0, 3);

  if (!rows.length) {
    return { role: 'assistant', text: 'I could not find a grounded demo match yet. Try “Find a hotel in Jaipur under ₹2,500” or “Mujhe IGDTUW ke paas girls PG under ₹10,000 chahiye”.' };
  }

  return {
    role: 'assistant',
    text: `I ranked ${rows.length} matches from the StayWise demo inventory. ${rows[0].property.name} is the lead because it is ${rows[0].score.reasons.slice(0, 2).join(' and ')}. This score is transparent and based only on available listing fields.`,
    ids: rows.map((row) => row.property.id)
  };
}

function normalizeSources(results: Source[] = []) {
  return results
    .filter((result) => result.url)
    .slice(0, 5)
    .map((result) => ({
      title: result.title || result.site_name || result.url,
      site_name: result.site_name,
      snippet: result.snippet,
      url: result.url
    }));
}

export default function AIAssistantPage() {
  const [draft, setDraft] = useState('');
  const [tinyFishOpen, setTinyFishOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [connectionState, setConnectionState] = useState<'unknown' | 'live' | 'demo'>('unknown');
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'assistant', text: 'Tell me your city, budget, accommodation type, and the one thing you care about most. I can follow up in English, Hindi, or Hinglish.' }
  ]);

  const send = async (value = draft) => {
    const prompt = value.trim();
    if (!prompt || isSearching) return;

    setDraft('');
    setMessages((current) => [...current, { role: 'user', text: prompt }]);
    setIsSearching(true);

    try {
      const response = await fetch('/api/tinyfish/search', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: prompt, location: 'IN' })
      });
      const payload = await response.json() as TinyFishPayload;
      const sources = normalizeSources(payload.results);

      if (payload.mode === 'tinyfish' && sources.length) {
        setConnectionState('live');
        setMessages((current) => [...current, {
          role: 'assistant',
          text: `TinyFish returned ${sources.length} live web sources for your request. These are current external results; open the sources to verify the details before making a booking.`,
          sources
        }]);
      } else {
        setConnectionState('demo');
        setMessages((current) => [...current, getReply(prompt)]);
      }
    } catch {
      setConnectionState('demo');
      setMessages((current) => [...current, getReply(prompt)]);
    } finally {
      setIsSearching(false);
    }
  };

  const samples = [
    'Find a hotel in Jaipur under ₹3,000',
    'Mujhe IGDTUW ke paas girls PG under ₹10,000 chahiye',
    'Which hostel is better for a quiet student?'
  ];

  const statusLabel = connectionState === 'live' ? 'TinyFish live' : connectionState === 'demo' ? 'Demo fallback' : 'Live connector ready';

  return (
    <div className="container-wide py-10 lg:py-14">
      <div className="grid gap-10 lg:grid-cols-[.75fr_1.25fr]">
        <div>
          <Pill tone={connectionState === 'live' ? 'teal' : 'purple'}><Sparkles className="mr-1" size={12} />{statusLabel}</Pill>
          <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-[var(--text)] sm:text-5xl">A better way to ask, “Where should I stay?”</h1>
          <p className="mt-5 text-base leading-7 text-[var(--muted)]">StayWise understands your request, checks the connected TinyFish web layer when configured, and explains the trade-offs. If live search is unavailable, the deterministic demo inventory keeps the prototype useful.</p>

          <div className="mt-7 space-y-3 text-sm text-[var(--muted)]">
            <div className="flex gap-3"><CheckCircle2 className="shrink-0 text-[#20b9a7]" size={18} />No invented listings, prices, or amenities.</div>
            <div className="flex gap-3"><CheckCircle2 className="shrink-0 text-[#20b9a7]" size={18} />Live sources are shown separately from sample inventory.</div>
            <div className="flex gap-3"><CheckCircle2 className="shrink-0 text-[#20b9a7]" size={18} />Follow-up questions keep the current search context.</div>
          </div>

          <div className="mt-8">
            <SectionTitle eyebrow="Try a prompt" title="Start with a real ask" />
            <div className="grid gap-2">
              {samples.map((sample) => <button key={sample} onClick={() => void send(sample)} disabled={isSearching} className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-3 text-left text-xs font-bold text-[var(--text)] transition hover:-translate-y-0.5 hover:border-[#7775e7] disabled:cursor-wait disabled:opacity-60">{sample}<ArrowRight className="float-right text-[#5554d8]" size={15} /></button>)}
            </div>
          </div>

          <div className="mt-8 rounded-[22px] border border-[#b7ece3] bg-[#effcf9] p-5 dark:border-[#225e58] dark:bg-[#173c3a]">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2 text-sm font-extrabold text-[#118c7f] dark:text-[#72e0d4]"><Waves size={17} />TinyFish live-web connector</div>
              <Pill tone="teal">Server route</Pill>
            </div>
            <p className="mt-3 text-xs leading-5 text-[var(--muted)]">Search requests go through a server-side StayWise route. The browser never receives <code className="rounded bg-white/60 px-1 dark:bg-black/20">TINYFISH_API_KEY</code>. Without the key, StayWise uses its safe local demo fallback.</p>
            <button onClick={() => setTinyFishOpen(!tinyFishOpen)} className="mt-3 text-xs font-bold text-[#118c7f]">{tinyFishOpen ? 'Hide integration details' : 'See how it connects'} <ArrowRight className="ml-1 inline" size={13} /></button>
            {tinyFishOpen && <div className="mt-3 rounded-xl bg-white/70 p-3 text-[11px] leading-5 text-[var(--muted)] dark:bg-black/15">StayWise calls TinyFish Search from the server, displays the returned source links, and keeps sample properties separate. TinyFish is not used to confirm bookings or invent property facts.</div>}
            <a href="https://agent.tinyfish.ai" target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[11px] font-bold text-[#5554d8]">Open TinyFish dashboard <ExternalLink size={12} /></a>
          </div>
        </div>

        <div className="overflow-hidden rounded-[28px] border border-[var(--line)] bg-[var(--surface)] shadow-soft">
          <div className="flex items-center gap-3 bg-[#0c1532] p-5 text-white">
            <span className="grid h-10 w-10 place-items-center rounded-2xl bg-[#20b9a7]"><Bot size={19} /></span>
            <div><div className="font-extrabold">StayWise AI Assistant</div><div className="mt-1 text-[10px] font-bold uppercase tracking-wider text-white/50">{isSearching ? 'Searching live web sources…' : statusLabel}</div></div>
          </div>

          <div className="min-h-[440px] space-y-4 overflow-y-auto bg-[var(--bg)] p-4 sm:p-6">
            {messages.map((message, index) => <div key={index} className={`flex gap-3 ${message.role === 'user' ? 'flex-row-reverse' : ''}`}>
              <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-xl ${message.role === 'user' ? 'bg-[#ececff] text-[#5554d8]' : 'bg-[#e2f8f3] text-[#118c7f]'}`}>{message.role === 'user' ? <User size={15} /> : <Bot size={15} />}</span>
              <div className={`max-w-[86%] rounded-2xl px-4 py-3 text-sm leading-6 ${message.role === 'user' ? 'bg-[#5554d8] text-white' : 'border border-[var(--line)] bg-[var(--surface)] text-[var(--text)]'}`}>
                {message.text}
                {message.ids && <div className="mt-3 grid gap-2">{message.ids.map((id) => { const property = properties.find((item) => item.id === id); return property ? <Link key={id} href={`/property/${id}`} className="flex items-center justify-between rounded-xl bg-[var(--surface-2)] px-3 py-2 text-xs font-bold text-[#5554d8]"><span>{property.name}</span><ArrowRight size={13} /></Link> : null; })}</div>}
                {message.sources && <div className="mt-3 grid gap-2">{message.sources.map((source, sourceIndex) => source.url ? <a key={`${source.url}-${sourceIndex}`} href={source.url} target="_blank" rel="noreferrer" className="rounded-xl bg-[var(--surface-2)] px-3 py-2 text-xs text-[#5554d8] transition hover:bg-[#ececff]"><span className="font-bold">{source.title}</span>{source.snippet && <span className="mt-1 block line-clamp-2 text-[var(--muted)]">{source.snippet}</span>}<span className="mt-1 block text-[10px] text-[var(--muted)]">Open source ↗</span></a> : null)}</div>}
              </div>
            </div>)}
            {isSearching && <div className="flex gap-3"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#e2f8f3] text-[#118c7f]"><Bot size={15} /></span><div className="rounded-2xl border border-[var(--line)] bg-[var(--surface)] px-4 py-3 text-sm text-[var(--muted)]">Checking TinyFish live sources…</div></div>}
          </div>

          <div className="flex gap-2 border-t border-[var(--line)] p-4">
            <input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') void send(); }} placeholder="Ask in English, Hindi or Hinglish…" disabled={isSearching} className="min-w-0 flex-1 rounded-xl bg-[var(--surface-2)] px-4 py-3 text-sm text-[var(--text)] outline-none disabled:opacity-60" />
            <Button onClick={() => void send()} disabled={isSearching}><Send size={16} />{isSearching ? 'Searching' : 'Send'}</Button>
          </div>
        </div>
      </div>
    </div>
  );
}
