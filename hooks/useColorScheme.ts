import { ThemeContext } from "@/components/ThemeContext";
import { useContext } from "react";
import { useColorScheme as useSystemColorScheme } from "react-native";

export function useColorScheme() {
  const themeContext = useContext(ThemeContext);
  const systemColorScheme = useSystemColorScheme() ?? "light";
  return themeContext?.resolvedTheme ?? systemColorScheme;
}
