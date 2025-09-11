// Script per netejar el cache del navegador
// Aquest script s'ha d'executar a la consola del navegador

console.log("Netejant cache del navegador...");

// Netejar Service Workers
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.getRegistrations().then(function (registrations) {
    for (let registration of registrations) {
      registration.unregister();
      console.log("Service Worker desregistrat:", registration.scope);
    }
  });
}

// Netejar cache
if ("caches" in window) {
  caches.keys().then(function (names) {
    for (let name of names) {
      caches.delete(name);
      console.log("Cache eliminat:", name);
    }
  });
}

// Netejar localStorage
localStorage.clear();
console.log("localStorage netejat");

// Netejar sessionStorage
sessionStorage.clear();
console.log("sessionStorage netejat");

console.log("Cache netejat completament. Refresca la pàgina.");
