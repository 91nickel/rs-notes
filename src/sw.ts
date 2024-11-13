// /// <reference lib="webworker" />
// importScripts('https://cdn.jsdelivr.net/npm/workbox-cdn/workbox/workbox-sw.js')
// // import { precacheAndRoute } from 'workbox-precaching'
//
// declare const self: Window & ServiceWorkerGlobalScope
//
// workbox.precaching.precacheAndRoute(self.__WB_MANIFEST)
//
// const staticCacheName = 'static-v1'
// const dynamicCacheName = 'dynamic-v1'
// const ASSETS = [
//     '/',
//     '/index.html',
//     '/@vite/client',
//     '/src/main.tsx',
//     '/@react-refresh',
//     '/@vite-plugin-pwa/pwa-entry-point-loaded',
//     '/manifest.webmanifest',
//     '/favicon.ico',
//
//     // '/pages/offline.html',
//     // '/css/styles.css',
//     // '/css/materialize.min.css',
//     // '/js/app.js',
//     // '/js/ui.js',
//     // '/js/materialize.min.js',
//     // 'https://fonts.googleapis.com/icon?family=Material+Icons',
//     // 'https://fonts.gstatic.com/s/materialicons/v141/flUhRq6tzZclQEJ-Vdg-IuiaDsNc.woff2'
// ]
//
// self.addEventListener('install', async event => {
//     console.log('####: Service Worker has been installed', event)
//     const cache = await caches.open(staticCacheName)
//     await cache.addAll(ASSETS)
// })
//
// self.addEventListener('activate', async event => {
//     console.log('####: Service Worker has been activated', event)
//     const cachesKeysArr = await caches.keys()
//     console.log('####: Caches keys', cachesKeysArr)
//     await Promise.all(
//         cachesKeysArr
//             .filter(key => key !== staticCacheName && key !== dynamicCacheName)
//             .map(key => caches.delete(key)),
//     )
// })
//
// self.addEventListener('fetch', async (event: FetchEvent) => {
//     try {
//         const response = await cacheFirst(event.request)
//         if (response) {
//             event.respondWith(response)
//         }
//     } catch (e) {
//         console.log('fetch', event)
//         console.error(e)
//     }
//     // // event.respondWith(
//     // //     caches.match(event.request).then(cacheRes => {
//     // //         return cacheRes || fetch(event.request).then(response => {
//     // //             return caches.open(dynamicCacheName).then(cache => {
//     // //                 if (event.request.url.includes('http://') || event.request.url.includes('https://'))
//     // //                     cache.put(event.request.url, response.clone())
//     // //                 return response
//     // //             })
//     // //         })
//     // //     })
//     // // )
// })
//
// async function cacheFirst(request: Request) {
//     const cached = await caches.match(request)
//     // console.log('####: cached', cached)
//     try {
//         return cached
//             ?? await fetch(request).then((response: Response) => {
//                 console.log(response)
//                 return networkFirst(request)
//             })
//     } catch (e) {
//         console.log('####: cacheFirst.e', e)
//         return networkFirst(request)
//     }
// }
//
// async function networkFirst(request: Request) {
//     const cache = await caches.open(dynamicCacheName)
//     try {
//         const response = await fetch(request)
//         // Это чтобы не вызывать ошибки когда хромовские расширения стучатся по своим протоколам
//         if (request.url.includes('http://') || request.url.includes('https://'))
//             await cache.put(request, response.clone())
//         return response
//     } catch (e) {
//         console.log('####: networkFirst.e', e)
//         return await cache.match(request)
//     }
// }
