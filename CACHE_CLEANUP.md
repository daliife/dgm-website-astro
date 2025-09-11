# Cache Cleanup Instructions

## Problema

Els errors que estàs veient són deguts al cache del navegador que està intentant carregar recursos que ja no existeixen (Service Worker i manifest.json).

## Solució

### 1. Netejar Cache del Navegador

#### Chrome/Edge:

1. Obre les DevTools (F12)
2. Clic dret al botó de refresh
3. Selecciona "Empty Cache and Hard Reload"

#### Firefox:

1. Obre les DevTools (F12)
2. Clic dret al botó de refresh
3. Selecciona "Empty Cache and Hard Reload"

### 2. Netejar Service Workers

1. Obre les DevTools (F12)
2. Ves a la pestanya "Application"
3. A la secció "Service Workers", clica "Unregister" per tots els workers
4. Refresca la pàgina

### 3. Script Automàtic

Executa aquest script a la consola del navegador:

```javascript
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
sessionStorage.clear();

console.log("Cache netejat completament. Refresca la pàgina.");
```

### 4. Verificació

Després de netejar el cache:

1. Refresca la pàgina (Ctrl+F5 o Cmd+Shift+R)
2. Verifica que no hi ha errors a la consola
3. El web hauria de carregar sense errors

## Prevenció

Aquests errors no tornaran a aparèixer ja que:

- No hi ha cap Service Worker registrat al codi
- No hi ha cap manifest.json al projecte
- El build està net de qualsevol referència a aquests recursos
