import { memo, forwardRef } from "react";
import Select, { SelectProps } from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import eq from "lodash/eq";

type MySelectProps = SelectProps & {
  dataSource: any[];
  valueField?: string;
  displayField?: string;
};

const MySelect = forwardRef<HTMLSelectElement, MySelectProps>(
  ({ dataSource, valueField, displayField, sx, ...others }, ref) => {
    return (
      <Select
        ref={ref}
        size="small"
        fullWidth
        displayEmpty
        variant="outlined"
        MenuProps={{
          style: { zIndex: 350010 },
          // PaperProps: {
          //   sx: {
          //     maxHeight: 300,
          //     borderRadius: 2,
          //     boxShadow: (theme) =>
          //       theme.palette.mode === "dark"
          //         ? "0 2px 8px rgba(0,0,0,0.6)"
          //         : "0 2px 8px rgba(0,0,0,0.15)",
          //   },
          // },
        }}
        sx={[
          {
            borderRadius: 2,
            backgroundColor: (theme) =>
              theme.palette.mode === "dark" ? "#1e1e1e" : "#fafafa",
            transition: "all 0.25s ease-in-out",

            // === Outlined Select Root ===
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
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
                  `0 0 0 2px ${theme.palette.primary.main}33`,
              },
              "&.Mui-error fieldset": {
                borderColor: "#d32f2f",
                boxShadow: "0 0 0 2px rgba(211, 47, 47, 0.2)",
              },
              "&.Mui-success fieldset": {
                borderColor: "#2e7d32",
                boxShadow: "0 0 0 2px rgba(46, 125, 50, 0.2)",
              },
            },

            // === Select Displayed Value ===
            "& .MuiSelect-select": {
              padding: "10px 12px",
              color: "text.primary",
              backgroundColor: "transparent",
            },

            // === Icon (dropdown arrow) ===
            "& .MuiSelect-icon": {
              color: "text.secondary",
              transition: "color 0.2s ease",
            },
            "&:hover .MuiSelect-icon": {
              color: "primary.main",
            },           
          },
          ...(Array.isArray(sx) ? sx : [sx]),
        ]}
        {...others}
      >
        {valueField && displayField
          ? dataSource.map((item) => (
              <MenuItem key={item[valueField]} value={item[valueField]}>
                {item[displayField]}
              </MenuItem>
            ))
          : dataSource.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
      </Select>
    );
  }
);
MySelect.displayName="MySelect";
export default memo(MySelect, (prevProps, nextProps) => eq(prevProps, nextProps));
