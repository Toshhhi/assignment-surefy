import React from "react";
import DataTable from "./components/DataTable";

const App: React.FC = () => {
   return(
    <div style={{padding: 20}}>
      <h2>Dynamic Data Table</h2>
      <DataTable /> 
    </div>
   );
};

export default App;