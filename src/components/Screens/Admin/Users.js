import { Form, Button } from "react-bootstrap";
import React, { useState, useEffect } from "react";

import Pagination from "../../Pagination";
import User from "./User";
import axios from "axios";
import { Link } from "react-router-dom";
import { variables } from "../../../variables";
const Users = () => {
  const [userList, setuserList] = useState([]);
  //const [data, setData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(2);
  const [totalUser, setTotalUsers] = useState();
  const indexOfLastUser = currentPage * postsPerPage;
  // console.log("indexOfLastPost: ", indexOfLastPost);

  const indexOfFirstUser = indexOfLastUser - postsPerPage;
  // console.log("indexOfFirstPost: ", indexOfFirstPost);

  const currentPosts = userList.slice(indexOfFirstUser, indexOfLastUser);
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

 // let token = localStorage.getItem("Token");
  //console.log(token);
  const config = {
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("Token")}`,
    },
  };

  const AllUsers = async () => {
     setLoading(true);
    try {
      const result = await axios.get(variables.API_URL + "User/AllUsers", config);
      console.log(result);
      setTotalUsers(result.data.length);
      setuserList(result.data.reverse());
      setLoading(false);
    }
    catch (error){
          console.error("Error fetching users: ", error);
    }
  };
/*  'Authorization': 'Bearer ' + token*/

  useEffect(
    () => {
      AllUsers();
    },
    [],
    [userList]
  );


 

  return (
    <>
      <div className="row my-5">
        <div className="col">
          <h4 className="border-bottom">Filters</h4>
        </div>
     
      </div>
      <div className="container">
        <div className="py-4">
          <h1>Home Page</h1>

          <User users={currentPosts} loading={loading} />
        </div>
      </div>
      <div style={{ marginLeft: "700px" }}>
        <Pagination
          paginate={paginate}
          postsPerPage={postsPerPage}
          totalPosts={userList.length}
        />
      </div>
     
    </>
  );
};

export default Users;
