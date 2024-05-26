/// <reference path="../pb_data/types.d.ts" />
migrate((db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u10eeatbp1z3dvd")

  // add
  collection.schema.addField(new SchemaField({
    "system": false,
    "id": "795y5oqv",
    "name": "id_tournoi",
    "type": "relation",
    "required": false,
    "presentable": false,
    "unique": false,
    "options": {
      "collectionId": "b4513z4i89t41hs",
      "cascadeDelete": false,
      "minSelect": null,
      "maxSelect": 1,
      "displayFields": null
    }
  }))

  return dao.saveCollection(collection)
}, (db) => {
  const dao = new Dao(db)
  const collection = dao.findCollectionByNameOrId("u10eeatbp1z3dvd")

  // remove
  collection.schema.removeField("795y5oqv")

  return dao.saveCollection(collection)
})
