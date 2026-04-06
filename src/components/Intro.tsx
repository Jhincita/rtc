import Form from '../components/Form'

export default function Intro() {
    return (
        <section className="max-w-6xl mx-auto px-6 py-12 grid md:grid-cols-2 gap-10 items-center">

            <div className="relative z-10 flex-1 space-y-6">

                <h1 className="text-4xl font-black text-white leading-tight">
                    Agendar una reunión es el rimer paso para{' '}
                    <u>recuperar tu pie.</u>
                </h1>

                <p className="text-3xl font-black text-white leading-snug">
                    Con nuestra asesoría, cientos de personas han{' '}
                    <u>recuperado el pie de su inversión inmobiliaria</u>{' '}
                    de forma segura y garantizada.
                </p>

                <p className="text-3xl font-black text-white leading-snug">
                    Esta reunión será totalmente <u>gratis.</u>
                </p>

            </div>
            <Form/>



        </section>
    );
}