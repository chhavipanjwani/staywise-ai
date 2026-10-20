export type PropertyType = 'hotel' | 'hostel' | 'pg' | 'room';

export type Property = {
  id: string;
  type: PropertyType;
  name: string;
  city: string;
  area: string;
  description: string;
  price: number;
  priceLabel: string;
  rating: number;
  reviewCount: number;
  lat: number;
  lng: number;
  image: string;
  gallery: string[];
  amenities: string[];
  tags: string[];
  roomType: string;
  distanceKm?: number;
  deposit?: number;
  oneTimeFee?: number;
  monthlyExtras?: number;
  policy?: string;
  featured?: boolean;
  sample?: boolean;
};

const images = {
  hotel1: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1200&q=85',
  hotel2: 'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=1200&q=85',
  hotel3: 'https://images.unsplash.com/photo-1564501049412-61c2a3083791?auto=format&fit=crop&w=1200&q=85',
  hotel4: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=85',
  hotel5: 'https://images.unsplash.com/photo-1601918774946-25832a4be0d6?auto=format&fit=crop&w=1200&q=85',
  pg1: 'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1200&q=85',
  pg2: 'https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=1200&q=85',
  pg3: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&w=1200&q=85',
  pg4: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=85',
  pg5: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=85'
};

const gallery = (image: string) => [image, images.hotel3, images.pg1];

