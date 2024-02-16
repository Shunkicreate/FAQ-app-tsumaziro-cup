import html2text
import json
def convert_html_to_md(html_content):
    """
    HTMLコンテンツをMarkdown形式に変換する関数
    """
    h = html2text.HTML2Text()
    h.ignore_links = False
    return h.handle(html_content)


def update_contents_with_md(json_file_path, output_file_path=None):
    """
    JSONファイル内のすべてのcontentフィールドをMarkdownに変換して更新する
    """
    # 出力ファイルパスが指定されていない場合、元のファイルを上書き
    if output_file_path is None:
        output_file_path = json_file_path
    
    # JSONファイルを読み込む
    with open(json_file_path, "r", encoding="utf-8") as file:
        faqs = json.load(file)
    
    # 各FAQのcontentをMarkdownに変換
    for faq in faqs:
        if "content" in faq:
            faq["content"] = convert_html_to_md(faq["content"])
    
    # 更新されたデータをJSONファイルに書き出す
    with open(output_file_path, "w", encoding="utf-8") as file:
        json.dump(faqs, file, ensure_ascii=False, indent=4)

# 使用例
json_file_path = "collect_data/Organized_FAQs.json"  # 元のJSONファイルのパス
update_contents_with_md(json_file_path)

print("Content fields have been updated to Markdown successfully.")