'use client';

import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { properties, type Property } from '@/lib/data';

type Inquiry = { propertyId: string; name: string; note: string; createdAt: string };
type Review = { propertyId: string; ratings: Record<string, number>; note: string; createdAt: string };
type ContextValue = {
  savedIds: string[];
  compareIds: string[];
  inquiries: Inquiry[];
  reviews: Review[];
  theme: 'light' | 'dark';
  demoMode: boolean;
  toggleSaved: (id: string) => void;
  toggleCompare: (id: string) => void;
  clearCompare: () => void;
  addInquiry: (inquiry: Omit<Inquiry, 'createdAt'>) => void;
  addReview: (review: Omit<Review, 'createdAt'>) => void;
  toggleTheme: () => void;
  compareProperties: Property[];
  ownedProperties: Property[];
  addProperty: (property: Property) => void;
};

const StayWiseContext = createContext<ContextValue | null>(null);

function readStorage(key: string, fallback: string[]) {
  if (typeof window === 'undefined') return fallback;
  try { return JSON.parse(window.localStorage.getItem(key) || JSON.stringify(fallback)); } catch { return fallback; }
}

export function StayWiseProvider({ children }: { children: React.ReactNode }) {
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [compareIds, setCompareIds] = useState<string[]>([]);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [ownedProperties, setOwnedProperties] = useState<Property[]>([]);

  useEffect(() => {
    setSavedIds(readStorage('staywise-saved', []));
    setCompareIds(readStorage('staywise-compare', []));
    setInquiries(readStorage('staywise-inquiries', []));
    setReviews(readStorage('staywise-reviews', []));
    setOwnedProperties(readStorage('staywise-owned-properties', []));
    const storedTheme = window.localStorage.getItem('staywise-theme') as 'light' | 'dark' | null;
    const initialTheme = storedTheme || 'light';
    setTheme(initialTheme);
    document.documentElement.classList.toggle('dark', initialTheme === 'dark');
  }, []);

  useEffect(() => { if (typeof window !== 'undefined') window.localStorage.setItem('staywise-saved', JSON.stringify(savedIds)); }, [savedIds]);
  useEffect(() => { if (typeof window !== 'undefined') window.localStorage.setItem('staywise-compare', JSON.stringify(compareIds)); }, [compareIds]);
  useEffect(() => { if (typeof window !== 'undefined') window.localStorage.setItem('staywise-inquiries', JSON.stringify(inquiries)); }, [inquiries]);
  useEffect(() => { if (typeof window !== 'undefined') window.localStorage.setItem('staywise-reviews', JSON.stringify(reviews)); }, [reviews]);
  useEffect(() => { if (typeof window !== 'undefined') window.localStorage.setItem('staywise-owned-properties', JSON.stringify(ownedProperties)); }, [ownedProperties]);

  const value = useMemo<ContextValue>(() => ({
    savedIds,
    compareIds,
    inquiries,
    reviews,
    theme,
    demoMode: true,
    toggleSaved: (id) => setSavedIds((current) => current.includes(id) ? current.filter((item) => item !== id) : [...current, id]),
    toggleCompare: (id) => setCompareIds((current) => current.includes(id) ? current.filter((item) => item !== id) : current.length >= 3 ? current : [...current, id]),
    clearCompare: () => setCompareIds([]),
    addInquiry: (inquiry) => setInquiries((current) => [{ ...inquiry, createdAt: new Date().toISOString() }, ...current]),
    addReview: (review) => setReviews((current) => [{ ...review, createdAt: new Date().toISOString() }, ...current]),
    toggleTheme: () => setTheme((current) => { const next = current === 'light' ? 'dark' : 'light'; document.documentElement.classList.toggle('dark', next === 'dark'); window.localStorage.setItem('staywise-theme', next); return next; }),
    compareProperties: compareIds.map((id) => properties.find((property) => property.id === id)).filter(Boolean) as Property[],
    ownedProperties,
    addProperty: (property) => setOwnedProperties((current) => [property, ...current]),
  }), [savedIds, compareIds, inquiries, reviews, theme, ownedProperties]);

  return <StayWiseContext.Provider value={value}>{children}</StayWiseContext.Provider>;
}

export function useStayWise() {
  const context = useContext(StayWiseContext);
  if (!context) throw new Error('useStayWise must be used within StayWiseProvider');
  return context;
}
