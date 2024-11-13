export const tryMe = (category, imageURL) => {
    console.log([
        {
          image_url: imageURL,
          category: category
        }
      ]); 
    };
    export const tryAll = (data) => {
        const items = data?.map((item) => {
          return {
            image_url: item?.variant?.images?.[0]?.url, 
            category: item?.category || "default_category"
          };
        });
      
        console.log(items);  
      };
      

