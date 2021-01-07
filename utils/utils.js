export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

export const setLocal = (key, data) => localStorage.setItem(key, data);

export const getLocal = (key) => localStorage.getItem(key);