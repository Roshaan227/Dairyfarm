import React, { useState } from 'react'
import { Upload, CheckCircle2 } from 'lucide-react'

const ImageUploader = ({ onUploadSuccess }) => {
  const [preview, setPreview] = useState('')

  const handleFileChange = (e) => {
    const file = e.target.files[0]
    if (!file) return

    // Limit size (e.g., under 2MB) to keep database lightweight
    if (file.size > 2 * 1024 * 1024) {
      alert('Please select an image smaller than 2MB.')
      return
    }

    const reader = new FileReader()
    reader.onloadend = () => {
      const base64String = reader.result
      setPreview(base64String)
      onUploadSuccess(base64String) // Pass Base64 string directly to form
    }
    reader.readAsDataURL(file)
  }

  return (
    <div className="space-y-2">
      <label className="block text-xs font-semibold uppercase tracking-wider text-charcoal">
        Upload Animal Photo
      </label>

      <div className="flex items-center gap-3">
        <label className="flex cursor-pointer items-center gap-2 bg-farm-green px-4 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition hover:bg-farm-green-light">
          <Upload size={16} />
          Choose Photo
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>

        {preview && (
          <div className="flex items-center gap-1.5 text-xs font-medium text-green-700">
            <CheckCircle2 size={16} />
            Photo Selected
          </div>
        )}
      </div>

      {preview && (
        <div className="mt-2 h-24 w-24 overflow-hidden border border-cream-dark">
          <img src={preview} alt="Preview" className="h-full w-full object-cover" />
        </div>
      )}
    </div>
  )
}

export default ImageUploader