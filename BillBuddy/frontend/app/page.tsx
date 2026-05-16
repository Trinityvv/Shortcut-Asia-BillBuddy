import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-5xl font-bold mb-4">
        BillBuddy
      </h1>

      <p className="text-slate-400 text-lg mb-8 text-center">
        Smart group expense splitting made easy.
      </p>

      <Link
        href="/upload"
        className="
          bg-white
          text-black
          px-6
          py-3
          rounded-xl
          font-semibold
          hover:bg-zinc-200
          transition
        "
      >
        Upload Receipt
      </Link>
    </main>
  )
}
