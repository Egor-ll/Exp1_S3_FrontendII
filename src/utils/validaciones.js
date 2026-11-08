const TEXTO_ARTICULO = /^[\p{L}\p{M}0-9][\p{L}\p{M}0-9 .,'’()-]{0,79}$/u;

export function validarNombre(valor) {
    return TEXTO_ARTICULO.test(valor.trim());
}

export function validarMarca(valor) {
    return TEXTO_ARTICULO.test(valor.trim());
}

export const CLASES_CAMPO = 'w-full rounded-xl border border-[#d6e1d8] bg-white px-4 py-3 text-[#24352c] outline-none transition focus:border-[#176b45] focus:ring-2 focus:ring-[#176b45]/20';
export const CLASES_BOTON = 'inline-flex items-center justify-center rounded-xl bg-[#176b45] px-5 py-3 font-semibold text-white transition hover:bg-[#105536] disabled:cursor-not-allowed disabled:opacity-50';
