'use client';

import Link from 'next/link';
import { ArrowRight, Check, Heart, MapPin, Star, Zap } from 'lucide-react';
import { useStayWise } from '@/components/StayWiseProvider';
import { getGenderPolicy, type Property } from '@/lib/data';

export function Pill({ children, tone = 'default' }: { children: React.ReactNode; tone?: 'default' | 'teal' | 'purple' | 'warm' }) {
  const tones = { default: 'bg-[var(--surface-2)] text-[var(--muted)]', teal: 'bg-[#e2f8f3] text-[#108d80] dark:bg-[#123b3a] dark:text-[#6edfd3]', purple: 'bg-[#ececff] text-[#5654d0] dark:bg-[#25254f] dark:text-[#b5b4ff]', warm: 'bg-[#fff2dc] text-[#a16b18] dark:bg-[#4d3716] dark:text-[#ffd48a]' };
  return <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-[.08em] ${tones[tone]}`}>{children}</span>;
}

export function Button({ children, variant = 'primary', className = '', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'ghost' | 'danger' }) {
  const variants = { primary: 'bg-[#5554d8] text-white shadow-lg shadow-indigo-500/20 hover:-translate-y-0.5 hover:bg-[#4746c1]', secondary: 'border border-[var(--line)] bg-[var(--surface)] text-[var(--text)] hover:border-[#7775e7] hover:bg-[var(--surface-2)]', ghost: 'text-[var(--muted)] hover:bg-[var(--surface-2)] hover:text-[var(--text)]', danger: 'border border-red-200 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-900 dark:bg-red-950/30' };
  return <button className={`inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-bold transition ${variants[variant]} ${className}`} {...props}>{children}</button>;
}

export function SectionTitle({ eyebrow, title, body, action }: { eyebrow?: string; title: string; body?: string; action?: React.ReactNode }) {
  return <div className="mb-7 flex flex-col justify-between gap-4 sm:flex-row sm:items-end"><div>{eyebrow && <div className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#5554d8]"><Zap size={13} />{eyebrow}</div>}<h2 className="text-2xl font-extrabold tracking-tight text-[var(--text)] sm:text-[31px]">{title}</h2>{body && <p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{body}</p>}</div>{action}</div>;
}

export function PropertyCard({ property, compact = false }: { property: Property; compact?: boolean }) {
  const { savedIds, compareIds, toggleSaved, toggleCompare } = useStayWise();
  const saved = savedIds.includes(property.id);
  const compared = compareIds.includes(property.id);
  const genderPolicy = property.type === 'hotel' ? null : getGenderPolicy(property);
  return <article className={`group overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)] shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-soft ${compact ? '' : ''}`}>
    <div className={`relative overflow-hidden ${compact ? 'h-40' : 'h-52'}`}><img src={property.image} alt={property.name} className="h-full w-full object-cover transition duration-700 group-hover:scale-105" referrerPolicy="no-referrer" /><div className="absolute inset-0 bg-gradient-to-t from-[#07132e]/65 via-transparent to-transparent" /><div className="absolute left-3 top-3 flex gap-2">{property.featured && <Pill tone="warm">Featured</Pill>}{property.sample && <Pill>Demo listing</Pill>}</div><button onClick={() => toggleSaved(property.id)} aria-label={saved ? 'Remove from saved' : 'Save property'} className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-black/20 text-white backdrop-blur-md transition hover:bg-white hover:text-[#e25270]"> <Heart size={17} fill={saved ? 'currentColor' : 'none'} /></button><div className="absolute bottom-3 left-3 text-white"><div className="flex items-center gap-1 text-xs font-bold"><MapPin size={13} />{property.area}, {property.city}</div></div></div>
    <div className="p-4"><div className="flex items-start justify-between gap-3"><div className="min-w-0"><Link href={`/property/${property.id}`} className="line-clamp-2 text-[16px] font-extrabold tracking-tight text-[var(--text)] hover:text-[#5554d8]">{property.name}</Link><div className="mt-1 text-xs capitalize text-[var(--muted)]">{property.type === 'pg' ? 'PG' : property.type} · {property.roomType}</div></div><div className="shrink-0 rounded-lg bg-[#eef9f6] px-2 py-1 text-xs font-extrabold text-[#118c7f] dark:bg-[#123c3a] dark:text-[#72e0d4]"><Star className="mr-0.5 inline" size={12} fill="currentColor" />{property.rating}</div></div><div className="mt-4 flex items-end justify-between"><div><span className="text-[17px] font-extrabold text-[var(--text)]">{property.priceLabel.split(' / ')[0]}</span><span className="text-xs text-[var(--muted)]"> / {property.priceLabel.split(' / ')[1]}</span></div><span className="text-xs text-[var(--muted)]">{property.reviewCount} reviews</span></div><div className="mt-3 flex flex-wrap gap-1.5">{genderPolicy && <span className="rounded-md bg-[#fff2dc] px-2 py-1 text-[10px] font-bold capitalize text-[#a16b18]">{genderPolicy === 'co-living' ? 'Co-living' : `${genderPolicy} only`}</span>}{property.amenities.slice(0, compact ? 2 : 3).map((amenity) => <span key={amenity} className="rounded-md bg-[var(--surface-2)] px-2 py-1 text-[10px] font-semibold text-[var(--muted)]">{amenity}</span>)}{property.amenities.length > 3 && <span className="rounded-md bg-[var(--surface-2)] px-2 py-1 text-[10px] font-semibold text-[var(--muted)]">+{property.amenities.length - 3}</span>}</div><div className="mt-4 flex items-center justify-between border-t border-[var(--line)] pt-3"><Link href={`/property/${property.id}`} className="text-xs font-bold text-[#5554d8]">View details <ArrowRight className="ml-1 inline" size={13} /></Link><button onClick={() => toggleCompare(property.id)} className={`text-[11px] font-bold ${compared ? 'text-[#118c7f]' : 'text-[var(--muted)]'}`}>{compared ? <><Check className="mr-1 inline" size={13} />Added</> : 'Compare'}</button></div></div>
  </article>;
}

export function SkeletonCard() { return <div className="overflow-hidden rounded-[22px] border border-[var(--line)] bg-[var(--surface)]"><div className="h-52 animate-pulse bg-[var(--surface-2)]" /><div className="space-y-3 p-4"><div className="h-4 w-3/4 animate-pulse rounded bg-[var(--surface-2)]" /><div className="h-3 w-1/2 animate-pulse rounded bg-[var(--surface-2)]" /><div className="h-10 animate-pulse rounded bg-[var(--surface-2)]" /></div></div>; }

export function EmptyState({ title, body, action }: { title: string; body: string; action?: React.ReactNode }) { return <div className="rounded-[24px] border border-dashed border-[var(--line)] bg-[var(--surface)] px-6 py-14 text-center"><div className="mx-auto mb-4 grid h-12 w-12 place-items-center rounded-2xl bg-[#ececff] text-[#5554d8] dark:bg-[#26264f]"><SearchIcon /></div><h3 className="text-lg font-extrabold text-[var(--text)]">{title}</h3><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[var(--muted)]">{body}</p>{action && <div className="mt-5">{action}</div>}</div>; }
function SearchIcon() { return <span className="text-xl">⌕</span>; }
