export async function getProducts () {
    try {
      const productRawResponse = await fetch(
        `https://api.us-central1.gcp.commercetools.com/abhijeet/products`,
        {
          headers: {
            Authorization: `Bearer ia5wzZ12QX3B-q5WMqIs_RsV3wqxurUC`
          }
        }
      )
      const productData = await productRawResponse.json()
      console.log(333, productData)
      const products = productData?.results?.map((item)=>{
        return {
            productId: item?.id,
            sku: item?.masterData?.current?.masterVariant?.sku,
            currency: 'INR',
            productName: item?.masterData?.current?.name['en-US'],
            productDescription:
            item?.masterData?.current?.description['en-US'],
        pdpImage: {
          alt: item?.masterData?.current?.masterVariant?.images?.map(
            (image) => image?.label
          ),
          link: item?.masterData?.current?.masterVariant?.images?.map(
            (image) => image?.url
          )
        },
        attributes: item?.masterData?.current?.masterVariant?.attributes,
        price: item?.masterData?.current?.masterVariant?.prices?.[0]?.value?.centAmount
        }
      })
      return products;
    } catch (e) {
      return { errorMessage: 'Unable to fetch data from server.' }
    }
  }

  export async function getProductById (productId) {
    try {
      const productRawResponse = await fetch(
        `https://api.us-central1.gcp.commercetools.com/abhijeet/products/${productId}`,
        {
          headers: {
            Authorization: 'Bearer ia5wzZ12QX3B-q5WMqIs_RsV3wqxurUC'
          }
        }
      )
      const productData = await productRawResponse.json()
      const product = {
        productId: productData?.id,
        sku: productData?.masterData?.current?.masterVariant?.sku,
        itemId:
          productData?.masterData?.current?.masterVariant?.attributes?.find(
            (attribute) => attribute?.name === 'itemId'
          )?.value,
        currency: '$',
        productName: productData?.masterData?.current?.name['en-US'],
        productDescription:
          productData?.masterData?.current?.description['en-US'],
        pdpImage: {
          alt: productData?.masterData?.current?.masterVariant?.images?.map(
            (image) => image?.label
          ),
          link: productData?.masterData?.current?.masterVariant?.images?.map(
            (image) => image?.url
          )
        },
        attributes: productData?.masterData?.current?.masterVariant?.attributes
      }
      return product
    } catch (e) {
      return { errorMessage: 'Unable to fetch data from server.' }
    }
  }