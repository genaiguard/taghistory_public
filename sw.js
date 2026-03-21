self.__tagloggerClientContexts = self.__tagloggerClientContexts || new Map();

function getClientContext(clientId) {
  if (!clientId) return null;
  return self.__tagloggerClientContexts.get(clientId) || null;
}

function setClientContext(clientId, context) {
  if (!clientId) return;
  self.__tagloggerClientContexts.set(clientId, {
    standalone: context?.standalone === true,
    visibilityState: context?.visibilityState === 'visible' ? 'visible' : 'hidden',
    lastSeenAt: Date.now(),
  });
}

function pruneClientContexts(activeClients) {
  const activeClientIds = new Set(
    (Array.isArray(activeClients) ? activeClients : [])
      .map((client) => client?.id)
      .filter(Boolean)
  );
  [...self.__tagloggerClientContexts.keys()].forEach((clientId) => {
    if (!activeClientIds.has(clientId)) {
      self.__tagloggerClientContexts.delete(clientId);
    }
  });
}

function compareWindowClients(a, b) {
  const aContext = getClientContext(a?.id);
  const bContext = getClientContext(b?.id);

  const aStandalone = aContext?.standalone === true ? 1 : 0;
  const bStandalone = bContext?.standalone === true ? 1 : 0;
  if (aStandalone !== bStandalone) return bStandalone - aStandalone;

  const aFocused = a?.focused === true ? 1 : 0;
  const bFocused = b?.focused === true ? 1 : 0;
  if (aFocused !== bFocused) return bFocused - aFocused;

  const aVisible = (aContext?.visibilityState || a?.visibilityState) === 'visible' ? 1 : 0;
  const bVisible = (bContext?.visibilityState || b?.visibilityState) === 'visible' ? 1 : 0;
  if (aVisible !== bVisible) return bVisible - aVisible;

  const aLastSeen = Number(aContext?.lastSeenAt) || 0;
  const bLastSeen = Number(bContext?.lastSeenAt) || 0;
  return bLastSeen - aLastSeen;
}

self.addEventListener('message', (event) => {
  const sourceClientId = event?.source?.id;
  const payload = event?.data || {};
  if (payload?.type !== 'taglogger-client-context' || !sourceClientId) return;
  setClientContext(sourceClientId, payload);
});

self.addEventListener('push', (event) => {
  let payload = {};

  try {
    payload = event.data ? event.data.json() : {};
  } catch {
    payload = { body: event.data ? event.data.text() : '' };
  }

  const title = typeof payload.title === 'string' && payload.title.trim()
    ? payload.title
    : 'TagLogger Alert';

  const options = {
    body: typeof payload.body === 'string' ? payload.body : 'You have a new geofence alert.',
    icon: '/web-app-manifest-192x192.png',
    badge: '/web-app-manifest-192x192.png',
    tag: typeof payload.eventId === 'string' && payload.eventId ? payload.eventId : 'geofence-alert',
    renotify: true,
    data: {
      url: typeof payload.url === 'string' && payload.url
        ? payload.url
        : '/map?tab=status',
      eventId: typeof payload.eventId === 'string' ? payload.eventId : null,
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = (event.notification && event.notification.data && event.notification.data.url)
    ? event.notification.data.url
    : '/map?tab=status';

  event.waitUntil((async () => {
    const normalizedTargetUrl = new URL(targetUrl, self.location.origin).toString();
    const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    const sameOriginClients = allClients
      .filter((client) => (
        typeof client.url === 'string' && client.url.startsWith(self.location.origin)
      ))
      .sort(compareWindowClients);
    pruneClientContexts(sameOriginClients);
    const existingAppClient = sameOriginClients[0];

    if (existingAppClient && 'focus' in existingAppClient) {
      await existingAppClient.focus();
      if ('navigate' in existingAppClient) {
        await existingAppClient.navigate(normalizedTargetUrl);
        return;
      }
    }

    if (self.clients.openWindow) {
      await self.clients.openWindow(normalizedTargetUrl);
    }
  })());
});
