import { useNavigate } from 'react-router-dom'
import { ProfileCard } from '../components/shared/ProfileCard'
import { nicolasData } from '../data/nicolasData'
import { joaoData } from '../data/joaoData'
import { useAppStore } from '../store/useAppStore'
import type { StudentId } from '../store/useAppStore'

export default function ProfileSelect() {
  const navigate = useNavigate()
  const setActiveStudent = useAppStore((s) => s.setActiveStudent)
  const setAvatarPhoto = useAppStore((s) => s.setAvatarPhoto)
  const nicolasPhoto = useAppStore((s) => s.avatarPhoto.nicolas)
  const joaoPhoto = useAppStore((s) => s.avatarPhoto.joao)

  function handleSelect(id: StudentId) {
    setActiveStudent(id)
    navigate(`/${id}`)
  }

  return (
    <div className="flex min-h-screen flex-col items-center justify-center px-6 py-16">
      <div className="mb-12 max-w-xl text-center">
        <h1 className="text-4xl font-extrabold tracking-tight">Quem vai estudar hoje?</h1>
        <p className="mt-3 text-ink-soft">
          Cada estudante tem sua própria jornada, progresso e conquistas — independentes um do outro.
        </p>
      </div>

      <div className="grid w-full max-w-4xl grid-cols-2 gap-8">
        <ProfileCard
          data={nicolasData}
          onSelect={() => handleSelect('nicolas')}
          photoUrl={nicolasPhoto}
          onPhotoChange={(url) => setAvatarPhoto('nicolas', url)}
        />
        <ProfileCard
          data={joaoData}
          onSelect={() => handleSelect('joao')}
          photoUrl={joaoPhoto}
          onPhotoChange={(url) => setAvatarPhoto('joao', url)}
        />
      </div>
    </div>
  )
}
