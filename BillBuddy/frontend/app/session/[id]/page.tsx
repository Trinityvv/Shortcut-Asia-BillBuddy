// frontend/app/session/[id]/page.tsx

"use client"

import {
  useEffect,
  useMemo,
  useState,
} from "react"

import { useParams } from "next/navigation"

import {
  doc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore"

import { db } from "@/lib/firebase"

type ReceiptItem = {
  name: string
  quantity: number
  unit_price: number
  price: number
  claims?: Record<string, number>
}

export default function SessionPage() {

  const params = useParams()

  const id = params.id as string

  const [items, setItems] =
    useState<ReceiptItem[]>([])

  const [username, setUsername] =
    useState("")

  const [nameInput, setNameInput] =
    useState("")

  // Listen to Firebase
  useEffect(() => {

    if (!id) return

    const docRef = doc(
      db,
      "sessions",
      id
    )

    const unsubscribe =
      onSnapshot(
        docRef,
        (snapshot) => {

          const data =
            snapshot.data()

          if (data) {
            setItems(data.items)
          }
        }
      )

    return () => unsubscribe()

  }, [id])

  // Join session
  const handleJoin = () => {

    if (!nameInput.trim()) return

    setUsername(nameInput)
  }

  // Total claimed quantity
  const getTotalClaimed = (
    item: ReceiptItem
  ) => {

    if (!item.claims) return 0

    return Object.values(
      item.claims
    ).reduce(
      (sum, qty) => sum + qty,
      0
    )
  }

  // Current user's claimed qty
  const getUserClaimed = (
    item: ReceiptItem
  ) => {

    return (
      item.claims?.[username] || 0
    )
  }

  // Increase claim
  const increaseClaim =
    async (
      index: number
    ) => {

      const updatedItems =
        [...items]

      const item =
        updatedItems[index]

      const totalClaimed =
        getTotalClaimed(item)

      // Prevent overclaiming
      if (
        totalClaimed >=
        item.quantity
      ) {
        return
      }

      if (!item.claims) {
        item.claims = {}
      }

      item.claims[username] =
        (
          item.claims[username] || 0
        ) + 1

      setItems(updatedItems)

      const docRef = doc(
        db,
        "sessions",
        id
      )

      await updateDoc(
        docRef,
        {
          items: updatedItems,
        }
      )
    }

  // Decrease claim
  const decreaseClaim =
    async (
      index: number
    ) => {

      const updatedItems =
        [...items]

      const item =
        updatedItems[index]

      if (
        !item.claims?.[username]
      ) {
        return
      }

      item.claims[username] -= 1

      // Remove empty claims
      if (
        item.claims[username] <= 0
      ) {
        delete item.claims[
          username
        ]
      }

      setItems(updatedItems)

      const docRef = doc(
        db,
        "sessions",
        id
      )

      await updateDoc(
        docRef,
        {
          items: updatedItems,
        }
      )
    }

  // Totals
  const totals = useMemo(() => {

    const result:
      Record<string, number> = {}

    items.forEach((item) => {

      if (!item.claims) return

      Object.entries(
        item.claims
      ).forEach(
        ([person, qty]) => {

          if (!result[person]) {
            result[person] = 0
          }

          result[person] +=
            qty *
            item.unit_price
        }
      )
    })

    return result

  }, [items])

  const copyInviteLink = async () => {

    try {

      await navigator.clipboard.writeText(
        window.location.href
      )

      alert("Invite link copied!")

    } catch (error) {

      console.error(error)

      alert("Failed to copy link")
    }
  }

  // Join screen
  if (!username) {

    return (
      <div className="
        min-h-screen
        bg-black
        text-white
        flex
        items-center
        justify-center
        px-6
      ">

        <div className="
          bg-zinc-900
          border
          border-zinc-800
          rounded-3xl
          p-8
          w-full
          max-w-md
        ">

          <h1 className="
            text-4xl
            font-bold
            mb-4
          ">
            Join Receipt
          </h1>

          <p className="
            text-zinc-400
            mb-6
          ">
            Enter your name to
            join the session.
          </p>

          <input
            type="text"
            placeholder="Your Name"
            value={nameInput}
            onChange={(e) =>
              setNameInput(
                e.target.value
              )
            }
            className="
              w-full
              bg-zinc-800
              border
              border-zinc-700
              rounded-2xl
              px-4
              py-4
              mb-4
              outline-none
            "
          />

          <button
            onClick={handleJoin}
            className="
              w-full
              bg-white
              text-black
              py-4
              rounded-2xl
              font-semibold
              hover:bg-zinc-200
              transition
            "
          >
            Join Session
          </button>

        </div>
      </div>
    )
  }

  return (
    <div className="
      min-h-screen
      bg-black
      text-white
      p-10
    ">

      <div className="
        max-w-6xl
        mx-auto
      ">

        <div className="
          flex
          justify-between
          items-center
          mb-10
        ">

          <div>

            <h1 className="
              text-5xl
              font-bold
            ">
              Shared Receipt
            </h1>

            <p className="
              text-zinc-400
              mt-2
            ">
              Collaboratively split
              bills in realtime.
            </p>

          </div>

          <button
            onClick={copyInviteLink}
            className="
              bg-white
              text-black
              px-5
              py-3
              rounded-2xl
              font-semibold
              hover:bg-zinc-200
              transition
            "
          >
            Copy Invite Link
          </button>

        </div>

        <div className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        ">

          {items.map(
            (item, index) => {

              const totalClaimed =
                getTotalClaimed(item)

              const userClaimed =
                getUserClaimed(item)

              const fullyClaimed =
                totalClaimed >=
                item.quantity

              return (

                <div
                  key={index}
                  className={`
                    rounded-2xl
                    p-6
                    border
                    transition

                    ${
                      fullyClaimed
                        ? "bg-zinc-900 border-green-500"
                        : "bg-zinc-900 border-zinc-800"
                    }
                  `}
                >

                  <h2 className="
                    text-2xl
                    font-bold
                    mb-2
                  ">
                    {item.name}
                  </h2>

                  <p className="
                    text-zinc-400
                    mb-1
                  ">
                    Total Quantity:
                    {" "}
                    {item.quantity}
                  </p>

                  <p className="
                    text-zinc-400
                    mb-4
                  ">
                    Claimed:
                    {" "}
                    {totalClaimed}
                    {" / "}
                    {item.quantity}
                  </p>

                  <p className="
                    text-xl
                    font-semibold
                    mb-6
                  ">
                    RM
                    {" "}
                    {item.unit_price.toFixed(2)}
                    {" "}
                    each
                  </p>

                  <div className="
                    flex
                    items-center
                    gap-4
                    mb-6
                  ">

                    <button
                      onClick={() =>
                        decreaseClaim(
                          index
                        )
                      }
                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-zinc-800
                        text-2xl
                        font-bold
                      "
                    >
                      -
                    </button>

                    <div className="
                      text-2xl
                      font-bold
                      w-10
                      text-center
                    ">
                      {userClaimed}
                    </div>

                    <button
                      onClick={() =>
                        increaseClaim(
                          index
                        )
                      }

                      disabled={
                        fullyClaimed
                      }

                      className="
                        w-12
                        h-12
                        rounded-xl
                        bg-white
                        text-black
                        text-2xl
                        font-bold
                        disabled:opacity-40
                      "
                    >
                      +
                    </button>

                  </div>

                  {item.claims && Object.keys(item.claims).length > 0 && (

                    <div className="
                      border-t
                      border-zinc-800
                      pt-4
                    ">

                      <p className="
                        text-sm
                        text-zinc-400
                        mb-2
                      ">
                        Claimed By
                      </p>

                      <div className="
                        space-y-2
                      ">

                        {Object.entries(
                          item.claims
                        ).map(
                          ([
                            person,
                            qty,
                          ]) => (

                            <div
                              key={person}
                              className="
                                flex
                                justify-between
                              "
                            >

                              <span>
                                {person}
                              </span>

                              <span>
                                x{qty}
                              </span>

                            </div>
                          )
                        )}

                      </div>

                    </div>
                  )}

                </div>
              )
            }
          )}

        </div>

        <div className="
          mt-14
          bg-zinc-900
          border
          border-zinc-800
          rounded-2xl
          p-6
        ">

          <h2 className="
            text-3xl
            font-bold
            mb-6
          ">
            Bill Summary
          </h2>

          <div className="
            space-y-4
          ">

            {Object.entries(
              totals
            ).map(
              ([person, total]) => (

                <div
                  key={person}
                  className="
                    flex
                    justify-between
                    border-b
                    border-zinc-800
                    pb-3
                  "
                >

                  <span>
                    {person}
                  </span>

                  <span className="
                    font-bold
                  ">
                    RM
                    {" "}
                    {total.toFixed(2)}
                  </span>

                </div>
              )
            )}

          </div>

        </div>

      </div>
    </div>
  )
}
