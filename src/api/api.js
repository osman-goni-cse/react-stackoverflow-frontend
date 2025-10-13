// Base API URL (you can also load this from .env later)
const BASE_URL = "http://localhost:5192/api";

// Generic helper for GET requests
export async function getData(endpoint) {
  const res = await fetch(`${BASE_URL}${endpoint}`);
  if (!res.ok) {
    throw new Error(`Failed to fetch ${endpoint}: ${res.statusText}`);
  }
  return res.json();
}

// Generic helper for POST requests (optional)
export async function postData(endpoint, data) {
  const res = await fetch(`${BASE_URL}${endpoint}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (!res.ok) {
    throw new Error(`Failed to post ${endpoint}: ${res.statusText}`);
  }
  return res.json();
}

// Predefined fetchers
export const fetchTags = () => getData("/tags");
export const fetchPosts = () => getData("/posts");
