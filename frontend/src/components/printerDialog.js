import { 
  Card,
  Button,
  Tab,
  TabGroup,
  TabList,
  TabPanel,
  TabPanels } from '@tremor/react';
import { Link } from 'react-router-dom';
import React from 'react';


export default function PrinterDialog({ item, onClose }) {
  // Dialog to report a problem or update inventory for a location
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="rounded-lg">
        <Card className="mx-auto max-w-xs">
          <p className="text-2xl text-center text-tremor-content-strong dark:text-dark-tremor-content">{item.loc}</p>
          <p className="text-l text-center text-tremor-content-strong dark:text-dark-tremor-content">{item.addr}</p>
          <div className="flex justify-center space-x-5 pt-5">
            <div className="space-y-3">
              <TabGroup>
                <TabList className='flex justify-center'>
                  <Tab>Report</Tab>
                  <Tab>Update</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <div className='pb-2'>
                      <p className="text-tremor-content-strong dark:text-dark-tremor-content text-center">Report a problem with this printer</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                    <Link to={`/report`} state={{item:item}}><Button variant="secondary">Report</Button></Link>
                      <Button size='xs' variant="secondary" onClick={onClose}>Close</Button>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className='pb-2'>
                      <p className="text-tremor-content-strong dark:text-dark-tremor-content text-center">Update printer info</p>
                    </div>
                    <div className="flex justify-center space-x-4">
                      {/* Passing the 'item' object as a prop to the `/update/${id}` link for use in the InventoryForm */}
                      <Link to={`/percent`} state={{item:item}}><Button variant="secondary">Update</Button></Link>
                      <Button size='xs' variant="secondary" onClick={onClose}>Close</Button>
                    </div>
                  </TabPanel>
                </TabPanels>
              </TabGroup>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}

