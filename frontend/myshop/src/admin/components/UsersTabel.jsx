import React, { useState, useEffect } from "react";
import axios from "axios";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "../styles/Tabels.css";
import AuthContext from "../../context/AuthContext";

export default function UsersTabel() {
  const { user } = React.useContext(AuthContext);
  const [users, setUsers] = useState([]);

  // const getUsers = async () => {
  //   try {
  //     const userTk = user.token;
  //     const response = await axios.get("/admin/users", {
  //       headers: {
  //         Authorization: `Bearer ${userTk}`,
  //       },
  //     });
  //     setUsers(response.data);
  //   } catch (err) {
  //     console.error(err);
  //   }
  // };

  // useEffect(() => {
  //   getUsers();
  // }, [user.token]);

  useEffect(() => {
    const getUsers = async () => {
      try {
        const userTk = user.token;
        console.log("here",user.token);
        const res = await axios.get("/admin/users", {
          headers: {
            Authorization: `Bearer ${userTk}`,
          },
        });
        setUsers(res.data);
      } catch (error) {
        console.log(error);
      }
    };
    getUsers();
  }, [user.token]);

  console.log(users);

  return (
    <React.Fragment>
      <h1 className="tabel-title">USERS OF MINIMALIST STUDIO</h1>
      <div className="table-position">
        <TableContainer component={Paper}>
          <Table sx={{ Width: 500 }} aria-label="simple table">
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  First Name
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Last Name
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Email
                </TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Phone number
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.firstName}
                  </TableCell>
                  <TableCell align="center">{user.lastName}</TableCell>
                  <TableCell align="center">{user.email}</TableCell>
                  <TableCell align="center">{user.phoneNumber}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
    </React.Fragment>
  );
}
