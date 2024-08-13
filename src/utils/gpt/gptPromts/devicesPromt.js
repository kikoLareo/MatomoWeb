import { getSiteName } from "../../../config";

export function GetDevicesPromt({ chartData, idSite }) {

    const interactionContext = [
        { role: 'system', content: `Tus respuestas deben ser en español y proporcionar un análisis detallado, profundo, y experto de los datos que se te proporcionen. Asegúrate de abordar la distribución de los datos, las tendencias, patrones, correlaciones y posibles implicaciones de los resultados. Ofrece también recomendaciones estratégicas basadas en el análisis, considerando cómo los resultados pueden impactar en la toma de decisiones. Asegúrate de considerar el contexto de la gráfica y la descripción proporcionada. 
          Ten en cuenta que la respuesta va a ser presentada en una web públicamente por lo que la respuesta tiene que ir adaptada a esto. No expliques el análisis, ni comentes nada de la pregunta, únicamente responde con el análisis. Si necesitas destacar alguna palabra, que sean únicamente títulos y hazlo con mayúsculas. Devuelve el análisis en un formato HTML bonito y visual para añadirlo directamente a mi codigo, No dejes espacios en blanco para insertar contenido ni nada parecido ya que no se que formato va a tener este texto cada vez que hago una llamada. Unicamente en el html va a ir la respuesta a este promt.` },
        { role: 'user', content: `Analiza las siguientes gráficas que muestran los datos de los dispositivos a través de los cuales los clientes utilizan la aplicación, segmentados por distintos parámetros, para el sitio con id ${idSite} y nombre ${getSiteName(idSite)}. Los datos son los siguientes: ${chartData}. Principalmente se están utilizando los nb_visits que son el número de visitas para mostrar los datos, pero puedes analizar el resto de datos proporcionados y en caso de encontrar algo extraño o interesante comentarlo.  
        Realiza un análisis detallado de los datos proporcionados sobre el uso de aplicaciones en diferentes plataformas, tipos de dispositivos, marcas, modelos, sistemas operativos y navegadores.

        Identifica y describe las tendencias clave en el uso de cada categoría.
        Examina las correlaciones entre las distintas categorías, como la relación entre el tipo de dispositivo y el sistema operativo utilizado.
        Analiza la distribución de los datos, enfocándote en las proporciones dominantes y marginales.
        Discute las posibles implicaciones de estas tendencias para la estrategia de desarrollo de aplicaciones, marketing, o atención al cliente.
        Ofrece recomendaciones estratégicas basadas en los hallazgos, considerando cómo optimizar la experiencia del usuario y anticipar cambios futuros en las preferencias del usuario.` }
    ];

    return interactionContext;
}