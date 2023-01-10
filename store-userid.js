document.addEventListener("alpine:init", () => {
  Alpine.store("userid", {
    userid: "",

    saveUserid() {
      localStorage.setItem("userid", this.userid);
      console.log("saved");
    },
    getUserid() {
      this.userid = localStorage.getItem("userid");
      if (!this.userid) this.userid = "";

      // todo: fetch data
      if (this.userid) Alpine.store("todo").fetchData();
    },
  });

  Alpine.store("userid").getUserid();
});
