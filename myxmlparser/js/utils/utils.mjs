export async function getLocalStorage(key) {
    return localStorage.getItem(key);
}

export async function setLocalStorage(key, value) {
    localStorage.setItem(key, value);
}

