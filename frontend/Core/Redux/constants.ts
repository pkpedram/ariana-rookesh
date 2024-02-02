export type ApiConfig = {
  domain: string;
  baseUrl: string;
};

export const apiConfig: ApiConfig = {
  domain:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/"
      : "https://arianaback.noavdev.ir/",
  baseUrl:
    process.env.NODE_ENV === "development"
      ? "http://localhost:5000/api/"
      : "https://arianaback.noavdev.ir/api/",
};
