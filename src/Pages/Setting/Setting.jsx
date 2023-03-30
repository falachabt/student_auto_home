import React, { Component } from "react";
import { Typography, Switch, Button } from "@mui/material";
import { UseContext } from "../../Contexts/ContextProvider";
import "./setting.css";
import { InitialState, settingsTable } from "./utils";

class SettingsPage extends Component {
  static contextType = UseContext;

  state = {
    settings: InitialState,
  };

  componentDidMount() {
    const { themeMode } = this.context;
    this.setState({
      ...this.state,
      settings: { ...this.state.settings, darkMode: themeMode === "Dark" },
    });
  }

  handleChange = (event) => {
    const { setThemeMode, handleChangeSettings } = this.context;

    switch (event.target.type) {
      case "select-one":
        break;

      case "color":
        this.setState((prevState) => ({
          settings: {
            ...prevState.settings,
            [event.target.name]: event.target.value,
          },
        }));
        break;

      default:
        if (event.target.name === "darkMode") {
          setThemeMode(event.target.checked === true ? "Dark" : "Light");
        }
        this.setState((prevState) => ({
          settings: {
            ...prevState.settings,
            [event.target.name]: event.target.checked,
          },
        }));
        break;
    }

    handleChangeSettings(this.state.settings);
  };

  handleReset = () => {
    this.setState({
      settings: InitialState,
    });
  };

  render() {
    return (
      <div className="sm:max-w-[300px] h-full flex flex-col gap-3 sm:border-r border-gray-300 p-3 dark:text-gray-300 text-gray-700">
        <Typography
          variant="h5"
          className={
            "text-xl font-semibold tracking-wide dark:text-gray-200 text-gray-800"
          }
        >
          Preferences
        </Typography>

        <div>
          {settingsTable.map((setting) => {
            return (
              <div key={setting.id} className="flex items-center">
                <span className="setting_text">
                  {setting.icon}
                  {setting.label}
                </span>
                <div className="setting_comp">
                  {setting.type === "switch" ? (
                    <Switch
                      name={setting.id}
                      checked={
                        this.state.settings[setting.id] ?? setting.defaultValue
                      }
                      onChange={this.handleChange}
                    />
                  ) : setting.type === "color" ? (
                    <input
                      id={"primary_color"}
                      name={setting.id}
                      type="color"
                      value={
                        this.state.settings[setting.id] ?? setting.defaultValue
                      }
                      onChange={this.handleChange}
                      className={" primary_color "}
                    />
                  ) : (
                    <select
                      id={setting.id}
                      name={setting.id}
                      value={
                        this.state.settings[setting.id] ?? setting.defaultValue
                      }
                      onChange={this.handleChange}
                      className="outline-none border-none p-1 rounded-sm dark:text-gray-300 dark:bg-secondary-dark-bg"
                    >
                      {setting.options.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        <Button variant="contained" onClick={this.handleReset}>
          Reset
        </Button>
      </div>
    );
  }
}

export default SettingsPage;
