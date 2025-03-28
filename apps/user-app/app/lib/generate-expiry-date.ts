export function getExpiryDate() {
  const expiryDate = new Date();
  expiryDate.setMinutes(expiryDate.getMinutes() + 2); // 2 minutes
  return expiryDate;
}
