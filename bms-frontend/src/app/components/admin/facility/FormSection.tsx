import { Grid, Typography } from "@mui/material";
import React from "react";

interface FormSectionProps {
  label: string;
  children: React.ReactNode;
  mt?: number;
}

const FormSection = ({ label, children, mt = 0.5 }: FormSectionProps) => (
  <Grid container spacing={8} sx={{ mb: 2 }}>
    <Grid item xs={12} sm={1}>
      <Typography sx={{ fontSize: ".85rem", mt }}>{label}</Typography>
    </Grid>
    <Grid item xs={12} sm={11}>
      {children}
    </Grid>
  </Grid>
);

export default FormSection;
