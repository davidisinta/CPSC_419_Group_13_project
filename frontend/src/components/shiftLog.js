import { React } from 'react';
import { Card } from '@tremor/react';

export default function ShiftLog() {
    return (
        <Card className='mx-auto max-w-xs max-h-30 overflow-y-auto' style={{ height: '200px' }}>
            <h1 className='text-2xl font-bold text-white text-center'>Shift Log</h1>
        </Card>
    );
}