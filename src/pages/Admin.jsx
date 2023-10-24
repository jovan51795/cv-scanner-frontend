import React, { useState, useEffect } from "react";
import { env } from "../env";
import { getAllKeywords } from "../services/cv_tagging";
import { http } from "../services/http";
import { Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import Swal from "sweetalert2";
import {
  KeyboardArrowLeft,
  KeyboardArrowRight,
  Delete,
  Edit,
} from "@mui/icons-material";

const Admin = () => {
  const [keyWord, setKeyWord] = useState("");
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNoData, setShowNoData] = useState(false);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      keyword: keyWord,
    };
    http.post(`${env.baseURL}/api/v2/scanner/add-keyword`, data).then((res) => {
      if (res.data) {
        getKeyWords();
      }
    });
  };

  const getKeyWords = async () => {
    getAllKeywords(page, pageSize).then((res) => {
      console.log(res.data);
      setWords(res.data);
      setLoading(false);
    });
  };

  useEffect(() => {
    getKeyWords();
    setTimeout(() => {
      if (words.length === 0) {
        setShowNoData(true);
      }
    }, 10000);
  }, [page, pageSize]);
  const increasePage = () => {
    setPage((prevPage) => prevPage + 1);
    console.log(page);
    getKeyWords();
  };

  const decreasePage = () => {
    if (page > 0) {
      setPage((prevPage) => prevPage - 1);
      console.log(page);
      getKeyWords();
    }
  };

  const handlePageSizeChange = (event) => {
    const newPageSize = parseInt(event.target.value);
    if (!isNaN(newPageSize) && newPageSize > 0) {
      setPageSize(newPageSize);
    }
  };

  const columns = [
    {
      field: "id",
      headerName: "Keyword ID",
      width: 200,
      headerAlign: "center",
      align: "center",
    },
    {
      field: "keyword",
      headerName: "Keyword",
      width: 400,
      headerAlign: "center",
    },
    {
      field: "action",
      headerName: "Actions",
      width: 400,
      headerAlign: "center",
      renderCell: (params) => {
        const handleEditClick = () => {
          Swal.fire({
            title: "Edit Keyword",
            html: `
              <input type="text" id="editInput" class="swal2-input" placeholder="Keyword">
            `,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "primary",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, edit it!",
          }).then((result) => {
            const inputText = document.getElementById("editInput").value;

            if (result.isConfirmed) {
              http
                .patch(
                  `${env.baseURL}/api/v2/scanner/keywords?id=${params.row.id}&keyword=${inputText}`
                )
                .then((res) => {
                  console.log(res.data.message);
                  window.location.reload();
                });
            }
          });
        };

        const handleDeleteClick = () => {
          Swal.fire({
            title: "Delete Keyword?",
            text: "Are you sure you want to delete this keyword?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#d33",
            cancelButtonColor: "#3085d6",
            confirmButtonText: "Yes, delete it!",
          }).then((result) => {
            if (result.isConfirmed) {
              http
                .delete(
                  `${env.baseURL}/api/v2/scanner/keywords?id=${params.row.id}`
                )
                .then((res) => {
                  window.location.reload();
                });
            }
          });
        };

        return (
          <div>
            <Button
              color="warning"
              variant="outlined"
              style={{ marginRight: "10px" }}
              onClick={handleEditClick}
            >
              <Edit />
            </Button>
            <Button
              color="error"
              variant="outlined"
              style={{ marginRight: "10px" }}
              onClick={handleDeleteClick}
            >
              <Delete />
            </Button>
          </div>
        );
      },
    },
  ];

  return (
    <>
      <Navbar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          p: 1,
          m: 1,
          bgcolor: "background.paper",
          borderRadius: 1,
        }}
        justifyContent="center"
      >
        <form onSubmit={handleSubmit}>
          <Stack direction="row" spacing={1}>
            <TextField
              name="keyWords"
              label="Create a new keyword"
              variant="outlined"
              value={keyWord}
              onChange={(e) => setKeyWord(e.target.value)}
              size="small"
            />
            <Button type="submit" variant="contained">
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
      <Container
        sx={{
          width: "60%",
          maxWidth: "100%",
          "@media (max-width:600px)": {
            width: "100%",
          },
        }}
      >
        {loading ? (
          <LoadingCircle/>
        ) : words.length === 0 ? (
          showNoData ? (
            "No Data"
          ) : null
        ) : (
          <>
            <DataGrid rows={words} columns={columns} pageSize={5} hideFooter />
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                <label>Page Size:</label>
                <TextField
                  type="number"
                  value={pageSize}
                  onChange={handlePageSizeChange}
                  size="small"
                />
              </div>
              <div>
                <Button
                  onClick={decreasePage}
                  variant="outlined"
                  disabled={page === 0}
                >
                  <KeyboardArrowLeft />
                </Button>
                <Button onClick={increasePage} variant="outlined">
                  <KeyboardArrowRight />
                </Button>
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Admin;
