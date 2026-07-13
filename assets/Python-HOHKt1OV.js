import{j as e,M as s}from"./main-DatrPlxF.js";import{D as t}from"./DocPageTemplate-DuOZoun0.js";import"./x-C1WlIl0J.js";import"./chevron-right-DSkNKkCw.js";import"./button-U1MQtkqw.js";import"./index-5euGJ51m.js";import"./index-793fDfTC.js";function c(){return e.jsxs(t,{title:"Python",description:"The official TagLogger SDK for Python 3.9+",children:[e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Install"}),e.jsxs("p",{children:["The ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"taglogger-sdk"})," package is the official Python SDK for the TagLogger API. It is synchronous, fully type-hinted (ships"," ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"py.typed"}),"), has"," ",e.jsx("strong",{children:"zero runtime dependencies"})," (standard library only), and supports Python 3.9 and up. A single client instance carries no mutable per-call state, so it is safe to share across threads."]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:"pip install taglogger-sdk"})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["The distribution installs as ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"taglogger-sdk"}),"; you import it as ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"taglogger_sdk"}),"."]}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Keep your API key on a server you control. Treat"," ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"tl_live_"})," keys like passwords and load them from the environment, never from source."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Quick start"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`import os
from taglogger_sdk import TagLoggerClient

client = TagLoggerClient(api_key=os.environ["TAGLOGGER_API_KEY"])

# One page of tags (envelope: { "data": [...], "nextCursor": ... })
page = client.tags.list(limit=50)
for tag in page["data"]:
    print(tag["id"], tag.get("name"))

# Or stream every tag, paging transparently
for tag in client.tags.iterate():
    print(tag["id"])

# Latest location for one tag -> { "data": point | None, "recordingPaused": bool }
location = client.tags.location("tag-1")
print(location["data"], "recording paused:", location["recordingPaused"])`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Get an API key from your dashboard under"," ",e.jsx(s,{to:"/dashboard",className:"font-semibold text-primary hover:underline",children:"Settings → API Keys"}),". Keys are scoped; each method documents the scope it needs in the"," ",e.jsx("a",{href:"https://pypi.org/project/taglogger-sdk/",target:"_blank",rel:"noreferrer",className:"font-semibold text-primary hover:underline",children:"package README"}),"."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Configuration"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`client = TagLoggerClient(
    api_key="tl_live_...",
    base_url="https://api.taglogger.com",  # override to target a staging deployment
    auth_header="bearer",                   # "bearer" (default) or "x-api-key"
    timeout_ms=30000,
    max_retries=2,                          # GET/DELETE retried on 5xx/network; any method retried on 429
)`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Transient failures retry with randomized backoff: network errors and"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"5xx"})," on idempotent methods (",e.jsx("code",{className:"bg-muted px-1 rounded",children:"GET"}),"/",e.jsx("code",{className:"bg-muted px-1 rounded",children:"DELETE"}),"), and ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"429"})," on any method (honoring"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"Retry-After"}),"). Non-idempotent writes are never silently retried after a transport failure."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Reading tags and locations"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`# A single tag, its battery, and its current location
tag = client.tags.get("tag-1")             # read:tags
battery = client.tags.battery("tag-1")     # read:tags
point = client.tags.location("tag-1")["data"]  # read:locations

# Location history (start/end accept ISO 8601 or epoch ms)
page = client.tags.history("tag-1", order="asc", limit=500)

# Incremental, whole-fleet sync — pass last sync's high-water mark as 'since'
cursor = None
while True:
    delta = client.fleet.delta(since=last_sync, cursor=cursor)
    handle(delta["data"])
    cursor = delta["nextCursor"]
    if not cursor:
        break`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Every list endpoint has a matching"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"iterate*"})," helper that returns a"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"Paginator"})," — iterate it for items, call"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:".pages()"})," for a page at a time, or"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:".all()"})," to collect everything. Pages are fetched lazily, so a large collection never has to fit in memory."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Geofences, webhooks and share links"}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`# Create a geofence (manage:geofences)
gf = client.geofences.create({
    "name": "Yard",
    "center": {"lat": 37.77, "lng": -122.42},
    "radiusMeters": 150,
    "targetTagIds": ["tag-1", "tag-2"],
})

