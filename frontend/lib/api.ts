const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api";

export async function apiFetch(path: string, options: RequestInit = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(options.headers || {}),
    },
  });

  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || "Erro ao comunicar com a API");
  }

  return data;
}