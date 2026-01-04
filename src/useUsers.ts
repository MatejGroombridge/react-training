import { useState, useEffect } from 'react';

export interface User {
  id: number;
  name: string;
  email: string;
}

export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // 1. Create the controller
    const controller = new AbortController();

    const fetchUsers = async () => {
      try {
        // 2. Pass the 'signal' to fetch
        const response = await fetch('https://jsonplaceholder.typicode.com/users', {
          signal: controller.signal
        });
        
        if (!response.ok) throw new Error(response.statusText);
        
        const data = await response.json();
        setUsers(data);
      } catch (err: any) {
        // 3. Ignore the error if it was us who cancelled it
        if (err.name === 'AbortError') {
          console.log('Fetch cancelled');
          return;
        }
        setError(err.message);
      } finally {
        // Only turn off loading if we weren't aborted (optional optimization)
        if (!controller.signal.aborted) {
            setIsLoading(false);
        }
      }
    };

    fetchUsers();

    // 4. The Cleanup Function: Cancel the request if the component unmounts
    return () => {
      controller.abort();
    };
  }, []);

  return { users, isLoading, error };
};