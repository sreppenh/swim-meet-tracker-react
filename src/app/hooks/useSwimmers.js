'use client';
import { useState, useEffect } from 'react';

export function useSwimmers() {
  const [swimmers, setSwimmers] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('swimmers');
      if (saved) {
        const loadedSwimmers = JSON.parse(saved);
        setSwimmers(loadedSwimmers);
      }
    } catch (error) {
      console.log('Could not load swimmers:', error);
    }
  }, []);

  const saveSwimmers = (newSwimmers) => {
    setSwimmers(newSwimmers);
    try {
      localStorage.setItem('swimmers', JSON.stringify(newSwimmers));
    } catch (error) {
      console.log('Could not save swimmers:', error);
    }
  };

  const addSwimmer = (swimmerData) => {
    const newSwimmer = {
      ...swimmerData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const updatedSwimmers = [...swimmers, newSwimmer];
    saveSwimmers(updatedSwimmers);
    return newSwimmer;
  };

  const updateSwimmer = (id, updates) => {
    const updatedSwimmers = swimmers.map(swimmer => 
      swimmer.id === id ? { ...swimmer, ...updates } : swimmer
    );
    saveSwimmers(updatedSwimmers);
  };

  const deleteSwimmer = (id) => {
    const updatedSwimmers = swimmers.filter(swimmer => swimmer.id !== id);
    saveSwimmers(updatedSwimmers);
  };

  const getSwimmerByName = (name) => {
    return swimmers.find(swimmer => swimmer.name.toLowerCase() === name.toLowerCase());
  };

  const getAvailableColorIndex = () => {
    const usedColors = swimmers.map(s => s.colorIndex);
    for (let i = 0; i < 10; i++) {
      if (!usedColors.includes(i)) {
        return i;
      }
    }
    return 0; // Default to first color if all are used
  };

  return {
    swimmers,
    addSwimmer,
    updateSwimmer,
    deleteSwimmer,
    getSwimmerByName,
    getAvailableColorIndex,
  };
}