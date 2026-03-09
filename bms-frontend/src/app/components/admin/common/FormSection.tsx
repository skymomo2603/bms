import { Grid, Typography } from "@mui/material";
import React from "react";

interface FormSectionProps {
  label: string;
  children: React.ReactNode;
  mt?: number;
}

const FormSection = ({ label, children }: FormSectionProps) => (
  <Grid container sx={{ mb: 2 }}>
    <Grid item xs={12} sm={1}>
      <Typography sx={{ fontSize: ".85rem", mt: 1.9 }}>{label}</Typography>
    </Grid>
    <Grid item xs={12} sm={11}>
      {children}
    </Grid>
  </Grid>
);

export default FormSection;
