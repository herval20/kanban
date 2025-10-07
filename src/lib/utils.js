// src/lib/utils.js
import { format, isAfter, parseISO } from 'date-fns';

/** Datum hübsch anzeigen */
export function fmt(dateStr) {
  if (!dateStr) return '-';
  try {
    return format(parseISO(dateStr), 'dd.MM.yyyy');
  } catch (e) {
    return dateStr;
  }
}

/** Überfällig? */
export function isOverdue(dueDateISO) {
  if (!dueDateISO) return false;
  try {
    return isAfter(new Date(), parseISO(dueDateISO));
  } catch (e) {
    return false;
  }
}

/** Exportiere einzelnes Issue als ICS-Datei */
export function exportIssueAsICS(issue) {
  const dtstamp = new Date().toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  const dtstart = issue.dueDate
    ? issue.dueDate.replace(/[-:]/g, '').split('.')[0] + 'Z'
    : dtstamp;
  const uid = `issue-${issue.id}@kanban.local`;

  const ics = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'BEGIN:VEVENT',
    `UID:${uid}`,
    `DTSTAMP:${dtstamp}`,
    `SUMMARY:${issue.title}`,
    `DESCRIPTION:${issue.description || ''}`,
    `DTSTART:${dtstart}`,
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\\n');

  const blob = new Blob([ics], { type: 'text/calendar' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `${issue.title || 'issue'}.ics`;
  a.click();
  URL.revokeObjectURL(url);
}

/** Teile einzelnes Issue über Web Share API */
export async function shareIssue(issue) {
  if (navigator.share) {
    await navigator.share({
      title: issue.title,
      text: issue.description,
      url: window.location.href
    });
  } else {
    alert('Web Share API wird von deinem Browser nicht unterstützt.');
  }
}

/** Exportiere alle Issues als CSV */
export function exportAllAsCSV(issues) {
  const header = ['Title', 'Description', 'Created', 'Due', 'Story Points', 'Priority', 'Lane'];
  const rows = issues.map((i) => [
    i.title,
    i.description || '',
    fmt(i.createdAt),
    fmt(i.dueDate),
    i.storyPoints,
    i.priority,
    i.lane
  ]);

  const csv = [header, ...rows].map((r) => r.join(',')).join('\\n');
  const blob = new Blob([csv], { type: 'text/csv' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'kanban_issues.csv';
  a.click();
  URL.revokeObjectURL(url);
}
