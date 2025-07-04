import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import type { RootState } from '../redux/store';
import { setSearch, setSort, setPage } from '../redux/tableSlice';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TextField,
  TableSortLabel
} from '@mui/material';
import Pagination from '@mui/material/Pagination';

const DataTable: React.FC = () => {
  const dispatch = useDispatch();

  const rows = useSelector((state: RootState) => state.table.rows);
  const search = useSelector((state: RootState) => state.table.search);
  const sortField = useSelector((state: RootState) => state.table.sortField);
  const sortOrder = useSelector((state: RootState) => state.table.sortOrder);
  const page = useSelector((state: RootState) => state.table.page);
  const rowsPerPage = 10;

  const filteredRows = rows.filter((row) =>
    Object.values(row).some((value) =>
      String(value).toLowerCase().includes(search.toLowerCase())
    )
  );

  const sortedRows = [...filteredRows].sort((a, b) => {
    if (!sortField) return 0;
    const valA = a[sortField];
    const valB = b[sortField];

    if (valA < valB) return sortOrder === 'asc' ? -1 : 1;
    if (valA > valB) return sortOrder === 'asc' ? 1 : -1;
    return 0;
  });

  const paginatedRows = sortedRows.slice(
    (page - 1) * rowsPerPage,
    page * rowsPerPage
    );
  const pageCount = Math.ceil(sortedRows.length / rowsPerPage);

  return (
    <>
      <TextField
        label="Search"
        variant="outlined"
        fullWidth
        margin="normal"
        value={search}
        onChange={(e) => dispatch(setSearch(e.target.value))}
      />

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              {['id', 'name', 'email', 'age', 'designation'].map((field) => (
                <TableCell key={field}>
                    <TableSortLabel
                    active={sortField === field}
                    direction={sortField === field ? sortOrder : 'asc'}
                    onClick={() => dispatch(setSort(field as keyof typeof rows[0]))}
                    >
                    {field.toUpperCase()}
                  </TableSortLabel>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedRows.map((row) => (
              <TableRow key={row.id}>
                <TableCell>{row.id}</TableCell>
                <TableCell>{row.name}</TableCell>
                <TableCell>{row.email}</TableCell>
                <TableCell>{row.age}</TableCell>
                <TableCell>{row.designation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
        <Pagination
        count={pageCount}
        page={page}
        onChange={(_, value) => dispatch(setPage(value))}
        color="primary"
        sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}
        />
    </>
  );
};

export default DataTable;
