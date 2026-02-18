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
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";

const navItems = [
  { label: "Home", href: "/" },
  { label: "Rooms", href: "/rooms" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
];

export default function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const drawerContent = (
    <Box sx={{ width: 250, p: 2 }}>
      {navItems.map((item, idx) => (
        <Box key={item.href}>
          <Link href={item.href} passHref>
            <Button fullWidth>{item.label}</Button>
          </Link>
          {idx < navItems.length - 1 && <Divider />}
        </Box>
      ))}
    </Box>
  );

  return (
    <>
      <AppBar
        className="mt-px px-2"
        position="fixed"
        sx={{
          background:
            "linear-gradient(to right, var(--theme-color-dark) 0%, var(--theme-color-light) 63%)",
        }}
      >
        <Toolbar className="flex justify-between">
          <Typography
            sx={{
              fontSize: "1.3rem",
              fontStyle: "italic",
              letterSpacing: "0.15rem",
            }}
          >
            KsVill Hotel
          </Typography>

          {/* Desktop nav */}
          <Box className="hidden md:flex items-center">
            <Box className="mx-6">
              <Link href="/secure/admin/control" passHref>
                <Button
                  className="px-6"
                  variant="contained"
                  sx={{
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

            {navItems.map((item, idx) => (
              <Box className="flex items-center" key={item.href}>
                <Link href={item.href} passHref>
                  <Button
                    className="flex items-center w-24"
                    sx={{
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
                {idx < navItems.length - 1 && (
                  <Divider
                    orientation="vertical"
                    flexItem
                    sx={{
                      bgcolor: "white",
                      opacity: 0.5,
                      mx: 2,
                    }}
                  />
                )}
              </Box>
            ))}
          </Box>

          {/* Mobile hamburger */}
          <div className="flex md:hidden">
            <IconButton sx={{ color: "white" }} onClick={handleDrawerToggle}>
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>

      {/* Drawer for mobile menu */}
      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        {drawerContent}
      </Drawer>
    </>
  );
}
