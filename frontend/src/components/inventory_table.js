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
//import data from './inventory_data';
//import React from 'react';


export default function InventoryTable() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const r = await fetch('http://127.0.0.1:5000/summary'); 
        if (!r.ok) {
          throw new Error('failed to fetch');
        }
        const data = await r.json();
        setData(data); 
      } catch (error) {
        console.error('setting data failed:', error);
      }
    }; fetchData(); }, []);
  return (
    <>
        <Card>
      <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">Printers Maintained by STC Cluster Technology</h3>
      <div>{data.length > 0 ? (
          <p>Data received.</p>
        ) : (
          <p>No data received.</p>
        )}
      </div>
      <Table className="mt-5" color='white'>
        <TableHead>
          <TableRow>
            <TableHeaderCell>ID</TableHeaderCell>
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
            <TableRow key={item.name}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Badge color="emerald" icon={RiFlag2Line}>
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
                <div className="flex flex-wrap">
                    <div className="mx-auto max-w-sm">
                    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                        <span>Black</span>
                    </p>
                    <ProgressBar value={item.toner_percentage.black} color="teal" className="mt-3" />
                    </div>
                    <div className="mx-auto max-w-sm">
                    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                        <span>Cyan</span>
                    </p>
                    <ProgressBar value={item.toner_percentage.cyan} color="teal" className="mt-3" />
                    </div>
                    <div className="mx-auto max-w-sm">
                    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                        <span>Magenta</span>
                    </p>
                    <ProgressBar value={item.toner_percentage.magenta} color="teal" className="mt-3" />
                    </div>
                    <div className="mx-auto max-w-sm">
                    <p className="text-tremor-default text-tremor-content dark:text-dark-tremor-content flex items-center justify-between">
                        <span>Yellow</span>
                    </p>
                    <ProgressBar value={item.toner_percentage.yellow} color="teal" className="mt-3" />
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
    </>
  )
}