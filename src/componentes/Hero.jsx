function Hero({ eyebrow = 'GESTIÓN DE INVENTARIO', title, description }) {
    return (
        <section className="mb-8 rounded-2xl bg-[#176b45] p-6 text-white shadow-lg sm:p-8">
            <p className="mb-3 text-xs font-extrabold tracking-[1.5px] text-[#b9e7ca]">{eyebrow}</p>
            <h1 className="mb-4 text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
            {description && <p className="max-w-3xl leading-7 text-[#e0f0e5]">{description}</p>}
        </section>
    );
}

export default Hero;
