function Alerta({ children, tipo = 'error', className = '' }) {
    const estilos = tipo === 'exito'
        ? 'border-green-200 bg-green-50 text-green-800'
        : 'border-red-200 bg-red-50 text-red-700';
    return <p className={`rounded-xl border p-4 text-sm font-medium ${estilos} ${className}`} role={tipo === 'exito' ? 'status' : 'alert'}>{children}</p>;
}

export default Alerta;
