"use client";

import { useRouter } from "next/navigation";

export default function SignOutPage() {
  const router = useRouter();

  const handleConfirm = () => {
    localStorage.removeItem("username"); // clear login state
    router.push("/login"); // redirect to login
  };

  const handleCancel = () => {
    router.push("/home"); // go back to home
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6 text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">
          🚪 Sign Out
        </h1>
        <p className="text-gray-700 mb-6">
          Do you really want to sign out?
        </p>
        <div className="flex justify-center gap-4">
          <button
            onClick={handleConfirm}
            className="px-6 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
          >
            Yes
          </button>
          <button
            onClick={handleCancel}
            className="px-6 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
          >
            No
          </button>
        </div>
      </div>
    </main>
  );
}
