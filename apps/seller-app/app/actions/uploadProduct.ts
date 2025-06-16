"use server";
import { ApiResponseType } from "@repo/common-types/types";
import { ProductSchema, TProductSchema } from "@repo/common-types/types";
import { getServerSession } from "next-auth";
import { NEXT_AUTH } from "../lib/auth";
import client from "@repo/db/client";
import zod from "zod"

export default async function saveProduct(data: TProductSchema): Promise<ApiResponseType> {
  const session = await getServerSession(NEXT_AUTH);
  

  if (!session.user) {
    return { success: false, error: "Invalid Seller" };
  }
  try {
    const sellerId = await client.seller.findFirst({
      where: {
        email: session.user.email,
      },
      select: {
        id: true,
      },
    });
    if(!sellerId){
        return{success:false,error:"No seller found"}
    }
    const parsedProduct =ProductSchema.safeParse(data);
    if(!parsedProduct.success){
        return{success:false,message:"Invalid Product Data"}
    }
    await client.product.create({
        data:{
            sellerId:sellerId.id,
            name:parsedProduct.data.name,
            price:parsedProduct.data.price,
            compareAt:parsedProduct.data.compareAt,
            description:parsedProduct.data.description,
            imageURL:"https://images.unsplash.com/photo-1463320898484-cdee8141c787?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        }
    })
    return { success: true };
  } catch (error) {
    console.log("Error While uploading Product:", error);
    return {success:false}
  }
}
