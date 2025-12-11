export default function ErrorsPage({ status, message }) {
    const titles = {
        404: "Page Not Found",
        500: "Server Error",
        403: "Forbidden",
        401: "Unauthorized",
        419: "Page Expired"
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center text-center">
            <h1 className="text-7xl font-bold">{status}</h1>
            <p className="text-2xl mt-2">{titles[status] || "Error"}</p>
            
            {message && (
                <p className="text-gray-500 mt-3">{message}</p>
            )}

            <a
                href="/"
                className="mt-6 px-4 py-2 bg-black text-white rounded-lg"
            >
                Go Home
            </a>
        </div>
    );
}
