import { Card, Button } from '@tremor/react';
import React from 'react';

export default function LocationDialog({ location, onClose }) {
  // Dialog to report a problem or update inventory for a location
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="rounded-lg">
        <Card className="mx-auto max-w-xs">
          <p className="text-2xl text-center text-tremor-content-strong dark:text-dark-tremor-content">{location}</p>
          <div className="flex justify-center space-x-5 pt-5">
            <div className="space-y-3">
              <p className="text-center text-sm text-slate-500">Report a problem</p>
              <div className="flex justify-center">
                <Button variant="primary">Report</Button>
              </div>
            </div>
            <div className="space-y-3">
              <p className="text-center text-sm text-slate-500">Update inventory</p>
              <div className="flex justify-center">
                <Button variant="primary">Update</Button>
              </div>
            </div>
          </div>
          <div className="flex justify-center pt-5">
            <Button variant="secondary" onClick={onClose}>Close</Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
