/**
 * Returns a random hex color string (e.g., "#3E2F1B").
 */
function getRandColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  }
  
  /**
   * Returns a random integer between min (inclusive) and max (inclusive).
   */
  function getRndIntIncludeMax(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  /**
   * Returns a random integer between min (inclusive) and max (exclusive).
   */
  function getRndIntExcludeMax(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
  }
  
  /**
   * Saves a value to local storage under the specified key.
   * The value is stringified to JSON.
   */
  function saveToLocalStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
  }
  
  /**
   * Retrieves and parses a value from local storage by key.
   * Returns null if the key doesn't exist.
   */
  function getFromLocalStorage(key) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : null;
  }
  