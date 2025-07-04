import React from "react";
import DataTable from "./components/DataTable";
import CsvImport from "./components/CsvImport";
import CsvExport from "./components/CsvExport";
import { Box, Typography, Stack } from '@mui/material';

const App: React.FC = () => {
   return(
    <Box sx={{ padding: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Employee Data Table
        </Typography>
        <Stack direction="row" spacing={2} justifyContent="center">
          <CsvImport />
          <CsvExport />
        </Stack>
      </Box>

      <DataTable />
    </Box>
   );
};

export default App;