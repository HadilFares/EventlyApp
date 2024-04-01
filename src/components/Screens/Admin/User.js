import React, { useState } from "react";
import { variables } from "../../../variables";
import { Link } from "react-router-dom";
import axios from "axios";

function User({ users, loading }) {
  console.log(users);
  console.log(loading);

  const deleteUser = async (id) => {
    await axios.delete(variables.API_URL + "/User/${id}");
    //loadUsers();
  };
  return (
    <table id="tblData" className="table border shadow">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">UserName</th>
          <th scope="col">LastName</th>
          <th scope="col">First Name</th>
          <th scope="col">Email</th>
          <th scope="col">Phone Number</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {loading ? (
          <h1>loading...</h1>
        ) : (
          users.map((user, id) => (
            <tr key={id}>
              <th scope="row"></th>

              <td>{user.UserName}</td>
              <td>{user.LastName}</td>
              <td>{user.FirstName}</td>
              <td>{user.Email}</td>
              <td>{user.PhoneNumber}</td>
              <td>
                <Link
                  className="btn btn-outline-primary mr-2"
                  to={`/users/edit/${user._id}`}
                >
                  Edit
                </Link>
                <Link
                  className="btn btn-danger"
                  onClick={() => deleteUser(user._id)}
                >
                  Delete
                </Link>
              </td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}

export default User;
