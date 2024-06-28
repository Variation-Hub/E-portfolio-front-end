import { Dialog, Tooltip, Typography } from "@mui/material";
import Style from "./style.module.css";
import { useThemeMediaQuery } from "@fuse/hooks";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from "clsx";
import { useState } from "react";
import UserDetails from "src/app/main/admin/userManagement/usetDetails";
import UploadWorkDialog from "./uploadWorkDialog";
import UploadedEvidenceFile from "./uploadedEvidenceFile";
import Uploading from "src/app/component/Cards/uploading";
import { useNavigate } from "react-router-dom";

export const Card = (props) => {
  const {
    isIcon,
    name,
    title,
    color,
    background = "var(--pc1)",
    textColor = "black",
    radiusColor = "white",
  } = props;
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <div className={Style.home_card} style={{ backgroundColor: background }}>
      {isIcon ? (
        <div
          className="rounded-full p-12"
          style={{
            backgroundColor: radiusColor,
            color: textColor,
          }}
        >
          {name}
        </div>
      ) : (
        <Typography
          color={`text.${color}`}
          variant="h6"
          className="rounded-full px-12 py-8 "
          style={{
            backgroundColor: radiusColor,
            color: textColor,
          }}
        >
          {name}
        </Typography>
      )}
      <Tooltip title={title} arrow>
        <Typography>
          {title.length > 20 && !isMobile ? `${title.slice(0, 17)}...` : title}
        </Typography>
      </Tooltip>
    </div>
  );
};

export const PortfolioCard = (props) => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const { id = 0, name = "No title", color = "#FCA14E" } = props?.data;
  const handleClick = () => {
    if (name === "Upload Work") {
      setOpen(true);
    } else if (name === "Unit Progress") {
      console.warn("Unit Progress clicked");
    } else if (name === "Resources") {
      navigate('/resources-card');
    }
  };
  const handleClose = () => {
    setOpen(false);;
  };

  return (
    <>
      <div
        className={Style.cardContain}
        style={{ background: color }}
        onClick={() => {
          handleClick();
        }}
      >
        <div>
          <div className={Style.index}>{id}</div>
          <div className={Style.emptyRing}></div>
          <div className={Style.filledRing}></div>
        </div>
        <div className={Style.title}>{name}</div>
      </div>
      <Dialog
        open={open}
        onClose={handleClose}
        sx={{
          ".MuiDialog-paper": {
            borderRadius: "4px",
            padding: "1rem",
          },
        }}
      >
        <UploadWorkDialog dialogFn={{ handleClose }} />
      </Dialog>
    </>
  );
};
