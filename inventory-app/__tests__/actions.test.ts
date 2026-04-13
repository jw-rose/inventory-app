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
    { id: 1, name: 'Eggs', quantity: 0, unit: 'box', toBuy: true, quantityToBuy: 6 },
    { id: 2, name: 'Pasta', quantity: 2, unit: 'pack', toBuy: false, quantityToBuy: 0 },
]

// ─── getItems ───────────────────────────────────────────────────────────────

describe('getItems', () => {
    beforeEach(() => vi.clearAllMocks())

    test('returns all items from the database', async () => {
        vi.mocked(db.select).mockReturnValue({
            from: vi.fn().mockResolvedValue(mockItems),
        } as any)

        const { getItems } = await import('@/lib/actions')
        const result = await getItems()

        expect(result).toEqual(mockItems)
        expect(result).toHaveLength(2)
    })

    test('returns an empty array when no items exist', async () => {
        vi.mocked(db.select).mockReturnValue({
            from: vi.fn().mockResolvedValue([]),
        } as any)

        const { getItems } = await import('@/lib/actions')
        const result = await getItems()

        expect(result).toEqual([])
    })
})

// ─── addItem ─────────────────────────────────────────────────────────────────

describe('addItem', () => {
    beforeEach(() => vi.clearAllMocks())

    const mockInsert = {
        values: vi.fn().mockResolvedValue(undefined),
    }

    test('sets toBuy to true when quantityToBuy is greater than 0', async () => {
        vi.mocked(db.insert).mockReturnValue(mockInsert as any)

        const { addItem } = await import('@/lib/actions')
        await addItem('Eggs', 0, 'box', true, 6)

        expect(mockInsert.values).toHaveBeenCalledWith({
            name: 'Eggs',
            quantity: 0,
            unit: 'box',
            toBuy: true,   // quantityToBuy 6 !== 0 → toBuy true
            quantityToBuy: 6,
        })
    })

    test('sets toBuy to false when quantityToBuy is 0', async () => {
        vi.mocked(db.insert).mockReturnValue(mockInsert as any)

        const { addItem } = await import('@/lib/actions')
        await addItem('Pasta', 2, 'pack', false, 0)

        expect(mockInsert.values).toHaveBeenCalledWith({
            name: 'Pasta',
            quantity: 2,
            unit: 'pack',
            toBuy: false,  // quantityToBuy 0 → toBuy false
            quantityToBuy: 0,
        })
    })

    test('calls revalidatePath after inserting', async () => {
        vi.mocked(db.insert).mockReturnValue(mockInsert as any)
        const { revalidatePath } = await import('next/cache')
        const { addItem } = await import('@/lib/actions')

        await addItem('Milk', 0, 'carton', true, 2)

        expect(revalidatePath).toHaveBeenCalledWith('/')
    })
})

// ─── editItem ────────────────────────────────────────────────────────────────

describe('editItem', () => {
    beforeEach(() => vi.clearAllMocks())

    const mockUpdate = {
        set: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue(undefined),
        }),
    }

    test('updates the item with new values', async () => {
        vi.mocked(db.update).mockReturnValue(mockUpdate as any)

        const { editItem } = await import('@/lib/actions')
        await editItem(1, 'Eggs', 0, 'box', true, 6)

        expect(mockUpdate.set).toHaveBeenCalledWith({
            name: 'Eggs',
            quantity: 0,
            unit: 'box',
            toBuy: true,   // quantityToBuy 6 !== 0 → toBuy true
            quantityToBuy: 6,
        })
    })

    test('sets toBuy to false when quantityToBuy is updated to 0', async () => {
        vi.mocked(db.update).mockReturnValue(mockUpdate as any)

        const { editItem } = await import('@/lib/actions')
        await editItem(1, 'Pasta', 2, 'pack', false, 0)

        expect(mockUpdate.set).toHaveBeenCalledWith(
            expect.objectContaining({ toBuy: false, quantityToBuy: 0 })
        )
    })

    test('calls revalidatePath after updating', async () => {
        vi.mocked(db.update).mockReturnValue(mockUpdate as any)
        const { revalidatePath } = await import('next/cache')
        const { editItem } = await import('@/lib/actions')

        await editItem(1, 'Eggs', 0, 'box', true, 6)

        expect(revalidatePath).toHaveBeenCalledWith('/')
    })
})



describe('deleteItem', () => {
    beforeEach(() => vi.clearAllMocks())

    const mockDelete = {
        where: vi.fn().mockResolvedValue(undefined),
    }

    test('deletes the item with the correct id', async () => {
        vi.mocked(db.delete).mockReturnValue(mockDelete as any)

        const { deleteItem } = await import('@/lib/actions')
        await deleteItem(1)

        expect(db.delete).toHaveBeenCalled()
        expect(mockDelete.where).toHaveBeenCalled()
    })

    test('calls revalidatePath after deleting', async () => {
        vi.mocked(db.delete).mockReturnValue(mockDelete as any)
        const { revalidatePath } = await import('next/cache')
        const { deleteItem } = await import('@/lib/actions')

        await deleteItem(1)

        expect(revalidatePath).toHaveBeenCalledWith('/')
    })
})


describe('toggleBuy', () => {
    beforeEach(() => vi.clearAllMocks())

    const mockUpdate = {
        set: vi.fn().mockReturnValue({
            where: vi.fn().mockResolvedValue(undefined),
        }),
    }

    test('calls update and where on the correct id', async () => {
        vi.mocked(db.update).mockReturnValue(mockUpdate as any)

        const { toggleBuy } = await import('@/lib/actions')
        await toggleBuy(1)

        expect(db.update).toHaveBeenCalled()
        expect(mockUpdate.set).toHaveBeenCalled()
        expect(mockUpdate.set().where).toHaveBeenCalled()
    })

    test('calls revalidatePath after toggling', async () => {
        vi.mocked(db.update).mockReturnValue(mockUpdate as any)
        const { revalidatePath } = await import('next/cache')
        const { toggleBuy } = await import('@/lib/actions')

        await toggleBuy(1)

        expect(revalidatePath).toHaveBeenCalledWith('/')
    })
})