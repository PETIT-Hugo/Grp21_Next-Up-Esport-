/**
* This file was @generated using pocketbase-typegen
*/

import type PocketBase from 'pocketbase'
import type { RecordService } from 'pocketbase'

export enum Collections {
	Cosmetique = "cosmetique",
	Joueur = "joueur",
	Terrain = "terrain",
	Tournoi = "tournoi",
	Users = "users",
	Utilisateur = "utilisateur",
}

// Alias types for improved usability
export type IsoDateString = string
export type RecordIdString = string
export type HTMLString = string

// System fields
export type BaseSystemFields<T = never> = {
	id: RecordIdString
	created: IsoDateString
	updated: IsoDateString
	collectionId: string
	collectionName: Collections
	expand?: T
}

export type AuthSystemFields<T = never> = {
	email: string
	emailVisibility: boolean
	username: string
	verified: boolean
} & BaseSystemFields<T>

// Record types for each collection

export enum CosmetiqueTypeOptions {
	"banniere" = "banniere",
	"pp" = "pp",
	"certif" = "certif",
}
export type CosmetiqueRecord = {
	description?: string
	image?: string
	nom?: string
	prix?: number
	type?: CosmetiqueTypeOptions
}

export type JoueurRecord = {
	createur?: boolean
	id_utilisateur?: RecordIdString
	num_terrain?: number
	victoires?: number
}

export type TerrainRecord = {
	id_match_riot?: string
	id_tournoi?: RecordIdString
	numero?: number
	participants?: RecordIdString[]
}

export enum TournoiJeuOptions {
	"valorant" = "valorant",
	"lol" = "lol",
}

export enum TournoiTypeOptions {
	"public" = "public",
	"prive" = "prive",
}
export type TournoiRecord = {
	date?: IsoDateString
	description?: string
	id_createur?: RecordIdString
	jeu?: TournoiJeuOptions
	manche_actuelle?: number
	nb_joueurs?: number
	nb_manches?: number
	nom?: string
	officiel?: boolean
	type?: TournoiTypeOptions
}

export type UsersRecord = {
	avatar?: string
	name?: string
}

export type UtilisateurRecord = {
	banniere?: string
	casque?: string
	clavier?: string
	id_riot?: string
	mail?: string
	mdp?: string
	pp?: string
	pseudo?: string
	souris?: string
	upcoins?: number
	victoires?: number
}

// Response types include system fields and match responses from the PocketBase API
export type CosmetiqueResponse<Texpand = unknown> = Required<CosmetiqueRecord> & BaseSystemFields<Texpand>
export type JoueurResponse<Texpand = unknown> = Required<JoueurRecord> & BaseSystemFields<Texpand>
export type TerrainResponse<Texpand = unknown> = Required<TerrainRecord> & BaseSystemFields<Texpand>
export type TournoiResponse<Texpand = unknown> = Required<TournoiRecord> & BaseSystemFields<Texpand>
export type UsersResponse<Texpand = unknown> = Required<UsersRecord> & AuthSystemFields<Texpand>
export type UtilisateurResponse<Texpand = unknown> = Required<UtilisateurRecord> & BaseSystemFields<Texpand>

// Types containing all Records and Responses, useful for creating typing helper functions

export type CollectionRecords = {
	cosmetique: CosmetiqueRecord
	joueur: JoueurRecord
	terrain: TerrainRecord
	tournoi: TournoiRecord
	users: UsersRecord
	utilisateur: UtilisateurRecord
}

export type CollectionResponses = {
	cosmetique: CosmetiqueResponse
	joueur: JoueurResponse
	terrain: TerrainResponse
	tournoi: TournoiResponse
	users: UsersResponse
	utilisateur: UtilisateurResponse
}

// Type for usage with type asserted PocketBase instance
// https://github.com/pocketbase/js-sdk#specify-typescript-definitions

export type TypedPocketBase = PocketBase & {
	collection(idOrName: 'cosmetique'): RecordService<CosmetiqueResponse>
	collection(idOrName: 'joueur'): RecordService<JoueurResponse>
	collection(idOrName: 'terrain'): RecordService<TerrainResponse>
	collection(idOrName: 'tournoi'): RecordService<TournoiResponse>
	collection(idOrName: 'users'): RecordService<UsersResponse>
	collection(idOrName: 'utilisateur'): RecordService<UtilisateurResponse>
}
