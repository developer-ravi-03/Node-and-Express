export const addItemToServer = async (task, date) => {
  const response = await fetch(`http://localhost:3000/api/todo/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ task, date }),
  });

  const item = await response.json();

  return mapServerItem(item);
};

export const getItemToServer = async () => {
  const response = await fetch(`http://localhost:3000/api/todo/`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
  const item = await response.json();
  return item.map(mapServerItem);
};

export const markCompleteOnServer = async (id) => {
  const response = await fetch(
    `http://localhost:3000/api/todo/${id}/completed`,
    {
      method: "PUT",
    }
  );

  const item = await response.json();

  return mapServerItem(item);
};

export const deleteItemFromServer = async (id) => {
  await fetch(`http://localhost:3000/api/todo/${id}`, {
    method: "DELETE",
  });
  return id; // Return success and the deleted item's ID
};

export const mapServerItem = (serveritem) => {
  return {
    id: serveritem._id,
    name: serveritem.task,
    duedate: serveritem.date,
    completed: serveritem.completed || false,
    createdAt: serveritem.createdAt,
    updatedAt: serveritem.updatedAt,
  };
};
