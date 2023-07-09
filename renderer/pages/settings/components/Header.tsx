import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { CgMenuGridR } from "react-icons/cg";
import { useRouter } from "next/router";

interface props {
  title: string;
}

export default function Header({ title }: props) {
  const router = useRouter();
  return (
    <Box
      sx={{
        flexGrow: 1,
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: "100",
      }}
    >
      <AppBar
        position="static"
        sx={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#18181b",
        }}
      >
        <Toolbar
          sx={{
            width: "100%",
            justifyContent: "space-between",
          }}
        >
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => {
              router.push("/settings/settings");
            }}
          >
            <CgMenuGridR />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Sc2-Build-Order-Ts
          </Typography>
          {title && (
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Name of build order : {title}
            </Typography>
          )}
          <Button color="inherit">Login</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
