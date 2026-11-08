import { useState } from 'react';
import { Link } from 'react-router';
import { useInventario } from '../context/useInventario.js';
import Hero from '../componentes/Hero.jsx';
import Alerta from '../componentes/Alerta.jsx';

function Carrito() {
    const { carrito, productos, agregarAlCarrito, quitarDelCarrito } = useInventario();
    const [error, setError] = useState('');
    const [procesando, setProcesando] = useState(null);
    async function cambiar(id, accion) {
        try { setError(''); setProcesando(id); await accion(id); }
        catch (err) { setError(err.message); } finally { setProcesando(null); }
    }
    const articulos = carrito.map(item => ({ ...item, producto: productos.find(p => p.id === item.id) })).filter(item => item.producto);
    const totalUnidades = articulos.reduce((total, item) => total + item.cantidad, 0);
    return <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6"><Hero eyebrow="COMPRA" title="Carrito de compras" description={`${totalUnidades} unidades seleccionadas`} />{error && <Alerta className="mb-5">{error}</Alerta>}<section className="rounded-2xl border border-[#e3eae4] bg-white p-5 shadow-sm sm:p-7">{articulos.length ? <ul className="divide-y divide-[#e9eee9]">{articulos.map(({ id, cantidad, producto }) => <li className="flex flex-col justify-between gap-4 py-5 sm:flex-row sm:items-center" key={id}><div><Link className="font-bold text-[#176b45] underline" to={`/articulo/${id}`}>{producto.nombre}</Link><p className="mt-1 text-sm text-[#64736a]">{producto.marca} · {producto.tipo} · {producto.stock} disponibles</p></div><div className="flex items-center gap-3"><button type="button" className="h-10 w-10 rounded-lg border text-lg font-bold text-[#176b45] disabled:opacity-50" aria-label={`Quitar una unidad de ${producto.nombre}`} disabled={procesando === id} onClick={() => cambiar(id, quitarDelCarrito)}>−</button><span className="min-w-8 text-center font-bold">{cantidad}</span><button type="button" className="h-10 w-10 rounded-lg bg-[#176b45] text-lg font-bold text-white disabled:opacity-50" aria-label={`Agregar una unidad de ${producto.nombre}`} disabled={procesando === id || producto.stock <= 0} onClick={() => cambiar(id, agregarAlCarrito)}>+</button></div></li>)}</ul> : <div className="py-12 text-center"><p className="text-lg font-semibold text-[#24352c]">Tu carrito está vacío.</p><p className="mt-2 text-sm text-[#64736a]">Explora el inventario, abre el detalle de un artículo y agrégalo al carrito.</p><Link className="mt-5 inline-flex items-center justify-center rounded-xl bg-[#176b45] px-5 py-3 font-semibold text-white no-underline hover:bg-[#105536]" to="/inventario">Ir al inventario</Link></div>}</section></main>;
}
export default Carrito;
