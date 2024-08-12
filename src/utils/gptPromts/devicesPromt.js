
import { getSiteName } from "../../config";

export function GetDevicesPromt({ chartData, idSite }) {

    const interactionContext = [
        { role: 'system', content: 'Tus respuestas deben ser en español y proporcionar un análisis detallado, profundo, y experto de los datos que se te proporcionen. Asegúrate de abordar la distribución de los datos, las tendencias, patrones, correlaciones y posibles implicaciones de los resultados. Ofrece también recomendaciones estratégicas basadas en el análisis, considerando cómo los resultados pueden impactar en la toma de decisiones. Asegúrate de considerar el contexto de la gráfica y la descripción proporcionada.' },
        { role: 'user', content: `Analiza las siguiente gráficas que muestran los datos de los dispositivos a través de los cuales los clientes utilizan la aplicación, segmentados por distintos parametros,  para el sitio con id ${idSite} y nombre ${getSiteName(idSite)}.  Los datos son los siguientes: ${chartData}.Principalmente se estan utilizando los nb_visits para mostrar los datos, pero puedes analizar el resto de datos proporcionados y en caso de encontrar algo extraño o interesante comentarlo. Por favor, proporciona un análisis detallado considerando tendencias, patrones y posibles implicaciones de estos datos. 
        Proporciona un análisis exhaustivo de los datos sobre el uso de aplicaciones en diferentes plataformas, desglosado por tipos de dispositivos, marcas, modelos, sistemas operativos, y navegadores.

            En tu análisis:

            Identifica tendencias clave: Examina cómo los diferentes dispositivos y plataformas se están utilizando. ¿Hay una preferencia clara por ciertos tipos de dispositivos o marcas? ¿Qué patrones emergen al comparar el uso de diferentes sistemas operativos y navegadores?

            Explora correlaciones y relaciones: Determina si existen correlaciones significativas entre las categorías, como la relación entre el tipo de dispositivo y el sistema operativo utilizado. ¿Los usuarios de una determinada marca de dispositivos tienden a usar ciertos navegadores o sistemas operativos específicos?

            Analiza la distribución de los datos: Comenta la distribución de uso entre las diferentes categorías. ¿Qué proporciones son dominantes y cuáles son marginales? ¿Cómo podría interpretarse la distribución de dispositivos o sistemas operativos en términos de preferencias de los usuarios?

            Identifica posibles implicaciones: A partir de los datos, sugiere qué implicaciones podrían tener estas tendencias para la estrategia de desarrollo de aplicaciones, marketing o atención al cliente. ¿Qué podría significar una alta concentración de usuarios en un tipo particular de dispositivo o sistema operativo para el futuro de la plataforma?

            Ofrece recomendaciones estratégicas: Basándote en los hallazgos, proporciona recomendaciones sobre cómo optimizar la experiencia del usuario, mejorar la compatibilidad de la aplicación, o dirigir esfuerzos de marketing. Considera cómo se pueden utilizar estos datos para anticipar cambios futuros en las preferencias del usuario.

            Considera el contexto y evolución temporal: Si es posible, integra el análisis en un marco temporal, destacando cómo podrían evolucionar estas tendencias a lo largo del tiempo y qué factores externos podrían influir en esos cambios
                    ` }
    ];

    console.log('Interaction Context:', interactionContext);
    console.log('Chart Data:', chartData);
    console.log('Id Site:', idSite);

    return interactionContext;
}