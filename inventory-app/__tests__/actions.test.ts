import { describe, test, expect, vi, beforeEach } from 'vitest'
import { db } from '@/db/index'

vi.mock('@/db/index', () => ({
    db: {
        select: vi.fn(),
        insert: vi.fn(),
        update: vi.fn(),
        delete: vi.fn(),
    },
}))

vi.mock('next/cache', () => ({
    revalidatePath: vi.fn(),
}))

const mockItems = [
    {id: 1, name: 'Eggs', quantity: 0, unit: 'box', toBuy: true, quantityToBuy: 0},
    {id: 2, name: 'Pasta', quantity: 2, unit: 'pack', toBuy: false, quantityToBuy: 1},
]

describe ('getItems', () => {
    beforeEach(() => vi.clearAllMocks())

    test('return all items from the database', async () => {
        vi.mocked(db.select).mockReturnValue({
            from: vi.fn().mockReturnValue(mockItems),
        } as any)

        const { getItems } = await import('@/lib/actions')
        const result = await getItems()

        expect(result)
    })
})