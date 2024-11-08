export async function addToCart (
    cartId,
    cartVersion,
    productId
  ) {
    try {
      const cartRawResponse = await fetch(
        `https://api.us-central1.gcp.commercetools.com/abhijeet/carts/${cartId}`,
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ia5wzZ12QX3B-q5WMqIs_RsV3wqxurUC'
          },
          body: JSON.stringify({
            version: cartVersion,
            actions: [
              {
                action: 'addLineItem',
                productId,
                variantId: 1,
                quantity: 1
              }
            ]
          })
        }
      )
      const cartData = await cartRawResponse.json()
      const cartResponse = {
        errorMessage: cartData?.message,
        id: cartData?.id,
        version: cartData?.version,
        customerGroupId: cartData?.customerGroup?.id,
        leaseMonth: cartData?.custom?.fields?.leaseMonth,
        lineItems: cartData?.lineItems?.map((lineItem) => {
          return {
            id: lineItem?.id,
            productId: lineItem?.productId,
            productKey: lineItem?.productKey,
            name: lineItem?.name['en-US'],
            variant: {
              sku: lineItem?.variant?.sku,
              prices: lineItem?.variant?.prices?.map((priceData) => {
                return {
                  id: priceData?.id,
                  value: {
                    centAmount: priceData?.value?.centAmount
                  },
                  customerGroup: {
                    id: priceData?.customerGroup?.id
                  }
                }
              }),
              images: lineItem?.variant?.images?.map((imageData) => {
                return {
                  url: imageData?.url,
                  label: imageData?.label
                }
              }),
              attributes: lineItem?.variant?.attributes?.map(
                (attributeData) => {
                  return {
                    name: attributeData?.name,
                    value: attributeData?.value
                  }
                }
              )
            },
            price: {
              value: {
                centAmount: lineItem?.price?.value?.centAmount
              }
            },
            quantity: lineItem?.quantity,
            totalPrice: {
              centAmount: lineItem?.totalPrice?.centAmount
            }
          }
        }),
        totalPrice: {
          centAmount: cartData?.totalPrice?.centAmount
        },
        totalLineItemQuantity: cartData?.totalLineItemQuantity,
        shippingAddress: {
          firstName: cartData?.shippingAddress?.firstName,
          lastName: cartData?.shippingAddress?.lastName,
          streetName: cartData?.shippingAddress?.streetName,
          additionalStreetInfo: cartData?.shippingAddress?.additionalStreetInfo,
          city: cartData?.shippingAddress?.city,
          state: cartData?.shippingAddress?.state,
          country: cartData?.shippingAddress?.country,
          postalCode: cartData?.shippingAddress?.postalCode,
          email: cartData?.shippingAddress?.email,
          key: cartData?.shippingAddress?.key
        },
        shippingMethodInfo: {
          shippingMethodName: cartData?.shippingInfo?.shippingMethodName,
          price: {
            currencyCode: cartData?.shippingInfo?.price?.currencyCode,
            centAmount: cartData?.shippingInfo?.price?.centAmount
          },
          shippingMethodId: cartData?.shippingInfo?.shippingMethod?.id
        },
        tax: cartData?.taxedPrice?.totalTax?.centAmount
      }
      return cartResponse
    } catch (e) {
      return { errorMessage: 'Unable to fetch data from server.' }
    }
  }

  export async function createCart () {
    try {
      const cartRawResponse = await fetch(
        'https://api.us-central1.gcp.commercetools.com/abhijeet/carts',
        {
          method: 'POST',
          headers: {
            Authorization: 'Bearer ia5wzZ12QX3B-q5WMqIs_RsV3wqxurUC'
          },
          body: JSON.stringify({
            currency:'INR'
           
          })
        }
      )
      const cartData = await cartRawResponse.json()
      const cartResponse = {
        errorMessage: cartData?.message,
        id: cartData?.id,
        version: cartData?.version,
        customerGroupId: cartData?.customerGroup?.id,
        leaseMonth: cartData?.custom?.fields?.leaseMonth,
        lineItems: cartData?.lineItems?.map((lineItem) => {
          return {
            id: lineItem?.id,
            productId: lineItem?.productId,
            productKey: lineItem?.productKey,
            name: lineItem?.name['en-US'],
            custom: {
              type: {
                typeId: lineItem?.custom?.type?.typeId,
                id: lineItem?.custom?.type?.id
              },
              fields: {
                addToRoom: lineItem?.custom?.fields?.addToRoom
              }
            },
            variant: {
              sku: lineItem?.variant?.sku,
              prices: lineItem?.variant?.prices?.map((priceData) => {
                return {
                  id: priceData?.id,
                  value: {
                    centAmount: priceData?.value?.centAmount
                  },
                  customerGroup: {
                    id: priceData?.customerGroup?.id
                  }
                }
              }),
              images: lineItem?.variant?.images?.map((imageData) => {
                return {
                  url: imageData?.url,
                  label: imageData?.label
                }
              }),
              attributes: lineItem?.variant?.attributes?.map(
                (attributeData) => {
                  return {
                    name: attributeData?.name,
                    value: attributeData?.value
                  }
                }
              )
            },
            price: {
              value: {
                centAmount: lineItem?.price?.value?.centAmount
              }
            },
            quantity: lineItem?.quantity,
            totalPrice: {
              centAmount: lineItem?.totalPrice?.centAmount
            }
          }
        }),
        discountCodes: cartData?.discountCodes?.map((disCode) => {
          return disCode?.discountCode?.id
        }),
        totalPrice: {
          centAmount: cartData?.totalPrice?.centAmount
        },
        totalLineItemQuantity: cartData?.totalLineItemQuantity,
        shippingAddress: {
          firstName: cartData?.shippingAddress?.firstName,
          lastName: cartData?.shippingAddress?.lastName,
          streetName: cartData?.shippingAddress?.streetName,
          additionalStreetInfo: cartData?.shippingAddress?.additionalStreetInfo,
          city: cartData?.shippingAddress?.city,
          state: cartData?.shippingAddress?.state,
          country: cartData?.shippingAddress?.country,
          postalCode: cartData?.shippingAddress?.postalCode,
          email: cartData?.shippingAddress?.email,
          key: cartData?.shippingAddress?.key
        },
        shippingMethodInfo: {
          shippingMethodName: cartData?.shippingInfo?.shippingMethodName,
          price: {
            currencyCode: cartData?.shippingInfo?.price?.currencyCode,
            centAmount: cartData?.shippingInfo?.price?.centAmount
          },
          shippingMethodId: cartData?.shippingInfo?.shippingMethod?.id
        },
        tax: cartData?.taxedPrice?.totalTax?.centAmount
      }
      return cartResponse
    } catch (e) {
      return { errorMessage: 'Unable to fetch data from server.' }
    }
  }

  export async function getCart (cartId) {
    try {
      const cartRawResponse = await fetch(
        `https://api.us-central1.gcp.commercetools.com/abhijeet/carts/${cartId}`,
        {
          headers: {
            Authorization: 'Bearer ia5wzZ12QX3B-q5WMqIs_RsV3wqxurUC'
          }
        }
      )
      const cartData = await cartRawResponse.json()
      const cartResponse = {
        errorMessage: cartData?.message,
        id: cartData?.id,
        version: cartData?.version,
        customerGroupId: cartData?.customerGroup?.id,
        leaseMonth: cartData?.custom?.fields?.leaseMonth,
        lineItems: cartData?.lineItems?.map((lineItem) => {
          return {
            id: lineItem?.id,
            productId: lineItem?.productId,
            productKey: lineItem?.productKey,
            name: lineItem?.name['en-US'],
            custom: {
              type: {
                typeId: lineItem?.custom?.type?.typeId,
                id: lineItem?.custom?.type?.id
              },
              fields: {
                addToRoom: lineItem?.custom?.fields?.addToRoom
              }
            },
            variant: {
              sku: lineItem?.variant?.sku,
              prices: lineItem?.variant?.prices?.map((priceData) => {
                return {
                  id: priceData?.id,
                  value: {
                    centAmount: priceData?.value?.centAmount
                  },
                  customerGroup: {
                    id: priceData?.customerGroup?.id
                  }
                }
              }),
              images: lineItem?.variant?.images?.map((imageData) => {
                return {
                  url: imageData?.url,
                  label: imageData?.label
                }
              }),
              attributes: lineItem?.variant?.attributes?.map(
                (attributeData) => {
                  return {
                    name: attributeData?.name,
                    value: attributeData?.value
                  }
                }
              )
            },
            price: {
              value: {
                centAmount: lineItem?.price?.value?.centAmount
              }
            },
            quantity: lineItem?.quantity,
            totalPrice: {
              centAmount: lineItem?.totalPrice?.centAmount
            }
          }
        }),
        discountCodes: cartData?.discountCodes?.map((disCode) => {
          return disCode?.discountCode?.id
        }),
        totalPrice: {
          centAmount: cartData?.totalPrice?.centAmount
        },
        totalLineItemQuantity: cartData?.totalLineItemQuantity,
        shippingAddress: {
          firstName: cartData?.shippingAddress?.firstName,
          lastName: cartData?.shippingAddress?.lastName,
          streetName: cartData?.shippingAddress?.streetName,
          additionalStreetInfo: cartData?.shippingAddress?.additionalStreetInfo,
          city: cartData?.shippingAddress?.city,
          state: cartData?.shippingAddress?.state,
          country: cartData?.shippingAddress?.country,
          postalCode: cartData?.shippingAddress?.postalCode,
          email: cartData?.shippingAddress?.email,
          key: cartData?.shippingAddress?.key
        },
        shippingMethodInfo: {
          shippingMethodName: cartData?.shippingInfo?.shippingMethodName,
          price: {
            currencyCode: cartData?.shippingInfo?.price?.currencyCode,
            centAmount: cartData?.shippingInfo?.price?.centAmount
          },
          shippingMethodId: cartData?.shippingInfo?.shippingMethod?.id
        },
        tax: cartData?.taxedPrice?.totalTax?.centAmount
      }
      return cartResponse
    } catch (e) {
      return { errorMessage: 'Unable to fetch data from server.' }
    }
  }