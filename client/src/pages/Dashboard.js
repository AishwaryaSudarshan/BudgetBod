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
      <div className="pt-12">
        <h1 className="text-3xl font-bold text-center">Dashboard</h1>
      </div>

      <div className="max-w-4xl mx-auto p-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Streak Card */}
          <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center">
            <span className="text-gray-500 text-sm">Daily Streak</span>
            <span className="text-xl font-semibold">{streak} days</span>
          </div>

          {/* Calendar */}
          <div className="md:col-span-2">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DateCalendar disableFuture onChange={(newValue) => dateSet(newValue)} showDaysOutsideCurrentMonth fixedWeekNumber={6} />
          </LocalizationProvider>
          </div>

          {/* Input Fields and Buttons */}
          <div className="md:col-span-3 space-y-4">
            <input
              id="calorie-intake-field"
              type="text"
              placeholder="Enter Calorie Intake"
              className="input input-bordered w-full"
              onChange={(e) => setCalorieText(e.target.value)}
            />
            <input
              id="activity-type-field"
              type="text"
              placeholder="Enter Activity"
              className="input input-bordered w-full"
              onChange={(e) => setActivityText(e.target.value)}
            />
            <div className="flex space-x-2">
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
              <button
                className="btn btn-outline flex-1"
                onClick={() => {
                  axios.post('http://localhost:3000/dashboard/clear')
                  .then(res => {
                    console.log(res.data);
                      })
                  }} >
                Clear db
              </button>
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
