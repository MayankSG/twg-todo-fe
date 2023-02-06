import { redirect } from "react-router-dom";

export function getAuthToken() {
  const token = localStorage.getItem("token");
  return token;
}

export function tokenLoader() {
  return getAuthToken();
}

export function checkAuthLoader({ request, params }) {
  const token = getAuthToken();
  const url = new URL(request.url);
  if (!token) return redirect("/login");
  else return "";
}
