document.addEventListener("alpine:init", () => {
  Alpine.store("appdata", {
    showForm: false,
    titleModel: "",
    descModel: "",
  });
});
