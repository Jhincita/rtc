import CasesCarousel from "@/components/CasesCarousel";
import Intro from "@/components/Intro";

export default function Home() {
    return (
        <main className="min-h-screen">

            {/* Header */}
            <header className="bg-white shadow-sm px-10 py-4">
                <div className="max-w-7xl mx-auto flex items-center justify-between">

                    {/* Logo + Brand */}
                    <div className="flex items-center gap-3">
                        <img
                            src="/rtc_logo.png"
                            alt="Resuelve Tu Contrato"
                            className="w-20 h-20"
                        />
                        <span className="font-semibold text-lg tracking-wide" style={{ color: '#D98146' }}>
    RESUELVE TU CONTRATO
</span>
                    </div>

                    {/* Nav */}
                    <nav className="flex gap-8 text-sm font-medium text-gray-600">
                        <a href="#" className="hover:text-black transition">INICIO</a>
                        <a href="#" className="hover:text-black transition">PRIVACIDAD</a>
                    </nav>

                </div>
            </header>

            {/* Hero — full width, no container */}
            <Intro />

            {/* Cases */}
            <CasesCarousel />

        </main>
    );
}