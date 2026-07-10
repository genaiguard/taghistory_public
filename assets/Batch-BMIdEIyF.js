import{j as e,M as s}from"./main-B_Zwff3g.js";import{D as t}from"./DocPageTemplate-B7Viuawz.js";import"./x-DJwlZiC1.js";import"./chevron-right-DDTLxvo6.js";import"./button-CCxRIhTP.js";import"./index-BNvFG2ym.js";import"./index-dQ9_CEy-.js";function d(){return e.jsxs(t,{title:"Batch Operations and Pagination",description:"Efficiently work with multiple tags and handle large result sets",children:[e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Listing All Tags"}),e.jsxs("p",{children:["To fetch all your tags in one call, use the ",e.jsx(s,{to:"/docs/api-reference/endpoints",className:"font-semibold text-primary hover:underline",children:"GET /v1/tags endpoint"}),":"]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`const response = await fetch('https://api.taglogger.com/v1/tags', {
  headers: { 'Authorization': 'Bearer tl_live_xxx' }
});

const { data, nextCursor } = await response.json();
console.log(\`Found \${data.length} tags\`);

// data is an array of tag objects with id, name, status, hardwareId, etc.`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Fleet Delta for Changes"}),e.jsxs("p",{children:["For the most efficient batch retrieval, use the ",e.jsx(s,{to:"/docs/concepts/fleet",className:"font-semibold text-primary hover:underline",children:"Fleet Delta endpoint"}),". It returns only the tags that have changed since your last sync, saving bandwidth:"]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`const response = await fetch(
  'https://api.taglogger.com/v1/fleet/delta?since=2024-06-19T12:00:00Z',
  { headers: { 'Authorization': 'Bearer tl_live_xxx' } }
);

const { data, nextCursor } = await response.json();
console.log(\`\${data.length} tags changed\`);

// data includes tags whose location advanced since 'since'`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Pagination"}),e.jsxs("p",{children:["List endpoints return paginated results. Use the ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"nextCursor"})," field to fetch additional pages:"]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`let cursor = null;
let allTags = [];

do {
  const query = new URLSearchParams({ limit: 200 });
  if (cursor) query.set('cursor', cursor);

  const response = await fetch(
    \`https://api.taglogger.com/v1/tags?\${query}\`,
    { headers: { 'Authorization': 'Bearer tl_live_xxx' } }
  );

  const { data, nextCursor } = await response.json();
  allTags = allTags.concat(data);
  cursor = nextCursor;

  console.log(\`Fetched \${data.length} tags, nextCursor: \${cursor || 'none'}\`);
} while (cursor);

console.log(\`Total: \${allTags.length} tags\`);`})}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"limit:"})," Page size (default 50, max 200). ",e.jsx("strong",{children:"cursor:"})," Opaque token for the next page. ",e.jsx("strong",{children:"nextCursor:"})," null when there are no more pages."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Batch Reading Current Locations"}),e.jsx("p",{children:"To get current locations for multiple tags:"}),e.jsxs("ol",{className:"space-y-2 list-decimal list-inside text-sm",children:[e.jsxs("li",{children:["Call ",e.jsx(s,{to:"/docs/api-reference/endpoints",className:"font-semibold text-primary hover:underline",children:"GET /v1/tags"})," to list all tags"]}),e.jsxs("li",{children:["Or use ",e.jsx(s,{to:"/docs/concepts/fleet",className:"font-semibold text-primary hover:underline",children:"GET /v1/fleet/delta"})," to get only changed tags"]}),e.jsxs("li",{children:["Extract the current location from each tag's ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"lastLocation"})," field"]})]}),e.jsxs("p",{className:"text-sm",children:["Each tag object includes ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"lastLocation"})," (current latitude, longitude, and timestamp), so you don't need additional requests. For accuracy, altitude, and other detail, call the location or history endpoints."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Parallel Requests for Details"}),e.jsx("p",{children:"If you need detailed history for specific tags, make parallel requests to avoid sequential delays:"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`const tagIds = ['tag_abc', 'tag_def', 'tag_ghi'];
const headers = { 'Authorization': 'Bearer tl_live_xxx' };

// Fetch history for all tags in parallel
const histories = await Promise.all(
  tagIds.map(id =>
    fetch(\`https://api.taglogger.com/v1/tags/\${id}/history?limit=100\`, { headers })
      .then(r => r.json())
  )
);

// Process results
for (let i = 0; i < tagIds.length; i++) {
  console.log(\`Tag \${tagIds[i]}: \${histories[i].data.length} history points\`);
}`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Rate Limiting with Batch Operations"}),e.jsx("p",{children:"Batch operations can quickly hit rate limits. Monitor the rate-limit headers and implement backoff:"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`async function fetchWithBackoff(url, maxRetries = 3) {
  for (let attempt = 0; attempt < maxRetries; attempt++) {
    const response = await fetch(url, {
      headers: { 'Authorization': 'Bearer tl_live_xxx' }
    });

    const remaining = response.headers.get('X-RateLimit-Remaining');
    const reset = response.headers.get('X-RateLimit-Reset');

    console.log(\`Rate limit: \${remaining} remaining, resets at \${reset}\`);

    if (response.status === 429) {
      const retryAfter = response.headers.get('Retry-After');
      const delayMs = (parseInt(retryAfter) || 60) * 1000;
      console.log(\`Rate limited. Waiting \${delayMs}ms\`);
      await new Promise(r => setTimeout(r, delayMs));
      continue;
    }

    if (response.ok) {
      return response.json();
    }

    throw new Error(\`HTTP \${response.status}\`);
  }

  throw new Error(\`Failed after \${maxRetries} attempts\`);
}`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Best Practices"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Use Fleet Delta:"})," When syncing regularly, it's much more efficient than listing all tags every time."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Respect pagination:"})," Always check for ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"nextCursor"})," and fetch all pages."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Parallel requests:"})," Use Promise.all for independent requests, but stay below rate limits."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Monitor rate limits:"})," Log X-RateLimit-* headers to understand your usage and adjust request frequency."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Implement exponential backoff:"})," When hitting rate limits, wait longer between retries (1s, 2s, 4s, etc.)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cache results:"})," Store tag data locally and only poll on an interval to avoid unnecessary requests."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Use appropriate page sizes:"})," Use a large page size (up to 200 for list endpoints, 500 for fleet delta, 1000 for history) to minimize pagination overhead."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Batch by operation type:"})," Group similar requests (all list, all history) rather than interleaving them."]})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"See Also"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsx("li",{children:e.jsx(s,{to:"/docs/api-reference/endpoints",className:"font-semibold text-primary hover:underline",children:"All endpoints"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/concepts/fleet",className:"font-semibold text-primary hover:underline",children:"Fleet Delta endpoint"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/api-reference/errors",className:"font-semibold text-primary hover:underline",children:"Error handling"})})]})]})]})}export{d as default};
