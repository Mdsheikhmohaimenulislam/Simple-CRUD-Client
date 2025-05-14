import React, { use, useState } from "react";
import { MdDeleteForever } from "react-icons/md";
import { Link } from "react-router";

const Users = ({ usersPromise }) => {
  const loadedUsers = use(usersPromise);

  const [users, setUsers] = useState(loadedUsers);


  const handleUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };

    // Create user in DB
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("data after creating user in the db", data);
        if (data.insertedId) {
          newUser._id = data.insertedId;

          const newUsers = [...users, newUser];
          setUsers(newUsers);

          alert("user added successfully");
          e.target.reset();
        }
      });
  };


//   deleted section
const handleDeleted = (id) => {
 
    fetch(`http://localhost:5000/users/${id}`,{
        method:'DELETE',
    })
    .then(res => res.json())
    .then(data => {
        if(data.deletedCount){

            const remainingUsers = users.filter(user => user._id !== id);

            setUsers(remainingUsers);

            alert("user delete successfully");
  
        }
    })
}

  return (
    <div>
      {/* add uer */}
      <div>
        <form onSubmit={handleUser}>
          <input type="text" name="name" />
          <br />
          <input type="email" name="email" />
          <br />
          <input type="submit" value="Add User" />
        </form>
      </div>
      {/* View user */}
      <div>
        {users.map((user) => (
          <p key={user._id}>
            {user.name} : {user.email}
            <Link to={`/users/${user._id}`}>Details</Link>
            <Link to={`/update/${user._id}`}>Edit</Link>
             <button onClick={ () => handleDeleted(user._id)}><MdDeleteForever /></button>
          </p>
        ))}
      </div>
    </div>
  );
};

export default Users;
