import React, { useState, useEffect } from "react";
import { env } from "../env";
import { getAllKeywords, searchKeywords } from "../services/cv_tagging";
import { http } from "../services/http";
import TableActions from "../components/TableActions.jsx";
import InputAdornment from "@mui/material/InputAdornment";
import {
  Box,
  Button,
  Container,
  FormControl,
  IconButton,
  Stack,
  TextField,
  Tooltip,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";
import LoadingCircle from "../components/LoadingCircle";
import KeywordStatus from "../components/KeywordStatus";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import Modal from "@mui/material/Modal";
import Typography from "@mui/material/Typography";
import CustomNoRowsOverlay from "../components/Overlays/StyledGridOverlay";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const Admin = () => {
  const [keyWord, setKeyWord] = useState("");
  const [search, setSearch] = useState("");
  const [words, setWords] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [open, setOpen] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (keyWord === "") {
      alert("Keyword is required");
      return;
    }

    const data = {
      keyword: keyWord,
    };
    http.post(`${env.baseURL}/api/v2/scanner/add-keyword`, data).then((res) => {
      if (res.data) {
        setOpen(false);
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

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await searchKeywords(search);
      if (response.data) {
        setWords(response.data);
      } else {
        setWords([]);
      }
    } catch (error) {
      console.error("Error searching for keywords:", error);
      setWords([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    getKeyWords();
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
      ></Box>
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
        ) : (
          <>
            <Stack direction="row" sx={{ marginBottom: "1rem" }} spacing={1}>
              <FormControl sx={{ width: "100%" }}>
                <TextField
                  size="small"
                  placeholder="Search"
                  onChange={(e) => setSearch(e.target.value)}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end" S>
                        <Tooltip title="Search">
                          <IconButton onClick={handleSearch}>
                            <SearchIcon />
                          </IconButton>
                        </Tooltip>
                      </InputAdornment>
                    ),
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      handleSearch();
                    }
                  }}
                />
              </FormControl>
              <Button type="submit" variant="contained" onClick={handleSearch}>
                Search
              </Button>
              <Button
                type="submit"
                variant="contained"
                onClick={() => setOpen(true)}
              >
                <AddIcon />
                Add
              </Button>
              <Modal
                open={open}
                onClose={() => setOpen(false)}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
              >
                <Box sx={style} className="modal-wrapper">
                  <Typography
                    sx={{ color: "#fff", marginBottom: "1rem" }}
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                    Add new keyword
                  </Typography>
                  <form onSubmit={handleSubmit}>
                    <Stack direction="row" spacing={1} className="form-wrapper">
                      <TextField
                        sx={{ width: "100%" }}
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
              </Modal>
            </Stack>

            <DataGrid
              rows={words}
              columns={columns}
              pageSize={5}
              hideFooter
              disableExtendRowFullWidth
              sx={{ overflow: "auto", height: 600 }}
              slots={{
                noRowsOverlay: CustomNoRowsOverlay,
              }}
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
                <TextField
                  label="Page Size:"
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
