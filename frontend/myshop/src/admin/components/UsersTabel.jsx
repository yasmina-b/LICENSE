import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../styles/Tabels.css";
import AuthContext from "../../context/AuthContext";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

export default function UsersTabel() {
  const { user } = React.useContext(AuthContext);
  const [users, setUsers] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [activeRowId, setActiveRowId] = useState(null);

  useEffect(() => {
    const getUsers = async () => {
      try {
        if (user?.token) {
          const response = await axios.get(
            "http://localhost:3001/admin/users",
            {
              headers: {
                Authorization: `Bearer ${user.token}`,
              },
            }
          );
          setUsers(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getUsers();
  }, [user]);

  const columns = useMemo(
    () => [
      {
        field: "lastName",
        headerName: "Last Name",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "firstName",
        headerName: "First Name",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "email",
        headerName: "Email",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "phoneNumber",
        headerName: "Phone number",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "isAdmin",
        headerName: "isAdmin",
        width: 180,
        type: "boolean",
        editable: true,
      },
    ],
    [activeRowId]
  );

  return (
    <React.Fragment>
      <div className="tabel-title">ALL USERS</div>
      <div className="table-position">
        <div style={{ marginTop: "50px" }}>
          <Box sx={{ height: "350px", width: 900 }}>
            <DataGrid
              className="custom-datagrid"
              columns={columns}
              rows={users}
              pageSize={pageSize}
              onPageSizeChange={(newPageSize) => setPageSize(newPageSize)}
              rowsPerPageOptions={[5, 10, 20, 30]}
              sx={{
                "& .css-gl260s-MuiDataGrid-columnHeadersInner": {
                  color: "black",
                  backgroundColor: "#d8d1d1",
                },
              }}
              onCellEditCommit={(params) => setActiveRowId(params.id)}
            />
          </Box>
        </div>
      </div>
    </React.Fragment>
  );
}
