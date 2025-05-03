'use client'
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import { X } from 'lucide-react';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { useState } from 'react';
import dayjs ,{ Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useDispatch } from 'react-redux';
import { createReservation } from '@/store/reservation/reservationSlice';
import { useRouter } from 'next/navigation';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));
interface ReservationState {
    startDay:Dayjs | null,
    endDay:Dayjs | null,
    bookID:string | null,
    userID:string | null,
    // totalPrice:number,
    isPayment:boolean
  }
export default function ReservationDialog({bookID}:{bookID:string}) {
    const dispatch = useDispatch() 
    const router = useRouter()
    const date = new Date()
    const [open, setOpen] = useState(false);
    const [startDate,setStartDate] = useState<Dayjs | null>(dayjs(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`))
    const [endDate,setEndDate] = useState<Dayjs | null>(dayjs(`${date.getFullYear()}-${date.getMonth()}-${date.getDay()}`))

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  function onSubmit(){
    const data = {
        bookID:bookID,
        startDay:startDate!.toISOString(),
        endDay:endDate!.toISOString(),
        isPayment:false
    }
    dispatch(createReservation(data))
    handleClose()
    router.push("/payment")
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <Button variant="outlined" onClick={handleClickOpen}>
        Book Now
      </Button>
      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
            Reservation Date
        </DialogTitle>
        <IconButton
          aria-label="close"
          onClick={handleClose}
          sx={(theme) => ({
            position: 'absolute',
            right: 8,
            top: 8,
            color: theme.palette.grey[500],
          })}
        >
          <X/>
        </IconButton>
        <DialogContent dividers>
          <div className='flex flex-col gap-3 md:flex-row'>
            <DatePicker
                label="Start Day"
                value={startDate}
                onChange={(newValue) => setStartDate(newValue!)}
                />
            <DatePicker
                label="End Day"
                value={endDate}
                onChange={(newValue) => setEndDate(newValue!)}
                />
          </div>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={onSubmit}>
            Payment
          </Button>
        </DialogActions>
      </BootstrapDialog>
      </LocalizationProvider>
  );
}
