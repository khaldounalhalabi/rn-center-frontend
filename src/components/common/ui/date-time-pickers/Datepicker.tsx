"use client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import "dayjs/locale/ar";
import "dayjs/locale/en";
import { useLocale } from "next-intl";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { Label } from "../labels-and-values/Label";

const Datepicker = ({
  onChange,
  defaultValue,
  label,
  col = true,
  shouldDisableDate,
}: {
  onChange?: (v: Dayjs | null) => void;
  defaultValue?: string | Dayjs;
  label?: string;
  col?: boolean;
  shouldDisableDate?: (date: Dayjs) => boolean;
}) => {
  const { theme: nextTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    setMounted(true);
  }, []);

  // Set dayjs locale based on current locale
  useEffect(() => {
    dayjs.locale(locale);
  }, [locale]);

  // Create Material UI theme that matches shadcn theme
  const muiTheme = createTheme({
    direction: locale === "ar" ? "rtl" : "ltr",
    palette: {
      mode: nextTheme === "dark" ? "dark" : "light",
      primary: {
        main: "hsl(var(--primary))",
      },
      background: {
        default: "hsl(var(--background))",
        paper: "hsl(var(--card))",
      },
      text: {
        primary: "hsl(var(--foreground))",
        secondary: "hsl(var(--muted-foreground))",
      },
      divider: "hsl(var(--border))",
    },
    components: {
      MuiTextField: {
        styleOverrides: {
          root: {
            "& .MuiOutlinedInput-root": {
              backgroundColor: "hsl(var(--background))",
              color: "hsl(var(--foreground))",
              padding: "0px",
              "& fieldset": {
                borderColor: "hsl(var(--primary))",
              },
            },
            "& .MuiInputLabel-root": {
              color: "hsl(var(--muted-foreground))",
              "&.Mui-focused": {
                color: "hsl(var(--primary))",
              },
            },
          },
        },
      },
    },
  });

  if (!mounted) {
    return (
      <Label col={col} label={label}>
        <div className="w-full h-10 bg-muted animate-pulse rounded-md" />
      </Label>
    );
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale={locale}>
        <Label col={col} label={label}>
          <DatePicker
            defaultValue={dayjs(defaultValue, "YYYY-MM-DD")}
            onChange={(newValue) => {
              if (onChange) {
                onChange(newValue);
              }
            }}
            shouldDisableDate={shouldDisableDate}
            slotProps={{
              textField: {
                fullWidth: true,
                variant: "outlined" as const,
                placeholder: "Pick a date",
                size: "small",
                InputProps: {
                  className: "border border-input !text-primary",
                },
                sx: {
                  "& ,.MuiPickersSectionList-root": {
                    paddingTop: "0.35rem",
                    paddingBottom: "0.35rem",
                    justifyContent: locale == "ar" ? "end" : "start",
                  },
                  "& .MuiOutlinedInput-root": {
                    borderRadius: "calc(var(--radius) - 2px)",
                    fontSize: "0.875rem",
                    lineHeight: "1.25rem",
                    "& fieldset": {
                      borderWidth: "1px",
                    },
                  },
                  "& .MuiInputAdornment-root .MuiSvgIcon-root": {
                    color: "hsl(var(--primary))",
                  },
                  "& .MuiPickersInputBase-root": {
                    borderColor: "hsl(var(--border))",
                    outlineColor: "hsl(var(--border))",
                  },
                },
              },
              popper: {
                container: () => document.body,
                sx: {
                  zIndex: 9999,
                  "& .MuiPaper-root": {
                    "& *": {
                      pointerEvents: "auto !important",
                    },
                    "& .MuiSvgIcon-root": {
                      color: "hsl(var(--primary))",
                    },
                    "& .MuiPickersDay-root.Mui-selected": {
                      backgroundColor: "hsl(var(--primary)) !important",
                      color: "hsl(var(--primary-foreground)) !important",
                      "&:hover": {
                        backgroundColor: "hsl(var(--primary)) !important",
                      },
                    },
                    "& .MuiPickersDay-root.MuiPickersDay-today": {
                      borderColor: "hsl(var(--primary))",
                    },
                    "& .MuiPickersSectionList-root": {
                      overflowY: "auto !important",
                      "&::-webkit-scrollbar": {
                        width: "8px",
                      },
                      "&::-webkit-scrollbar-track": {
                        background: "hsl(var(--muted))",
                        borderRadius: "4px",
                      },
                      "&::-webkit-scrollbar-thumb": {
                        background: "hsl(var(--muted-foreground))",
                        borderRadius: "4px",
                        "&:hover": {
                          background: "hsl(var(--foreground))",
                        },
                      },
                    },
                  },
                },
              },
            }}
          />
        </Label>
      </LocalizationProvider>
    </ThemeProvider>
  );
};

export default Datepicker;
