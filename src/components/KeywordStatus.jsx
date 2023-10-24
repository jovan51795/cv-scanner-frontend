import { Chip } from "@mui/material";
import React from "react";

const KeywordStatus = (param) => {
  return (
    <>
      <Chip
        variant="outlined"
        label={param.row.status}
        color={param.row.status === "active" ? "success" : "warning"}
      />
    </>
  );
};

export default KeywordStatus;
