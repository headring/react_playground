import Link from "next/link";
import Feed from "./_components/Feed";

export default function Page() {
  return (
    <>
      <header className="flex justify-between py-2 px-4">
        <div className="text-main-green text-2xl font-semibold">Conduit</div>
        <nav className="flex gap-2 items-center">
          <Link href="/">Home</Link>
          <Link href="/login">sign</Link>
          <Link href="/register">sign up</Link>
        </nav>
      </header>
      <div className="bg-main-green text-white flex flex-col justify-center items-center p-8">
        <div className="font-bold text-4xl">conduit</div>
        <div>A place to share your React knowledge</div>
      </div>
      <Feed />
    </>
  );
}
