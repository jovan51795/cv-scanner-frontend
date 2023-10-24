import { Button, TextField } from "@mui/material";
import { Box, Container, Stack } from "@mui/system";
import { DataGrid } from "@mui/x-data-grid";
import React, { useEffect, useState } from "react";
import LoadingCircle from '../components/LoadingCircle.jsx';
import Navbar from "../components/Navbar.jsx";
import { env } from "../env";
import { getAllKeywords } from "../services/cv_tagging";
import { http } from "../services/http";
import TableActions from "../components/TableActions.jsx";

const Admin = () => {
  const [keyWord, setKeyWord] = useState("");
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showNoData, setShowNoData] = useState(false);

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
    getAllKeywords().then((res) => {
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
    }, 10000); // 10 seconds
  }, []);

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
      field: "action",
      sortable: false,
      headerName: "Actions",
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
          <DataGrid
            rows={words}
            columns={columns}
            pageSize={25}
            disableExtendRowFullWidth
          />
        )}
      </Container>
    </>
  );
};

export default Admin;
