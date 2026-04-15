import { describe, test, expect, vi, beforeEach } from 'vitest'
import { render, screen, cleanup } from '@testing-library/react'
import { db } from '@/db/index'
import ShoppingItems from '@/components/InventoryItem'

vi.mock('@/db/index', () => ({
    db: {
        select: vi.fn(),
    },
}))

vi.mock('@/db/schema', () => ({
    items: {},
}))

const mockItems = [
    { id: 1, name: 'Eggs', quantity: 6, unit: 'box', toBuy: false, quantityToBuy: 0 },
    { id: 2, name: 'Milk', quantity: 0, unit: 'L', toBuy: true, quantityToBuy: 2 },
    { id: 3, name: 'Pasta', quantity: 0, unit: 'pack', toBuy: true, quantityToBuy: 3 },
]

function mockDbSelect() {
    vi.mocked(db.select).mockReturnValue({
        from: vi.fn().mockResolvedValue(mockItems),
    } as any)
}

describe('ShoppingItems', () => {
    beforeEach(() => {
        vi.clearAllMocks()
        cleanup()  // ← clears the DOM between every test
    })

    test('renders all items from the database', async () => {
        mockDbSelect()
        const component = await ShoppingItems()
        render(component)

        expect(screen.getByText('Eggs')).toBeDefined()
        expect(screen.getByText('Milk')).toBeDefined()
        expect(screen.getByText('Pasta')).toBeDefined()
    })

    test('renders the quantity for each item', async () => {
        mockDbSelect()
        const component = await ShoppingItems()
        render(component)

        // ← getAllByText instead of getByText — quantity 6 appears once but safer
        expect(screen.getAllByText('6')).toBeDefined()
    })

    test('renders the unit for each item', async () => {
        mockDbSelect()
        const component = await ShoppingItems()
        render(component)

        // ← getAllByText instead of getByText
        expect(screen.getAllByText('box')).toBeDefined()
        expect(screen.getAllByText('L')).toBeDefined()
        expect(screen.getAllByText('pack')).toBeDefined()
    })

    test('renders the correct number of items', async () => {
        mockDbSelect()
        const component = await ShoppingItems()
        render(component)

        const listItems = screen.getAllByRole('listitem')
        expect(listItems).toHaveLength(3)
    })

    test('renders empty list when no items exist', async () => {
        vi.mocked(db.select).mockReturnValue({
            from: vi.fn().mockResolvedValue([]),
        } as any)

        const component = await ShoppingItems()
        render(component)

        const listItems = screen.queryAllByRole('listitem')
        expect(listItems).toHaveLength(0)
    })
})