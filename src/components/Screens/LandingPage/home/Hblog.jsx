import React from "react";
import "../blog/blog.css";
import Heading from "../common/heading/Heading";
import axios from "axios";
import { variables } from "../../../../variables";
import { useState } from "react";
import { useEffect } from "react";
// copy code of blog => blogCard

const Hblog = () => {
  const [events, setEvents] = useState([]);
  const [startDate, setStartDate] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const eventsPerPage = 3;
  const totalPages = Math.ceil(events.length / eventsPerPage);
  const displayedEvents = events.slice(
    (currentPage - 1) * eventsPerPage,
    currentPage * eventsPerPage
  );
  const config = {
    headers: {
      "access-control-allow-origin": "*",
      Accept: "application/json",
      "Content-type": "application/json",
      // Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  };
  const GetEvents = async () => {
    try {
      const result = await axios.get(
        variables.API_URL + "Event/validated",
        config
      );
      console.log("eventslanding", result.data);
      const eventsData = result.data.map((event) => ({
        startDate: new Date(event.StartDate).toISOString().split("T")[0], // Format StartDate
        name: event.Name,
        description: event.Description,
        location: event.Location,
        id: event.Id,
        price: event.Price,
        nbstand: event.NbStand,
        photo: event.Photo,
        categoryId: event.CategoryId,
      }));

      setEvents(eventsData);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("startDate", startDate);

  useEffect(() => {
    GetEvents();
  }, []);

  return (
    <>
      <section className="blog">
        <div className="container">
          <Heading subtitle="OUR Events" title="Recent Events" />
          <div className="grid2">
            {displayedEvents.slice(0, 3).map((val) => (
              <div
                className="items shadow"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <div className="img" style={{ height: "300px" }}>
                  <img
                    src={`/images/Affiche/${val.photo}`}
                    style={{ objectFit: "cover" }}
                    alt=""
                  />
                </div>
                <div
                  className="text"
                  style={{
                    display: "flex",
                    flex: 1,
                    flexDirection: "column",
                  }}
                >
                  <div className="admin flexSB">
                    <span>
                      <i className="fa fa-user"></i>
                      <label htmlFor="">{val.type}</label>
                    </span>
                    <span>
                      <i className="fa fa-calendar-alt"></i>
                      <label htmlFor="">{val.startDate}</label>
                    </span>
                    <span>
                      <i className="fas fa-map-marker-alt"></i>
                      <label htmlFor="">{val.location}</label>
                    </span>
                  </div>
                  <h1>{val.name}</h1>
                  <p>{val.description}</p>
                  <div className="price" style={{ marginTop: "auto" }}>
                    <h3>
                      {" Price    "}
                      <i class="fas fa-dollar-sign"></i>
                      {val.price}
                    </h3>
                  </div>
                  <button className="outline-btn">BUY NOW !</button>
                </div>
              </div>
            ))}
          </div>
          <div className="pagination ">
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(currentPage - 1)}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span>
              Page {currentPage} of {totalPages}
            </span>
            <button
              className="pagination-btn"
              onClick={() => setCurrentPage(currentPage + 1)}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Hblog;
