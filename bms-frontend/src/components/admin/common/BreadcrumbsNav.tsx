"use client";

import ArrowBackIosNewOutlinedIcon from "@mui/icons-material/ArrowBackIosNewOutlined";
import { Box, Breadcrumbs, Link } from "@mui/material";
import NextLink from "next/link";

import type { AdminBreadcrumb } from "@/types/admin";

type BreadcrumbsNavProps = {
  crumbs: AdminBreadcrumb[];
};

export default function BreadcrumbsNav({ crumbs }: BreadcrumbsNavProps) {
  const previousCrumb = crumbs[crumbs.length - 2];
  const currentCrumb = crumbs[crumbs.length - 1];
  const backHref =
    crumbs.length > 1 && currentCrumb?.active ? previousCrumb?.href : undefined;

  return (
    <Box
      position="relative"
      sx={{
        py: 1,
        px: 1.5,
        m: 2,
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
        {crumbs.map((crumb) => {
          const isLink = !crumb.active && Boolean(crumb.href);

          return (
            <Link
              key={`${crumb.label}-${crumb.href ?? (crumb.active ? "active" : "static")}`}
              component={isLink ? NextLink : "span"}
              href={isLink ? crumb.href : undefined}
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
          );
        })}
      </Breadcrumbs>
      {backHref && (
        <NextLink href={backHref}>
          <Box
            sx={{
              position: "absolute",
              top: 4,
              right: 0,
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
