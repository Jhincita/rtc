import Form from '../components/Form'

export default function Intro() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">

            {/* LEFT: TEXT */}
            <div className="space-y-4">

                <h1 className="text-4xl font-bold leading-tight">
                    Defendemos a los consumidores.
                </h1>

                <p className="text-gray-600">
                    Clonación de tarjetas • Estafas • Cobros indebidos
                </p>

                <p className="text-gray-700">
                    Orientación legal especializada.
                </p>

                <p className="text-sm text-gray-400">
                    Proyecto de @resuelvetucontrato
                </p>

            </div>
            <Form/>



        </section>
    );
}