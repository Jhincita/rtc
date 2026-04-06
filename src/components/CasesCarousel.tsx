"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

const cases = [
    { title: "¿Demoras infinitas para la entrega de tu propiedad?", img: "/scroll/retrasos.png" },
    { title: "¿La inmobiliaria te multa o castiga sin razón?", img: "/scroll/multas.png" },
    { title: "¿Cambiaron los requisitos para la compra?", img: "/scroll/cambios.png" },
    { title: "¿Estás atravesando enfermedades, despidos o dificultades económicas?", img: "/scroll/enfermedades.png" },
    { title: "¿Tu institución financiera te rechazó el hipotecario?", img: "/scroll/rechazo.png" },
];

export default function CasesCarousel() {
    const containerRef = useRef<HTMLDivElement>(null);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);

    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const updateScrollState = () => {
        const el = containerRef.current;
        if (!el) return;
        setCanScrollLeft(el.scrollLeft > 0);
        setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 1);
    };

    useEffect(() => {
        updateScrollState();
    }, []);

    const startScrolling = (direction: "left" | "right") => {
        stopScrolling();
        intervalRef.current = setInterval(() => {
            const el = containerRef.current;
            if (!el) return;
            el.scrollBy({ left: direction === "left" ? -10 : 10 });
            updateScrollState();
        }, 16);
    };

    const stopScrolling = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return (
        <section className="w-full px-6 py-10 relative">

            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
                ¿Te identificas con alguno de estos casos?
            </h2>

            {/* LEFT HOVER ZONE */}
            {canScrollLeft && (
                <div
                    onMouseEnter={() => startScrolling("left")}
                    onMouseLeave={stopScrolling}
                    className="absolute left-0 top-0 h-full w-16 z-10 flex items-center justify-start bg-gradient-to-r from-[#E07B2E] to-transparent cursor-pointer"
                >
                    <span className="ml-2 text-2xl text-white">←</span>
                </div>
            )}

            {/* RIGHT HOVER ZONE */}
            {canScrollRight && (
                <div
                    onMouseEnter={() => startScrolling("right")}
                    onMouseLeave={stopScrolling}
                    className="absolute right-0 top-0 h-full w-16 z-10 flex items-center justify-end bg-gradient-to-l from-[#E07B2E] to-transparent cursor-pointer"
                >
                    <span className="mr-2 text-2xl text-white">→</span>
                </div>
            )}

            {/* SCROLL CONTAINER */}
            <div
                ref={containerRef}
                onScroll={updateScrollState}
                className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide px-4"
            >
                {cases.map((c, i) => (
                    <div
                        key={i}
                        className="w-[260px] bg-white rounded-xl shadow-md p-4 flex-shrink-0"
                    >
                        <div className="relative w-full h-40 rounded-md overflow-hidden mb-4">
                            <Image src={c.img} alt={c.title} fill className="object-cover" />
                        </div>
                        <h3 className="font-medium text-base text-gray-800">{c.title}</h3>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-semibold mt-8 mb-4 text-center text-white">
                ¡Te podemos ayudar!
            </h2>

            <div className="flex justify-center">
                <button
                    onClick={() => document.getElementById("name")?.focus()}
                    className="mt-4 bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                    QUIERO ASESORÍA LEGAL
                </button>
            </div>

        </section>
    );
}