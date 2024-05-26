/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "u10eeatbp1z3dvd",
    "created": "2024-05-26 12:27:50.998Z",
    "updated": "2024-05-26 12:27:50.998Z",
    "name": "terrain",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "pzxot08r",
        "name": "id_match_riot",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ynbshoi2",
        "name": "numero",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      }
    ],
    "indexes": [],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("u10eeatbp1z3dvd");

  return dao.deleteCollection(collection);
})
