import { createTheme } from "@mui/material";
import themeTypography from "./typography";

export const theme=(customization)=>{
   
    const themeOptions = {
        typography: themeTypography,
        customization
    };

    const themes = createTheme(themeOptions);
   

    return themes;
}