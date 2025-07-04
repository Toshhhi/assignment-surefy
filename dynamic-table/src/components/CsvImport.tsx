import React, { useState } from 'react';
import { Button, Typography } from '@mui/material';
import * as Papa from 'papaparse';
import { useDispatch } from 'react-redux';
import { setRows, setPage, setSearch} from '../redux/tableSlice';
import type { Row } from '../redux/tableSlice';

const CsvImport: React.FC = () => {
  const dispatch = useDispatch();
  const [error, setError] = useState<string | null>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    Papa.parse<Row>(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results: Papa.ParseResult<Row>) => {
        const data = results.data;

        const isValid = data.every(
          (row) =>
            row.id &&
            row.name &&
            row.email &&
            row.age &&
            row.designation
        );

        if (!isValid) {
          setError('Invalid CSV format. Required: id, name, email, age, designation');
          return;
        }

        setError(null);
        dispatch(setRows(data));
        dispatch(setPage(1));
        dispatch(setSearch(''));
      },
      error: (error: Error, _file) => {
        setError('Failed to parse CSV: ' + error.message);
      },
    });
  };

  return (
    <div style={{ marginTop: '1rem', marginBottom: '1rem' }}>
      <Button variant="contained" component="label">
        Import your csv file
        <input type="file" accept=".csv" hidden onChange={handleFileUpload} />
      </Button>
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 1 }}>
          {error}
        </Typography>
      )}
    </div>
  );
};

export default CsvImport;
