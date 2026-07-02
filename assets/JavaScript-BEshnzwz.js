import{j as e,M as t}from"./main-BoXZV1An.js";import{D as s}from"./DocPageTemplate-BkJYaxLC.js";import"./x-B6wxc-H5.js";import"./chevron-right-CfzrZq3l.js";import"./button-CeOP8sZb.js";import"./index-MikfkPVa.js";import"./index-Be_0q2hh.js";function l(){return e.jsxs(s,{title:"JavaScript & TypeScript",description:"The official TagLogger SDK for Node, browsers and modern runtimes",children:[e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Install"}),e.jsxs("p",{children:["The ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"taglogger"})," package is the official SDK for the TagLogger API. It is written in TypeScript, ships full type definitions, has ",e.jsx("strong",{children:"zero runtime dependencies"}),", and is published for both ESM and CommonJS. The core is isomorphic (it uses the global"," ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"fetch"}),") and runs on Node 18+, modern runtimes and bundlers."]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:"npm install taglogger"})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Keep your API key on a server you control. Treat"," ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"tl_live_"})," keys like passwords and never ship them in client-side bundles."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Quick start"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`import { TagLoggerClient } from 'taglogger';

const client = new TagLoggerClient({ apiKey: process.env.TAGLOGGER_API_KEY });

// One page of tags (envelope: { data, nextCursor })
const { data: tags } = await client.tags.list({ limit: 50 });
for (const tag of tags) console.log(tag.id, tag.name);

// Or stream every tag, paging transparently
for await (const tag of client.tags.iterate()) {
  console.log(tag.id);
}

// Latest location for one tag -> { data: point | null, recordingPaused }
const { data: location } = await client.tags.location('tag-1');`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Get an API key from your dashboard under"," ",e.jsx(t,{to:"/dashboard",className:"font-semibold text-primary hover:underline",children:"Settings → API Keys"}),". Keys are scoped; each method documents the scope it needs in the"," ",e.jsx("a",{href:"https://www.npmjs.com/package/taglogger",target:"_blank",rel:"noreferrer",className:"font-semibold text-primary hover:underline",children:"package README"}),"."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Configuration"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`const client = new TagLoggerClient({
  apiKey: 'tl_live_...',
  baseUrl: 'https://api.taglogger.com', // override to target a staging deployment
  authHeader: 'bearer',                  // 'bearer' (default) or 'x-api-key'
  timeoutMs: 30000,
  maxRetries: 2,        // GET/DELETE retried on 5xx/network; any method retried on 429
  fetch: customFetch,   // inject a fetch implementation for tests or custom transports
});`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Every request method accepts an optional trailing"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"AbortSignal"})," for cancellation and per-request timeouts. Transient failures retry with randomized backoff: network errors and ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"5xx"})," on idempotent methods (",e.jsx("code",{className:"bg-muted px-1 rounded",children:"GET"}),"/",e.jsx("code",{className:"bg-muted px-1 rounded",children:"DELETE"}),"), and ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"429"})," on any method. Non-idempotent writes are never silently retried after a transport failure."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Reading tags and locations"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`// A single tag, its battery, and its current location
const tag = await client.tags.get('tag-1');                 // read:tags
const battery = await client.tags.battery('tag-1');         // read:tags
const { data: point } = await client.tags.location('tag-1');// read:locations

// Location history (start/end accept ISO 8601 or epoch ms)
const page = await client.tags.history('tag-1', { order: 'asc', limit: 500 });

// Incremental, whole-fleet sync — pass last sync's high-water mark as 'since'
let cursor;
do {
  const delta = await client.fleet.delta({ since: lastSync, cursor });
  handle(delta.data);
  cursor = delta.nextCursor;
} while (cursor);`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Every list endpoint has a matching"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"iterate*"})," helper that returns an async"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"Paginator"})," — use"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"for await"})," for items,"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:".pages()"})," for a page at a time, or"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:".all()"})," to collect everything. Pages are fetched lazily."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Geofences, webhooks and share links"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`// Create a geofence (manage:geofences)
const gf = await client.geofences.create({
  name: 'Yard',
  center: { lat: 37.77, lng: -122.42 },
  radiusMeters: 150,
  targetTagIds: ['tag-1', 'tag-2'],
});

// Subscribe to a webhook (manage:webhooks)
const webhook = await client.webhooks.create({
  url: 'https://example.com/hooks/taglogger',
  events: ['geofence.entry', 'geofence.exit', 'tag.offline'],
});
const secret = webhook.signingSecret; // shown ONCE — store it now to verify deliveries

