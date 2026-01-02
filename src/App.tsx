import { useState } from 'react';

// 1. Define the shape of a Ticket
interface Ticket {
  id: string;
  title: string;
  isComplete: boolean;
}

function App() {
  // 2. Initialize State with an array of objects
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 'JIRA-1', title: 'Fix login bug', isComplete: false },
    { id: 'JIRA-2', title: 'Update documentation', isComplete: true },
    { id: 'JIRA-3', title: 'Design new homepage', isComplete: false },
  ]);

  const [newTicketTitle, setNewTicketTitle] = useState('');

  const toggleTicket = (id: string) => {
    setTickets((currentTickets) => {
      // We return a NEW array
      return currentTickets.map((ticket) => {
        // If this is the ticket we clicked...
        if (ticket.id === id) {
          // Return a NEW object with the flipped boolean
          return { ...ticket, isComplete: !ticket.isComplete };
        }
        // Otherwise, return the original ticket untouched
        return ticket;
      });
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newTicketId: string = (Math.random() * 100).toString();
    const newTicketObject: Ticket = {
      id: newTicketId,
      title: newTicketTitle,
      isComplete: false,
    };
    setTickets([...tickets, newTicketObject]);
    setNewTicketTitle('');
  };

  const handleDelete = (id: string) => {
    setTickets((tickets) => {
      return tickets.filter((ticket) => ticket.id !== id);
    });
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Mini-Jira</h1>

      <form onSubmit={handleSubmit}>
        <input
          value={newTicketTitle}
          onChange={(e) => setNewTicketTitle(e.target.value)}
        ></input>
        <button type="submit">Submit</button>
      </form>
      <ul>
        {tickets.map((ticket) => (
          <li
            key={ticket.id}
            style={{
              textDecoration: ticket.isComplete ? 'line-through' : 'none',
            }}
            onClick={() => toggleTicket(ticket.id)}
          >
            <span>{ticket.title}</span>

            <button
              onClick={(e) => {
                e.stopPropagation(); // <--- CRITICAL: Prevents triggering the LI click
                handleDelete(ticket.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
