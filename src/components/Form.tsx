"use client";

import { useState } from "react";

type FormData = {
    name: string;
    email: string;
    phone: string;
    problemType: string;
};

export default function IntakeForm() {
    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        problemType: "",
    });

    const [loading, setLoading] = useState(false);

    const cases = [
        { title: "Retraso en la entrega" },
        { title: "Incumplimientos de la inmobiliaria" },
        { title: "Cambio unilateral de condiciones" },
        { title: "Dificultades económicas" },
        { title: "Rechazo del crédito" },
    ];

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await fetch("/api/clients", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(form),
            });

            const data = await response.json();

            if (!response.ok) {
                console.error(data.error || "Failed to save");
                alert("Something went wrong. Please try again.");
                setLoading(false);
                return;
            }

            // Build Calendly URL
            const calendlyUrl = new URL("https://calendly.com/enidelmale/asesoria-rtc");
            calendlyUrl.searchParams.append("name", form.name);
            calendlyUrl.searchParams.append("email", form.email);
            calendlyUrl.searchParams.append(
                "message",
                `Cliente ID: ${data.client.id}`
            );

            window.location.href = calendlyUrl.toString();
        } catch (error) {
            console.error("Network error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl space-y-5">
            <h1 className="text-3xl font-semibold text-center text-black">
                Obtén asesoría gratuita completando el formulario.
            </h1>

            <input
                name="name"
                required
                placeholder="Nombre y Apellido*"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
            />

            <input
                name="phone"
                required
                placeholder="Teléfono*"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
            />

            <input
                type="email"
                name="email"
                required
                placeholder="Correo*"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
            />

            <select
                name="problemType"
                required
                value={form.problemType}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-white"
            >
                <option value="">¿Qué tipo de problema tienes?*</option>
                {cases.map((c) => (
                    <option key={c.title} value={c.title}>
                        {c.title}
                    </option>
                ))}
            </select>

            <button
                type="submit"
                disabled={loading}
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-4 rounded-xl transition"
            >
                {loading ? "Enviando..." : "QUIERO ASESORÍA LEGAL"}
            </button>
        </form>
    );
}