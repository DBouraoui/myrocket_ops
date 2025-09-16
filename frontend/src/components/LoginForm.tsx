import React, { useState } from "react";
import { authJwtLoginAuthJwtLoginPost, type BodyAuthJwtLoginAuthJwtLoginPost } from "../api/generated";

export function LoginForm() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [token, setToken] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();

        const payload: BodyAuthJwtLoginAuthJwtLoginPost = {
            username,
            password,
            grant_type: "password",
        };

        try {
            const response = await authJwtLoginAuthJwtLoginPost(payload, {baseURL: "http://localhost:8000"});
            setToken(response.data.access_token);
            localStorage.setItem("access_token", response.data.access_token);
            setError(null);
        } catch (err: any) {
            setError(err.response?.data?.detail || "Login error");
        }
    };

    return (
        <form onSubmit={handleLogin}>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} />
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
            <button type="submit">Login</button>
            {token && <p>JWT Token: {token}</p>}
            {error && <p style={{ color: "red" }}>{error}</p>}
        </form>
    );
}
