// 'use client'

import ProjectCard from '@/components/card/ProjectCard'
import React from 'react'

// import { useEffect, useState } from 'react'
const getData = async () => {
  const response = await fetch('http://localhost:3000/api', {})
  const products = (await response.json()).products
  return products as {
    _id: string
    title: string
    description: string
    imageUrl: string
    writer: {
      _id: string
      image: string
      name: string
    }
  }[]
}

//'https://res.cloudinary.com/dhjegsbqv/image/upload/v1681810010/post/IMG_6359_fojaxg.jpg'
//'https://res.cloudinary.com/dhjegsbqv/image/upload/v1639887022/gallery/9B3BDAC4-F061-41F9-836D-5E68ECC4E511_amhqsc.jpg'
// export const getServerSideProps = async () => {
//   const response = await getData()
//   return {
//     props: {
//       products: response,
//     },
//   }
// }
export default async function Home({ children }: { children: React.ReactNode }) {
  // const [products, setProducts] = useState([])

  // useEffect(() => {
  //   ;(async () => {
  //     const response = await getData()
  //     setProducts(response)
  //   })()
  // }, [])
  const projects = await getData()
  return (
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
    <div className="page-container">
      {projects.map((project) => (
        <ProjectCard
          key={project._id}
          id={project._id}
          title={project.title}
          imageUrl={project.imageUrl}
          description={project.description}
          writer={project.writer?.name ?? ''}
          writerImage={project.writer?.image ?? ''}
        />
      ))}
    </div>
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
