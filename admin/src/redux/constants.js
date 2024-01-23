export const serverUrl = "";
export const ApiConfig = {
  apiKey: "",
  authDomain: "",
  domain:
    process.env.NODE_ENV == "development"
      ? "http://arianaback.noavdev.ir/"
      : "https://configuratorapi.noav.dev/",
  baseUrl:
    process.env.NODE_ENV == "development"
      ? "http://arianaback.noavdev.ir/api"
      : "https://configuratorapi.noav.dev/api",
  authUrl: "",
};
