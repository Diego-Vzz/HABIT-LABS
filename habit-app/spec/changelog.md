# Historial de Cambios (Changelog)

## [08-07-2026] Actualización de Animaciones (Cumplimiento de Regla 4)
- **Archivos Modificados:** 
  - `components/hello-wave.tsx`
  - `app/crear-plan.tsx` (posteriormente movido a `modules/crearPlan/screens/CrearPlanScreen.tsx`)
- **Cambios Realizados:**
  - En `hello-wave.tsx`: Se eliminaron las propiedades de animación tipo CSS (`animationName`, `animationIterationCount`, `animationDuration`) que dependían de la implementación web/interna. Se reemplazaron por `useSharedValue`, `withRepeat`, `withSequence` y `withTiming` nativos de `react-native-reanimated`.
  - En `crear-plan.tsx`: Se eliminó el uso de la clase `transition` de NativeWind/Tailwind para el botón de tipos de serie (Normal, Calentamiento, Fallo). Se extrajo la lógica a un nuevo componente `AnimatedSetTypeButton` que utiliza explícitamente `react-native-reanimated` (usando `useAnimatedStyle` e `interpolateColor`) para animar los cambios de color de fondo y borde de manera nativa.
- **Motivo de la Modificación:** Solicitud explícita del usuario para garantizar el estricto cumplimiento de la **Regla 4** ("Todas las animaciones implementadas en la aplicación deberán desarrollarse utilizando la librería React Native Reanimated"), optimizando así el rendimiento y asegurando consistencia.

## [08-07-2026] Limpieza de Componentes no Utilizados
- **Archivos Eliminados:** Directorio completo `components/` (y su subdirectorio `components/ui/`), el cual contenía `external-link.tsx`, `haptic-tab.tsx`, `parallax-scroll-view.tsx`, `themed-text.tsx`, `themed-view.tsx`, `collapsible.tsx`, e `icon-symbol.tsx`.
- **Cambios Realizados:** Se eliminaron permanentemente estos archivos.
- **Motivo de la Modificación:** Solicitud del usuario para verificar si dichos componentes estaban siendo utilizados por el directorio `app/`. Tras un análisis exhaustivo de todas las referencias en el proyecto, se comprobó que no se empleaban en ninguna parte de la aplicación (solo se referenciaban entre sí), por lo que se procedió a eliminarlos para mantener el proyecto limpio y sin código muerto.

## [08-07-2026] Reestructuración Arquitectónica del Directorio de Enrutamiento
- **Archivos Modificados / Movidos:**
  - `app/crear-plan.tsx` ➔ Movido a `modules/crearPlan/screens/CrearPlanScreen.tsx`
  - `app/(tabs)/index.tsx` ➔ Movido a `modules/home/screens/HomeScreen.tsx`
  - `app/(tabs)/pr-tool.tsx` ➔ Movido a `modules/prTool/screens/PrToolScreen.tsx`
- **Archivos Refactorizados:**
  - `app/crear-plan.tsx`: Reemplazado por `export { default } from '@/modules/crearPlan/screens/CrearPlanScreen';`
  - `app/(tabs)/index.tsx`: Reemplazado por `export { default } from '@/modules/home/screens/HomeScreen';`
  - `app/(tabs)/pr-tool.tsx`: Reemplazado por `export { default } from '@/modules/prTool/screens/PrToolScreen';`
- **Cambios Realizados:** Toda la lógica de interfaz de usuario, estado e implementaciones complejas se extrajo de los archivos en el directorio `app/` hacia la estructura orientada a funcionalidades en `modules/`. Se actualizaron las importaciones relativas (p. ej., cambiando `../modules/crearPlan` por `..` dentro del nuevo `CrearPlanScreen.tsx`). El directorio `app/` ahora solo cumple funciones de enrutamiento (exportando las pantallas).
- **Motivo de la Modificación:** El usuario solicitó reorganizar la estructura del proyecto siguiendo las buenas prácticas de arquitectura y mantenibilidad. Esto cumple con la convención de *Expo Router* que desaconseja la ubicación conjunta de lógica de UI dentro del directorio `app/` para promover escalabilidad y limpieza.

## [08-07-2026] Corrección de Exportaciones en el Enrutamiento (Fast Refresh & TS)
- **Archivos Modificados:**
  - `app/crear-plan.tsx`
  - `app/(tabs)/index.tsx`
  - `app/(tabs)/pr-tool.tsx`
- **Cambios Realizados:** Se reemplazó la sintaxis `export { default } from '@/modules/...'` por importaciones explícitas con rutas relativas seguidas de una exportación (p. ej., `import HomeScreen from '../../modules/home/screens/HomeScreen'; export default HomeScreen;`).
- **Motivo de la Modificación:** El usuario reportó un error al inicializar las rutas. Esto se debía a que la sintaxis de reexportación directa usando el alias `@/` puede generar conflictos con el sistema *Fast Refresh* de Expo y con la configuración `isolatedModules` de TypeScript. Se aplicó esta refactorización para garantizar una compatibilidad del 100% con el empaquetador (Metro) y el entorno de desarrollo.

