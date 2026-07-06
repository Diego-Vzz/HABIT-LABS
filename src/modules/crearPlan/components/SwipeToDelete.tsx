import React, { useState, useRef } from 'react';
import { Trash2 } from 'lucide-react';

interface SwipeToDeleteProps {
    children: React.ReactNode;
    onDelete: () => void;
    disabled?: boolean;
}

export function SwipeToDelete({ children, onDelete, disabled = false }: SwipeToDeleteProps) {
    const [offsetX, setOffsetX] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const startXRef = useRef<number | null>(null);
    const currentXRef = useRef<number | null>(null);
    
    // Umbral de eliminación: cuánto debe desplazarse hacia la izquierda (en px) para que se elimine
    const SWIPE_THRESHOLD = -70;
    const MAX_SWIPE = -100;

    const handleTouchStart = (e: React.TouchEvent | React.MouseEvent) => {
        if (disabled) return;
        setIsDragging(true);
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        startXRef.current = clientX;
        currentXRef.current = clientX;
    };

    const handleTouchMove = (e: React.TouchEvent | React.MouseEvent) => {
        if (disabled || !isDragging || startXRef.current === null) return;
        const clientX = 'touches' in e ? e.touches[0].clientX : (e as React.MouseEvent).clientX;
        currentXRef.current = clientX;
        
        const diff = clientX - startXRef.current;
        // Solo permitir arrastrar hacia la izquierda
        if (diff < 0) {
            setOffsetX(Math.max(diff, MAX_SWIPE));
        } else {
            setOffsetX(0);
        }
    };

    const handleTouchEnd = () => {
        if (disabled || !isDragging) return;
        setIsDragging(false);
        
        if (offsetX <= SWIPE_THRESHOLD) {
            // Completar el swipe y llamar a borrar
            setOffsetX(MAX_SWIPE);
            setTimeout(() => {
                onDelete();
                // Resetear el estado internamente por si el componente padre no desmonta este componente
                setOffsetX(0);
            }, 200);
        } else {
            // Cancelar swipe, regresar a la posición 0
            setOffsetX(0);
        }
        
        startXRef.current = null;
        currentXRef.current = null;
    };

    return (
        <div className="relative w-full overflow-hidden rounded-xl touch-pan-y">
            {/* Fondo rojo indicador de eliminar */}
            <div 
                className="absolute inset-0 bg-red-500 flex items-center justify-end px-5 transition-opacity duration-200"
                style={{ opacity: offsetX < 0 ? 1 : 0 }}
            >
                <Trash2 className="size-5 text-white" />
            </div>
            
            {/* Contenido (la fila) */}
            <div
                className="relative bg-[#18181B] z-10 w-full"
                style={{
                    transform: `translateX(${offsetX}px)`,
                    transition: isDragging ? 'none' : 'transform 0.25s cubic-bezier(0.2, 0.8, 0.2, 1)'
                }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleTouchStart}
                onMouseMove={handleTouchMove}
                onMouseUp={handleTouchEnd}
                onMouseLeave={handleTouchEnd}
            >
                {children}
            </div>
        </div>
    );
}
