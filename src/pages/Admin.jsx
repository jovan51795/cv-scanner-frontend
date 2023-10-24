import React, { useState, useEffect } from "react";
import { env } from "../env";
import { getAllKeywords } from "../services/cv_tagging";
import { http } from "../services/http";
import { Button, TextField } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { KeyboardArrowLeft, KeyboardArrowRight } from "@mui/icons-material";

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
      width: 150,
      headerAlign: "center",
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
    },
  ];

  return (
    <div className="admin">
      <form onSubmit={handleSubmit} style={{ marginBottom: "20px" }}>
        <TextField
          name="keyWords"
          size="small"
          placeholder="Create a new keyword"
          value={keyWord}
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <Button type="submit" variant="contained">
          Send
        </Button>
      </form>
      <div style={{ marginTop: "20px" }}>
        {loading ? (
          <img src="https://i.gifer.com/YCZH.gif" alt="Loading" />
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
      </div>
    </div>
  );
};

export default Admin;
