import Link from "next/link"
import {
  ArrowRight,
  ReceiptText,
  ScanLine,
  Users,
} from "lucide-react"

const steps = [
  {
    title: "Upload receipt",
    description: "Start with a clear photo of the bill.",
    icon: ScanLine,
  },
  {
    title: "Review items",
    description: "BillBuddy reads the receipt and groups the items.",
    icon: ReceiptText,
  },
  {
    title: "Split together",
    description: "Share the session so everyone can claim their part.",
    icon: Users,
  },
]

export default function Home() {
  return (
    <main className="
      min-h-screen
      bg-[#080c09]
      px-6
      py-12
      text-zinc-100
    ">
      <section className="
        mx-auto
        max-w-5xl
      ">
        <div className="
          grid
          gap-6
          lg:grid-cols-[minmax(0,1.1fr)_minmax(320px,0.9fr)]
          lg:items-center
        ">
          <div>
            <p className="
              mb-4
              text-sm
              font-medium
              text-emerald-400
            ">
              BillBuddy
            </p>

            <h1 className="
              max-w-2xl
              text-4xl
              font-semibold
              leading-tight
              tracking-normal
              text-zinc-50
              md:text-5xl
            ">
              A cleaner way to split shared receipts.
            </h1>

            <p className="
              mt-5
              max-w-xl
              text-base
              leading-7
              text-zinc-400
            ">
              Upload a receipt, create a session, and let your group
              claim items without passing the bill around.
            </p>

            <div className="mt-7">
              <Link
                href="/upload"
                className="
                  inline-flex
                  items-center
                  gap-2
                  rounded-md
                  bg-emerald-500
                  px-4
                  py-2.5
                  text-sm
                  font-semibold
                  text-white
                  transition
                  hover:bg-emerald-400
                "
              >
                Upload receipt
                <ArrowRight size={16} />
              </Link>
            </div>
          </div>

          <div className="
            h-full
            rounded-lg
            border
            border-zinc-800
            bg-[#0d130f]
            p-4
          ">
            <div className="space-y-3">
              {steps.map((step) => {
                const Icon = step.icon

                return (
                  <div
                    key={step.title}
                    className="
                      grid
                      grid-cols-[2rem_minmax(0,1fr)]
                      gap-3
                      rounded-md
                      border
                      border-zinc-800
                      bg-[#090d0a]
                      p-3
                    "
                  >
                    <div className="
                      flex
                      h-8
                      w-8
                      items-center
                      justify-center
                      rounded-md
                      border
                      border-zinc-800
                      bg-[#0d130f]
                    ">
                      <Icon
                        size={16}
                        className="text-emerald-400"
                      />
                    </div>

                    <div>
                      <p className="
                        text-sm
                        font-semibold
                        text-zinc-100
                      ">
                        {step.title}
                      </p>
                      <p className="
                        mt-1
                        text-sm
                        leading-6
                        text-zinc-500
                      ">
                        {step.description}
                      </p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
