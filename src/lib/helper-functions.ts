export function removePunctuation(string) {
  return string.replace(/[^\w\s]|[']/g, '');
}