import { memo, ReactElement } from "react";
import { CardHeader, CardHeaderProps, Typography, Box } from "@mui/material";
import eq from "lodash/eq";

interface MyCardHeaderProps extends CardHeaderProps {
  title?: string;
  action?: ReactElement;
}

const MyCardHeader = ({ title, action, sx, ...props }: MyCardHeaderProps) => {
  return (
    <CardHeader
      {...props}
      title={
        title ? (
          <Typography
            variant="h6"
            sx={{
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: (theme) =>
                theme.palette.mode === "dark"
                  ? theme.palette.grey[100]
                  : theme.palette.text.primary,
            }}
          >
            {title}
          </Typography>
        ) : null
      }
      action={
        action ? (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1,
              "& .MuiButton-root": {
                textTransform: "none",
                borderRadius: 2,
                fontWeight: 500,
              },
            }}
          >
            {action}
          </Box>
        ) : undefined
      }
      sx={[
        {
          pb: 1.5,
          pt: 0.5,
          px: 2,
          mb: 1.5,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: (theme:any) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(90deg, #1e1e1e, #252525)"
              : "linear-gradient(90deg, #fafafa, #ffffff)",
          borderBottom: (theme:any) =>
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.08)",
          borderTopLeftRadius: (theme:any) => theme.shape.borderRadius as number * 2,
          borderTopRightRadius: (theme:any) => theme.shape.borderRadius as number * 2,
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
};

export default memo(MyCardHeader, (prev, next) => eq(prev, next));
