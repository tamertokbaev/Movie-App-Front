import React, {useEffect, useState} from "react";
import s from "./Profile.module.scss"
import {useUserContext} from "../../app/context/userContext";
import {
  Alert,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle
} from "@mui/material";
import {Edit, SaveAsOutlined} from "@mui/icons-material";
import {Controller, useForm} from "react-hook-form";
import {yupResolver} from "@hookform/resolvers/yup/dist/yup";
import {SignUpCompleteRegistrationSchema} from "../../app/validation/userValidation";
import {AuthService} from "../../app/services/AuthService";
import {Toast} from "../../app/utils/toast";
import {Form, Table} from "react-bootstrap";
import {UserService} from "../../app/services/UserService";
import {Button as BootstrapButton} from "react-bootstrap"
import AddNewFamilyMemberModal from "./AddNewFamilyMemberModal";

const ProfilePersonalData = () => {
  const {userInfo} = useUserContext()
  const [editProfileModalOpen, setEditProfileModalOpen] = useState(false)
  const [familyMembers, setFamilyMembers] = useState([])
  const [isFamilyMemberAddModalOpen, setIsFamilyMemberAddModalOpen] = useState(false)

  const openModal = () => setEditProfileModalOpen(true)
  const closeModal = () => setEditProfileModalOpen(false)

  const openFamilyModal = () => setIsFamilyMemberAddModalOpen(true)
  const closeFamilyModal = () => setIsFamilyMemberAddModalOpen(false)

  useEffect(() => {
    refreshMembers()
  }, [])

  const refreshMembers = () => {
    UserService.getUserFamilySubscribers(userInfo.id)
      .then(response => {
        setFamilyMembers(response.data.users)
      })
  }

  return (
    <div className={s.content}>
      <h2>Personal information</h2>

      <div className={s.personalData}>
        <div className={s.item}>
          Full name: <span>{userInfo.name}</span>
        </div>
        <div className={s.item}>
          Email: <span>{userInfo.email}</span>
        </div>
        <div className={s.item}>
          Subscribe
          level: <span>{userInfo.subscription === 1 ? "Free" : userInfo.subscription === 2 ? "Personal" : "Family"}</span>
        </div>
        {userInfo.subscription === 3 ? (
          <>
            <div className={s.item}>
              Family members in subscription:
            </div>

            {familyMembers.length === 0 && (
              <div style={{minHeight: "100px", display: "flex", alignItems: "center", justifyContent: "center"}}>
                No one is attached currently to your family subscription
              </div>
            )}

            {familyMembers.length > 0 && (
              <div className={s.item}>
                <Table variant="dark" striped bordered hover>
                  <thead>
                  <tr>
                    <th>#</th>
                    <th>Full name</th>
                    <th>Email</th>
                  </tr>
                  </thead>
                  <tbody>
                  {familyMembers.map((item, key) => (
                    <tr key={key}>
                      <td>{key + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                    </tr>
                  ))}
                  </tbody>
                </Table>
              </div>
            )}
            {familyMembers.length < 4 && (
              <div className={s.item}>
                <BootstrapButton
                  variant="secondary"
                  onClick={openFamilyModal}
                >
                  Add new family members
                </BootstrapButton>
              </div>
            )}
          </>

        ) : null}

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
        <AddNewFamilyMemberModal
          isOpen={isFamilyMemberAddModalOpen}
          handleClose={closeFamilyModal}
          refresh={refreshMembers}
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
