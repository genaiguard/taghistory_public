import{j as e,M as s}from"./main-B_Zwff3g.js";import{D as t}from"./DocPageTemplate-B7Viuawz.js";import"./x-DJwlZiC1.js";import"./chevron-right-DDTLxvo6.js";import"./button-CCxRIhTP.js";import"./index-BNvFG2ym.js";import"./index-dQ9_CEy-.js";function d(){return e.jsxs(t,{title:"Polling for Updates",description:"Efficiently poll the API to stay in sync with tag changes",children:[e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Webhooks vs. Polling"}),e.jsxs("p",{children:["Webhooks are the recommended way to receive real-time updates (see ",e.jsx(s,{to:"/docs/guides/webhooks-setup",className:"font-semibold text-primary hover:underline",children:"Setting Up Webhooks"}),"). However, polling is an alternative when you:"]}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsx("li",{children:"Can't expose a public HTTPS endpoint (e.g., behind a firewall)"}),e.jsx("li",{children:"Need to reconcile state periodically"}),e.jsx("li",{children:"Prefer a simpler implementation without signature verification"})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Polling Strategy"}),e.jsxs("p",{children:["For polling to be efficient, use the ",e.jsx(s,{to:"/docs/concepts/fleet",className:"font-semibold text-primary hover:underline",children:"Fleet Delta endpoint"})," instead of polling individual tags. This returns only the tags that have changed since your last poll, reducing bandwidth and latency."]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`// Polling loop
const apiKey = process.env.API_KEY;
let lastSyncTime = new Date(Date.now() - 5 * 60 * 1000); // 5 minutes ago

const pollFleetDelta = async () => {
  try {
    const response = await fetch(
      \`https://api.taglogger.com/v1/fleet/delta?since=\${lastSyncTime.toISOString()}\`,
      { headers: { 'Authorization': \`Bearer \${apiKey}\` } }
    );

    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }

    const { data, nextCursor } = await response.json();

    // Process each changed tag, tracking the newest lastSeenAt we observe.
    let maxSeen = lastSyncTime;
    for (const change of data) {
      console.log(\`Tag \${change.tagId} updated at \${change.location?.timestamp}\`);
      updateLocalDatabase(change.tagId, change.location);
      const seen = new Date(change.lastSeenAt);
      if (seen > maxSeen) maxSeen = seen;
    }

    // Carry forward the maximum lastSeenAt from the returned changes as the
    // next "since". Using wall-clock (new Date()) can drop changes that land
    // between polls, so we advance only as far as the data we actually saw.
    lastSyncTime = maxSeen;

    // Reset backoff on success
    pollIntervalMs = DEFAULT_POLL_INTERVAL;
  } catch (error) {
    console.error('Poll failed:', error);
    // Exponential backoff on error
    pollIntervalMs = Math.min(pollIntervalMs * 2, MAX_BACKOFF);
  }
};

// Poll every 30 seconds (adjust based on your needs)
const DEFAULT_POLL_INTERVAL = 30 * 1000;
const MAX_BACKOFF = 5 * 60 * 1000; // 5 minutes
let pollIntervalMs = DEFAULT_POLL_INTERVAL;
let pollTimer = setInterval(pollFleetDelta, pollIntervalMs);`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Poll Interval"}),e.jsx("p",{children:"Choose your poll interval based on your use case:"}),e.jsxs("div",{className:"space-y-3 text-sm",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-semibold mb-1",children:"Real-time dashboards: 5–10 seconds"}),e.jsx("p",{children:"Higher frequency shows updates immediately but uses more API quota."})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-semibold mb-1",children:"Production integrations: 30–60 seconds"}),e.jsx("p",{children:"Good balance between responsiveness and efficiency."})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-semibold mb-1",children:"Background sync jobs: 5–10 minutes"}),e.jsx("p",{children:"Ideal for batch processing or periodic reconciliation."})]})]}),e.jsx("p",{className:"text-sm",children:"Monitor your actual usage and adjust accordingly. Remember that polling counts against your API rate limit."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Cursor-Based Pagination"}),e.jsxs("p",{children:["If your fleet is large, the API may paginate results. Use the ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"nextCursor"})," field to fetch the next page:"]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`let cursor = null;
let allChanges = [];

do {
  const query = new URLSearchParams({
    since: lastSyncTime.toISOString(),
    limit: 100 // page size
  });
  if (cursor) query.set('cursor', cursor);

  const response = await fetch(
    \`https://api.taglogger.com/v1/fleet/delta?\${query}\`,
    { headers: { 'Authorization': \`Bearer \${apiKey}\` } }
  );

  const { data, nextCursor } = await response.json();
  allChanges = allChanges.concat(data);
  cursor = nextCursor;
} while (cursor);

// Process all changes
for (const change of allChanges) {
  updateLocalDatabase(change);
}`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Handling Errors and Rate Limits"}),e.jsx("p",{children:"Polling adds load to the API, so handle rate limits gracefully:"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`const pollFleetDelta = async () => {
  try {
    const response = await fetch(url, { headers });

    if (response.status === 429) {
      // Rate limited—back off exponentially
      const retryAfter = response.headers.get('Retry-After') || '60';
      console.warn(\`Rate limited. Retrying after \${retryAfter}s\`);
      pollIntervalMs = Math.min(
        parseInt(retryAfter) * 1000,
        MAX_BACKOFF
      );
      return;
    }

    if (!response.ok) {
      throw new Error(\`API error: \${response.status}\`);
    }

    const { data, nextCursor } = await response.json();
    processChanges(data);

    // Reset poll interval on success
    pollIntervalMs = DEFAULT_POLL_INTERVAL;
  } catch (error) {
    console.error('Poll failed:', error);
    // Exponential backoff
    pollIntervalMs = Math.min(
      (pollIntervalMs || DEFAULT_POLL_INTERVAL) * 2,
      MAX_BACKOFF
    );
  }

  // Reschedule with new interval
  clearTimeout(pollTimer);
  pollTimer = setTimeout(pollFleetDelta, pollIntervalMs);
};`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Best Practices"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Use Fleet Delta:"})," Don't poll individual tag endpoints. Fleet Delta is efficient and designed for polling."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Choose an appropriate interval:"})," Balance responsiveness with API quota and rate limits."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Implement exponential backoff:"})," If polls fail, gradually increase the interval before retrying."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Handle rate limits:"})," Respect X-RateLimit-* headers and Retry-After responses."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Store the sync cursor:"})," Persist the timestamp or cursor so you resume from the right point if your service restarts."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Log poll activity:"})," Track success/failure rates and latency to detect issues."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Consider webhooks:"})," If you can expose a public HTTPS endpoint, webhooks are more efficient and responsive."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Set a reasonable timeout:"})," Don't wait forever for a poll response. Use a 10–30 second timeout."]})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Example: Production Polling Loop"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`class FleetPoller {
  constructor(apiKey, interval = 30000) {
    this.apiKey = apiKey;
    this.interval = interval;
    this.lastSync = new Date();
    this.backoffMultiplier = 1;
    this.maxBackoff = 5 * 60 * 1000;
  }

  async start() {
    this.poll();
  }

  async poll() {
    try {
      const response = await fetch(
        \`https://api.taglogger.com/v1/fleet/delta?since=\${this.lastSync.toISOString()}\`,
        {
          headers: { 'Authorization': \`Bearer \${this.apiKey}\` },
          timeout: 30000
        }
      );

      if (response.status === 429) {
        const retryAfter = parseInt(response.headers.get('Retry-After') || '60') * 1000;
        this.backoffMultiplier = 2;
        this.scheduleNextPoll(retryAfter);
        return;
      }

      if (!response.ok) throw new Error(\`HTTP \${response.status}\`);

      const { data } = await response.json();
      let maxSeen = this.lastSync;
      for (const change of data) {
        this.handleChange(change);
        const seen = new Date(change.lastSeenAt);
        if (seen > maxSeen) maxSeen = seen;
      }

      // Advance only as far as the data we actually saw, never wall-clock
      // (new Date()) — that can drop changes that land between polls.
      this.lastSync = maxSeen;
      this.backoffMultiplier = 1;
      this.scheduleNextPoll(this.interval);
    } catch (error) {
      console.error('Poll error:', error);
      const backoff = Math.min(
        this.interval * this.backoffMultiplier,
        this.maxBackoff
      );
      this.backoffMultiplier *= 2;
      this.scheduleNextPoll(backoff);
    }
  }

  handleChange(change) {
    // Update your application state
    console.log(\`Tag \${change.tagId} updated at \${change.location?.timestamp}\`);
  }

  scheduleNextPoll(delay) {
    setTimeout(() => this.poll(), delay);
  }
}`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"See Also"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsx("li",{children:e.jsx(s,{to:"/docs/concepts/fleet",className:"font-semibold text-primary hover:underline",children:"Fleet Delta endpoint"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/guides/webhooks-setup",className:"font-semibold text-primary hover:underline",children:"Webhooks (recommended for real-time)"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/api-reference/endpoints",className:"font-semibold text-primary hover:underline",children:"All endpoints"})})]})]})]})}export{d as default};
