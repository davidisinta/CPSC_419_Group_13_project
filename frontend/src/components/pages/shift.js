import { React } from 'react';
import ShiftLog from '../shiftLog';
import UserProfileCard from '../userProfileCard';


export default function Shift() {
  return (
    <>
        <div className='pt-16 about-container dark:text-light-tremor-content'>
           <UserProfileCard />
          <ShiftLog />
        </div>
    </>
  );
}