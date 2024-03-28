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

export default function InventoryTable() {
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
  }, []);

  return (
    <>
      <Card>
        <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Printers Maintained by STC Cluster Technology</h3>
        <Table className="mt-5" color='white'>
          <TableHead>
            <TableRow>
              <TableHeaderCell>Location</TableHeaderCell>
              <TableHeaderCell>Functional</TableHeaderCell>
              <TableHeaderCell>Paper</TableHeaderCell>
              <TableHeaderCell>Zone</TableHeaderCell>
              <TableHeaderCell>Toner Type</TableHeaderCell>
              <TableHeaderCell>Waste Toner</TableHeaderCell>
              <TableHeaderCell>Black</TableHeaderCell>
              <TableHeaderCell>Cyan</TableHeaderCell>
              <TableHeaderCell>Magenta</TableHeaderCell>
              <TableHeaderCell>Yellow</TableHeaderCell>
              <TableHeaderCell>Toner Percentages</TableHeaderCell>
              <TableHeaderCell>Model</TableHeaderCell>
              <TableHeaderCell>Kyocera Serial</TableHeaderCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((item) => (
              <TableRow key={item.id}>
                {/* Make printer location clickable */}
                <div key={item.id} onClick={() => handleRowClick(item)}>
                  <TableCell className="cursor-pointer hover:underline">{item.loc}</TableCell>
                </div>
                <TableCell>
                  <Badge color={item.status === "Functional" ? "emerald" : 'red'} icon={RiFlag2Line}>
                    {item.status}
                  </Badge>
                </TableCell>
                <TableCell>{item.paper}</TableCell>
                <TableCell>{"Zone ".concat(item.zone)}</TableCell>
                <TableCell >{item.toner_type}</TableCell>
                <TableCell>{item.waste_toner}</TableCell>
                <TableCell>{item.black_toner}</TableCell>
                <TableCell>{item.cyan_toner}</TableCell>
                <TableCell>{item.magenta_toner}</TableCell>
                <TableCell>{item.yellow_toner}</TableCell>
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