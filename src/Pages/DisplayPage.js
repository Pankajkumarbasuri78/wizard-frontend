// import React, { useEffect, useContext,useState } from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import Button from "@mui/material/Button";
// import { WizardContext } from "../Context/WizardContext";
// import PreviewForm from "./Preview";
// import Paper from "@mui/material/Paper";
// import axios from "axios";
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import FullscreenSharpIcon from '@mui/icons-material/FullscreenSharp';

// const DisplayPage = () => {

//   const [resData, setResData] = useState([]);

//   const { userId } = useParams();
//   // let resData = [];

//   const {
//     completeFormDataContext,
//     setCompleteFormDataContext,
//     wizardData,
//     setWizardData,
//     setIsValid,
//   } = useContext(WizardContext);

//   const navigate = useNavigate();

//   //take data from state
//   const location = useLocation();
//   const initialData = location.state.dataById;

//   console.log("initialData", initialData, "userID11111", userId);

//   const handleEdit = () => {
//     console.log("backend context", completeFormDataContext);
//     console.log("wizard data", wizardData);
//     setIsValid(true);
//     navigate(`/ui/${userId}`);
//   };

//     const handleDelete = async (userId) => {
//       try {
//         const res = await axios.delete(`http://localhost:8080/deleteData/${userId}`);

//         navigate("/");
//       } catch (error) {
//         console.error(
//           `Error fetching data for ID ${userId} from the backend:`,
//           error.message
//         );
//       }
//     };

//     function createData(name, calories, fat, carbs, protein) {
//       return { name, calories, fat, carbs, protein };
//     }
//     const rows = [
//       createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//       createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//       createData('Eclair', 262, 16.0, 24, 6.0),
//       createData('Cupcake', 305, 3.7, 67, 4.3),
//       createData('Gingerbread', 356, 16.0, 49, 3.9),
//     ];

//     // console.log("008920",userId,"typeof",typeof(userId));

// const perticularResData = resData.filter((item) => item.wizardId === parseInt(userId,10) );

// // console.log("16's data",perticularResData);

// const handleResData = async (id) => {
//   try {
//     const res = await axios.get(`http://localhost:8080/getDataRes/${id}`);

//     console.log("1234532",res.data);
//     // navigate("/");
//   } catch (error) {
//     console.error(
//       `Error fetching data for ID ${userId} from the backend:`,
//       error.message
//     );
//   }
// };

//   useEffect(() => {
//     const getResponseData = async()=>{
//       try {
//         const res = await axios.get("http://localhost:8080/getDataRes");
//         console.log("json data with res- ", res.data);
//         setResData(res.data);
//         // setWizardId(res.data);

//       } catch (error) {
//         console.log("error in fetching data", error);
//       }
//     }

//     console.log(typeof initialData, initialData);
//     setCompleteFormDataContext(initialData.completeFormDataContext);
//     // console.log("current count", currentCount);
//     // console.log("selected components", selectedComponents);

//     setWizardData({
//       title: initialData.title,
//       description: initialData.description,
//       totalSteps: initialData.totalSteps,
//     });
//     getResponseData();
//   }, []);

//   return (
//     <Paper
//       sx={{
//         width: "95%",
//         height: "95vh",
//         margin: "15px auto",
//         display: "flex",
//       }}
//       elevation={8}
//     >
//       {/* <div style={{ display: "flex" }}> */}
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "center",
//           alignItems: "center",
//           gap: "30px",
//           maxWidth: "350px",
//           padding: "0 30px",
//         }}
//       >
//         <div style={{}}>
//           <strong>Title</strong>-{initialData.title}
//         </div>
//         <div>
//           <strong>Description</strong>-{initialData.description}
//         </div>
//         {/* <h6>{initialData.description}</h6> */}
//         <div style={{ display: "flex", gap: "20px" }}>
//           <Button
//             variant="outlined"
//             color="success"
//             className="buttonClass"
//             onClick={handleEdit}
//           >
//             Edit
//           </Button>
//           <Button
//             variant="outlined"
//             color="success"
//             className="buttonClass"
//             onClick={() => navigate("/")}
//           >
//             Back
//           </Button>
//           <Button
//             variant="outlined"
//             color="success"
//             className="buttonClass"
//             onClick={() => handleDelete(userId)}
//           >
//             Delete
//           </Button>
//         </div>

