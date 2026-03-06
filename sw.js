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
        : '/dashboard?section=activity',
      eventId: typeof payload.eventId === 'string' ? payload.eventId : null,
    },
  };

  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();

  const targetUrl = (event.notification && event.notification.data && event.notification.data.url)
    ? event.notification.data.url
    : '/dashboard?section=activity';

  event.waitUntil((async () => {
    const allClients = await self.clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const client of allClients) {
      if (client.url && 'focus' in client) {
        if (client.url.includes('/dashboard')) {
          await client.focus();
          if ('navigate' in client) {
            await client.navigate(targetUrl);
          }
          return;
        }
      }
    }

    if (self.clients.openWindow) {
      await self.clients.openWindow(targetUrl);
    }
  })());
});
