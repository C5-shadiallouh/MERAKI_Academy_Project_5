import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import { DeleteOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import axios from 'axios'
import SideBar from '../Component/Dashboard/SideBar/SideBar'
import {AiOutlineEdit} from "react-icons/ai"

const MealList = () => {
  const[isDeleted,setIsDeleted]=useState(false)
  const [tableData, setTableData] = useState([])
  const [confirmation,setConfirmation]=useState({message:"",
isLoading:false})
  const {token,user}=useSelector((state)=>{
    return{
      token:state.auth.token,
      user:state.users.users

    }
  })
  const deleteUser=(id)=>{
    setConfirmation({
      message:"هل انت متأكد من عملية الحذف؟",
      isLoading:true
    })
    axios.delete(`http://localhost:5000/meals/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((result) => {setIsDeleted(!isDeleted)})
  }
  const columns = [
    { field: 'id', headerName: 'ID' },
    { field: 'meal_name', headerName: 'اسم الوجبة', width: 300 },
    { field: 'meal_price', headerName: 'سعر الوجبة', width: 600 },
    
    {
      field: "",
      headerName: "تعديل - حذف الوجبة",
      width: 200,
      renderCell: (params) => {
        return (
          <>
            <Link to={"/edit-meals/" + params.row.id}>
              <AiOutlineEdit className="userListEdit" style={{cursor:"pointer",fontSize:"20px" ,color:"green"}}/>
            </Link>
            <IconButton onClick={()=>{deleteUser(params.row.id)}}>
            <DeleteOutline
              className="userListDelete"
              style={{color:"red"}}
            
              
            />
            </IconButton>
          
          </>
        );
      },
    },
    
    

  ]
  useEffect(() => {
    axios.get("http://localhost:5000/meals", {
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

export default MealList