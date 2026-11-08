
import Hero from '../componentes/Hero.jsx';

function QuienesSomos() {
    return (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">

            <Hero eyebrow="NUESTRA EMPRESA" title="Quiénes somos" description="Somos un supermercado comprometido con ofrecer productos de calidad y una experiencia de compra cómoda para nuestros clientes." />

            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">

                <section className="rounded-2xl border border-[#e3eae4] bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-8">
                    <h2 className="mb-4 text-xl font-bold text-[#176b45]">
                        Nuestra misión
                    </h2>

                    <p className="leading-7 text-[#64736a]">
                        Facilitar el acceso a productos esenciales mediante una atención
                        cercana y una gestión eficiente de nuestro inventario.
                    </p>
                </section>

                <section className="rounded-2xl border border-[#e3eae4] bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-8">
                    <h2 className="mb-4 text-xl font-bold text-[#176b45]">
                        Nuestro compromiso
                    </h2>

                    <p className="leading-7 text-[#64736a]">
                        Mantener los productos organizados y disponibles para responder
                        a las necesidades de nuestros clientes.
                    </p>
                </section>

            </div>
        </main>
    );
}

export default QuienesSomos;
