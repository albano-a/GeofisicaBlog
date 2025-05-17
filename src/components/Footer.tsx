import React, { useState } from "react";
import {
  Box,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import LanguageIcon from "@mui/icons-material/Language";
import { useTranslation } from "react-i18next";
import { US } from "country-flag-icons/react/3x2";
import { BR } from "country-flag-icons/react/3x2";
import { FR } from "country-flag-icons/react/3x2";

const languages = [
  {
    code: "en",
    label: "English",
    icon: <US title="United States" className="m-1" />, // UK/US
  },
  {
    code: "pt",
    label: "Português",
    icon: <BR title="Brazil" className="m-1" />, // Portugal
  },
  {
    code: "fr",
    label: "Français",
    icon: <FR title="France" className="m-1" />, // France
  },
];

const Footer: React.FC = () => {
  const { i18n } = useTranslation();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLanguageChange = (code: string) => {
    i18n.changeLanguage(code);
    handleMenuClose();
  };

  return (
    <Box
      component="footer"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        p: 2,
        bgcolor: "background.paper",
        borderTop: 1,
        borderColor: "divider",
      }}
    >
      <Typography variant="h6" sx={{ fontWeight: "bold" }}>
        GeofisicaBlog
      </Typography>
      <Box>
        <IconButton aria-label="Select language" onClick={handleMenuOpen}>
          <LanguageIcon />
        </IconButton>
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          {languages.map((lang) => (
            <MenuItem
              key={lang.code}
              selected={i18n.language === lang.code}
              onClick={() => handleLanguageChange(lang.code)}
            >
              <ListItemIcon>{lang.icon}</ListItemIcon>
              <ListItemText>{lang.label}</ListItemText>
            </MenuItem>
          ))}
        </Menu>
      </Box>
    </Box>
  );
};

export default Footer;
