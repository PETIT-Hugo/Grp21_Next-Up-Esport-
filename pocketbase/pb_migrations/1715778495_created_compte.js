/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const collection = new Collection({
    "id": "oev0nyhgls1gieh",
    "created": "2024-05-15 13:08:15.734Z",
    "updated": "2024-05-15 13:08:15.734Z",
    "name": "compte",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "sgowcfas",
        "name": "id_compte",
        "type": "text",
        "required": false,
        "presentable": false,
        "unique": false,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
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
  const collection = dao.findCollectionByNameOrId("oev0nyhgls1gieh");

  return dao.deleteCollection(collection);
})
