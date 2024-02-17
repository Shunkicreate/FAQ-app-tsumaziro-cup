import json

# Organized_FAQs.jsonを読み込む
with open("./Organized_FAQs.json", "r", encoding="utf-8") as f:
    data = json.load(f)

json_data = []
for i, d in enumerate(data):
    result = {
        "id": i,
        "content": d["content"],
        "link": d["link"],
        "questions": d["questions"], 
    }
    json_data.append(result)
json_output = json.dumps(json_data, ensure_ascii=False, indent=4)

json_output
# resultsを保存(ファイルがなかったら作成)
with open("Organized_FAQs_id.json", "w" ) as f:
    json.dump(json_data, f, indent=4,ensure_ascii=False)
    # json.dumps(json_data,f ,ensure_ascii=False, indent=4)