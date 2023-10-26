import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { Switch } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import React from "react";
import Swal from "sweetalert2";
import {
  deleteKeyword,
  patchKeyword,
  updateKeywordStatus,
} from "../services/cv_tagging";

const TableActions = (param) => {
  const updateKeyStatus = () => {
    Swal.fire({
      title: "Update Keyword Status?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Continue",
    }).then((result) => {
      if (result.isConfirmed) {
        const data = {
          id: param.row.id,
        };
        updateKeywordStatus(data).then(() => {
          window.location.reload();
        });
      }
    });
  };

  const deleteKey = () => {
    deleteKeyword(param.row).then((res) => {
      Swal.fire({
        title: "Delete Keyword?",
        text: "This keyword will be permanently deleted!",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#d33",
        cancelButtonColor: "#3085d6",
        confirmButtonText: "Continue",
      }).then((result) => {
        if (result.isConfirmed) {
          deleteKeyword(param.row).then((res) => {
            window.location.reload();
          });
        }
      });
    });
  };

  const updateKey = () => {
    Swal.fire({
      title: "Edit Keyword",
      html: `
        <input type="text" id="editInput" class="swal2-input swal2-custom-input" placeholder="Keyword">
      `,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "primary",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, edit it!",
    }).then((result) => {
      const inputText = document.getElementById("editInput").value;
      

      if (result.isConfirmed) {
        if (inputText === "") {
          alert("Keyword is empty");
          return;
        }
        const data = {
          id: param.row.id,
          keyword: inputText,
        };
        patchKeyword(data).then((res) => {
          window.location.reload();
        });
      }
    });
  };

  const viewKeyword = () => {
    Swal.fire({
      title: param.row.keyword,
      cancelButtonText: "Close",
      cancelButtonColor: "#d33",
    });
  };
  return (
    <div>
      <Tooltip title="Delete" placement="top-start">
        <IconButton onClick={deleteKey}>
          <DeleteForeverIcon color="error" />
        </IconButton>
      </Tooltip>

      <Tooltip
        title={param.row.status === "active" ? "Deactivate" : "Activate"}
        placement="top-start"
      >
        <Switch
          checked={param.row.status === "active"}
          onChange={updateKeyStatus}
          color="success"
        />
      </Tooltip>

      <Tooltip title="Edit" placement="top-start">
        <IconButton onClick={updateKey}>
          <EditIcon color="success" />
        </IconButton>
      </Tooltip>
      <Tooltip title="View" placement="top-start" className="view">
        <IconButton onClick={viewKeyword}>
          <VisibilityIcon color="primary" />
        </IconButton>
      </Tooltip>
      {/* <Button onClick={buttonClicked} variant="outlined" startIcon={<DeleteForeverIcon/>}></Button>
      <Button onClick={buttonClicked} variant="outlined" startIcon={<EditIcon/>}></Button> */}
    </div>
  );
};

export default TableActions;
