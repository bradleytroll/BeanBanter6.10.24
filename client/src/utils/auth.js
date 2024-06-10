import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    const token = this.getToken();
    if (!token) {
      console.error('No token found when attempting to get profile');
      throw new Error('No token found');
    }
    return decode(token);
  }

  loggedIn() {
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
      if (decoded.exp < Date.now() / 1000) {
        console.warn('Token is expired');
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.error('Failed to decode token', err);
      return false;
    }
  }

  getToken() {
    const token = localStorage.getItem('id_token');
    console.log('Retrieved token from localStorage:', token);
    return token;
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    console.log('Token set in localStorage:', idToken);
    const currentLocation = window.location.pathname;
    if (currentLocation !== '/') {
      window.location.assign('/');
    } else {
      window.location.reload(); // Reload page if already on home
    }
  }

  logout() {
    localStorage.removeItem('id_token');
    console.log('Token removed from localStorage');
    const currentLocation = window.location.pathname;
    if (currentLocation !== '/') {
      window.location.assign('/');
    } else {
      window.location.reload(); // Reload page if already on home
    }
  }
}

export default new AuthService();
