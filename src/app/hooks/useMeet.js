'use client';
import { useState, useEffect } from 'react';

export function useMeet() {
  const [currentMeet, setCurrentMeet] = useState(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('currentMeet');
      if (saved) {
        const meet = JSON.parse(saved);
        // Convert date string back to Date object if it exists
        if (meet.date) {
          meet.date = new Date(meet.date);
        }
        setCurrentMeet(meet);
      }
    } catch (error) {
      console.log('Could not load meet data:', error);
    }
  }, []);

  const createMeet = (meetData) => {
    const newMeet = {
      ...meetData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    setCurrentMeet(newMeet);

    try {
      localStorage.setItem('currentMeet', JSON.stringify(newMeet));
    } catch (error) {
      console.log('Could not save meet data:', error);
    }

    return newMeet;
  };

  const clearMeet = () => {
    setCurrentMeet(null);
    try {
      localStorage.removeItem('currentMeet');
      //localStorage.removeItem('swimmers');
      localStorage.removeItem('events');
    } catch (error) {
      console.log('Could not clear data:', error);
    }
  };

  return {
    currentMeet,
    createMeet,
    clearMeet,
  };
}