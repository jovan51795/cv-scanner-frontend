import React, { useState, useEffect } from "react";
import { env } from "../env";
import { getAllKeywords } from "../services/cv_tagging";
import { http } from "../services/http";
import { Button, TextField, Card, CardContent } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";

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
      width: 150,
      headerAlign: "center",
    },
    {
      field: "keyword",
      headerName: "Keyword",
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
          <DataGrid rows={words} columns={columns} pageSize={5} />
        )}
      </div>
    </div>
  );
};

export default Admin;
