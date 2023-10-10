import axios from "axios";
import React, { useState, useEffect } from "react";
import { env } from "../env";

const Admin = () => {
  const [keyWord, setKeyWord] = useState("");
  const [words, setWords] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      keyword: keyWord,
    };
    axios
      .post(`${env.baseURL}/api/v1/scanner/add-keyword`, data)
      .then((res) => {
        if (res.data) {
          getKeyWords();
        }
      });
  };

  const getKeyWords = () => {
    axios.get(`${env.baseURL}/api/v1/scanner/get-keywords`).then((res) => {
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
        <input
          type="text"
          name="keyWords"
          placeholder="create new key word"
          onChange={(e) => setKeyWord(e.target.value)}
        />
        <input type="submit" value="Sumit" />
      </form>

      <table>
        <thead>
          <tr>
            <th>Keyword ID</th>
            <th>Keyword</th>
          </tr>
        </thead>
        <tbody>
          {words &&
            words.map((w, i) => (
              <tr key={i}>
                <td>{w.id}</td>
                <td>{w.keyword}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
