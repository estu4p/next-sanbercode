import Link from "next/link";

export default function Header() {
  return (
    // Styling dengan Tailwind CSS
    <>
      <section className="bg-amber-400 px-8 py-2 flex justify-between items-center">
        <div className="bg-black px-3 py-2 rounded-sm">
          <span className="text-white text-xl font-bold">Header</span>
        </div>
        <div className="flex gap-6">
          <Link href="/" className="cursor-pointer hover:text-white">
            Home
          </Link>
          <Link href="/profile" className="cursor-pointer hover:text-white">
            Profile
          </Link>
          <Link href="/users" className="cursor-pointer hover:text-white">
            Users
          </Link>
          <Link href="/notes" className="cursor-pointer hover:text-white">
            Notes
          </Link>
        </div>
      </section>
    </>
  );
}
