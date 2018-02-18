export function checkAuth() {
  if (localStorage.getItem('token') !== null) {
    return true;
  } else {
    return false;
  }
}