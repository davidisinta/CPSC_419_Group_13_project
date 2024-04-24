import { React, useState } from 'react';
import { Dialog, DialogPanel, Button, Card } from '@tremor/react';
import axios from 'axios';  

export default function ClockInButton() {
    const [open, setOpen] = useState(false);
    const [clockedIn, setClockedIn] = useState(false);
    const handleClockIn = () => {
        // Send time stamp to backend
        try {
            axios.post('http://127.0.0.1:5000/clockin', {
                time: new Date().toISOString()
            })
            .then((response) => {
                console.log(response);
            });
        }
        catch (error) {
            console.error(error);
        };
        // Close dialog
        setOpen(!open);
        // Update clockedIn state 
        setClockedIn(!clockedIn)
    };
    return (
        <div>
            {clockedIn? 
                <>
                {/* User is logged in */}
                    <Button variant='primary' onClick={() => setOpen(!open)}> Clocked In</Button>
                    <Dialog open={open} onClose={() => setOpen(!open)} title='Clock In'>
                        <DialogPanel>
                            <h3 className='text-center text-lgt font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>Are you sure you want to clock out?</h3>
                            <div className='flex mt-2'>
                                <Button variant='secondary' onClick={() => setOpen(!open)} className='w-1/2 mr-2'>Cancel</Button>
                                <Button variant='secondary' onClick={() => {handleClockIn()}} className='w-1/2'>Confirm</Button>
                            </div>
                        </DialogPanel>
                    </Dialog>
                </>
                : 
                <>
                {/* User is not logged in */}
                    <Button variant='secondary' onClick={() => setOpen(!open)}> Clock In</Button>
                    <Dialog open={open} onClose={() => setOpen(!open)} title='Clock In'>
                        <DialogPanel>
                            <h3 className='text-center text-lgt font-semibold text-tremor-content-strong dark:text-dark-tremor-content-strong'>Are you sure you want to clock in?</h3>
                            <div className='flex mt-2'>
                                <Button variant='secondary' onClick={() => setOpen(!open)} className='w-1/2 mr-2'>Cancel</Button>
                                <Button variant='secondary' onClick={() => {handleClockIn()}} className='w-1/2'>Confirm</Button>
                            </div>
                        </DialogPanel>
                    </Dialog>
                </>
            }
                
        </div>
    );
}