export default function toDateString(date: Date) {
  return date.toISOString().substring(0, 'yyyy-mm-dd'.length);
}
