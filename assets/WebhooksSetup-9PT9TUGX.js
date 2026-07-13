import{j as e,M as s}from"./main-CwhuHScf.js";import{D as t}from"./DocPageTemplate-CooOiQL6.js";import"./x-semnpAxa.js";import"./chevron-right-VHgayRNf.js";import"./button-YF3lnFLR.js";import"./index-D-Ef3lTe.js";import"./index-DncMHW4m.js";function c(){return e.jsxs(t,{title:"Setting Up Webhooks",description:"Step-by-step guide to implement real-time event handling",children:[e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Overview"}),e.jsx("p",{children:"This guide walks you through setting up webhooks to receive real-time notifications when tags move, battery is low, or go offline."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Step 1: Implement Your Webhook Endpoint"}),e.jsx("p",{children:"Create an HTTPS endpoint that will receive webhook POST requests. Your endpoint must:"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsx("li",{children:"Be publicly accessible over HTTPS (HTTP will be rejected)"}),e.jsx("li",{children:"Accept POST requests with JSON bodies"}),e.jsx("li",{children:"Verify the X-TagLogger-Signature header"}),e.jsx("li",{children:"Respond with a 2xx status (for example, 200 OK) to acknowledge receipt"})]}),e.jsx("h3",{className:"text-lg font-semibold mt-4",children:"Example (Express.js)"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`const express = require('express');
const crypto = require('crypto');

const app = express();

// IMPORTANT: Use raw body for signature verification
app.use(express.json({ verify: (req, res, buf) => {
  req.rawBody = buf.toString();
} }));

app.post('/webhooks/taglogger', (req, res) => {
  // 1. Verify the signature
  // Header format: "X-TagLogger-Signature: sha256=<hex>"
  const header = req.headers['x-taglogger-signature'] || '';
  const provided = header.replace(/^sha256=/, '');
  const secret = process.env.WEBHOOK_SECRET;

  // Must use the raw body, not parsed JSON
  const expected = crypto
    .createHmac('sha256', secret)
    .update(req.rawBody, 'utf8')
    .digest('hex');

  const valid =
    provided.length === expected.length &&
    crypto.timingSafeEqual(Buffer.from(provided), Buffer.from(expected));

  if (!valid) {
    console.error('Signature mismatch!');
    return res.status(401).json({ error: 'Unauthorized' });
  }

  // 2. Acknowledge receipt immediately
  res.sendStatus(200);

  // 3. Process the event asynchronously
  const event = JSON.parse(req.rawBody);
  handleEvent(event).catch(err => {
    console.error('Failed to process webhook:', err);
  });
});

async function handleEvent(event) {
  // Dedup: store event.id to prevent processing duplicates
  const isDuplicate = await db.webhookEvents.findOne({ id: event.id });
  if (isDuplicate) {
    console.log(\`Already processed \${event.id}\`);
    return;
  }

  // Process based on event type
  switch (event.event) {
    case 'tag.moved':
      console.log(\`Tag \${event.tag.id} moved to \${event.data.to.lat},\${event.data.to.lng}\`);
      break;
    case 'tag.battery_low':
      // event.data.status is an integer (3 = low, 4 = critical); prefer the critical boolean.
      console.log(\`Tag \${event.tag.id} battery low (critical: \${event.data.critical})\`);
      break;
    case 'tag.offline':
      console.log(\`Tag \${event.tag.id} last seen \${event.data.lastSeenAt}\`);
      break;
  }

  // Mark as processed
  await db.webhookEvents.insert({ id: event.id, processedAt: new Date() });
}

app.listen(3000);`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Step 2: Create a Webhook Subscription"}),e.jsx("p",{children:"Create a subscription in your workspace to tell TagLogger where to send events."}),e.jsxs("p",{className:"text-sm",children:["Subscriptions are managed through the API. Send a ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"POST /v1/webhooks"})," request with your endpoint URL and the event types you want. The response includes the signing secret. Copy it immediately and store it in your environment (for example, as ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"WEBHOOK_SECRET"}),"); it is shown only once."]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`POST /v1/webhooks HTTP/1.1
Host: api.taglogger.com
Authorization: Bearer tl_live_xxxxx
Content-Type: application/json

