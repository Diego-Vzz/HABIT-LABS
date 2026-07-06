import { X, Zap, BatteryCharging } from 'lucide-react';
import { SetType } from '../types';

interface SetTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSelectType: (type: SetType) => void;
}

export function SetTypeModal({ isOpen, onClose, onSelectType }: SetTypeModalProps) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-[#0F0F13]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200">
            <div className="bg-[#1C1C22] border border-gray-800 rounded-2xl p-4 w-full max-w-[300px] flex flex-col gap-2 shadow-2xl">
                <div className="flex justify-between items-center mb-4 px-1">
                    <h3 className="text-white font-bold">Tipo de serie</h3>
                    <button 
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition"
                    >
                        <X className="size-5" />
                    </button>
                </div>
                <button 
                    onClick={() => { onSelectType('normal'); onClose(); }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#25252c] text-gray-300 transition"
                >
                    <div className="w-8 h-8 rounded-lg bg-[#2D264B] text-[#A890FE] flex items-center justify-center font-bold text-xs">
                        N
                    </div>
                    <span className="font-medium">Serie normal</span>
                </button>
                <button 
                    onClick={() => { onSelectType('warmup'); onClose(); }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#25252c] text-orange-400 transition"
                >
                    <div className="w-8 h-8 rounded-lg bg-orange-500/20 flex items-center justify-center">
                        <BatteryCharging className="size-4" />
                    </div>
                    <span className="font-medium">Serie de calentamiento</span>
                </button>
                <button 
                    onClick={() => { onSelectType('failure'); onClose(); }}
                    className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#25252c] text-red-400 transition"
                >
                    <div className="w-8 h-8 rounded-lg bg-red-500/20 flex items-center justify-center">
                        <Zap className="size-4" />
                    </div>
                    <span className="font-medium">Ir al fallo</span>
                </button>
            </div>
        </div>
    );
}
