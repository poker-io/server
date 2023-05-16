import { type Client } from 'pg'
import type { PlayersTokens } from './types'

export const startingFundsDefault = 1000
export const smallBlindDefault = 100

export async function createPlayer(
  playerToken: string,
  nickname: string,
  gameId: string | null,
  client: Client
) {
  const query = `INSERT INTO Players(token, nickname, turn, 
            game_id, card1, card2, funds, bet) 
            VALUES($1, $2, $3, $4, $5, $6, $7, $8)`
  const values = [playerToken, nickname, 0, gameId, null, null, null, null]
  await client.query(query, values)
}

export async function isPlayerInGame(
  playerToken: string,
  client: Client
): Promise<boolean> {
  const query = 'SELECT * FROM Players WHERE token=$1'
  return (await client.query(query, [playerToken])).rowCount !== 0
}

export async function deletePlayer(playerToken: string, client: Client) {
  const query = 'DELETE FROM Players WHERE token=$1'
  await client.query(query, [playerToken])
}

export async function getPlayersInGameTokens(
  gameId: string,
  client: Client
): Promise<PlayersTokens> {
  const query = 'SELECT token FROM Players WHERE game_id=$1'
  return (await client.query(query, [gameId])).rows
}
