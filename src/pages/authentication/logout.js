import { redirect } from "react-router-dom";

export function logout() {
  localStorage.removeItem("token");
  return redirect("/login");
}
