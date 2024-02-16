import html2text
def convert_html_to_md(html_content):
    """
    HTMLコンテンツをMarkdown形式に変換する関数
    """
    h = html2text.HTML2Text()
    h.ignore_links = False
    return h.handle(html_content)

