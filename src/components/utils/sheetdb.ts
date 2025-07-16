const BASE_URL = 'https://sheetdb.io/api/v1/tsn1ddr5dalp3'; 

// ✅ Check if a user already exists by email
export const checkUserExists = async (email: string) => {
  const res = await fetch(`${BASE_URL}/search?sheet=Users&email=${email}`);
  const data = await res.json();
  return data.length > 0 ? data[0] : null;
};

// ✅ Create new user + optional welcome task
export const createUser = async (name: string, email: string, password: string) => {
  const userRes = await fetch(`${BASE_URL}?sheet=Users`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([
      {
        name,
        email,
        password,
        joinedDate: new Date().toISOString(),
      }
    ])
  });

  if (userRes.ok) {
    // Create welcome task
    await fetch(`${BASE_URL}?sheet=Tasks`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify([
        {
          id: Date.now(),
          title: 'Welcome to your task manager!',
          completed: false,
          category: 'Onboarding',
          userEmail: email,
          createdAt: new Date().toISOString()
        }
      ])
    });
  }

  return userRes.ok;
};

// ✅ Save a new task for a user
export const saveTask = async (task: any) => {
  return await fetch(`${BASE_URL}?sheet=Tasks`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify([task])
  });
};

// ✅ Get all tasks for a user
export const getTasksForUser = async (userEmail: string) => {
  const res = await fetch(`${BASE_URL}/search?sheet=Tasks&userEmail=${userEmail}`);
  const data = await res.json();
  return data;
};
