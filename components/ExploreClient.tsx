'use client';

import { Filter, LayoutGrid, List, MapPinned, SlidersHorizontal, Sparkles, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { getGenderPolicy, properties, scoreProperty } from '@/lib/data';
import { useStayWise } from '@/components/StayWiseProvider';
import { Button, EmptyState, Pill, PropertyCard } from '@/components/UI';
import { MapPanel } from '@/components/MapPanel';

type FilterPanelProps = {
  location: string;
  setLocation: (value: string) => void;
  area: string;
  setArea: (value: string) => void;
  type: string;
  setType: (value: string) => void;
  budget: string;
  setBudget: (value: string) => void;
  minRating: string;
  setMinRating: (value: string) => void;
  amenity: string;
  setAmenity: (value: string) => void;
  gender: string;
  setGender: (value: string) => void;
  forcedType?: string;
  onClear: () => void;
  onClose?: () => void;
};

function FilterPanel(props: FilterPanelProps) {
  const { location, setLocation, area, setArea, type, setType, budget, setBudget, minRating, setMinRating, amenity, setAmenity, gender, setGender, forcedType, onClear, onClose } = props;
  return <aside className="surface h-fit rounded-2xl p-4">
    <div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-2 text-sm font-extrabold text-[var(--text)]"><Filter size={15} className="text-[#5554d8]" />Refine your search</div>{onClose && <button onClick={onClose} aria-label="Close filters"><X size={17} /></button>}</div>
    <div className="space-y-4">
      <label className="block"><span className="mb-2 block text-xs font-bold text-[var(--muted)]">Location / city</span><input value={location} onChange={(event) => setLocation(event.target.value)} placeholder="Delhi, Jaipur, Bengaluru…" className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[#7775e7]" /></label>
      <label className="block"><span className="mb-2 block text-xs font-bold text-[var(--muted)]">Area, college or workplace</span><input value={area} onChange={(event) => setArea(event.target.value)} placeholder="Hauz Khas, IGDTUW…" className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[#7775e7]" /></label>
      <label className="block"><span className="mb-2 block text-xs font-bold text-[var(--muted)]">Accommodation</span><select value={type} onChange={(event) => setType(event.target.value)} disabled={Boolean(forcedType)} className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-sm text-[var(--text)] outline-none"><option value="all">All stays</option><option value="hotel">Hotels</option><option value="pg-hostel">PGs & hostels</option><option value="room">Rental rooms</option></select></label>
      {type === 'pg-hostel' && <label className="block"><span className="mb-2 block text-xs font-bold text-[var(--muted)]">PG gender policy</span><select value={gender} onChange={(event) => setGender(event.target.value)} className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-sm text-[var(--text)] outline-none"><option value="all">Any policy</option><option value="girls">Girls only</option><option value="boys">Boys only</option><option value="co-living">Co-living / mixed</option></select></label>}
      <label className="block"><span className="mb-2 block text-xs font-bold text-[var(--muted)]">Maximum budget <span className="font-normal">(₹ / night or month)</span></span><input type="number" min="0" value={budget} onChange={(event) => setBudget(event.target.value)} placeholder={type === 'hotel' ? '3000 / night' : '10000 / month'} className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-sm text-[var(--text)] outline-none focus:border-[#7775e7]" /></label>
      <label className="block"><span className="mb-2 block text-xs font-bold text-[var(--muted)]">Minimum guest rating</span><select value={minRating} onChange={(event) => setMinRating(event.target.value)} className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-sm text-[var(--text)] outline-none"><option value="0">Any rating</option><option value="4">4.0+</option><option value="4.5">4.5+</option><option value="4.7">4.7+</option></select></label>
      <label className="block"><span className="mb-2 block text-xs font-bold text-[var(--muted)]">Essential facility</span><select value={amenity} onChange={(event) => setAmenity(event.target.value)} className="w-full rounded-xl border border-[var(--line)] bg-[var(--surface-2)] px-3 py-2.5 text-sm text-[var(--text)] outline-none"><option value="">Any amenity</option><option>Wi-Fi</option><option>Meals</option><option>AC</option><option>CCTV</option><option>Parking</option><option>Laundry</option><option>Attached bathroom</option></select></label>
    </div>
    <button onClick={onClear} className="mt-5 text-xs font-bold text-[#5554d8]">Clear all filters</button>
    <div className="mt-6 rounded-xl bg-[#f0f0ff] p-3 dark:bg-[#27274e]"><div className="flex items-center gap-2 text-xs font-extrabold text-[#5554d8]"><Sparkles size={13} />Transparent AI ranking</div><p className="mt-1 text-[10px] leading-4 text-[var(--muted)]">Budget, area, gender policy, amenities and reviews influence the result — no arbitrary scores.</p></div>
  </aside>;
}

export function ExploreClient({ forcedType }: { forcedType?: 'hotel' | 'pg-hostel' }) {
  const searchParams = useSearchParams();
  const { ownedProperties } = useStayWise();
  const queryCity = searchParams.get('city') || '';
  const queryArea = searchParams.get('area') || '';
  const queryBudget = searchParams.get('budget') || '';
  const [location, setLocation] = useState(queryCity);
  const [area, setArea] = useState(queryArea);
  const [type, setType] = useState(forcedType || searchParams.get('type') || 'all');
  const [budget, setBudget] = useState(queryBudget);
  const [minRating, setMinRating] = useState('0');
  const [amenity, setAmenity] = useState('');
  const [gender, setGender] = useState('all');
  const [sort, setSort] = useState('recommended');
  const [view, setView] = useState<'grid' | 'map'>('grid');
  const [locationMode, setLocationMode] = useState(searchParams.get('mode') || 'city');
  const [mobileFilters, setMobileFilters] = useState(false);
  const inventory = useMemo(() => [...properties, ...ownedProperties], [ownedProperties]);
  const typeTitle = forcedType === 'hotel' ? 'Hotels for the way you travel' : forcedType === 'pg-hostel' ? 'PGs, hostels & rooms that feel like home' : 'Explore stays that fit your life';
  const filtered = useMemo(() => {
    const budgetNumber = budget ? Number(budget) : undefined;
    const base = inventory.filter((property) => {
      const locationMatch = !location || property.city.toLowerCase().includes(location.toLowerCase()) || property.area.toLowerCase().includes(location.toLowerCase());
      const areaMatch = !area || property.area.toLowerCase().includes(area.toLowerCase()) || property.tags.some((tag) => tag.toLowerCase().includes(area.toLowerCase()));
      const typeMatch = type === 'all' || property.type === type || (type === 'pg-hostel' && ['pg', 'hostel', 'room'].includes(property.type));
      const budgetMatch = !budgetNumber || property.price <= budgetNumber;
      const ratingMatch = property.rating >= Number(minRating);
      const amenityMatch = !amenity || property.amenities.some((item) => item.toLowerCase().includes(amenity.toLowerCase()));
      const genderMatch = type !== 'pg-hostel' || gender === 'all' || getGenderPolicy(property) === gender;
      return locationMatch && areaMatch && typeMatch && budgetMatch && ratingMatch && amenityMatch && genderMatch;
    }).map((property) => ({ property, match: scoreProperty(property, { city: location || undefined, type, budget: budget ? Number(budget) : undefined, amenities: amenity ? [amenity] : undefined }) }));
    return base.sort((a, b) => sort === 'price' ? a.property.price - b.property.price : sort === 'rating' ? b.property.rating - a.property.rating : sort === 'name' ? a.property.name.localeCompare(b.property.name) : b.match.score - a.match.score);
  }, [area, amenity, budget, gender, inventory, location, minRating, sort, type]);
  const clear = () => { setLocation(''); setArea(''); setBudget(''); setMinRating('0'); setAmenity(''); setGender('all'); setType(forcedType || 'all'); };
  const filterProps = { location, setLocation, area, setArea, type, setType, budget, setBudget, minRating, setMinRating, amenity, setAmenity, gender, setGender, forcedType, onClear: clear };
  return <div className="container-wide py-9 lg:py-12">
    <div className="mb-7 flex flex-col justify-between gap-5 md:flex-row md:items-end"><div><div className="mb-3 flex items-center gap-2 text-xs font-bold uppercase tracking-[.18em] text-[#5554d8]"><Sparkles size={13} />Personalised discovery</div><h1 className="text-3xl font-extrabold tracking-tight text-[var(--text)] sm:text-4xl">{typeTitle}</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[var(--muted)]">{locationMode === 'current' ? 'Near your current location · distance shown when coordinates are available.' : locationMode === 'campus' ? 'Near a college or workplace · commute is not fabricated without routing data.' : 'Start with your location, area, gender preference and budget. Then compare the trade-offs.'}</p></div><div className="flex gap-2"><Button variant="secondary" onClick={() => setMobileFilters(!mobileFilters)} className="md:hidden"><SlidersHorizontal size={16} />Filters</Button><div className="flex rounded-xl border border-[var(--line)] bg-[var(--surface)] p-1"><button onClick={() => setView('grid')} className={`rounded-lg p-2 ${view === 'grid' ? 'bg-[var(--surface-2)] text-[#5554d8]' : 'text-[var(--muted)]'}`} aria-label="Grid view"><LayoutGrid size={17} /></button><button onClick={() => setView('map')} className={`rounded-lg p-2 ${view === 'map' ? 'bg-[var(--surface-2)] text-[#5554d8]' : 'text-[var(--muted)]'}`} aria-label="Map view"><MapPinned size={17} /></button></div></div></div>
    <div className="mb-5 flex flex-wrap gap-2 rounded-2xl border border-[var(--line)] bg-[var(--surface)] p-2"><button onClick={() => setLocationMode('city')} className={`rounded-xl px-3 py-2 text-xs font-bold ${locationMode === 'city' ? 'bg-[#ececff] text-[#5554d8] dark:bg-[#292951]' : 'text-[var(--muted)]'}`}>Anywhere in city</button><button onClick={() => setLocationMode('current')} className={`rounded-xl px-3 py-2 text-xs font-bold ${locationMode === 'current' ? 'bg-[#e2f8f3] text-[#118c7f] dark:bg-[#173c3a]' : 'text-[var(--muted)]'}`}>Near my current location</button><button onClick={() => setLocationMode('campus')} className={`rounded-xl px-3 py-2 text-xs font-bold ${locationMode === 'campus' ? 'bg-[#fff2dc] text-[#a16b18] dark:bg-[#4d3716]' : 'text-[var(--muted)]'}`}>Near college / workplace</button><div className="ml-auto hidden items-center gap-2 px-2 text-[11px] text-[var(--muted)] sm:flex"><List size={14} />{filtered.length} stays · straight-line distances only</div></div>
    <div className="grid gap-6 lg:grid-cols-[250px_1fr]"><div className={`${mobileFilters ? 'fixed inset-x-3 bottom-3 z-30 max-h-[80vh] overflow-auto rounded-2xl shadow-2xl md:static md:max-h-none md:rounded-none md:shadow-none' : 'hidden md:block'}`}><FilterPanel {...filterProps} onClose={() => setMobileFilters(false)} /></div><section><div className="mb-4 flex items-center justify-between"><div><span className="text-sm font-extrabold text-[var(--text)]">{filtered.length} stays found</span>{location && <Pill tone="purple">{location}</Pill>}{area && <Pill tone="teal">{area}</Pill>}{gender !== 'all' && <Pill tone="warm">{gender} only</Pill>}</div><select value={sort} onChange={(event) => setSort(event.target.value)} className="rounded-xl border border-[var(--line)] bg-[var(--surface)] px-3 py-2 text-xs font-bold text-[var(--text)] outline-none"><option value="recommended">Sort: recommended</option><option value="price">Sort: price</option><option value="rating">Sort: rating</option><option value="name">Sort: name</option></select></div>{view === 'map' ? <div className="grid gap-5 xl:grid-cols-[1fr_1fr]"><div className="grid gap-4 sm:grid-cols-2">{filtered.map(({ property, match }) => <div key={property.id} className="relative"><div className="absolute right-3 top-3 z-10 rounded-full bg-[#0c1532] px-2 py-1 text-[10px] font-extrabold text-white">{match.score}% match</div><PropertyCard property={property} compact /></div>)}</div><MapPanel properties={filtered.map(({ property }) => property)} focusCity={location || 'India'} /></div> : filtered.length ? <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">{filtered.map(({ property, match }) => <div key={property.id} className="relative"><div className="absolute right-3 top-3 z-10 rounded-full bg-[#0c1532] px-2 py-1 text-[10px] font-extrabold text-white shadow">{match.score}% match</div><PropertyCard property={property} /></div>)}</div> : <EmptyState title="No stays match that combination" body="Try widening the location, area, gender policy, budget, or amenity filters. The demo inventory keeps the reasoning visible." action={<Button onClick={clear}>Reset filters</Button>} />}</section></div>
  </div>;
}
