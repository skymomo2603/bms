import { Button, type ButtonProps } from "@mui/material";

import { mergeSx } from "@/components/common/fields/commonFieldStyles";
import { publicActionButtonSx } from "@/components/common/fields/publicFieldStyles";

export default function CommonActionButton({
  children,
  sx,
  variant,
  ...props
}: ButtonProps) {
  return (
    <Button
      {...props}
      variant={variant ?? "contained"}
      sx={mergeSx(publicActionButtonSx, sx)}
    >
      {children}
    </Button>
  );
}
