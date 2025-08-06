const API = process.env.REACT_APP_API_URL;

export const getTasks = async (token) => {
  try {
    const res = await fetch(`${API}/api/tasks`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!res.ok) {
      throw new Error("Failed to fetch tasks");
    }

    const data = await res.json();
    return data;
  } catch (err) {
    console.error("Error fetching tasks:", err.message);
    return [];
  }
};