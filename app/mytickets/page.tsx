"use client";

import { useState, useEffect } from "react";

type Ticket = {
  id: number;
  eventTitle: string;
  eventDate: string;
  eventLocation: string;
  quantity: number;
};

export default function MyTicketsPage() {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const storedTickets = localStorage.getItem("tickets");
    let parsed: Ticket[] = [];
    try {
      parsed = storedTickets ? JSON.parse(storedTickets) : [];
    } catch {
      parsed = [];
    }
    setTickets(parsed);
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden sm:flex w-64 bg-blue-700 text-white flex-col p-6">
        <h2 className="text-2xl font-bold mb-8">EventHub</h2>
        <nav className="flex flex-col gap-4">
          <a href="/home" className="hover:bg-blue-600 p-2 rounded">🏠 Home</a>
          <a href="/addevent" className="hover:bg-blue-600 p-2 rounded">➕ Add Event</a>
          <a href="/tickets" className="hover:bg-blue-600 p-2 rounded">🎟 Tickets</a>
          <a href="/mytickets" className="hover:bg-blue-600 p-2 rounded">📂 My Tickets</a>
        </nav>
        <div className="mt-auto text-sm text-gray-200">© 2025 EventHub</div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 sm:p-8">
        <header className="text-center mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-blue-700">
            📂 My Tickets
          </h1>
          <p className="text-gray-600 mt-2">View all tickets you’ve purchased</p>
        </header>

        {tickets.length === 0 ? (
          <p className="text-gray-600 text-center">No tickets purchased yet.</p>
        ) : (
          <section className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {tickets.map((ticket) => (
              <div
                key={ticket.id}
                className="bg-white shadow-md rounded-lg p-6 hover:shadow-xl transition"
              >
                <h2 className="text-lg sm:text-xl font-semibold text-gray-800">
                  {ticket.eventTitle}
                </h2>
                <p className="text-sm text-gray-500">
                  {ticket.eventDate} • {ticket.eventLocation}
                </p>
                <p className="mt-3 text-gray-700">
                  🎟 Tickets Bought: {ticket.quantity}
                </p>
              </div>
            ))}
          </section>
        )}
      </main>
    </div>
  );
} 

