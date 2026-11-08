import CamposArticulo from './CamposArticulo.jsx';
import { CLASES_BOTON } from '../utils/validaciones.js';

function FormularioArticulo({ valores, onChange, onSubmit, guardando }) {
    return <form onSubmit={onSubmit}><CamposArticulo valores={valores} onChange={onChange} /><div className="mt-8 flex justify-end"><button className={CLASES_BOTON} type="submit" disabled={guardando}>{guardando ? 'Guardando…' : '+ Registrar artículo'}</button></div></form>;
}

export default FormularioArticulo;
