import { useState } from "react";
import "./events.scss";
import { FiChevronRight } from 'react-icons/fi';
import { FiChevronLeft } from 'react-icons/fi';
import moment from "moment";

var totalValue = 10;

const Events = () => {

  var random1 = 0;
  var random2 = 1;
  var random3 = 1;
  var random4 = 2;
  var random5 = 4;
  var random6 = 5;
  var random7 = 6;
  var random8 = 7;
  var random9 = 7;
  var random10 = 9;
  var random11 = 10;
  var random12 = 11;

  var events = [
   {title: "Event 0 Event 0 Event 0", day: moment().add(random1, 'days').date(), dayOfYear: ((moment().add(random1, 'days').month() * 100) +  moment().add(random1, 'days').date()), src: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg", description: "Free entry over 21, specialty drinks and live music till 2AM!"},
   {title: "Event 2", day: moment().add(random2, 'days').date(), dayOfYear: ((moment().add(random2, 'days').month() * 100) +  moment().add(random2, 'days').date()), src: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg", description: "Free entry over 21, specialty drinks and live music till 2AM!"},
   {title: "Event 2", day: moment().add(random3, 'days').date(), dayOfYear: ((moment().add(random3, 'days').month() * 100) +  moment().add(random3, 'days').date()), src: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg", description: "Free entry over 21, specialty drinks and live music till 2AM!"},
   
   {title: "Event 2", day: moment().add(random4, 'days').date(), dayOfYear: ((moment().add(random4, 'days').month() * 100) +  moment().add(random4, 'days').date()), src: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg", description: "Free entry over 21, specialty drinks and live music till 2AM!"},
   {title: "Event 2", day: moment().add(random5, 'days').date(), dayOfYear: ((moment().add(random5, 'days').month() * 100) +  moment().add(random5, 'days').date()), src: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg", description: "Free entry over 21, specialty drinks and live music till 2AM!"},
   {title: "Event 2", day: moment().add(random6, 'days').date(), dayOfYear: ((moment().add(random6, 'days').month() * 100) +  moment().add(random6, 'days').date()), src: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg", description: "Free entry over 21, specialty drinks and live music till 2AM!"},
   
   {title: "Event 2", day: moment().add(random7, 'days').date(), dayOfYear: ((moment().add(random7, 'days').month() * 100) +  moment().add(random7, 'days').date()), src: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg", description: "Free entry over 21, specialty drinks and live music till 2AM!"},
   {title: "Event 2", day: moment().add(random8, 'days').date(), dayOfYear: ((moment().add(random8, 'days').month() * 100) +  moment().add(random8, 'days').date()), src: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg", description: "Free entry over 21, specialty drinks and live music till 2AM!"},
   {title: "Event 2", day: moment().add(random9, 'days').date(), dayOfYear: ((moment().add(random9, 'days').month() * 100) +  moment().add(random9, 'days').date()), src: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg", description: "Free entry over 21, specialty drinks and live music till 2AM!"},
   
   {title: "Event 2", day: moment().add(random10, 'days').date(), dayOfYear: ((moment().add(random10, 'days').month() * 100) +  moment().add(random10, 'days').date()), src: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg", description: "Free entry over 21, specialty drinks and live music till 2AM!"},
   {title: "Event 2", day: moment().add(random11, 'days').date(), dayOfYear: ((moment().add(random11, 'days').month() * 100) +  moment().add(random11, 'days').date()), src: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg", description: "Free entry over 21, specialty drinks and live music till 2AM!"},
   {title: "Event 2", day: moment().add(random12, 'days').date(), dayOfYear: ((moment().add(random12, 'days').month() * 100) +  moment().add(random12, 'days').date()), src: "https://images.theeventscalendar.com/uploads/2021/06/best-way-display-events-website.jpg", description: "Free entry over 21, specialty drinks and live music till 2AM!"},
  ]


  var months = ["January","February","March","April","May","June","July","August","September","October","November","December"]

  const [day, setDay] = useState(moment().add(10, 'days').date())
  const [month, setMonth] = useState(moment().add(10, 'days').month())
  const [dayOfYear, setDayOfYear] = useState((moment().add(10, 'days').month() * 100) + moment().add(10, 'days').date())

  function handleClick(value) {
    if (totalValue + value >= 0) {
      totalValue += value;
      setDay(moment().add(totalValue, 'days').date());
      setMonth(moment().add(totalValue, 'days').month());
      setDayOfYear((moment().add(totalValue, 'days').month() * 100) + moment().add(totalValue, 'days').date())
    }
  }

  var eventsVisible = events.filter(item => item.dayOfYear <= dayOfYear)

  return (
    <div className="events">
       <div className="title">
        Events Near You
       </div>
       
       <div className="bar">
          <button>
            Today
          </button>
          <p>{months[moment().month()]} {moment().date()}  -  {months[month]} {day}</p>
          <FiChevronLeft onClick={()=>{handleClick(-1)}} fontSize={24} className="chev-left"/>
          <FiChevronRight onClick={()=>{handleClick(1)}} fontSize={24} className="chev-right"/>
       </div>

       <div className="grid" id="grid">
        {[...Array(eventsVisible.length)].map((_, index) =>  (
          <a
            key={index}
            className="box"
            href={eventsVisible[index].src} 
          >
            <img src={eventsVisible[index].src} alt="" />
            <div className="bottom">

              <div className="date">
                  {eventsVisible[index].day}
              </div>
              <div className="p">
                  <p className="p1">{eventsVisible[index].title}</p>
                  <p className="p2">{eventsVisible[index].description}</p>
              </div>
            </div>
       
          </a>
        ))}
      </div>

    </div>
  );
};

export default Events;
