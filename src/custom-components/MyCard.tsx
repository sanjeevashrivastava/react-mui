'use client'
import { memo, ReactElement } from "react";
import Card, { CardProps } from "@mui/material/Card";
import eq from "lodash/eq";
import MyCardHeader from "./MyCardHeader";

interface MyCardProps extends CardProps {
  title?: string;
  secondary?: ReactElement;
}

const MyCard = ({ children, title, secondary, sx, ...props }: MyCardProps) => {
  console.log("MyCard rendered");

  return (
    <Card
      {...props} 
      sx={[
        {
          position: "relative",
          overflow: "hidden",
          borderRadius: 3,
          p: 1,
          transition: "all 0.25s ease-in-out",
          background: (theme) =>
            theme.palette.mode === "dark"
              ? "linear-gradient(145deg, #1e1e1e, #232323)"
              : "linear-gradient(145deg, #ffffff, #f9f9f9)",
          boxShadow: (theme) =>
            theme.palette.mode === "dark"
              ? "0 2px 6px rgba(0,0,0,0.6)"
              : "0 2px 6px rgba(0,0,0,0.1)",
          border: (theme) =>
            theme.palette.mode === "dark"
              ? "1px solid rgba(255,255,255,0.08)"
              : "1px solid rgba(0,0,0,0.08)",

          // === Hover and focus effects ===
          "&:hover": {
            transform: "translateY(-2px)",
            boxShadow: (theme) =>
              theme.palette.mode === "dark"
                ? "0 4px 12px rgba(0,0,0,0.7)"
                : "0 4px 12px rgba(0,0,0,0.15)",
          },
          "&:focus-within": {
            boxShadow: (theme) =>
              `0 0 0 2px ${theme.palette.primary.main}33`,
          },

          // === Optional divider line between header and content ===
          "& .MuiCardHeader-root": {
            borderBottom: (theme) =>
              theme.palette.mode === "dark"
                ? "1px solid rgba(255,255,255,0.08)"
                : "1px solid rgba(0,0,0,0.08)",
            mb: 1.5,
          },          
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}  
      
    >
      {(secondary || title) && (
        <MyCardHeader action={secondary} title={title} />
      )}
      {children}
    </Card>
  );
};

export default memo(MyCard, (prev, next) => eq(prev, next));
