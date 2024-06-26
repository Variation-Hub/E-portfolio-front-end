import { Tooltip, Typography } from "@mui/material";
import Style from "./style.module.css";
import { useThemeMediaQuery } from "@fuse/hooks";
import FuseSvgIcon from "@fuse/core/FuseSvgIcon";
import clsx from 'clsx';

export const Card = (props) => {
  const { isIcon, name, title, color } = props;
  const isMobile = useThemeMediaQuery((theme) => theme.breakpoints.down("sm"));

  return (
    <div className={Style.home_card}>
      {isIcon ? (
        name
      ) : (
        <Typography color={`text.${color}`} variant="h6">
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

  const { id = 0, name = "No title", color = "#FCA14E" } = props?.data;

  return (
    <div className={Style.cardContain} style={{background:color}}>
      <div>
        <div className={Style.index}>{id}</div>
        <div className={Style.emptyRing}></div>
        <div className={Style.filledRing}></div>
      </div>
      <div className={Style.title}>{name}</div>
    </div>
  )
}