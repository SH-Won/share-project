// 'use client'
// import { useEffect, useState } from 'react'
const getData = async () => {
  const response = await fetch('http://localhost:3000/api')
  const products = (await response.json()).products
  return products
}

//'https://res.cloudinary.com/dhjegsbqv/image/upload/v1681810010/post/IMG_6359_fojaxg.jpg'
//'https://res.cloudinary.com/dhjegsbqv/image/upload/v1639887022/gallery/9B3BDAC4-F061-41F9-836D-5E68ECC4E511_amhqsc.jpg'
export default async function Home() {
  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   ;(async () => {
  //     const response = await getData()
  //     setProducts(response)
  //   })()
  // }, [])
  // const products = await getData()
  return (
    <></>
    // <>
    //   <div className="page-container">
    //     {Array(50)
    //       .fill(1)
    //       .map((_, index) => {
    //         return (
    //           <div key={index}>
    //             <img src="https://res.cloudinary.com/dhjegsbqv/image/upload/v1680624633/post/IMG_6112_tovxuw.jpg" />
    //           </div>
    //         )
    //       })}
    //   </div>
    // </>
    // <div className="page-container">
    //   {products.map((product: any) => (
    //     <div key={product._id}>
    //       <div>
    //         <img src={product.imageUrl} />
    //       </div>
    //       <span>{product.label}</span>
    //     </div>
    //   ))}
    // </div>
  )
}
// useEffect(() => {
//   ;(async () => {
//     await fetch('/api/auth', {
//       method: 'GET',
//       headers: {
//         authorization: `Bearer ${user.accessToken}`,
//       },
//       credentials: 'include',
//     })
//       .then(async (response) => {
//         console.log(response)
//         const json = await response.json()
//         console.log(json)
//         if (response.status !== 200) {
//           await fetch('api/auth/refresh', {
//             method: 'GET',
//             headers: {
//               'Content-Type': 'application/json',
//             },
//             credentials: 'include',
//           }).then(async (response) => {
//             if (response.status === 200) {
//               const json = await response.json()
//               console.log(json)
//               dispatch(
//                 setUser({
//                   accessToken: json.accessToken,
//                 })
//               )
//             } else {
//               dispatch(resetUser())
//             }
//           })
//         }
//       })
//       .catch((error) => {
//         console.log(error)
//       })
//   })()
// }, [])
