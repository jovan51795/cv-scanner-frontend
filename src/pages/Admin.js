import axios from "axios";
import React, { useState, useEffect } from "react";

const Admin = () => {
  const [keyWord, setKeyWord] = useState("");
  const [words, setWords] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:8080/api/addkeyword", { keyWords: keyWord })
      .then((res) => {
        if (res.data) {
          getKeyWords();
        }
      });
  };

  const getKeyWords = () => {
    axios.get("http://localhost:8080/api/getkeywords").then((res) => {
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
                <td>{w.keyWords}</td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
