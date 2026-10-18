const STORAGE_KEY = "krishimitra-saved-items";

export function getSavedItems() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);

    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error("Unable to read saved items:", error);
    return [];
  }
}

export function saveItem(item) {
  const existingItems = getSavedItems();

  const newItem = {
    id: item.id || Date.now().toString(),
    title: item.title || "Saved Item",
    content: item.content || "",
    type: item.type || "General",
    createdAt: item.createdAt || new Date().toISOString(),
  };

  const alreadyExists = existingItems.some(
    (savedItem) => savedItem.id === newItem.id
  );

  if (alreadyExists) {
    return existingItems;
  }

  const updatedItems = [newItem, ...existingItems];

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedItems)
  );

  return updatedItems;
}

export function removeSavedItem(id) {
  const existingItems = getSavedItems();

  const updatedItems = existingItems.filter(
    (item) => item.id !== id
  );

  localStorage.setItem(
    STORAGE_KEY,
    JSON.stringify(updatedItems)
  );

  return updatedItems;
}

export function clearSavedItems() {
  localStorage.removeItem(STORAGE_KEY);
}