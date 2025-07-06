export async function getUserFromToken(): Promise<{ id: number, email: string } | null> {
  try {
    const response = await fetch("/api/me", {
      credentials: "include"
    });
    const data = await response.json();
    return data.user;
  } catch {
    return null;
  }
}