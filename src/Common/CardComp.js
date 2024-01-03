import React from "react";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import { grey } from "@mui/material/colors";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Box from "@mui/material/Box";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CardComp = ({ title, id,title1 }) => {
  const navigate = useNavigate();

  const handleData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/getData/${id}`);
      const dataById = JSON.parse(res.data.jsonData);

      console.log(`Data retrieved for ID ${id}:`, dataById);

      //navigate
      navigate(`/displayPage/${id}`, { state: { dataById } });
    } catch (error) {
      console.error(
        `Error fetching data for ID ${id} from the backend:`,
        error.message
      );
    }
  };

  return (
    <Card sx={{ minWidth: 275, margin: "20px 0" }}>
      <CardContent sx={{ textAlign: "center" }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Wizard UI Builder
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Avatar
            sx={{ bgcolor: grey[300], height: 100, width: 100 }}
            variant="rounded"
          >
            <AssignmentIcon sx={{ fontSize: 60 }} />
          </Avatar>
        </Box>
      </CardContent>
      <CardActions
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        <div style={{display:'flex',flexDirection:'column'}}>
        <Button
          sx={{
            display: "block",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "250px",
            textOverflow: "ellipsis",
          }}
          onClick={() => handleData(id)}
        >
          {title1}{" "}{title}{" "}
        </Button>
        <Button
          sx={{
            display: "block",
            overflow: "hidden",
            whiteSpace: "nowrap",
            maxWidth: "250px",
            textOverflow: "ellipsis",
          }}
          onClick={() => handleData(id)}
        >
          Data Collected
        </Button>
        </div>
      </CardActions>
    </Card>
  );
};

export default CardComp;
