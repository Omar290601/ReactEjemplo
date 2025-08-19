import { useState, useEffect } from "react";

const Component = () => {
    const [value, setValue] = useState(false);

    useEffect(() => {
        console.log('useEffect se ejecutó');
    }, []);  // Ahora se ejecutará solo una vez

    return (
        <div>
            <p>Valor: {value ? 'Verdadero' : 'Falso'}</p>
            <button onClick={() => setValue(!value)}>
                Cambiar Valor
            </button>
        </div>
    );
};

export default Component;
