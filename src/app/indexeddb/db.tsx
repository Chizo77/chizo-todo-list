export const openDB = () => {
    return new Promise<IDBDatabase>((resolve, reject) => {
      const request = indexedDB.open('TodoDB', 1);
  
      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBRequest<IDBDatabase>).result;
  
        if (!db.objectStoreNames.contains('todos')) {
          db.createObjectStore('todos', { keyPath: 'id', autoIncrement: true });
        }
      };
  
      request.onsuccess = () => {
        resolve(request.result);
      };
  
      request.onerror = () => {
        reject(request.error);
      };
    });
  };
  
  export const addTodo = async (text: string) => {
    const db = await openDB();
  
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction('todos', 'readwrite');
      const store = transaction.objectStore('todos');
  
      const newItem = { text, timestamp: Date.now() };
  
      const request = store.add(newItem);
  
      request.onsuccess = () => {
        resolve();
      };
  
      request.onerror = () => {
        reject(request.error);
      };
    });
  };
  
  export const getTodos = async () => {
    const db = await openDB();
  
    return new Promise<string[]>((resolve, reject) => {
      const transaction = db.transaction('todos', 'readonly');
      const store = transaction.objectStore('todos');
  
      const request = store.getAll();
  
      request.onsuccess = () => {
        const todos = request.result.map((item: any) => item.text);
        resolve(todos);
      };
  
      request.onerror = () => {
        reject(request.error);
      };
    });
  };
  
  export const removeTodo = async (index: number) => {
    const db = await openDB();
  
    return new Promise<void>((resolve, reject) => {
      const transaction = db.transaction('todos', 'readwrite');
      const store = transaction.objectStore('todos');
  
      const request = store.openCursor();
  
      request.onsuccess = (event: any) => {
        const cursor = event.target.result;
  
        if (cursor) {
          if (index === 0) {
            cursor.delete();
            resolve();
          } else {
            index--;
            cursor.continue();
          }
        } else {
          reject(new Error('Todo not found'));
        }
      };
  
      request.onerror = () => {
        reject(request.error);
      };
    });
  };
  