export const properties: Property[] = [
  { id: 'hotel-amber-fort', type: 'hotel', name: 'Amber Fort House', city: 'Jaipur', area: 'Bani Park', description: 'A calm heritage stay with a rooftop breakfast room, thoughtful hosts, and easy access to Jaipur’s old city.', price: 2390, priceLabel: '₹2,390 / night', rating: 4.8, reviewCount: 182, lat: 26.928, lng: 75.805, image: images.hotel1, gallery: gallery(images.hotel1), amenities: ['Wi-Fi', 'Breakfast', 'AC', 'Parking', 'Restaurant'], tags: ['heritage', 'quiet', 'best value'], roomType: 'Deluxe double', policy: 'Free cancellation up to 24 hours before check-in', featured: true, sample: true },
  { id: 'hotel-blue-door', type: 'hotel', name: 'The Blue Door Residency', city: 'Delhi', area: 'Hauz Khas', description: 'Design-forward rooms for city breaks, with a leafy courtyard and a work-friendly lobby.', price: 2850, priceLabel: '₹2,850 / night', rating: 4.6, reviewCount: 96, lat: 28.553, lng: 77.199, image: images.hotel2, gallery: gallery(images.hotel2), amenities: ['Wi-Fi', 'AC', 'Elevator', 'Restaurant'], tags: ['design', 'work-friendly'], roomType: 'King room', policy: 'Free cancellation up to 48 hours before check-in', featured: true, sample: true },
  { id: 'hotel-monsoon-bengaluru', type: 'hotel', name: 'Monsoon House Bengaluru', city: 'Bengaluru', area: 'Indiranagar', description: 'A warm, contemporary boutique hotel surrounded by cafés and walkable neighbourhood streets.', price: 3180, priceLabel: '₹3,180 / night', rating: 4.7, reviewCount: 214, lat: 12.978, lng: 77.64, image: images.hotel3, gallery: gallery(images.hotel3), amenities: ['Wi-Fi', 'Breakfast', 'AC', 'Pet-friendly', 'Elevator'], tags: ['cafés', 'remote-work'], roomType: 'Queen room', policy: 'Free cancellation up to 24 hours before check-in', featured: true, sample: true },
  { id: 'hotel-marine-view', type: 'hotel', name: 'Marine View Social Stay', city: 'Mumbai', area: 'Colaba', description: 'Bright rooms, breezy common spaces, and a front desk that knows the city well.', price: 2990, priceLabel: '₹2,990 / night', rating: 4.4, reviewCount: 121, lat: 18.922, lng: 72.833, image: images.hotel4, gallery: gallery(images.hotel4), amenities: ['Wi-Fi', 'AC', 'Breakfast', 'Restaurant'], tags: ['central', 'social'], roomType: 'Twin room', policy: 'Free cancellation up to 24 hours before check-in', sample: true },
  { id: 'hotel-pune-courtyard', type: 'hotel', name: 'Pune Courtyard Rooms', city: 'Pune', area: 'Koregaon Park', description: 'Pocket-sized luxury with a quiet inner courtyard and quick access to the city’s food scene.', price: 2580, priceLabel: '₹2,580 / night', rating: 4.5, reviewCount: 88, lat: 18.536, lng: 73.893, image: images.hotel5, gallery: gallery(images.hotel5), amenities: ['Wi-Fi', 'AC', 'Parking', 'Elevator'], tags: ['quiet', 'food scene'], roomType: 'Superior double', policy: 'Free cancellation up to 48 hours before check-in', sample: true },
  { id: 'hotel-pink-city-studio', type: 'hotel', name: 'Pink City Studio Hotel', city: 'Jaipur', area: 'C-Scheme', description: 'A polished, affordable stay with a sunny terrace and excellent local transport connections.', price: 1990, priceLabel: '₹1,990 / night', rating: 4.2, reviewCount: 64, lat: 26.912, lng: 75.787, image: images.hotel2, gallery: gallery(images.hotel2), amenities: ['Wi-Fi', 'AC', 'Parking'], tags: ['budget', 'central'], roomType: 'Studio double', policy: 'Non-refundable rate', sample: true },
  { id: 'hotel-lotus-delhi', type: 'hotel', name: 'Lotus Lane Hotel', city: 'Delhi', area: 'Saket', description: 'Clean, no-fuss rooms with reliable Wi-Fi and a friendly neighbourhood feel.', price: 2140, priceLabel: '₹2,140 / night', rating: 4.1, reviewCount: 71, lat: 28.526, lng: 77.216, image: images.hotel1, gallery: gallery(images.hotel1), amenities: ['Wi-Fi', 'AC', 'Elevator'], tags: ['budget', 'quiet'], roomType: 'Queen room', policy: 'Free cancellation up to 24 hours before check-in', sample: true },
  { id: 'hotel-saffron-mumbai', type: 'hotel', name: 'Saffron House Mumbai', city: 'Mumbai', area: 'Powai', description: 'A modern city stay with a small gym, café, and soundproofed rooms.', price: 3390, priceLabel: '₹3,390 / night', rating: 4.3, reviewCount: 51, lat: 19.119, lng: 72.906, image: images.hotel3, gallery: gallery(images.hotel3), amenities: ['Wi-Fi', 'AC', 'Restaurant', 'Elevator'], tags: ['business', 'modern'], roomType: 'King room', policy: 'Free cancellation up to 24 hours before check-in', sample: true },
  { id: 'hotel-terracotta-pune', type: 'hotel', name: 'Terracotta Stay', city: 'Pune', area: 'Viman Nagar', description: 'Sunlit rooms and a helpful local team, close to cafés and airport connections.', price: 2290, priceLabel: '₹2,290 / night', rating: 4.0, reviewCount: 46, lat: 18.568, lng: 73.914, image: images.hotel4, gallery: gallery(images.hotel4), amenities: ['Wi-Fi', 'AC', 'Parking'], tags: ['airport', 'value'], roomType: 'Deluxe double', policy: 'Free cancellation up to 24 hours before check-in', sample: true },
  { id: 'hotel-rain-tree-bengaluru', type: 'hotel', name: 'Rain Tree Rooms', city: 'Bengaluru', area: 'Koramangala', description: 'A leafy stay for weekend explorers and first-time Bengaluru visitors.', price: 2450, priceLabel: '₹2,450 / night', rating: 4.2, reviewCount: 59, lat: 12.935, lng: 77.624, image: images.hotel5, gallery: gallery(images.hotel5), amenities: ['Wi-Fi', 'Breakfast', 'AC'], tags: ['cafés', 'budget'], roomType: 'Queen room', policy: 'Free cancellation up to 24 hours before check-in', sample: true },
  { id: 'pg-quiet-corner-igdtuw', type: 'pg', name: 'Quiet Corner Girls PG', city: 'Delhi', area: 'Shalimar Bagh', description: 'A study-first girls PG with home-style meals, bright rooms, and a low-noise floor plan.', price: 8900, priceLabel: '₹8,900 / month', rating: 4.7, reviewCount: 132, lat: 28.704, lng: 77.15, image: images.pg1, gallery: gallery(images.pg1), amenities: ['Wi-Fi', 'Meals', 'CCTV', 'Laundry', 'Attached bathroom', 'Power backup'], tags: ['girls only', 'quiet', 'near IGDTUW'], roomType: 'Single room', deposit: 8900, oneTimeFee: 1500, monthlyExtras: 650, policy: 'Minimum stay 3 months', featured: true, sample: true },
  { id: 'pg-olive-house', type: 'pg', name: 'Olive House Co-living', city: 'Delhi', area: 'North Campus', description: 'A friendly, community-led co-living home for students who want to be close to the University.', price: 7600, priceLabel: '₹7,600 / month', rating: 4.4, reviewCount: 89, lat: 28.688, lng: 77.209, image: images.pg2, gallery: gallery(images.pg2), amenities: ['Wi-Fi', 'Meals', 'CCTV', 'Laundry', 'AC'], tags: ['co-living', 'students'], roomType: 'Double sharing', deposit: 7600, oneTimeFee: 1000, monthlyExtras: 850, policy: 'Minimum stay 6 months', featured: true, sample: true },
  { id: 'pg-maple-bengaluru', type: 'pg', name: 'Maple Nest Women’s PG', city: 'Bengaluru', area: 'HSR Layout', description: 'Comfortable rooms with excellent internet, flexible meal plans, and a supportive manager.', price: 10500, priceLabel: '₹10,500 / month', rating: 4.6, reviewCount: 104, lat: 12.91, lng: 77.645, image: images.pg3, gallery: gallery(images.pg3), amenities: ['Wi-Fi', 'Meals', 'CCTV', 'Laundry', 'AC', 'Security'], tags: ['women only', 'work-friendly'], roomType: 'Single room', deposit: 10500, oneTimeFee: 2000, monthlyExtras: 750, policy: 'Minimum stay 3 months', featured: true, sample: true },
  { id: 'pg-casa-pune', type: 'pg', name: 'Casa Mingle Pune', city: 'Pune', area: 'Kothrud', description: 'A sunny co-living home with an easygoing community and transparent monthly charges.', price: 8200, priceLabel: '₹8,200 / month', rating: 4.3, reviewCount: 76, lat: 18.507, lng: 73.808, image: images.pg4, gallery: gallery(images.pg4), amenities: ['Wi-Fi', 'Laundry', 'CCTV', 'Attached bathroom'], tags: ['co-living', 'transparent'], roomType: 'Double sharing', deposit: 8200, oneTimeFee: 1200, monthlyExtras: 700, policy: 'Minimum stay 3 months', sample: true },
  { id: 'pg-pink-lane-jaipur', type: 'pg', name: 'Pink Lane Student Home', city: 'Jaipur', area: 'Malviya Nagar', description: 'A practical, well-lit student home with healthy meals and a generous study lounge.', price: 6800, priceLabel: '₹6,800 / month', rating: 4.5, reviewCount: 63, lat: 26.854, lng: 75.813, image: images.pg5, gallery: gallery(images.pg5), amenities: ['Wi-Fi', 'Meals', 'CCTV', 'Power backup'], tags: ['students', 'value'], roomType: 'Triple sharing', deposit: 6800, oneTimeFee: 900, monthlyExtras: 550, policy: 'Minimum stay 6 months', sample: true },
  { id: 'hostel-campus-delhi', type: 'hostel', name: 'Campus Commons Hostel', city: 'Delhi', area: 'GTB Nagar', description: 'A secure student hostel with quiet hours, shared kitchens, and lively common areas.', price: 6100, priceLabel: '₹6,100 / month', rating: 4.1, reviewCount: 118, lat: 28.7, lng: 77.205, image: images.pg2, gallery: gallery(images.pg2), amenities: ['Wi-Fi', 'CCTV', 'Laundry', 'Security'], tags: ['students', 'budget'], roomType: 'Triple sharing', deposit: 6100, oneTimeFee: 700, monthlyExtras: 500, policy: 'Minimum stay 6 months', sample: true },
  { id: 'hostel-hub-mumbai', type: 'hostel', name: 'Harbour Hub Hostel', city: 'Mumbai', area: 'Andheri East', description: 'A practical hostel for interns and young professionals with easy metro access.', price: 9600, priceLabel: '₹9,600 / month', rating: 4.0, reviewCount: 54, lat: 19.12, lng: 72.87, image: images.pg4, gallery: gallery(images.pg4), amenities: ['Wi-Fi', 'CCTV', 'Laundry', 'AC'], tags: ['professionals', 'metro access'], roomType: 'Double sharing', deposit: 9600, oneTimeFee: 1200, monthlyExtras: 900, policy: 'Minimum stay 3 months', sample: true },
  { id: 'pg-studio-pune', type: 'room', name: 'Balcony Studio Room', city: 'Pune', area: 'Baner', description: 'A private furnished room in a shared apartment with a balcony and a focused work nook.', price: 12500, priceLabel: '₹12,500 / month', rating: 4.6, reviewCount: 38, lat: 18.565, lng: 73.779, image: images.pg1, gallery: gallery(images.pg1), amenities: ['Wi-Fi', 'AC', 'Attached bathroom', 'Furnished'], tags: ['private room', 'work-friendly'], roomType: 'Private room', deposit: 25000, oneTimeFee: 2500, monthlyExtras: 900, policy: 'Minimum stay 6 months', sample: true },
  { id: 'pg-citrine-bengaluru', type: 'pg', name: 'Citrine Coliving House', city: 'Bengaluru', area: 'Marathahalli', description: 'A bright co-living house with strong Wi-Fi, a terrace, and clear rules for shared living.', price: 9300, priceLabel: '₹9,300 / month', rating: 4.2, reviewCount: 67, lat: 12.96, lng: 77.7, image: images.pg5, gallery: gallery(images.pg5), amenities: ['Wi-Fi', 'Meals', 'CCTV', 'Laundry', 'Furnished'], tags: ['co-living', 'tech corridor'], roomType: 'Double sharing', deposit: 9300, oneTimeFee: 1500, monthlyExtras: 800, policy: 'Minimum stay 3 months', sample: true }
];

