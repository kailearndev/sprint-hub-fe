import { Link } from "@tanstack/react-router";

export default function NotFound() {
    return (
        <div className="flex items-center justify-center h-screen">
            <h1 className="text-4xl font-bold">404 - Not Found
                <Link to="/" className="text-blue-500 hover:underline ml-4">Go Home</Link>
            </h1>
        </div>
    )
}
