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
var isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)

function Dashboard() {
  const [calorieText, setCalorieText] = useState("");
  const [activityText, setActivityText] = useState("");
  const [date, dateSet] = useState(dayjs());
  const [streak, streakSet] = useState("0");

  return (
    <div className="flex justify-center items-center h-screen">
      <h1 className="text-3xl font-bold">Dashboard</h1>

      <Card variant="outlined">
        <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Daily Streak
        </Typography>

        <Typography variant="h6" component="div">
          {streak}
        </Typography>

        </CardContent>
      </Card>

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DateCalendar disableFuture onChange={(newValue) => dateSet(newValue)} showDaysOutsideCurrentMonth fixedWeekNumber={6} />
      </LocalizationProvider>
      

      <TextField id="calorie-intake-field" label="Calorie intake" variant="outlined" onChange={(newValue) => setCalorieText(newValue.target.value)}/>
      <TextField id="activity-type-field" label="Activity type" variant="outlined" onChange={(newValue) => setActivityText(newValue.target.value)}/>

      <Button variant="contained"
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
      </Button>

      <Button variant="contained"
        onClick={() => {
            axios.post('http://localhost:3000/dashboard/clear')
            .then(res => {
              console.log(res.data);
            })

        }} >
        Clear db
      </Button>
    </div>
  );
}

export default Dashboard;
