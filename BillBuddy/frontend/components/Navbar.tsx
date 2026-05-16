import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="
      border-b
      border-zinc-800
      bg-[#0b0f0c]
      px-8
      py-3
      text-white
    ">
      <div className="
        flex
        items-center
        justify-between
      ">
        <Link
          href="/"
          className="
            text-lg
            font-bold
            text-zinc-50
          "
        >
          BillBuddy
        </Link>

        <div className="flex items-center gap-2">
          <Link
            href="/"
            className="
              rounded-md
              px-3
              py-2
              text-sm
              font-medium
              text-zinc-400
              transition
              hover:bg-zinc-900
              hover:text-zinc-100
            "
          >
            Home
          </Link>

          <Link
            href="/upload"
            className="
              rounded-md
              px-3
              py-2
              text-sm
              font-medium
              text-zinc-400
              transition
              hover:bg-zinc-900
              hover:text-zinc-100
            "
          >
            Upload
          </Link>
        </div>
      </div>
    </nav>
  )
}
