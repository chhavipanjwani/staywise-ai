import { Suspense } from 'react';
import { ExploreClient } from '@/components/ExploreClient';
export default function HotelsPage() { return <Suspense fallback={<div className="container-wide py-20 text-sm text-[var(--muted)]">Loading hotels…</div>}><ExploreClient forcedType="hotel" /></Suspense>; }
