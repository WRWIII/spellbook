import { NextResponse } from 'next/server'

export async function GET(
  request: Request,
  { params }: { params: { index: string } }
) {
  const index = params.index

  try {
    const response = await fetch(`https://www.dnd5eapi.co/api/spells/${index}`)
    if (!response.ok) {
      throw new Error('Failed to fetch spell details')
    }
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch spell details' }, { status: 500 })
  }
}