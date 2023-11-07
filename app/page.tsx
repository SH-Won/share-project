// 'use client'
import ProjectCard from '@/components/card/ProjectCard'
const getData = async () => {
  const response = await fetch('http://localhost:3000/api/', {})
  if (!response.ok) {
    return []
  }
  const products = (await response.json()).products
  return (
    (products as {
      _id: string
      title: string
      description: string
      imageUrl: string
      writer: {
        _id: string
        image: string
        name: string
      }
    }[]) || []
  )
}

// 'https://res.cloudinary.com/dhjegsbqv/image/upload/v1681810010/post/IMG_6359_fojaxg.jpg'
// 'https://res.cloudinary.com/dhjegsbqv/image/upload/v1639887022/gallery/9B3BDAC4-F061-41F9-836D-5E68ECC4E511_amhqsc.jpg'
// export const getServerSideProps = async () => {
//   const response = await getData()
//   return {
//     props: {
//       products: response,
//     },
//   }
// }
export default async function Home() {
  const projects = await getData()
  return (
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
