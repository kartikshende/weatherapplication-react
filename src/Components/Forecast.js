import React from 'react';
import { BrowerRouter, Switch, Route} from 'react-router-dom';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';


const API_KEY = "ba149350e69c5393987c1cdbbcd1bcf9";


const styles = {
  card: {
    
    display: 'flex',
   
  },
  details: {
    display: 'flex',
    flexDirection: 'column',
  },
  content: {
    flex: '1 0 auto',
  },
  media: {
    width: 151,
    height: 151,
    
  },
};

class Forecast extends React.Component{
  

   state ={

     Forecast_five_day:[],
     Forecast_cityname:""
   }
    componentDidMount = async () => {

     const city_id = this.props.location.state.city_id;
     const apicall =await fetch(`https://api.openweathermap.org/data/2.5/forecast?id=${city_id}&units=metric&appid=${API_KEY}`);
     const Forecast_data =await apicall.json();
     //console.log(Forecast_data);

     const current_Date=new Date();
     const year = current_Date.getFullYear();
     let month = current_Date.getMonth()+1;
     if(month < 10){
       month="0"+month;
     }
    let date=current_Date.getDate();
     if(date < 10){
       date="0"+date;
     }
     const date_string= year+"-"+month+"-"+date+" "+"09:00:00";

     /*  Getting weather dt_txt using for loop  */
       var i,date_text=new Array();
        for ( i in Forecast_data.list){

             date_text[i] =Forecast_data.list[i].dt_txt;

             }
             /*This function check date string is available in weather data or not and pass it to the index  */
             function checkDate(date_text) {
             if(date_text===date_string){
               return date_text === date_string;//"2018-07-08 09:00:00";
             }else {
               var new_date=current_Date.getDate()+1;
               if(new_date <10){
                 new_date ="0"+new_date;
               }
           var new_date_string=year+"-"+month+"-"+new_date+" "+"09:00:00";
               return date_text===new_date_string;
             }
             }
     /*Index find the index number of proposed date string in checkDate function  */
     var index = date_text.findIndex(checkDate);

     var forecast_array=new Array();
     /*Then index number pass it to loop with increment of 8 because data is for 5 day and per 3hr to it contain 40 array,
     So,we can only get data which have date string of 09:00:00*/
     for(let i=index;i<40;i+=8){
     //const temp_forecast="Date: "+Forecast_data.list[i].dt_txt;
    //const temp_sealevel="Sealevel: "+Forecast_data.list[i].main.sea_level +"hPa";
    // forecast_array.push(temp_forecast);
    // forecast_array.push(temp_sealevel);
      const  forecast_array_temp =Forecast_data.list[i];
        forecast_array.push(forecast_array_temp);
     }
console.log(forecast_array);

        this.setState({
         Forecast_five_day:forecast_array,
          Forecast_cityname:Forecast_data.city.name
        });

        console.log(this.state.Forecast_five_day);

    }

  render(){
    
    //console.log(this.props);
     return(
       <div>
         
         <Typography variant="headline">Five Day Forecating of {this.state.Forecast_cityname}</Typography>
           <Grid container spacing={26} style={{padding:24}}>
           
             {this.state.Forecast_five_day.map((weatherForecast) => {
               return(
                 <div>
                   <Grid item xs={12}  lg={12} sm={6} xl={3}>
                   <Card  display ='flex'> 
                   <CardContent >
                   <div key={weatherForecast.dt}>
                   <Typography variant="headline">Date & Time</Typography>
                     <p>{weatherForecast.dt_txt}</p>
                     <Typography variant="headline">Sea Level</Typography>
                     <p>{weatherForecast.main.sea_level} hPa</p>

                   </div>
                   </CardContent >
                </Card>
                </Grid>
                </div>
              );
            })
          }
           
            </Grid>
            <Button variant="contained" color="primary" margin = "theme.spacing.unit">

              <Link to="/">Go Back</Link>
            </Button>
        </div>
      );
    }
}
Forecast.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Forecast);
