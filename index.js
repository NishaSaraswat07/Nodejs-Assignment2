import {format, formatDistanceToNow, isAfter, isBefore, isToday, parse, set } from 'date-fns';
import fs from "fs";
import {Command} from "commander"

const date = new Date();
const todaysDate = format(date,'yyyy/MM/dd')
const currentDate = set(new Date(), {hours: 0, minutes: 0, seconds: 0, milliseconds: 0});
const courStartDate = new Date(2023,0,31);
const result = formatDistanceToNow(courStartDate);
const program = new Command();

program.option('--date');
program.parse();

const dateEntered = program.args;
const dateParse = parse(dateEntered,'yyyy-MM-dd', date);
console.log(dateEntered);
console.log(dateParse);

const dateStatus = () => {
    return(
        isAfter(dateParse, currentDate)?"after ":isBefore(dateParse, currentDate)?"before ":"same"
    )}

const writeToFile = 
`Today's date: ${todaysDate}
Day : ${format(date,'EEEE')}
Time :  ${format(date,' HH:mm ')}
Course Start Date : ${format(courStartDate,'yyyy/MM/dd')}
It has been ${result} since we have started this course!
Date entered by you is: ${dateEntered} 
The date entered is ${dateStatus()} today's day ${todaysDate}
`
fs.writeFile("date.md",writeToFile,(err)=>{
    if(err) throw err;
    console.log("The file has been saved!");
});

const writeToHTMLFile = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="./index.css">
    <title>Assignment 2</title>
</head>
<body>
<h1>Assignment 2</h1>
<div class="main">
<div class="tableContainer">
    <table>
        <tr>
        <th>Today's date</th>
        <th>Day </th>
        <th>Time </th>
        <th>Course Start Date</th>
        </tr>
        <tr>
            <td>${todaysDate}</td>
            <td> ${format(date,'EEEE')}</td>
            <td>  ${format(date,' HH:mm ')}</td>
            <td> ${format(courStartDate,'yyyy/MM/dd')}</td>
        </tr>  
    </table>
</div>
<div class="paracontainer">    
    <p>It has been ${result} since we have started this course!</p>
    <p>Date entered by you is: ${dateEntered} </p>
    <p>The date entered is ${dateStatus()} today's date ${todaysDate}</p>
</div>
</body>
`
fs.writeFile("index.html",writeToHTMLFile,(err)=>{
    if(err) throw err;
    console.log("A html file has been created");
})

const writeCss = `
html{
    height: 100vh;
}
*{
    box-sizing:border-box;
    margin:0;
}
body{
    width: 100%;
    display: flex;
    align-items: center;
    flex-direction: column;
}
h1{
    margin-top:40px;
    color: #252627;
}
.main{
    display:flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
}
table, th, td {
    border: 1px solid;
    text-align:center;
    width:100%;
  }
  th{
      color:#6666ff;
      padding:10px;
  }
  td{
      color:#F61067;
      padding:20px;
  }
  .tableContainer{
      margin-top: 130px;
  }
  .paracontainer{
      display:flex;
      flex-direction:column;
      align-items:center;
      justify-content:center;
      margin-top:100px;
  }
  p{
      margin:20px;
      color: #252627;
      font-size:24px;
      letter-spacing: 0.1rem;
      line-height: 1rem;
  }
`
fs.writeFile("index.css",writeCss,(err)=>{
    if(err) throw err;
    console.log("A css file has been created");
})