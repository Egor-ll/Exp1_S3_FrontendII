
import { Link } from 'react-router';
import { useInventario } from '../context/useInventario.js';
import Hero from '../componentes/Hero.jsx';

function Home() {
    const {
        productos,
        cargando,
        error,
    } = useInventario();

    const unidadesTotales = productos.reduce(
        (total, producto) => total + Number(producto.stock || 0),
        0
    );

    const productosStockBajo = productos.filter(
        producto => Number(producto.stock) < 10
    ).length;

    const tarjetas = [
        {
            titulo: 'Productos registrados',
            valor: productos.length,
            descripcion: 'Artículos disponibles en el sistema',
        },
        {
            titulo: 'Unidades en inventario',
            valor: unidadesTotales,
            descripcion: 'Total de unidades registradas',
        },
    ];

    return (
        <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">

            <Hero title="Control de inventario" description="Administra los productos y consulta las existencias del supermercado." />

            {error && (
                <p
                    className="mb-6 rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700"
                    role="alert"
                >
                    {error}
                </p>
            )}

            <section className="grid grid-cols-1 gap-5 md:grid-cols-3">

                {tarjetas.map((tarjeta) => (
                    <article
                        key={tarjeta.titulo}
                        className="flex flex-col gap-3 rounded-2xl border border-[#e3eae4] bg-white p-6 shadow-sm transition duration-200 hover:-translate-y-1 hover:shadow-md sm:p-8"
                    >
                        <span className="text-sm font-semibold text-[#718076]">
                            {tarjeta.titulo}
                        </span>

                        <strong className="text-4xl font-extrabold text-[#176b45]">
                            {cargando ? '...' : tarjeta.valor}
                        </strong>

                        <p className="text-sm text-[#64736a]">
                            {tarjeta.descripcion}
                        </p>
                    </article>
                ))}

                <Link
                    to="/inventario?filtro=stock-bajo"
                    className="flex flex-col gap-3 rounded-2xl border border-[#e3eae4] bg-white p-6 text-left no-underline shadow-sm transition duration-200 hover:-translate-y-1 hover:border-[#176b45] hover:shadow-md sm:p-8"
                    aria-label="Ver productos con stock bajo en el inventario"
                >
                    <span className="text-sm font-semibold text-[#718076]">
                        Productos con stock bajo
                    </span>

                    <strong className="text-4xl font-extrabold text-[#a75b12]">
                        {cargando ? '...' : productosStockBajo}
                    </strong>

                    <span className="text-sm font-semibold text-[#176b45]">
                        Ver artículos que necesitan reposición →
                    </span>
                </Link>

            </section>
        </main>
    );
}

export default Home;
