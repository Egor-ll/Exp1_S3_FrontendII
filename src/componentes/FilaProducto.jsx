import { Link } from 'react-router';

function FilaProducto({ producto, cantidad, onCantidad, onDescontar, onReponer, onEliminar, onAgregarCarrito, procesando, agregando }) {
    const boton = 'rounded-lg px-3 py-2 text-sm font-semibold transition disabled:opacity-50';
    return <tr className="border-t border-[#e9eee9] hover:bg-[#f8faf8]">
        <td className="px-4 py-4 text-sm">{producto.id}</td>
        <td className="px-4 py-4 text-sm font-semibold"><Link className="text-[#176b45] underline" to={`/articulo/${producto.id}`}>{producto.nombre}<span className="mt-1 block text-xs font-medium">Ver detalle →</span></Link></td>
        <td className="px-4 py-4 text-sm">{producto.marca}</td><td className="px-4 py-4 text-sm">{producto.tipo}</td>
        <td className="px-4 py-4 font-bold">{producto.stock}</td>
        <td className="px-4 py-4"><div className="flex flex-wrap items-center gap-2"><input aria-label={`Unidades de ${producto.nombre}`} className="w-20 rounded-lg border px-2 py-2" type="number" min="1" step="1" value={cantidad} onChange={onCantidad} /><button className={`${boton} bg-[#176b45] text-white`} disabled={procesando || !cantidad || producto.stock === 0} onClick={onDescontar}>Descontar</button><button className={`${boton} bg-[#e9f5ed] text-[#176b45]`} disabled={procesando || !cantidad} onClick={onReponer}>Reponer</button></div></td>
        <td className="px-4 py-4"><div className="flex flex-col items-start gap-2"><button type="button" className={`${boton} bg-[#176b45] text-white`} disabled={agregando || Number(producto.stock) <= 0} onClick={onAgregarCarrito}>{agregando ? 'Agregando…' : 'Agregar al carrito'}</button><button type="button" className={`${boton} bg-red-50 text-red-700`} disabled={procesando} onClick={onEliminar}>Eliminar</button></div></td>
    </tr>;
}

export default FilaProducto;