//         <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 650 }} aria-label="simple table">
//         <TableHead>
//           <TableRow>
//             <TableCell>ID</TableCell>
//             <TableCell align="right">ViewRes</TableCell>
//             <TableCell align="right">DeleteRes</TableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {perticularResData.map((row) => (
//             <TableRow
//               key={row.id}
//               sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
//             >

//               <TableCell component="th" scope="row">
//                 {row.id}
//               </TableCell>
//               {/* <TableCell align="right">{row.wizardId}</TableCell> */}
//               <TableCell align="right"><FullscreenSharpIcon onClick={()=>handleResData(row.id)}/></TableCell>
//               <TableCell align="right">{row.WizardId}</TableCell>
//             </TableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>

//         {/* <br />
//         <pre>{JSON.stringify(initialData, null, 2)}</pre>
//         <br /> */}
//       </div>
//       <div style={{ flex: "1", height: "100%", overflowY: "scroll" }}>
//         {Object.keys(completeFormDataContext).length && <PreviewForm />}
//       </div>
//       {/* </div> */}
//     </Paper>
//   );
// };

// export default DisplayPage;

import React, { useEffect, useContext, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Button from "@mui/material/Button";
import { WizardContext } from "../Context/WizardContext";
import PreviewForm from "./Preview";
import Paper from "@mui/material/Paper";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import FullscreenSharpIcon from "@mui/icons-material/FullscreenSharp";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import Tooltip from "@mui/material/Tooltip";
import EditNoteRoundedIcon from "@mui/icons-material/EditNoteRounded";

const DisplayPage = () => {
  const [resData, setResData] = useState([]);

  const { userId } = useParams();
  // let resData = [];

  const {
    completeFormDataContext,
    setCompleteFormDataContext,
    wizardData,
    setWizardData,
    setIsValid,
    setUserNAME,
  } = useContext(WizardContext);

  const navigate = useNavigate();

  //take data from state
  const location = useLocation();
  const initialData = location.state.dataById;

  console.log("initialData", initialData, "userID11111", userId);

  const handleEdit = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/getDataRes/${id}`);

      let Data = JSON.parse(res.data.jsonDataResponse);
      setUserNAME(res.data.name);

      setCompleteFormDataContext(Data.completeFormDataContext);

      console.log("tttt", completeFormDataContext, "data", Data);

      console.log("hello", res.data);
      console.log("backend context", completeFormDataContext);
      console.log("wizard data", wizardData);
      setIsValid(true);
      navigate(`/ui/${userId}`);
      // navigate("/");
    } catch (error) {
      console.error(
        `Error fetching data for ID ${userId} from the backend:`,
        error.message
      );
    }
  };

  const handleNewForm = () => {
    console.log("new form", resData);
    const singleForm = resData.find(
      (item) => item.wizardId === parseInt(userId, 10)
    );
    // console.log("singleForm",singleForm);
    if (singleForm) {
      const jsonSingleForm = JSON.parse(singleForm.jsonDataResponse);
      const { completeFormDataContext } = jsonSingleForm;
      // assigning a globalobject here
      const newCompleteFormDataContext = {};
      // completeFormDataContext is an object
      Object.entries(completeFormDataContext).forEach(([page, components]) => {
        // traversing that object
        const newPageObject = {};
        Object.entries(components).forEach(([key, value]) => {
          const answerRemoved = { ...value, answer: "" };
          newPageObject[key] = answerRemoved;
        });
        newCompleteFormDataContext[page] = newPageObject;
      });
      setCompleteFormDataContext(newCompleteFormDataContext);
      navigate(`/preview/${userId}`);
    }
  };

  // const handleEditNew = () => {
  //   navigate(`/ui/${userId}`);
  // }

  const handleDelete = async (userId) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/deleteData/${userId}`
      );

      navigate("/");
    } catch (error) {
      console.error(
        `Error fetching data for ID ${userId} from the backend:`,
        error.message
      );
    }
  };

  // console.log("008920",userId,"typeof",typeof(userId));

  const perticularResData = resData.filter(
    (item) => item.wizardId === parseInt(userId, 10)
  );

  console.log("16's data", perticularResData);

  const handleResData = async (id) => {
    try {
      const res = await axios.get(`http://localhost:8080/getDataRes/${id}`);

      let Data = JSON.parse(res.data.jsonDataResponse);
      //  setCurrIdData(res.data.name);
      setUserNAME(res.data.name);
      setCompleteFormDataContext(Data.completeFormDataContext);

      console.log("tttt", completeFormDataContext, "data", Data);

      console.log("hello", res.data);
      // navigate("/");
    } catch (error) {
      console.error(
        `Error fetching data for ID ${userId} from the backend:`,
        error.message
      );
    }
  };

  const handleDelData = async (id) => {
    try {
      const res = await axios.delete(
        `http://localhost:8080/deleteDataRes/${id}`
      );

      // let Data = JSON.parse(res.data.jsonDataResponse);
      // setCurrIdData(Data)

      console.log("hello", res);
      // navigate("/");
    } catch (error) {
      console.error(
        `Error fetching data for ID ${userId} from the backend:`,
        error.message
      );
    }
  };

  useEffect(() => {
    // console.log("LOGGING CFDC",completeFormDataContext);
    const getResponseData = async () => {
      try {
        const res = await axios.get("http://localhost:8080/getDataRes");
        console.log("json data with res- ", res.data);
        setResData(res.data);
        // setWizardId(res.data);
      } catch (error) {
        console.log("error in fetching data", error);
      }
    };

    console.log(typeof initialData, initialData);
    // setCompleteFormDataContext(initialData.completeFormDataContext);
    // setCompleteFormDataContext(currIdData.completeFormDataContext)
    // console.log("current count", currentCount);
    // console.log("selected components", selectedComponents);

    setWizardData({
      title: initialData.title,
      description: initialData.description,
      totalSteps: initialData.totalSteps,
    });

    // setWizardData({
    //   title: currIdData.title,
    //   description: currIdData.description,
    //   totalSteps: currIdData.totalSteps,
    // });
    getResponseData();
  }, []);

  return (
    <Paper
      sx={{
        width: "95%",
        height: "95vh",
        margin: "15px auto",
        display: "flex",
        // backgroundColor:'#f5f4f0'
      }}
      elevation={8}
    >
      {/* <div style={{ display: "flex" }}> */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: "30px",
          // maxWidth: "350px",
          flex: "1",
          padding: "0 30px",
        }}
      >
        <div style={{}}>
          <strong>Title</strong>-{initialData.title}
        </div>
        <div>
          <strong>Description</strong>-{initialData.description}
        </div>
        {/* <h6>{initialData.description}</h6> */}
        <div style={{ display: "flex", gap: "20px" }}>
          <Button
            variant="outlined"
            color="success"
            className="buttonClass"
            onClick={handleNewForm}
          >
            NEW
          </Button>
          <Button
            variant="outlined"
            color="success"
            className="buttonClass"
            onClick={() => navigate("/")}
          >
            Back
          </Button>
          <Button
            variant="outlined"
            color="success"
            className="buttonClass"
            onClick={() => handleDelete(userId)}
          >
            Delete
          </Button>
        </div>

        {perticularResData.length ? (
          <TableContainer component={Paper} style={{ maxHeight: "386px" }}>
            <Table sx={{ minWidth: 150 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>ID</TableCell>
                  <TableCell align="right">Name</TableCell>
                  <TableCell align="right">View</TableCell>
                  <TableCell align="right">Edit</TableCell>
                  <TableCell align="right">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {perticularResData.map((row) => (
                  <TableRow
                    key={row.id}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.id}
                    </TableCell>
                    {/* <TableCell align="right">{row.wizardId}</TableCell> */}
                    <TableCell align="right">{row.name}</TableCell>

                    <TableCell align="right">
                      <Tooltip title="view">
                        <FullscreenSharpIcon
                          onClick={() => handleResData(row.id)}
                        />
                      </Tooltip>
                    </TableCell>

                    <TableCell align="right">
                      <Tooltip title="Edit">
                        {/* <EditNoteRoundedIcon onClick={()=>handleDelData(row.id)}/> */}
                        <EditNoteRoundedIcon
                          onClick={() => handleEdit(row.id)}
                        />
                      </Tooltip>
                    </TableCell>
                    <TableCell align="right">
                      <Tooltip title="Delete">
                        <DeleteOutlinedIcon
                          onClick={() => handleDelData(row.id)}
                        />
                      </Tooltip>
                    </TableCell>

                    <TableCell align="right">{row.WizardId}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <h3>NO RESPONSE EXIST</h3>
        )}

        {/* <br />
        <pre>{JSON.stringify(initialData, null, 2)}</pre>
        <br /> */}
      </div>
      {Object.keys(completeFormDataContext).length ? (
        <div style={{ flex: "2", height: "100%", overflowY: "scroll" }}>
          <PreviewForm />
        </div>
      ) : (
        ""
      )}
      {/* </div> */}
    </Paper>
  );
};

export default DisplayPage;