## [08-07-2026] Corrección de Estilos (NativeWind/Tailwind)
- **Archivos Modificados:** `tailwind.config.js`
- **Cambios Realizados:** Se agregó el directorio `./modules/**/*.{js,jsx,ts,tsx}` a la matriz `content` de la configuración de Tailwind CSS.
- **Motivo de la Modificación:** El usuario reportó que los estilos dejaron de aplicarse después de la reestructuración. La causa fue que Tailwind no estaba analizando la nueva carpeta `modules/` (donde se movieron todas las vistas) en busca de clases CSS. Al agregar esta ruta a la configuración de contenido, NativeWind volvió a procesar y aplicar correctamente todos los estilos sin afectar ninguna funcionalidad existente.

## [08-07-2026] Unificación de Ícono de "Serie de Calentamiento"
- **Archivos Modificados:** `modules/crearPlan/components/SetTypeModal.tsx`
- **Cambios Realizados:** Se reemplazó el ícono `BatteryCharging` por `Flame` (de `lucide-react-native`) en la opción correspondiente a "Serie de calentamiento" dentro del modal.
- **Motivo de la Modificación:** El usuario reportó una inconsistencia visual entre el ícono mostrado en el listado de series de la pantalla (donde ya se utilizaba el ícono de la llama) y el ícono en el selector de tipo de serie. La corrección se hizo para que el ícono represente adecuadamente el concepto de "calentamiento" (fuego/llama) y mantenga la coherencia visual en toda la aplicación.

## [08-07-2026] Mejora de UX: Auto-scroll al añadir serie
- **Archivos Modificados:** `modules/crearPlan/screens/CrearPlanScreen.tsx`
- **Cambios Realizados:**
  - Se importaron y agregaron los hooks `useRef` y `useState`.
  - Se vinculó una referencia (`scrollViewRef`) al componente `<ScrollView>` principal de la vista.
  - Se implementó un `useEffect` que observa la cantidad de series del ejercicio activo. Al detectar un incremento en la cantidad de series, activa un desplazamiento animado automático al final de la lista (`scrollToEnd({ animated: true })`) tras un breve retraso (`100ms`).
- **Motivo de la Modificación:** Como el botón de "Añadir serie" se movió fuera del flujo de desplazamiento para que quedara fijo en la parte inferior, las nuevas series creadas podían quedar fuera de la pantalla, obligando al usuario a desplazarse manualmente. Esta animación suave mejora notablemente la experiencia de usuario (UX) al mantener siempre visible el bloque de la nueva serie.

## [08-07-2026] Corrección y Mejora del Selector de Tiempo de Descanso
- **Archivos Modificados:** 
  - `modules/crearPlan/components/RestTimeModal.tsx`
  - `modules/crearPlan/components/WheelPicker.tsx`
- **Cambios Realizados:**
  - En `RestTimeModal.tsx`: Se eliminó el envoltorio `TouchableWithoutFeedback` y `e.stopPropagation()` que cubría el contenido del modal. Se reemplazó por un fondo (`backdrop`) utilizando `Pressable` absoluto con `pointerEvents="box-none"` para el contenedor, permitiendo que los gestos de deslizamiento (scroll) fluyan correctamente hacia el componente hijo.
  - En `WheelPicker.tsx`: Se implementó el evento `onScrollEndDrag` para capturar el valor seleccionado incluso cuando el usuario suelta el deslizador lentamente y sin la velocidad suficiente para detonar `onMomentumScrollEnd`.
  - Se agregó un pequeño retraso (`setTimeout`) al forzar el scroll inicial para evitar conflictos imperativos con el gesto nativo del usuario mientras desliza.
- **Motivo de la Modificación:** El usuario reportó que los controles del cronómetro no respondían correctamente al intentar modificar los valores. Este problema se debía a que los toques táctiles de deslizamiento estaban siendo interceptados y devorados por el `TouchableWithoutFeedback` del modal, y en los casos donde sí pasaba, Android no disparaba los eventos de valor si el deslizamiento no llevaba fuerza ("momentum"). Con esto se garantiza una respuesta 100% fluida, animada e interactiva en la selección de tiempos.

## [08-07-2026] Mejora de Rendimiento y Escalamiento de Interfaz (UX)
- **Archivos Modificados:**
  - `modules/crearPlan/screens/CrearPlanScreen.tsx`
  - `modules/crearPlan/components/RestTimeModal.tsx`
  - `modules/crearPlan/components/NoteModal.tsx`
  - `modules/crearPlan/components/SetTypeModal.tsx`
  - `modules/crearPlan/components/ExerciseSearchModal.tsx`
