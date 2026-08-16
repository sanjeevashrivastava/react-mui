import { memo } from "react";
import eq from "lodash/eq";
import MyButton from "../../custom-components/MyButton";
import MyTextField from "../../custom-components/MyTextField";
import useUserEntry from "./useUserEntry";
import MyFormControl from "../../custom-components/MyFormControl";
import MyInputLabel from "../../custom-components/MyInputLabel";
import MySelect from "../../custom-components/MySelect";
import { arrUserStatus } from "../../common/Configuration";
import MyCardContent from "../../custom-components/MyCardContent";
import MyCardActions from "../../custom-components/MyCardActions";
import MyDivider from "../../custom-components/MyDivider";
import MyGrid from "../../custom-components/MyGrid";
import MyCard from "../../custom-components/MyCard";
import MyPhoneNumber from "../../custom-components/MyPhoneNumber";
import SaveIcon from "@mui/icons-material/Save";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import MyErrorMessage from "../../custom-components/MyErrorMessage";

const UserEntry = () => {
  const {
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
  } = useUserEntry();

  return (
    <MyCard>
      <MyCardContent>
        <MyGrid container spacing={2}>
          <MyGrid size={{ xs: 12, sm: 12 }}>
            <MyGrid container spacing={2}>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  required
                  label="First Name"
                  name="first_name"
                  value={state.dtoUser.first_name}
                  onChange={onInputChange}
                  onBlur={onFirstNameBlur}
                  error={state.errorMessages.first_name ? true : false}
                />
                <MyErrorMessage
                  errorMessage={state.errorMessages.first_name}
                ></MyErrorMessage>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  required
                  label="Last Name"
                  name="last_name"
                  value={state.dtoUser.last_name}
                  onChange={onInputChange}
                  onBlur={onLastNameBlur}
                  error={state.errorMessages.last_name ? true : false}
                />
                <MyErrorMessage
                  errorMessage={state.errorMessages.last_name}
                ></MyErrorMessage>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  required
                  label="E-Mail"
                  name="email"
                  value={state.dtoUser.email}
                  onChange={onInputChange}
                  onBlur={onEMailIdBlur}
                  error={state.errorMessages.email ? true : false}
                />
                <MyErrorMessage
                  errorMessage={state.errorMessages.email}
                ></MyErrorMessage>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyPhoneNumber
                  required
                  label="Mobile #"
                  onChange={onMobileNoChange}
                  value={state.dtoUser.mobile_no}
                  onBlur={onMobileNoBlur}
                  error={state.errorMessages.mobile_no ? true : false}
                />
                <MyErrorMessage
                  errorMessage={state.errorMessages.mobile_no}
                ></MyErrorMessage>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  required
                  autoComplete="new-password"
                  label="Username"
                  name="user_name"
                  value={state.dtoUser.user_name}
                  onChange={onInputChange}
                  onBlur={onUserNameBlur}
                  error={state.errorMessages.user_name ? true : false}
                />
                <MyErrorMessage
                  errorMessage={state.errorMessages.user_name}
                ></MyErrorMessage>
              </MyGrid>
              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyTextField
                  required
                  autoComplete="new-password"
                  type="password"
                  label="Password"
                  name="password"
                  value={state.dtoUser.password}
                  onChange={onInputChange}
                  onBlur={onPasswordBlur}
                  error={state.errorMessages.password ? true : false}
                />
                <MyErrorMessage
                  errorMessage={state.errorMessages.password}
                ></MyErrorMessage>
              </MyGrid>

              <MyGrid size={{ xs: 12, sm: 6 }}>
                <MyFormControl
                  error={state.errorMessages.status ? true : false}
                  fullWidth
                >
                  <MyInputLabel
                    error={state.errorMessages.status ? true : false}
                  >
                    Status<span className="error1">*</span>
                  </MyInputLabel>
                  <MySelect
                    label="Status"
                    name="status"
                    value={
                      state.dtoUser.status.trim() === ""
                        ? " "
                        : state.dtoUser.status.trim()
                    }
                    dataSource={arrUserStatus}
                    onChange={onSelectChange}
                    onBlur={onStatusBlur}
                  />
                </MyFormControl>
                <MyErrorMessage
                  errorMessage={state.errorMessages.status}
                ></MyErrorMessage>
              </MyGrid>
            </MyGrid>
          </MyGrid>
        </MyGrid>
      </MyCardContent>
      <MyDivider></MyDivider>
      <MyCardActions>
        <MyButton
          startIcon={<SaveIcon />}
          onClick={onSaveClick}
          disabled={state.saveDisabled}
        >
          Save
        </MyButton>
        <MyButton startIcon={<ArrowBackIcon />} onClick={onCancelClick}>
          Cancel
        </MyButton>
      </MyCardActions>
    </MyCard>
  );
};

export default memo(UserEntry, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
