import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../styles/Tabels.css";
import { Box } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { Delete } from "@mui/icons-material";
import AuthContext from "../../context/AuthContext";

export default function CategoriesTabel() {
  const [categories, setCategories] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [activeRowId, setActiveRowId] = useState(null);

  const { user } = React.useContext(AuthContext);

  const getCategories = async () => {
    try {
      const response = await axios.get("http://localhost:3001/categories");
      setCategories(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteCategory = async (categoryId) => {
    try {
      console.log(categoryId);
      const response = await axios.delete(
        `http://localhost:3001/admin/category/${categoryId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "name",
        headerName: " Category Name",
        width: 300,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "categories.subcategories",
        headerName: "Subcategories",
        width: 300,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <div>
            {params.row.subcategories.map((subcategory) => (
              <div key={subcategory.id}>{subcategory.name}</div>
            ))}
          </div>
        ),
      },
      {
        headerName: "Delete",
        width: 250,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <div>
            <Delete
              key={params.id}
              color="black"
              style={{ cursor: "pointer" }}
              onClick={() => deleteCategory(params.row.id)}
            />
          </div>
        ),
      },
    ],
    [activeRowId]
  );

  return (
    <React.Fragment>
      <div className="tabel-title">ALL CATEGORIES & SUBCATEGORIES</div>
      <div className="table-position">
        <div style={{ marginTop: "50px" }}>
          <Box sx={{ height: 310 }}>
            <DataGrid
              className="custom-datagrid"
              columns={columns}
              rowHeight={250}
              rows={categories}
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
