'use server'

import { eq, not } from 'drizzle-orm'
import { revalidatePath } from 'next/cache'
import { db } from '@/db/index'
import { items } from '@/db/schema'

export const getItems = async () => {
    return await db.select().from(items)
}

export const addItem = async (name: string, quantity: number, unit: string, toBuy: boolean, quantityToBuy: number) => {
    await db.insert(items).values({ name, quantity, unit, toBuy: quantityToBuy === 0 })
    revalidatePath('/')
}

export const editItem = async (id: number, name: string, quantity: number, unit: string, toBuy: boolean, quantityToBuy: number) => {
    await db.update(items)
    .set({ name, quantity, unit, toBuy: quantityToBuy === 0 })
    .where(eq(items.id, id))
    revalidatePath('/')
}

export const deleteItem = async (id: number) => {
    await db.delete(items)
    .where(eq(items.id, id))
    revalidatePath('/')
}

export const toggleBuy = async (id: number) => {
    await db.update(items)
    .set({ toBuy: not(items.toBuy) })
    .where(eq(items.id, id))
    revalidatePath('/')
}