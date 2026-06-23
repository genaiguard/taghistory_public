import{j as e,L as s}from"./main-Bm6hmgm5.js";import{D as t}from"./DocPageTemplate-DV1DzLop.js";import"./x-CWLESPuC.js";import"./chevron-right-CLxNJPGk.js";import"./button-begoqf8C.js";import"./index-CHGHLV8X.js";import"./index-gc1ARzsb.js";function d(){return e.jsxs(t,{title:"Fleet Delta",description:"Efficiently synchronize changes across your entire tag fleet",children:[e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Overview"}),e.jsx("p",{children:"Fleet Delta is the most efficient endpoint for synchronizing your workspace's tag fleet. Instead of polling individual tags or fetching all tags repeatedly, it returns only the tags whose location advanced since your last sync."}),e.jsx("p",{children:"This is the recommended endpoint for polling and for reconciliation when combined with webhooks."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"How It Works"}),e.jsxs("p",{children:["Fleet Delta uses a cursor-based approach: you provide a timestamp from your last sync, and the API returns only tags that changed since that point. Each item is a compact fleet delta record (note the field is ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"tagId"}),", and the full location point is under ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"location"}),")."]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`GET /v1/fleet/delta?since=2024-06-19T12:00:00Z

{
  "data": [
    {
      "tagId": "aB3xK9Qm1Zr7",
      "name": "Van 1",
      "hardwareId": "00000000DEADBEEF",
      "lastSeenAt": "2024-06-19T13:45:23Z",
      "recordingPaused": false,
      "battery": { "level": null, "status": 1, "updatedAt": "2024-06-19T13:45:23Z" },
      "location": {
        "lat": 40.7128,
        "lng": -74.0060,
        "timestamp": "2024-06-19T13:45:23Z",
        "timestampMs": 1718809523000,
        "accuracy": 25
      }
    }
  ],
  "nextCursor": "cursor_def456"
}`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["The ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"location"})," object is abbreviated above for readability. Each item returns a full location point — see ",e.jsx(s,{to:"/docs/concepts/locations",className:"font-semibold text-primary hover:underline",children:"Locations"})," for every field."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Parameters"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-mono font-semibold mb-1",children:"since"}),e.jsxs("p",{children:["ISO 8601 timestamp or epoch milliseconds. Returns only tags whose location advanced after this time. ",e.jsx("strong",{children:"Optional"}),"—omit it to receive a full snapshot of every tag that has reported a location."]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-mono font-semibold mb-1",children:"limit"}),e.jsx("p",{children:"Page size (default 100, max 500)."})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-mono font-semibold mb-1",children:"cursor"}),e.jsx("p",{children:"Pagination token. Use nextCursor from a previous response to fetch the next page."})]})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Response Fields"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-mono font-semibold mb-1",children:"data"}),e.jsxs("p",{children:["Array of fleet delta items. Each item has ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tagId"}),", ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"name"}),", ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"hardwareId"}),", ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"lastSeenAt"}),", ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"recordingPaused"}),", ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"battery"}),", and ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"location"})," (a full location point, or null when there is no fix). See ",e.jsx(s,{to:"/docs/concepts/locations",className:"font-semibold text-primary hover:underline",children:"Locations"})," for the location point shape."]})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-mono font-semibold mb-1",children:"nextCursor"}),e.jsx("p",{children:"Pagination token for the next page. Null if there are no more results."})]})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Usage Patterns"}),e.jsx("h3",{className:"text-lg font-semibold mt-4",children:"Initial Sync"}),e.jsxs("p",{className:"text-sm",children:["To fetch the current state of every tag that has reported a location, omit ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"since"})," (or pass a timestamp far in the past):"]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`const response = await fetch(
  'https://api.taglogger.com/v1/fleet/delta?limit=500',
  { headers: { 'Authorization': 'Bearer tl_live_xxx' } }
);`})}),e.jsx("h3",{className:"text-lg font-semibold mt-4",children:"Periodic Polling"}),e.jsx("p",{className:"text-sm",children:"Store the timestamp of your last sync and use it for the next poll:"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`let lastSync = new Date();

async function syncFleet() {
  const response = await fetch(
    \`https://api.taglogger.com/v1/fleet/delta?since=\${lastSync.toISOString()}\`,
    { headers: { 'Authorization': 'Bearer tl_live_xxx' } }
  );

  const { data, nextCursor } = await response.json();
  let maxSeen = lastSync;
  for (const item of data) {
    updateLocalDatabase(item.tagId, item.location);
    const seen = new Date(item.lastSeenAt);
    if (seen > maxSeen) maxSeen = seen;
  }

  // Carry forward the newest lastSeenAt we saw, not wall-clock — advancing
  // by new Date() can skip changes that arrive between polls.
  lastSync = maxSeen;
}

// Poll every 30 seconds
setInterval(syncFleet, 30000);`})}),e.jsx("h3",{className:"text-lg font-semibold mt-4",children:"Pagination"}),e.jsx("p",{className:"text-sm",children:"For large workspaces, results may be paginated. Fetch all pages:"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`let cursor = null;
let allItems = [];

do {
  const query = new URLSearchParams({ since: '2024-06-19T00:00:00Z', limit: 500 });
  if (cursor) query.set('cursor', cursor);

  const response = await fetch(
    \`https://api.taglogger.com/v1/fleet/delta?\${query}\`,
    { headers: { 'Authorization': 'Bearer tl_live_xxx' } }
  );

  const { data, nextCursor } = await response.json();
  allItems = allItems.concat(data);
  cursor = nextCursor;
} while (cursor);`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"When to Use"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Regular polling:"})," Use Fleet Delta instead of fetching individual tags or listing all tags every time."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Webhook reconciliation:"})," Combine webhooks with periodic Fleet Delta polls to ensure you never miss an update."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Multiple tags:"})," For any workspace with more than a few tags, Fleet Delta is more efficient than single-tag endpoints."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"App syncing:"})," Keep your app's view of the fleet in sync with the server."]})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Efficiency Tips"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Use appropriate poll intervals:"})," 30–60 seconds is fine for most use cases; more frequent polls waste quota."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Store the sync timestamp:"})," Persist lastSync so you resume from the right point if your service restarts."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Handle pagination:"})," Use the limit parameter (max 500) to fetch large result sets efficiently."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Respect rate limits:"})," Monitor X-RateLimit-* headers and back off if you're close to your limit."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Combine with webhooks:"})," For real-time responsiveness, use webhooks + periodic Fleet Delta polling for reconciliation."]})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"See Also"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsx("li",{children:e.jsx(s,{to:"/docs/concepts/tags",className:"font-semibold text-primary hover:underline",children:"Tags"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/guides/polling",className:"font-semibold text-primary hover:underline",children:"Polling best practices"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/guides/batch",className:"font-semibold text-primary hover:underline",children:"Batch operations"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/api-reference/endpoints",className:"font-semibold text-primary hover:underline",children:"All API endpoints"})})]})]})]})}export{d as default};
