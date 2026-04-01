"use client";

import { useState } from "react";

type FormData = {
    name: string;
    email: string;
    phone: string;
    problemType: string;
    monetaryRange: string;
    caseDetails: string;
};

export default function IntakeForm() {
    const [form, setForm] = useState<FormData>({
        name: "",
        email: "",
        phone: "",
        problemType: "",
        monetaryRange: "",
        caseDetails: "",
    });

    const cases = [
        { title: "Víctima de Fraude Bancario" },
        { title: "Pie Inmobiliario Retenido" },
        { title: "Vehículo Nuevo con Fallas" },
        { title: "Robo en Recinto Privado" },
        { title: "Conflictos PYME" },
    ];

    const [loading, setLoading] = useState(false);

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;

        setForm({
            ...form,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);

        try {
            await fetch("/api/clients", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(form),
            });

            window.location.href = "https://calendly.com/enidelmale/30min";
        } catch {
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form id="form"
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl space-y-5"
        >
            {/* Title */}
            <h1 className="text-3xl font-semibold text-center text-blue-900">
                Completa el formulario y cuéntanos más de tu caso.
            </h1>

            {/* Name */}
            <input
                id ="name"
                name="name"
                required
                placeholder="Nombre y Apellido*"
                value={form.name}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
            />

            {/* Phone */}
            <input
                name="phone"
                required
                placeholder="Teléfono*"
                value={form.phone}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
            />

            {/* Email */}
            <input
                type="email"
                name="email"
                required
                placeholder="Correo*"
                value={form.email}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
            />

            {/* Problem Type */}
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

                <option value="Otro">Otro</option>
            </select>

            {/* Amount Range */}
            <select
                name="monetaryRange"
                required
                value={form.monetaryRange}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg bg-white"
            >
                <option value="">
                    ¿De cuánto es el rango monetario que perdiste producto a ese problema?*
                </option>
                <option value="100k-500k">Menos de $2.000.000</option>
                <option value="500k-1m">Entre $2.000.000 y $4.000.000</option>
                <option value="1m+">Más de $4.000.000</option>
            </select>

            {/* Message */}
            <textarea
                name="caseDetails"
                required
                rows={4}
                placeholder="Cuéntanos el detalle de tu caso*"
                value={form.caseDetails}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
            />

            {/* Button */}
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