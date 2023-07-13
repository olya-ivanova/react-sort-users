import { useEffect, useState } from "react";

const OPTIONS = [
  { value: "name", label: "by name" },
  { value: "username", label: "by username" },
  { value: "email", label: "by email" },
];

function App() {
  const [users, setUsers] = useState([]);
  const [selected, setSelected] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((response) => response.json())
      .then((data) => setUsers(data))
      .catch((error) => console.log(error.message));
  }, []);

  const handleSort = (sortValue) => {
    setSelected(sortValue);
    setUsers(
      [...users].sort((a, b) => a[sortValue].localeCompare(b[sortValue]))
    );
  };

  return (
    <div>
      <select
        value={selected}
        onChange={(event) => handleSort(event.target.value)}
      >
        <option value="" disabled>
          Sort by
        </option>
        {OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <div>
        {users &&
          users.map((user) => (
            <div
              style={{
                margin: "16px",
                padding: "16px",
                border: "2px solid #08F9A5",
              }}
              key={user.id}
            >
              <h2>{user.name}</h2>
              <p>{user.username}</p>
              <p>{user.email}</p>
            </div>
          ))}
      </div>
    </div>
  );
}

export default App;
