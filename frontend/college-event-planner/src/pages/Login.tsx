import React, { useState } from "react";
import axios, { AxiosError } from "axios";
import { Link } from 'react-router-dom';
import '../styles/Login.css'

interface LoginData {
    email: string;
    password: string;
    user_role: string;
}

const LoginPage: React.FC = () => {
    const [formData, setFormData] = useState<LoginData>({
        email: "",
        password: "",
        user_role: "",
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError(null);

        try {
            const response = await axios.post("http://localhost:3000/auth/login", formData);

            
            const token = response.data.token;
            const user = response.data.user;

            localStorage.setItem("token", token);
            localStorage.setItem("user_id", user.id);
            localStorage.setItem("user_role", user.role); 

            alert("Login successful!");

            // Redirect based on user role (optional)
            if (formData.user_role === "Organizer") {
                window.location.href = "/events";
            } else {
                window.location.href = "/events";
            }

        } catch (err) {
            const axiosError = err as AxiosError;
            console.error("Login error:", axiosError.message);
            setError("Invalid email, password, or role.");
        }
    };

    return (
        <div className="login-page">
            

            <form onSubmit={handleSubmit} className="login-form">
            <h2 className="title">Login</h2>
                <label>Email:</label>
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="LoginInput"
                />

                <label>Password:</label>
                <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="LoginInput"
                />

                <label>User Role:</label>
                <select
                    name="user_role"
                    value={formData.user_role}
                    onChange={handleChange}
                    required
                    className="LoginInput"
                >
                    <option value="">Select Role</option>
                    <option value="Organizer">Organizer</option>
                    <option value="Participant">Participant</option>
                </select>

                {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

                <button type="submit" className="login-btn">Login</button>
                <Link to='/register'>Register Here</Link>
            </form>
        </div>
    );
};

export default LoginPage;
