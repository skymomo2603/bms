"use client";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import NextLink from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_SIDEBAR_ITEMS } from "@/constants/adminNav";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  function isActivePath(pathname: string, href: string, label: string) {
    if (label === "Dashboard") {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      <Grid container sx={{ minHeight: "44rem", mb: 3, mt: 10 }}>
        {/* Left grid: button display control */}
        <Grid
          item
          sx={{
            width: "16%",
            maxWidth: "14rem",
            pb: 3,
            bgcolor: "var(--button-bg-blue)",
            borderTopRightRadius: ".5rem",
            borderBottomRightRadius: ".5rem",
            overflow: "hidden",
          }}
        >
          {/* Welcome block */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              py: 3,
            }}
          >
            <Avatar
              sx={{
                width: 70,
                height: 70,
                bgcolor: "white",
                color: "#82ADC6",
                mb: 1,
              }}
            />
            <Typography
              variant="h6"
              sx={{
                fontSize: "1.1rem",
                fontWeight: 500,
                color: "white",
                letterSpacing: "0.04rem",
                mb: 0.5,
              }}
            >
              Welcome, Kirk!
            </Typography>
            <Chip
              label="Super Admin"
              sx={{
                fontSize: "0.55rem",
                height: "20px",
                bgcolor: "white",
                color: "var(--text-blue-dark)",
              }}
            />
          </Box>

          <Divider
            sx={{
              borderColor: "rgba(255,255,255,0.3)",
              mb: 1,
              mx: 2,
            }}
          />

          {/* Navigation buttons */}
          {ADMIN_SIDEBAR_ITEMS.map((item) => {
            const isActive = isActivePath(pathname, item.href, item.label);
            return (
              <Stack key={item.label}>
                <Button
                  href={item.href}
                  component={NextLink}
                  sx={{
                    width: "100%",
                    justifyContent: "flex-start",
                    py: 3,
                    px: 2,
                    color: "white",
                    borderRadius: "0",
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
                    borderLeft: isActive ? "2px solid white" : "none",
                  }}
                >
                  <item.icon
                    sx={{
                      fontSize: isActive ? 32 : 28,
                      mx: 2,
                    }}
                  />
                  <Typography
                    sx={{
                      fontSize: isActive ? ".89rem" : ".88rem",
                      textTransform: "none",
                    }}
                  >
                    {item.label}
                  </Typography>
                </Button>
              </Stack>
            );
          })}
        </Grid>

        {/* Right grid: child route content */}
        <Grid
          item
          sx={{
            width: "82%",
            ml: ".9rem",
            border: "1px solid var(--stroke-color)",
            borderRadius: ".5rem",
          }}
        >
          <main>{children}</main>
        </Grid>
      </Grid>
    </>
  );
}
