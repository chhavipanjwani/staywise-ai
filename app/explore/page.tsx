import { Suspense } from 'react';
import { ExploreClient } from '@/components/ExploreClient';
export default function ExplorePage() { return <Suspense fallback={<div className="container-wide py-20 text-sm text-[var(--muted)]">Loading discovery…</div>}><ExploreClient /></Suspense>; }