export const cities = ['Delhi', 'Jaipur', 'Mumbai', 'Bengaluru', 'Pune', 'Hyderabad'];

export const demoReviews = [
  { propertyId: 'pg-quiet-corner-igdtuw', category: 'Hygiene', score: 4.8, text: 'The rooms are cleaned regularly and the common areas stay calm.', author: 'Verified demo reviewer', date: '2 weeks ago' },
  { propertyId: 'pg-quiet-corner-igdtuw', category: 'Food quality', score: 4.5, text: 'Simple home-style food, with enough variety through the week.', author: 'Demo resident', date: '1 month ago' },
  { propertyId: 'hotel-amber-fort', category: 'Cleanliness', score: 4.9, text: 'Everything felt fresh and thoughtfully maintained.', author: 'Demo guest', date: '3 weeks ago' },
  { propertyId: 'hotel-amber-fort', category: 'Location', score: 4.7, text: 'Easy to reach the old city and the host shared great local tips.', author: 'Demo guest', date: '1 month ago' }
];

export const roommates = [
  { id: 'rm-01', name: 'Aarohi', age: 22, city: 'Delhi', area: 'North Campus', budget: 9000, moveIn: 'Aug 2026', intro: 'Design student who loves quiet mornings, clean kitchens, and finding underrated cafés.', prefs: { sleep: 'early', work: 'daytime', cleanliness: 'high', noise: 'low', guests: 'occasional', smoking: 'no', pets: 'okay', room: 'private' }, sample: true },
  { id: 'rm-02', name: 'Meera', age: 24, city: 'Bengaluru', area: 'HSR Layout', budget: 12000, moveIn: 'Sep 2026', intro: 'Product designer, mostly remote. Looking for a considerate flatmate and a sunny home.', prefs: { sleep: 'flexible', work: 'daytime', cleanliness: 'high', noise: 'medium', guests: 'occasional', smoking: 'no', pets: 'okay', room: 'private' }, sample: true },
  { id: 'rm-03', name: 'Kabir', age: 25, city: 'Pune', area: 'Baner', budget: 11000, moveIn: 'Jul 2026', intro: 'Software engineer who cooks twice a week and enjoys a relaxed, respectful home.', prefs: { sleep: 'late', work: 'night', cleanliness: 'medium', noise: 'medium', guests: 'often', smoking: 'no', pets: 'okay', room: 'shared' }, sample: true },
  { id: 'rm-04', name: 'Naina', age: 21, city: 'Jaipur', area: 'Malviya Nagar', budget: 7500, moveIn: 'Aug 2026', intro: 'Postgrad student seeking a quiet, friendly room near campus.', prefs: { sleep: 'early', work: 'daytime', cleanliness: 'high', noise: 'low', guests: 'rarely', smoking: 'no', pets: 'no', room: 'shared' }, sample: true },
  { id: 'rm-05', name: 'Rohan', age: 27, city: 'Mumbai', area: 'Andheri East', budget: 14500, moveIn: 'Oct 2026', intro: 'Film editor who is out for work often and values clear shared expenses.', prefs: { sleep: 'late', work: 'night', cleanliness: 'medium', noise: 'medium', guests: 'occasional', smoking: 'no', pets: 'no', room: 'private' }, sample: true },
  { id: 'rm-06', name: 'Ishita', age: 23, city: 'Delhi', area: 'Saket', budget: 10500, moveIn: 'Jul 2026', intro: 'Marketing professional looking for a bright home with a balanced, social vibe.', prefs: { sleep: 'flexible', work: 'daytime', cleanliness: 'high', noise: 'medium', guests: 'occasional', smoking: 'no', pets: 'okay', room: 'private' }, sample: true }
];

