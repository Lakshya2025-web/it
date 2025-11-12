"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim() !== "") {
      // Save username in localStorage so Home can use it
      localStorage.setItem("username", username);
      setSubmitted(true);
    }
  };

  // Redirect to /home after showing greeting
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => {
        router.push("/home"); // ✅ redirect to /home
      }, 2000); // 2 seconds delay
      return () => clearTimeout(timer);
    }
  }, [submitted, router]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-lg w-full max-w-md p-6">
        {!submitted ? (
          <>
            <h1 className="text-2xl font-bold text-blue-700 mb-6 text-center">
              🔑 Login
            </h1>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label
                  htmlFor="username"
                  className="block text-gray-700 font-medium"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full border border-gray-400 rounded px-3 py-2 mt-1 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition"
              >
                Login
              </button>
            </form>
          </>
        ) : (
          <div className="text-center">
            <h1 className="text-2xl font-bold text-green-600">
              👋 Hello {username}!
            </h1>
            <p className="mt-2 text-gray-600">Redirecting you to Home...</p>
          </div>
        )}
      </div>
    </main>
  );
}