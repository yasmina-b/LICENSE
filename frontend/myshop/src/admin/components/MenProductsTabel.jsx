import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../styles/Tabels.css";
import AuthContext from "../../context/AuthContext";
import { Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

export default function MenProductsTabel() {
  const { user } = React.useContext(AuthContext);
  const [productsMen, setProductsMen] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [activeRowId, setActiveRowId] = useState(null);

  const getProductsOfCategoryMen = async () => {
    try {
      const response = await axios.get(
        "http://localhost:3001/productsCategory/2b22c425-247c-42f2-85b2-0183d8682195"
      );
      setProductsMen(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  const deleteProduct = async (productId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/admin/product/${productId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setProductsMen((prevProducts) =>
        prevProducts.filter((product) => product.id !== productId)
      );
    } catch (err) {
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    getProductsOfCategoryMen();
  }, []);

  const columns = useMemo(
    () => [
      {
        field: "image",
        headerName: "Image",
        width: 200,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <img
              src={params.row.firstImageURL}
              alt={params.row.name}
              style={{ width: "50px", height: "50px" }}
            />
          );
        },
      },
      {
        field: "name",
        headerName: "Name",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "description",
        headerName: "Description",
        width: 350,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "productVariants",
        headerName: "Attributes & Attributes values",
        width: 350,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <ul>
              {params.value.map((entry) => (
                <li key={entry.id}>
                  {entry.productAttributeValues &&
                    entry.productAttributeValues.map((attrValue) => (
                      <div key={attrValue.id}>
                        {attrValue.productAttribute.name} {attrValue.value} (
                        {"in stock: "}
                        {entry.quantityInStock})
                      </div>
                    ))}
                </li>
              ))}
            </ul>
          );
        },
      },
      {
        field: "price",
        headerName: "Price in RON",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "subcategory",
        headerName: "Subcategory",
        width: 200,
        align: "center",
        headerAlign: "center",
        valueGetter: (params) => {
          return params.row.subcategory.name;
        },
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
              onClick={() => deleteProduct(params.row.id)}
            />
          </div>
        ),
      },
    ],
    [activeRowId]
  );

  return (
    <React.Fragment>
      <div className="tabel-title">PRODUCTS MEN</div>
      <div className="table-position">
        <div style={{ marginTop: "50px" }}>
          <Box sx={{ height: 330, width: 950 }}>
            <DataGrid
              className="custom-datagrid"
              columns={columns}
              rows={productsMen}
              rowHeight={80}
              pageSize={pageSize}
              headerHeight={80}
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
