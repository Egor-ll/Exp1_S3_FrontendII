
const preguntas = [
    {
        pregunta: '¿Cómo puedo consultar el inventario?',
        respuesta:
            'Ingresa a la sección Inventario desde el menú principal para revisar los productos registrados y sus existencias.',
    },
    {
        pregunta: '¿Qué significa stock bajo?',
        respuesta:
            'Indica que un producto tiene menos de 10 unidades registradas en el inventario.',
    },
    {
        pregunta: '¿Los datos se guardan permanentemente?',
        respuesta:
            'Sí. El servidor Express guarda los cambios en un archivo JSON, por lo que los productos registrados, eliminados y las modificaciones de stock se conservan.',
    },
    {
        pregunta: '¿Cómo puedo volver al inicio?',
        respuesta:
            'Selecciona Inicio en el menú de navegación principal para regresar al panel de inventario.',
    },
];

function PreguntasFrecuentes() {
    return (
        <main className="mx-auto w-full max-w-7xl px-4 py-8 sm:px-6">

            <Hero eyebrow="CENTRO DE AYUDA" title="Preguntas frecuentes" description="Resolvemos algunas dudas sobre nuestro sistema de inventario." />

            <section className="flex flex-col gap-5">
                {preguntas.map((item, indice) => (
                    <article
                        className="rounded-2xl border border-[#e3eae4] bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md sm:p-8"
                        key={indice}
                    >
                        <h2 className="mb-3 text-lg font-bold text-[#176b45]">
                            {item.pregunta}
                        </h2>

                        <p className="leading-7 text-[#64736a]">
                            {item.respuesta}
                        </p>
                    </article>
                ))}
            </section>

        </main>
    );
}

export default PreguntasFrecuentes;
import Hero from '../componentes/Hero.jsx';

