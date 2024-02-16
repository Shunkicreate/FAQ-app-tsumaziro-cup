import json

def organize_faqs(json_file_path, output_file_path):
    # JSONファイルからデータを読み込む
    with open(json_file_path, "r", encoding="utf-8") as file:
        faqs = json.load(file)
    
    organized_faqs = {}
    # 各FAQをループして、linkをキーとして質問を集約する
    for faq in faqs:
        link = faq["link"]
        question = faq["question"]
        if link in organized_faqs:
            # 既に同じリンクが存在する場合は質問を追加
            organized_faqs[link]["questions"].append(question)
        else:
            # 新しいリンクの場合は新しいエントリを作成
            organized_faqs[link] = {
                "link": link,
                "questions": [question]
            }
    
    # 辞書からリストに変換
    organized_faqs_list = list(organized_faqs.values())
    
    # 整理されたデータを新しいJSONファイルに書き出す
    with open(output_file_path, "w", encoding="utf-8") as file:
        json.dump(organized_faqs_list, file, ensure_ascii=False, indent=4)

# 使用例
json_file_path = "collect_data/FAQs.json"  # 元のJSONファイルのパス
output_file_path = "collect_data/Organized_FAQs.json"  # 整理されたデータを保存するファイルのパス
organize_faqs(json_file_path, output_file_path)

print("FAQs have been organized and saved to Organized_FAQs.json successfully.")
