import { React } from 'react';
import { Card, Divider } from '@tremor/react';
import ClockInButton from './clockInButton';

export default function UserProfileCard() {

    return (
        <>
            <Card className='mx-auto max-w-xs max-h-64 flex justify-center'>
                <div>
                    <h1 className='text-2xl font-bold text-white text-center'>FirstName SecondName</h1>
                    <div className='pt-4'>
                        <p className='text-white text-center '>Shift info</p>
                    </div>
                    <Divider>Clock In</Divider>
                    <div className='pt-4 flex justify-center'>
                        <ClockInButton />
                    </div>
                </div>
            </Card>
        </>
    )
}
