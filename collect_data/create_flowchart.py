from openai import OpenAI
from dotenv import load_dotenv
import os
import json

load_dotenv("openai.env")

key = os.environ.get("ORG")
print(key)

client = OpenAI(
#   organization=key,
  api_key=os.environ.get("OPENAI")
)

# Organized_FAQs.jsonを読み込む
with open("./Organized_FAQs_id.json", "r", encoding="utf-8") as f:
    data = json.load(f)

# 結果を保存するリスト
results = []
a=0
for d in data:
    contnet = d["content"]


    completion = client.chat.completions.create(
        model="gpt-4-turbo-preview",
        response_format={ "type": "json_object" },
    messages=[
        {"role": "system", "content": "あなたはreactflowでレンダリングするためのjsonの配列のみを返すbotです"},
        {"role": "user", "content": f"{contnet} このコンテンツからreactflowのための配列のjsonを1つ作成してください。内容はできるだけ人間がこの文章をフローチャートとして理解しやすいように工夫してください。"},
    ]
    )

    content =  completion.choices[0].message.content

    try:
        # contentをjsonに変換
        content = json.loads(content)
        # jsonのelementsを取得
        elements = content["elements"]
        results.append({
            "content": d["content"],
            "flowchart": elements,
            "link": d["link"],
            "questions": d["questions"],
            "id": d["id"]
        })
    except:
        try:
            # jsonのelementsを取得
            elements = content["nodes"]
            results.append({
                "content": d["content"],
                "flowchart": elements,
                "link": d["link"],
                "questions": d["questions"],
                "id": d["id"]
                })
        except:
            print(content)
            results.append({
                "content": d["content"],
                "flowchart": content,
                "link": d["link"],
                "questions": d["questions"],
                "id": d["id"]
            })
            print("miss")
        



    print(a)
    a+=1




    if len(results) >= 10:
        # resultsを保存(ファイルがなかったら作成)
        with open("flowcharts.json", "w") as f:
            json.dump(results, f, indent=4, ensure_ascii=False)
            break



