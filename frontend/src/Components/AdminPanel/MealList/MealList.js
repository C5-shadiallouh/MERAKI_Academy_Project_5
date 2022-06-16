import React, { useState, useEffect } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import { useSelector } from 'react-redux'
import { DeleteOutline } from '@material-ui/icons'
import { Link } from 'react-router-dom'
import { IconButton } from '@mui/material'
import axios from 'axios'



const MealList = () => {
  const[isDeleted,setIsDeleted]=useState(false)
  const [tableData, setTableData] = useState([])
  const {token,user}=useSelector((state)=>{
    return{
      token:state.auth.token,
      user:state.users.users

    }
  })
  const deleteUser=(id)=>{
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
            <Link to={"/user/" + params.row.id}>
              <button className="userListEdit">Edit</button>
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
    axios.get("http://localhost:5000/meals", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((result) => setTableData(result.data.result))

  }, [isDeleted])

  console.log(tableData)

  return (
    <div style={{ height: 700, width: '100%' }}>
      <DataGrid
        rows={tableData}
        columns={columns}
        pageSize={12}
        disableSelectionOnClick
      />
    </div>
  )
}

export default MealList