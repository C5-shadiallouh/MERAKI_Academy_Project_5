import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import { DeleteOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import axios from 'axios'
import SideBar from '../Dashboard/SideBar/SideBar'



const UserList = () => {
  const[isDeleted,setIsDeleted]=useState(false)
  const [tableData, setTableData] = useState([])
  const {token,user}=useSelector((state)=>{
    return{
      token:state.auth.token,
      user:state.users.users

    }
  })
  const deleteUser=(id)=>{
    axios.delete(`http://localhost:5000/users/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((result) => {setIsDeleted(!isDeleted)})
  }
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'firstName', headerName: 'الاسم', width: 300 },
    { field: 'lastName', headerName: 'اسم العائلة', width: 300 },
    { field: 'email', headerName: 'البريد الالكتروني', width: 300 },
    {
      field: "",
      headerName: "تعديل المستخدم",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/user/" + params.row.id}>
              
            </Link>
            <IconButton onClick={()=>{deleteUser(params.row.id)}}>
            <DeleteOutline
              className="userListDelete"
              
            
              
            />
            </IconButton>
          </>
        );
      },
    },
    
    
  
  ]


  useEffect(() => {
    axios.get("http://localhost:5000/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result) => setTableData(result.data.result))

  }, [isDeleted])

  console.log(tableData)

  return (
    <div>
      <SideBar/>
    <div style={{ height: 700, width: '85.3%' ,position:"absolute" ,left:"0%"}}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        disableSelectionOnClick
      />
    </div>
    </div>
  )
}

export default UserList