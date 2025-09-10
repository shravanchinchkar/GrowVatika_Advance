import client from "@repo/db/client";

export async function getUserByEmail(email: string) {
  const existingUser = await client.user.findUnique({
    where: {
      email,
    },
  });
  return existingUser;
}

export async function getFilterProducts(
  filterArray: string[],
  skip: number,
  limit: number
) {
  const filterProducts = await client.product.findMany({
    where: {
      productStatus: "Active",
      collection: {
        in: filterArray, // 'in' operator matches any of the values in the array
      },
    },
    select: {
      id: true,
      category: true,
      collection: true,
      name: true,
      tags: true,
      imageURL: true,
      productSizeVariant: {
        select: {
          size: true,
          price: true,
          compareAt: true,
          quantity: true,
        },
      },
    },
    skip: skip, // Skip records based on current page
    take: limit, // Limit the number of records returned
    orderBy: {
      id: "asc", // Optional: Add consistent ordering
    },
  });
  return filterProducts;
}

export async function getNurseriesData(skip: number, limit: number) {
  const nurseries = await client.seller.findMany({
    where: {
      isVerified: true,
      isAdminVerified: true,
      isSuspended: false,
    },
    select: {
      id: true,
      nurseryName: true,
      address: true,
      nurseryBio: true,
      specialities: true,
      location: true,
      business_hours: true,
      phoneNumber: true,
      profilePictureURL: true,
      products: {
        where: {
          productStatus: "Active",
          imageURL: {
            not: "",
          },
        },
        select: {
          imageURL: true,
        },
      },
    },
    skip: skip, // Skip records based on current page
    take: limit, // Limit the number of records returned
    orderBy: {
      id: "asc", // Optional: Add consistent ordering
    },
  });
  return nurseries;
}

export async function getProductDataByCategory(
  categoryParams: string | undefined,
  skip: number,
  limit: number
) {
  let whereClause;
  if (categoryParams !== "All") {
    whereClause = {
      productStatus: "Active",
      category: categoryParams,
      seller: {
        isAdminVerified: true,
        isSuspended: false,
        isRemoved: false,
      },
    };
  } else {
    whereClause = {
      productStatus: "Active",
      seller: {
        isAdminVerified: true,
        isSuspended: false,
        isRemoved: false,
      },
    };
  }
  const productsData = await client.product.findMany({
    where: whereClause,
    select: {
      id: true,
      category: true,
      collection: true,
      name: true,
      tags: true,
      imageURL: true,
      productSizeVariant: {
        select: {
          price: true,
          compareAt: true,
          size: true,
          quantity: true,
        },
      },
    },
    skip: skip, // Skip records based on current page
    take: limit, // Limit the number of records returned
    orderBy: {
      id: "asc", // Optional: Add consistent ordering
    },
  });
  const totalProductsCount = await client.product.count({
    where: whereClause,
  });
  return { productsData, totalProductsCount };
}

export async function getNurseriesCount() {
  const nurseryCount = await client.seller.count({});
  return nurseryCount;
}

export function getTotalPages(data: number, limit: number) {
  const totalPages = Math.ceil(data / Number(limit));
  return totalPages;
}

export async function getSingleProductData(productId: string) {
  const productData = await client.product.findUnique({
    where: {
      id: productId || "",
      seller: {
        isAdminVerified: true,
        isSuspended: false,
        isRemoved: false,
      },
    },
    include: {
      productSizeVariant: {
        select: {
          size: true,
          price: true,
          compareAt: true,
          quantity: true,
        },
      },
      seller: {
        select: {
          nurseryName: true,
          address: true,
          profilePictureURL: true,
        },
      },
    },
  });
  return productData;
}
