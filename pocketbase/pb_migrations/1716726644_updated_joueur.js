/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g47iznhrqkyxtn4")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "wlpyncsh",
    "name": "id_utilisateur",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "5kme5fjlxcll04k",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("g47iznhrqkyxtn4")

  // remove
  collection.schema.removeField("wlpyncsh")

  return dao.saveCollection(collection)
})
