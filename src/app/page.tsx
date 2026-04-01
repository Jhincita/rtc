import Form from "@/components/Form";
import CasesCarousel from "@/components/CasesCarousel";
import Intro from "@/components/Intro";

export default function Home() {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* Header */}
            <header className="bg-white shadow-sm p-4">
                <div className="max-w-6xl mx-auto flex items-center gap-3">

                    {/* Logo */}
                    <img
                        src="/dtd_logo_transp.svg"
                        alt="Defiende tu Dinero"
                        className="w-10 h-10"
                    />

                    {/* Brand name */}
                    <div className="font-semibold text-lg">
                        Defiende tu Dinero
                    </div>

                </div>
            </header>

            {/* Hero / Intro */}
            <section className="max-w-6xl mx-auto p-6 text-center">
                <Intro/>
            </section>


            {/* Cases */}
            <CasesCarousel />


        </main>
    );
}