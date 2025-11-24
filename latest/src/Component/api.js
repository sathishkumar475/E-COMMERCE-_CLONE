const API_BASE = import.meta.env.VITE_API_BASE || "http://localhost:5001";

export async function createOrder(payload) {
  const res = await fetch(`${API_BASE}/api/orders`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  return res.json();
}

export async function markOrderPaid(id) {
  const res = await fetch(`${API_BASE}/api/orders/${id}/pay`, {
    method: "POST",
  });
  return res.json();
}

export async function getOrderSummary(id) {
  const res = await fetch(`${API_BASE}/api/orders/${id}/summary`);
  return res.json();
}

export async function getOrder(id) {
  const res = await fetch(`${API_BASE}/api/orders/${id}`);
  return res.json();
}
