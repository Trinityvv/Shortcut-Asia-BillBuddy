"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"

import {
  collection,
  addDoc,
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

      // OCR Backend
      const data =
        await uploadReceipt(selectedFile)

      // Firebase Session
      const docRef = await addDoc(
        collection(db, "sessions"),
        {
          items: data.items,
          createdAt: Date.now(),
        }
      )

      // Redirect To Collaborative Session
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
      bg-black
      text-white
      px-6
      py-12
    ">
      <div className="
        max-w-2xl
        mx-auto
      ">

        <h1 className="
          text-5xl
          font-bold
          mb-3
        ">
          Scan Your Receipt
        </h1>

        <p className="
          text-zinc-400
          mb-10
        ">
          Upload a receipt and split
          bills collaboratively.
        </p>

        <div className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-6
        ">

          <label
            htmlFor="receipt-upload"
            className="
              flex
              flex-col
              items-center
              justify-center
              border-2
              border-dashed
              border-zinc-700
              rounded-2xl
              p-14
              cursor-pointer
              hover:border-white
              transition
            "
          >

            <div className="
              text-6xl
              mb-4
            ">
              📸
            </div>

            <p className="
              text-2xl
              font-semibold
              mb-2
            ">
              Upload Receipt
            </p>

            <p className="
              text-zinc-400
              text-sm
            ">
              Click here to choose
              an image
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
            <div className="mt-8">

              <p className="
                mb-3
                text-zinc-400
              ">
                Receipt Preview
              </p>

              <img
                src={previewUrl}
                alt="Preview"
                className="
                  w-full
                  rounded-2xl
                  border
                  border-zinc-800
                  max-h-[500px]
                  object-cover
                "
              />

            </div>
          )}

          {error && (
            <p className="
              text-red-500
              mt-6
            ">
              {error}
            </p>
          )}

          <button
            onClick={handleUpload}
            disabled={loading}
            className="
              mt-8
              w-full
              bg-white
              text-black
              py-4
              rounded-2xl
              font-semibold
              text-lg
              hover:bg-zinc-200
              transition
              disabled:opacity-50
            "
          >
            {loading
              ? "Processing Receipt..."
              : "Scan Receipt"}
          </button>

        </div>
      </div>
    </div>
  )
}