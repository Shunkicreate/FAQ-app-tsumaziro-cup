import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


def fetch_container_content(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/88.0.4324.150 Safari/537.366'
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # HTTPエラーがあれば例外を発生させる
        soup = BeautifulSoup(response.text, 'html.parser')
        container = soup.find(class_='container')  # containerクラスの内容を取得
        print("success")
        return str(container) if container else "Container class not found."
    except requests.RequestException as e:
        print(f"Error fetching the URL: {e}")
        return f"Error fetching the URL: {e}"
    
def fetch_faq_list(url):
    def replace_url_prefix(text):
        # 置換前のプレフィックスと置換後のURL
        old_prefix = "./"
        new_prefix = "https://helpfeel.com/raksul/"
        
        # 文字列内の全てのold_prefixをnew_prefixに置換
        new_text = text.replace(old_prefix, new_prefix)
    
        return new_text
    options = webdriver.ChromeOptions()
    options.add_argument('user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3')

    # ChromeDriverManagerを使用して、自動的に適切なChromeDriverをダウンロード＆設定
    service = Service(ChromeDriverManager().install())
    driver = webdriver.Chrome(service=service, options=options)

    try:
        driver.get(url)
        time.sleep(5)  # 5秒待機
        html = driver.page_source
        soup = BeautifulSoup(html, 'html.parser')
        container = soup.find(class_='container')  # containerクラスの内容を取得
        faq_list = soup.find(class_='faq-list-scroll-container')  # faq-list-scroll-containerクラスの内容を取得
        if not faq_list:
            return "faq-list-scroll-container class not found."
        
        faqs = []
        for li in faq_list.find_all('li'):
            a_tag = li.find('a')
            if a_tag:
                faq_text = ' '.join(a_tag.stripped_strings)  # テキストを結合
                faq_related_link = a_tag.get('href', '')
                faq_link = replace_url_prefix(faq_related_link)
                faqs.append({'text': faq_text, 'link': faq_link})
        return faqs
    except requests.RequestException as e:
        return f"Error fetching the URL: {e}"
    finally:
        driver.quit()

fetch_container_content("https://helpfeel.com/raksul/%E5%8D%B0%E5%88%B7%E3%81%97%E3%81%9F%E3%81%84%E7%94%A8%E7%B4%99%E3%82%B5%E3%82%A4%E3%82%BA%E3%81%AF%E6%B1%BA%E3%81%BE%E3%81%A3%E3%81%A6%E3%81%84%E3%82%8B%E3%81%8C%E3%81%A9%E3%81%AE%E5%95%86%E5%93%81%E3%82%92%E9%81%B8%E3%81%B9%E3%81%B0%E3%82%88%E3%81%84%E3%81%8B%E3%82%8F%E3%81%8B%E3%82%89%E3%81%AA%E3%81%84-62625ced141b610023e2cf72")  