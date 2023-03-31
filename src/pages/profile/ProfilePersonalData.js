import React, {useState} from "react";
import s from "./Profile.module.scss"
import {useUserContext} from "../../app/context/userContext";
import {
  Alert,
  Backdrop,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Fade,
  Modal,
  TextField
} from "@mui/material";
import {Edit, SaveAsOutlined} from "@mui/icons-material";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {SignUpCompleteRegistrationSchema} from "../../app/validation/userValidation";
import {AuthService} from "../../app/services/AuthService";
import {Toast} from "../../app/utils/toast";
import FormHelperMessage from "../../components/Form/FormHelperMessage";
import FormGroup from "../../components/Form/FormGroup";
import {Form} from "react-bootstrap";

const ProfilePersonalData = () => {
  const {userInfo} = useUserContext()
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false)

  const openModal = () => setEditProfileModalOpen(true)
  const closeModal = () => setEditProfileModalOpen(false)

  return (
    <div className={s.content}>
      <h2>Личные данные</h2>

      <div className={s.personalData}>
        <div className={s.item}>
          Full name: <span>{userInfo.name}</span>
        </div>
        <div className={s.item}>
          Email: <span>{userInfo.email}</span>
        </div>
        <div className={s.item}>
          Subscribe level: <span>{userInfo.subscription === 1 ? "Free" : userInfo.subscription === 2 ? "Personal" : "Family"}</span>
        </div>
        <div>
          <Button
            startIcon={<Edit/>}
            color="info"
            onClick={openModal}
            variant="outlined"
            className={s.editButton}>
            Updating account information
          </Button>
        </div>
        <ProfileChangeProfileDataModal
          isOpen={editProfileModalOpen}
          handleClose={closeModal}
        />
      </div>
    </div>
  )
}

const ProfileChangeProfileDataModal = ({isOpen, handleClose}) => {
  const {userInfo, updateUserInfo} = useUserContext()
  const {formState, handleSubmit, control} = useForm({
    mode: "onSubmit",
    resolver: yupResolver(SignUpCompleteRegistrationSchema),
    defaultValues: {...userInfo}
  })
  const {errors, isSubmitting} = formState
  const [errorText, setErrorText] = useState("")

  const onSubmit = async (data) => {
    AuthService
      .changeUserInfo(data)
      .then(res => {
        if (res.data.message === "success") {
          updateUserInfo(res.data.user)
          handleClose()
          Toast.displaySuccessMessage("Successfully updating personal information!")
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Error during fetching information about user!")
      })
  }

  return (
    <Dialog
      fullWidth
      open={isOpen}
      onClose={handleClose}
      maxWidth="sm"
    >
      <DialogTitle sx={{fontWeight: "400"}}>
        Updating personal information
      </DialogTitle>
      <form style={{marginTop: "1rem"}} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <Form.Group controlId="controlName" className="mb-3">
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, value}}) => (
                <Form.Control
                  placeholder="Full name"
                  value={value}
                  onChange={onChange}
                  isInvalid={errors?.name?.message}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.name?.message}
            </Form.Control.Feedback>
          </Form.Group>


          <Form.Group controlId="controlEmail" className="mb-3">
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, value}}) => (
                <Form.Control
                  placeholder="Email"
                  value={value}
                  onChange={onChange}
                  isInvalid={errors?.email?.message}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.email?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="controlPassword" className="mb-3">
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, value}}) => (
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={value}
                  onChange={onChange}
                  isInvalid={errors?.password?.message}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors?.password?.message}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group controlId="controlPassword" className="mb-3">
            <Controller
              control={control}
              name="confirmPassword"
              render={({field: {onChange, value}}) => (
                <Form.Control
                  type="password"
                  name="confirmPassword"
                  value={value}
                  onChange={onChange}
                  placeholder="Confirm password"
                  isInvalid={errors.confirmPassword?.message}
                />
              )}
            />
            <Form.Control.Feedback type="invalid">
              {errors.confirmPassword?.message}
            </Form.Control.Feedback>
          </Form.Group>

          {errorText && (
            <Alert sx={{marginY: "0.5rem"}} severity="error">{errorText}</Alert>
          )}
        </DialogContent>
        <DialogActions>
          <Button
            type="submit"
            disabled={isSubmitting}
            startIcon={<SaveAsOutlined/>}
            color="inherit">
            Apply changes
          </Button>
          <Button
            color="error"
            onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}


export default ProfilePersonalData
