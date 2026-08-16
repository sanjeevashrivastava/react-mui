import ErrorIcon, {

} from "@mui/icons-material/Error";
import { memo } from "react";
import MyBox from "./MyBox";
import MyTypography from "./MyTypography";

interface MyErrorMessageProps {
  errorMessage: string | null;
}

const MyErrorMessage = memo(
  ({ errorMessage, ...props }: MyErrorMessageProps) => {
    console.log("MyErrorMessage render");

    if (!errorMessage) {
      return null;
    }

    return (
      <MyBox
        component="div"
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-start",
          height: 35,
          border: "1px solid #ccc",
        }}
        className="error"
      >
        <ErrorIcon
          {...props}
          sx={{
            marginLeft: "-20px",
            marginRight: "15px",
          }}
        />

        <MyTypography sx={{ marginLeft: "-10px" }}>
          {errorMessage}.
        </MyTypography>
      </MyBox>
    );
  },
  (prevProps, nextProps) =>
    prevProps.errorMessage === nextProps.errorMessage 
);

export default MyErrorMessage;