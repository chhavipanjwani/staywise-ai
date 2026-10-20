import { Suspense } from 'react';
import { ExploreClient } from '@/components/ExploreClient';
export default function PgHostelsPage() { return <Suspense fallback={<div className="container-wide py-20 text-sm text-[var(--muted)]">Loading PGs & hostels…</div>}><ExploreClient forcedType="pg-hostel" /></Suspense>; }
