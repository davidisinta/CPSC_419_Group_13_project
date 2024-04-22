import { React } from 'react';
import ShiftLog from '../shiftLog';
import UserProfileCard from '../userProfileCard';


export default function Shift() {
  return (
    <div className="flex pt-16 flex-col text-center justify-center">
        <div className="px-2 pt-2 pb-3 space-y-5 flex-col text-center">
            <UserProfileCard />
            <ShiftLog />
        </div>
    </div>
  );
}