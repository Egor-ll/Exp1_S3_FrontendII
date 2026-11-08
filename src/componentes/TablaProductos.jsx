import FilaProducto from './FilaProducto.jsx';

function TablaProductos({ productos, cantidades, onCantidad, onDescontar, onReponer, onEliminar, onAgregarCarrito, procesando, agregando }) {
    return <div className="overflow-x-auto rounded-xl border border-[#e5ece6]"><table className="w-full min-w-[1120px] border-collapse text-left"><thead className="bg-[#f4f7f4]"><tr className="text-xs font-bold uppercase tracking-wide text-[#718076]">{['ID', 'Nombre / detalle', 'Marca', 'Categoría', 'Stock', 'Ajustar unidades', 'Acciones'].map(texto => <th className="px-4 py-4" key={texto}>{texto}</th>)}</tr></thead><tbody>{productos.map(producto => <FilaProducto key={producto.id} producto={producto} cantidad={cantidades[producto.id] || ''} onCantidad={event => onCantidad(producto.id, event.target.value)} onDescontar={() => onDescontar(producto)} onReponer={() => onReponer(producto)} onEliminar={() => onEliminar(producto)} onAgregarCarrito={() => onAgregarCarrito(producto)} procesando={procesando === producto.id} agregando={agregando === producto.id} />)}</tbody></table></div>;
}

export default TablaProductos;
