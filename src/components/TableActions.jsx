import { Button } from "@mui/material";
import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";

const TableActions = (param) => {
  const buttonClicked = () => {
    console.log(param);
  };
  return (
    <div>
      <Tooltip title="Delete" placement="top-start">
        <IconButton>
          <DeleteForeverIcon color="error" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit" placement="top-start">
        <IconButton>
          <EditIcon color="success" />
        </IconButton>
      </Tooltip>

      {/* <Button onClick={buttonClicked} variant="outlined" startIcon={<DeleteForeverIcon/>}></Button>
      <Button onClick={buttonClicked} variant="outlined" startIcon={<EditIcon/>}></Button> */}
    </div>
  );
};

export default TableActions;
