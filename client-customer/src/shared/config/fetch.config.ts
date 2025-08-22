// utils/customFetch.ts
import { HttpError, NetworkError, JsonParseError } from '../lib/error';

const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

type FetchOptions = RequestInit & {
  auth?: boolean;
};

export async function customFetch<T = unknown>(
  endpoint: string,
  options: FetchOptions = {},
  token: string | null = null
): Promise<T> {
  const { headers, ...rest } = options;

  let response: Response;
  try {
    response = await fetch(`${BASE_URL}${endpoint}`, {
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
        ...headers,
      },
      ...rest,
    });
  } catch (err) {
    throw new NetworkError('Network request failed', err);
  }

  if (!response.ok) {
    const contentType = response.headers.get('content-type') || '';
    let errorBody: any;
    if (contentType.includes('application/json')) {
      errorBody = await response.json().catch(() => undefined);
    } else {
      errorBody = await response.text().catch(() => undefined);
    }
    const headersObj: Record<string, string> = {};
    response.headers.forEach((value, key) => {
      headersObj[key] = value;
    });
    throw new HttpError({
      message:
        (errorBody && (errorBody.message || errorBody.error)) ||
        `Request failed with status code ${response.status}`,
      status: response.status,
      statusText: response.statusText,
      data: errorBody,
      headers: headersObj,
    });
  }

  const contentType = response.headers.get('content-type');
  if (!contentType?.includes('application/json') || response.status === 204) {
    return {} as T;
  }

  const text = await response.text();
  if (!text) {
    return {} as T;
  }

  try {
    return JSON.parse(text);
  } catch {
    throw new JsonParseError('Failed to parse JSON response', text);
  }
}
