import { writable } from 'svelte/store';

// Standardwert
const initial = [];

// Writable Store erstellen
export const issues = writable(initial);

// Nur im Browser auf localStorage zugreifen
if (typeof window !== 'undefined') {
  const stored = localStorage.getItem('issues');
  if (stored) {
    issues.set(JSON.parse(stored));
  }

  // Änderungen speichern
  issues.subscribe(value => {
    localStorage.setItem('issues', JSON.stringify(value));
  });
}

// Lanes definieren
export const lanes = ['Do', 'Doing', 'Done', 'Archiv'];
