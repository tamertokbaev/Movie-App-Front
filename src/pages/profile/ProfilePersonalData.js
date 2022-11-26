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
          Имя: <span>{userInfo.name}</span>
        </div>
        <div className={s.item}>
          Электронная почта: <span>{userInfo.email}</span>
        </div>
        <div>
          <Button
            startIcon={<Edit/>}
            color="info"
            onClick={openModal}
            variant="outlined"
            className={s.editButton}>
            Изменить данные аккаунта
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
          console.log(res.data)
        }
      })
      .catch(err => {
        Toast.displayErrorMessage("Не удалось обновить информацию о пользователе!")
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
        Изменение данных аккаунта
      </DialogTitle>
      <form style={{marginTop: "1rem"}} onSubmit={handleSubmit(onSubmit)}>
        <DialogContent>
          <FormGroup>
            <Controller
              control={control}
              name="name"
              render={({field: {onChange, value}}) => (
                <TextField
                  required
                  name="name"
                  value={value}
                  onChange={onChange}
                  error={errors.name?.message || false}
                  variant="outlined"
                  label="Полное имя"
                />
              )}
            />
            <FormHelperMessage>{errors.name?.message}</FormHelperMessage>
          </FormGroup>

          <FormGroup>
            <Controller
              control={control}
              name="email"
              render={({field: {onChange, value}}) => (
                <TextField
                  required
                  name="email"
                  type="email"
                  value={value}
                  onChange={onChange}
                  error={errors.email?.message || false}
                  variant="outlined"
                  label="Электронная почта"
                />
              )}
            />
            <FormHelperMessage>{errors.email?.message}</FormHelperMessage>
          </FormGroup>

          <FormGroup>
            <Controller
              control={control}
              name="password"
              render={({field: {onChange, value}}) => (
                <TextField
                  required
                  name="password"
                  type="password"
                  value={value}
                  onChange={onChange}
                  error={errors.password?.message || false}
                  variant="outlined"
                  label="Пароль"
                />
              )}
            />
            <FormHelperMessage>{errors.password?.message}</FormHelperMessage>
          </FormGroup>

          <FormGroup>
            <Controller
              control={control}
              name="confirmPassword"
              render={({field: {onChange, value}}) => (
                <TextField
                  required
                  name="confirmPassword"
                  type="password"
                  value={value}
                  onChange={onChange}
                  error={errors.confirmPassword?.message || false}
                  variant="outlined"
                  label="Подтверждение пароля"
                />
              )}
            />
            <FormHelperMessage>{errors.confirmPassword?.message}</FormHelperMessage>
          </FormGroup>
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
            Сохранить изменения
          </Button>
          <Button
            color="error"
            onClick={handleClose}>
            Отмена
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  )
}


export default ProfilePersonalData
