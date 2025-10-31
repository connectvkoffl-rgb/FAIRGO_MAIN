// A simple authentication service for the admin panel

const AUTH_KEY = 'fairgo_admin_auth';
let authChangeCallback: ((isLoggedIn: boolean) => void) | null = null;

export const setAuthCallback = (callback: ((isLoggedIn: boolean) => void) | null) => {
    authChangeCallback = callback;
};

export const login = (username?: string, password?: string): boolean => {
    // Hardcoded credentials for demonstration
    if (username === 'admin' && password === 'password') {
        sessionStorage.setItem(AUTH_KEY, 'true');
        if (authChangeCallback) authChangeCallback(true);
        return true;
    }
    return false;
};

export const logout = (): void => {
    sessionStorage.removeItem(AUTH_KEY);
    if (authChangeCallback) authChangeCallback(false);
    window.location.hash = ''; // Redirect to homepage
};

export const isAuthenticated = (): boolean => {
    return sessionStorage.getItem(AUTH_KEY) === 'true';
};
