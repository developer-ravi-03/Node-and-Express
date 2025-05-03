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
