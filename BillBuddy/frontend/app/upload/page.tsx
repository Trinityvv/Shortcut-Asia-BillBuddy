"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { FileImage, Loader2, UploadCloud } from "lucide-react"

import {
  addDoc,
  collection,
} from "firebase/firestore"

import { db } from "@/lib/firebase"
import { uploadReceipt } from "@/services/uploadReceipt"

export default function UploadPage() {
  const router = useRouter()

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null)

  const [previewUrl, setPreviewUrl] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0]

    if (!file) return

    setSelectedFile(file)

    setPreviewUrl(
      URL.createObjectURL(file)
    )
  }

  const handleUpload = async () => {
    if (!selectedFile) {
      setError("Please select a receipt image")
      return
    }

    try {
      setLoading(true)
      setError("")

      const data =
        await uploadReceipt(selectedFile)

      const docRef = await addDoc(
        collection(db, "sessions"),
        {
          items: data.items,
          createdAt: Date.now(),
        }
      )

      router.push(
        `/session/${docRef.id}`
      )

    } catch (err) {
      console.error(err)

      setError(
        "Failed to process receipt"
      )

    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="
      min-h-screen
      bg-[#080c09]
      px-6
      py-10
      text-zinc-100
    ">
      <div className="
        mx-auto
        max-w-3xl
      ">

        <div className="
          mb-6
          max-w-2xl
        ">
          <div>
            <p className="
              mb-2
              text-sm
              font-medium
              text-emerald-400
            ">
              Upload
            </p>

            <h1 className="
              text-3xl
              font-semibold
              leading-tight
              text-zinc-50
            ">
              Scan Your Receipt
            </h1>

            <p className="
              mt-2
              max-w-xl
              text-sm
              leading-6
              text-zinc-500
            ">
              Choose a receipt photo and create a shared session for
              your group.
            </p>
          </div>
        </div>

        <div className="
          max-w-2xl
          rounded-lg
          border
          border-zinc-800
          bg-[#0d130f]
          p-4
        ">

          <label
            htmlFor="receipt-upload"
            className="
              flex
              cursor-pointer
              flex-col
              items-center
              justify-center
              rounded-md
              border
              border-dashed
              border-zinc-700
              bg-[#090d0a]
              px-6
              py-12
              text-center
              transition
              hover:border-emerald-600
              hover:bg-[#0b100c]
            "
          >

            <div className="
              mb-4
              flex
              h-12
              w-12
              items-center
              justify-center
              rounded-md
              border
              border-zinc-800
              bg-[#0d130f]
              text-emerald-400
            ">
              <FileImage size={24} />
            </div>

            <p className="
              mb-1
              text-base
              font-semibold
              text-zinc-100
            ">
              Drop in a receipt image
            </p>

            <p className="
              text-sm
              text-zinc-500
            ">
              Click to browse from your device
            </p>

            <input
              id="receipt-upload"
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
            />

          </label>

          {previewUrl && (
            <div className="
              mt-6
              border-t
              border-zinc-800
              pt-4
            ">

              <p className="
                mb-3
                text-sm
                font-medium
                text-zinc-400
              ">
                Receipt Preview
              </p>

              <img
                src={previewUrl}
                alt="Preview"
                className="
                  max-h-[500px]
                  w-full
                  rounded-md
                  border
                  border-zinc-800
                  object-cover
                "
              />

            </div>
          )}

          {error && (
            <p className="
              mt-6
              rounded-md
              border
              border-red-400/20
              bg-red-950/30
              px-4
              py-3
              text-red-200
            ">
              {error}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="
              mt-6
              flex
              w-full
              items-center
              justify-center
              gap-2
              rounded-md
              bg-emerald-500
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-emerald-400
              disabled:cursor-not-allowed
              disabled:opacity-50
            "
          >
            {loading ? (
              <>
                <Loader2
                  size={20}
                  className="animate-spin"
                />
                Processing Receipt...
              </>
            ) : (
              <>
                <UploadCloud size={20} />
                Scan Receipt
              </>
            )}
          </button>

        </div>
      </div>
    </div>
  )
}