{
  "url": "https://example.com/webhooks/taglogger",
  "events": ["tag.moved", "tag.battery_low", "tag.offline"],
  "label": "My App Webhooks"
}

Response (201 Created):
{
  "data": {
    "id": "kP9mX2qR7tA4nB1c",
    "url": "https://example.com/webhooks/taglogger",
    "events": ["tag.moved", "tag.battery_low", "tag.offline"],
    "label": "My App Webhooks",
    "active": true,
    "signingSecret": "whsec_xxxxx...",
    "signingSecretSet": true,
    "createdAt": "2024-06-19T13:45:23Z",
    "updatedAt": "2024-06-19T13:45:23Z"
  }
}`})}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"Important:"})," The signing secret (",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"signingSecret"}),", prefix ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"whsec_"}),") is shown only once, at creation. Store it immediately. If you lose it, rotate it with ",e.jsxs("code",{className:"bg-muted px-2 py-1 rounded",children:["POST /v1/webhooks/","{webhookId}","/rotate-secret"]})," to get a new one."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Step 3: Test Your Endpoint"}),e.jsx("p",{children:"Before enabling live deliveries, test your endpoint with a sample event:"}),e.jsxs("ol",{className:"space-y-2 list-decimal list-inside text-sm",children:[e.jsxs("li",{children:["Send a test delivery: ",e.jsxs("code",{className:"bg-muted px-2 py-1 rounded",children:["POST /v1/webhooks/","{webhookId}","/test"]})]}),e.jsx("li",{children:"Check your server logs to verify the test was received and processed"}),e.jsx("li",{children:"Verify that signature verification succeeded"})]}),e.jsxs("p",{className:"text-sm",children:["See the ",e.jsx(s,{to:"/docs/webhooks/testing",className:"font-semibold text-primary hover:underline",children:"Testing Webhooks"})," page for detailed debugging tips."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Step 4: Go Live"}),e.jsxs("p",{children:["Tag event delivery is off by default at launch. There is nothing to request and no per-workspace switch to flip on your side: once production delivery is enabled, every existing subscription—including the one you just created—starts receiving live ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"tag.*"})," events automatically. No re-creation or code change is needed."]}),e.jsxs("p",{className:"text-sm",children:["Until then, your ",e.jsxs("code",{className:"bg-muted px-2 py-1 rounded",children:["POST /v1/webhooks/","{webhookId}","/test"]})," deliveries work right now, so you can build and verify your entire handler—signature checks included—before live events begin flowing."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Step 5: Implement Robust Event Handling"}),e.jsx("p",{children:"Deliveries are at-least-once and retried automatically, but a subscription that stays down past the retry budget can still miss events, so reconcile against the API to be certain you don't fall behind:"}),e.jsx("h3",{className:"text-lg font-semibold mt-4",children:"Poll the Fleet Delta Regularly"}),e.jsxs("p",{className:"text-sm",children:["Set up a scheduled job to poll ",e.jsx(s,{to:"/docs/concepts/fleet",className:"font-semibold text-primary hover:underline",children:"GET /v1/fleet/delta"})," every few minutes. This ensures you catch any changes that didn't result in a webhook delivery."]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`// Scheduled job: sync tags every 5 minutes
setInterval(async () => {
  const since = await db.lastDeltaPoll.get();
  const response = await fetch(
    \`https://api.taglogger.com/v1/fleet/delta?since=\${since}\`,
    { headers: { 'Authorization': 'Bearer tl_live_xxx' } }
  );

  const { data, nextCursor } = await response.json();
  for (const change of data) {
    // Update your local state with the change
    await db.tags.upsert(change);
  }

  // Update last poll time
  await db.lastDeltaPoll.set(new Date());
}, 5 * 60 * 1000); // 5 minutes`})}),e.jsx("h3",{className:"text-lg font-semibold mt-4",children:"Track Processed Event IDs"}),e.jsx("p",{className:"text-sm",children:"Store the event ID of every webhook you process. If you see the same ID again, skip processing. Because deliveries are at-least-once, the same event id can legitimately arrive more than once (a retry after a slow 200, or overlap at a delivery boundary), so this de-duplication is required for correctness, not just a safeguard."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Best Practices Checklist"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"Verify signatures:"})," Always check X-TagLogger-Signature before trusting the payload."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Respond immediately:"})," Send a 2xx response (for example, 200 OK) within a few seconds, even if processing the event takes longer."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Process asynchronously:"})," Queue the event and process it in a background job or worker."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Track event IDs:"})," Store processed event IDs to prevent duplicate processing."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Handle out-of-order delivery:"})," Use occurredAt timestamps to order events, not arrival order."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Use HTTPS:"})," Your endpoint must be served over HTTPS. HTTP requests will be rejected."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Set up alerts:"})," Log webhook failures and set up alerts for signature mismatches."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Poll for reconciliation:"})," Don't rely on webhooks alone. Poll GET /v1/fleet/delta on an interval."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Inspect delivery status:"})," Use GET /v1/webhooks/","{webhookId}","/deliveries to see per-event status, attempt counts, and the last error when debugging an endpoint that isn't receiving events."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Test the full path:"})," Send a test delivery to your endpoint and confirm signature verification so your handler is ready when live deliveries begin."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"Monitor delivery latency:"})," Track how long deliveries take and set up alerts if latency spikes."]})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Common Pitfalls"}),e.jsxs("div",{className:"space-y-3",children:[e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-semibold mb-1",children:"Using HTTP instead of HTTPS"}),e.jsx("p",{className:"text-sm",children:"Your endpoint must be served over HTTPS. HTTP endpoints will be rejected during creation or testing."})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-semibold mb-1",children:"Not verifying the signature"}),e.jsx("p",{className:"text-sm",children:"Always verify X-TagLogger-Signature to ensure the webhook came from TagLogger and wasn't forged."})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-semibold mb-1",children:"Using parsed JSON for signature verification"}),e.jsx("p",{className:"text-sm",children:"The signature is computed over the raw request body as a string, not the parsed JSON object. Use the raw body bytes for verification."})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-semibold mb-1",children:"Doing heavy work synchronously in the handler"}),e.jsx("p",{className:"text-sm",children:"Respond with a 2xx status (for example, 200 OK) immediately, then process the event asynchronously. Don't make the webhook timeout waiting for your logic."})]}),e.jsxs("div",{className:"rounded-lg border border-border bg-card p-3",children:[e.jsx("p",{className:"font-semibold mb-1",children:"Relying on webhooks as the source of truth"}),e.jsx("p",{className:"text-sm",children:"Webhooks are at-least-once and retried, but they are a notification channel, not a ledger—a subscription that stays down past the retry budget will give up. Poll GET /v1/fleet/delta regularly to reconcile and catch any missed changes."})]})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"See Also"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsx("li",{children:e.jsx(s,{to:"/docs/webhooks/overview",className:"font-semibold text-primary hover:underline",children:"Webhooks Overview"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/webhooks/events",className:"font-semibold text-primary hover:underline",children:"Event types and payloads"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/webhooks/delivery",className:"font-semibold text-primary hover:underline",children:"Delivery and signature verification"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/webhooks/testing",className:"font-semibold text-primary hover:underline",children:"Testing webhooks"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/concepts/fleet",className:"font-semibold text-primary hover:underline",children:"Fleet delta (reconciliation source)"})})]})]})]})}export{c as default};
