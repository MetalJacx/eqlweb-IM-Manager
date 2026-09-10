(function () {
  var STORAGE_KEY = "eql_theme";

  function preferredTheme() {
    var stored = window.localStorage.getItem(STORAGE_KEY);
    if (stored) return stored;
    var preferredDark = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
    return preferredDark ? "dark" : "light";
  }

  function applyTheme(themeName, toggleBtn) {
    var theme = themeName === "light" ? "light" : "dark";
    document.body.setAttribute("data-theme", theme);
    window.localStorage.setItem(STORAGE_KEY, theme);
    if (toggleBtn) toggleBtn.textContent = theme === "dark" ? "Switch to Light" : "Switch to Dark";
    return theme;
  }

  function initThemeToggle(toggleBtn, onApply) {
    function set(themeName) {
      var theme = applyTheme(themeName, toggleBtn);
      if (onApply) onApply(theme);
    }
    set(preferredTheme());
    toggleBtn.addEventListener("click", function () {
      var current = document.body.getAttribute("data-theme") || "dark";
      set(current === "dark" ? "light" : "dark");
    });
  }

  window.EQLTheme = { preferredTheme: preferredTheme, applyTheme: applyTheme, initThemeToggle: initThemeToggle };
})();
