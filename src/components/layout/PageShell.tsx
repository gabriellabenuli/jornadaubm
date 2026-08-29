import { Outlet, useParams, Navigate } from 'react-router-dom'
import { AppSidebar } from './AppSidebar'

export function PageShell() {
  const { studentId } = useParams<{ studentId: string }>()
  if (studentId !== 'nicolas' && studentId !== 'joao') return <Navigate to="/" replace />

  return (
    <div className="flex min-h-screen">
      <AppSidebar studentId={studentId} />
      <main className="mx-auto w-full max-w-[1400px] flex-1 px-10 py-10">
        <Outlet />
      </main>
    </div>
  )
}
