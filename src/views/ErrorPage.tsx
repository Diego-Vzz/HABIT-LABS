import { useRouteError, Link } from 'react-router-dom';
import { ROUTES } from '../shared/lib/constants/routes';

export default function ErrorPage() {
    const error = useRouteError() as { statusText?: string, message?: string };

    return (
        <div className="flex flex-col items-center justify-center h-screen w-full bg-[#18181B] text-stone-200 p-8">
            <h1 className="text-6xl font-bold mb-4">Oops!</h1>
            <p className="text-xl mb-8">Ha ocurrido un error inesperado.</p>
            <div className="bg-red-900/20 text-red-400 p-4 rounded-xl border border-red-900 mb-8">
                <p>
                    {error?.statusText || error?.message || "Página no encontrada"}
                </p>
            </div>
            <Link
                to={ROUTES.HOME}
                className="bg-white text-stone-950 font-bold px-6 py-3 rounded-full hover:bg-stone-200 transition-colors"
            >
                Volver al Inicio
            </Link>
        </div>
    );
}
