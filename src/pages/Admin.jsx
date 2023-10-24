import React, { useState, useEffect } from "react";
import { env } from "../env";
import { getAllKeywords } from "../services/cv_tagging";
import { http } from "../services/http";
import TableActions from "../components/TableActions.jsx";
import { Box, Button, Container, Stack, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import Navbar from "../components/Navbar";
import LoadingCircle from "../components/LoadingCircle";
import KeywordStatus from "../components/KeywordStatus";

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
      headerAlign: "center",
      align: "center",
      flex: 1,
    },
    {
      field: "keyword",
      headerName: "Keyword",
      flex: 1,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "status",
      headerName: "Status",
      headerAlign: "center",
      align: "center",
      width: 400,
      flex: 1,
      renderCell: KeywordStatus,
    },
    {
      field: "action",
      sortable: false,
      headerName: "Actions",
      headerClassName: "header-cell",
      cellClassName: "action-cell",
      flex: 1,

      headerAlign: "center",
      align: "center",
      renderCell: TableActions,
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
          <LoadingCircle />
        ) : words.length === 0 ? (
          showNoData ? (
            "No Data"
          ) : null
        ) : (
          <>
            <DataGrid
              rows={words}
              columns={columns}
              pageSize={5}
              hideFooter
              disableExtendRowFullWidth
            />
            <div
              style={{
                marginTop: "20px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <div style={{ marginRight: "10px" }}>
                <label variant="contained">Page Size:</label>
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
