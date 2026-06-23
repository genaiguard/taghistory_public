import{j as e,L as s}from"./main-B1POkbsH.js";import{D as t}from"./DocPageTemplate-D2LH9rrM.js";import"./x-DCkUiDfC.js";import"./chevron-right-B2a0qErz.js";import"./button-zV8p2Rxf.js";import"./index-2xWcNSTt.js";import"./index-Cb7-mCJ_.js";function d(){return e.jsxs(t,{title:"JavaScript & TypeScript",description:"Call the TagLogger API directly from Node or the browser",children:[e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"No SDK required"}),e.jsxs("p",{children:["There is no official TagLogger JavaScript SDK yet. The API is a small, conventional REST surface, so you can call it directly with the built-in"," ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"fetch"})," — no dependencies. The thin helper below is all most integrations need."]}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Keep your API key on a server you control. Treat"," ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"tl_live_"})," keys like passwords and never ship them in client-side bundles."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"A minimal client"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`const BASE_URL = 'https://api.taglogger.com/v1';
const API_KEY = process.env.TAGLOGGER_API_KEY; // tl_live_...

async function tagloggerGet(path, params) {
  const url = new URL(BASE_URL + path);
  for (const [key, value] of Object.entries(params || {})) {
    if (value != null) url.searchParams.set(key, value);
  }
  const res = await fetch(url, {
    headers: { Authorization: 'Bearer ' + API_KEY },
  });
  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body.error && body.error.code) || ('HTTP ' + res.status));
  }
  return res.json();
}`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Reading tags and locations"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`// List tags (paginated envelope: { data, nextCursor })
const { data: tags } = await tagloggerGet('/tags');

// Current location of one tag -> { data: point | null, recordingPaused }
const { data: location } = await tagloggerGet('/tags/' + tagId + '/location');

// Page through fleet changes since a timestamp
let cursor;
do {
  const page = await tagloggerGet('/fleet/delta', { since: lastSync, cursor });
  handle(page.data);
  cursor = page.nextCursor;
} while (cursor);`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Creating a webhook"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`const res = await fetch(BASE_URL + '/webhooks', {
  method: 'POST',
  headers: {
    Authorization: 'Bearer ' + API_KEY,
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    url: 'https://example.com/webhooks',
    events: ['tag.moved'],
    label: 'fleet-sync',
  }),
});
const { data: webhook } = await res.json();
// webhook.signingSecret is returned ONCE — store it now to verify deliveries.`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Tag event deliveries (",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.moved"}),", ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.battery_low"}),", ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.offline"}),") are off by default at launch. You can create the subscription now and it begins delivering live events automatically once production delivery is enabled — no change needed on your side. Test deliveries work immediately, so you can verify your endpoint right away. See ",e.jsx(s,{to:"/docs/guides/webhooks-setup",className:"font-semibold text-primary hover:underline",children:"Set up Webhooks"}),"."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"See also"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside",children:[e.jsx("li",{children:e.jsx(s,{to:"/docs/authentication",className:"font-semibold text-primary hover:underline",children:"Authentication"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/openapi",className:"font-semibold text-primary hover:underline",children:"OpenAPI specification"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/guides/webhooks-setup",className:"font-semibold text-primary hover:underline",children:"Set up Webhooks"})})]})]})]})}export{d as default};
