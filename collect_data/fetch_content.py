import requests
import time
from bs4 import BeautifulSoup
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.chrome.service import Service
from webdriver_manager.chrome import ChromeDriverManager


def fetch_container_content(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    try:
        response = requests.get(url)
        response.raise_for_status()  # HTTPエラーがあれば例外を発生させる
        soup = BeautifulSoup(response.text, 'html.parser')
        container = soup.find(class_='container')  # containerクラスの内容を取得
        return str(container) if container else "Container class not found."
    except requests.RequestException as e:
        return f"Error fetching the URL: {e}"
    
def fetch_faq_list(url):
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
                faq_link = a_tag.get('href', '')
                faqs.append({'text': faq_text, 'link': faq_link})
        return faqs
    except requests.RequestException as e:
        return f"Error fetching the URL: {e}"
    finally:
        driver.quit()
    
fetch_faq_list("https://helpfeel.com/raksul/?q=%E6%94%AF%E6%89%95%E3%81%84%E6%96%B9%E6%B3%95")