import Link
 from "next/link";
export default function Home() {
  return (
    <main>
      <h1>Home</h1>
      <Link href="/sign_up"> Sign Up </Link>
    </main>
  );
}
