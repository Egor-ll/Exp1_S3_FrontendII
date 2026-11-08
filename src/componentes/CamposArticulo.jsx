import { CLASES_CAMPO } from '../utils/validaciones.js';

const CATEGORIAS = ['Abarrotes', 'Lácteos', 'Panadería', 'Frutas y verduras', 'Bebidas', 'Limpieza', 'Congelados', 'Otros'];

function CamposArticulo({ valores, onChange }) {
    return (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#53645a]" htmlFor="nombre">Nombre del artículo<input className={CLASES_CAMPO} id="nombre" name="nombre" value={valores.nombre} onChange={onChange} maxLength={80} required /></label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#53645a]" htmlFor="marca">Marca<input className={CLASES_CAMPO} id="marca" name="marca" value={valores.marca} onChange={onChange} maxLength={80} required /></label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#53645a]" htmlFor="tipo">Tipo de producto<select className={CLASES_CAMPO} id="tipo" name="tipo" value={valores.tipo} onChange={onChange} required><option value="">Selecciona una categoría</option>{CATEGORIAS.map(tipo => <option key={tipo}>{tipo}</option>)}</select></label>
            <label className="flex flex-col gap-2 text-sm font-semibold text-[#53645a]" htmlFor="stock">Stock inicial<input className={CLASES_CAMPO} id="stock" name="stock" type="number" min="0" step="1" value={valores.stock} onChange={onChange} required /></label>
        </div>
    );
}

export default CamposArticulo;
