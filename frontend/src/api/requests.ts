/**
 * Based on the TSE Onboarding API client implementation by benjaminJohnson2204:
 * https://github.com/TritonSE/onboarding/blob/main/frontend/src/api/requests.ts
 */

/**
 * A custom type defining which HTTP methods we will handle in this file
 */
import { getAuthHeaders } from "@/api/auth";

type Method = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL ?? ""}/api`;

/**
 * A wrapper around the built-in `fetch()` function that abstracts away some of
 * the low-level details so we can focus on the important parts of each request.
 *
 * @param method The HTTP method to use
 * @param url The URL to request
 * @param body The body of the request, or undefined if there is none
 * @param headers The headers of the request
 * @returns The Response object returned by `fetch()
 */
async function fetchRequest(
  method: Method,
  url: string,
  body: unknown,
  headers: Record<string, string>,
): Promise<Response> {
  const hasBody = body !== undefined;
  const newHeaders = { ...headers };

  if (hasBody) {
    newHeaders["Content-Type"] = "application/json";
  }

  // automatically attach auth headers
  try {
    const authHeaders = await getAuthHeaders();
    Object.assign(newHeaders, authHeaders);
  } catch (e) {
    console.warn("Failed to fetch auth headers", e);
  }

  const response = await fetch(url, {
    method,
    headers: newHeaders,
    body: hasBody ? JSON.stringify(body) : undefined,
  });

  return response;
}

/**
 * Throws an error if the given response's status code indicates an error
 * occurred, else does nothing.
 *
 * @param response A response returned by `fetch()` or `fetchRequest()`
 * @throws An error if the response was not successful (200-299) or a redirect
 * (300-399)
 */
async function assertOk(response: Response): Promise<void> {
  if (response.ok) {
    return;
  }

  let message = `${response.status.toString()} ${response.statusText}`;

  try {
    const text = await response.text();
    if (text) {
      message += `: ${text}`;
    }
  } catch {
    // skip errors
  }

  throw new Error(message);
}

/**
 * Sends a GET request to the provided API URL.
 *
 * @param url The URL to request
 * @param headers The headers of the request (optional)
 * @returns The Response object returned by `fetch()`
 */
export async function get(url: string, headers: Record<string, string> = {}): Promise<Response> {
  // GET requests do not have a body
  const response = await fetchRequest("GET", `${API_BASE_URL}${url}`, undefined, headers);
  await assertOk(response);
  return response;
}

/**
 * Sends a POST request to the provided API URL.
 *
 * @param url The URL to request
 * @param body The body of the request, or undefined if there is none
 * @param headers The headers of the request (optional)
 * @returns The Response object returned by `fetch()`
 */
export async function post(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const response = await fetchRequest("POST", `${API_BASE_URL}${url}`, body, headers);
  await assertOk(response);
  return response;
}

/**
 * Sends a PUT request to the provided API URL.
 *
 * @param url The URL to request
 * @param body The body of the request, or undefined if there is none
 * @param headers The headers of the request (optional)
 * @returns The Response object returned by `fetch()`
 */
export async function put(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const response = await fetchRequest("PUT", `${API_BASE_URL}${url}`, body, headers);
  await assertOk(response);
  return response;
}

/**
 * Sends a PATCH request to the provided API URL.
 *
 * @param url The URL to request
 * @param body The body of the request, or undefined if there is none
 * @param headers The headers of the request (optional)
 * @returns The Response object returned by `fetch()`
 */
export async function patch(
  url: string,
  body: unknown,
  headers: Record<string, string> = {},
): Promise<Response> {
  const response = await fetchRequest("PATCH", `${API_BASE_URL}${url}`, body, headers);
  await assertOk(response);
  return response;
}

/**
 * Sends a DELETE request to the provided API URL.
 *
 * @param url The URL to request
 * @param headers The headers of the request (optional)
 * @returns The Response object returned by `fetch()`
 */
export async function del(
  url: string,
  headers: Record<string, string> = {},
  body?: unknown, //  ← new
): Promise<Response> {
  const response = await fetchRequest(
    "DELETE",
    `${API_BASE_URL}${url}`,
    body, //  ← pass through
    headers,
  );
  await assertOk(response);
  return response;
}

export type APIData<T> = { success: true; data: T };
export type APIError = { success: false; error: string };
export type APIResult<T> = APIData<T> | APIError;

/**
 * Helper function for API client functions to handle errors consistently.
 * Recommended usage is in a `catch` block--see `createTask` in `src/api/tasks`
 * for an example.
 *
 * @param error An error thrown by a lower-level API function
 * @returns An `APIError` object with a message from the given error
 */
export function handleAPIError(error: unknown): APIError {
  if (error instanceof Error) {
    return { success: false, error: error.message };
  } else if (typeof error === "string") {
    return { success: false, error };
  }
  return { success: false, error: `Unknown error: ${String(error)}` };
}
