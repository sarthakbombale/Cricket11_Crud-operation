// src/utils/api.js

export const API_BASE =
  "https://68dcce057cd1948060ab5b93.mockapi.io/student/students";

export async function fetchJson(url, opts = {}) {
  const res = await fetch(url, {
    ...opts,
    headers: { "Content-Type": "application/json" },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status}`);
  return res.json();
}
