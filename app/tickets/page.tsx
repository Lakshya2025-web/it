"use client";

import { useState, useEffect } from "react";

type Event = {
  id: number;
  title: string;
  date: string;
  location: string;
  description: string;
};

type Ticket = {
  id: number;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  quantity: number;
};

export default function TicketsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const storedEvents = localStorage.getItem("events");
    let parsed: Event[] = [];
    try {
      parsed = storedEvents ? JSON.parse(storedEvents) : [];
    } catch {
      parsed = [];
    }
    setEvents(parsed);
  }, []);

  const handleBuy = () => {
    if (selectedEvent) {
      const newTicket: Ticket = {
        id: Date.now(),
        eventTitle: selectedEvent.title,
        eventDate: selectedEvent.date,
        eventLocation: selectedEvent.location,
        quantity,
      };

      const existingTickets = JSON.parse(localStorage.getItem("tickets") || "[]");
      const updatedTickets = [...existingTickets, newTicket];
      localStorage.setItem("tickets", JSON.stringify(updatedTickets));

      alert(`🎟️ You bought ${quantity} ticket(s) for "${selectedEvent.title}" at ${selectedEvent.location}!`);

      setSelectedEvent(null);
      setQuantity(1);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden sm:flex w-64 bg-blue-700 text-white flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">EventHub</h2>
        <nav className="flex flex-col gap-4">
          <a href="/home" className="hover:bg-blue-600 p-2 rounded">🏠 Home</a>
          <a href="/addevent" className="hover:bg-blue-600 p-2 rounded">➕ Add Event</a>
          <a href="/tickets" className="hover:bg-blue-600 p-2 rounded">🎟️ Tickets</a>
          <a href="/mytickets" className="hover:bg-blue-600 p-2 rounded">📂 My Tickets</a>
        </nav>
        <div className="mt-auto text-sm text-gray-200">© 2025 EventHub</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
            🎟️ Buy Tickets
          </h1>
          <p className="text-gray-600 mt-2">Select an event and purchase tickets</p>
        </header>

        {events.length === 0 ? (
          <p className="text-gray-600 text-center">No events available. Add one first!</p>
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
                  onClick={() => setSelectedEvent(event)}
                  className="mt-4 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Buy Tickets
                </button>
              </div>
            ))}
          </section>
        )}

        {/* Ticket Modal */}
        {selectedEvent && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
              <h2 className="text-xl font-bold text-blue-700 mb-4">
                {selectedEvent.title}
              </h2>
              <p className="text-gray-600 mb-4">
                {selectedEvent.date} • {selectedEvent.location}
              </p>
              <label className="block mb-4">
                <span className="text-gray-700">Quantity</span>
                <input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                  className="w-full border border-gray-400 rounded px-3 py-2 mt-1 text-gray-800 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </label>
              <div className="flex justify-end gap-4">
                <button
                  onClick={() => setSelectedEvent(null)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition"
                >
                  Cancel
                </button>
                <button
                  onClick={handleBuy}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
                >
                  Confirm Purchase
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
