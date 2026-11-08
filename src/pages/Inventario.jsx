import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router';
import { useInventario } from '../context/useInventario.js';
import Hero from '../componentes/Hero.jsx';
import Alerta from '../componentes/Alerta.jsx';
import TablaProductos from '../componentes/TablaProductos.jsx';

function Inventario() {
    const [params, setParams] = useSearchParams();
    const filtroActivo = params.get('filtro') === 'stock-bajo';
    const categoriaActiva = params.get('categoria') || '';
    const { productos, cargando, error, eliminarProducto, descontarStock, reponerStock, agregarAlCarrito } = useInventario();
    const [cantidades, setCantidades] = useState({});
    const [mensaje, setMensaje] = useState('');
    const [errorAccion, setErrorAccion] = useState('');
    const [procesando, setProcesando] = useState(null);
    const [agregando, setAgregando] = useState(null);
    const categorias = useMemo(() => [...new Set(productos.map(item => item.tipo).filter(Boolean))].sort(), [productos]);
    const filtrados = productos.filter(item => (!filtroActivo || Number(item.stock) < 10) && (!categoriaActiva || item.tipo === categoriaActiva));
    async function ejecutar(producto, accion, verbo) {
        const cantidad = Number(cantidades[producto.id]); setMensaje(''); setErrorAccion('');
        if (!Number.isInteger(cantidad) || cantidad <= 0) return setErrorAccion('Ingresa una cantidad entera mayor que cero.');
        if (accion === descontarStock && cantidad > producto.stock) return setErrorAccion(`Solo existen ${producto.stock} unidades de ${producto.nombre}.`);
        try { setProcesando(producto.id); await accion(producto.id, cantidad); setCantidades(actuales => ({ ...actuales, [producto.id]: '' })); setMensaje(`${verbo} ${cantidad} unidades de ${producto.nombre}.`); }
        catch (err) { setErrorAccion(err.message); } finally { setProcesando(null); }
    }
    async function eliminar(producto) {
        if (!window.confirm(`¿Eliminar completamente “${producto.nombre}”?`)) return;
        try { setProcesando(producto.id); await eliminarProducto(producto.id); setMensaje(`Artículo “${producto.nombre}” eliminado.`); }
        catch (err) { setErrorAccion(err.message); } finally { setProcesando(null); }
    }
    async function agregar(producto) {
        try { setErrorAccion(''); setMensaje(''); setAgregando(producto.id); await agregarAlCarrito(producto.id); setMensaje(`${producto.nombre} se agregó al carrito.`); }
        catch (err) { setErrorAccion(err.message); } finally { setAgregando(null); }
    }
    if (cargando) return <main className="mx-auto w-full max-w-7xl px-4 py-8"><p className="rounded-2xl bg-white p-8 text-center">Cargando inventario…</p></main>;
    const botonFiltro = activo => `rounded-xl border px-4 py-2.5 text-sm font-semibold ${activo ? 'border-[#176b45] bg-[#176b45] text-white' : 'border-[#d3e0d6] bg-white text-[#24543d]'}`;
    return <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6">
        <Hero title="Inventario de artículos" description="Consulta y administra las existencias del supermercado." />
        {error && <Alerta className="mb-5">{error}</Alerta>}{mensaje && <Alerta tipo="exito" className="mb-5">{mensaje}</Alerta>}{errorAccion && <Alerta className="mb-5">{errorAccion}</Alerta>}
        <section className="overflow-hidden rounded-2xl border border-[#e3eae4] bg-white p-5 shadow-lg sm:p-7">
            <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-center"><div><h2 className="text-xl font-bold text-[#176b45]">Productos registrados</h2><p className="mt-2 text-sm text-[#64736a]">Mostrando {filtrados.length} de {productos.length} artículos</p></div><Link className="font-semibold text-[#176b45] underline" to="/carrito">Ver carrito</Link></div>
            <div className="mb-6 flex flex-wrap gap-3"><button type="button" className={botonFiltro(!filtroActivo)} onClick={() => setParams(p => { p.delete('filtro'); return p; })}>Todos</button><button type="button" className={botonFiltro(filtroActivo)} onClick={() => setParams(p => { p.set('filtro', 'stock-bajo'); return p; })}>Stock bajo</button><label className="sr-only" htmlFor="filtro-categoria">Filtrar por categoría</label><select id="filtro-categoria" className="rounded-xl border border-[#d3e0d6] bg-white px-4 py-2.5" value={categoriaActiva} onChange={event => setParams(p => { event.target.value ? p.set('categoria', event.target.value) : p.delete('categoria'); return p; })}><option value="">Todas las categorías</option>{categorias.map(categoria => <option key={categoria}>{categoria}</option>)}</select></div>
            {filtrados.length ? <TablaProductos productos={filtrados} cantidades={cantidades} onCantidad={(id, value) => setCantidades(actuales => ({ ...actuales, [id]: value }))} onDescontar={producto => ejecutar(producto, descontarStock, 'Descontadas')} onReponer={producto => ejecutar(producto, reponerStock, 'Repuestas')} onEliminar={eliminar} onAgregarCarrito={agregar} procesando={procesando} agregando={agregando} /> : <p className="rounded-xl border border-dashed p-10 text-center text-[#64736a]">No hay artículos para los filtros seleccionados.</p>}
        </section>
    </main>;
}
export default Inventario;
