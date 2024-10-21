export declare function cacheFirstFetch(request: Request): Promise<Response>;
export declare function networkFirstFetch(request: Request): Promise<Response>;
/**
 * For offline mode to work we need to cache all required assets.
 *
 * These assets are listed in the `/assets-required-for-offline-mode.json`
 * file and contain JavaScript, CSS, and other assets required to load the
 * site without making any network requests.
 */
export declare function cacheOfflineModeAssetsForCurrentRelease(): Promise<any>;
/**
 * Remove outdated files from the cache.
 *
 * We cache data based on `buildVersion` which is updated whenever Playground
 * is built. So when a new version of Playground is deployed, the service
 * worker will remove the old cache and cache the new assets.
 *
 * If your build version doesn't change while developing locally check
 * `buildVersionPlugin` for more details on how it's generated.
 */
export declare function purgeEverythingFromPreviousRelease(): Promise<boolean[]>;
/**
 * Answers whether a given URL has a response in the offline mode cache.
 * Ignores the search part of the URL by default.
 */
export declare function hasCachedResponse(url: string, queryOptions?: CacheQueryOptions): Promise<boolean>;
export declare function shouldCacheUrl(url: URL): boolean;
export declare function isCurrentServiceWorkerActive(): boolean;
