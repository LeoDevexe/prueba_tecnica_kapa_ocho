import Link from "next/link";

export default function HomePage() {
  return (
    <div className="animate-fade-in">
      <h1 className="text-3xl font-bold text-slate-900 dark:text-slate-100 mb-2">
        Dashboard de Proyectos
      </h1>
      <p className="text-slate-600 dark:text-slate-400 mb-8 max-w-xl">
        Gestiona tus proyectos de forma simple. Crea, lista y actualiza el estado
        de cada proyecto desde un único lugar.
      </p>
      <div className="flex flex-wrap gap-4">
        <Link
          href="/projects"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium bg-primary-600 text-white hover:bg-primary-700 dark:bg-primary-500 dark:hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2 dark:focus:ring-offset-slate-900 transition-colors"
        >
          Ver proyectos
        </Link>
        <Link
          href="/projects/new"
          className="inline-flex items-center justify-center px-6 py-3 rounded-lg font-medium border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-slate-400 transition-colors"
        >
          Nuevo proyecto
        </Link>
      </div>
    </div>
  );
}
