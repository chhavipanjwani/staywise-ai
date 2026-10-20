/**
 * Server-side TinyFish connector.
 *
 * Keep TINYFISH_API_KEY on the server only. The static demo uses the local
 * deterministic inventory when this key is absent; a serverful deployment
 * can call these functions to enrich results with live web evidence.
 */
export type TinyFishSearchResult = {
  position?: number;
  site_name?: string;
  title?: string;
  snippet?: string;
  url?: string;
};

export async function tinyFishSearch(query: string, location = 'IN') {
  const apiKey = process.env.TINYFISH_API_KEY;
  if (!apiKey) return { mode: 'demo' as const, results: [] as TinyFishSearchResult[], message: 'TinyFish key not configured; using StayWise demo data.' };
  const params = new URLSearchParams({ query, location, language: 'en' });
  const response = await fetch(`https://api.search.tinyfish.ai?${params.toString()}`, { headers: { 'X-API-Key': apiKey }, cache: 'no-store' });
  if (!response.ok) throw new Error(`TinyFish Search failed with ${response.status}`);
  const payload = await response.json() as { results?: TinyFishSearchResult[] };
  return { mode: 'tinyfish' as const, results: payload.results || [], message: 'Live web evidence returned by TinyFish Search.' };
}

export async function tinyFishAgent(url: string, goal: string) {
  const apiKey = process.env.TINYFISH_API_KEY;
  if (!apiKey) return { mode: 'demo' as const, result: null, message: 'TinyFish key not configured; agent run skipped.' };
  const response = await fetch('https://agent.tinyfish.ai/v1/automation/run', { method: 'POST', headers: { 'X-API-Key': apiKey, 'Content-Type': 'application/json' }, body: JSON.stringify({ url, goal, browser_profile: 'lite' }), cache: 'no-store' });
  if (!response.ok) throw new Error(`TinyFish Agent failed with ${response.status}`);
  return { mode: 'tinyfish' as const, result: await response.json(), message: 'Live web agent result returned by TinyFish.' };
}
