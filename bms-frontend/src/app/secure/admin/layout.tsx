"use client";

import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import DashboardIcon from "@mui/icons-material/Dashboard";
import MeetingRoomRoundedIcon from "@mui/icons-material/MeetingRoomRounded";
import MenuBookRoundedIcon from "@mui/icons-material/MenuBookRounded";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import StorageRoundedIcon from "@mui/icons-material/StorageRounded";

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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const navItems = [
    {
      label: "Dashboard",
      href: "/secure/admin/control",
      icon: DashboardIcon,
    },
    {
      label: "Bookings",
      href: "/secure/admin/control/bookings",
      icon: MenuBookRoundedIcon,
    },
    {
      label: "Rooms",
      href: "/secure/admin/control/rooms",
      icon: MeetingRoomRoundedIcon,
    },
    {
      label: "Content",
      href: "/secure/admin/control/content",
      icon: ArticleRoundedIcon,
    },
    {
      label: "Master Data",
      href: "/secure/admin/control/masterdata",
      icon: StorageRoundedIcon,
    },
    {
      label: "Users",
      href: "/secure/admin/control/users",
      icon: PersonRoundedIcon,
    },
  ];

  const pathname = usePathname();

  function isActivePath(pathname: string, href: string, label: string) {
    if (label === "Dashboard") {
      return pathname === href;
    }
    return pathname === href || pathname.startsWith(href + "/");
  }

  return (
    <>
      <div className="mb-10 mt-20">
        <Grid container sx={{ minHeight: "44rem" }}>
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
            <Box className="flex flex-col items-center justify-center py-6">
              <Avatar
                sx={{
                  width: 72,
                  height: 72,
                  bgcolor: "rgba(255,255,255,0.6)",
                  color: "white",
                  mb: 1,
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontSize: "1.05rem",
                  fontWeight: 500,
                  color: "white",
                  letterSpacing: "0.05rem",
                  mb: 0.5,
                }}
              >
                Welcome, Kirk!
              </Typography>
              <Chip
                label="Super Admin"
                sx={{
                  fontSize: "0.7rem",
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
            {navItems.map((item) => {
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
                        fontSize: isActive ? ".88rem" : ".85rem",
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
      </div>
    </>
  );
}
