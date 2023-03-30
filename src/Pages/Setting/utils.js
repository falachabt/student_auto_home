import {
    DarkMode,
    ColorLens,
    Language,
    Email,
    PushPin,
    LocationCity,
  } from "@mui/icons-material";

export const settingsTable = [
    {
      id: "darkMode",
      label: "Mode sombre",
      defaultValue: false,
      icon: <DarkMode />,
      type: "switch",
    },
    {
      id: "color",
      label: "Couleur",
      defaultValue: "#1976d2",
      icon: <ColorLens />,
      type: "color",
    },
    {
      id: "language",
      label: "Langue",
      defaultValue: "en",
      icon: <Language />,
      type: "select",
      options: [
        { value: "en", label: "En" },
        { value: "fr", label: "Fr" },
      ],
    },
    {
      id: "emailNotifications",
      label: "Notifications par email",
      defaultValue: false,
      icon: <Email />,
      type: "switch",
    },
    {
      id: "publicProfile",
      label: "Notifications push",
      defaultValue: true,
      icon: <PushPin />,
      type: "switch",
    },
    {
      id: "location",
      label: "Autoriser la localisation",
      defaultValue: true,
      icon: <LocationCity />,
      type: "switch",
    },
  ];



  export const InitialState = {
    darkMode: true,
    color: "#1a73e8",
    language: "fr",
    emailNotifications: true,
    pushNotifications: false,
    publicProfile: false,
    location: true,
  };
