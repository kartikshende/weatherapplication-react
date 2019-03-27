import React from "react";
import {Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

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

function Weather (props) {
  const { classes } = props;
  return(
  <div>
    <Grid container spacing={26} style={{padding:24}}>
  {props.Weather_info.map((weather)=> {
      
     
      const sunrise= new Date(weather.sys.sunrise * 1000).toLocaleTimeString();
      const sunset= new Date(weather.sys.sunset * 1000).toLocaleTimeString();

      const img=`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`;
    
      
    return (
    
    <div>
      <Grid  item xs={12}  lg={12} sm={6} xl={3}>
    <div key={weather.id}>
      
      
      
      <Card className={classes.card}>  
      <div className={classes.details}>

       
        <CardContent className={classes.content}>
              <img src={img} alt={weather.weather[0].description}/>
              <Typography gutterBottom variant="headline" component="h2">{weather.name}</Typography>
              <Typography component="p">Temprature: {weather.main.temp}</Typography>
              <Typography component="p">Sunrise: {sunrise}</Typography>
              <Typography component="p">Sunset: {sunset}</Typography>
        </CardContent> 
        <CardActions> 
            <Button variant="outlined" size="small" color="primary">
              <Link to={{
               pathname:`/forecast/${weather.id}`,
               state:{city_id: weather.id}
               }}>View More </Link>
            </Button>
       </CardActions>
       </div>
       <CardMedia
          className={classes.media}
          image={img}
          title={weather.name}
        />
       </Card>
   
       
      </div>
      
      </Grid>
      </div>

  );
  })
 
  }
  </Grid>
  </div>
  );}
  Weather.propTypes = {
    classes: PropTypes.object.isRequired,
  };

  export default withStyles(styles)(Weather);
