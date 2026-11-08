import { useState } from 'react';
import { useInventario } from '../context/useInventario.js';
import Hero from '../componentes/Hero.jsx';
import Alerta from '../componentes/Alerta.jsx';
import FormularioArticulo from '../componentes/FormularioArticulo.jsx';
import { validarMarca, validarNombre } from '../utils/validaciones.js';

const INICIAL = { nombre: '', marca: '', tipo: '', stock: '1' };

function AgregarArticulo() {
    const { agregarProducto } = useInventario();
    const [valores, setValores] = useState(INICIAL);
    const [guardando, setGuardando] = useState(false);
    const [mensaje, setMensaje] = useState('');
    const [error, setError] = useState('');
    function manejarCambio(event) { setValores(actuales => ({ ...actuales, [event.target.name]: event.target.value })); }
    async function manejarEnvio(event) {
        event.preventDefault(); setMensaje(''); setError('');
        const stock = Number(valores.stock);
        if (!validarNombre(valores.nombre)) return setError('El nombre debe tener 1 a 80 caracteres válidos.');
        if (!validarMarca(valores.marca)) return setError('La marca debe tener 1 a 80 caracteres válidos.');
        if (!Number.isInteger(stock) || stock < 0) return setError('El stock debe ser un entero igual o mayor que cero.');
        try { setGuardando(true); await agregarProducto({ ...valores, nombre: valores.nombre.trim(), marca: valores.marca.trim(), stock }); setValores(INICIAL); setMensaje('¡Artículo registrado correctamente!'); }
        catch (err) { setError(err.message || 'No se pudo registrar el artículo.'); }
        finally { setGuardando(false); }
    }
    return <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-8 sm:px-6"><Hero title="Agregar artículos" description="Registra nuevos productos en el inventario del supermercado." /><section className="rounded-2xl border border-[#e3eae4] bg-white p-6 shadow-lg sm:p-8"><h2 className="mb-6 text-xl font-bold text-[#176b45]">Registrar nuevo artículo</h2><FormularioArticulo valores={valores} onChange={manejarCambio} onSubmit={manejarEnvio} guardando={guardando} />{mensaje && <Alerta tipo="exito" className="mt-6">{mensaje}</Alerta>}{error && <Alerta className="mt-6">{error}</Alerta>}</section></main>;
}
export default AgregarArticulo;
