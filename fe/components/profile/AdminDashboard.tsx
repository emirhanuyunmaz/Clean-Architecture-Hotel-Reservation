import { Button, Paper, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import AdminAddUpdateUser from './AdminAddUpdateUser';
import { useGetAllUserListQuery } from '@/store/user/userApi';

const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', type:"string", width: 256 },
    { field: 'admin', headerName: 'Admin', width: 130 },
    { field: 'nameSurname', headerName: 'Name Surname', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
  ];
const paginationModel = { page: 0, pageSize: 5 };

export default function AdminDashboard(){

    const router = useRouter()
    const getAllUserList = useGetAllUserListQuery("")
    console.log(getAllUserList.data);

    const [addAndUpdateUser,setAddAndUpdateUser] = useState(false)

    return (<div className='flex flex-col gap-3'>

        <div>
            <h2 className='text-2xl font-bold ' >Admin Dashboard</h2>
        </div>


        {addAndUpdateUser ?<AdminAddUpdateUser setBack={setAddAndUpdateUser} /> :        
        <div>
            <div className='flex gap-3'>
                <TextField label="Search" className='flex-1' />
                <Button variant='contained' onClick={() => setAddAndUpdateUser(true)}  >+Add Owner</Button>
            </div>

            <div>

                <Paper sx={{ height: "90%", width: '100%' }}>
                    <DataGrid
                        // onRowClick={(event,rowData) => router.push(`/userDetail/${event.id}`)}
                        rows={getAllUserList.data}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        getRowId={e => e._id}
                        checkboxSelection

                        sx={{ border: 0 }}
                        />
                </Paper>

            </div>
        </div>
        }

    </div>)
}