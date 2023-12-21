import React from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from "react-router-dom";

const CreateCard = ({title}) => {

  const navigate = useNavigate();

  const handleClick = () =>{
    navigate("/wizard-creation");
  }

  return (
    <Card sx={{ minWidth: 275 }}>
      <CardContent sx={{textAlign:'center'}}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
        Wizard UI Builder
        </Typography>
        <AddIcon sx={{ fontSize: 100 }}/>
      </CardContent>
      <CardActions sx={{display:'flex',justifyContent:'center',alignItems:'center'}}>
        <Button size="large" onClick={handleClick}>{title} </Button>
      </CardActions>
    </Card>
  )
}

export default CreateCard