import { useState, useEffect } from "react";
import Form from "./form";

function Users() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:2020/api/users")
      .then((response) => response.json())
      .then((users) => {
            setUsers(users);
          });
  }, []);

  const addUser = (newUser) => {
    //console.log(newStudent);
    //postStudent(newStudent);
    setUsers((users) => [...users, newUser]);
  };

  return (
    <div className="students">
      <h2> List of Users </h2>
      <ul>
        {users.map((u) => (
          <li key={u.id}>
            {" "}
            {u.firstname} {u.lastname}
          </li>
        ))}
      </ul>
      <Form addUser={addUser} />
    </div>
  );
}

export default Users;
