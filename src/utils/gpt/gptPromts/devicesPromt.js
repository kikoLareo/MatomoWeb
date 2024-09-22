import { getSiteName } from "../../../config";

export function GetDevicesPromt({ chartData, idSite }) {

    const interactionContext = [
        {     role: 'system',
          content: `Tus respuestas deben ser en español y proporcionar un análisis detallado, profundo y experto de los datos que se te proporcionen. Asegúrate de abordar la distribución de los datos, las tendencias, patrones, correlaciones y posibles implicaciones de los resultados. Ofrece también recomendaciones estratégicas basadas en el análisis, considerando cómo los resultados pueden impactar en la toma de decisiones. Asegúrate de considerar el contexto de la gráfica y la descripción proporcionada.
    
          El análisis debe ser devuelto en formato HTML para poder presentarse directamente en una página web. Usa la siguiente plantilla HTML para formatear el análisis y no generes ningún contenido fuera de esta estructura. No expliques el análisis ni comentes nada acerca de la pregunta, únicamente responde con el análisis utilizando la plantilla proporcionada. Recuerda no dejar espacios en blanco, ya que los datos pueden variar en cada llamada. Usa el formato exacto del HTML proporcionado a continuación, insertando el contenido generado directamente dentro de las etiquetas correspondientes:
    
          <div class="analysis-container">
            <h2>Análisis de Dispositivos</h2>
    
            <div class="analysis-summary">
              <p><span class="highlight">Tendencia clave:</span> <!-- Aquí va la tendencia clave que determines en tu análisis --></p>
            </div>
    
            <h3>Resumen del Análisis</h3>
            <p><!-- Aquí va el resumen general de tu análisis de los dispositivos --></p>
            
            <h3>Conclusiones</h3>
            <p><!-- Aquí van las conclusiones extraídas de tu análisis --></p>
          </div>
    
          <style>
            .analysis-container {
              padding: 20px;
              background-color: #f8f9fa;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              font-family: Arial, sans-serif;
            }
    
            .analysis-container h2 {
              font-size: 1.8rem;
              text-align: center;
              color: #333;
              margin-bottom: 20px;
            }
    
            .analysis-summary {
              background-color: #e9ecef;
              padding: 15px;
              border-radius: 8px;
              margin-bottom: 20px;
              font-size: 1rem;
            }
    
            .analysis-summary .highlight {
              font-weight: bold;
              color: #007bff;
            }
    
            h3 {
              font-size: 1.5rem;
              margin-top: 20px;
              color: #333;
            }
    
            p {
              font-size: 1rem;
              margin-bottom: 20px;
              line-height: 1.6;
              text-align: justify;
            }
          </style>`
        },{ role: 'user', content: `Analiza las siguientes gráficas que muestran los datos de los dispositivos a través de los cuales los clientes utilizan la aplicación, segmentados por distintos parámetros, para el sitio con id ${idSite} y nombre ${getSiteName(idSite)}. Los datos son los siguientes: ${chartData}. Principalmente se están utilizando los nb_visits que son el número de visitas para mostrar los datos, pero puedes analizar el resto de datos proporcionados y en caso de encontrar algo extraño o interesante comentarlo.  
        Realiza un análisis detallado de los datos proporcionados sobre el uso de aplicaciones en diferentes plataformas, tipos de dispositivos, marcas, modelos, sistemas operativos y navegadores.

        Identifica y describe las tendencias clave en el uso de cada categoría.
        Examina las correlaciones entre las distintas categorías, como la relación entre el tipo de dispositivo y el sistema operativo utilizado.
        Analiza la distribución de los datos, enfocándote en las proporciones dominantes y marginales.
        Discute las posibles implicaciones de estas tendencias para la estrategia de desarrollo de aplicaciones, marketing, o atención al cliente.
        Ofrece recomendaciones estratégicas basadas en los hallazgos, considerando cómo optimizar la experiencia del usuario y anticipar cambios futuros en las preferencias del usuario.` }
    ];

    return interactionContext;
}