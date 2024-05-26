/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u10eeatbp1z3dvd")

  // remove
  collection.schema.removeField("cqxrqgzt")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "pargigv5",
    "name": "participants",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "g47iznhrqkyxtn4",
      "cascadeDelete": false,
      "minSelect": 1,
      "maxSelect": 2,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u10eeatbp1z3dvd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "cqxrqgzt",
    "name": "participants",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "5kme5fjlxcll04k",
      "cascadeDelete": false,
      "minSelect": 1,
      "maxSelect": 2,
      "displayFields": null
    }
  }))

  // remove
  collection.schema.removeField("pargigv5")

  return dao.saveCollection(collection)
})
