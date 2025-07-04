import React from "react";
import DataTable from "./components/DataTable";
import CsvImport from "./components/CsvImport";
import { Box, Typography } from '@mui/material';

const App: React.FC = () => {
   return(
    <Box sx={{ padding: 4 }}>
      <Box sx={{ textAlign: 'center', mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Employee Data Table
        </Typography>
        <CsvImport />
      </Box>

      <DataTable />
    </Box>
   );
};

export default App;