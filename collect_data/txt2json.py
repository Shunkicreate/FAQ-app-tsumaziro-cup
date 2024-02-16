import json

# FAQs.txtを読み込む
def read_faqs_from_txt(file_path):
    with open(file_path, "r", encoding="utf-8") as file:
        lines = file.readlines()
    
    faqs = []
    faq = {}
    for line in lines:
        if line.startswith("Question: "):
            if faq:  # 既にFAQがあればリストに追加
                faqs.append(faq)
                faq = {}  # 新しいFAQのために辞書をリセット
            faq['question'] = line[len("Question: "):].strip()
        elif line.startswith("Link: "):
            faq['link'] = line[len("Link: "):].strip()
    
    if faq:  # 最後のFAQをリストに追加
        faqs.append(faq)
    
    return faqs

# JSONデータとしてファイルに書き出す
def write_faqs_to_json(faqs, output_file_path):
    with open(output_file_path, "w", encoding="utf-8") as file:
        json.dump(faqs, file, ensure_ascii=False, indent=4)

# 使用例
faqs = read_faqs_from_txt("FAQs.txt")
write_faqs_to_json(faqs, "FAQs.json")

print("FAQs.txt has been converted to FAQs.json successfully.")
