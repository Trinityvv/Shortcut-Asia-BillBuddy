import Link from "next/link"

export default function Navbar() {
  return (
    <nav className="border-b border-zinc-800 px-8 py-4 flex gap-6 bg-black text-white">
      <Link href="/">Home</Link>
      <Link href="/upload">Upload</Link>
    </nav>
  )
}
