export const THEME_STORAGE_KEY = "theme";

/** Inlined in <head> so a stored choice applies before first paint (no flash). */
export const themeInitScript = `try{var t=localStorage.getItem("${THEME_STORAGE_KEY}");if(t==="light"||t==="dark")document.documentElement.dataset.theme=t}catch(e){}`;
