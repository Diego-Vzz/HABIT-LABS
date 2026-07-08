# HABITLABS

## ¿De que trata esta aplicación?
La función de la aplicación es ayudar a los usuarios a tener un mayor control sobre sus hábitos personales. A través de su uso, podrán desarrollar hábitos más saludables y alcanzar su máximo potencial.

# ¿Cuáles son sus funciones principales?

> [!NOTE] **Objetivo de la funcionalidad:** El propósito de este módulo es brindar al usuario un control completo sobre sus entrenamientos, permitiéndole registrar su actividad física, monitorear su progreso, visualizar sus récords personales y recibir recomendaciones inteligentes que le ayuden a alcanzar sus objetivos de forma más eficiente.
> 
### Opción 1 **Entrenamiento**
- **Características principales:**
- **Registro de entrenamientos:** El usuario podrá registrar cada sesión de entrenamiento, incluyendo los ejercicios realizados, series, repeticiones, peso utilizado y tiempos de descanso.
- **Seguimiento del progreso:** La aplicación almacenará el historial de entrenamientos para que el usuario pueda visualizar su evolución a lo largo del tiempo y medir su rendimiento.
- **PR Tool (Personal Records):** La aplicación identificará y registrará automáticamente los mejores levantamientos o marcas personales del usuario en cada ejercicio, permitiéndole conocer sus récords y compararlos con entrenamientos anteriores.
- **Historial de volumen de entrenamiento:** El sistema calculará y mostrará el volumen de entrenamiento realizado en cada sesión y por ejercicio, considerando información como:
	- Series realizadas.
	- Repeticiones por serie.
	- Peso utilizado (kg).
	- Volumen total (Series × Repeticiones × Peso).
- **Agente inteligente personalizado:** La aplicación contará con un asistente basado en inteligencia artificial que ofrecerá recomendaciones y sugerencias adaptadas a las necesidades y objetivos del usuario.
- **Perfil personalizado:** Antes de utilizar el agente inteligente, el usuario deberá completar un cuestionario inicial con información relevante, como edad, peso, estatura, experiencia en entrenamiento, disponibilidad semanal y objetivo principal (ganar masa muscular, perder grasa, mejorar el rendimiento, entre otros). Con esta información, el sistema generará un perfil personalizado.
- **Recomendaciones de entrenamiento:** Basándose en el perfil del usuario y en su historial de progreso, el agente podrá sugerir rutinas, ajustes en el volumen o intensidad del entrenamiento y recomendaciones para mejorar el rendimiento.


> [!NOTE] **Objetivo de la funcionalidad:** El propósito de este módulo es proporcionar al usuario un control integral sobre su alimentación, permitiéndole conocer el valor nutricional de lo que consume, registrar su ingesta diaria, establecer metas nutricionales y recibir recomendaciones inteligentes que favorezcan el cumplimiento de sus objetivos de salud y bienestar.

### Opción 2 **Nutrición**
- **Características principales:**
	- **Análisis nutricional mediante inteligencia artificial:** El usuario podrá ingresar un alimento mediante texto o imagen para que la aplicación estime su contenido nutricional, incluyendo calorías, proteínas, carbohidratos, grasas y otros nutrientes relevantes.
	- **Registro diario de alimentos:** La aplicación permitirá registrar los alimentos consumidos durante el día, creando un historial de la alimentación del usuario.
	- **Seguimiento de la ingesta nutricional:** Con base en los alimentos registrados, la aplicación calculará el consumo diario de calorías y macronutrientes, mostrando el progreso respecto a los objetivos establecidos.
	- **Definición de objetivos nutricionales:** El usuario podrá establecer manualmente sus metas diarias de calorías, proteínas, carbohidratos y grasas. Como alternativa, la aplicación podrá calcular automáticamente estos objetivos a partir de información como edad, peso, estatura, sexo, nivel de actividad física y objetivo personal (pérdida de peso, mantenimiento o ganancia de masa muscular).
	- **Recomendaciones personalizadas:** A partir de los objetivos nutricionales y del historial de consumo, la aplicación ofrecerá recomendaciones para ayudar al usuario a mantener una dieta acorde con sus metas.
	- **Generación de recetas:** La aplicación sugerirá recetas equilibradas que se ajusten a los requerimientos nutricionales del usuario, facilitando el cumplimiento de sus objetivos diarios de calorías y macronutrientes.

[^1]

[^1]: Las funcionalidades presentadas corresponden a una primera propuesta de la a y podrán ampliarse o modificarse durante las siguientes etapas del proyecto. Se realizará una investigación y un análisis de las necesidades de los usuarios para identificar nuevas funcionalidades, así como para evaluar cuáles de las opciones actuales deben mejorarse, incorporarse o eliminarse.


---

## Proyectos necesarios para completar la aplicación
- **Frontend (Aplicación móvil):** Desarrollado con **React Native**, encargado de la interfaz de usuario y la experiencia de uso en dispositivos móviles. [[habit-app/README]]
- **Backend (API):** Desarrollado con **Node.js (TS)** utilizando el framework **Fastify**, responsable de la lógica de negocio, autenticación, gestión de datos e integración con servicios externos. [[habit-api/README]]
- **Estilos de la aplicación:** Implementados con **Tailwind CSS** (NativeWind para React Native), con el objetivo de mantener una interfaz consistente, escalable y fácil de mantener.

## Requisitos y Restricciones
**Reglas estrictas que la IA no debe romper.**
- **Regla 1:** Usar el principio de CLEAN CODE.
- **Regla 2:** Usar estrictamente esta paleta de colores [[colores]].
- **Regla 3:** Todo cambio realizado durante el desarrollo del proyecto deberá registrarse en el historial de cambios correspondiente changelog.md.
- **Regla 4:** Todas las animaciones implementadas en la aplicación deberán desarrollarse utilizando la librería React Native Reanimated, con el fin de garantizar un rendimiento óptimo, una experiencia de usuario fluida y mantener la consistencia en el desarrollo del proyecto.