import ControlPointOutlinedIcon from "@mui/icons-material/ControlPointOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import SelectAllTwoToneIcon from "@mui/icons-material/SelectAllTwoTone";
import { Box, Button, Typography } from "@mui/material";

type FacilityAction = () => void;

interface FacilityControlProps {
  labelSingular: string;
  labelPlural: string;
  onCreate?: FacilityAction;
  onSelectAll?: FacilityAction;
  onEditAll?: FacilityAction;
  onSetStatusAll?: FacilityAction;
  onDeleteAll?: FacilityAction;
}

const buttonStyle = {
  width: "100%",
  height: "3rem",
  bgcolor: "white",
  color: "var(--text-blue-dark2)",
  fontSize: "0.8rem",
  textTransform: "none",
  boxShadow: "0px 0px 3px var(--box-shadow)",
  "&:hover": {
    bgcolor: "var(--button-bg-blue-light-hover)",
    boxShadow: "0px 0px 3px var(--box-shadow)",
  },
  display: "flex",
  justifyContent: "flex-start",
  gap: 1,
  "& .MuiSvgIcon-root": {
    fontSize: "1.7rem",
  },
  mb: 1.2,
};

export default function FacilityControl({
  labelSingular,
  labelPlural,
  onCreate,
  onSelectAll,
  onEditAll,
  onSetStatusAll,
  onDeleteAll,
}: FacilityControlProps) {
  return (
    <Box>
      {onCreate && (
        <Button
          variant="contained"
          onClick={onCreate}
          sx={{ ...buttonStyle, mb: 3 }}
        >
          <ControlPointOutlinedIcon />
          <span>New {labelSingular}</span>
        </Button>
      )}

      <Typography
        sx={{
          mb: 2,
          mt: 1.2,
          color: "var(--text-grey-dark)",
          fontSize: "0.8rem",
        }}
      >
        {labelPlural} Selected:
      </Typography>

      {onSelectAll && (
        <Button
          variant="contained"
          onClick={onSelectAll}
          sx={{ ...buttonStyle }}
        >
          <SelectAllTwoToneIcon />
          <span>Select All</span>
        </Button>
      )}

      {onEditAll && (
        <Button variant="contained" onClick={onEditAll} sx={{ ...buttonStyle }}>
          <EditOutlinedIcon />
          <span>Edit {labelPlural}</span>
        </Button>
      )}
    </Box>
  );
}
