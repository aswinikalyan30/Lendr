import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { bookingsList } from '../service/bookings';
import TableComponent from '../common/Table';

export default function BookingsTable({ fromHome }) {
  const [data, setData] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await bookingsList();
        fromHome ? setData(result?.splice(0, 5)) : setData(result);
      } catch (error) {
        console.error('Error fetching bookings:', error);
      }
    };

    fetchData();
  }, []);

  return (
      <TableComponent data={data} title="Bookings" />
  );
}