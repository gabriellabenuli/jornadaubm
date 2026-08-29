import { Outlet, useParams, Navigate } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'
import { MobileNav } from './MobileNav'

export function PageShell() {
  const { studentId } = useParams<{ studentId: string }>()
  if (studentId !== 'nicolas' && studentId !== 'joao') return <Navigate to="/" replace />

  return (
    <div className="flex min-h-screen flex-col md:flex-row">
      <AppSidebar studentId={studentId} />
      <div className="sticky top-0 z-30 flex items-center justify-center border-b border-ink/5 bg-white/90 py-3 backdrop-blur md:hidden">
        <span className="text-sm font-extrabold tracking-tight">UBM Jornada</span>
      </div>
      <main className="mx-auto w-full max-w-[1400px] flex-1 overflow-x-hidden px-4 py-6 pb-24 sm:px-6 md:px-10 md:py-10 md:pb-10">
        <Outlet />
      </main>
      <MobileNav studentId={studentId} />
    </div>
  )
}
