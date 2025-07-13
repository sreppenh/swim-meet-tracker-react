'use client';
import { useState, useEffect } from 'react';

export function useEvents() {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem('events');
      if (saved) {
        const loadedEvents = JSON.parse(saved);
        setEvents(loadedEvents);
      }
    } catch (error) {
      console.log('Could not load events:', error);
    }
  }, []);

  const saveEvents = (newEvents) => {
    setEvents(newEvents);
    try {
      localStorage.setItem('events', JSON.stringify(newEvents));
    } catch (error) {
      console.log('Could not save events:', error);
    }
  };

  const addEvent = (eventData) => {
    const newEvent = {
      ...eventData,
      id: Date.now().toString(),
      createdAt: new Date(),
    };
    const updatedEvents = [...events, newEvent];
    saveEvents(updatedEvents);
    return newEvent;
  };

  const updateEvent = (id, updates) => {
    const updatedEvents = events.map(event =>
      event.id === id ? { ...event, ...updates } : event
    );
    saveEvents(updatedEvents);
  };

  const deleteEvent = (id) => {
    const updatedEvents = events.filter(event => event.id !== id);
    saveEvents(updatedEvents);
  };

  const deleteEventsBySwimmer = (swimmerId) => {
    const updatedEvents = events.filter(event => event.swimmerId !== swimmerId);
    saveEvents(updatedEvents);
  };

  const toggleEventCompleted = (id) => {
    const updatedEvents = events.map(event =>
      event.id === id ? { ...event, completed: !event.completed } : event
    );
    saveEvents(updatedEvents);
  };

  const getSortedEvents = () => {
    return [...events].sort((a, b) => a.eventNumber - b.eventNumber);
  };

  return {
    events,
    addEvent,
    updateEvent,
    deleteEvent,
    deleteEventsBySwimmer,
    toggleEventCompleted,
    getSortedEvents,
  };
}