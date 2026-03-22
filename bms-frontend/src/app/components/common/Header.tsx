"use client";

import MenuIcon from "@mui/icons-material/Menu";
import {
  AppBar,
  Box,
  Button,
  Divider,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

import {
  ADMIN_CONTROL_ROUTE,
  PUBLIC_NAV_ITEMS,
  SITE_NAME,
} from "@/constants/site";

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box sx={{ width: 250, p: 2 }}>
      {PUBLIC_NAV_ITEMS.map((item, idx) => (
        <Box key={item.href}>
          <Link href={item.href} passHref>
            <Button fullWidth>{item.label}</Button>
          </Link>
          {idx < PUBLIC_NAV_ITEMS.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <AppBar
        position="fixed"
        elevation={0}
        sx={{
          background:
            "linear-gradient(to right, var(--theme-color-dark) 0%, var(--theme-color-light) 63%)",
          mt: 0.125,
          px: 1,
          boxShadow: "0px 3px 8px rgba(0, 0, 0, 0.28)",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
          }}
        >
          <Typography
            sx={{
              fontSize: "1.3rem",
              fontStyle: "italic",
              letterSpacing: "0.15rem",
            }}
          >
            {SITE_NAME}
          </Typography>

          {/* Desktop nav */}
          {!isMobile && (
            <Box sx={{ display: "flex", alignItems: "center" }}>
              <Box sx={{ mx: 3 }}>
                <Link href={ADMIN_CONTROL_ROUTE} passHref>
                  <Button
                    variant="contained"
                    sx={{
                      px: 3,
                      backgroundColor: "white",
                      color: "var(--text-dark)",
                      fontSize: "0.8rem",
                      textTransform: "none",
                      "&:hover": { backgroundColor: "var(--button-bg-light)" },
                    }}
                  >
                    Control
                  </Button>
                </Link>
              </Box>

              {PUBLIC_NAV_ITEMS.map((item, idx) => (
                <Box
                  sx={{ display: "flex", alignItems: "center" }}
                  key={item.href}
                >
                  <Link href={item.href} passHref>
                    <Button
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        width: 120,
                        color: "white",
                        fontSize: "0.75rem",
                        textTransform: "none",
                        "&:hover": { backgroundColor: "transparent" },
                      }}
                    >
                      {item.label}
                    </Button>
                  </Link>

                  {/* Divider only if not the last item */}
                  {idx < PUBLIC_NAV_ITEMS.length - 1 && (
                    <Divider
                      orientation="vertical"
                      flexItem
                      sx={{
                        bgcolor: "white",
                        opacity: 0.5,
                        mx: 1,
                      }}
                    />
                  )}
                </Box>
              ))}
            </Box>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <IconButton sx={{ color: "white" }} onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile menu */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
}
