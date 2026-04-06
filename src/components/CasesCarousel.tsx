"use client";

import { useEffect, useRef, useState } from "react";

const cases = [
    { title: "¿Demoras infinitas para la entrega de tu propiedad?" },
    { title: "¿La inmobiliaria te multa o castiga sin razón?" },
    { title: "¿Cambiaron los requisitos para la compra?" },
    { title: "¿Estás atravesando enfermedades, despidos o dificultades económicas?" },
    { title: "¿Tu institución financiera te rechazó el hipotecario?" },
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

            el.scrollBy({
                left: direction === "left" ? -10 : 10,
            });

            updateScrollState();
        }, 16); // smooth
    };

    const stopScrolling = () => {
        if (intervalRef.current) {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        }
    };

    return (
        <section className="max-w-6xl mx-auto px-6 py-10 relative">

            <h2 className="text-2xl font-semibold mb-6 text-center">
                ¿Te identificas con alguno de estos casos?
            </h2>

            {/* LEFT HOVER ZONE */}
            {canScrollLeft && (
                <div
                    onMouseEnter={() => startScrolling("left")}
                    onMouseLeave={stopScrolling}
                    className="absolute left-0 top-0 h-full w-16 z-10 flex items-center justify-start bg-gradient-to-r from-white/80 to-transparent cursor-pointer"
                >
                    <span className="ml-2 text-2xl">←</span>
                </div>
            )}

            {/* RIGHT HOVER ZONE */}
            {canScrollRight && (
                <div
                    onMouseEnter={() => startScrolling("right")}
                    onMouseLeave={stopScrolling}
                    className="absolute right-0 top-0 h-full w-16 z-10 flex items-center justify-end bg-gradient-to-l from-white/80 to-transparent cursor-pointer"
                >
                    <span className="mr-2 text-2xl">→</span>
                </div>
            )}

            {/* SCROLL CONTAINER */}
            <div
                ref={containerRef}
                onScroll={updateScrollState}
                className="flex gap-4 overflow-x-auto scroll-smooth scrollbar-hide"
            >
                {cases.map((c, i) => (
                    <div
                        key={i}
                        className="min-w-[250px] bg-white rounded-xl shadow-sm p-6 flex-shrink-0"
                    >
                        <div className="h-32 bg-gray-200 rounded-md mb-4" />
                        <h3 className="font-medium text-lg">{c.title}</h3>
                    </div>
                ))}
            </div>

            <h2 className="text-2xl font-semibold mb-6 text-center">

                ¡Te podemos ayudar!

            </h2>

            <div className="flex justify-center">
                <button
                    onClick={() => {
                        const input = document.getElementById("name");
                        input?.focus();
                    }}
                    className="items-center inline-block mt-4 bg-black text-white px-6 py-3 rounded-lg hover:opacity-90 transition"
                >
                    QUIERO ASESORÍA LEGAL
                </button>
            </div>


        </section>
    );
}