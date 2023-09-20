import React from "react";

import { Switch } from "@nextui-org/react";
import { MoonIcon, SunIcon } from "lucide-react";
import { useTheme } from "next-themes";

export default function ModeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Switch
      defaultSelected
      className="flex-row-reverse justify-between gap-12 w-full"
      size="sm"
      color="secondary"
      thumbIcon={({ isSelected, className }) =>
        theme === "light" ? (
          <SunIcon className={className} />
        ) : (
          <MoonIcon className={className} />
        )
      }
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      Apperance
    </Switch>
  );
}
