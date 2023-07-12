import * as React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { namesAndColors } from "../../../constants/main";

interface props {
  handleAlignment: any;
  value: any;
}

export default function ToggleButtons({ handleAlignment, value }: props) {
  return (
    <ToggleButtonGroup
      value={value}
      exclusive
      onChange={handleAlignment}
      aria-label="text alignment"
    >
      {namesAndColors.map((race: any, index: number) => (
        <ToggleButton key={index} value={race.index} aria-label="left aligned">
          {race.name}
        </ToggleButton>
      ))}
    </ToggleButtonGroup>
  );
}
