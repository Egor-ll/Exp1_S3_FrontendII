import { Link, useParams } from 'react-router';
import { useState } from 'react';
import { useInventario } from '../context/useInventario.js';
import Hero from '../componentes/Hero.jsx';
import Alerta from '../componentes/Alerta.jsx';
import { CLASES_BOTON } from '../utils/validaciones.js';

function DetalleArticulo() {
    const { id } = useParams();
    const { productos, cargando, agregarAlCarrito } = useInventario();
    const [error, setError] = useState('');
    const [agregando, setAgregando] = useState(false);
    const producto = productos.find(item => String(item.id) === id);
    async function agregar() {
        try { setError(''); setAgregando(true); await agregarAlCarrito(producto.id); }
        catch (err) { setError(err.message); } finally { setAgregando(false); }
    }
    if (cargando) return <main className="mx-auto max-w-7xl p-8">Cargando artículo…</main>;
    if (!producto) return <main className="mx-auto max-w-7xl p-8"><Alerta>El artículo solicitado no existe.</Alerta><Link className="mt-5 inline-block text-[#176b45] underline" to="/inventario">Volver al inventario</Link></main>;
    return <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6"><Hero eyebrow="DETALLE DEL ARTÍCULO" title={producto.nombre} description="Información y disponibilidad del producto." />{error && <Alerta className="mb-5">{error}</Alerta>}<section className="rounded-2xl border border-[#e3eae4] bg-white p-6 shadow-sm sm:p-8"><dl className="grid gap-5 sm:grid-cols-2"><div><dt className="text-sm text-[#718076]">Marca</dt><dd className="mt-1 font-semibold">{producto.marca}</dd></div><div><dt className="text-sm text-[#718076]">Categoría</dt><dd className="mt-1 font-semibold">{producto.tipo}</dd></div><div><dt className="text-sm text-[#718076]">Stock disponible</dt><dd className="mt-1 font-semibold">{producto.stock} unidades</dd></div><div><dt className="text-sm text-[#718076]">Código</dt><dd className="mt-1 font-semibold">{producto.id}</dd></div></dl><div className="mt-8 flex flex-wrap gap-3"><button className={CLASES_BOTON} onClick={agregar} disabled={agregando || producto.stock <= 0}>{agregando ? 'Agregando…' : 'Agregar al carrito'}</button><Link className="inline-flex items-center rounded-xl border px-5 py-3 font-semibold text-[#176b45] no-underline" to="/inventario">Volver al inventario</Link></div></section></main>;
}
export default DetalleArticulo;
