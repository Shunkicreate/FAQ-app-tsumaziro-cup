import {ApiResponseArray} from "../types";

export const azureAISearch = async (
  searchTerm: string,
): Promise<ApiResponseArray> => {
  const apiKey = import.meta.env.VITE_AZURE_SEARCH_API_KEY;
  const url = `https://faqsite2.search.windows.net/indexes/azureblob-index/docs?search=${searchTerm}&$count=true&api-version=2023-11-01`;
  // apikeyを環境変数から取得する

  const headers = {
    "Content-Type": "application/json",
    "api-key": apiKey,
  };
  // fetchを使ってheaderを付与してリクエストを送る
  const res = await fetch(url, {
    headers: headers,
    method: "GET",
  });
  const faqs = await res.json();
  // faqsのjsonの中からvalueの中身を取得する
  const value = faqs.value as ApiResponseArray;
  console.log(value);
  return value;
};
