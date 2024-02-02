export const serverUrl = "";
export const ApiConfig = {
  apiKey: "",
  authDomain: "",
  domain:
    process.env.NODE_ENV === "production"
      ? "https://arianaback.noavdev.ir/"
      : "http://localhost:5000/",
  baseUrl:
    process.env.NODE_ENV === "production"
      ? "https://arianaback.noavdev.ir/api"
      : "http://localhost:5000/api",
  authUrl: "",
};
