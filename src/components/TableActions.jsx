import React from "react";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { deleteKeyword, patchKeyword } from "../services/cv_tagging";
import Swal from "sweetalert2";

const TableActions = (param) => {
  const deleteKey = () => {
    deleteKeyword(param.row).then((res) => {
      Swal.fire({
        title: "Delete Keyword?",
        text: "This keyword will permanently deleted!",
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
        const data = {
          id: param.row.id,
          keyword: inputText,
        };
        patchKeyword(data).then((res) => {
          console.log(res.data.message);
          window.location.reload();
        });
      }
    });
  };
  return (
    <div>
      <Tooltip title="Delete" placement="top-start">
        <IconButton onClick={deleteKey}>
          <DeleteForeverIcon color="error" />
        </IconButton>
      </Tooltip>

      <Tooltip title="Edit" placement="top-start">
        <IconButton onClick={updateKey}>
          <EditIcon color="success" />
        </IconButton>
      </Tooltip>

      {/* <Button onClick={buttonClicked} variant="outlined" startIcon={<DeleteForeverIcon/>}></Button>
      <Button onClick={buttonClicked} variant="outlined" startIcon={<EditIcon/>}></Button> */}
    </div>
  );
};

export default TableActions;
