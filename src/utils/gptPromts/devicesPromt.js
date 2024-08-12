
import { getSiteName } from "../../config";

export function GetDevicesPromt({ chartData, idSite }) {

    const interactionContext = [
        { role: 'system', content: 'Las respuestas deben ser en español y deben proporcionar un análisis detallado y comprensible de los datos proporcionados. Asegúrate de considerar el contexto de la gráfica y la descripción proporcionada.' },
        { role: 'user', content: `Analiza las siguiente gráficas que muestran los datos de los dispositivos a través de los cuales los clientes utilizan la aplicación, segmentados por distintos parametros,  para el sitio con id ${idSite} y nombre ${getSiteName(idSite)}.  Los datos son los siguientes: ${chartData}.Principalmente se estan utilizando los nb_visits para mostrar los datos, pero puedes analizar el resto de datos proporcionados y en caso de encontrar algo extraño o interesante comentarlo. Por favor, proporciona un análisis detallado considerando tendencias, patrones y posibles implicaciones de estos datos.` }
    ];

    console.log('Interaction Context:', interactionContext);
    console.log('Chart Data:', chartData);
    console.log('Id Site:', idSite);

    return interactionContext;
}