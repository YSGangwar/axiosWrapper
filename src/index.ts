import createAxiosInstance from "./AxiosInstance";

async function getCacheData(cacheName, endpoint) {
  const cache = await caches.open(cacheName);
  const response = cache.match(endpoint);
  console.log(response,"caches response");
//   if (response) {
//     const cachedData = await response.json();
//     return cachedData;
//   }
  return null;
}

async function putCacheData(cacheName, endpoint, data) {
  const cache = await caches.open(cacheName);
  const response = new Response(JSON.stringify(data), {
    headers: { "Content-Type": "application/json" },
  });
  await cache.put(endpoint, response);
}

export async function fantasticaxioswraper(
  BASE_URL: string,
  endpoint: string,
  methodType: string,
  payload?: any,
  cacheName = "api-cache",
  useCache = true
) {
  const AxiosInstance = createAxiosInstance(BASE_URL);
  try {
    if (useCache) {
      const cachedData = await getCacheData(cacheName, endpoint);
      if (cachedData) {
        console.log("Using cached data for:", endpoint);
        return cachedData;
      }
    }

    let response;
    switch (methodType) {
      case "POST":
        response = await AxiosInstance.post(`${endpoint}`, payload);
        break;
      case "GET":
        response = await AxiosInstance.get(`${endpoint}`);
        break;
      case "PUT":
        response = await AxiosInstance.put(`${endpoint}`, payload);
        break;
      default:
        throw new Error(`Unsupported method type: ${methodType}`);
    }
    if (useCache && response && response.data) {
      await putCacheData(cacheName, endpoint, response.data);
    }
    return response.data;
  } catch (error) {
    console.error("API call failed:", endpoint, methodType, payload);
    throw error;
  }
}
