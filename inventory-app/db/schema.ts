import { pgTable, serial, text, integer, boolean } from 'drizzle-orm/pg-core'

  export const items = pgTable('items', {
    id:       serial('id').primaryKey(),
    name:     text('name').notNull(),
    quantity: integer('quantity').notNull().default(0),
    unit:     text('unit').notNull(),
    toBuy:    boolean('to_buy').notNull().default(false),
    quantityToBuy: integer("quantity_to_buy").notNull().default(0),
  })