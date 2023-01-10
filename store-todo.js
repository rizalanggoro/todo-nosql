document.addEventListener("alpine:init", () => {
  Alpine.store("todo", {
    baseUrl: "https://database.deta.sh/v1/c0rwah36/test",
    headers: {
      "X-API-Key": "c0rwah36_Ec3ThvFW3amhd5PB88QGj115B4DRnTLd",
      "Content-Type": "application/json",
    },
    state: "initial",
    listTodo: [],

    async fetchData() {
      this.listTodo = [];

      let userid = Alpine.store("userid").userid;
      let query = {
        query: [{ userid, type: "todo" }],
      };
      let queryStr = JSON.stringify(query);

      let response = await fetch(`${this.baseUrl}/query`, {
        headers: this.headers,
        method: "POST",
        body: queryStr,
      });

      let jsonResponse = await response.json();
      let items = jsonResponse.items;
      this.listTodo = items;
    },

    async delete(key, index) {
      let response = await fetch(`${this.baseUrl}/items/${key}`, {
        headers: this.headers,
        method: "DELETE",
      });
      let responseJson = await response.json();

      await this.fetchData();
    },

    async changeStatus(key, index, value) {
      let body = {
        set: {
          "data.done": value,
        },
      };
      let bodyStr = JSON.stringify(body);

      let response = await fetch(`${this.baseUrl}/items/${key}`, {
        headers: this.headers,
        method: "PATCH",
        body: bodyStr,
      });
      let responseJson = await response.json();

      this.listTodo[index].data.done = value;
    },

    async createTodo(userid, title, description) {
      this.state = "loading";

      let body = {
        item: {
          userid,
          type: "todo",
          data: {
            title,
            description,
            done: false,
            date: Date().toString(),
          },
        },
      };
      let bodyStr = JSON.stringify(body);

      let response = await fetch(`${this.baseUrl}/items`, {
        method: "POST",
        headers: this.headers,
        body: bodyStr,
      });

      let jsonResponse = await response.json();

      Alpine.store("appdata").showForm = false;
      Alpine.store("appdata").titleModel = "";
      Alpine.store("appdata").descModel = "";

      this.state = "initial";

      await this.fetchData();
    },
  });
});
