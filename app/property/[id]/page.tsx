import { PropertyDetailClient } from '@/components/PropertyDetailClient';
import { properties } from '@/lib/data';

export function generateStaticParams() {
  return properties.map((property) => ({ id: property.id }));
}

export default function PropertyPage({ params }: { params: { id: string } }) {
  return <PropertyDetailClient id={params.id} />;
}