// Verify your endpoint right away
await client.webhooks.sendTest(webhook.id);`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["The six event types are"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"geofence.entry"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"geofence.exit"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"geofence.dwell"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.moved"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.battery_low"})," and"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.offline"}),". See"," ",e.jsx(t,{to:"/docs/guides/webhooks-setup",className:"font-semibold text-primary hover:underline",children:"Set up Webhooks"})," ","for the full event catalog and delivery details."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Verifying incoming webhooks"}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Every delivery carries an ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"X-TagLogger-Signature"})," ","header (",e.jsx("code",{className:"bg-muted px-1 rounded",children:"sha256=<hex>"}),", an HMAC-SHA256 of the ",e.jsx("strong",{children:"raw"})," request body). Verify against the raw bytes before trusting the payload — re-serializing the JSON changes the bytes and fails the check. Delivery is at-least-once, so de-duplicate on the event ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"id"}),"."]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`import { constructWebhookEvent, SIGNATURE_HEADER, TagLoggerError } from 'taglogger';

// Express — capture the RAW body, e.g. express.raw({ type: 'application/json' })
app.post('/hooks/taglogger', (req, res) => {
  const raw = req.body.toString('utf8'); // raw bytes as received, not JSON.parse'd
  try {
    const event = constructWebhookEvent(raw, req.header(SIGNATURE_HEADER), WEBHOOK_SECRET);
    res.sendStatus(200); // event is the parsed, authenticated payload
  } catch (err) {
    if (err instanceof TagLoggerError) return res.sendStatus(400);
    throw err;
  }
});`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:[e.jsx("code",{className:"bg-muted px-1 rounded",children:"verifyWebhookSignature(rawBody, signatureHeader, secret)"})," ","is the lower-level check; it returns ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"false"})," ","(never throws) on a missing header or mismatch."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Analytics toolkit"}),e.jsxs("p",{children:["The package bundles ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"taglogger/analytics"}),", a dependency-free, pure-math toolkit that turns the location data the API returns into stops, trips, dwell intervals, clusters and map-ready shapes. Everything runs locally, in-process — nothing is sent anywhere. Import it as a deep entry point so it tree-shakes away when unused."]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`import {
  fixesFromLocationPoints,
  conditionFixes,
  detectStops,
  detectTrips,
  toFeatureCollection,
} from 'taglogger/analytics';

// Pull a tag's history, then analyze it in-process
const page = await client.tags.history('tag-1', { order: 'asc', limit: 500 });
const fixes = fixesFromLocationPoints(page.data);

const clean = conditionFixes(fixes, { maxAccuracyMeters: 100 });
const stops = detectStops(clean, { radiusMeters: 50, minDurationMs: 300000 }); // 5 min
const trips = detectTrips(clean, stops);

const geojson = toFeatureCollection(trips, stops); // ready for any map`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["The toolkit also exposes conditioning (",e.jsx("code",{className:"bg-muted px-1 rounded",children:"sortByTime"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"dedupeByTimestamp"}),"), DBSCAN"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"clusterFixes"}),", geometry primitives (",e.jsx("code",{className:"bg-muted px-1 rounded",children:"haversineMeters"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"pointInPolygon"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"douglasPeucker"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"encodePolyline"}),"), and"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"estimateBatteryDaysRemaining"})," for battery projection from a series of readings."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Error handling"}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Any non-2xx response, or a transport failure, throws"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"TagLoggerError"})," with a stable"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"code"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"status"})," (0 for transport failures),"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"requestId"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"isRateLimit"})," and"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"retryAfterSeconds"}),"."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"See also"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside",children:[e.jsx("li",{children:e.jsx(t,{to:"/docs/sdks/python",className:"font-semibold text-primary hover:underline",children:"Python SDK"})}),e.jsx("li",{children:e.jsx(t,{to:"/docs/authentication",className:"font-semibold text-primary hover:underline",children:"Authentication"})}),e.jsx("li",{children:e.jsx(t,{to:"/docs/openapi",className:"font-semibold text-primary hover:underline",children:"OpenAPI specification"})}),e.jsx("li",{children:e.jsx(t,{to:"/docs/guides/webhooks-setup",className:"font-semibold text-primary hover:underline",children:"Set up Webhooks"})})]})]})]})}export{l as default};
