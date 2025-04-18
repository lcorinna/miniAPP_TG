const ADMIN_IDS = [784381510, 271223425];

export const isAdmin = (): boolean => {
  const userRaw = localStorage.getItem('telegramUser');
  if (!userRaw) return false;

  try {
    const user = JSON.parse(userRaw);
    return ADMIN_IDS.includes(user.id);
  } catch {
    return false;
  }
};
