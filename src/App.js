import logo from './logo.svg';
import './App.css';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Formtable from './components/Formtable';
axios.defaults.baseURL = "http://localhost:5000";

function App() {

  const[addSection, setAddSection] =  useState(false)
  const[editSection, setEditSection] =  useState(false)
  const [formData, setFormdata] = useState({
    name : "",
    email : "",
    mobile : "",
  })

  const [formDataEdit, setFormdataEdit] = useState({
    name : "",
    email : "",
    mobile : "",
    _id : "",
  })

  
  
  const handleOnChange = (e)=>{
    const {value,name} = e.target
    setFormdata((preve) =>{
      return{
        ...preve,
        [name] : value
      }
    })

  }

  const handleSubmit = async(e)=>{
      e.preventDefault()
      const data  = await axios.post("/create",formData)
      // console.log('**********',data)
      if(data.data.success){
        setAddSection(false)
        alert(data.data.message)
        getFetchData()
        setFormdata({
          name: '',
          email: '',
          mobile: '',
        })
      }
      console.log(formData)
  };
  const[dataList, setDataList] =  useState([])
  const getFetchData = async()=>{
    const data  = await axios.get("/")
    // console.log('**********',data)
    if(data.data.success){
      setDataList(data.data.data)
    }
  };
  useEffect(()=>{
    getFetchData()
  },[])
 // console.log(dataList)
  const handleDelete = async(id)=> {
    const data = await axios.delete("/delete/"+id)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
    }
  }

  const handleUpdate = async(e)=> {
    e.preventDefault()
    const data = await axios.put("/update/",formDataEdit)
    if(data.data.success){
      getFetchData()
      alert(data.data.message)
      setEditSection(false)
    }
  }

  const handleEditOnChange = async(e)=> {
    const {value,name} = e.target
    setFormdataEdit((preve) =>{
      return{
        ...preve,
        [name] : value
      }
    })
  }

  const handleEdit = async(row)=> {
    setFormdataEdit(row)
    setEditSection(true)
  }

  return (
    <>
    {/* React app */}
      <div className="container">
        <button className="btn btn-add" onClick={()=>setAddSection(true)}>Add</button>

      {
        addSection && (
          <Formtable
            handleSubmit = {handleSubmit}
            handleOnChange = {handleOnChange}
           handleclose = {()=> setAddSection(false)}
           rest = {formData}
          />
        )
      }

      {
        editSection &&  (
          <Formtable
          handleSubmit = {handleUpdate}
          handleOnChange = {handleEditOnChange}
         handleclose = {()=> setEditSection(false)}
         rest = {formDataEdit}
        />
        )

      }
      
        {
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell align="right">Email</TableCell>
                  <TableCell align="right">Mobile&nbsp;(g)</TableCell>
                  <TableCell align="right">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                dataList[0] ? (
                dataList.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell align="right">{row.email}</TableCell>
                    <TableCell align="right">{row.mobile}</TableCell>
                    <TableCell align="right">
                      <Button variant="contained" onClick={()=>handleEdit(row)}>Edit
                      </Button> &nbsp;
                      <Button variant="outlined" onClick={()=>handleDelete(row._id)}>Delete
                      </Button>
                      </TableCell>
                  </TableRow>
                ))
                ) : (
                  <TableRow><TableCell align="right"><p>No Data</p></TableCell></TableRow> 
                )
              }
              </TableBody>
            </Table>
          </TableContainer>
        }
      </div>
    </>
  );
}

export default App;