# Subscribe to a webhook (manage:webhooks)
webhook = client.webhooks.create({
    "url": "https://example.com/hooks/taglogger",
    "events": ["geofence.entry", "geofence.exit", "tag.offline"],
})
secret = webhook["signingSecret"]  # shown ONCE — store it now to verify deliveries

# Verify your endpoint right away
client.webhooks.send_test(webhook["id"])`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["The six event types are"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"geofence.entry"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"geofence.exit"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"geofence.dwell"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.moved"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.battery_low"})," and"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.offline"}),". See"," ",e.jsx(s,{to:"/docs/guides/webhooks-setup",className:"font-semibold text-primary hover:underline",children:"Set up Webhooks"})," ","for the full event catalog and delivery details."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Verifying incoming webhooks"}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Every delivery carries an ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"X-TagLogger-Signature"})," ","header (",e.jsx("code",{className:"bg-muted px-1 rounded",children:"sha256=<hex>"}),", an HMAC-SHA256 of the ",e.jsx("strong",{children:"raw"})," request body). Verify against the raw bytes before trusting the payload — re-serializing the JSON changes the bytes and fails the check."]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`from taglogger_sdk import construct_webhook_event, SIGNATURE_HEADER, TagLoggerError

# Flask example
@app.post("/hooks/taglogger")
def handle():
    raw = request.get_data()  # raw bytes, not request.json
    try:
        event = construct_webhook_event(raw, request.headers.get(SIGNATURE_HEADER), WEBHOOK_SECRET)
    except TagLoggerError:
        return "", 400  # invalid_signature or invalid_body
    # event is the parsed payload, e.g. {"event": "geofence.entry", ...}
    return "", 200`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:[e.jsx("code",{className:"bg-muted px-1 rounded",children:"verify_webhook_signature(raw_body, signature, secret)"})," ","is the lower-level check; it returns ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"False"})," ","(never raises) on a missing header or mismatch."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Analytics toolkit"}),e.jsxs("p",{children:["The package bundles ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"taglogger_sdk.analytics"}),", a dependency-free, pure-math toolkit that turns the location data the API returns into stops, trips, dwell intervals, clusters and map-ready shapes. Everything runs locally, in-process — nothing is sent anywhere."]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`from taglogger_sdk.analytics import (
    fixes_from_location_points,
    condition_fixes,
    detect_stops,
    detect_trips,
    to_feature_collection,
)

# Pull a tag's history, then analyze it in-process
page = client.tags.history("tag-1", order="asc", limit=500)
fixes = fixes_from_location_points(page["data"])

clean = condition_fixes(fixes, max_accuracy_meters=100)
stops = detect_stops(clean, radius_meters=50, min_duration_ms=300_000)  # 5 min
trips = detect_trips(clean, stops)

geojson = to_feature_collection(trips=trips, stops=stops)  # ready for any map`})}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["The toolkit also exposes conditioning (",e.jsx("code",{className:"bg-muted px-1 rounded",children:"sort_by_time"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"dedupe_by_timestamp"}),"), DBSCAN"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"cluster_fixes"}),", geometry primitives (",e.jsx("code",{className:"bg-muted px-1 rounded",children:"haversine_meters"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"point_in_polygon"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"douglas_peucker"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"encode_polyline"}),"), and"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"estimate_battery_days_remaining"})," for battery projection from a series of readings."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Error handling"}),e.jsxs("p",{className:"text-sm text-muted-foreground",children:["Any non-2xx response, or a transport failure, raises"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"TagLoggerError"})," with a stable"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"code"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"status"})," (0 for transport failures),"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"request_id"}),","," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"is_rate_limit"})," and"," ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"retry_after_seconds"}),"."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"See also"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside",children:[e.jsx("li",{children:e.jsx(s,{to:"/docs/sdks/javascript",className:"font-semibold text-primary hover:underline",children:"JavaScript & TypeScript SDK"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/authentication",className:"font-semibold text-primary hover:underline",children:"Authentication"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/openapi",className:"font-semibold text-primary hover:underline",children:"OpenAPI specification"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/guides/webhooks-setup",className:"font-semibold text-primary hover:underline",children:"Set up Webhooks"})})]})]})]})}export{c as default};
