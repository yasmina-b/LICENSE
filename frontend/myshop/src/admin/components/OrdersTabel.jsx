import React, { useState, useEffect, useMemo } from "react";
import axios from "axios";
import "../styles/Tabels.css";
import AuthContext from "../../context/AuthContext";
import { Box } from "@mui/material";
import { Clear } from "@mui/icons-material";
import { DataGrid } from "@mui/x-data-grid";

export default function OrdersTabel() {
  const { user } = React.useContext(AuthContext);
  const [orders, setOrders] = useState([]);
  const [pageSize, setPageSize] = useState(10);
  const [activeRowId, setActiveRowId] = useState(null);

  useEffect(() => {
    const getOrders = async () => {
      try {
        if (user?.token) {
          const response = await axios.get("http://localhost:3001/orders", {
            headers: {
              Authorization: `Bearer ${user.token}`,
            },
          });
       
          setOrders(response.data);
        }
      } catch (err) {
        console.error(err);
      }
    };

    getOrders();
  }, [user]);

  console.log(orders);

  const cancelOrder = async (orderId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3001/admin/order/${orderId}`,
        {
          headers: {
            Authorization: `Bearer ${user.token}`,
          },
        }
      );
      setOrders((prevOrders) =>
        prevOrders.filter((order) => order.id !== orderId)
      );
    } catch (err) {
      console.log(err.response.data);
    }
  };

  const columns = useMemo(
    () => [
      {
        field: "orderDate",
        headerName: "Order date",
        width: 180,
        align: "center",
        headerAlign: "center",
        valueFormatter: (params) => {
          const date = new Date(params.value);
          return date.toLocaleDateString("en-GB", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
          });
        },
      },
      {
        field: "cartEntries",
        headerName: "Bought Products",
        width: 200,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => {
          return (
            <div>
              {params.value.map((entry) => (
                <div key={entry.id}>
                  {entry.productVariant && entry.productVariant.product.name}
                  {entry.productVariant &&
                    entry.productVariant.productAttributeValues.map(
                      (attrValue) => (
                        <span key={attrValue.id}> {attrValue.value}</span>
                      )
                    )}{" "}
                  X {entry.quantityInCart}
                </div>
              ))}
            </div>
          );
        },
      },
      {
        field: "totalOrderSum",
        headerName: "Order total in RON",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "email",
        headerName: "User's email",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "firstName",
        headerName: "User's first name",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "lastName",
        headerName: "User's last name",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "phoneNumber",
        headerName: "User's phone number",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "address",
        headerName: "User's address",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "city",
        headerName: "User's city",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        field: "postalCode",
        headerName: "User's postal code",
        width: 180,
        align: "center",
        headerAlign: "center",
      },
      {
        headerName: "Cancel Order",
        width: 250,
        align: "center",
        headerAlign: "center",
        renderCell: (params) => (
          <div>
            <Clear
              key={params.id}
              color="black"
              style={{ cursor: "pointer" }}
              onClick={() => cancelOrder(params.row.id)}
            />
          </div>
        ),
      },
    ],
    [activeRowId]
  );

  return (
    <React.Fragment>
      <div className="tabel-title">USER ORDERS</div>
      <div className="table-position">
        <div style={{ marginTop: "50px" }}>
          <Box sx={{ height: "350px", width: 950 }}>
            <DataGrid
              className="custom-datagrid"
              columns={columns}
              rows={orders}
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
