/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("b4513z4i89t41hs")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "glqzueox",
    "name": "id_createur",
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
  const collection = dao.findCollectionByNameOrId("b4513z4i89t41hs")

  // remove
  collection.schema.removeField("glqzueox")

  return dao.saveCollection(collection)
})
