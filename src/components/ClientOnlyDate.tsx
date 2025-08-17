"use client";

import { useState, useEffect } from 'react';

interface ClientOnlyDateProps {
  dateString: string;
}

export function ClientOnlyDate({ dateString }: ClientOnlyDateProps) {
  const [formattedDate, setFormattedDate] = useState('');

  useEffect(() => {
    // This code runs only on the client, after hydration
    setFormattedDate(new Date(dateString).toLocaleDateString());
  }, [dateString]);

  // Render a placeholder or nothing on the server
  if (!formattedDate) {
    return null; 
  }

  return <span>{formattedDate}</span>;
}