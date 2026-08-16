import React, { ChangeEvent, useCallback, useEffect, useReducer } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import { useLazyQuery, useMutation } from '@apollo/client';
import UserDTO, { USER } from "../../types/UserDTO";
// import {
//   GET_USER,
//   GET_USER_EMAIL_EXIST,
//   GET_USER_USER_NAME_EXIST,
//   GET_USER_MOBILE_NO_EXIST,
// } from '../../graphql/User';
import { regExEMail } from "../../common/Configuration";
import { isValidPhoneNumber } from "libphonenumber-js";
import toast from "react-hot-toast";
import UserService from "../../services/UserService";
import { SelectChangeEvent } from "@mui/material";
type ErrorMessageType = {
  first_name: string | null;
  last_name: string | null;
  email: string | null;
  mobile_no: string | null;
  user_name: string | null;
  password: string | null;
  status: string | null;
};

type StateType = {
  dtoUser: UserDTO;
  saveDisabled: boolean;
  errorMessages: ErrorMessageType;
};

const ERROR_MESSAGES: ErrorMessageType = Object.freeze({
  first_name: null,
  last_name: null,
  email: null,
  mobile_no: null,
  user_name: null,
  password: null,
  status: null,
});

const INITIAL_STATE: StateType = Object.freeze({
  dtoUser: USER,
  arrRoleLookup: [],
  open1: false,
  saveDisabled: false,
  errorMessages: { ...ERROR_MESSAGES },
});

const reducer = (state = INITIAL_STATE, action: StateType): StateType => {
  return { ...state, ...action };
};

