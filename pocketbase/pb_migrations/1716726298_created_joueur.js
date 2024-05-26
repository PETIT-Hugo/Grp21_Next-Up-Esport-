/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "g47iznhrqkyxtn4",
    "created": "2024-05-26 12:24:58.931Z",
    "updated": "2024-05-26 12:24:58.931Z",
    "name": "joueur",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "3xpcvwv1",
        "name": "num_terrain",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "pduvjsp6",
        "name": "victoires",
        "type": "number",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "noDecimal": false
        }
      },
      {
        "system": false,
        "id": "6elquhvy",
        "name": "createur",
        "type": "bool",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {}
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
  const collection = dao.findCollectionByNameOrId("g47iznhrqkyxtn4");

  return dao.deleteCollection(collection);
})