export function getProperty(id: string) { return properties.find((property) => property.id === id); }

export function scoreProperty(property: Property, criteria: { city?: string; type?: string; budget?: number; amenities?: string[]; distance?: number; purpose?: string } = {}) {
  let score = 48;
  const reasons: string[] = [];
  const tradeoffs: string[] = [];
  if (criteria.city) {
    if (property.city.toLowerCase() === criteria.city.toLowerCase()) { score += 18; reasons.push(`in ${property.city}`); } else { score -= 18; tradeoffs.push(`outside ${criteria.city}`); }
  }
  if (criteria.type && criteria.type !== 'all') {
    if (property.type === criteria.type || (criteria.type === 'pg-hostel' && ['pg', 'hostel', 'room'].includes(property.type))) { score += 12; reasons.push('matches your stay type'); } else score -= 12;
  }
  if (criteria.budget) {
    const ratio = property.price / criteria.budget;
    if (ratio <= 1) { score += 15; reasons.push('within your budget'); }
    else if (ratio <= 1.16) { score += 5; tradeoffs.push('slightly above budget'); }
    else { score -= 14; tradeoffs.push('above budget'); }
  }
  if (criteria.amenities?.length) {
    const matches = criteria.amenities.filter((item) => property.amenities.some((amenity) => amenity.toLowerCase().includes(item.toLowerCase()))).length;
    score += Math.round((matches / criteria.amenities.length) * 15);
    if (matches) reasons.push(`${matches}/${criteria.amenities.length} essentials included`);
    if (matches < criteria.amenities.length) tradeoffs.push(`${criteria.amenities.length - matches} preferred amenity gaps`);
  }
  score += Math.round(property.rating * 2);
  if (property.rating >= 4.6) reasons.push('strong guest reviews');
  if (criteria.purpose === 'study' && property.tags.some((tag) => ['quiet', 'students', 'near IGDTUW'].includes(tag))) { score += 8; reasons.push('study-friendly signals'); }
  return { score: Math.max(35, Math.min(99, score)), reasons: reasons.length ? reasons : ['balanced match from available listing data'], tradeoffs };
}

