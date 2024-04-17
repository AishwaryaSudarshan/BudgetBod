import React from 'react';
import { useState } from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import axios from 'axios';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

var isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)

function Dashboard() {
  const [calorieText, setCalorieText] = useState("");
  const [activityText, setActivityText] = useState("");
  const [date, dateSet] = useState(dayjs());
  const [streak, streakSet] = useState("0");
  const { isAuthenticated } = useAuth0();
  return (
    <div className="h-screen">
      <div className="flex items-center justify-center mx-auto pt-12">
          <div className="flex justify-around items-center gap-x-10">          
          {/* Streak */}
          <div>
            <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center h-44 w-80">
              <span className="text-gray-500 text-sm pt-10">Daily Streak</span>
              <span className="text-xl font-semibold">{streak} days</span>
            </div>
            <div className='pt-20'>
              <img src='dashboard2.svg' alt='dashboard2'/>
            </div>
          </div>
          {/* Image */}
          <div className='flex'>
            <img src='dashboard1.svg' alt='dashboard1'/>
          </div>
          {/* Calendar */}
          <div className=''>
            <div className='rounded-lg'>
              {/* <img src='shoes1.svg' alt='shoes' className=''/> */}
            </div>
            <div className="md:col-span-2 flex">
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DateCalendar disableFuture onChange={(newValue) => dateSet(newValue)} showDaysOutsideCurrentMonth fixedWeekNumber={6} />
              </LocalizationProvider>
            </div>
          {/* Input Fields and Buttons */}
          <div className="md:col-span-3 space-y-4">
          <div>
          <input
            id="calorie-intake-field"
            type="text"
            placeholder="Enter Calorie Intake"
            className="input input-bordered w-full shadow-md rounded-lg p-4 ml-4 w-72"
            onChange={(e) => setCalorieText(e.target.value)}
          />
        </div>
        <div>
          <input
            id="activity-type-field"
            type="text"
            placeholder="Enter Activity"
            className="input input-bordered w-full shadow-md rounded-lg p-4 ml-4 w-72"
            onChange={(e) => setActivityText(e.target.value)}
          />
        </div>
            <div className='flex justify-center'>
            <div className="flex space-x-2 bg-[#BFDAB3] justify-center w-20 rounded-lg py-2 text-center">
               <button variant="contained"
                onClick={e => {
                  e.preventDefault();
                  const submitData = {
                    date: date.format('YYYY-MM-DD'), 
                    calText: calorieText, 
                    actText: activityText
                  };
                  axios.post('http://localhost:3000/dashboard', submitData)
                    .then(res => {
                      console.log(res);
                      console.log(res.data);
                    })

                  axios.get('http://localhost:3000/dashboard')
                    .then(res => {
                      //console.log(Object.prototype.toString.call(res.data[0].date))
                        
                      const dateSet = res.data.map(temp => dayjs(temp.date));
                      dateSet.sort((a, b) => b.diff(a, 'day'));
                      if(dateSet.length === 0 && !dateSet[0].isToday()){
                        streakSet('0');
                      }
                      else{
                        for (let i = 1; i < dateSet.length; i++) {
                          
                          const diffInDays = dateSet[i].diff(dateSet[i - 1], 'day');
                          // If the difference is 1 day, increment the streak
                          streakSet(i.toString());
                          if (diffInDays < -1) {
                            console.log("broke");
                            break;
                          }
                      }
                      }

                    })

                }} >
                Save
                </button>
            </div>
            </div>
          </div>
        </div>
        </div>
          </div>
      </div>
  );
}

export default withAuthenticationRequired(Dashboard, {
  onRedirecting: () => <Loading />,
});
