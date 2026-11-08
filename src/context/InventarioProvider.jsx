import { useCallback, useEffect, useState } from 'react';
import { InventarioContext } from './InventarioContext.js';

const API_URL = '/api/productos';
const STORAGE_KEY = 'supermercado-carrito';

export function InventarioProvider({ children }) {
    const [productos, setProductos] = useState([]);
    const [carrito, setCarrito] = useState(() => {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch {
            return [];
        }
    });
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        const controller = new AbortController();
        async function cargarInicial() {
            try {
                const respuesta = await fetch(API_URL, { signal: controller.signal });
                if (!respuesta.ok) throw new Error('No se pudo obtener el inventario.');
                setProductos(await respuesta.json());
            } catch (err) {
                if (err.name !== 'AbortError') setError(err.message);
            } finally {
                if (!controller.signal.aborted) setCargando(false);
            }
        }
        cargarInicial();
        return () => controller.abort();
    }, []);

    useEffect(() => {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(carrito));
    }, [carrito]);

    const actualizarStock = useCallback(async (id, cantidad, operacion) => {
        const respuesta = await fetch(`${API_URL}/${id}/${operacion}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cantidad }),
        });
        const datos = await respuesta.json();
        if (!respuesta.ok) throw new Error(datos.mensaje || 'No se pudo actualizar el stock.');
        setProductos(actuales => actuales.map(producto => producto.id === id ? datos.producto : producto));
        return datos.producto;
    }, []);

    async function agregarProducto(producto) {
        const respuesta = await fetch(API_URL, {
            method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(producto),
        });
        const datos = await respuesta.json();
        if (!respuesta.ok) throw new Error(datos.mensaje || 'No se pudo registrar el artículo.');
        setProductos(actuales => [...actuales, datos]);
        return datos;
    }

    const descontarStock = useCallback((id, cantidad) => actualizarStock(id, cantidad, 'descontar'), [actualizarStock]);
    const reponerStock = useCallback((id, cantidad) => actualizarStock(id, cantidad, 'reponer'), [actualizarStock]);

    async function agregarAlCarrito(id) {
        const producto = productos.find(item => item.id === id);
        const cantidadActual = carrito.find(item => item.id === id)?.cantidad || 0;
        if (!producto || producto.stock <= 0) throw new Error('No hay unidades disponibles.');
        await descontarStock(id, 1);
        setCarrito(actuales => {
            const existente = actuales.find(item => item.id === id);
            return existente
                ? actuales.map(item => item.id === id ? { ...item, cantidad: item.cantidad + 1 } : item)
                : [...actuales, { id, cantidad: cantidadActual + 1 }];
        });
    }

    async function quitarDelCarrito(id) {
        const item = carrito.find(producto => producto.id === id);
        if (!item) return;
        await reponerStock(id, 1);
        setCarrito(actuales => actuales.flatMap(producto => {
            if (producto.id !== id) return [producto];
            return producto.cantidad > 1 ? [{ ...producto, cantidad: producto.cantidad - 1 }] : [];
        }));
    }

    async function eliminarProducto(id) {
        const respuesta = await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        if (!respuesta.ok) {
            const datos = await respuesta.json();
            throw new Error(datos.mensaje || 'No se pudo eliminar el artículo.');
        }
        setProductos(actuales => actuales.filter(producto => producto.id !== id));
        setCarrito(actuales => actuales.filter(producto => producto.id !== id));
    }

    return (
        <InventarioContext.Provider value={{ productos, carrito, cargando, error, agregarProducto, descontarStock, reponerStock, eliminarProducto, agregarAlCarrito, quitarDelCarrito }}>
            {children}
        </InventarioContext.Provider>
    );
}
