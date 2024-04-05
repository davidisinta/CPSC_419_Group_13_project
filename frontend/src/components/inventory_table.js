import {
    Table,
    TableHead,
    TableHeaderCell,
    TableBody,
    TableRow,
    TableCell,
    ProgressBar
} from '@tremor/react';
import { RiFlag2Line } from '@remixicon/react';
import { Card, Badge } from '@tremor/react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import LocationDialog from './locationDialog';

export default function InventoryTable({ currentZone }) {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  // Open location dialog when a row is clicked
  const handleRowClick = (item) => {
    setSelectedItem(item);
  };
  // Close location dialog
  const handleCloseDialog = () => {
    setSelectedItem(null);
  };
  // Get color for toner progress bars based on toner percentage
  const getColorByPercent = (p) => {
    if (p > 30) return "teal";
    else if (p > 10) return "yellow";
    else return "red";
  }
  // Filter data based on the current zone
  const filterData = data.filter((item) => {
    return currentZone === 'all' || currentZone === String(item.zone);
  });
  // Fetch inventory data from the backend
  useEffect(() => {
    const fetchInventory = async () => {
      try{
        await axios.get('http://127.0.0.1:5000/')
        .then(response => {
          setData(response.data);
        });
      }
      catch (error) {
        console.error('Error fetching inventory table data:', error);
      }
    }
    fetchInventory();
  }, [currentZone]);

  return (
    <> 
      <Card className='pt-16'> {/* Padding to create room for fixed navbar */}
        <Table color='white'>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Location</TableHeaderCell>
              <TableHeaderCell>Functional</TableHeaderCell>
              <TableHeaderCell>Paper</TableHeaderCell>
              <TableHeaderCell>Zone</TableHeaderCell>
              <TableHeaderCell>Toner Type</TableHeaderCell>
              <TableHeaderCell>Black</TableHeaderCell>
              <TableHeaderCell>Cyan</TableHeaderCell>
              <TableHeaderCell>Magenta</TableHeaderCell>
              <TableHeaderCell>Yellow</TableHeaderCell>
              <TableHeaderCell>Waste</TableHeaderCell>
              <TableHeaderCell>Toner Percentages</TableHeaderCell>
              <TableHeaderCell>Keyboards</TableHeaderCell>
              <TableHeaderCell>Mice</TableHeaderCell>
              <TableHeaderCell>Model</TableHeaderCell>
              <TableHeaderCell>Kyocera Serial</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filterData.map((item, index) => (
              <TableRow key={index}>
                {/* Make printer location clickable */}
                  <TableCell onClick={() => handleRowClick(item)} className="cursor-pointer hover:underline">{item.loc}</TableCell>
                <TableCell>
                  <Badge color={item.status === "Functional" ? "emerald" : 'red'} icon={RiFlag2Line}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.paper}</TableCell>
                <TableCell>{"Zone ".concat(item.zone)}</TableCell>
                <TableCell >{item.toner_type}</TableCell>
                <TableCell>{item.black_toner}</TableCell>
                <TableCell>{item.cyan_toner}</TableCell>
                <TableCell>{item.magenta_toner}</TableCell>
                <TableCell>{item.yellow_toner}</TableCell>
                <TableCell>{item.waste_toner}</TableCell>
                <TableCell>
                  <div className="flex">
                      <div className="mx-auto max-w-sm pr-2">
                        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                          <span>Black</span>
                        </p>
                        <ProgressBar value={item.toner_percentage.black} color={getColorByPercent(item.toner_percentage.black)} className="mt-3" />
                      </div>
                      <div className="mx-auto max-w-sm pr-2">
                        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                          <span>Cyan</span>
                        </p>
                        <ProgressBar value={item.toner_percentage.cyan} color={getColorByPercent(item.toner_percentage.cyan)} className="mt-3" />
                      </div>
                      <div className="mx-auto max-w-sm pr-2">
                        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                          <span>Magenta</span>
                        </p>
                        <ProgressBar value={item.toner_percentage.magenta} color={getColorByPercent(item.toner_percentage.magenta)} className="mt-3" />
                      </div>
                      <div className="mx-auto max-w-sm pr-2">
                        <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                          <span>Yellow</span>
                        </p>
                        <ProgressBar value={item.toner_percentage.yellow} color={getColorByPercent(item.toner_percentage.yellow)} className="mt-3" />
                      </div>
                  </div>
                </TableCell>
                <TableCell>{item.keyboards}</TableCell>
                <TableCell>{item.mice}</TableCell>
                <TableCell>{item.model}</TableCell>
                <TableCell>{item.kyocera_serial}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
      {/* Show location dialog when a row is clicked */}
      {selectedItem && <LocationDialog item={selectedItem} onClose={handleCloseDialog} />}
    </>
  )
}