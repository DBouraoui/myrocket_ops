import React, { useState } from "react";
import { registerRegisterAuthRegisterPost, type UserCreate } from "../api/generated";

export function RegisterForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userId, setUserId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload: UserCreate = {
      email,
      password,
    };

    try {
      const response = await registerRegisterAuthRegisterPost(payload, {baseURL:"http://localhost:8000"});
      console.log("User registered:", response.data);
      setUserId(response.data.id);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.response?.data?.detail || "Error during registration");
    }
  };

  return (
    <div>
      <h2 className="text-red-500">Register User</h2>
      <form onSubmit={handleRegister}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Register</button>
      </form>

      {userId && <p>Registered user ID: {userId}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
