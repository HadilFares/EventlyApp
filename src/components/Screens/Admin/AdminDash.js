
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";
import Loader  from "../../Loader"
import { variables } from "../../../variables";
const AdminDash = () => {
  const [users, setUsers] = useState();
  const [EventValid, setEventValid] = useState({});
  const [loading, setLoading] = useState(true);

  const getUsers = async () => {
    try {
      await axios.get(variables.API_URL + "User/AllUsers").then((res) => {
        console.log(res.data);
        setUsers(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  const getEventValid = async () => {
    try {
      await axios.get(variables.API_URL + "Event/validated").then((res) => {
        console.log(res.data);
        setEventValid(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getUsers();
    getEventValid();
    setLoading(false);

    console.log(EventValid);
  }, []);

  return (
    <>
      {loading ? (
        <Form.Group className="mb-5">
          <div className="text-center" style={{ marginTop: 40 }}>
            <Loader />
          </div>
        </Form.Group>
      ) : (
        <div class="container-fluid">
          <div class="col-md-12 my-1">
            <div class="row">
              <div className="col-md-3 bg-success mx-2">
                <div className="col-md-12">
                  <div className="row">
                    <div className="col-md-8">
                      <h5
                        className="my-2 text-white text-center"
                        style={{ fontSize: 30 }}
                      >
                        {users}
                      </h5>
                      <h5 className="text-white">Total Users</h5>
                    </div>
                    <div className="col-md-4">
                      <h1>
                        <i
                          class="fas fa-users"
                          style={{ color: "white", marginTop: 45 }}
                        ></i>
                      </h1>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDash;
