import { Link } from "@remix-run/react";

export default function Header() {
    return <header className="h-12 bg-sky-600 text-white flex items-center p-4 shadow">
        <Link to="/" className="font-bold text-xl">Search Companies</Link>
    </header>
}