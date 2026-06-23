import{j as e,L as s}from"./main-B1POkbsH.js";import{D as o}from"./DocPageTemplate-D2LH9rrM.js";import"./x-DCkUiDfC.js";import"./chevron-right-B2a0qErz.js";import"./button-zV8p2Rxf.js";import"./index-2xWcNSTt.js";import"./index-Cb7-mCJ_.js";function c(){return e.jsxs(o,{title:"Python",description:"Call the TagLogger API directly from Python",children:[e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"No SDK required"}),e.jsxs("p",{children:["There is no official TagLogger Python SDK yet. The API is a small, conventional REST surface, so you can call it directly with"," ",e.jsx("a",{href:"https://requests.readthedocs.io",target:"_blank",rel:"noreferrer",className:"font-semibold text-primary hover:underline",children:"requests"})," (or the standard library). The thin helper below is all most integrations need."]}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Keep your API key on a server you control. Treat"," ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"tl_live_"})," keys like passwords and load them from the environment, never from source."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"A minimal client"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`import os
import requests

BASE_URL = "https://api.taglogger.com/v1"
API_KEY = os.environ["TAGLOGGER_API_KEY"]  # tl_live_...

session = requests.Session()
session.headers["Authorization"] = f"Bearer {API_KEY}"

def get(path, **params):
    clean = {k: v for k, v in params.items() if v is not None}
    resp = session.get(BASE_URL + path, params=clean, timeout=30)
    resp.raise_for_status()
    return resp.json()`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Reading tags and locations"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`# List tags (paginated envelope: { "data": [...], "nextCursor": ... })
tags = get("/tags")["data"]

# Current location of one tag -> { "data": point | None, "recordingPaused": bool }
location = get(f"/tags/{tag_id}/location")["data"]

# Page through fleet changes since a timestamp
cursor = None
while True:
    page = get("/fleet/delta", since=last_sync, cursor=cursor)
    handle(page["data"])
    cursor = page["nextCursor"]
    if not cursor:
        break`})})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Creating a webhook"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`resp = session.post(
    BASE_URL + "/webhooks",
    json={
        "url": "https://example.com/webhooks",
        "events": ["tag.moved"],
        "label": "fleet-sync",
    },
    timeout=30,
)
resp.raise_for_status()
webhook = resp.json()["data"]
# webhook["signingSecret"] is returned ONCE — store it now to verify deliveries.`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Tag event deliveries (",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.moved"}),", ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.battery_low"}),", ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.offline"}),") are off by default at launch. You can create the subscription now and it begins delivering live events automatically once production delivery is enabled — no change needed on your side. Test deliveries work immediately, so you can verify your endpoint right away. See ",e.jsx(s,{to:"/docs/guides/webhooks-setup",className:"font-semibold text-primary hover:underline",children:"Set up Webhooks"}),"."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"See also"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside",children:[e.jsx("li",{children:e.jsx(s,{to:"/docs/authentication",className:"font-semibold text-primary hover:underline",children:"Authentication"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/openapi",className:"font-semibold text-primary hover:underline",children:"OpenAPI specification"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/guides/webhooks-setup",className:"font-semibold text-primary hover:underline",children:"Set up Webhooks"})})]})]})]})}export{c as default};
