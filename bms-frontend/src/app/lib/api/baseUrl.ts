function trimTrailingSlash(value: string) {
  return value.endsWith("/") ? value.slice(0, -1) : value;
}

export function getApiBaseUrl() {
  const publicApiBaseUrl = process.env.NEXT_PUBLIC_API_URL;
  const serverApiBaseUrl = process.env.API_BASE_URL || publicApiBaseUrl;
  const fallbackApiBaseUrl = "http://localhost:3000";

  if (typeof window === "undefined") {
    return trimTrailingSlash(serverApiBaseUrl || fallbackApiBaseUrl);
  }

  return trimTrailingSlash(
    publicApiBaseUrl || serverApiBaseUrl || fallbackApiBaseUrl
  );
}
