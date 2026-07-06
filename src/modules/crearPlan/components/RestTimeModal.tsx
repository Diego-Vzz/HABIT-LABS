import { X } from 'lucide-react';
import { RestTime } from '../types';
import { WheelPicker } from './WheelPicker';

interface RestTimeModalProps {
    isOpen: boolean;
    onClose: () => void;
    restTime: RestTime;
    onChange: (unit: 'h' | 'm' | 's', value: string) => void;
}

export function RestTimeModal({
    isOpen,
    onClose,
    restTime,
    onChange
}: RestTimeModalProps) {
    if (!isOpen) return null;

    return (
        <div
            className="fixed inset-0 bg-[#0F0F13]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={onClose}
        >
            <div
                className="bg-[#1C1C22] border border-gray-800 rounded-3xl p-6 w-full max-w-[340px] flex flex-col gap-6 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center px-1">
                    <h3 className="text-white font-bold text-lg">Tiempo de descanso</h3>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition bg-gray-800/50 hover:bg-gray-700 p-2 rounded-full"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                <div className="flex flex-col items-center justify-center bg-[#0F0F13] py-5 px-2 rounded-2xl border border-gray-800/60 relative overflow-hidden">
                    {/* Elemento decorativo: franja central para destacar la selección */}
                    <div className="absolute top-[56.5%] left-0 right-0 h-[50px] bg-[#2D264B]/30 border-y border-[#A890FE]/20 -translate-y-1/2 pointer-events-none mx-2 rounded-xl" />

                    {/* Títulos de las columnas */}
                    <div className="flex justify-between w-full px-8 text-gray-500 text-[10px] font-bold tracking-widest mb-1 z-10 uppercase">
                        <span>Horas</span>
                        <span>Min</span>
                        <span>Seg</span>
                    </div>

                    <div className="flex items-center text-4xl font-black text-white justify-between w-full px-2 z-10">
                        <WheelPicker
                            value={restTime.h}
                            onChange={(val) => onChange('h', val)}
                            max={99}
                        />
                        <span className="text-gray-700 font-normal">:</span>
                        <WheelPicker
                            value={restTime.m}
                            onChange={(val) => onChange('m', val)}
                            max={59}
                        />
                        <span className="text-gray-700 font-normal">:</span>
                        <WheelPicker
                            value={restTime.s}
                            onChange={(val) => onChange('s', val)}
                            max={59}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
