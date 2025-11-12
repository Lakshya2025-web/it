"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
};

export default function HomePage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [username, setUsername] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    // Load username
    const storedUser = localStorage.getItem("username");
    if (storedUser) {
      setUsername(storedUser);
    } else {
      router.push("/login"); // redirect if not logged in
    }

    // Load events
    const storedEvents = localStorage.getItem("events");
    let parsed: Event[] = [];
    try {
      parsed = storedEvents ? JSON.parse(storedEvents) : [];
    } catch {
      parsed = [];
    }

    if (!parsed || parsed.length === 0) {
      const mockEvents: Event[] = [
        {
          id: 1,
          title: "Tech Conference 2025",
          date: "2025-12-01",
          location: "Nagpur, India",
          description:
            "A gathering of tech enthusiasts exploring AI, Web3, and future innovations."
        },
        {
          id: 2,
          title: "Music Fest",
          date: "2025-12-15",
          location: "Mumbai, India",
          description:
            "An electrifying night of live performances and DJ sets."
        },
        {
          id: 3,
          title: "Startup Pitch Night",
          date: "2026-01-10",
          location: "Pune, India",
          description:
            "Showcase your startup ideas to investors and mentors."
        }
      ];
      setEvents(mockEvents);
      localStorage.setItem("events", JSON.stringify(mockEvents));
    } else {
      setEvents(parsed);
    }
  }, [router]);

  const handleDelete = (id: number) => {
    const updated = events.filter((event) => event.id !== id);
    setEvents(updated);
    localStorage.setItem("events", JSON.stringify(updated));
  };

  const handleSignOut = () => {
    localStorage.removeItem("username");
    router.push("/signout");
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden sm:flex w-64 bg-blue-700 text-white flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">EventHub</h2>
        <nav className="flex flex-col gap-4">
          <a href="/home" className="hover:bg-blue-600 p-2 rounded">🏠 Home</a>
          <a href="/addevent" className="hover:bg-blue-600 p-2 rounded">➕ Add Event</a>
          <a href="/tickets" className="hover:bg-blue-600 p-2 rounded">🎟️ Buy Tickets</a>
          <a href="/mytickets" className="hover:bg-blue-600 p-2 rounded">📂 My Tickets</a>
        </nav>
        <button
          onClick={handleSignOut}
          className="mt-6 bg-red-600 text-white py-2 rounded hover:bg-red-700 transition"
        >
          🚪 Sign Out
        </button>
        <div className="mt-auto text-sm text-gray-200">© 2025 EventHub</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
            🎉 Upcoming Events
          </h1>
          {username && (
            <p className="text-gray-600 mt-2">Hello {username}, welcome back!</p>
          )}
          <div className="mt-4">
            <a
              href="/tickets"
              className="inline-block bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition"
            >
              🎟️ Buy Tickets
            </a>
          </div>
        </header>

        {events.length === 0 ? (
          <p className="text-gray-600 text-center">No events yet. Add one!</p>
        ) : (
          <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition flex flex-col justify-between"
              >
                <div>
                  <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                    {event.title}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {event.date} • {event.location}
                  </p>
                  <p className="mt-3 text-gray-700">{event.description}</p>
                </div>
                <button
                  onClick={() => handleDelete(event.id)}
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
}
