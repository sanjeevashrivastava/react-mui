import { memo } from 'react';
import MuiPhoneNumber, { MuiPhoneNumberProps } from 'mui-phone-number';
import eq from 'lodash/eq';

type MyPhoneNumberProps = MuiPhoneNumberProps & {};

const MyPhoneNumber = ({sx, ...props }: MyPhoneNumberProps) => {
  console.log('MyPhoneNumber rendered');
  return <MuiPhoneNumber //InputLabelProps={{ shrink: true }} 
  size="small" variant="outlined" fullWidth defaultCountry={'us'} sx={[
          {
            // Asterisk color for required fields
            "& .MuiFormLabel-asterisk": {
              color: "#d32f2f",
              fontWeight: 600,
              marginLeft: "2px",
            },

            // Label styling
            "& .MuiInputLabel-root": {
              color: "text.secondary",
              fontWeight: 500,
              letterSpacing: "0.02em",
              transition: "color 0.2s ease",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "primary.main",
            },

            // Input styling
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              backgroundColor: "#fafafa",
              transition: "all 0.2s ease-in-out",
              "& fieldset": {
                borderColor: "#d0d0d0",
              },
              "&:hover fieldset": {
                borderColor: "primary.main",
              },
              "&.Mui-focused fieldset": {
                borderColor: "primary.main",
                boxShadow: "0 0 0 2px rgba(25, 118, 210, 0.15)",
              },
              "& input": {
                padding: "10px 12px",
              },
            },

            // Helper text styling
            "& .MuiFormHelperText-root": {
              marginLeft: 0,
              marginRight: 0,
              fontSize: "0.75rem",
              color: "text.secondary",
            },
            "& .MuiFormLabel-root.Mui-error": {
              color: "#d32f2f",
              fontWeight: 500,
            },
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]} {...props} />;
};

export default memo(MyPhoneNumber, (prevProps, nextProps) => {
  return eq(prevProps, nextProps); // Don't re-render!
});
