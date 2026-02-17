"use client";

import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    { label: "Dashboard", href: "/secure/admin/control" },
    { label: "Bookings", href: "/secure/admin/control/bookings" },
    { label: "Rooms", href: "/secure/admin/control/rooms" },
    { label: "Content", href: "/secure/admin/control/content" },
    { label: "Master Data", href: "/secure/admin/control/masterdata" },
    { label: "Users", href: "/secure/admin/control/users" },
  ];

  const pathname = usePathname();

  return (
    <>
      <Box sx={{ mt: 12, ml: 5 }}>
        <Stack direction="column" sx={{ my: "1.5rem", ml: "1.5rem" }}>
          <Typography
            variant="h6"
            sx={{ fontStyle: "italic", letterSpacing: "0.15rem" }}
          >
            Welcome, Kirk!
          </Typography>
          <Typography
            variant="body2"
            sx={{ fontStyle: "italic", letterSpacing: "0.05rem" }}
          >
            Super Admin access enabled. Manage all system features from the
            control panel below.
          </Typography>
        </Stack>
      </Box>

      <Box
        sx={{
          width: "92%",
          margin: "auto",
          boxShadow: "0px 0px 16px var(--box-shadow)",
          borderRadius: "0.4rem",
          bgcolor: "white",
          overflow: "hidden",
          marginBottom: 8,
        }}
      >
        <Grid container sx={{ minHeight: "32rem" }}>
          {/* Left grid: button display control */}
          <Grid
            item
            sx={{
              minWidth: "11rem",
              bgcolor: "var(--button-bg-blue)",
              py: 3.5,
            }}
          >
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Stack key={item.label}>
                  <Button
                    href={item.href}
                    component={NextLink}
                    sx={{
                      width: "100%",
                      justifyContent: "flex-start",
                      py: 2.2,
                      px: 4,
                      color: "white",
                      borderRadius: "0",
                      fontSize: "0.92rem",
                      textTransform: "none",
                      fontWeight: isActive ? "bold" : "regular",
                      boxShadow: isActive
                        ? "0px 0px 6px var(--box-shadow-light)"
                        : "none",
                      bgcolor: isActive
                        ? "var(--button-bg-blue-active)"
                        : "transparent",
                      "&:hover": {
                        bgcolor: isActive
                          ? "var(--button-bg-blue-active)"
                          : "var(--button-bg-blue-hover)",
                      },
                    }}
                  >
                    {item.label}
                  </Button>
                </Stack>
              );
            })}
          </Grid>

          {/* Right grid: child route content */}
          <Grid item sx={{ width: "80%" }}>
            <main>{children}</main>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
