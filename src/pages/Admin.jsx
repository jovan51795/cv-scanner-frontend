import React, { useState, useEffect } from "react";
import { env } from "../env";
import { getAllKeywords } from "../services/cv_tagging";
import { http } from "../services/http";
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from "@mui/material";

const Admin = () => {
  const [keyWord, setKeyWord] = useState("");
  const [words, setWords] = useState(null);

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
    });
  };

  useEffect(() => {
    getKeyWords();
  }, []);
  return (
    <div className="admin">
      <form onSubmit={handleSubmit}>
      <TextField name="keyWords" size="small"
          placeholder="create new key word" onChange={(e) => setKeyWord(e.target.value)}/>
      <Button type="submit" variant="contained">
        Send
      </Button></form>
<div>
<TableContainer component={Paper} color="">
      <Table size="small" >
        <TableHead>
          <TableRow>
            <TableCell align="center" style={{ width: '30%', fontWeight: 'bold' }}>Keyword ID</TableCell>
            <TableCell align="center" style={{ width: '70%', fontWeight: 'bold' }}>Keyword</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
        {words &&
            words.map((w, i) => (
            <TableRow
              key={i}
            >
              <TableCell align="center" >{w.id}</TableCell>
              <TableCell >{w.keyword}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
</TableContainer>
    </div>
</div>
  );
};

export default Admin;
