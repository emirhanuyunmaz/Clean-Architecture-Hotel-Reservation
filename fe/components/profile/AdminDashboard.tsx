import { Button, Paper, TextField } from '@mui/material';
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import { useRouter, useSearchParams } from 'next/navigation';
import { ChangeEvent, useEffect, useState } from 'react';
import AdminAddUpdateUser from './AdminAddUpdateUser';
import { useGetAllUserListQuery, useOnMultiDeleteUserMutation, useOnSingleDeleteUserMutation, useSearchUserListQuery } from '@/store/user/userApi';
import { ClipboardPenLine, Trash } from 'lucide-react';
import Link from 'next/link';


const columns: GridColDef[] = [
    { field: '_id', headerName: 'ID', type:"string", width: 256 },
    { field: 'admin', headerName: 'Admin', width: 64 },
    { field: 'nameSurname', headerName: 'Name Surname', width: 256 },
    { field: 'email', headerName: 'Email', width: 300 },
    {
        field: "action",
        headerName: "Action",
        sortable: false,
        width:128,
        renderCell: ({ row }: Partial<GridRowParams>) =>{
            const [onSingleDeleteUser,resOnSingleDeleteUser] = useOnSingleDeleteUserMutation()
            
            return (<div className='flex justify-center items-center' >
                <Button onClick={async() => {return await onSingleDeleteUser({id:row._id})}}>
                    <Trash/>
                </Button>
                <Link href={`?select=2&add=false&id=${row._id}`} >
                    <ClipboardPenLine color='blue' />
                </Link>
            </div>)},
    },
    
  ];
const paginationModel = { page: 0, pageSize: 5 };

export default function AdminDashboard(){
    const searchParams = useSearchParams()
    const router = useRouter()
    
    const [searchText,setSearchText] = useState("")
    const [deletedUserList,setDeletedUserList] = useState<any>([])
    const [addAndUpdateUser,setAddAndUpdateUser] = useState(searchParams.get("add") ? true : false)
    const [userId,setUserId] = useState(searchParams.get("id"))

    const getAllUserList = useGetAllUserListQuery("")
    const [multiDeleteUser,resMultiDeleteUser] = useOnMultiDeleteUserMutation()
    const searchUser = useSearchUserListQuery(searchText)

    function AddOwnerOnClick(){
        router.push(`?select=2&add=true`)
        setAddAndUpdateUser(true)
    }
    function searchTextOnChange(e:ChangeEvent<HTMLInputElement>){
        router.push(`?select=2&searchText=${e.target.value}`)
        setSearchText(e.target.value)
    }

    useEffect(() => {
        if(searchParams.get("id")){
            
            setAddAndUpdateUser(true)
        }else{
            setAddAndUpdateUser(false)
        }
    },[searchParams.get("id")])

    
    return (<div className='flex flex-col gap-3'>

        <div>
            <h2 className='text-2xl font-bold ' >Admin Dashboard</h2>
        </div>


        {addAndUpdateUser ?<AdminAddUpdateUser setBack={setAddAndUpdateUser}  /> :        
        <div>
            <div className='flex gap-3'>
                <TextField value={searchText} onChange={(e:ChangeEvent<HTMLInputElement>) => searchTextOnChange(e)} label="Search" className='flex-1' />
                <Button variant='contained' onClick={AddOwnerOnClick}  >+Add Owner</Button>
            </div>

            <div>

                {/* <AdminDashboardTable/> */}
                <Paper sx={{ height: "90%", width: '100%' }}>
                    <DataGrid
                        rows={searchText != "" ? searchUser.data : getAllUserList.data}
                        columns={columns}
                        initialState={{ pagination: { paginationModel } }}
                        pageSizeOptions={[5, 10]}
                        getRowId={e => e._id}
                        onRowSelectionModelChange={(ids) => {
                            setDeletedUserList(ids as [])   
                        }}
                        checkboxSelection
                        sx={{ border: 0 }}
                        />
                </Paper>
            </div>

            {deletedUserList.length > 0 && <div className='flex justify-center mt-6'>
                <Button  onClick={async () => {await multiDeleteUser({ids:deletedUserList} )} } variant='contained' color='error' >Delete All</Button>
            </div>}
        </div>
        }

    </div>)
}