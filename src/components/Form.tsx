"use client";

import { useState } from "react";

type FormData = {
    rut: string;
    name: string;
    email: string;
    phone: string;
    problemType: string;
    monetaryRange: string;
    caseDetails: string;
};

export default function IntakeForm() {
    const [form, setForm] = useState<FormData>({
        rut: "",
        name: "",
        email: "",
        phone: "",
        problemType: "",
        monetaryRange: "",
        caseDetails: "",
    });

    const [rutError, setRutError] = useState("");
    const [loading, setLoading] = useState(false);

    const cases = [
        { title: "Víctima de Fraude Bancario" },
        { title: "Pie Inmobiliario Retenido" },
        { title: "Vehículo Nuevo con Fallas" },
        { title: "Robo en Recinto Privado" },
        { title: "Conflictos PYME" },
    ];

    // Basic RUT validation (optional but helpful)
    const validateRUT = (rut: string): boolean => {
        const cleanRut = rut.replace(/\./g, "").replace(/-/g, "");
        if (cleanRut.length < 2) return false;
        const body = cleanRut.slice(0, -1);
        const dv = cleanRut.slice(-1).toUpperCase();
        let sum = 0;
        let multiplier = 2;
        for (let i = body.length - 1; i >= 0; i--) {
            sum += parseInt(body[i], 10) * multiplier;
            multiplier = multiplier === 7 ? 2 : multiplier + 1;
        }
        const expectedDv = 11 - (sum % 11);
        const expectedDvStr = expectedDv === 11 ? "0" : expectedDv === 10 ? "K" : expectedDv.toString();
        return dv === expectedDvStr;
    };

    const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
    ) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
        if (name === "rut") setRutError("");
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Validate RUT
        if (!validateRUT(form.rut)) {
            setRutError("RUT inválido");
            return;
        }

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

            // Build Calendly URL with only default fields
            const calendlyUrl = new URL("https://calendly.com/enidelmale/30min");
            calendlyUrl.searchParams.append("name", form.name);
            calendlyUrl.searchParams.append("email", form.email);
            // Pre‑fill the default "message" field with a reference to the client ID
            // The webhook will parse this to fetch the full case details
            calendlyUrl.searchParams.append(
                "message",
                `Cliente ID: ${data.client.id}\nRUT: ${form.rut}`
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
        <form
            id="form"
            onSubmit={handleSubmit}
            className="bg-white p-8 rounded-2xl shadow-md w-full max-w-xl space-y-5"
        >
            <h1 className="text-3xl font-semibold text-center text-blue-900">
                Completa el formulario y cuéntanos más de tu caso.
            </h1>

            {/* RUT */}
            <input
                name="rut"
                required
                placeholder="RUT* (ej. 12.345.678-9)"
                value={form.rut}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
            />
            {rutError && <p className="text-red-500 text-sm">{rutError}</p>}

            {/* Name */}
            <input
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

            {/* Monetary Range */}
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
                <option value="Menos de $2.000.000">Menos de $2.000.000</option>
                <option value="Entre $2.000.000 y $4.000.000">
                    Entre $2.000.000 y $4.000.000
                </option>
                <option value="Más de $4.000.000">Más de $4.000.000</option>
            </select>

            {/* Case Details */}
            <textarea
                name="caseDetails"
                required
                rows={4}
                placeholder="Cuéntanos el detalle de tu caso*"
                value={form.caseDetails}
                onChange={handleChange}
                className="w-full p-3 border rounded-lg"
            />

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