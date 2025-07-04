import React from 'react';
import { useSelector } from 'react-redux';
import type { RootState } from '../redux/store';
import { Button } from '@mui/material';
import { saveAs } from 'file-saver';

const CsvExport: React.FC = () => {
  const rows = useSelector((state: RootState) => state.table.rows);
  const search = useSelector((state: RootState) => state.table.search);
  const sortField = useSelector((state: RootState) => state.table.sortField);
  const sortOrder = useSelector((state: RootState) => state.table.sortOrder);


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

  const handleExport = () => {
    const headers = 'id,name,email,age,designation\n';
    const csvContent = sortedRows
      .map((row) =>
        `${row.id},${row.name},${row.email},${row.age},${row.designation}`
      )
      .join('\n');

    const blob = new Blob([headers + csvContent], {
      type: 'text/csv;charset=utf-8;',
    });

    saveAs(blob, 'table_data.csv');
  };

  return (
    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
    <Button
      variant="contained"
      component="label"
      onClick={handleExport}
    >
      Export your CSV file!
    </Button>
    </div>
  );
};

export default CsvExport;
