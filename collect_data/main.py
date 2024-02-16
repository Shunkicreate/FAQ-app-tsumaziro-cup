import urllib.parse
from fetch_content import fetch_faq_list, fetch_container_content
import os
import time
import json

def main():
    base_url = "https://helpfeel.com/raksul/?q="
    
    # Step 1: Read queries from query.txt and fetch FAQs
    # with open("./collect_data/query.txt", "r", encoding="utf-8") as file:
    #     queries = file.readlines()
    
    # with open("./collect_data/FAQs.txt", "w", encoding="utf-8") as faqs_file:
    #     for query in queries:
    #         query = query.strip()
    #         full_url = base_url + urllib.parse.quote(query)
    #         faq_list = fetch_faq_list(full_url)
    #         print(f"FAQs for {query}: {faq_list}")
    #         for faq in faq_list:
    #             faqs_file.write(f"Question: {faq['text']}\nLink: {faq['link']}\n\n")
    
    # Step 2: Fetch content for each link in FAQs.txt and append it
    # JSONファイルからFAQデータを読み込む
    with open("./collect_data/Organized_FAQs.json", "r", encoding="utf-8") as file:
        faqs = json.load(file)
    
    # 各FAQに対してコンテンツを取得し、データに追加
    for faq in faqs:
        link = faq["link"]
        time.sleep(1)  # 5秒待機
        content = fetch_container_content(link)
        print(f"Questions: {faq['questions']}")
        faq["content"] = content  # コンテンツをFAQデータに追加
    
    # 更新されたデータを新しいJSONファイルに書き出す
    with open("./collect_data/Organized_FAQs.json", "w", encoding="utf-8") as file:
        json.dump(faqs, file, ensure_ascii=False, indent=4)

if __name__ == "__main__":
    main()

