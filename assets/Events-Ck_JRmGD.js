import{j as e,M as s}from"./main-CwhuHScf.js";import{D as t}from"./DocPageTemplate-CooOiQL6.js";import"./x-semnpAxa.js";import"./chevron-right-VHgayRNf.js";import"./button-YF3lnFLR.js";import"./index-D-Ef3lTe.js";import"./index-DncMHW4m.js";function c(){return e.jsxs(t,{title:"Webhook Events",description:"Event types and payload structures",children:[e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Envelope"}),e.jsx("p",{children:"All webhook events are delivered as HTTP POST requests with a JSON body. The envelope contains metadata about the event plus an event-specific data payload."}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`{
  "id": "9f8c2a1b7e4d6c0a3f5b8e2d1c4a7b9e",
  "event": "tag.moved",
  "occurredAt": "2024-06-19T13:45:23Z",
  "test": false,
  "tag": {
    "id": "aB3xK9Qm1Zr7",
    "name": "My AirTag",
    "hardwareId": "00000000AABBCCDD"
  },
  "data": { ... event-specific ... }
}`})}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"id:"})," Unique delivery ID (for deduplication). The delivery id is an opaque hex token.",e.jsx("br",{}),e.jsx("strong",{children:"event:"}),' Event type (e.g., "tag.moved").',e.jsx("br",{}),e.jsx("strong",{children:"occurredAt:"})," ISO 8601 timestamp for when TagLogger detected and emitted the event (detection time, which can lag the underlying change). For the physical signal, read ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"data.lastSeenAt"})," (offline) or ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"data.to"})," (moved).",e.jsx("br",{}),e.jsx("strong",{children:"test:"})," Boolean. True if this is a test delivery (sent via the test button), false for live events.",e.jsx("br",{}),e.jsx("strong",{children:"tag:"})," Tag metadata (id, name/label, hardwareId). ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"tag.name"})," may be ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"null"})," if the tag has no custom name.",e.jsx("br",{}),e.jsx("strong",{children:"data:"})," Event-specific fields (varies by event type)."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Event Types"}),e.jsxs("div",{className:"space-y-6",children:[e.jsxs("section",{className:"space-y-3",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"tag.moved"}),e.jsxs("p",{children:["Sent when a tag's location is updated. To suppress noise from minor location jitter, this fires only once a tag has moved at least 150 meters from the position reported in its previous ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"tag.moved"})," event."]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`{
  "id": "9f8c2a1b7e4d6c0a3f5b8e2d1c4a7b9e",
  "event": "tag.moved",
  "occurredAt": "2024-06-19T13:45:23Z",
  "test": false,
  "tag": { "id": "aB3xK9Qm1Zr7", "name": "My Tag", "hardwareId": "..." },
  "data": {
    "from": { "lat": 40.7128, "lng": -74.0060 },
    "to": { "lat": 40.7580, "lng": -73.9855 },
    "distanceMeters": 5200
  }
}`})}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"from:"})," Previous coordinates (lat, lng).",e.jsx("br",{}),e.jsx("strong",{children:"to:"})," New coordinates (lat, lng).",e.jsx("br",{}),e.jsx("strong",{children:"distanceMeters:"})," Straight-line distance between the ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"from"})," and ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"to"})," coordinates (not cumulative path length)."]})]}),e.jsxs("section",{className:"space-y-3",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"tag.battery_low"}),e.jsx("p",{children:"Sent when an AirTag's battery level is low and the device may need a replacement."}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`{
  "id": "9f8c2a1b7e4d6c0a3f5b8e2d1c4a7b9e",
  "event": "tag.battery_low",
  "occurredAt": "2024-06-19T13:45:23Z",
  "test": false,
  "tag": { "id": "aB3xK9Qm1Zr7", "name": "My Tag", "hardwareId": "..." },
  "data": {
    "status": 3,
    "critical": false
  }
}`})}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"status:"})," An integer (3 = low, 4 = critical). Use the boolean ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"critical"})," field for a simple check.",e.jsx("br",{}),e.jsx("strong",{children:"critical:"})," Boolean. True if the battery is critically low (device may stop reporting soon)."]})]}),e.jsxs("section",{className:"space-y-3",children:[e.jsx("h3",{className:"text-lg font-semibold",children:"tag.offline"}),e.jsx("p",{children:"Sent when a tag stops reporting its location for an extended period (roughly six hours of silence). This usually means the tag's battery has died, or the tag is somewhere it cannot currently be located."}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`{
  "id": "9f8c2a1b7e4d6c0a3f5b8e2d1c4a7b9e",
  "event": "tag.offline",
  "occurredAt": "2024-06-19T13:45:23Z",
  "test": false,
  "tag": { "id": "aB3xK9Qm1Zr7", "name": "My Tag", "hardwareId": "..." },
  "data": {
    "lastSeenAt": "2024-06-19T07:30:00Z",
    "staleSeconds": 22523
  }
}`})}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"lastSeenAt:"})," ISO 8601 timestamp of the last location report.",e.jsx("br",{}),e.jsx("strong",{children:"staleSeconds:"})," Seconds elapsed since the last location was seen."]})]})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"When Events Are Not Emitted"}),e.jsxs("p",{className:"text-sm",children:["While a tag's recording is paused (",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"recordingPaused: true"}),"), no ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"tag.*"})," events are emitted for that tag — location updates, battery checks, and offline detection are all suspended until recording resumes. See ",e.jsx(s,{to:"/docs/concepts/locations",className:"font-semibold text-primary hover:underline",children:"Recording Pause"})," for details."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Geofence Events"}),e.jsxs("p",{children:["Geofence events fire when a monitored tag crosses one of your geofence boundaries. They use the same envelope as tag events, with the geofence and the crossing location carried in ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"data"}),":"]}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsxs("li",{children:[e.jsx("strong",{children:"geofence.entry"})," — A tag moved from outside to inside a geofence."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"geofence.exit"})," — A tag moved from inside to outside a geofence."]}),e.jsxs("li",{children:[e.jsx("strong",{children:"geofence.dwell"}),' — A tag has stayed outside a geofence past its configured dwell threshold (a "still outside" reminder).']})]}),e.jsx("div",{className:"rounded-lg border border-border bg-muted/30 p-4",children:e.jsx("pre",{className:"overflow-x-auto font-mono text-sm",children:`{
  "id": "1c4a7b9e0d6c3f5b8e2d9f8c2a1b7e4d",
  "event": "geofence.entry",
  "occurredAt": "2024-06-19T13:45:23Z",
  "test": false,
  "tag": {
    "id": "aB3xK9Qm1Zr7",
    "name": "My AirTag",
    "hardwareId": "00000000AABBCCDD"
  },
  "data": {
    "geofence": { "id": "Gf12Xy34Zq56", "name": "Warehouse" },
    "location": { "lat": 37.7749, "lng": -122.4194 }
  }
}`})}),e.jsxs("p",{className:"text-sm",children:[e.jsx("strong",{children:"data.geofence:"})," The geofence's id and name.",e.jsx("br",{}),e.jsx("strong",{children:"data.location:"})," The tag position at the crossing, or ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"null"})," if unavailable.",e.jsx("br",{}),e.jsx("strong",{children:"data.dwellMinutes:"})," Present only on ",e.jsx("code",{className:"bg-muted px-1 rounded",children:"geofence.dwell"})," — the configured dwell threshold in minutes."]}),e.jsx("p",{className:"text-sm",children:"Geofence email alerts configured in the geofence's own settings continue to fire independently of webhook delivery."})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"Delivery Activation"}),e.jsxs("p",{className:"text-sm",children:["Webhook delivery for ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"tag.*"})," and ",e.jsx("code",{className:"bg-muted px-2 py-1 rounded",children:"geofence.*"})," events is independently operator-gated and off by default at launch. A subscription you create begins receiving deliveries automatically once delivery is enabled for production — no changes are needed on your side, and existing subscriptions activate on their own. Subscribe to the event types you want now; you do not have to wait for activation to build and test your integration (use the ",e.jsx(s,{to:"/docs/webhooks/testing",className:"font-semibold text-primary hover:underline",children:"test endpoint"})," to exercise your handler end to end)."]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsx("h2",{className:"text-2xl font-bold",children:"See Also"}),e.jsxs("ul",{className:"space-y-2 list-disc list-inside text-sm",children:[e.jsx("li",{children:e.jsx(s,{to:"/docs/webhooks/delivery",className:"font-semibold text-primary hover:underline",children:"Delivery format and signature verification"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/webhooks/testing",className:"font-semibold text-primary hover:underline",children:"Testing webhooks"})}),e.jsx("li",{children:e.jsx(s,{to:"/docs/guides/webhooks-setup",className:"font-semibold text-primary hover:underline",children:"Webhooks setup guide"})})]})]})]})}export{c as default};
