import { useRef, useEffect, useState } from 'react';

interface WheelPickerProps {
    value: string;
    onChange: (val: string) => void;
    max: number;
}

export function WheelPicker({ value, onChange, max }: WheelPickerProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const itemHeight = 50; // pixels, coincide con la altura de cada elemento
    const [activeIndex, setActiveIndex] = useState(parseInt(value, 10));
    const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

    // Generar opciones (ej: ['00', '01', ..., '59'])
    const options = Array.from({ length: max + 1 }, (_, i) => i.toString().padStart(2, '0'));

    const handleScroll = () => {
        if (!containerRef.current) return;
        const scrollY = containerRef.current.scrollTop;
        const index = Math.round(scrollY / itemHeight);

        if (index !== activeIndex && index >= 0 && index <= max) {
            setActiveIndex(index);
        }

        // Lógica de debounce para reportar el valor final al padre solo cuando termina de scrollear
        if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
        scrollTimeout.current = setTimeout(() => {
            const finalIndex = Math.round(containerRef.current!.scrollTop / itemHeight);
            const formatted = Math.max(0, Math.min(max, finalIndex)).toString().padStart(2, '0');
            if (formatted !== value) {
                onChange(formatted);
            }
        }, 150);
    };

    // Ajustar posición inicial sin animación
    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.scrollTop = parseInt(value, 10) * itemHeight;
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Reaccionar a cambios externos en la propiedad value
    useEffect(() => {
        const intVal = parseInt(value, 10);
        if (intVal !== activeIndex && containerRef.current) {
            containerRef.current.scrollTo({ top: intVal * itemHeight, behavior: 'smooth' });
            setActiveIndex(intVal);
        }
    }, [value]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div
            ref={containerRef}
            className="h-[150px] w-16 overflow-y-auto overflow-x-hidden snap-y snap-mandatory scroll-smooth relative [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] scrollbar-none cursor-grab active:cursor-grabbing"
            onScroll={handleScroll}
        >
            {/* Espaciado inicial para centrar el primer elemento */}
            <div style={{ height: itemHeight }} className="shrink-0" />

            {options.map((opt, i) => {
                const distance = Math.abs(activeIndex - i);
                const scale = distance === 0 ? 1.3 : distance === 1 ? 0.9 : 0.7;
                const opacity = distance === 0 ? 1 : distance === 1 ? 0.4 : 0.15;
                const color = distance === 0 ? '#A890FE' : '#FFFFFF';

                return (
                    <div
                        key={opt}
                        onClick={() => {
                            if (containerRef.current) {
                                containerRef.current.scrollTo({ top: i * itemHeight, behavior: 'smooth' });
                            }
                        }}
                        className="flex items-center justify-center font-black transition-all duration-200 snap-center shrink-0 cursor-pointer"
                        style={{
                            height: itemHeight,
                            transform: `scale(${scale})`,
                            opacity,
                            color,
                            fontSize: '22px'
                        }}
                    >
                        {opt}
                    </div>
                );
            })}

            {/* Espaciado final para centrar el último elemento */}
            <div style={{ height: itemHeight }} className="shrink-0" />
        </div>
    );
}
