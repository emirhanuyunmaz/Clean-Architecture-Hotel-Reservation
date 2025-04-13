'use client'
import { Button, TextField } from "@mui/material";
import { DataGrid, GridColDef, GridRowParams } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { useRouter, useSearchParams } from "next/navigation";
import { useDeleteMultiBookMutation, useDeleteSingleBookMutation, useGetBookListQuery } from "@/store/book/bookApi";
import { ClipboardPenLine, Eye, Plus, Trash } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: '_id', headerName: 'ID', width: 256 },
  { field: 'title', headerName: 'Title', width: 256 },
  { field: 'location', headerName: 'Location', width: 128 },
  {
          field: "action",
          headerName: "Action",
          sortable: false,
          width:128,
          renderCell: ({ row }: Partial<GridRowParams>) =>{
              const [onSingleDeleteBook,resOnSingleDeleteBook] = useDeleteSingleBookMutation()
              
              return (<div className='after:flex after:justify-center after:items-center py-3 flex gap-3 ' >
                  <button  onClick={async() => {await onSingleDeleteBook({id:row._id})}} className="hover:opacity-50 transition-all">
                      <Trash/>
                  </button>
                  <Link  href={`/profile?select=3&add=false&id=${row._id}`} className="hover:opacity-50 transition-all">
                      <ClipboardPenLine color='blue' />
                  </Link>
                  <Link  href={`/profile?select=3&add=false&id=${row._id}`} className="hover:opacity-50 transition-all">
                      <Eye  color='blue' />
                  </Link>
              </div>)},
      },
];


const paginationModel = { page: 0, pageSize: 5 };

export default function AdminBookList(){

    const router = useRouter()
    const searchParams = useSearchParams()
    const [searchText ,setSearchText] = useState("")
    const getBookList = useGetBookListQuery(searchText);
    const [deleteMultiBook,resDeleteMultiDeleteBook] = useDeleteMultiBookMutation()
    const [bookDeletedList,setBookDeletedList] = useState([])

    const [data,setData] = useState<BookModel[]>(getBookList.data ?? []) 

    function AddRoomOnClick(){
        router.push(`?select=3&add=true`)
    }

    async function changeSearchText(){
        if(searchText != ""){
            router.push(`?select=3&searchText=${searchText}`)
            await getBookList.refetch()
            
        }else{
            router.push(`?select=3`)
        }
    }

    useEffect(() => {
        setSearchText(searchParams.get("searchText") ?? "" );
        
    },[])

    useEffect(() => {
        changeSearchText()
    },[searchText])

    useEffect(() => {
        if(getBookList.isSuccess){
            setData(getBookList.data)
        }
    },[getBookList.isSuccess,getBookList.isFetching])

    return (<div className="">
        <div>
            <div>
                <h3 className="text-2xl font-bold">Book List</h3>
            </div>
            <div className="flex gap-3 ">
                <TextField value={searchText} onChange={(e) => setSearchText(e.target.value)} label="Search" className="flex-1" />
                <Button variant="contained" onClick={AddRoomOnClick}><Plus/> Add Book</Button>
            </div>
        </div>
        <div className="mt-3">
          <Paper sx={{ height: 400, width: '100%' }}>
              <DataGrid
                  rows={getBookList.data}
                  getRowId={e => e._id}
                  columns={columns}
                  initialState={{ pagination: { paginationModel } }}
                  pageSizeOptions={[5, 10]}
                  checkboxSelection
                  onRowSelectionModelChange={(ids) => {
                    setBookDeletedList(ids as [])   
                  }}
                  sx={{ border: 0 }}
              />
          </Paper>
        </div>
        {bookDeletedList.length > 0 && <div className='flex justify-center mt-6'>
                    <Button  onClick={async () => {await deleteMultiBook({ids:bookDeletedList} )} } variant='contained' color='error' >Delete All</Button>
        </div>}
    </div>)
}