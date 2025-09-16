import  { useEffect, useState } from "react";
import { usersCurrentUserUsersMeGet, type UserRead } from "../api/generated";

export function UserProfile() {
    const [user, setUser] = useState<UserRead | null>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await usersCurrentUserUsersMeGet({baseURL: "http://localhost:8000", headers:{
                    "Content-Type": "application/json",
                        "Authorization": "Bearer " + localStorage.getItem("access_token")
                    }});
                setUser(response.data);
            } catch (err: any) {
                setError(err.response?.data?.detail || "Error fetching user");
            }
        };
        fetchUser();
    }, []);

    if (error) return <p style={{ color: "red" }}>{error}</p>;
    if (!user) return <p>Loading...</p>;

    return (
        <div>
            <p>Email: {user.email}</p>
            <p>Active: {user.is_active ? "Yes" : "No"}</p>
            <p>Superuser: {user.is_superuser ? "Yes" : "No"}</p>
            <p>Verified: {user.is_verified ? "Yes" : "No"}</p>
        </div>
    );
}
