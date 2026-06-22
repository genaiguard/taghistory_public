import{j as e,L as s}from"./main-CJZmfpG_.js";import{D as t}from"./DocPageTemplate-BmAYzcH0.js";import"./x-DibRIYqs.js";import"./chevron-right-Bvzs1Dpw.js";import"./button-zADRlVN-.js";import"./index-BrvA2grR.js";import"./index-Czj1Wt0r.js";function d(){return e.jsxs(t,{title:"Usage & Rate Limits",description:"Understand metering, rate limits, and how to optimize API usage",children:[e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Rate Limiting"}),e.jsxs("p",{children:["Each API key is limited to ",e.jsx("strong",{children:"120 requests per 60-second window"}),". The window is fixed per key, and every request counts toward the limit regardless of the endpoint or response status."]}),e.jsxs("p",{className:"text-sm",children:["If you are regularly close to the limit, the ",e.jsx("strong",{children:"Optimizing Usage"})," patterns below—fleet delta, webhooks, and local caching—keep most fleets comfortably under it without any change to your key."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Checking Your Limit"}),e.jsx("p",{children:"Every response includes rate-limit information in the headers:"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`HTTP/1.1 200 OK
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 42
X-RateLimit-Reset: 1718900460

{ "data": [...] }`})}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"X-RateLimit-Limit:"})," Maximum requests allowed in the current window for your key.",e.jsx("br",{}),e.jsx("strong",{children:"X-RateLimit-Remaining:"})," Requests remaining before hitting the limit.",e.jsx("br",{}),e.jsx("strong",{children:"X-RateLimit-Reset:"})," Unix timestamp (seconds) when the limit resets."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Exceeding the Limit"}),e.jsx("p",{children:"When you exceed your rate limit, requests fail with 429 Too Many Requests:"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`HTTP/1.1 429 Too Many Requests
X-RateLimit-Limit: 120
X-RateLimit-Remaining: 0
X-RateLimit-Reset: 1718900460
Retry-After: 12

{ "error": { "code": "rate_limited", "message": "Rate limit of 120 requests per 60s exceeded." } }`})}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"Retry-After:"})," Seconds to wait before retrying. Always respect this header."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Optimizing Usage"}),e.jsx("p",{children:"To stay within rate limits and reduce unnecessary API calls:"}),e.jsx("h3",{className:"text-lg font-semibold mt-4",children:"Use Fleet Delta"}),e.jsxs("p",{className:"text-sm",children:["Instead of polling individual tags, use ",e.jsx(s,{to:"/docs/concepts/fleet",className:"font-semibold text-primary hover:underline",children:"GET /v1/fleet/delta"})," to fetch only changed tags in a single request."]}),e.jsx("h3",{className:"text-lg font-semibold mt-4",children:"Increase Poll Interval"}),e.jsx("p",{className:"text-sm",children:"If you're polling regularly, increase the interval. 30–60 seconds is reasonable for most use cases. Real-time dashboards might use 5–10 seconds, but background jobs can poll every 5–10 minutes."}),e.jsx("h3",{className:"text-lg font-semibold mt-4",children:"Use Webhooks"}),e.jsx("p",{className:"text-sm",children:"Webhooks are much more efficient than polling. You only receive notifications when tags actually change, rather than making regular requests regardless of whether anything happened."}),e.jsx("h3",{className:"text-lg font-semibold mt-4",children:"Cache Locally"}),e.jsx("p",{className:"text-sm",children:"Store tag data in your local database or cache. Only update when the API returns fresh data, and avoid fetching the same information multiple times."}),e.jsx("h3",{className:"text-lg font-semibold mt-4",children:"Batch Requests"}),e.jsxs("p",{className:"text-sm",children:["When fetching data for multiple tags, use GET /v1/tags (with pagination) instead of multiple individual GET /v1/tags/","{tagId}"," requests."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Example: Rate-Limit Aware Polling"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`async function pollWithBackoff(since) {
  let backoffMs = 1000; // Start with 1 second backoff

  while (true) {
    try {
      const response = await fetch(
        \`https://api.taglogger.com/v1/fleet/delta?since=\${since}\`,
        { headers: { 'Authorization': 'Bearer tl_live_xxx' } }
      );

      // Log rate limit info
      const limit = response.headers.get('X-RateLimit-Limit');
      const remaining = response.headers.get('X-RateLimit-Remaining');
      console.log(\`Rate limit: \${remaining}/\${limit}\`);

      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After')) || 60;
        console.warn(\`Rate limited. Waiting \${retryAfter}s\`);
        await sleep(retryAfter * 1000);
        continue;
      }

      if (!response.ok) {
        throw new Error(\`HTTP \${response.status}\`);
      }

      const { data, nextCursor } = await response.json();
      processChanges(data);
      backoffMs = 1000; // Reset on success
      return;
    } catch (error) {
      console.error('Poll error:', error);
      await sleep(backoffMs);
      backoffMs = Math.min(backoffMs * 2, 30000); // Cap at 30s
    }
  }
}

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Monitoring Your Usage"}),e.jsxs("p",{children:["The clearest real-time signal is the rate-limit headers on every response. Track ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"X-RateLimit-Remaining"})," to see how close you are to your limit and adjust your request rate before you hit it."]}),e.jsxs("p",{className:"text-sm",children:["There is no separate usage dashboard in v1—the rate-limit headers on every response are the live usage signal. Log ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"X-RateLimit-Remaining"})," from your own client to chart usage over time and alert before you approach the limit."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Need More Throughput?"}),e.jsxs("p",{children:["If you're consistently close to the standard limit of 120 requests per 60 seconds, the most effective fix is on the integration side: poll ",e.jsx(s,{to:"/docs/concepts/fleet",className:"font-semibold text-primary hover:underline",children:"GET /v1/fleet/delta"})," instead of per-tag endpoints, switch from polling to ",e.jsx(s,{to:"/docs/webhooks/overview",className:"font-semibold text-primary hover:underline",children:"webhooks"}),", and cache locally. The patterns in ",e.jsx("strong",{children:"Optimizing Usage"})," above keep most fleets well under the limit."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Best Practices"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Monitor X-RateLimit-Remaining:"})," Check this header and adjust your polling frequency if you're consistently close to the limit."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Implement exponential backoff:"})," When hitting rate limits, wait exponentially longer between retries (1s, 2s, 4s, 8s, etc.)."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Use Fleet Delta:"})," It's much more efficient than polling individual tags or listing all tags repeatedly."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Cache aggressively:"})," Store tag data locally and only refresh on webhooks or a periodic poll."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Use webhooks:"})," They're more efficient than polling and give you immediate notifications."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Batch related requests:"})," Fetch all the data you need in one go, rather than making multiple small requests."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Avoid rapid retries:"})," If a request fails, don't immediately retry. Back off first."]})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"See Also"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsx("li",{children:e.jsx(s,{to:"/docs/concepts/fleet",className:"font-semibold text-primary hover:underline",children:"Fleet Delta endpoint"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/guides/polling",className:"font-semibold text-primary hover:underline",children:"Polling best practices"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/guides/webhooks-setup",className:"font-semibold text-primary hover:underline",children:"Webhooks (recommended)"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/api-reference/errors",className:"font-semibold text-primary hover:underline",children:"Error handling"})})]})]})]})}export{d as default};
