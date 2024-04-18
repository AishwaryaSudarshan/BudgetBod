import React, { useEffect } from 'react';
import { useState } from 'react';
import axios from 'axios';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import Loading from "../components/Loading";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

var isToday = require('dayjs/plugin/isToday')
dayjs.extend(isToday)

function Stats() {
    const [date, dateSet] = useState(dayjs());
    const [streak, streakSet] = useState("0");
    const [weeklyCal, weeklyCalSet] = useState(0);
    const [dailyCal, dailyCalSet] = useState(0);
    const [log, logSet] = useState("Calories\tActivity\n");

    useEffect(() => {
        //Updates the daily streak
        axios.get('/dashboard')
        .then(res => {

            const values = res.data.map(temp => dayjs(temp.date));
            values.sort((a, b) => b.diff(a, 'day'));

            //Calculates the daily streak
            if (values.length === 0 || !values[0].isToday()) {
                streakSet('0');
            }
            else {
                for (let i = 1; i < values.length; i++) {

                    const diffInDays = values[i].diff(values[i - 1], 'day');
                    // If the difference is 1 day, increment the streak
                    streakSet(i.toString());
                    if (diffInDays < -1) {
                        break;
                    }
                }
            }
        })

        //Updates the weekly calorie intake
        axios.get("/stats")
        .then(res => {
            const values = res.data;
            values.forEach(temp => {
                temp.date = dayjs(temp.date); // Cast 'date' to a Day.js object
            });
            values.sort((a, b) => b.date.diff(a.date, 'day'));

            //Calculates the weekly calorie intake
            const today = dayjs();
            if(values.length === 0){
                weeklyCalSet(0);
            }
            else{
                var weekCals = 0;
                var dayCals = 0;
                var dayLog = "Calories\tActivity\n";
                for (let i = 0; i < values.length && values[i].date.isSame(today, 'week'); i++){
                    weekCals += values[i].calIntake;

                    if(values[i].date.isSame(date, 'day')){
                        dayCals += values[i].calIntake;
                        dayLog += values[i].calIntake.toString() + "\t" + values[i].actType + "\n";
                    }
                }
                weeklyCalSet(weekCals);
                dailyCalSet(dayCals);
                logSet(dayLog);
            }
        })
    });

    return (

        <div className="h-screen">
            
            <div className="pt-12">
                <h1 className="text-3xl font-bold text-center">Stats</h1>
            </div>

            <div className="max-w-4xl mx-auto p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {/* Streak Card */}
                    <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center">
                        <span className="text-gray-500 text-sm">Daily Streak</span>
                        <span className="text-xl font-semibold">{streak} days</span>
                    </div>

                    {/* Weekly calories Card */}
                    <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center">
                        <span className="text-gray-500 text-sm">Weekly Intake</span>
                        <span className="text-xl font-semibold">{weeklyCal} Calories</span>
                    </div>

                    {/* Daily calories Card */}
                    <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center">
                        <span className="text-gray-500 text-sm">{dayjs().day(date.day()).format('dddd')}'s Intake</span>
                        <span className="text-xl font-semibold">{dailyCal} Calories</span>
                    </div>

                    {/* Log of daily activities */}
                    <div className="bg-white p-4 shadow-md rounded-lg flex flex-col items-center text-center overflow-auto">
                    <span className="text-gray-500 text-sm">{dayjs().day(date.day()).format('dddd')}'s input log</span>
                        <div style={{display: 'table', width: '100%'}}>
                            {log.split('\n').map((line, index) => (
                            <div key={index} style={{ display: 'table-row' }}>
                                <span style={{ display: 'table-cell', padding: '5px' }}>{line.split('\t')[0]}</span>
                                <span style={{ display: 'table-cell', padding: '5px' }}>{line.split('\t')[1]}</span>
                            </div>
                            ))}
                        </div>
                    </div>

                    {/* Calendar */}
                    <div className="md:col-span-2">
                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DateCalendar disableFuture onChange={(newValue) => dateSet(newValue)} showDaysOutsideCurrentMonth fixedWeekNumber={6} />
                        </LocalizationProvider>
                    </div>


                </div>
            </div>
        </div>
    );
}

export default withAuthenticationRequired(Stats, {
    onRedirecting: () => <Loading />,
});
