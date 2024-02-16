import urllib.parse
from fetch_content import fetch_faq_list, fetch_container_content
import os

def main():
    print(os.getcwd())
    base_url = "https://helpfeel.com/raksul/?q="
    
    # Step 1: Read queries from query.txt and fetch FAQs
    with open("./collect_data/query.txt", "r", encoding="utf-8") as file:
        queries = file.readlines()
    
    with open("./collect_data/FAQs.txt", "w", encoding="utf-8") as faqs_file:
        for query in queries:
            query = query.strip()
            full_url = base_url + urllib.parse.quote(query)
            faq_list = fetch_faq_list(full_url)
            print(f"FAQs for {query}: {faq_list}")
            for faq in faq_list:
                faqs_file.write(f"Question: {faq['text']}\nLink: {faq['link']}\n\n")
    
    # Step 2: Fetch content for each link in FAQs.txt and append it
    # with open("./collect_data/FAQs.txt", "r+", encoding="utf-8") as faqs_file:
    #     content = faqs_file.read()
    #     links = [line.split("Link: ")[1].strip() for line in content.split("\n") if line.startswith("Link: ")]
        
    #     for link in links:
    #         container_content = fetch_container_content(link)
    #         faqs_file.write(f"Content for {link}:\n{container_content}\n\n")

if __name__ == "__main__":
    main()

