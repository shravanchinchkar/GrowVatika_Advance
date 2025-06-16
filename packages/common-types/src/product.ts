import zod from "zod";

export const ProductSchema=zod.object({
    name:zod.string(),
    price:zod.string(),
    compareAt:zod.string(),
    description:zod.string(),
})

export type TProductSchema=zod.infer<typeof ProductSchema>