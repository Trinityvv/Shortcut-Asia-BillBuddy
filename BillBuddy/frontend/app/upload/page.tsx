"use client"

import { useState } from "react"

export default function UploadPage() {
  const [image, setImage] = useState<string | null>(null)

  const handleImageUpload = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files?.[0]

    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setImage(imageUrl)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Upload Receipt
      </h1>

      <label className="border-2 border-dashed border-zinc-700 rounded-2xl p-20 text-center flex flex-col items-center justify-center cursor-pointer hover:border-zinc-500 transition">
        
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleImageUpload}
        />

        {image ? (
          <img
            src={image}
            alt="Receipt Preview"
            className="max-h-[500px] rounded-xl"
          />
        ) : (
          <p className="text-zinc-400">
            Click to upload receipt image
          </p>
        )}
      </label>
    </main>
  )
}