import unittest
from fetch_content import fetch_faq_list  # fetch_content.pyからfetch_faq_list関数をインポート

class TestFetchFAQList(unittest.TestCase):
    def test_fetch_faq_list(self):
        url = "https://helpfeel.com/raksul/?q=%E6%94%AF%E6%89%95%E3%81%84%E6%96%B9%E6%B3%95"
        result = fetch_faq_list(url)
        
        # 結果がリストであることを確認
        self.assertIsInstance(result, list)
        
        # リストが空でないことを確認
        self.assertTrue(len(result) > 0)
        
        # 各アイテムが辞書であり、'text'と'link'キーを持っていることを確認
        for item in result:
            self.assertIsInstance(item, dict)
            self.assertIn('text', item)
            self.assertIn('link', item)

if __name__ == '__main__':
    unittest.main()