- **Cambios Realizados:**
  - **Aceleración de Modales:** Se redujo la duración de todas las animaciones de entrada de 240ms/220ms a `150ms`, y las de salida a `120ms` utilizando `Easing.out(Easing.cubic)`. En el modal de búsqueda, se reemplazó `withSpring` por `withTiming` para garantizar una apertura inmediata y sin rebotes lentos.
  - **Optimización de Renderizado:** En `CrearPlanScreen.tsx`, se eliminó la dependencia de renderizado condicional abrupto para los modales (`{isOpen && <Modal/>}`). Ahora los modales siempre están en el árbol de componentes (manejando su propia visibilidad local y montaje del sistema), eliminando el infame retraso de casi 1 segundo al intentar montar un `<Modal>` nativo nuevo de golpe.
  - **Ampliación de Íconos:** Se aumentaron sustancialmente los tamaños de interacción en todo `CrearPlanScreen` para mejorar la accesibilidad visual:
    - Botón volver (`ChevronLeft`): 24 -> 30
    - Añadir ejercicio (`Plus`): 20 -> 26
    - Opciones globales (`ClipboardList`, `Trash2`): 18 -> 24
    - Íconos de fila (`Timer`, `NotebookPen`): 16 -> 24
    - Íconos de tipo de serie (fuego, rayo): 14 -> 20 (contenedor de 28x28px -> 40x40px).
- **Motivo de la Modificación:** El usuario reportó un retraso de aproximadamente un segundo al presionar íconos, animaciones no lo suficientemente fluidas y tamaños de íconos demasiado pequeños. La optimización del montaje de React Native y la aceleración de las curvas de Reanimated resuelven la sensación de lentitud, dándole un comportamiento verdaderamente nativo e instantáneo, mientras que el redimensionado asegura legibilidad y mejora el área de contacto táctil ("hitbox").

## [08-07-2026] Reescritura Profunda del Cronómetro (Rendimiento y Estabilidad)
- **Archivos Modificados:**
  - `modules/crearPlan/components/RestTimeModal.tsx` (reescrito)
  - `modules/crearPlan/components/WheelPicker.tsx` (reescrito)
  - `modules/crearPlan/screens/CrearPlanScreen.tsx`
- **Cambios Realizados:**
  - **Eliminación total del componente `<Modal>` nativo:** En `RestTimeModal.tsx`, se reemplazó el `<Modal>` de React Native por un `<View>` con posicionamiento absoluto (`StyleSheet.absoluteFillObject`) y `zIndex: 1000`. Esto elimina completamente el costo de montaje nativo del Modal (~200-500ms), ya que el overlay siempre está presente en el árbol de React. La visibilidad se controla exclusivamente mediante `pointerEvents` (`'auto'` cuando abierto, `'none'` cuando cerrado) y la animación de opacidad/translateY de Reanimated.
  - **Soporte del botón "Atrás" en Android:** Al eliminar `<Modal>`, se perdía el manejo automático de `onRequestClose`. Se agregó un `useEffect` con `BackHandler.addEventListener` que intercepta el botón de hardware cuando el modal está abierto.
  - **Corrección del bucle de valores inestables (30→29→30) en `WheelPicker.tsx`:** Se identificó que el `useEffect` que observaba el prop `value` ejecutaba `scrollTo` con animación incluso cuando el cambio provenía del propio scroll del usuario, creando un ciclo: scroll → onChange → setState → useEffect → scrollTo animado → onScroll → onChange con valor intermedio. Se implementaron tres mecanismos para romper este ciclo:
    1. `lastEmittedValue` (ref): Registra el último valor que el componente emitió. Si el nuevo `value` coincide, el `useEffect` no ejecuta ningún scroll.
    2. `isUserScrolling` (ref): Se activa en `onScrollBeginDrag` y se desactiva en `handleScrollEnd`. Mientras esté activo, el `useEffect` ignora los cambios externos de `value`.
    3. `scrollTo(ref, 0, targetY, false)`: Para cambios externos legítimos, el scroll se ejecuta sin animación (`animated: false`), evitando que `onScroll` dispare eventos intermedios.
  - **Eliminación de `setTimeout`:** El retraso artificial de 50ms en el `useEffect` del `WheelPicker` fue eliminado. Ya no es necesario porque el scroll programático no compite con el gesto del usuario gracias al `isUserScrolling` ref.
  - **Estabilización de callbacks:** Se agregó `onChangeRef` (ref) para mantener una referencia estable al callback `onChange`, evitando que los cambios de identidad del callback (por funciones arrow inline del padre) provoquen re-renders innecesarios del `ScrollView`.
  - **Memoización de opciones:** El array de opciones del picker se envolvió en `useMemo` para no recrear ~60-100 elementos en cada render.
  - **Reposicionamiento en el padre:** En `CrearPlanScreen.tsx`, los componentes `<RestTimeModal>` se movieron fuera del `<View>` interno (que tiene padding) para ser hijos directos de `<SafeAreaView>`, permitiendo que el overlay absoluto cubra correctamente toda el área visible.
- **Motivo de la Modificación:** El usuario reportó que el cronómetro seguía lento al abrirse, que los valores fluctuaban de forma inestable (ej. al seleccionar 30 segundos, saltaba brevemente a 29 y volvía a 30), y que la experiencia general no era fluida en dispositivos móviles. La causa principal era el uso del componente `<Modal>` nativo (costoso de montar) y un bucle de retroalimentación entre el estado del padre, el `useEffect` del picker, y los eventos de scroll. La reescritura completa elimina ambos problemas de raíz.
