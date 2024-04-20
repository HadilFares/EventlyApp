import React from "react";
import "./Ticket.css";
const TicketPopup = () => {
  return (
    <div>
      <div class="container">
        <div class="item">
          <div class="item-right">
            <h2 class="num">23</h2>
            <p class="day">Feb</p>
            <span class="up-border"></span>
            <span class="down-border"></span>
          </div>

          <div class="item-left">
            <p class="event">Music Event</p>
            <h2 class="title">Live In Sydney</h2>

            <div class="sce">
              <div class="icon">
                <i class="fa fa-table"></i>
              </div>
              <p>
                Monday 15th 2016 <br /> 15:20Pm & 11:00Am
              </p>
            </div>
            <div class="fix"></div>
            <div class="loc">
              <div class="icon">
                <i class="fa fa-map-marker"></i>
              </div>
              <p>
                North,Soth, United State , Amre <br /> Party Number 16,20
              </p>
            </div>
            <div class="fix"></div>
            <button class="tickets">Tickets</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TicketPopup;
