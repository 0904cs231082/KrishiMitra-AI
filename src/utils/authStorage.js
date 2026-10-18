const AUTH_STORAGE_KEY = "krishimitra-user";

export function getLoggedInUser() {
  try {
    const user = localStorage.getItem(AUTH_STORAGE_KEY);

    if (!user) {
      return null;
    }

    return JSON.parse(user);
  } catch (error) {
    console.error("Unable to read user data:", error);
    return null;
  }
}

export function saveLoggedInUser(user) {
  const userData = {
    name: user.name,
    mobile: user.mobile,
    verified: true,
    loginAt: new Date().toISOString(),
  };

  localStorage.setItem(
    AUTH_STORAGE_KEY,
    JSON.stringify(userData)
  );

  return userData;
}

export function isUserLoggedIn() {
  const user = getLoggedInUser();

  return Boolean(user?.verified);
}

export function logoutUser() {
  localStorage.removeItem(AUTH_STORAGE_KEY);
}