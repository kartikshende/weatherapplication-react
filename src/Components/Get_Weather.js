import React from 'react';
import Form from './Form.js';
import Weather from './Weather.js';

const API_KEY = "ba149350e69c5393987c1cdbbcd1bcf9";

class Get_Weather extends React.Component{

state ={

  Weather_info:[]
}
  getWeather = async (e) => {
       e.preventDefault();
         const api_call = await fetch(`https://api.openweathermap.org/data/2.5/group?id=2988507,2759794,2867714,6539761,2950159&units=metric&appid=${API_KEY}`);
         const data = await api_call.json();
         console.log(data);
        this.setState({
           Weather_info : data.list

        });
console.log(this.state.Weather_info);
   }

   componentDidMount = () => {
if(localStorage.getItem("Weather_info") !=null){
   const json = localStorage.getItem("Weather_info");
   const weather = JSON.parse(json);

   this.setState({ Weather_info:weather});
 }

 }
 componentDidUpdate = () => {
   const Weather_info = JSON.stringify(this.state.Weather_info);

   localStorage.setItem("Weather_info", Weather_info);

 }

   render(){

       return(<div>

          <Form getWeather={this.getWeather} />
          <Weather Weather_info={this.state.Weather_info} />
         </div>


       );
     }


}

export default Get_Weather;
