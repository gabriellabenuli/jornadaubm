import { useRef } from 'react'
import { Camera } from 'lucide-react'

function resizeToDataUrl(file: File, size = 256): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = new Image()
    const reader = new FileReader()
    reader.onerror = reject
    reader.onload = () => {
      img.onerror = reject
      img.onload = () => {
        const canvas = document.createElement('canvas')
        canvas.width = size
        canvas.height = size
        const ctx = canvas.getContext('2d')
        if (!ctx) return reject(new Error('no canvas context'))
        const scale = Math.max(size / img.width, size / img.height)
        const w = img.width * scale
        const h = img.height * scale
        ctx.drawImage(img, (size - w) / 2, (size - h) / 2, w, h)
        resolve(canvas.toDataURL('image/jpeg', 0.85))
      }
      img.src = reader.result as string
    }
    reader.readAsDataURL(file)
  })
}

export function AvatarUpload({
  name,
  color,
  photoUrl,
  onChange,
  size = 'lg',
}: {
  name: string
  color: string
  photoUrl: string | null
  onChange: (dataUrl: string) => void
  size?: 'sm' | 'lg'
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const dimension = size === 'lg' ? 'h-16 w-16 text-2xl' : 'h-11 w-11 text-base'

  async function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0]
    if (!file) return
    const dataUrl = await resizeToDataUrl(file)
    onChange(dataUrl)
    e.target.value = ''
  }

  return (
    <div
      className={`group relative shrink-0 ${dimension} cursor-pointer overflow-hidden rounded-full`}
      onClick={(e) => {
        e.stopPropagation()
        inputRef.current?.click()
      }}
    >
      {photoUrl ? (
        <img src={photoUrl} alt={name} className="h-full w-full object-cover" />
      ) : (
        <div
          className="flex h-full w-full items-center justify-center font-bold text-white"
          style={{ backgroundColor: color }}
        >
          {name.slice(0, 1)}
        </div>
      )}

      <div className="absolute inset-0 flex items-center justify-center bg-ink/0 opacity-0 transition-all group-hover:bg-ink/40 group-hover:opacity-100">
        <Camera size={size === 'lg' ? 18 : 14} className="text-white" />
      </div>

      <input ref={inputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
    </div>
  )
}
