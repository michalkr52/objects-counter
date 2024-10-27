import { themeUrls } from "@/config";
import { defineStore } from "pinia";


// Stores data about user's settings and themes

const defaultState = {
    isDarkTheme: false,
    showBoxCertainty: false,
    showBoxLabel: false
}

export const useSettingsStateStore = defineStore("settingsState", {
    state: () => ({ ...defaultState }),
    actions: {
        reset() {
            Object.assign(this, defaultState);
        },

        setDarkTheme() {
            (document.getElementById("theme-link") as HTMLLinkElement).href = themeUrls.dark;
            document.documentElement.classList.add("dark");
            document.documentElement.classList.remove("light");
            this.isDarkTheme = true;
            localStorage.setItem("isDarkTheme", "true");
        },

        setLightTheme() {
            (document.getElementById("theme-link") as HTMLLinkElement).href = themeUrls.light;
            document.documentElement.classList.add("light");
            document.documentElement.classList.remove("dark");
            this.isDarkTheme = false;
            localStorage.setItem("isDarkTheme", "false");
        },

        updateBoxCertaintyVisibility(value: boolean) {
            this.showBoxCertainty = value;
            localStorage.setItem("showBoxCertainty", value.toString());
        },

        updateBoxLabelVisibility(value: boolean) {
            this.showBoxLabel = value;
            localStorage.setItem("showBoxLabel", value.toString());
        },

        setThemeToPreferred() {
            if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
                this.setDarkTheme();
            }
            else {
                this.setLightTheme();
            }
        },

        loadFromLocalStorage() {
            const isDarkTheme = localStorage.getItem("isDarkTheme");
            if (isDarkTheme === null) this.setThemeToPreferred();
            else if (isDarkTheme === "true") this.setDarkTheme();
            else this.setLightTheme();

            const showBoxCertainty = localStorage.getItem("showBoxCertainty");
            if (showBoxCertainty === null) this.updateBoxCertaintyVisibility(defaultState.showBoxCertainty);
            else if (showBoxCertainty === "true") this.showBoxCertainty = true;
            else this.showBoxCertainty = false;

            const showBoxLabel = localStorage.getItem("showBoxLabel");
            if (showBoxLabel === null) this.updateBoxLabelVisibility(defaultState.showBoxLabel);
            else if (showBoxLabel === "true") this.showBoxLabel = true;
            else this.showBoxLabel = false;
        }
    }
});
