"use client"

import { useEffect, useMemo, useState } from "react"
import { mockReceipt } from "@/data/mockReceipt"
import { Card } from "@/components/ui/card"
import { getFoodImage } from "@/services/getFoodImage"

const participants = ["Andrian", "Jason", "Sarah"]

export default function ReceiptPage() {
  const [assignments, setAssignments] = useState<Record<number, string>>({})
  const [images, setImages] = useState<Record<number, string>>({})

  const handleAssign = (itemId: number, person: string) => {
    setAssignments((prev) => ({
      ...prev,
      [itemId]: person,
    }))
  }

  const totals = useMemo(() => {
    const totals: Record<string, number> = {}

    mockReceipt.forEach((item) => {
      const assignedPerson = assignments[item.id]

      if (assignedPerson) {
        totals[assignedPerson] = (totals[assignedPerson] || 0) + item.price
      }
    })

    return totals
  }, [assignments])

  const totalEntries = Object.entries(totals)

  useEffect(() => {
    async function loadImages() {
      const imageMap: Record<number, string> = {}

      for (const item of mockReceipt) {
        const image = await getFoodImage(item.name)
        imageMap[item.id] = image
      }

      setImages(imageMap)
    }

    loadImages()
  }, [])

  return (
    <main className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold mb-8">
        Receipt Items
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockReceipt.map((item) => (
          <Card
            key={item.id}
            className="bg-zinc-950 border-zinc-800 overflow-hidden text-white"
          >
            <div className="h-48 bg-zinc-800 overflow-hidden">
              {images[item.id] ? (
                <img
                  src={images[item.id]}
                  alt={item.name}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-zinc-500">
                  Loading...
                </div>
              )}
            </div>

            <div className="p-5 space-y-4">
              <div>
                <h2 className="text-xl font-semibold text-white">
                  {item.name}
                </h2>

                <p className="text-zinc-400">
                  RM {item.price.toFixed(2)}
                </p>
              </div>

              <select
                value={assignments[item.id] || ""}
                onChange={(e) =>
                  handleAssign(item.id, e.target.value)
                }
                className="w-full bg-zinc-900 border border-zinc-700 rounded-lg px-4 py-2"
              >
                <option value="">Assign Person</option>

                {participants.map((person) => (
                  <option key={person} value={person}>
                    {person}
                  </option>
                ))}
              </select>
            </div>
          </Card>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-3xl font-bold mb-6">
          Bill Summary
        </h2>

        {totalEntries.length > 0 ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {totalEntries.map(([person, total]) => (
              <Card
                key={person}
                className="bg-zinc-950 border-zinc-800 p-5 text-white"
              >
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-xl font-semibold">
                    {person}
                  </h3>

                  <p className="text-green-400 font-bold text-lg">
                    RM {total.toFixed(2)}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <Card className="bg-zinc-950 border-zinc-800 p-5 text-zinc-400">
            Assign receipt items to see each person&apos;s total.
          </Card>
        )}
      </section>
    </main>
  )
}
