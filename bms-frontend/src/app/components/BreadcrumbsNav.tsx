"use client";

import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Box, Breadcrumbs, Link } from "@mui/material";
import NextLink from "next/link";

type Crumb = {
  label: string;
  href?: string;
  active?: boolean;
};

type BreadcrumbsNavProps = {
  crumbs: Crumb[];
};

export default function BreadcrumbsNav({ crumbs }: BreadcrumbsNavProps) {
  return (
    <Box
      position="relative"
      sx={{
        m: 1.2,
        py: 1,
        px: 1.5,
        backgroundColor: "var(--breadcrumb-background)",
        borderRadius: "calc(0.5rem * (200 / 400))",
      }}
    >
      <Breadcrumbs
        aria-label="breadcrumb"
        separator="›"
        sx={{
          "& .MuiBreadcrumbs-separator": {
            color: "var(--text-light)",
          },
        }}
      >
        {crumbs.map((crumb, index) => (
          <Link
            key={index}
            component={crumb.active ? "span" : NextLink}
            href={crumb.active ? undefined : crumb.href || "#"}
            underline={crumb.active ? "none" : "hover"}
            color={crumb.active ? "text.primary" : "inherit"}
            sx={{
              fontSize: ".8rem",
              color: "var(--text-light)",
              pointerEvents: crumb.active ? "none" : "auto",
              cursor: crumb.active ? "default" : "pointer",
            }}
          >
            {crumb.label}
          </Link>
        ))}
      </Breadcrumbs>
      {crumbs.length > 1 && crumbs[crumbs.length - 1].active && (
        <NextLink href={crumbs[crumbs.length - 2]?.href || "#"}>
          <Box
            className="absolute top-1 right-0"
            sx={{
              bgcolor: "white",
              borderRadius: "50%",
              boxShadow: "0px 0px 3px var(--box-shadow)",
              width: "2rem",
              height: "2rem",
              mx: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "var(--text-light)",
              cursor: "pointer",
            }}
          >
            <ArrowBackIosNewOutlinedIcon sx={{ fontSize: "1.1rem" }} />
          </Box>
        </NextLink>
      )}
    </Box>
  );
}
