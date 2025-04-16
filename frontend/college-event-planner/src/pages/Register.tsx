import React, { useState } from "react";
import "../styles/Register.css";
import axios, { AxiosError } from "axios";

interface FormData {
    name: string;
    year_of_study: number | "";
    email: string;
    phone: string;
    password: string;
    confirmPassword: string;
    user_role: string;
    termsAccepted: boolean;
}

const RegisterPage: React.FC = () => {
    const [formData, setFormData] = useState<FormData>({
        name: "",
        year_of_study: "",
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
        user_role: "",
        termsAccepted: false,
    });

    const [error, setError] = useState<string | null>(null);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === "checkbox" ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
    
        setError(null); // reset error
    
        if (formData.password !== formData.confirmPassword) {
            setError("Passwords do not match!");
            return;
        }
    
        const dataToSend = {
            name: formData.name,
            email: formData.email,
            phone: formData.phone,
            year_of_study: formData.year_of_study,
            user_password: formData.password,
            user_role: formData.user_role,
        };
    
        try {
            const response = await axios.post("http://localhost:3000/user/register", dataToSend);
            alert("User registered successfully!");
    
            // Reset form after successful registration
            setFormData({
                name: "",
                year_of_study: "",
                email: "",
                phone: "",
                password: "",
                confirmPassword: "",
                user_role: "",
                termsAccepted: false,
            });
        } catch (err: any) {
            const axiosError = err as AxiosError;
    
            if (axiosError.response?.status === 409) {
                setError("Email already registered. Please use a different email.");
            } else if (axiosError.response?.status === 400) {
                setError("Missing or invalid fields.");
            } else {
                setError("Something went wrong. Please try again.");
            }
    
            console.error("Registration error:", axiosError.response?.data || axiosError.message);
        }
    
    };

    return (
        <div className="register-page">
            <h2 className="title">Register</h2>

            <section className="register-forms">
                <div className="register-content">
                    <div className="register-box">
                        <form onSubmit={handleSubmit}>
                            <div className="form-container">
                                <label className="InputLabel">Name:</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    required
                                    className="RegisterInput"
                                />

                                <label className="InputLabel">Year of Study:</label>
                                <input
                                    type="number"
                                    name="year_of_study"
                                    value={formData.year_of_study}
                                    onChange={handleChange}
                                    required
                                    className="RegisterInput"
                                />

                                <label className="InputLabel">Email:</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    required
                                    className="RegisterInput"
                                />

                                <label className="InputLabel">Phone Number:</label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    pattern="[0-9]{10}"
                                    maxLength={10}
                                    required
                                    className="RegisterInput"
                                />

                                <label className="InputLabel">User Role:</label>
                                <select
                                    name="user_role"
                                    value={formData.user_role}
                                    onChange={handleChange}
                                    required
                                    className="RegisterInput"
                                >
                                    <option value="">Select Role</option>
                                    <option value="Organizer">Organizer</option>
                                    <option value="Participant">Participant</option>
                                </select>

                                <label className="InputLabel">Password:</label>
                                <input
                                    type="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                    className="RegisterInput"
                                />

                                <label className="InputLabel">Confirm Password:</label>
                                <input
                                    type="password"
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    required
                                    className="RegisterInput"
                                />
                            </div>

                            <div className="terms">
                                <input
                                    type="checkbox"
                                    name="termsAccepted"
                                    checked={formData.termsAccepted}
                                    onChange={handleChange}
                                    required
                                />
                                <span className="accept">Accept the Terms and Privacy Policies</span>
                            </div>

                            {error && <p style={{ color: "red", textAlign: "center" }}>{error}</p>}

                            <button type="submit" className="register-btn">Register</button>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default RegisterPage;
