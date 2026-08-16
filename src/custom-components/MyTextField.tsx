import { memo, forwardRef } from "react";
import TextField, { TextFieldProps } from "@mui/material/TextField";
import eq from "lodash/eq";

const MyTextField = forwardRef<HTMLInputElement, TextFieldProps>(
  ({ sx, ...rest }, ref) => {
    console.log('MyTextField render');
    return (
      <TextField
        ref={ref}
        size="small"
        variant="outlined"
        fullWidth
        //InputLabelProps={{ shrink: true }}
        sx={[
          {
            // === Required field asterisk ===
            "& .MuiFormLabel-asterisk": {
              color: "#d32f2f",
              fontWeight: 600,
              marginLeft: "2px",
            },

            // === Label styling ===
            "& .MuiInputLabel-root": {
              color: "text.secondary",
              fontWeight: 500,
              letterSpacing: "0.02em",
              transition: "color 0.2s ease, transform 0.2s ease",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "primary.main",
            },
            "& .MuiInputLabel-root.Mui-error": {
              color: "#d32f2f",
            },

            // === Input field styling ===
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: (theme) =>
                theme.palette.mode === "dark" ? "#1e1e1e" : "#fafafa",
              transition: "all 0.25s ease-in-out",

              "& fieldset": {
                borderColor: (theme) =>
                  theme.palette.mode === "dark" ? "#555" : "#d0d0d0",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                boxShadow: (theme) =>
                  `0 0 0 2px ${theme.palette.primary.main}33`, // translucent glow
              },
              "&.Mui-error fieldset": {
                borderColor: "#d32f2f",
                boxShadow: "0 0 0 2px rgba(211, 47, 47, 0.2)",
              },
              "&.Mui-success fieldset": {
                borderColor: "#2e7d32",
                boxShadow: "0 0 0 2px rgba(46, 125, 50, 0.2)",
              },
              "& input": {
                padding: "10px 12px",
              },
            },

            // === Helper text styling ===
            "& .MuiFormHelperText-root": {
              marginLeft: 0,
              marginRight: 0,
              fontSize: "0.75rem",
              color: "text.secondary",
              transition: "color 0.2s ease",
            },
            "& .MuiFormHelperText-root.Mui-error": {
              color: "#d32f2f",
              fontWeight: 500,
            },
            "& .MuiFormHelperText-root.Mui-success": {
              color: "#2e7d32",
              fontWeight: 500,
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...rest}
      />
    );
  }
);
MyTextField.displayName="MyTextField";
export default memo(MyTextField, (prev, next) => eq(prev, next));
