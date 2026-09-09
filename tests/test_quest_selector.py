import unittest

from web_api.quest_selector import QUEST_CATALOG, build_lootfile_append, list_quests_payload


class TestQuestSelector(unittest.TestCase):
    def test_catalog_has_entries(self):
        self.assertGreaterEqual(len(QUEST_CATALOG), 1)

    def test_list_quests_payload_sorted_and_contains_required_fields(self):
        payload = list_quests_payload()
        self.assertTrue(payload)
        self.assertIn("quest_id", payload[0])
        self.assertIn("required_items", payload[0])

    def test_build_lootfile_append_contains_additem_lines(self):
        quest = QUEST_CATALOG["sky_bard_test"]
        lines = build_lootfile_append(quest, include_comments=True)
        self.assertTrue(lines[0].startswith("# Quest:"))
        self.assertTrue(any(line.startswith("additem ") for line in lines))


if __name__ == "__main__":
    unittest.main()