const useUserEntry = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [state, setState] = useReducer(reducer, INITIAL_STATE);

  const getData = useCallback(async (): Promise<void> => {
    const dtoUser: UserDTO = await UserService.Get(id as string);
    setState({ dtoUser: dtoUser } as StateType);
  }, [
    //getUser,
    id,
  ]);

  const IsEMailExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const result = await UserService.EMailExists(
      state.dtoUser.id || "",
      state.dtoUser.email,
    );

    exist = result;

    return exist;
  }, [
    //getUserEMailExist,
    state.dtoUser.id,
    state.dtoUser.email,
  ]);

  const IsUserNameExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const result = await UserService.UserNameExists(
      state.dtoUser.id || "",
      state.dtoUser.user_name,
    );

    exist = result;

    return exist;
  }, [
    //getUserUserNameExist,
    state.dtoUser.id,
    state.dtoUser.user_name,
  ]);

  const IsMobileNoExist = useCallback(async (): Promise<boolean> => {
    let exist: boolean = false;
    const result = await UserService.MobileNoExists(
      state.dtoUser.id || "",
      state.dtoUser.mobile_no,
    );

    exist = result;

    return exist;
  }, [state.dtoUser.id, state.dtoUser.mobile_no]);

  useEffect(() => {
    if (id?.trim() !== "") {
      getData();
    }
  }, [id, getData]);

  const onInputChange = useCallback(
    async (event: ChangeEvent<HTMLInputElement>) => {
      setState({
        dtoUser: {
          ...state.dtoUser,
          [event.target.name]: event.target.value,
        },
      } as StateType);
    },
    [state.dtoUser],
  );

  const onMobileNoChange = useCallback(
    async (
      value: string | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    ) => {
      setState({
        dtoUser: {
          ...state.dtoUser,
          mobile_no: value,
        },
      } as StateType);
    },
    [state.dtoUser],
  );

  const onSelectChange = useCallback(
    async (event: SelectChangeEvent<unknown>) => {
      setState({
        dtoUser: {
          ...state.dtoUser,
          [event.target.name]: event.target.value,
        },
      } as StateType);
    },
    [state.dtoUser],
  );

  const validateFirstName = useCallback(async () => {
    if (state.dtoUser.first_name.trim() === "") {
      return "First Name is required";
    } else {
      return null;
    }
  }, [state.dtoUser.first_name]);

  const validateLastName = useCallback(async () => {
    if (state.dtoUser.last_name.trim() === "") {
      return "Last Name is required";
    } else {
      return null;
    }
  }, [state.dtoUser.last_name]);

  const validateEMailId = useCallback(async () => {
    if (state.dtoUser.email.trim() === "") {
      return "E-Mail is required";
    } else if (!state.dtoUser.email.trim().match(regExEMail)) {
      return "E-Mail is invalid";
    } else if (await IsEMailExist()) {
      return "E-Mail already exists";
    } else {
      return null;
    }
  }, [state.dtoUser.email, IsEMailExist]);

  const validateMobileNo = useCallback(async () => {
    if (!isValidPhoneNumber(state.dtoUser.mobile_no.trim())) {
      return "Mobile # is invalid";
    } else if (await IsMobileNoExist()) {
      return "Mobile # already exists";
    } else {
      return null;
    }
  }, [state.dtoUser.mobile_no, IsMobileNoExist]);

  const validateUserName = useCallback(async () => {
    if (state.dtoUser.user_name.trim() === "") {
      return "Username is required";
    } else if (await IsUserNameExist()) {
      return "Username already exists";
    } else {
      return null;
    }
  }, [state.dtoUser.user_name, IsUserNameExist]);

  const validatePassword = useCallback(async () => {
    if (state.dtoUser.password.trim() === "") {
      return "Password is required";
    } else {
      return null;
    }
  }, [state.dtoUser.password]);

  const validateStatus = useCallback(async () => {
    if (state.dtoUser.status.trim() === "") {
      return "Status is required";
    } else {
      return null;
    }
  }, [state.dtoUser.status]);

  const onFirstNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const first_name = await validateFirstName();
      setState({
        errorMessages: { ...state.errorMessages, first_name: first_name },
      } as StateType);
    }, [validateFirstName, state.errorMessages]);

  const onLastNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const last_name = await validateLastName();
      setState({
        errorMessages: { ...state.errorMessages, last_name: last_name },
      } as StateType);
    }, [validateLastName, state.errorMessages]);

  const onEMailIdBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const email = await validateEMailId();
      setState({
        errorMessages: { ...state.errorMessages, email: email },
      } as StateType);
    }, [validateEMailId, state.errorMessages]);

  const onMobileNoBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const mobile_no = await validateMobileNo();
      setState({
        errorMessages: { ...state.errorMessages, mobile_no: mobile_no },
      } as StateType);
    }, [validateMobileNo, state.errorMessages]);

  const onUserNameBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const user_name = await validateUserName();
      setState({
        errorMessages: { ...state.errorMessages, user_name: user_name },
      } as StateType);
    }, [validateUserName, state.errorMessages]);

  const onPasswordBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const password = await validatePassword();
      setState({
        errorMessages: { ...state.errorMessages, password: password },
      } as StateType);
    }, [validatePassword, state.errorMessages]);

  const onStatusBlur = useCallback(async () =>
    //event: React.FocusEvent<HTMLInputElement>
    {
      const status = await validateStatus();
      setState({
        errorMessages: { ...state.errorMessages, status: status },
      } as StateType);
    }, [validateStatus, state.errorMessages]);

  const validateForm = useCallback(async () => {
    let isFormValid = false;
    const errorMessages: ErrorMessageType = { ...ERROR_MESSAGES };
    errorMessages.first_name = await validateFirstName();
    if (!errorMessages.first_name) {
      isFormValid = true;
    }
    errorMessages.last_name = await validateLastName();
    if (!errorMessages.last_name) {
      isFormValid = true;
    }
    errorMessages.email = await validateEMailId();
    if (!errorMessages.email) {
      isFormValid = true;
    }
    errorMessages.mobile_no = await validateMobileNo();
    if (!errorMessages.mobile_no) {
      isFormValid = true;
    }
    errorMessages.user_name = await validateUserName();
    if (!errorMessages.user_name) {
      isFormValid = true;
    }
    errorMessages.password = await validatePassword();
    if (!errorMessages.password) {
      isFormValid = true;
    }
    errorMessages.status = await validateStatus();
    if (!errorMessages.status) {
      isFormValid = true;
    }
    setState({ errorMessages: errorMessages } as StateType);
    return isFormValid;
  }, [
    validateFirstName,
    validateLastName,
    validateEMailId,
    validateMobileNo,
    validateUserName,
    validatePassword,
    validateStatus,
  ]);

  const onSaveClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      try {
        setState({ saveDisabled: true } as StateType);
        event.preventDefault();

        if (await validateForm()) {
          if ((id || "").trim() === "") {
            const result = await UserService.Insert({
              first_name: state.dtoUser.first_name.trim(),
              last_name: state.dtoUser.last_name.trim(),
              email: state.dtoUser.email.trim(),
              mobile_no: state.dtoUser.mobile_no.trim(),
              user_name: state.dtoUser.user_name.trim(),
              password: state.dtoUser.password.trim(),
              status: state.dtoUser.status.trim(),
            });
            if (result) {
              toast.success("record saved successfully");
              navigate("/users/list");
            } else {
              toast.error("Failed to save the record");
            }
          } else {
            const result = await UserService.Update({
              id: state.dtoUser.id.trim(),
              first_name: state.dtoUser.first_name.trim(),
              last_name: state.dtoUser.last_name.trim(),
              email: state.dtoUser.email.trim(),
              mobile_no: state.dtoUser.mobile_no.trim(),
              user_name: state.dtoUser.user_name.trim(),
              password: state.dtoUser.password.trim(),

              status: state.dtoUser.status.trim(),
            });
            if (result) {
              toast.success("record saved successfully");
              navigate("/users/list");
            } else {
              toast.error("Failed to save the record");
            }
          }
        }
      } catch {
        toast.error("Failed to save the record");
      } finally {
        setState({ saveDisabled: false } as StateType);
      }
    },
    [validateForm, id , state.dtoUser, navigate],
  );

  const onCancelClick = useCallback(
    async (event: React.MouseEvent<HTMLElement>) => {
      event.preventDefault();
      navigate("/users/list");
    },
    [navigate],
  );

  return {
    state,
    onInputChange,
    onMobileNoChange,
    onSelectChange,
    onFirstNameBlur,
    onLastNameBlur,
    onEMailIdBlur,
    onMobileNoBlur,
    onUserNameBlur,
    onPasswordBlur,
    onStatusBlur,
    onSaveClick,
    onCancelClick,
  };
};

export default useUserEntry;
