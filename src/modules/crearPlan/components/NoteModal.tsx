import { useState, useEffect } from 'react';
import { X } from 'lucide-react';

interface NoteModalProps {
    isOpen: boolean;
    initialNote: string;
    onClose: (note: string) => void;
}

export function NoteModal({ isOpen, initialNote, onClose }: NoteModalProps) {
    const [note, setNote] = useState(initialNote);

    useEffect(() => {
        if (isOpen) {
            setNote(initialNote || '');
        }
    }, [isOpen, initialNote]);

    if (!isOpen) return null;

    const handleClose = () => {
        onClose(note);
    };

    return (
        <div 
            className="fixed inset-0 bg-[#0F0F13]/80 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-in fade-in duration-200"
            onClick={handleClose}
        >
            <div 
                className="bg-[#1C1C22] border border-gray-800 rounded-3xl p-6 w-full max-w-[340px] flex flex-col gap-4 shadow-2xl"
                onClick={(e) => e.stopPropagation()}
            >
                <div className="flex justify-between items-center mb-2">
                    <h3 className="text-white font-bold text-lg">Nota de la serie</h3>
                    <button 
                        onClick={handleClose}
                        className="text-gray-400 hover:text-white transition bg-gray-800/50 hover:bg-gray-700 p-2 rounded-full"
                    >
                        <X className="size-5" />
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    <textarea
                        value={note}
                        onChange={(e) => setNote(e.target.value.slice(0, 1000))}
                        placeholder="Escribe algo sobre esta serie..."
                        className="w-full bg-[#0F0F13] text-white p-4 rounded-2xl border border-gray-800/60 focus:border-[#A890FE]/50 focus:ring-1 focus:ring-[#A890FE]/50 outline-none resize-none h-40 transition-colors placeholder:text-gray-600 text-sm leading-relaxed"
                    />
                    <div className="flex justify-end px-1">
                        <span className={`text-xs font-medium ${note.length >= 1000 ? 'text-red-400' : 'text-gray-500'}`}>
                            {note.length}/1000
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}
