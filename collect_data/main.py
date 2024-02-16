from fetch_content import fetch_container_content
from convert_html_to_md import convert_html_to_md
def main(args=None):
    """
    メインの処理を行う関数
    """
    url = "https://helpfeel.com/raksul/キャンセル方法を知りたい-60f5514ceffc3b001cad93f6"
    html_content = fetch_container_content(url)
    markdown_content = convert_html_to_md(html_content)
    print(markdown_content)

if __name__ == "__main__":
    main()
