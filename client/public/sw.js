self.addEventListener("push", (event) => {
  if (event.data) {
    const data = event.data.json();
    const title = data.title;
    const options = {
      body: data.body,
      icon: data.icon || "/icon.png",
      badge: data.badge || "/icon.png",
      vibrate: [100, 50, 100],
      data: {
        dateOfArrival: Date.now(),
        primaryKey: data.primaryKey,
      },
    };
    event.waitUntill(self.registration.showNotification(title, options));
  }
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntill(self.clients.openWindow("https://yunho.dev/lyrics"));
});
