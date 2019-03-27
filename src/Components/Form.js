import React from "react";

const Weather =props =>(

  <div>
    <form onSubmit={props.getWeather}>

          <button> Get Weather Info</button>      
    </form>

  </div>
);
export default Weather;
