export const THEME_STORAGE_KEY = "theme";

/** Inlined in <head> so a stored dark choice applies before first paint. Light needs nothing. */
export const themeInitScript = `try{if(localStorage.getItem("${THEME_STORAGE_KEY}")==="dark")document.documentElement.dataset.theme="dark"}catch(e){}`;
