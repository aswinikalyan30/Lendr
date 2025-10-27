import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { equipmentsList } from '../service/equipents';
import TableComponent from '../common/Table';
export default function InventoryTable({ fromHome }) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await equipmentsList();
        fromHome ? setData(result?.splice(0, 5)) : setData(result);
      } catch (error) {
        console.error('Error fetching equipments:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <TableComponent data={data} title="Inventory" />
  );
}