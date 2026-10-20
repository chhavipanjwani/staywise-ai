'use client';

import Link from 'next/link';
import { Bot, MessageCircle, Send, Sparkles, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { properties, scoreProperty } from '@/lib/data';

type Message = { role: 'assistant' | 'user'; text: string; propertyIds?: string[] };

function answer(input: string): Message {
  const query = input.toLowerCase();
  const city = ['delhi', 'jaipur', 'mumbai', 'bengaluru', 'pune', 'hyderabad'].find((item) => query.includes(item));
  const type = query.includes('pg') || query.includes('hostel') ? 'pg-hostel' : query.includes('hotel') ? 'hotel' : 'all';
  const budgetMatch = query.match(/(?:under|below|within|less than)\s*₹?\s*([\d,]+)/i);
  const budget = budgetMatch ? Number(budgetMatch[1].replace(/,/g, '')) : undefined;
  const amenities = ['wifi', 'wi-fi', 'food', 'meal', 'quiet', 'parking', 'ac'].filter((item) => query.includes(item)).map((item) => item === 'wifi' ? 'Wi-Fi' : item === 'food' || item === 'meal' ? 'Meals' : item === 'quiet' ? 'quiet' : item.toUpperCase());
  const matches = properties.map((property) => ({ property, result: scoreProperty(property, { city, type, budget, amenities, purpose: query.includes('student') || query.includes('quiet') ? 'study' : undefined }) })).filter(({ result }) => result.score >= 55).sort((a, b) => b.result.score - a.result.score).slice(0, 3);
  if (!matches.length) return { role: 'assistant', text: 'I could not find a strong match in the demo inventory yet. Try a city, stay type, and budget — for example “girls PG near IGDTUW under ₹10,000 with food and Wi-Fi”.' };
  const lead = matches[0];
  return { role: 'assistant', text: `I found ${matches.length} data-backed matches. ${lead.property.name} leads at ${lead.result.score}% because it is ${lead.result.reasons.slice(0, 2).join(' and ')}. I’m using demo listing data and I won’t invent amenities or travel times.`, propertyIds: matches.map(({ property }) => property.id) };
}

export function AIChat() {
  const [open, setOpen] = useState(false);
  const [draft, setDraft] = useState('');
  const [messages, setMessages] = useState<Message[]>([{ role: 'assistant', text: 'Hi — I’m StayWise AI. Tell me the city, budget, and vibe you want. I can search the demo inventory in English, Hindi, or Hinglish.' }]);
  const suggestions = useMemo(() => ['Jaipur hotel under ₹3,000', 'IGDTUW ke paas girls PG under ₹10,000', 'Quiet hostel in Delhi'], []);
  const send = (text = draft) => { if (!text.trim()) return; setMessages((current) => [...current, { role: 'user', text }, answer(text)]); setDraft(''); };
  return <>{!open && <button onClick={() => setOpen(true)} className="fixed bottom-5 right-5 z-30 flex items-center gap-2 rounded-full bg-[#0c1532] px-4 py-3 text-sm font-bold text-white shadow-2xl shadow-indigo-500/20 transition hover:-translate-y-1 dark:bg-[#5554d8]"><span className="grid h-7 w-7 place-items-center rounded-full bg-[#25b9a8]"><Bot size={15} /></span>Ask StayWise</button>}{open && <div className="fixed bottom-5 right-5 z-50 flex w-[min(390px,calc(100vw-24px))] flex-col overflow-hidden rounded-[24px] border border-[var(--line)] bg-[var(--surface)] shadow-2xl"><div className="flex items-center justify-between bg-[#0c1532] px-4 py-3 text-white"><div className="flex items-center gap-2"><span className="grid h-8 w-8 place-items-center rounded-xl bg-[#25b9a8]"><Sparkles size={16} /></span><div><div className="text-sm font-extrabold">StayWise AI</div><div className="text-[10px] text-white/60">Demo mode · grounded in listing data</div></div></div><button onClick={() => setOpen(false)}><X size={18} /></button></div><div className="max-h-[340px] space-y-3 overflow-y-auto p-3">{messages.map((message, index) => <div key={index} className={message.role === 'user' ? 'ml-8' : 'mr-5'}><div className={`rounded-2xl px-3 py-2.5 text-xs leading-5 ${message.role === 'user' ? 'bg-[#5554d8] text-white' : 'bg-[var(--surface-2)] text-[var(--text)]'}`}>{message.text}</div>{message.propertyIds && <div className="mt-2 space-y-1">{message.propertyIds.map((id) => { const property = properties.find((item) => item.id === id); return property ? <Link key={id} href={`/property/${id}`} className="block rounded-lg border border-[var(--line)] bg-[var(--surface)] px-2.5 py-2 text-[11px] font-bold text-[#5554d8]">{property.name} · {property.priceLabel}</Link> : null; })}</div>}</div>)}</div><div className="flex flex-wrap gap-1.5 border-t border-[var(--line)] px-3 py-2">{suggestions.map((suggestion) => <button key={suggestion} onClick={() => send(suggestion)} className="rounded-full bg-[var(--surface-2)] px-2.5 py-1 text-[10px] font-bold text-[var(--muted)]">{suggestion}</button>)}</div><div className="flex gap-2 border-t border-[var(--line)] p-3"><input value={draft} onChange={(event) => setDraft(event.target.value)} onKeyDown={(event) => { if (event.key === 'Enter') send(); }} placeholder="Ask in English, Hindi or Hinglish" className="min-w-0 flex-1 rounded-xl bg-[var(--surface-2)] px-3 py-2 text-xs text-[var(--text)] outline-none" /><button onClick={() => send()} className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-[#5554d8] text-white"><Send size={15} /></button></div></div>}</>;
}
