import React, {useState} from "react";
import {Dialog, Modal} from "@mui/material";
import s from "./Profile.module.scss"
import {Button, InputGroup, Form} from "react-bootstrap";
import {UserService} from "../../app/services/UserService";
import {Toast} from "../../app/utils/toast";

const AddNewFamilyMemberModal = ({isOpen, handleClose, refresh}) => {
  const [userEmail, setUserEmail] = useState("")

  const handleAdd = () => {
    if (userEmail) {
      UserService.addNewUserIntoSubscription(userEmail)
        .then(response => {
          if (response.data.message === "success") {
            refresh()
          } else if (response.data.message === "not_found") {
            Toast.displayErrorMessage("Пользователь не найден!")
          }
        })
        .catch(err => {
          Toast.displayErrorMessage("Пользователь уже добавлен!")
        })
    }
  }

  return (
    <Dialog
      open={isOpen}
      onClose={handleClose}
      maxWidth="xs"
      fullWidth
      sx={{
        // background: '#051937',
      }}
    >
      <div className={s.modal}>
        <h5>Add new family member</h5>

        <InputGroup className="mb-3">
          <Form.Control
            placeholder="Email"
            onChange={e => setUserEmail(e.target.value)}
            value={userEmail}
          />
          <Button
            onClick={handleAdd}
            variant="outline-secondary" id="button-addon2">
            Add
          </Button>
        </InputGroup>
      </div>
    </Dialog>
  )
}

export default AddNewFamilyMemberModal
