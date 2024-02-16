import requests
from bs4 import BeautifulSoup
def fetch_container_content(url):
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
    try:
        response = requests.get(url, headers=headers)
        response.raise_for_status()  # HTTPエラーがあれば例外を発生させる
        soup = BeautifulSoup(response.text, 'html.parser')
        container = soup.find(class_='container')  # containerクラスの内容を取得
        return str(container) if container else "Container class not found."
    except requests.RequestException as e:
        return f"Error fetching the URL: {e}"